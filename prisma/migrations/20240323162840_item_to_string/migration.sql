/*
  Warnings:

  - You are about to drop the `coachprofile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[firstName]` on the table `studentprofile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `inventoryitem` MODIFY `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `coachprofile`;

-- CreateIndex
CREATE UNIQUE INDEX `StudentProfile_firstName_key` ON `studentprofile`(`firstName`);
