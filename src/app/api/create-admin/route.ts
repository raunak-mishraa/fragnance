import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Create Admin
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Create new admin
    const admin = await prisma.admin.create({
      data: {
        email,
        name: name || null,
      },
    });

    return NextResponse.json({ success: true, admin }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
