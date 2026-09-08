-- CreateTable
CREATE TABLE "savings_goal_movements" (
    "id" UUID NOT NULL,
    "savings_goal_id" UUID NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "savings_goal_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "savings_goal_movements_goal_created_idx" ON "savings_goal_movements"("savings_goal_id", "created_at");

-- AddForeignKey
ALTER TABLE "savings_goal_movements" ADD CONSTRAINT "savings_goal_movements_goal_id_foreign" FOREIGN KEY ("savings_goal_id") REFERENCES "savings_goals"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
