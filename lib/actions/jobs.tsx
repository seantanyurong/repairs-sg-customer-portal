'use server';

import Job from '@/models/Job';
import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { currentUser } from '@clerk/nextjs/server';

const addJob = async (job: {
  quantity: number;
  jobAddress: string;
  schedules: string;
  description: string;
  serviceId: string;
}): Promise<{ message: string; errors?: string | Record<string, unknown> }> => {
  const user = await currentUser();

  if (!user) return { message: 'Error', errors: 'User Not Found' };

  const jobSchema = z.object({
    quantity: z.number(),
    jobAddress: z.string(),
    // schedules: z.enum(['1000-1200', '1200-1400', '1400-1600', '1600-1800', '1800-2000']),
    description: z.string(),
    service: z.instanceof(ObjectId),
    customer: z.string(),
  });

  const response = jobSchema.safeParse({
    quantity: job.quantity,
    jobAddress: job.jobAddress,
    // schedules: job.schedules,
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
