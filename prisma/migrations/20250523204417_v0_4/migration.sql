/*
  Warnings:

  - You are about to drop the `CategoriesOnProjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CategoriesOnProjects` DROP FOREIGN KEY `CategoriesOnProjects_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `CategoriesOnProjects` DROP FOREIGN KEY `CategoriesOnProjects_projectId_fkey`;

-- DropTable
DROP TABLE `CategoriesOnProjects`;
