'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function ServiceRow({ id, name, description }: { id: string; name: string; description: string }) {
  return (
    <TableRow>
      <TableCell className='hidden sm:table-cell'>
        <Image
          alt='Product image'
          className='aspect-square rounded-md object-cover'
          height='64'
          src='/images/placeholder.svg'
          width='64'
        />
      </TableCell>
      <TableCell className='font-medium'>{name}</TableCell>
      <TableCell className='hidden md:table-cell font-medium'>{description}</TableCell>
      <TableCell className='hidden md:table-cell text-right font-medium'>
        <Link href={`/customer/jobs/booking/${id}`}>
          <Button>Book Service</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
