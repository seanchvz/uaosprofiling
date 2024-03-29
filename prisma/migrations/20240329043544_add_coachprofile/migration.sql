-- CreateTable
CREATE TABLE `coachprofile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `sport` VARCHAR(191) NOT NULL,
    `permanentTeam` VARCHAR(191) NOT NULL,
    `isMale` BOOLEAN NOT NULL DEFAULT false,
    `isFemale` BOOLEAN NOT NULL DEFAULT false,
    `emergencyContact` VARCHAR(191) NOT NULL,
    `emergencyContactPerson` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `weight` DOUBLE NULL,
    `height` DOUBLE NULL,
    `bloodType` VARCHAR(191) NULL,
    `academicYear` VARCHAR(191) NOT NULL,
    `statusIsFulltime` BOOLEAN NOT NULL DEFAULT false,
    `statusIsParttime` BOOLEAN NOT NULL DEFAULT false,
    `resumeUrl` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
