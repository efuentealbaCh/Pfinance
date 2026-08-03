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

  async findAccountTypesByBankId(bankId: string) {
    const bankAccountTypes = await this.prisma.bank_account_types.findMany({
      where: { bank_id: bankId },
      include: {
        account_types: true,
      },
    });
    return bankAccountTypes.map((bat) => bat.account_types);
  }
}
