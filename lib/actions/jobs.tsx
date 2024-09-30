'use server';

import Job from '@/models/Job';
import Schedule from '@/models/Schedule';
import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { currentUser } from '@clerk/nextjs/server';

const addJob = async (job: {
  quantity: number;
  jobAddress: string;
  schedule: string;
  description: string;
  serviceId: string;
}): Promise<{ message: string; errors?: string | Record<string, unknown> }> => {
  const user = await currentUser();

  if (!user) return { message: 'Error', errors: 'User Not Found' };

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
    return { message: 'Error', errors: scheduleResponse.error.flatten().fieldErrors };
  }

  const newSchedule = new Schedule(scheduleResponse.data);
  newSchedule.save();

  console.log('SCHEDULE', job.schedule);

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

export { addJob };
