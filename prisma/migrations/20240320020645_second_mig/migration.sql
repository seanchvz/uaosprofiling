/*
  Warnings:

  - You are about to drop the column `SportId` on the `events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isExternal]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isInternal]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Sport` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `SportId`,
    ADD COLUMN `Sport` VARCHAR(191) NOT NULL,
    ADD COLUMN `isExternal` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isInternal` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `StudentProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `birthDate` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `civilStatus` VARCHAR(191) NOT NULL,
    `isMale` BOOLEAN NOT NULL DEFAULT false,
    `isFemale` BOOLEAN NOT NULL DEFAULT false,
    `yrStartedPlaying` INTEGER NOT NULL,
    `mothersName` VARCHAR(191) NOT NULL,
    `fathersName` VARCHAR(191) NOT NULL,
    `courseAndYear` VARCHAR(191) NOT NULL,
    `contactNumber` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `homeAddress` VARCHAR(191) NOT NULL,
    `weight` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `bloodType` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StudentProfile_firstName_key`(`firstName`),
    UNIQUE INDEX `StudentProfile_isMale_key`(`isMale`),
    UNIQUE INDEX `StudentProfile_isFemale_key`(`isFemale`),
    UNIQUE INDEX `StudentProfile_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `events_isExternal_key` ON `events`(`isExternal`);

-- CreateIndex
CREATE UNIQUE INDEX `events_isInternal_key` ON `events`(`isInternal`);
