/*
  Warnings:

  - Added the required column `productId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "productId" INTEGER NOT NULL;
