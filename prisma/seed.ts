import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@menuqr.com' },
    update: {},
    create: { name: 'Super Admin', email: 'admin@menuqr.com', password: adminPassword, role: 'ADMIN' },
  });

  const ownerPassword = await bcrypt.hash('owner123', 10);
  const owner = await prisma.user.upsert({
    where: { email: 'owner@warung.com' },
    update: {},
    create: { name: 'Bu Sari', email: 'owner@warung.com', password: ownerPassword, role: 'OWNER' },
  });

  const store = await prisma.store.upsert({
    where: { slug: 'warung-bu-sari' },
    update: {},
    create: {
      name: 'Warung Bu Sari',
      slug: 'warung-bu-sari',
      description: 'Warung makan rumahan enak dan murah',
      address: 'Jl. Soekarno Hatta No. 10, Malang',
      phone: '081234567890',
      ownerId: owner.id,
    },
  });

  const catMakan = await prisma.category.upsert({
    where: { id: 'cat-makan-001' },
    update: {},
    create: { id: 'cat-makan-001', name: 'Makanan', storeId: store.id, sortOrder: 1 },
  });

  const catMinum = await prisma.category.upsert({
    where: { id: 'cat-minum-001' },
    update: {},
    create: { id: 'cat-minum-001', name: 'Minuman', storeId: store.id, sortOrder: 2 },
  });

  await prisma.menuItem.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Nasi Goreng Spesial', price: 15000, categoryId: catMakan.id, sortOrder: 1 },
      { name: 'Ayam Bakar', price: 20000, categoryId: catMakan.id, sortOrder: 2 },
      { name: 'Soto Ayam', price: 12000, categoryId: catMakan.id, sortOrder: 3 },
      { name: 'Mie Goreng', price: 13000, categoryId: catMakan.id, sortOrder: 4 },
      { name: 'Es Teh Manis', price: 5000, categoryId: catMinum.id, sortOrder: 1 },
      { name: 'Es Jeruk', price: 7000, categoryId: catMinum.id, sortOrder: 2 },
      { name: 'Jus Alpukat', price: 12000, categoryId: catMinum.id, sortOrder: 3 },
    ],
  });

  console.log('Seed selesai!');
  console.log('Admin   : admin@menuqr.com / admin123');
  console.log('Owner   : owner@warung.com / owner123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
