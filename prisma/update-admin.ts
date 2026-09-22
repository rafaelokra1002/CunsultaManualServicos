import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const newPassword = await hash("259918", 12);
  
  const admin = await prisma.user.upsert({
    where: { email: "okra12559@gmail.com" },
    update: {
      password: newPassword,
      role: Role.ADMIN,
      active: true,
    },
    create: {
      nome: "Admin Okra",
      email: "okra12559@gmail.com",
      password: newPassword,
      role: Role.ADMIN,
      active: true,
    },
  });

  console.log("Admin atualizado:", admin.email, "| Role:", admin.role, "| Active:", admin.active);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
