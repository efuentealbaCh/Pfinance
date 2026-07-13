import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const category = await this.prisma.categories.create({
      data: {
        id: randomUUID(),
        name: data.name,
        color: data.color || '#cccccc',
        icon: data.icon || 'default',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    return { category };
  }

  async findAll() {
    const categories = await this.prisma.categories.findMany({
      orderBy: { name: 'asc' },
    });
    return categories;
  }

  async findOne(id: string) {
    const category = await this.prisma.categories.findFirst({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, data: any) {
    const category = await this.prisma.categories.findFirst({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');

    const updated = await this.prisma.categories.update({
      where: { id },
      data: {
        name: data.name,
        color: data.color,
        icon: data.icon,
        updated_at: new Date(),
      },
    });
    return updated;
  }

  async remove(id: string) {
    const category = await this.prisma.categories.findFirst({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');

    await this.prisma.categories.delete({ where: { id } });
    return { message: 'Category deleted' };
  }
}
