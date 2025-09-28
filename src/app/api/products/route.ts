import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { PerfumeType, Category } from "@prisma/client";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// ✅ GET /api/products
// export async function GET(request: NextRequest) {
//   const { searchParams } = request.nextUrl;
//   const search = searchParams.get("search")?.toLowerCase() || "";
//   const category = searchParams.get("category") as Category | null;
//   const type = searchParams.get("type") as PerfumeType | null;

//   try {
//     const products = await prisma.perfume.findMany({
//       where: {
//         AND: [
//           search ? { flavor: { contains: search } } : {},
//           category ? { category } : {},
//           type ? { type } : {},
//         ],
//       },
//       include: {
//         brand: true,
//         images: true,
//         fragrance: true,
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(products);
//   } catch (error) {
//     console.error("GET /api/products error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") as Category | null;
  const type = searchParams.get("type") as PerfumeType | null;
  const brand = searchParams.get("brand") || null;
  const size = searchParams.get("size") || null;
  // const inStock = searchParams.get("inStock") === "true";

  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "1000000");

  try {
    if(brand === "new-arrivals"){
      const newArrivals = await prisma.perfume.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // last 7 days
          },
        },
        include: {
          brand: true,
          images: true,
          fragrance: true,
          variants: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(newArrivals);
    }


    const products = await prisma.perfume.findMany({
      where: {
        AND: [
          search ? { flavor: { contains: search } } : {},
          category ? { category } : {},
          type ? { type } : {},
          brand ? { brand: { slug: brand } } : {},
          size ? { size } : {},
          {
            mrp: {
              gte: minPrice,
              lte: maxPrice,
            },
          },
        ],
      },
      include: {
        brand: true,
        images: true,
        fragrance: true,
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ✅ POST /api/products
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const dataStr = formData.get("data") as string;
    if (!dataStr) {
      return NextResponse.json(
        { error: "Missing product data" },
        { status: 400 }
      );
    }

    const data = JSON.parse(dataStr);
    console.log("Received data:", data);
    console.log(formData)
    // Upload images
    const images: string[] = [];
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

    // Create perfume in DB
    const newPerfume = await prisma.perfume.create({
      data: {
        flavor: data.flavor,
        mrp: parseFloat(data.mrp),
        size: data.size,
        type: data.type as PerfumeType,
        category: data.category as Category, // ✅ enum: male, female, unisex
        description: data.description,
        brand: data.brandId
          ? { connect: { id: data.brandId } }
          : undefined, // optional
        fragrance: {
          create: {
            topNotes: data.fragranceNotes?.topNotes || null,
            middleNotes: data.fragranceNotes?.middleNotes || null,
            baseNotes: data.fragranceNotes?.baseNotes || null,
          },
        },
        images: {
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

    return NextResponse.json(newPerfume, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 }
    );
  }
}
