import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export const seed = async () => {
  const hashedPassword = await bcrypt.hash('123456', 10);
  await db.role.createMany({
    data: [
      {
        id: 1,
        name: 'ADMIN',
      },
      {
        id: 2,
        name: 'CUSTOMER',
      },
    ],
  });

  await db.user.create({
    data: {
      name: 'John Walker',
      email: 'admin@email.com',
      password: hashedPassword,
      roleId: 1,
    },
  });

  await db.category.createMany({
    data: [
      {
        id: 1,
        name: 'Electronics',
      },
      {
        id: 2,
        name: 'Clothes',
      },
    ],
  });

  await db.product.createMany({
    data: [
      {
        name: 'mouse',
        amount: 25.50,
        code: 'AAA000',
        description: 'This mouse is fast.',
        quantity: '11',
        categoryId: 1,
      },
    ],
  });
};
seed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
