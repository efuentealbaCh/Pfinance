/*
  Warnings:

  - You are about to drop the column `token` on the `password_reset_tokens` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_hash` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `password_reset_tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "password_reset_tokens" DROP COLUMN "token",
ADD COLUMN     "expires_at" TIMESTAMP(0) NOT NULL,
ADD COLUMN     "token_hash" VARCHAR(255) NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
