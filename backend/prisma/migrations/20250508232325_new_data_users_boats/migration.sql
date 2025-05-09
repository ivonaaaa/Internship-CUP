/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration]` on the table `Boat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Boat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration` to the `Boat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Boat" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "registration" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneNumber",
DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL,
ALTER COLUMN "subscriptionExpiry" SET DEFAULT CURRENT_TIMESTAMP + interval '3 days';

-- CreateIndex
CREATE UNIQUE INDEX "Boat_registration_key" ON "Boat"("registration");
