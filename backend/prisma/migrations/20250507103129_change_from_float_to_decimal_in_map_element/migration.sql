/*
  Warnings:

  - You are about to alter the column `fillOpacity` on the `MapElement` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `lineWidth` on the `MapElement` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "MapElement" ALTER COLUMN "fillOpacity" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "lineWidth" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpiry" SET DEFAULT CURRENT_TIMESTAMP + interval '3 days';
