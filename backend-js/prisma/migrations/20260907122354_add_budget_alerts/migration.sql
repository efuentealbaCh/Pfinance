-- CreateTable
CREATE TABLE "budget_alerts" (
    "id" UUID NOT NULL,
    "budget_id" UUID NOT NULL,
    "period_key" VARCHAR(20) NOT NULL,
    "threshold" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "budget_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "budget_alerts_budget_period_threshold_unique" ON "budget_alerts"("budget_id", "period_key", "threshold");

-- AddForeignKey
ALTER TABLE "budget_alerts" ADD CONSTRAINT "budget_alerts_budget_id_foreign" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
