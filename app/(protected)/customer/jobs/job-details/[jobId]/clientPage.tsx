'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function JobDetailsClient({
  job,
}: {
  job: {
    _id: string;
    serviceName: string;
    serviceDescription: string;
    description: string;
    address: string;
    timeStart: string;
    timeEnd: string;
  };
}) {
  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4'>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3'>
            <div className='grid gap-4 md:grid-cols-4'>
              <Card className='md:col-span-2' x-chunk='dashboard-05-chunk-0'>
                <CardHeader className='pb-3'>
                  <CardTitle>{job.serviceName}</CardTitle>
                  <CardDescription className='max-w-lg text-balance leading-relaxed'>
                    {job.serviceDescription}
                  </CardDescription>
                </CardHeader>
              </Card>
              <a href='https://wa.me/6596770773' className='md:col-span-2' target='_blank' rel='noreferrer'>
                <Card x-chunk='dashboard-05-chunk-1'>
                  <CardHeader className='pb-2'>
                    <CardDescription>Questions?</CardDescription>
                    <CardTitle className='text-2xl'>96770773</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-xs text-muted-foreground'>Contact Us</div>
                  </CardContent>
                </Card>
              </a>
            </div>
            <Card x-chunk='dashboard-05-chunk-3'>
              <CardHeader className='px-7'>
                <CardTitle>Details</CardTitle>
                <CardDescription>View job booking details.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Address: {job.address}</p>
                <p>
                  Time: {job.timeStart} - {job.timeEnd}
                </p>
                <p>Description: {job.description}</p>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-05-chunk-3'>
              <CardHeader className='px-7'>
                <CardTitle>Changes</CardTitle>
                <CardDescription>Make changes to your job booking.</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
