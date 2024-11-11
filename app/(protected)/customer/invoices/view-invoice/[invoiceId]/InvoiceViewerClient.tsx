"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Template } from "@pdfme/common";
import { Viewer } from "@pdfme/ui";
import { useEffect, useRef, useState } from "react";
import { font, plugins } from "../../_components/SchemaPDF";
import { Button } from "@/components/ui/button";
import { generate } from "@pdfme/generator";
import { FileCheck2, FileDown } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { approveInvoice } from "@/lib/actions/invoices";

const InvoiceViewerClient = ({
  template,
  inputs,
}: {
  template: Template;
  inputs: Record<string, unknown>[];
}) => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const ui = useRef<Viewer | null>(null);
  const isVoid = inputs[0].validity_status === "void";
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"approve" | "comment">(
    "approve"
  );
  const [qrCodeUrl, setQrCodeUrl] = useState<string>(
    inputs[0].qrCode as string
  );

  useEffect(() => {
    const buildUi = () => {
      if (typeof window !== "undefined" && uiRef.current) {
        ui.current = new Viewer({
          domContainer: uiRef.current,
          template,
          inputs,
          options: {
            font,
          },
          plugins,
        });
      }
    };
    buildUi();
  }, [inputs, template]);

  const generatePDF = async () => {
    try {
      const pdf = await generate({
        template,
        inputs,
        options: { font },
        plugins,
      });

      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    } catch {
      toast.error(
        "Error generating PDF, please refresh the page and try again"
      );
    }
  };

  // Generate QR Code URL
  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const url = await QRCode.toDataURL(inputs[0].qrCode as string);
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Failed to generate QR code", error);
      }
    };
    generateQrCode();
  }, [qrCodeUrl]);

  // Approve Invoice
  const handleApproveInvoice = async () => {
    setIsDialogOpen(true);
    try {
      await approveInvoice({
        invoiceId: inputs[0].invoiceId as string,
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

  return (
    <div className="flex flex-col gap-2 lg:w-1/2 w-full h-screen">
      <div className="flex gap-2 mb-4 justify-between">
        <Button type="button" onClick={() => generatePDF()} disabled={isVoid}>
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF
        </Button>

        <Button
          type="button"
          onClick={() => handleApproveInvoice()}
          disabled={isVoid}
        >
          <FileCheck2 className="mr-2 h-4 w-4" />
          Approve Invoice
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

      <div ref={uiRef} />
    </div>
  );
};

export default InvoiceViewerClient;
