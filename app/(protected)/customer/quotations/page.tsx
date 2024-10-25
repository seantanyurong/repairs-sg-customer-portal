import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQuotations } from "@/lib/actions/quotations";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { quotationColumns } from "./_components/QuotationColumns";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/customer");
  const quotations = await getQuotations(userId);

  const cardDisplay = (validityStatus?: string) => {
    const filteredQuotations = quotations.filter((quotation) => {
      if (validityStatus === "all") return true;
      return quotation.status === validityStatus;
    });
    return (
      <CardContent>
        <DataTable
          columns={quotationColumns}
          data={JSON.parse(JSON.stringify(filteredQuotations))}
          noResultsMessage="No quotations found."
        />
      </CardContent>
    );
  };

  return (
    <Tabs defaultValue="active">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="declined">Declined</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
      </div>

      <div className="flex flex-col gap-2">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Quotations</CardTitle>
            <CardDescription>
              Manage your quotations and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="all">{cardDisplay("all")}</TabsContent>
            <TabsContent value="active">{cardDisplay("Active")}</TabsContent>
            <TabsContent value="accepted">
              {cardDisplay("Accepted")}
            </TabsContent>
            <TabsContent value="declined">
              {cardDisplay("Declined")}
            </TabsContent>
            <TabsContent value="expired">{cardDisplay("Expired")}</TabsContent>
          </CardContent>
        </Card>
      </div>
    </Tabs>
  );
};

export default Page;
