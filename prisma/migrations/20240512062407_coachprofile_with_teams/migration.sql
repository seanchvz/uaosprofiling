/*
  Warnings:

  - You are about to drop the column `permanentTeam` on the `coachprofile` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `coachprofile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `coachprofile` DROP COLUMN `permanentTeam`,
    DROP COLUMN `sport`;
