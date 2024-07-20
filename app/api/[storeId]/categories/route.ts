import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    const category = await prismadb.category.create({
      data: {
        name,
        storeId: params.storeId,
        billboardId: billboardId,
      },
    });

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Category name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
