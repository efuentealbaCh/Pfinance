/*
  Warnings:

  - You are about to drop the column `subscribable_id` on the `push_subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `subscribable_type` on the `push_subscriptions` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `push_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "push_subscriptions_subscribable_morph_idx";

-- AlterTable
ALTER TABLE "push_subscriptions" DROP COLUMN "subscribable_id",
DROP COLUMN "subscribable_type",
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "push_subscriptions_user_id_index" ON "push_subscriptions"("user_id");

-- AddForeignKey
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
