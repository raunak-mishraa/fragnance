-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_perfumeId_fkey`;

-- DropForeignKey
ALTER TABLE `FragranceNotes` DROP FOREIGN KEY `FragranceNotes_perfumeId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_perfumeId_fkey`;

-- DropForeignKey
ALTER TABLE `PerfumeVariant` DROP FOREIGN KEY `PerfumeVariant_perfumeId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_perfumeId_fkey`;

-- DropForeignKey
ALTER TABLE `Wishlist` DROP FOREIGN KEY `Wishlist_perfumeId_fkey`;

-- AddForeignKey
ALTER TABLE `PerfumeVariant` ADD CONSTRAINT `PerfumeVariant_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FragranceNotes` ADD CONSTRAINT `FragranceNotes_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
