import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import JobRow from "./JobRow";
import { clerkClient } from "@clerk/nextjs/server";
import { getJobsForSchedule } from "@/lib/actions/jobs";
import { getServices } from "@/lib/actions/services";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function JobTable() {
  const services = await getServices();

  const jobs = await getJobsForSchedule();
  console.log(jobs);
  const staff = await clerkClient().users.getUserList();
  console.log(staff);

  const jobTableDisplay = () => {
    // Filter by staff in filtersArray
    return (
      jobs
        // .filter((job) => filtersArray.includes(job.staff.fullName))
        .map((job) => {
          return (
            <JobRow
              key={job._id.toString()}
              id={job._id.toString()}
              serviceName={job.service.name}
              description={job.description}
              address={job.jobAddress}
              // staffName={job.staff.fullName}
              staffName="Staff Name"
              timeStart={job.schedule.timeStart.toLocaleString("en-GB")}
              timeEnd={job.schedule.timeEnd.toLocaleString("en-GB")}
              status={job.status}
            />
          );
        })
    );
  };

  const tableDisplay = () => {
    if (jobs.length === 0) {
      return (
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Your Upcoming Visits</CardTitle>
            <CardDescription>Bookings details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="mb-2 text-sm font-semibold text-primary">
                No Visits available
              </span>
              <Link href="/customer/services">
                <Button>Book a Service</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Your Upcoming Visits</CardTitle>
          <CardDescription>Bookings details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{jobTableDisplay()}</TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  return tableDisplay();
}
