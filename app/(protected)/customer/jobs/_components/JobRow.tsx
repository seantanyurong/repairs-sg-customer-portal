'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JobRow({
  id,
  serviceName,
  description,
  address,
  timeStart,
  timeEnd,
  isUpcoming,
  status,
  vehicleLicencePlate,
}: {
  id: string;
  serviceName: string;
  description: string;
  address: string;
  timeStart: string;
  timeEnd: string;
  isUpcoming: boolean;
  status: string;
  vehicleLicencePlate?: string;
}) {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell className='font-medium'>{serviceName}</TableCell>
      <TableCell className='font-medium'>{description}</TableCell>
      <TableCell className='font-medium hidden md:table-cell'>{address}</TableCell>
      <TableCell className='font-medium hidden md:table-cell'>{timeStart}</TableCell>
      <TableCell className='font-medium hidden md:table-cell'>{timeEnd}</TableCell>
      <TableCell className='font-medium hidden md:table-cell'>{status}</TableCell>
      {isUpcoming && (
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup='true' size='icon' variant='ghost'>
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/customer/jobs/job-details/${id}`)}
                className='cursor-pointer'>
                View Details
              </DropdownMenuItem>
              {status !== 'Completed' && status !== 'Cancelled' && status !== 'Pending' && vehicleLicencePlate && (
                <DropdownMenuItem
                  onClick={() => router.push(`/customer/jobs/view-location/${vehicleLicencePlate}`)}
                  className='cursor-pointer'>
                  View Vehicle Location
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
}
