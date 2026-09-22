const { hash } = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const pw = await hash("259918", 12);
  const user = await prisma.user.upsert({
    where: { email: "okra12559@gmail.com" },
    update: { password: pw, role: "ADMIN", active: true },
    create: {
      nome: "Admin",
      email: "okra12559@gmail.com",
      password: pw,
      role: "ADMIN",
      active: true,
    },
  });
  console.log("Admin criado:", user.email, user.role, user.active);
  await prisma.$disconnect();
}

main();
