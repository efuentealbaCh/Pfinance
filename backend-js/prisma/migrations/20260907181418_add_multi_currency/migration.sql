-- AlterTable
ALTER TABLE "user_accounts" ADD COLUMN     "currency" VARCHAR(3) NOT NULL DEFAULT 'CLP';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "base_currency" VARCHAR(3) NOT NULL DEFAULT 'CLP';

-- CreateTable
CREATE TABLE "exchange_rates" (
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "base_currency" VARCHAR(3) NOT NULL,
    "quote_currency" VARCHAR(3) NOT NULL,
    "rate" DECIMAL(18,6) NOT NULL,
    "source" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exchange_rates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "exchange_rates_pair_date_idx" ON "exchange_rates"("base_currency", "quote_currency", "date");

-- CreateIndex
CREATE UNIQUE INDEX "exchange_rates_date_pair_unique" ON "exchange_rates"("date", "base_currency", "quote_currency");
