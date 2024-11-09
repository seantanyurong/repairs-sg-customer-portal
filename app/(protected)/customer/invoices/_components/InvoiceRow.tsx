"use client";

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
import { useState } from "react";
import { approveInvoice } from "@/lib/actions/invoices";
import { toast } from "sonner";

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
  const isPaid = paymentStatus === "Paid";
  const isApproved = validityStatus === "approved";

  const [actionType, setActionType] = useState<"approve" | "comment">(
    "approve"
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Approve Invoice
  const handleApproveInvoice = async () => {
    try {
      await approveInvoice({
        invoiceId: invoiceId,
        validityStatus: "approved",
      });

      toast("Invoice Approved Successfully", {
        className: "cursor-pointer",
        action: {
          label: "View Invoice",
          onClick: () =>
            router.push(`/customer/invoices/view-invoice/${invoiceId}`),
        },
      });
    } catch (error) {
      console.error("Error voiding invoice:", error);
      toast.error("An error occurred while voiding the invoice.");
    }
  };

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
              <DropdownMenuItem
                disabled={isVoid || isPaid || isApproved}
                onClick={handleApproveInvoice}
                className="cursor-pointer"
              >
                Approve
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
