-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "available" DROP NOT NULL,
ALTER COLUMN "available" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "StockHistory" ALTER COLUMN "prevAvaliable" DROP NOT NULL,
ALTER COLUMN "prevAvaliable" SET DEFAULT 0,
ALTER COLUMN "avaliable" DROP NOT NULL,
ALTER COLUMN "avaliable" SET DEFAULT 0,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 0;
