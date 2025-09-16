// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET!;

// export async function GET() {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("authToken")?.value;
//   if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//       include: { addresses: true },
//     });
//     return NextResponse.json({ addresses: user?.addresses || [] });
//   } catch {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
// }

// export async function POST(req: Request) {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("authToken")?.value;
//   if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
//     const body = await req.json();

//     const newAddress = await prisma.address.create({
//       data: {
//         userId: decoded.id,
//         addressType: body.addressType,
//         phone: body.phone,
//         street: body.street,
//         city: body.city,
//         state: body.state,
//         zip: body.zip,
//         country: body.country,
//       },
//     });

//     return NextResponse.json(newAddress);
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to add address" }, { status: 500 });
//   }
// }
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("authToken")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { addresses: true },
    });
    return NextResponse.json({ addresses: user?.addresses || [] });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("authToken")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const body = await req.json();

    const newAddress = await prisma.address.create({
      data: {
        userId: decoded.id,
        addressType: body.addressType,
        phone: body.phone,
        street: body.street,
        city: body.city,
        state: body.state,
        zip: body.zip,
        country: body.country,
      },
    });

    return NextResponse.json(newAddress);
  } catch (err) {
    return NextResponse.json({ error: "Failed to add address" }, { status: 500 });
  }
}