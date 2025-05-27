/*
  Warnings:

  - You are about to drop the `SkillsOnProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SkillsOnProjects` DROP FOREIGN KEY `SkillsOnProjects_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `SkillsOnProjects` DROP FOREIGN KEY `SkillsOnProjects_skillId_fkey`;

-- DropTable
DROP TABLE `SkillsOnProjects`;
