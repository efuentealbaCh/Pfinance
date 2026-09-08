import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { PushModule } from './push/push.module';
import { AuthModule } from './auth/auth.module';
import { BanksModule } from './banks/banks.module';
import { AccountTypesModule } from './account-types/account-types.module';
import { CategoriesModule } from './categories/categories.module';
import { UserAccountsModule } from './user-accounts/user-accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { RecurringTransactionsModule } from './recurring-transactions/recurring-transactions.module';
import { BudgetsModule } from './budgets/budgets.module';
import { SavingsGoalsModule } from './savings-goals/savings-goals.module';
import { CurrencyModule } from './currency/currency.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExportModule } from './export/export.module';
import { StatementImportModule } from './statement-import/statement-import.module';
import { ReportsModule } from './reports/reports.module';
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
    // Habilita los @Cron del proyecto (hoy: el aviso diario de cuotas recurrentes, el
    // resumen mensual del día 1 y la carga diaria del dólar observado).
    ScheduleModule.forRoot(),
    PrismaModule,
    MailModule,
    PushModule,
    AuthModule,
    BanksModule,
    AccountTypesModule,
    CategoriesModule,
    UserAccountsModule,
    TransactionsModule,
    RecurringTransactionsModule,
    BudgetsModule,
    SavingsGoalsModule,
    CurrencyModule,
    DashboardModule,
    ExportModule,
    StatementImportModule,
    ReportsModule,
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
