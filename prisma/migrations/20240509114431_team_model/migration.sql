/*
  Warnings:

  - You are about to drop the column `eventId` on the `team` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `team_eventId_fkey` ON `team`;

-- AlterTable
ALTER TABLE `team` DROP COLUMN `eventId`;
