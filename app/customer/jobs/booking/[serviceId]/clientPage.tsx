'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { addJob } from '@/lib/actions/jobs';

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number(),
  volumeDiscountPercentage: z.number(),
  status: z.enum(['Draft', 'Active', 'Disabled']),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingClient({ service }: { service: any }) {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      volumeDiscountPercentage: 0,
    },
  });

  const onSubmit = async () => {
    setMessage('');
    setErrors({});
    const result = await addJob(form.getValues());
    if (result?.errors) {
      setMessage(result.message);
      setErrors(result.errors);
      return;
    } else {
      setMessage(result.message);
      router.refresh();
      form.reset(form.getValues());
      router.push('/customer/jobs');
    }
  };

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
                    <CardDescription className='flex gap-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='28'
                        height='28'
                        viewBox='0 0 48 48'>
                        <path
                          fill='#FFC107'
                          d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'></path>
                        <path
                          fill='#FF3D00'
                          d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'></path>
                        <path
                          fill='#4CAF50'
                          d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'></path>
                        <path
                          fill='#1976D2'
                          d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'></path>
                      </svg>
                    </CardDescription>
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
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder='Name' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder='Description' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='price'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='Price'
                                {...field}
                                onChange={(event) => field.onChange(+event.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='volumeDiscountPercentage'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Volume Discount Percentage (%)</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='Volume Discount Percentage (%)'
                                {...field}
                                onChange={(event) => field.onChange(+event.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='status'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Service Status</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select a service status' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Draft'>Draft</SelectItem>
                                <SelectItem value='Active'>Active</SelectItem>
                                <SelectItem value='Disabled'>Disabled</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
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
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <Separator className='my-2' />
                  <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>GST</span>
                      <span>$25.00</span>
                    </li>
                    <li className='flex items-center justify-between font-semibold'>
                      <span className='text-muted-foreground'>Total</span>
                      <span>$329.00</span>
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
