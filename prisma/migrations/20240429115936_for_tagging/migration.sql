/*
  Warnings:

  - You are about to drop the column `age` on the `studentprofile` table. All the data in the column will be lost.
  - You are about to drop the column `civilStatus` on the `studentprofile` table. All the data in the column will be lost.
  - Added the required column `UpdatedAt` to the `studentprofile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicYear` to the `studentprofile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactNumber` to the `studentprofile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactPerson` to the `studentprofile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coachprofile` ADD COLUMN `remarks` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `studentprofile` DROP COLUMN `age`,
    DROP COLUMN `civilStatus`,
    ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `academicYear` VARCHAR(191) NOT NULL,
    ADD COLUMN `emergencyContactNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `emergencyContactPerson` VARCHAR(191) NOT NULL,
    ADD COLUMN `guardiansName` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `remarks` VARCHAR(191) NULL,
    ADD COLUMN `sport` VARCHAR(191) NULL,
    ADD COLUMN `statusIsActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `statusIsInactive` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isMale` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isFemale` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `mothersName` VARCHAR(191) NULL,
    MODIFY `fathersName` VARCHAR(191) NULL,
    MODIFY `weight` VARCHAR(191) NULL,
    MODIFY `height` VARCHAR(191) NULL,
    MODIFY `bloodType` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `StudentEvent` (
    `studentId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,

    PRIMARY KEY (`studentId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StudentEvents` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StudentEvents_AB_unique`(`A`, `B`),
    INDEX `_StudentEvents_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentEvent` ADD CONSTRAINT `StudentEvent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `studentprofile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentEvent` ADD CONSTRAINT `StudentEvent_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentEvents` ADD CONSTRAINT `_StudentEvents_A_fkey` FOREIGN KEY (`A`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentEvents` ADD CONSTRAINT `_StudentEvents_B_fkey` FOREIGN KEY (`B`) REFERENCES `studentprofile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
