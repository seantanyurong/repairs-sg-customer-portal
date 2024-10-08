'use server';

import Job from '@/models/Job';
import Schedule from '@/models/Schedule';
import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

const addJob = async (job: {
  quantity: number;
  jobAddress: string;
  schedule: string;
  description: string;
  serviceId: string;
  price: number;
}): Promise<{ message: string; errors?: string | Record<string, unknown> }> => {
  const user = await currentUser();

  if (!user) return { message: 'Error', errors: 'User Not Found' };

  // Add price to description
  job.description += `\n\nPrice: $${job.price}`;

  // Create Schedule
  const scheduleSchema = z.object({
    timeStart: z.date(),
    timeEnd: z.date(),
  });

  const formattedSchedule = JSON.parse(job.schedule);

  const scheduleResponse = scheduleSchema.safeParse({
    timeStart: new Date(formattedSchedule.timeStart),
    timeEnd: new Date(formattedSchedule.timeEnd),
  });

  if (!scheduleResponse.success) {
    return {
      message: 'Error',
      errors: scheduleResponse.error.flatten().fieldErrors,
    };
  }

  const newSchedule = new Schedule(scheduleResponse.data);
  newSchedule.save();

  // Create Job
  const jobSchema = z.object({
    quantity: z.number(),
    jobAddress: z.string(),
    schedule: z.instanceof(ObjectId),
    description: z.string(),
    service: z.instanceof(ObjectId),
    customer: z.string(),
  });

  const response = jobSchema.safeParse({
    quantity: job.quantity,
    jobAddress: job.jobAddress,
    schedule: newSchedule._id,
    description: job.description,
    service: new ObjectId(job.serviceId),
    customer: user.id,
  });

  if (!response.success) {
    return { message: 'Error', errors: response.error.flatten().fieldErrors };
  }

  const newJob = new Job(response.data);
  newJob.save();

  return { message: 'Job booked successfully' };
};

const getJobsForSchedule = async () => {
  const jobs = await Job.find().populate('schedule').populate('service').exec();

  return jobs;
};

const getJob = async (jobId: string) => {
  const job = await Job.findById(jobId).populate('schedule').populate('service').exec();

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

  // Create Schedule
  const scheduleSchema = z.object({
    timeStart: z.date(),
    timeEnd: z.date(),
  });

  const formattedSchedule = JSON.parse(job.schedule);

  const scheduleResponse = scheduleSchema.safeParse({
    timeStart: new Date(formattedSchedule.timeStart),
    timeEnd: new Date(formattedSchedule.timeEnd),
  });

  if (!scheduleResponse.success) {
    return {
      message: 'Error',
      errors: scheduleResponse.error.flatten().fieldErrors,
    };
  }

  const newSchedule = new Schedule(scheduleResponse.data);
  newSchedule.save();

  const jobSchema = z.object({
    schedule: z.instanceof(ObjectId),
  });

  const response = jobSchema.safeParse({
    schedule: newSchedule._id,
  });

  if (!response.success) {
    return { message: 'Error', errors: response.error.flatten().fieldErrors };
  }

  await Job.findByIdAndUpdate(job.jobId, response.data);

  return { message: 'Job updated successfully' };
};

export { addJob, getJobsForSchedule, getJob, deleteJob, updateJob };
