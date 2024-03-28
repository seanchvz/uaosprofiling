-- DropIndex
DROP INDEX `StudentProfile_firstName_key` ON `studentprofile`;

-- DropIndex
DROP INDEX `StudentProfile_isFemale_key` ON `studentprofile`;

-- DropIndex
DROP INDEX `StudentProfile_isMale_key` ON `studentprofile`;

-- AlterTable
ALTER TABLE `studentprofile` MODIFY `age` VARCHAR(191) NOT NULL,
    ALTER COLUMN `isMale` DROP DEFAULT,
    ALTER COLUMN `isFemale` DROP DEFAULT,
    MODIFY `yrStartedPlaying` VARCHAR(191) NOT NULL,
    MODIFY `contactNumber` VARCHAR(191) NOT NULL,
    MODIFY `weight` VARCHAR(191) NOT NULL,
    MODIFY `height` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `coachProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `civilStatus` VARCHAR(191) NOT NULL,
    `isMale` BOOLEAN NOT NULL,
    `isFemale` BOOLEAN NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `homeAddress` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `bloodType` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `coachProfile_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
