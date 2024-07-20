import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SettingsForm from "./components/setting-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: params.storeId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex flex-col">
      <div className="space-y-4 p-9 pt-6 flex-1">
        <SettingsForm initialData={store}/>
      </div>
    </div>
  );
};

export default SettingsPage;
