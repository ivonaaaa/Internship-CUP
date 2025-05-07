/*
  Warnings:

  - You are about to drop the column `color` on the `MapElement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MapElement" DROP COLUMN "color",
ADD COLUMN     "fillColor" TEXT,
ADD COLUMN     "fillOpacity" INTEGER,
ADD COLUMN     "lineColor" TEXT,
ADD COLUMN     "lineWidth" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpiry" SET DEFAULT CURRENT_TIMESTAMP + interval '3 days';

-- DropEnum
DROP TYPE "MapElementColor";
