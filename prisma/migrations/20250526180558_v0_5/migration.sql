/*
  Warnings:

  - You are about to drop the column `entrepriseId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Entreprise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
-- ALTER TABLE `Project` DROP FOREIGN KEY `Project_entrepriseId_fkey`;

-- DropIndex
-- DROP INDEX `Project_entrepriseId_fkey` ON `Project`;

-- AlterTable
ALTER TABLE `Project` 
    ADD COLUMN `etablissementId` INTEGER NULL,
    ADD COLUMN `isActive` BOOLEAN NULL DEFAULT false;

-- DropTable
-- DROP TABLE `Entreprise`;

-- CreateTable
CREATE TABLE `Etablissement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `siteUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Etablissement_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_etablissementId_fkey` FOREIGN KEY (`etablissementId`) REFERENCES `Etablissement`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
