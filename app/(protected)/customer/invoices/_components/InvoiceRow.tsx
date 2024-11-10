"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useEffect, useState } from "react";
import { approveInvoice } from "@/lib/actions/invoices";
import { toast } from "sonner";
import QRCode from "qrcode";

export default async function InvoiceRow({
  invoiceId,
  dateIssued,
  totalAmount,
  lineItems,
  validityStatus,
  paymentStatus,
  qrCode,
  job,
}: {
  invoiceId: string;
  dateIssued: string;
  totalAmount: string;
  lineItems: Array<string>;
  paymentStatus: string;
  validityStatus: string;
  qrCode: string;
  job: string;
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
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Approve Invoice
  const handleApproveInvoice = async () => {
    setIsDialogOpen(true);
    try {
      await approveInvoice({
        invoiceId: invoiceId,
        validityStatus: "approved",
      });

      toast("Invoice Approved Successfully", {
        className: "cursor-pointer",
      });
    } catch (error) {
      console.error("Error voiding invoice:", error);
      toast.error("An error occurred while voiding the invoice.");
    }
  };

  useEffect(() => {
    if (!isDialogOpen) router.push("/customer/invoices");
  }, [isDialogOpen, setIsDialogOpen]);

  // Generate QR Code URL
  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const url = await QRCode.toDataURL(qrCode);
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Failed to generate QR code", error);
      }
    };
    generateQrCode();
  }, [qrCode]);

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
          {job.toString()}
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
        <TableCell>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {actionType === "approve" ? "Payment" : ""}
                </DialogTitle>
                <DialogDescription>
                  {actionType === "approve" ? "Please make your payment." : ""}
                </DialogDescription>
              </DialogHeader>
              {actionType === "approve" ? (
                <img src={qrCodeUrl} alt="QR Code" />
              ) : (
                ""
              )}
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    </>
  );
}
