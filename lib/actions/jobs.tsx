'use server';

import Job from '@/models/Job';
import { z } from 'zod';

const addJob = async (job: {
  name: string;
  description: string;
  price: number;
  volumeDiscountPercentage: number;
  status: string;
}): Promise<{ message: string; errors?: string | Record<string, unknown> }> => {
  const jobSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number(),
    volumeDiscountPercentage: z.number(),
    status: z.enum(['Draft', 'Active', 'Disabled']),
  });

  const response = jobSchema.safeParse({
    name: job.name,
    description: job.description,
    price: job.price,
    volumeDiscountPercentage: job.volumeDiscountPercentage,
    status: job.status,
  });

  if (!response.success) {
    return { message: 'Error', errors: response.error.flatten().fieldErrors };
  }

  const newJob = new Job(response.data);
  newJob.save();

  return { message: 'Job booked successfully' };
};

export { addJob };
