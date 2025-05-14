/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "boatId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpiry" SET DEFAULT CURRENT_TIMESTAMP + interval '3 days';

-- DropTable
DROP TABLE "Transaction";

-- DropEnum
DROP TYPE "TransactionStatus";
