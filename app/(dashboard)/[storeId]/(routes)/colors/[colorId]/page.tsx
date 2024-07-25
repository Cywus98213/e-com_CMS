import prismadb from "@/lib/prismadb";
import React from "react";
import ColorForm from "./components/color-form";

const SizeFormPage = async ({ params }: { params: { colorId: string } }) => {
  const Color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-9 pt-6">
        <ColorForm initialData={Color} />
      </div>
    </div>
  );
};

export default SizeFormPage;
