"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InvoiceRow from "./InvoiceRow";
import SearchBar from "@/app/(protected)/_components/SearchBar";
import { Checkbox } from "@/components/ui/checkbox";

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
  payments: { paymentMethod: string }[] | never[];
  createdAt: string | Date;
  updatedAt: string | Date;
  qrCode: string;
  job: string;
}

interface InvoicesProps {
  initialInvoices: Invoice[];
  customerFullName: string;
}

type ValidityStatus = "active" | "draft" | "void" | "approved";
type PaymentStatus = "paid" | "unpaid";
type PaymentMethod = "cash" | "banktransfer" | "paynow" | "unknown";

export default function Invoices({
  initialInvoices,
  customerFullName,
}: InvoicesProps) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [query, setQuery] = useState<string>("");

  // Sort states
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [sortDateDirection, setSortDateDirection] = useState<string>("");
  const [sortPriceDirection, setSortPriceDirection] = useState<string>("");

  // Filter states
  const [validityStatus, setValidityStatus] = useState<{
    active: boolean;
    draft: boolean;
    void: boolean;
    approved: boolean;
  }>({
    active: true,
    draft: true,
    void: true,
    approved: true,
  });
  const [paymentStatus, setPaymentStatus] = useState<{
    paid: boolean;
    unpaid: boolean;
  }>({
    paid: true,
    unpaid: true,
  });

  const [paymentMethod, setPaymentMethod] = useState({
    cash: true,
    banktransfer: true,
    paynow: true,
    unknown: true,
  });

  // Filtering logic
  const handleValidityChange = (filter: string, checked: boolean) => {
    setValidityStatus((prevState) => ({
      ...prevState,
      [filter]: checked,
    }));
  };

  const handlePaymentStatusChange = (filter: string, checked: boolean) => {
    setPaymentStatus((prevState) => ({
      ...prevState,
      [filter]: checked,
    }));
  };

  const handlePaymentMethodChange = (filter: string, checked: boolean) => {
    setPaymentMethod((prevState) => ({
      ...prevState,
      [filter]: checked,
    }));
  };

  const handleSearchFilterSort = useCallback(
    (query: string) => {
      let resultInvoices = initialInvoices;

      // Search
      setQuery(query);
      if (query.trim() === "") {
        // If query is empty, reset the search
        setInvoices(initialInvoices);
      } else {
        // Filter the invoices based on the customer name or invoice ID
        resultInvoices = resultInvoices.filter((invoice) => {
          // console.log("search", resultInvoices);
          return (
            invoice.job.includes(query.toLowerCase()) ||
            invoice.invoiceId.toString().includes(query.toLowerCase()) ||
            invoice.dateIssued.toString().includes(query.toLowerCase())
          );
        });
      }

      // Filter by validity status
      let filteredInvoices = resultInvoices.filter((invoice) => {
        const validityKey = invoice.validityStatus as ValidityStatus;
        return validityStatus[validityKey];
      });

      // Filter by payment status
      filteredInvoices = filteredInvoices.filter((invoice) => {
        const paymentStatusKey =
          invoice.paymentStatus.toLowerCase() as PaymentStatus;
        return paymentStatus[paymentStatusKey];
      });

      // Filter by payment method
      filteredInvoices = filteredInvoices.filter((invoice) => {
        if (invoice.payments[0] && invoice.payments[0].paymentMethod) {
          const paymentMethodKey =
            invoice.payments[0].paymentMethod.toLowerCase() as PaymentMethod;
          return paymentMethod[paymentMethodKey];
        } else {
          return paymentMethod["unknown"];
        }
      });
      // console.log("filter", filteredInvoices);

      // Sort
      const sortedInvoices = [...filteredInvoices].sort((a, b) => {
        let valueA: number | string;
        let valueB: number | string;
        let sortDirection: string;

        if (sortCriteria === "dateIssued") {
          valueA = new Date(a.dateIssued).getTime();
          valueB = new Date(b.dateIssued).getTime();
          sortDirection = sortDateDirection;
        } else if (sortCriteria === "totalAmount") {
          valueA = a.totalAmount;
          valueB = b.totalAmount;
          sortDirection = sortPriceDirection;
        } else {
          return 0;
        }

        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });

      setInvoices(sortedInvoices);

      // console.log("sorted", sortedInvoices);
    },
    [
      initialInvoices,
      customerFullName,
      validityStatus,
      paymentStatus,
      paymentMethod,
      sortCriteria,
      sortDateDirection,
      sortPriceDirection,
    ]
  );

  useEffect(() => {
    handleSearchFilterSort(query);
  }, [query, handleSearchFilterSort]);

  const invoiceDisplay = (validityStatus?: string) => {
    // Filter invoices based on validityStatus, or include all if "all" is selected
    const filteredInvoices =
      validityStatus === "all"
        ? invoices
        : invoices.filter(
            (invoice) => invoice.validityStatus === validityStatus
          );

    // Map invoices to promises that fetch job and return InvoiceRow components
    const invoiceRows = filteredInvoices.map((invoice) => {
      return (
        <InvoiceRow
          key={invoice._id.toString()}
          invoiceId={invoice.invoiceId.toString()}
          dateIssued={invoice.dateIssued.toString()}
          totalAmount={invoice.totalAmount.toString()}
          lineItems={invoice.lineItems}
          paymentStatus={invoice.paymentStatus}
          validityStatus={invoice.validityStatus}
          qrCode={invoice.qrCode}
          job={invoice.job}
        />
      );
    });
    return invoiceRows;
  };

  const invoiceCount = (validityStatus?: string) => {
    if (validityStatus === "all") {
      return invoices.length;
    }

    return invoices.filter(
      (invoice) => invoice.validityStatus === validityStatus
    ).length;
  };

  const cardDisplay = (validityStatus?: string) => {
    if (!invoices || invoices.length === 0) {
      return <div className="mt-4">No Invoices Found</div>;
    }

    return (
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>
            Manage Customer Invoices and Edit Details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Line Items</TableHead>
                <TableHead>Validity Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{invoiceDisplay(validityStatus)}</TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {invoiceCount(validityStatus) === 0 ? "0" : "1"}-
              {invoiceCount(validityStatus)}
            </strong>{" "}
            of <strong>{invoiceCount(validityStatus)}</strong> Invoices
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <SearchBar onSearch={handleSearchFilterSort} />

      <div className="flex justify-between">
        <div className="w-1/4 border-r pr-6 ">
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-lg font-bold mb-4">SEARCH FILTER</h2>

            {/* Validity Status */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Validity Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="validityActive"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handleValidityChange("active", checked);
                    }}
                  />
                  <label
                    htmlFor="validityActive"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Active
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="validityDraft"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handleValidityChange("draft", checked);
                    }}
                  />
                  <label
                    htmlFor="validityDraft"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Draft
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="validityVoid"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handleValidityChange("void", checked);
                    }}
                  />
                  <label
                    htmlFor="validityVoid"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Void
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="validityVoid"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handleValidityChange("approved", checked);
                    }}
                  />
                  <label
                    htmlFor="validityVoid"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Approved
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Payment Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentPaid"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handlePaymentStatusChange("paid", checked);
                    }}
                  />
                  <label
                    htmlFor="paymentPaid"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Paid
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentUnpaid"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handlePaymentStatusChange("unpaid", checked);
                    }}
                  />
                  <label
                    htmlFor="paymentUnpaid"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Unpaid
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Payment Method</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentCash"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handlePaymentMethodChange("cash", checked);
                    }}
                  />
                  <label
                    htmlFor="paymentCash"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cash
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentBankTransfer"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handlePaymentMethodChange("banktransfer", checked);
                    }}
                  />
                  <label
                    htmlFor="paymentBankTransfer"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Bank Transfer
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentPayNow"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handlePaymentMethodChange("paynow", checked);
                    }}
                  />
                  <label
                    htmlFor="paymentPayNow"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    PayNow
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentUnknown"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean")
                        handlePaymentMethodChange("unknown", checked);
                    }}
                  />
                  <label
                    htmlFor="paymentPayNow"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Unknown
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/4 pl-6">
          {/* Sort selects */}
          <div className="flex items-center space-x-4 bg-secondary p-4 mb-2 rounded shadow-sm">
            <span className="text-sm font-bold">Sort by</span>
            <Select
              value={sortDateDirection}
              onValueChange={(newDirection) => {
                setSortCriteria("dateIssued");
                setSortPriceDirection("");
                if (newDirection === "asc" || newDirection === "desc")
                  setSortDateDirection(newDirection);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by Date</SelectLabel>
                  <SelectItem value="asc">Date: Early to Late</SelectItem>
                  <SelectItem value="desc">Date: Late to Early</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={sortPriceDirection}
              onValueChange={(newDirection) => {
                setSortCriteria("totalAmount");
                setSortDateDirection("");
                if (newDirection === "asc" || newDirection === "desc")
                  setSortPriceDirection(newDirection);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by Amount</SelectLabel>
                  <SelectItem value="asc">Amount: Low to High</SelectItem>
                  <SelectItem value="desc">Amount: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all">
            <TabsContent value="all">{cardDisplay("all")}</TabsContent>
            <TabsContent value="active">{cardDisplay("active")}</TabsContent>
            <TabsContent value="draft">{cardDisplay("draft")}</TabsContent>
            <TabsContent value="void">{cardDisplay("void")}</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
