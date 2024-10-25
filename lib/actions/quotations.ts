"use server";

import Quotation from "@/models/Quotation";
import { z } from "zod";

const quotationSchema = z.object({
  quotationDate: z.string().min(1),
  quotationExpiry: z.string().min(1),
  quoteTemplate: z.string().min(1),
  customerEmail: z.string().email(),
  totalAmount: z.number(),
  notes: z.string().optional(),
  lineItems: z
    .object({
      description: z.string(),
      quantity: z.number(),
      total: z.number(),
    })
    .array()
    .optional(),
  customer: z.string().optional(),
  declineReason: z.string().optional(),
  declineDetails: z.string().optional(),
});

const getQuotationsByCustomerId = async (customerId: string) => {
  return await Quotation.find({
    customer: customerId,
    status: { $ne: "Draft" },
  }).exec();
};

const getOneQuotation = async (id: string) => {
  const quote = await Quotation.findById(id).exec();
  return JSON.stringify(quote);
};

const updateQuotation = async (
  id: string,
  quote: string,
  templateInputs?: string
) => {
  try {
    if (templateInputs) {
      const quotation = JSON.parse(quote);
      const response = quotationSchema.safeParse(quotation);

      if (!response.success) {
        return {
          message: "Error",
          errors: response.error.flatten().fieldErrors,
        };
      }

      const updatedQuotation = await Quotation.findByIdAndUpdate(id, {
        ...response.data,
        templateInputs: JSON.parse(templateInputs),
      }).exec();
      return {
        message: "Quotation updated successfully",
        id: updatedQuotation._id,
      };
    } else {
      const updatedQuotation = await Quotation.findByIdAndUpdate(id, {
        ...JSON.parse(quote),
      }).exec();
      return {
        message: "Quotation updated successfully",
        id: updatedQuotation._id,
      };
    }
  } catch (err) {
    console.error(err);
    return { message: "An error has occurred, please try again." };
  }
};

const deleteQuotation = async (id: string) => {
  Quotation.findByIdAndDelete(id).exec();
  return { message: "Quotation Deleted" };
};

export {
  getOneQuotation,
  getQuotationsByCustomerId as getQuotations,
  updateQuotation,
  deleteQuotation,
};
