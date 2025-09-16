import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all queries
export async function GET() {
  try {
    const queries = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// PATCH: mark a query as resolved
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { message: "Query ID and status are required" },
        { status: 400 }
      );
    }
const updatedQuery = await prisma.contact.update({
  where: { id },
  data: { status }, // ✅ TypeScript will recognize status now
});

    return NextResponse.json(updatedQuery);
  } catch (error) {
    console.error("Error updating query:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// DELETE: remove a query by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Query ID is required" }, { status: 400 });
    }

    await prisma.contact.delete({ where: { id } });

    return NextResponse.json({ message: "Query deleted successfully" });
  } catch (error) {
    console.error("Error deleting query:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
