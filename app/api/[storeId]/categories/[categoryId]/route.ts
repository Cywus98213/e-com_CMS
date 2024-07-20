import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
  ) {
    try {

      if (!params.categoryId) {
        return new NextResponse("Billboard ID is require", { status: 400 });
      }


      const category = await prismadb.category.findUnique({
        where: {
          id: params.categoryId,
        },
      });
      return NextResponse.json(category);
    } catch (error) {
      console.log("[CATEGORY_GET]", error);
      return new NextResponse("Interal error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("User Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Billboard name is require", { status: 401 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard ID is require", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is require", { status: 401 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("User Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.updateMany({
      data: {
        name,
        billboardId,
      },
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is require", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("User Unauthorized", { status: 403 });
    }
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
