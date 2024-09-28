import { getService } from '@/lib/actions/services';
import BookingClient from './clientPage';

export default async function Booking({ params }: { params: { serviceId: string } }) {
  const service = await getService(params.serviceId);

  return (
    <BookingClient
      service={{
        _id: service._id.toString(),
        name: service.name,
        description: service.description,
        price: service.price,
        volumeDiscountPercentage: service.volumeDiscountPercentage,
        status: service.status,
      }}
    />
  );
}
