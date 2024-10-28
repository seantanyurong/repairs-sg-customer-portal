import { getOneQuotation, updateQuotation } from "@/lib/actions/quotations";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import QuoteActionsClient from "./_components/QuoteActionsClient";
import QuoteViewerClient from "./_components/QuoteViewerClient";
import { getOneQuoteTemplate } from "@/lib/actions/quoteTemplates";
import { Template } from "@pdfme/common";
import dayjs from "dayjs";

const updateRequiredField = (
  schemas: Template["schemas"],
  quotation: {
    quotationId: string;
    quotationDate: Date;
  }
) => {
  schemas.forEach((schema) => {
    schema.forEach((element) => {
      element.required = false;
      switch (element.name) {
        case "quotation_no":
          element.content = `Quotation #${quotation.quotationId}`;
          break;
        case "quote_date":
          element.content = dayjs(quotation.quotationDate).format("DD/MM/YYYY");
          break;
      }
    });
  });
  return schemas;
};

const Page = async ({ params }: { params: { quoteId: string } }) => {
  const { userId } = auth();
  if (!userId) redirect("/customer");

  const quotation = JSON.parse(await getOneQuotation(params.quoteId));
  if (quotation.customer !== userId) redirect("/customer");

  const quoteTemplate = JSON.parse(
    await getOneQuoteTemplate(quotation.quoteTemplate)
  );

  updateRequiredField(quoteTemplate.pdfTemplate.schemas, quotation);

  const updateQuotationAction = async (
    newStatus: string,
    declineReasons?: {
      declineReason: string;
      declineDetails?: string;
    }
  ) => {
    "use server";

    const payload = declineReasons
      ? { status: newStatus, ...declineReasons }
      : { status: newStatus };
    return updateQuotation(params.quoteId, JSON.stringify(payload));
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center shadow-md rounded-md w-full p-4">
        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Quotation #{quotation.quotationId}
        </h2>
        <QuoteActionsClient
          quotationId={params.quoteId}
          status={quotation.status}
          updateQuotationAction={updateQuotationAction}
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-2 h-dvh">
        {/* <QuoteDetailsClient
          quotation={quotation}
          customer={customerDetails}
          updateQuotationAction={submitQuotationAction}
        /> */}
        <QuoteViewerClient
          template={quoteTemplate.pdfTemplate}
          inputs={[quotation.templateInputs]}
        />
      </div>
    </>
  );
};

export default Page;
