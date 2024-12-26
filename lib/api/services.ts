// app/lib/api/services.ts
import { prisma } from "@/lib/db";

export async function getServiceById(id: string) {
  return await prisma.service.findUnique({
    where: { id },
  });
}

export async function searchServices(params: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
  page?: number;
  limit?: number;
}) {
  const { name, category, minPrice, maxPrice, duration, page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (name) {
    where.name = {
      contains: name,
      mode: 'insensitive',
    };
  }

  if (category) {
    where.category = category;
  }

  if (minPrice) {
    where.price = {
      ...where.price,
      gte: minPrice,
    };
  }

  if (maxPrice) {
    where.price = {
      ...where.price,
      lte: maxPrice,
    };
  }

  if (duration) {
    where.duration = duration;
  }

  const [total, services] = await Promise.all([
    prisma.service.count({ where }),
    prisma.service.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    }),
  ]);

  return {
    services,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      limit,
    },
  };
}
