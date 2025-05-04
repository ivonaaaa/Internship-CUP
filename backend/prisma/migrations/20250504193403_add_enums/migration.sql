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
