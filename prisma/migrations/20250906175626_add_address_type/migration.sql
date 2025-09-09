/*
  Warnings:

  - You are about to drop the column `fullName` on the `Address` table. All the data in the column will be lost.
  - Added the required column `addressType` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` DROP COLUMN `fullName`,
    ADD COLUMN `addressType` VARCHAR(191) NOT NULL;
