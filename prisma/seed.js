const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const brands = [
  "Pacific Intense",
  "Millionaire",
  "Woody Oud",
  "Vanilla Cigar",
  "Leatherette",
  "Cherry Bliss",
  "Y-King",
  "Aventis",
  "Mt. Silver",
  "The G.O.A.T",
  "Prisprysm",
  "SRK",
  "Hermes",
  "Most Hunted",
  "White Oud",
  "Addiction",
  "Pride",
  "Floral Garden",
  "The No 5",
  "Tropical Rush",
  "Alpha Male",
  "Savage",
  "Blue",
  "Aqua Vibe",
  "Aqua de Blu",
  "Nomad's Path",
  "Y S L Y",
  "Afgan",
  "Ispan",
  "Forever Yours",
  "Chrome",
  "Red Tobacco",
  "Drake Noir",
  "Tyger",
  "Eros Blue",
  "Legend",
  "Pink Tease",
  "Illusion",
  "Love Spell",
  "BR Five40",
  "Roses and More",
  "Delina",
  "Chocolate Eclairs",
  "Juicy Apple",
  "Tam Dam",
  "Iconic",
  "Boss",
  "Obsession",
  "Origins",
  "Cool Breeze"
];

async function main() {
  for (const name of brands) {
    await prisma.brand.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('All brands created ✅');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
