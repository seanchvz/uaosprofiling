/*
  Warnings:

  - You are about to drop the `_EventTeams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeamMembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `landLineNumber` to the `studentprofile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_EventTeams` DROP FOREIGN KEY `_EventTeams_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EventTeams` DROP FOREIGN KEY `_EventTeams_B_fkey`;

-- DropForeignKey
ALTER TABLE `_TeamMembers` DROP FOREIGN KEY `_TeamMembers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TeamMembers` DROP FOREIGN KEY `_TeamMembers_B_fkey`;

-- AlterTable
ALTER TABLE `studentprofile` ADD COLUMN `QPI` VARCHAR(191) NULL,
    ADD COLUMN `landLineNumber` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_EventTeams`;

-- DropTable
DROP TABLE `_TeamMembers`;

-- DropTable
DROP TABLE `team`;
