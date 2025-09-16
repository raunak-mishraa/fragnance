/*
  Warnings:

  - Made the column `slug` on table `Brand` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Brand` MODIFY `slug` VARCHAR(191) NOT NULL;
