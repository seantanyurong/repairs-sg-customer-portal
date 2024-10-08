'use client';

import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteJob } from '@/lib/actions/jobs';
import { format, addHours, startOfDay, addDays, isAfter } from 'date-fns';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { updateJob } from '@/lib/actions/jobs';

const formSchema = z.object({
  schedule: z.string(),
});

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
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this job booking?');
    if (confirmed) {
      await deleteJob(job._id);
      router.push('/customer/jobs');
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Function to generate 2-hour intervals for the next 3 days
  const generateScheduleOptions = () => {
    const options = [];
    const startDate = addDays(new Date(), 1); // Start from tomorrow
    const endDate = addDays(startDate, 3); // Up to 3 days from tomorrow

    let currentDate = startOfDay(startDate); // Start at 00:00 tomorrow
    while (isAfter(endDate, currentDate)) {
      // Create time slots from 10:00 to 20:00 each day
      for (let hour = 10; hour < 20; hour += 2) {
        const startTime = addHours(startOfDay(currentDate), hour);
        const endTime = addHours(startTime, 2);

        options.push({
          value: JSON.stringify({
            timeStart: format(startTime, "yyyy-MM-dd'T'HH:mm:ss"),
            timeEnd: format(endTime, "yyyy-MM-dd'T'HH:mm:ss"),
          }), // Pass both start and end time in the value
          label: format(startTime, 'MMMM d, yyyy HH:mm') + ' - ' + format(endTime, 'HH:mm'),
        });
      }
      currentDate = addDays(currentDate, 1); // Move to the next day
    }

    return options;
  };

  const scheduleOptions = generateScheduleOptions();

  const onSubmit = async () => {
    const formValues = form.getValues();
    const result = await updateJob({
      ...formValues,
      jobId: job._id.toString(),
    });
    if (result?.errors) {
      return;
    } else {
      router.refresh();
      form.reset(form.getValues());
      router.push('/customer/jobs');
    }
  };

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
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }}
                    className='w-full flex flex-col gap-4'>
                    {/* Schedules Field */}
                    <FormField
                      control={form.control}
                      name='schedule'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Booking Timing</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a schedule' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {scheduleOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type='submit' className='w-full mb-4'>
                      Update Booking Timing
                    </Button>
                  </form>
                </Form>
                <Button className='w-full mb-4' variant={'destructive'} onClick={handleDelete}>
                  Cancel Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
