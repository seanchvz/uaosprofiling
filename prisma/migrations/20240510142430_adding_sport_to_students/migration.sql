/*
  Warnings:

  - You are about to drop the column `Sport` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `studentprofile` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `Sport`;

-- AlterTable
ALTER TABLE `studentprofile` DROP COLUMN `sport`,
    ADD COLUMN `sportId` INTEGER NULL;

-- AlterTable
ALTER TABLE `team` DROP COLUMN `sport`,
    ADD COLUMN `sportId` INTEGER NULL;

-- CreateTable
CREATE TABLE `sport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_sportId_fkey` FOREIGN KEY (`sportId`) REFERENCES `sport`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentprofile` ADD CONSTRAINT `studentprofile_sportId_fkey` FOREIGN KEY (`sportId`) REFERENCES `sport`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
