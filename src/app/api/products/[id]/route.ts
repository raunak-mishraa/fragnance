import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma"; // your Prisma client
import crypto from "crypto";
import { PerfumeType, Category } from "@prisma/client";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// ✅ PUT /api/products/[id]
// ✅ PUT /api/products/[id]
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const formData = await request.formData();
    const dataStr = formData.get("data") as string;

    if (!dataStr) {
      return NextResponse.json({ error: "Missing product data" }, { status: 400 });
    }

    const data = JSON.parse(dataStr);

    // --- Upload new images
    const newImages: string[] = [];
    let i = 0;
    while (true) {
      const file = formData.get(`image${i}`) as File | null;
      if (!file) break;

      const filename = `${crypto.randomUUID()}-${file.name}`;
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      const uploadPath = path.join(UPLOAD_DIR, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(uploadPath, buffer);

      newImages.push(`/uploads/${filename}`);
      i++;
    }

    // --- Delete selected images (only if explicitly provided)
    if (data.imagesToKeep) {
      const existingImages = await prisma.perfumeImage.findMany({ where: { perfumeId: id } });

      const toDelete = existingImages.filter((img) => !data.imagesToKeep.includes(img.id));
      if (toDelete.length > 0) {
        await prisma.perfumeImage.deleteMany({
          where: { id: { in: toDelete.map((img) => img.id) } },
        });
      }
    }

    // --- Update product
    const updated = await prisma.perfume.update({
      where: { id },
      data: {
        flavor: data.flavor,
        mrp: parseFloat(data.mrp),
        size: data.size,
        type: data.type as PerfumeType,
        category: data.category as Category,
        description: data.description,
        brandId: data.brandId || null,
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
        images: newImages.length
          ? {
              create: newImages.map((url) => ({
                url,
                altText: data.flavor || "Perfume image",
              })),
            }
          : undefined, // 👉 don’t touch images if none are uploaded
      },
      include: {
        brand: true,
        images: true,
        fragrance: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}



// ✅ DELETE /api/products/[id]
export async function DELETE(
   request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ no await

  try {

    const deleted = await prisma.perfume.delete({
      where: { id },
      include: { brand: true, images: true, fragrance: true },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}


// ✅ GET /api/products/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ no await
  try {
    const product = await prisma.perfume.findUnique({
      where: { id },
      include: {
        brand: true,
        images: true,
        fragrance: true,
      },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}