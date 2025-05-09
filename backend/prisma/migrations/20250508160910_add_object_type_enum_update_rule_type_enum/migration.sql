/*
  Warnings:

  - The values [SPEED_RESTRICTION,ANCHORING_RESTRICTION,ENVIRONMENTAL_PROTECTION] on the enum `RuleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ObjectType" AS ENUM ('ANCHOR', 'LIGHTHOUSE', 'FUEL_DOCK', 'RIDGE', 'HARBOR_MASTER');

-- AlterEnum
BEGIN;
CREATE TYPE "RuleType_new" AS ENUM ('RESTRICTION', 'INFO', 'WARNING');
ALTER TABLE "Rule" ALTER COLUMN "type" TYPE "RuleType_new" USING ("type"::text::"RuleType_new");
ALTER TYPE "RuleType" RENAME TO "RuleType_old";
ALTER TYPE "RuleType_new" RENAME TO "RuleType";
DROP TYPE "RuleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "MapElement" DROP CONSTRAINT "MapElement_ruleId_fkey";

-- AlterTable
ALTER TABLE "MapElement" ADD COLUMN     "objectType" "ObjectType",
ALTER COLUMN "ruleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpiry" SET DEFAULT CURRENT_TIMESTAMP + interval '3 days';

-- AddForeignKey
ALTER TABLE "MapElement" ADD CONSTRAINT "MapElement_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
