import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, newEmail } = body;

    if (!id || !newEmail) {
      return NextResponse.json(
        { error: "Admin ID and new email are required" },
        { status: 400 }
      );
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: { email: newEmail },
    });

    return NextResponse.json(
      { success: true, admin: updatedAdmin },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating admin email:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}