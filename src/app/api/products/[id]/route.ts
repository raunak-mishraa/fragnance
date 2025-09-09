import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { type Product } from "@/lib/schema";

const DATA_FILE = path.join(process.cwd(), "data/products.json");
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

async function getProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveProducts(products: Product[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const dataStr = formData.get("data") as string;
  const data = JSON.parse(dataStr);

  // handle images
  const images: string[] = products[index].images ?? [];
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

  const updatedProduct: Product = {
    ...products[index],
    ...data,
    mrp: parseFloat(data.mrp),
    images,
  };

  products[index] = updatedProduct;
  await saveProducts(products);

  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const [deleted] = products.splice(index, 1);
  await saveProducts(products);

  return NextResponse.json(deleted, { status: 200 });
}
