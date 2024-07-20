import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
  ) {
    try {

      if (!params.billboardId) {
        return new NextResponse("Billboard ID is require", { status: 400 });
      }


      const billboard = await prismadb.billboard.findUnique({
        where: {
          id: params.billboardId,
        },
      });
      return NextResponse.json(billboard);
    } catch (error) {
      console.log("[BILLBOARD_GET]", error);
      return new NextResponse("Interal error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("User Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Billboard name is require", { status: 401 });
    }
    if (!imageUrl) {
      return new NextResponse("Image Url is require", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is require", { status: 401 });
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

    const billboard = await prismadb.billboard.updateMany({
      data: {
        label,
        imageUrl,
      },
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_PATCH]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is require", { status: 400 });
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
    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
