import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma"; // your Prisma client
import crypto from "crypto";
import { PerfumeType, Category } from "@prisma/client";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// ✅ PUT /api/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const perfume = await prisma.perfume.findUnique({
      where: { id },
      include: { images: true, fragrance: true },
    });

    if (!perfume) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const dataStr = formData.get("data") as string;
    if (!dataStr) {
      return NextResponse.json(
        { error: "Missing product data" },
        { status: 400 }
      );
    }

    const data = JSON.parse(dataStr);

    // ✅ handle new images
    const images: string[] = perfume.images.map((img) => img.url);
    let i = 0;
    while (true) {
      const file = formData.get(`image${i}`) as File | null;
      if (!file) break;

      const filename = `${crypto.randomUUID()}-${file.name}`;
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      const uploadPath = path.join(UPLOAD_DIR, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(uploadPath, buffer);
      images.push(`/uploads/${filename}`);
      i++;
    }

    const updatedPerfume = await prisma.perfume.update({
      where: { id },
      data: {
        flavor: data.flavor,
        mrp: parseFloat(data.mrp),
        size: data.size,
        type: data.type as PerfumeType,
        category: data.category as Category,
        description: data.description,
        brand: data.brandId ? { connect: { id: data.brandId } } : undefined,
        fragrance: {
          upsert: {
            update: {
              topNotes: data.fragranceNotes?.topNotes || null,
              middleNotes: data.fragranceNotes?.middleNotes || null,
              baseNotes: data.fragranceNotes?.baseNotes || null,
            },
            create: {
              topNotes: data.fragranceNotes?.topNotes || null,
              middleNotes: data.fragranceNotes?.middleNotes || null,
              baseNotes: data.fragranceNotes?.baseNotes || null,
            },
          },
        },
        images: {
          deleteMany: {}, // remove old ones
          create: images.map((url) => ({
            url,
            altText: data.flavor || "Perfume image",
          })),
        },
      },
      include: {
        brand: true,
        images: true,
        fragrance: true,
      },
    });

    return NextResponse.json(updatedPerfume, { status: 200 });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/products/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const deleted = await prisma.perfume.delete({
      where: { id },
      include: { brand: true, images: true, fragrance: true },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
