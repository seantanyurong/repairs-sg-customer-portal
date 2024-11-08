"use client";

import {
  font,
  plugins,
} from "@/app/(protected)/customer/invoices/_components/SchemaPDF";
import { Button } from "@/components/ui/button";
import { Template } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { Viewer } from "@pdfme/ui";
import { FileDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const QuoteViewerClient = ({
  template,
  inputs,
}: {
  template: Template;
  inputs: Record<string, unknown>[];
}) => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const ui = useRef<Viewer | null>(null);

  useEffect(() => {
    const buildUi = () => {
      if (typeof window !== "undefined" && uiRef.current) {
        ui.current = new Viewer({
          domContainer: uiRef.current,
          template,
          options: { font },
          inputs,
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
        options: { font },
        inputs,
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

  return (
    <div className="flex flex-col gap-2 lg:w-1/2 w-full h-screen">
      <Button
        type="button"
        onClick={() => generatePDF()}
      >
        <FileDown className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <div ref={uiRef} />
    </div>
  );
};

export default QuoteViewerClient;
