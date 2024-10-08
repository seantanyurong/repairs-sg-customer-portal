import { getJob } from '@/lib/actions/jobs';
import JobDetailsClient from './clientPage';

export default async function JobDetails({ params }: { params: { jobId: string } }) {
  const job = await getJob(params.jobId);

  return (
    <JobDetailsClient
      job={{
        _id: job._id.toString(),
        serviceName: job.service.name,
        serviceDescription: job.service.description,
        description: job.description,
        address: job.jobAddress,
        timeStart: job.schedule.timeStart.toLocaleString('en-GB'),
        timeEnd: job.schedule.timeEnd.toLocaleString('en-GB'),
      }}
    />
  );
}
