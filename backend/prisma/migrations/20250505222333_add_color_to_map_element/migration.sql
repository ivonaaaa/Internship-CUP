/*
  Warnings:

  - Added the required column `color` to the `MapElement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MapElementColor" AS ENUM ('RED', 'GREEN', 'BLUE', 'YELLOW', 'PURPLE', 'ORANGE', 'WHITE', 'BLACK');

-- AlterTable
ALTER TABLE "MapElement" ADD COLUMN     "color" "MapElementColor" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpiry" SET DEFAULT CURRENT_TIMESTAMP + interval '3 days';
