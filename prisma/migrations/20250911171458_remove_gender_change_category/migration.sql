/*
  Warnings:

  - The values [male,female] on the enum `Perfume_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Perfume` MODIFY `category` ENUM('men', 'women', 'unisex') NOT NULL;
