/*
  Warnings:

  - You are about to drop the column `spicyness` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "spicyness",
ADD COLUMN     "hasSpicyness" BOOLEAN NOT NULL DEFAULT false;
