'use server';

import Job from '@/models/Job';
import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { createClerkClient } from '@clerk/nextjs/server';
import { getRewardsByUserId, updateReward } from './rewards';

const customerClerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY as string,
});

const checkValidReferralCode = async (referralCode: string) => {
  const customers = (await customerClerk.users.getUserList()).data;
  const referrer = customers.find((customer) => customer.unsafeMetadata.referralCode === referralCode);
  console.log(referrer);
  return referrer?.id;
};

const checkValidRewardCode = async (rewardCode: string, userId: string) => {
  const rewards = await getRewardsByUserId(userId);
  const claimReward = rewards.find(
    (reward) =>
      reward.rewardCode === rewardCode && reward.status === 'ACTIVE' && new Date(reward.expiryDate) > new Date(),
  );
  return claimReward;
};

const addJob = async (job: {
  quantity: number;
  jobAddress: string;
  schedule: string;
  description: string;
  serviceId: string;
  price: number;
  referralCode?: string;
}): Promise<{ message: string; errors?: string | Record<string, unknown> }> => {
  const user = await currentUser();

  if (!user) return { message: 'Error', errors: 'User Not Found' };

  // Add price to description
  job.description += `\n\nPrice: $${job.price}`;

  const formattedSchedule = JSON.parse(job.schedule);
  let referrer;
  let claimReward;

  if (job.referralCode) {
    if (job.referralCode.substring(0, 3) === 'REF') {
      referrer = await checkValidReferralCode(job.referralCode);
      if (!referrer)
        return {
          message: 'Error',
          errors: { referralCode: 'Invalid Referral Code' },
        };
    } else if (job.referralCode.substring(0, 3) === 'REW') {
      claimReward = await checkValidRewardCode(job.referralCode, user.id);
      if (!claimReward)
        return {
          message: 'Error',
          errors: { rewardCode: 'Invalid Reward Code' },
        };
      if (claimReward) {
        referrer = user.id;
        await updateReward({
          _id: claimReward._id,
          rewardCode: claimReward.rewardCode,
          userId: claimReward.userId,
          status: 'CLAIMED',
          amount: claimReward.amount,
          expiryDate: claimReward.expiryDate,
        });
      }
    } else {
      return {
        message: 'Error',
        errors: { referralCode: 'Invalid Code' },
      };
    }
  }

  // Create Job
  const jobSchema = z.object({
    quantity: z.number(),
    jobAddress: z.string(),
    schedule: z.object({
      timeStart: z.date(),
      timeEnd: z.date(),
    }),
    description: z.string(),
    service: z.instanceof(ObjectId),
    customer: z.string(),
    price: z.number(),
    referralCode: z
      .object({
        referrer: z.string(),
        code: z.string(),
        customer: z.string(),
      })
      .optional(),
  });

  const response =
    job.referralCode !== ''
      ? jobSchema.safeParse({
          quantity: job.quantity,
          jobAddress: job.jobAddress,
          schedule: {
            timeStart: new Date(formattedSchedule.timeStart),
            timeEnd: new Date(formattedSchedule.timeEnd),
          },
          description: job.description,
          service: new ObjectId(job.serviceId),
          customer: user.id,
          price: job.price,
          referralCode: {
            referrer: referrer,
            code: job.referralCode,
            customer: user.id,
          },
        })
      : jobSchema.safeParse({
          quantity: job.quantity,
          jobAddress: job.jobAddress,
          schedule: {
            timeStart: new Date(formattedSchedule.timeStart),
            timeEnd: new Date(formattedSchedule.timeEnd),
          },
          description: job.description,
          service: new ObjectId(job.serviceId),
          customer: user.id,
          price: job.price,
        });

  if (!response.success) {
    return { message: 'Error', errors: response.error.flatten().fieldErrors };
  }

  const newJob = new Job(response.data);
  newJob.save();

  return { message: 'Job booked successfully' };
};

const getJobsWithService = async () => {
  const jobs = await Job.find().populate('service').exec();

  return jobs;
};

const getJob = async (jobId: string) => {
  const job = await Job.findById(jobId).populate('service').exec();

  return job;
};

const deleteJob = async (jobId: string) => {
  await Job.findByIdAndDelete(jobId);
  revalidatePath('/customer/jobs');
};

const updateJob = async (job: {
  schedule: string;
  jobId: string;
}): Promise<{ message: string; errors?: string | Record<string, unknown> }> => {
  const user = await currentUser();

  if (!user) return { message: 'Error', errors: 'User Not Found' };

  const formattedSchedule = JSON.parse(job.schedule);

  const jobSchema = z.object({
    schedule: z.object({
      timeStart: z.date(),
      timeEnd: z.date(),
    }),
  });

  const response = jobSchema.safeParse({
    schedule: {
      timeStart: new Date(formattedSchedule.timeStart),
      timeEnd: new Date(formattedSchedule.timeEnd),
    },
  });

  if (!response.success) {
    return { message: 'Error', errors: response.error.flatten().fieldErrors };
  }

  await Job.findByIdAndUpdate(job.jobId, response.data);

  return { message: 'Job updated successfully' };
};

export { addJob, getJobsWithService, getJob, deleteJob, updateJob };
