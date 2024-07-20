"use client";

import SectionHeader from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, SizeColumn } from "./colums";
import { DataTable } from "@/components/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizesClientProps {
  data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onAdd = () => {
    router.push(`/${params.storeId}/sizes/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeader
          title={`Sizes (${data.length})`}
          description="Manage your sizes"
        />
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <SectionHeader title="API" description="API routes for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
