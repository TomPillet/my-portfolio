/*
  Warnings:

  - You are about to drop the column `entrepriseId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Entreprise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Etablissement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_entrepriseId_fkey`;

-- DropIndex
DROP INDEX `Project_entrepriseId_fkey` ON `Project`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Etablissement` ADD COLUMN `type` ENUM('ECOLE', 'ENTREPRISE', 'COLLECTIF') NOT NULL;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `entrepriseId`;

-- DropTable
DROP TABLE `Entreprise`;
