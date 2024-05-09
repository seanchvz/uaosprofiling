-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `team_eventId_fkey`;

-- CreateTable
CREATE TABLE `_EventTeams` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EventTeams_AB_unique`(`A`, `B`),
    INDEX `_EventTeams_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EventTeams` ADD CONSTRAINT `_EventTeams_A_fkey` FOREIGN KEY (`A`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventTeams` ADD CONSTRAINT `_EventTeams_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
