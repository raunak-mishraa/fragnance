// app/product/[id]/page.tsx
import ProductPage from "@/components/ProductPage";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Await params
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) return notFound();

  return <ProductPage product={product} />;
}
