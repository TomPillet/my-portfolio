/*
  Warnings:

  - The values [frontend,backend,mobile,logiciel,cms,testing,devops,design,infrastructure] on the enum `Skill_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Skill` MODIFY `type` ENUM('FRONT', 'BACK', 'MOBILE', 'SOFTWARE', 'CMS', 'TESTING', 'DEVOPS', 'DESIGN', 'INFRASTRUCTURE') NOT NULL;
