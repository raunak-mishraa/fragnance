import prisma from "@/lib/prisma";

async function test() {
  const contact = await prisma.contact.create({
    data: {
      firstName: "Test",
      lastName: "User",
      phone: "1234567890",
      email: "test@example.com",
      country: "India",
      city: "Mumbai",
      source: "social",
      subject: "general",
      message: "Hello",
    },
  });
  console.log(contact);
}

test()
  .catch(console.error)
  .finally(() => prisma.$disconnect());