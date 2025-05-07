/*
  Warnings:

  - You are about to alter the column `fillOpacity` on the `MapElement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `lineWidth` on the `MapElement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "MapElement" ALTER COLUMN "fillOpacity" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "lineWidth" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpiry" SET DEFAULT CURRENT_TIMESTAMP + interval '3 days';
