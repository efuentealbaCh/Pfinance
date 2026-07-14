import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BanksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.banks.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
