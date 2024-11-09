import { createClerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { getInvoicesByUser } from "@/lib/actions/invoices";
import { getPayments } from "@/lib/actions/payments";
import Invoices from "./_components/Invoices";

interface Invoice {
  _id: string;
  invoiceId: string | number;
  lineItems: string[];
  dateIssued: string | Date;
  dateDue: string | Date;
  totalAmount: string | number;
  remainingDue: string | number;
  paymentStatus: string;
  validityStatus: string;
  publicNote: string;
  customer: string;
  payments: { paymentMethod: string }[] | never[];
  createdAt: string | Date;
  updatedAt: string | Date;
  qrCode: string;
}

export default async function InvoicesPage() {
  const payment = await getPayments();
  console.log("payment", payment);

  // Fetch User Invoices
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;
  const invoices: Invoice[] = await getInvoicesByUser(userId as string);
  //   console.log("user invoices", invoices);

  // Provide a default date if date fields are missing or invalid
  const defaultDate = new Date("1970-01-01T00:00:00Z"); // Default date if missing

  // Convert Date objects to ISO strings
  const serializeInvoice = (invoice: Invoice) => {
    const serializePayment = (payment: { paymentMethod: string }[]) => {
      return [
        {
          paymentMethod: payment[0].paymentMethod,
        },
      ];
    };

    return {
      _id: invoice._id.toString(),
      invoiceId: invoice.invoiceId.toString(),
      lineItems: invoice.lineItems,
      dateIssued: invoice.dateIssued
        ? invoice.dateIssued.toString()
        : defaultDate.toISOString(),
      dateDue: invoice.dateDue
        ? invoice.dateDue.toString()
        : defaultDate.toISOString(),
      totalAmount: invoice.totalAmount,
      remainingDue: invoice.remainingDue,
      paymentStatus: invoice.paymentStatus,
      validityStatus: invoice.validityStatus,
      publicNote: invoice.publicNote,
      customer: invoice.customer,
      createdAt: invoice.createdAt
        ? invoice.createdAt.toString()
        : defaultDate.toISOString(),
      updatedAt: invoice.updatedAt
        ? invoice.updatedAt.toString()
        : defaultDate.toISOString(),
      payments:
        invoice.payments && invoice.payments.length > 0
          ? serializePayment(invoice.payments)
          : [],
      qrCode: invoice.qrCode,
    };
  };
  const serializedInvoices = invoices.map(serializeInvoice);
  // console.log("serializedInvoices", serializedInvoices);

  // Fetch Customer Full Name
  const custClerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });
  const customer = await custClerk.users.getUser(userId as string);

  return (
    <Invoices
      initialInvoices={serializedInvoices}
      customerFullName={customer.fullName || ""}
    />
  );
}
