/*
  Warnings:

  - The `boatType` column on the `Boat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subscriptionPlan` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `MapElement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Rule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE_TRIAL', 'PAID');

-- CreateEnum
CREATE TYPE "BoatType" AS ENUM ('MOTORBOAT', 'DINGHY', 'YACHT');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('SUCCESSFUL', 'CANCELED');

-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('RESTRICTION', 'SPEED_RESTRICTION', 'ANCHORING_RESTRICTION', 'ENVIRONMENTAL_PROTECTION');

-- CreateEnum
CREATE TYPE "MapElementType" AS ENUM ('ZONE', 'POINT');

-- AlterTable
ALTER TABLE "Boat" DROP COLUMN "boatType",
ADD COLUMN     "boatType" "BoatType";

-- AlterTable
ALTER TABLE "MapElement" DROP COLUMN "type",
ADD COLUMN     "type" "MapElementType" NOT NULL;

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "type",
ADD COLUMN     "type" "RuleType" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptionPlan",
ADD COLUMN     "subscriptionPlan" "SubscriptionPlan" NOT NULL DEFAULT 'FREE_TRIAL',
ALTER COLUMN "subscriptionExpiry" SET DEFAULT CURRENT_TIMESTAMP + interval '3 days';
