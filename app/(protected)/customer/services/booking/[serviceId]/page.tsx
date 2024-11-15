import { getService } from '@/lib/actions/services';
import BookingClient from './clientPage';
import { clerkClient } from '@clerk/nextjs/server';
import crypto from "crypto";

export default async function Booking({ params }: { params: { serviceId: string } }) {
  const service = await getService(params.serviceId);

  // check if this customer has any previous jobs
  // const { isLoaded, isSignedIn, user } = useUser();
  // console.log(user);
  // const customerJobs = jobs.filter((job) => job.customer === user?.id);

  // generate all possible referral codes
  const customers = await clerkClient().users.getUserList();
  const customerArray = customers.data.map((customer) => {
    return { id: String(customer.id).trim() };
  });

  const referralCodes = customerArray.map((customer) => {
    const hash = crypto.createHash("sha256").update(customer.id).digest("hex");
    const referralCode = parseInt(hash, 16)
      .toString(36)
      .substring(0, 5)
      .toUpperCase();
    return `REF-${referralCode}`;
  });

  return (
    <BookingClient
      service={{
        _id: service._id.toString(),
        name: service.name,
        description: service.description,
        price: service.price,
        volumeDiscountPercentage: service.volumeDiscountPercentage,
        status: service.status,
        referralCodes: referralCodes,
      }}
    />
  );
}
