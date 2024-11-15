import { getJobsWithServiceAndVehicle } from '@/lib/actions/jobs';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getServices } from '@/lib/actions/services';
import { getVehicles } from '@/lib/actions/vehicles';

import JobRow from './_components/JobRow';

export default async function JobsPage() {
  const jobs = await getJobsWithServiceAndVehicle();
  const service = await getServices();
  const vehicle = await getVehicles();

  const jobTableDisplay = (status?: string) => {
    const todaysDate = new Date();

    if (status === 'upcoming') {
      return jobs
        .filter((job) => todaysDate <= job.schedule.timeEnd)
        .map((job) => {
          return (
            <JobRow
              key={job._id.toString()}
              id={job._id.toString()}
              serviceName={job.service.name}
              description={job.description}
              address={job.jobAddress}
              timeStart={job.schedule.timeStart.toLocaleString('en-GB')}
              timeEnd={job.schedule.timeEnd.toLocaleString('en-GB')}
              status={job.status}
              vehicleLicencePlate={job.vehicle?.licencePlate}
              isUpcoming={true}
            />
          );
        });
    }

    return jobs
      .filter((job) => todaysDate > job.schedule.timeEnd)
      .map((job) => {
        return (
          <JobRow
            key={job._id.toString()}
            id={job._id.toString()}
            serviceName={job.service.name}
            description={job.description}
            address={job.jobAddress}
            timeStart={job.schedule.timeStart.toLocaleString('en-GB')}
            timeEnd={job.schedule.timeEnd.toLocaleString('en-GB')}
            status={job.status}
            vehicleLicencePlate={job.vehicle?.licencePlate}
            isUpcoming={false}
          />
        );
      });
  };

  const jobsCount = (status?: string) => {
    const todaysDate = new Date();

    if (status === 'upcoming') {
      return jobs.filter((job) => todaysDate <= job.schedule.timeEnd).length;
    }

    return jobs.filter((job) => todaysDate > job.schedule.timeEnd).length;
  };

  const cardDisplay = () => {
    if (jobs.length === 0) {
      return <div className='mt-4'>No jobs found</div>;
    }

    return (
      <Tabs defaultValue='upcoming'>
        <div className='flex items-center'>
          <TabsList>
            <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
            <TabsTrigger value='history'>History</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='upcoming'>
          <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
              <CardTitle>Jobs</CardTitle>
              <CardDescription>View your upcoming jobs here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className='hidden md:table-cell'>Address</TableHead>
                    <TableHead className='hidden md:table-cell'>Start</TableHead>
                    <TableHead className='hidden md:table-cell'>End</TableHead>
                    <TableHead className='hidden md:table-cell'>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{jobTableDisplay('upcoming')}</TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className='text-xs text-muted-foreground'>
                Showing{' '}
                <strong>
                  {jobsCount('upcoming') === 0 ? '0' : '1'}-{jobsCount('upcoming')}
                </strong>{' '}
                of <strong>{jobsCount('upcoming')}</strong> services
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='history'>
          {' '}
          <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
              <CardTitle>Jobs</CardTitle>
              <CardDescription>View your past jobs here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className='hidden md:table-cell'>Address</TableHead>
                    <TableHead className='hidden md:table-cell'>Start</TableHead>
                    <TableHead className='hidden md:table-cell'>End</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{jobTableDisplay('history')}</TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className='text-xs text-muted-foreground'>
                Showing{' '}
                <strong>
                  {jobsCount('history') === 0 ? '0' : '1'}-{jobsCount('history')}
                </strong>{' '}
                of <strong>{jobsCount('history')}</strong> services
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
  };

  return <>{cardDisplay()}</>;
}
