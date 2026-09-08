-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "import_fingerprint" VARCHAR(64),
ADD COLUMN     "statement_import_id" UUID;

-- CreateTable
CREATE TABLE "statement_imports" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "user_account_id" UUID NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "imported_count" INTEGER NOT NULL,
    "duplicate_count" INTEGER NOT NULL,
    "skipped_count" INTEGER NOT NULL,
    "balance_before" DECIMAL(15,2) NOT NULL,
    "mapping" JSONB NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statement_imports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_statement_mappings" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "bank_id" UUID NOT NULL,
    "config" JSONB NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bank_statement_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "statement_imports_user_created_idx" ON "statement_imports"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "bank_statement_mappings_user_bank_unique" ON "bank_statement_mappings"("user_id", "bank_id");

-- CreateIndex
CREATE INDEX "transactions_statement_import_id_index" ON "transactions"("statement_import_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_account_fingerprint_unique" ON "transactions"("user_account_id", "import_fingerprint");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_statement_import_id_fkey" FOREIGN KEY ("statement_import_id") REFERENCES "statement_imports"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "statement_imports" ADD CONSTRAINT "statement_imports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "statement_imports" ADD CONSTRAINT "statement_imports_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bank_statement_mappings" ADD CONSTRAINT "bank_statement_mappings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bank_statement_mappings" ADD CONSTRAINT "bank_statement_mappings_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

