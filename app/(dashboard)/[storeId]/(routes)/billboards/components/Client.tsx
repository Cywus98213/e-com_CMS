"use client";

import SectionHeader from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./colums";
import { DataTable } from "@/components/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onAdd = () => {
    router.push(`/${params.storeId}/billboards/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeader
          title={`Billboards (${data.length})`}
          description="Manage your billboards"
        />
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <SectionHeader title="API" description="API routes for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
