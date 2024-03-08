-- CreateEnum
CREATE TYPE "status" AS ENUM ('DRAFT', 'PUBLISHED', 'UNLISTED');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_inventoryId_key" ON "Product"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
