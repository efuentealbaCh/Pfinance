-- AlterTable
ALTER TABLE "shared_debt_splits" ADD COLUMN     "payment_confirmed_at" TIMESTAMP(0),
ADD COLUMN     "payment_declared_at" TIMESTAMP(0);
