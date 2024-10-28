"use client";

import { Font, Template } from "@pdfme/common";
import { Viewer } from "@pdfme/ui";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { generate } from "@pdfme/generator";
import { toast } from "sonner";
import { FileDown } from "lucide-react";
import {
  barcodes,
  ellipse,
  image,
  line,
  multiVariableText,
  rectangle,
  table,
  text,
} from "@pdfme/schemas";

const plugins = {
  Text: text,
  "Multi-Variable Text": multiVariableText,
  Table: table,
  Line: line,
  Rectangle: rectangle,
  Ellipse: ellipse,
  Image: image,
  QR: barcodes.qrcode,
};

const font: Font = {
  "Roboto Bold": {
    data: "http://localhost:8000/fonts/Roboto-Bold.ttf",
  },
  "Roboto Italic": {
    data: "http://localhost:8000/fonts/Roboto-Italic.ttf",
  },
  Roboto: {
    fallback: true,
    data: "http://localhost:8000/fonts/Roboto-Regular.ttf",
  },
};

const QuoteViewerClient = ({
  template,
  inputs,
}: {
  template: Template;
  inputs: Record<string, unknown>[];
}) => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const ui = useRef<Viewer | null>(null);

  console.log(inputs);
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
