/*
  Warnings:

  - Added the required column `email` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OTP` DROP FOREIGN KEY `OTP_userId_fkey`;

-- DropIndex
DROP INDEX `OTP_userId_fkey` ON `OTP`;

-- AlterTable
ALTER TABLE `OTP` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `OTP` ADD CONSTRAINT `OTP_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
