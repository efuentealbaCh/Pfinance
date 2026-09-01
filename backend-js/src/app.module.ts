import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { BanksModule } from './banks/banks.module';
import { AccountTypesModule } from './account-types/account-types.module';
import { CategoriesModule } from './categories/categories.module';
import { UserAccountsModule } from './user-accounts/user-accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BudgetsModule } from './budgets/budgets.module';
import { SavingsGoalsModule } from './savings-goals/savings-goals.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExportModule } from './export/export.module';
import { GroupsModule } from './groups/groups.module';
import { SharedDebtsModule } from './shared-debts/shared-debts.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        // Límite default para el resto de la API: 100 requests por minuto por IP.
        // Los endpoints de auth más expuestos a abuso sobreescriben esto con @Throttle().
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    MailModule,
    AuthModule,
    BanksModule,
    AccountTypesModule,
    CategoriesModule,
    UserAccountsModule,
    TransactionsModule,
    BudgetsModule,
    SavingsGoalsModule,
    DashboardModule,
    ExportModule,
    GroupsModule,
    SharedDebtsModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
