import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.account_types.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
