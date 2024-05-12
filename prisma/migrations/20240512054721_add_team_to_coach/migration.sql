/*
  Warnings:

  - Added the required column `year` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `team` ADD COLUMN `year` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `_TeamCoaches` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeamCoaches_AB_unique`(`A`, `B`),
    INDEX `_TeamCoaches_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TeamCoaches` ADD CONSTRAINT `_TeamCoaches_A_fkey` FOREIGN KEY (`A`) REFERENCES `coachprofile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamCoaches` ADD CONSTRAINT `_TeamCoaches_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
