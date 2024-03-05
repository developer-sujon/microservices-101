/*
  Warnings:

  - You are about to drop the column `quatity` on the `StockHistory` table. All the data in the column will be lost.
  - You are about to drop the column `typef` on the `StockHistory` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `StockHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `StockHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockHistory" DROP COLUMN "quatity",
DROP COLUMN "typef",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "type" "ActionType" NOT NULL;
