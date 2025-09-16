// app/api/contact/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const contact = await prisma.contact.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName || null,
        phone: body.phone,
        email: body.email,
        country: body.country,
        city: body.city,
        source: body.source,
        subject: body.subject,
        message: body.message,
      },
    });

    return NextResponse.json({ message: "Contact saved", contact });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
