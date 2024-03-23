/*
  Warnings:

  - You are about to drop the `inventoryitem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[isExternal]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isInternal]` on the table `events` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `StudentProfile_isFemale_key` ON `studentprofile`;

-- DropIndex
DROP INDEX `StudentProfile_isMale_key` ON `studentprofile`;

-- AlterTable
ALTER TABLE `studentprofile` MODIFY `age` VARCHAR(191) NOT NULL,
    ALTER COLUMN `isMale` DROP DEFAULT,
    ALTER COLUMN `isFemale` DROP DEFAULT,
    MODIFY `yrStartedPlaying` VARCHAR(191) NOT NULL,
    MODIFY `contactNumber` VARCHAR(191) NOT NULL,
    MODIFY `weight` VARCHAR(191) NOT NULL,
    MODIFY `height` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `inventoryitem`;

-- CreateIndex
CREATE UNIQUE INDEX `events_isExternal_key` ON `events`(`isExternal`);

-- CreateIndex
CREATE UNIQUE INDEX `events_isInternal_key` ON `events`(`isInternal`);
