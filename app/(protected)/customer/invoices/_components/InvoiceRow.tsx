import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function InvoiceRow({
  invoiceId,
  dateIssued,
  totalAmount,
  lineItems,
  validityStatus,
  paymentStatus,
  paymentMethod,
  customer,
}: {
  invoiceId: string;
  dateIssued: string;
  totalAmount: string;
  lineItems: Array<string>;
  paymentStatus: string;
  validityStatus: string;
  paymentMethod: string;
  customer: string;
}) {
  const router = useRouter();

  // Format Date
  const formattedDateIssued = dayjs(dateIssued).format("DD/MM/YYYY");

  const isVoid = validityStatus === "void";

  return (
    <>
      <TableRow>
        <TableCell className={isVoid ? "opacity-50 cursor-not-allowed" : ""}>
          {invoiceId.toString()}
        </TableCell>
        <TableCell className={isVoid ? "opacity-50 cursor-not-allowed" : ""}>
          {formattedDateIssued.toString()}
        </TableCell>
        <TableCell className={isVoid ? "opacity-50 cursor-not-allowed" : ""}>
          {customer}
        </TableCell>
        <TableCell className={isVoid ? "opacity-50 cursor-not-allowed" : ""}>
          ${totalAmount.toString()}
        </TableCell>
        <TableCell className={isVoid ? "opacity-50 cursor-not-allowed" : ""}>
          {lineItems.length.toString()} Items
        </TableCell>
        <TableCell className={isVoid ? "opacity-50 cursor-not-allowed" : ""}>
          {validityStatus.charAt(0).toUpperCase() + validityStatus.slice(1)}
        </TableCell>
        <TableCell className={isVoid ? "opacity-50 cursor-not-allowed" : ""}>
          {paymentStatus}
        </TableCell>
        <TableCell className={isVoid ? "opacity-50 cursor-not-allowed" : ""}>
          {paymentMethod}
        </TableCell>
        <TableCell>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/customer/invoices/view-invoice/${invoiceId}`)
                }
                className="cursor-pointer"
              >
                View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
