"use client";

import SectionHeader from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoriesColumn, columns } from "./colums";
import { DataTable } from "@/components/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoriesColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onAdd = () => {
    router.push(`/${params.storeId}/categories/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeader
          title={`Categories (${data.length})`}
          description="Manage your Categories"
        />
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <SectionHeader title="API" description="API routes for Categories" />
      <Separator />
      <ApiList entityName="Categories" entityIdName="categoryId" />
    </>
  );
};
