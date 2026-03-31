import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Cria usuário admin padrão
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@consulta.com" },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@consulta.com",
      password: adminPassword,
      role: Role.ADMIN,
      active: true,
    },
  });
  console.log("Admin criado:", admin.email);

  // Cria usuário de teste
  const userPassword = await hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "usuario@teste.com" },
    update: {},
    create: {
      nome: "Usuário Teste",
      email: "usuario@teste.com",
      password: userPassword,
      role: Role.USER,
      active: true,
    },
  });
  console.log("Usuário criado:", user.email);

  // Cria manuais de exemplo
  const manuais = [
    {
      title: "Manual de Serviço Honda CG 160",
      brand: "Honda",
      model: "CG 160",
      year: 2023,
      fileUrl: "/manuais/honda-cg160-2023.pdf",
    },
    {
      title: "Manual de Serviço Yamaha Fazer 250",
      brand: "Yamaha",
      model: "Fazer 250",
      year: 2022,
      fileUrl: "/manuais/yamaha-fazer250-2022.pdf",
    },
    {
      title: "Manual de Serviço Honda CB 300R",
      brand: "Honda",
      model: "CB 300R",
      year: 2024,
      fileUrl: "/manuais/honda-cb300r-2024.pdf",
    },
    {
      title: "Manual de Serviço Yamaha MT-03",
      brand: "Yamaha",
      model: "MT-03",
      year: 2023,
      fileUrl: "/manuais/yamaha-mt03-2023.pdf",
    },
    {
      title: "Manual de Serviço Kawasaki Ninja 400",
      brand: "Kawasaki",
      model: "Ninja 400",
      year: 2024,
      fileUrl: "/manuais/kawasaki-ninja400-2024.pdf",
    },
    {
      title: "Manual de Serviço BMW G 310 R",
      brand: "BMW",
      model: "G 310 R",
      year: 2023,
      fileUrl: "/manuais/bmw-g310r-2023.pdf",
    },
  ];

  for (const manual of manuais) {
    await prisma.manual.create({ data: manual });
  }
  console.log(`${manuais.length} manuais criados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
