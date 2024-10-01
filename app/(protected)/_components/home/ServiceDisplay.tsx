import { getServices } from "@/lib/actions/services";
import ServiceRow from "../../customer/services/_components/ServiceRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ServiceDisplay() {
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead className="sr-only">Book Service</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{serviceDisplay()}</TableBody>
    </Table>
  );
}
