/*
  Warnings:

  - You are about to drop the `description` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `description` DROP FOREIGN KEY `Description_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `description` DROP FOREIGN KEY `Description_postId_fkey`;

-- DropTable
DROP TABLE `description`;
