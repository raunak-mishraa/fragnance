/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Perfume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flavor` to the `Perfume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mrp` to the `Perfume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Perfume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Perfume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Perfume` DROP FOREIGN KEY `Perfume_categoryId_fkey`;

-- DropIndex
DROP INDEX `Perfume_categoryId_fkey` ON `Perfume`;

-- AlterTable
ALTER TABLE `Perfume` DROP COLUMN `categoryId`,
    DROP COLUMN `gender`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    DROP COLUMN `stock`,
    ADD COLUMN `category` ENUM('male', 'female', 'unisex') NOT NULL,
    ADD COLUMN `flavor` VARCHAR(191) NOT NULL,
    ADD COLUMN `mrp` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` ENUM('eau_de_parfum', 'eau_de_toilette', 'cologne', 'perfume_oil', 'body_spray') NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- CreateTable
CREATE TABLE `FragranceNotes` (
    `id` VARCHAR(191) NOT NULL,
    `topNotes` VARCHAR(191) NULL,
    `middleNotes` VARCHAR(191) NULL,
    `baseNotes` VARCHAR(191) NULL,
    `perfumeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FragranceNotes_perfumeId_key`(`perfumeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerfumeImage` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NULL,
    `perfumeId` VARCHAR(191) NOT NULL,

    INDEX `PerfumeImage_perfumeId_fkey`(`perfumeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FragranceNotes` ADD CONSTRAINT `FragranceNotes_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerfumeImage` ADD CONSTRAINT `PerfumeImage_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
