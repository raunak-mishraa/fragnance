import prisma from "@/lib/prisma";
import slugify from "slugify";

async function main() {
  const brands = await prisma.brand.findMany();
  for (const brand of brands) {
    await prisma.brand.update({
      where: { id: brand.id },
      data: { slug: slugify(brand.name, { lower: true }) },
    });
  }
}

main().then(() => {
  console.log("✅ Slugs backfilled");
  process.exit();
});
