"use server";

import QuoteTemplate from "@/models/QuoteTemplate";

const getOneQuoteTemplate = async (id: string) => {
  const template = await QuoteTemplate.findById(id).exec();
  return JSON.stringify(template);
};

export {
  getOneQuoteTemplate,
};
