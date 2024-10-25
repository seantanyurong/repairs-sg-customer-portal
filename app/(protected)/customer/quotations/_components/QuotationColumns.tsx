"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

type Quotation = {
  _id: string;
  quotationId: number;
  name: string;
  status: "Active" | "Accepted" | "Declined" | "Expired";
  createdAt: string;
  totalAmount: number;
};

const currencyFormat = new Intl.NumberFormat("en-SG", {
  style: "currency",
  currency: "SGD",
});

export const quotationColumns: ColumnDef<Quotation>[] = [
  {
    accessorKey: "quotationId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.totalAmount
        ? currencyFormat.format(row.original.totalAmount)
        : "-";
    },
  },
  {
    id: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "datetime",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return dayjs(row.original.createdAt).format("DD-MMM-YYYY HH:mm ");
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return <ActionColumn row={row} />;
    },
  },
];

function ActionColumn({ row }: { row: Row<Quotation> }) {
  return (
    <div className="flex gap-2">
      <>
        <Link href={`/customer/quotations/view/${row.original._id}`}>
          <Button>View</Button>
        </Link>
      </>
    </div>
  );
}
