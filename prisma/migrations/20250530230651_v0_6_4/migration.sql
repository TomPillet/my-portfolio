-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `Skill_levelId_fkey`;

-- DropIndex
DROP INDEX `Skill_levelId_fkey` ON `Skill`;

-- AlterTable
ALTER TABLE `Skill` MODIFY `levelId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `SkillLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
