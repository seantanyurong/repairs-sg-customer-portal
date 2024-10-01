'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { addJob } from '@/lib/actions/jobs';
import { useUser } from '@clerk/clerk-react';
import { usePathname } from 'next/navigation';
import { format, addHours, startOfDay, addDays, isAfter } from 'date-fns';

const formSchema = z.object({
  quantity: z.number().min(1),
  jobAddress: z.string().min(1),
  schedule: z.string(),
  description: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingClient({ service }: { service: any }) {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [priceQty, setPriceQty] = useState(1);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      jobAddress: '',
      description: '',
    },
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

  const itemPrice = service.price - (service.price * (priceQty - 1) * service.volumeDiscountPercentage) / 100;
  const itemPriceRounded = Math.round(itemPrice * 100) / 100;
  const subtotalPrice = itemPrice * priceQty;
  const subtotalPriceRounded = Math.round(subtotalPrice * 100) / 100;
  const gstPrice = 0.09 * itemPrice * priceQty;
  const gstPriceRounded = Math.round(gstPrice * 100) / 100;
  const totalPrice = subtotalPrice + gstPrice;
  const totalPriceRounded = Math.round(totalPrice * 100) / 100;

  const onSubmit = async () => {
    setMessage('');
    setErrors({});
    const formValues = form.getValues();
    const result = await addJob({ ...formValues, serviceId: service._id.toString(), price: totalPriceRounded });
    if (result?.errors) {
      setMessage(result.message);
      setErrors(result.errors);
      return;
    } else {
      setMessage(result.message);
      router.refresh();
      form.reset(form.getValues());
      router.push('/customer/services');
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4'>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
            <div className='grid gap-4 md:grid-cols-4'>
              <Card className='md:col-span-2' x-chunk='dashboard-05-chunk-0'>
                <CardHeader className='pb-3'>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription className='max-w-lg text-balance leading-relaxed'>
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
              <a href='https://wa.me/6596770773' target='_blank' rel='noreferrer'>
                <Card className='md:col-span-1' x-chunk='dashboard-05-chunk-1'>
                  <CardHeader className='pb-2'>
                    <CardDescription>Questions?</CardDescription>
                    <CardTitle className='text-2xl'>96770773</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-xs text-muted-foreground'>Contact Us</div>
                  </CardContent>
                </Card>
              </a>
              <a href='https://maps.app.goo.gl/n6cbgUSQMymZbnyd8' target='_blank' rel='noreferrer'>
                <Card className='md:col-span-1' x-chunk='dashboard-05-chunk-1'>
                  <CardHeader className='pb-2'>
                    <CardDescription className='flex gap-2'>Google Reviews</CardDescription>
                    <CardTitle className='text-2xl flex items-center'>
                      <p className='mr-2'>4.9</p>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#000000'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#000000'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#000000'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#000000'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#000000'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                      </svg>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-xs text-muted-foreground'>Based on 559 reviews</div>
                  </CardContent>
                </Card>
              </a>
            </div>
            {!isSignedIn && (
              <Card x-chunk='dashboard-05-chunk-3'>
                <CardHeader className='px-7'>
                  <CardTitle>Sign In or Create An Account</CardTitle>
                  <CardDescription>You can only make a booking if you are signed in.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className='w-full mb-4' onClick={() => router.push(`/sign-in?redirect_url=${pathname}`)}>
                    Sign In
                  </Button>
                  <Button className='w-full' onClick={() => router.push(`/sign-up?redirect_url=${pathname}`)}>
                    Create Account
                  </Button>
                </CardContent>
              </Card>
            )}
            {isSignedIn && (
              <Card x-chunk='dashboard-05-chunk-3'>
                <CardHeader className='px-7'>
                  <CardTitle>Make a Booking</CardTitle>
                  <CardDescription>Payment will be made onsite.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }}
                      className='max-w-md w-full flex flex-col gap-4'>
                      {/* Quantity Field */}
                      <FormField
                        control={form.control}
                        name='quantity'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                min='1'
                                placeholder='Enter quantity'
                                {...field}
                                onChange={(event) => {
                                  field.onChange(+event.target.value);
                                  setPriceQty(+event.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Job Address Field */}
                      <FormField
                        control={form.control}
                        name='jobAddress'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Address</FormLabel>
                            <FormControl>
                              <Input placeholder='Enter job address' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Schedules Field */}
                      <FormField
                        control={form.control}
                        name='schedule'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Schedule</FormLabel>
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

                      {/* Description Field */}
                      <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea placeholder='Enter notes' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit' className='w-full'>
                        Create Service
                      </Button>
                      {message ? <h2>{message}</h2> : null}
                      {errors ? (
                        <div className='mb-10 text-red-500'>
                          {Object.keys(errors).map((key) => (
                            <p key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</p>
                          ))}
                        </div>
                      ) : null}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
          <div>
            <Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
              <CardHeader className='flex flex-row items-start bg-muted/50'>
                <div className='grid gap-0.5'>
                  <CardTitle className='group flex items-center gap-2 text-lg'>
                    Order
                    <Button
                      size='icon'
                      variant='outline'
                      className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'>
                      <Copy className='h-3 w-3' />
                      <span className='sr-only'>Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Estimated Cost</CardDescription>
                </div>
              </CardHeader>
              <CardContent className='p-6 text-sm'>
                <div className='grid gap-3'>
                  <div className='font-semibold'>Order Details</div>
                  <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>
                        {service.name} x <span>{priceQty}</span> ($
                        {itemPriceRounded} / service)
                      </span>
                      <span>${subtotalPriceRounded}</span>
                    </li>
                  </ul>
                  <Separator className='my-2' />
                  <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>Subtotal</span>
                      <span>${subtotalPriceRounded}</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>GST</span>
                      <span>${gstPriceRounded}</span>
                    </li>
                    <li className='flex items-center justify-between font-semibold'>
                      <span className='text-muted-foreground'>Total</span>
                      <span>${totalPriceRounded}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
