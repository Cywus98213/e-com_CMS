import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { storeName } = body;
    if (!userId) {
      return new NextResponse("User Unauthorized", { status: 401 });
    }
    if (!storeName) {
      return new NextResponse("store Name is missing", { status: 401 });
    }

    const store = await prismadb.store.create({
      data: {
        storeName,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
