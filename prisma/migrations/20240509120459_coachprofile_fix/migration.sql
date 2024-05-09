/*
  Warnings:

  - You are about to drop the column `name` on the `coachprofile` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `coachprofile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landLineNumber` to the `coachprofile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `coachprofile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `coachprofile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coachprofile` DROP COLUMN `name`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `landLineNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `middleName` VARCHAR(191) NOT NULL;
