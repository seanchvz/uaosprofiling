/*
  Warnings:

  - You are about to drop the column `sportId` on the `team` table. All the data in the column will be lost.
  - You are about to drop the `sport` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sport` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `team_sportId_fkey`;

-- AlterTable
ALTER TABLE `team` DROP COLUMN `sportId`,
    ADD COLUMN `sport` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `sport`;
