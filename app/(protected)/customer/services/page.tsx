import { getServices } from '@/lib/actions/services';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ServiceRow from './_components/ServiceRow';

export default async function ServicesPage() {
  const services = await getServices();

  const serviceDisplay = () => {
    return services.map((service) => {
      return (
        <ServiceRow
          key={service._id.toString()}
          id={service._id.toString()}
          name={service.name}
          description={service.description}
        />
      );
    });
  };

  const serviceCount = () => {
    return services.length;
  };

  const cardDisplay = () => {
    if (services.length === 0) {
      return <div className='mt-4'>No services found</div>;
    }

    return (
      <Card x-chunk='dashboard-06-chunk-0'>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>Book your repair services here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='hidden w-[100px] sm:table-cell'>
                  <span className='sr-only'>Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className='hidden md:table-cell'>Description</TableHead>
                <TableHead className='sr-only'>Book Service</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{serviceDisplay()}</TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className='text-xs text-muted-foreground'>
            Showing{' '}
            <strong>
              {serviceCount() === 0 ? '0' : '1'}-{serviceCount()}
            </strong>{' '}
            of <strong>{serviceCount()}</strong> services
          </div>
        </CardFooter>
      </Card>
    );
  };

  return <>{cardDisplay()}</>;
}
