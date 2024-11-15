import { getVehicleByLicencePlate } from '@/lib/actions/vehicles';
import MapClient from './clientPage';

export default async function ViewLocation({ params }: { params: { licencePlate: string } }) {

  const vehicle = await getVehicleByLicencePlate(params.licencePlate);

  return (
    <MapClient
      initialLat={0}
      initialLon={0}
      gpsApi={vehicle.gpsApi}
    />
  );
}
