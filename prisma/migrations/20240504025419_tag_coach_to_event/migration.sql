-- CreateTable
CREATE TABLE `_coachprofileToevents` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_coachprofileToevents_AB_unique`(`A`, `B`),
    INDEX `_coachprofileToevents_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_coachprofileToevents` ADD CONSTRAINT `_coachprofileToevents_A_fkey` FOREIGN KEY (`A`) REFERENCES `coachprofile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_coachprofileToevents` ADD CONSTRAINT `_coachprofileToevents_B_fkey` FOREIGN KEY (`B`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
