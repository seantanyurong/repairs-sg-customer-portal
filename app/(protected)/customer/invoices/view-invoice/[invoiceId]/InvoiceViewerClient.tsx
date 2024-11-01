"use client";

import { Template } from "@pdfme/common";
import { Viewer } from "@pdfme/ui";
import { useEffect, useRef } from "react";
import { font, plugins } from "../../_components/SchemaPDF";
import { Button } from "@/components/ui/button";
import { generate } from "@pdfme/generator";
import { FileDown } from "lucide-react";
import { toast } from "sonner";

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

  return (
    <div className="flex flex-col gap-2 lg:w-1/2 w-full h-screen">
      <Button type="button" onClick={() => generatePDF()} disabled={isVoid}>
        <FileDown className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <div ref={uiRef} />
    </div>
  );
};

export default InvoiceViewerClient;
