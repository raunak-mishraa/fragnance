-- DropForeignKey
ALTER TABLE `PerfumeImage` DROP FOREIGN KEY `PerfumeImage_perfumeId_fkey`;

-- AddForeignKey
ALTER TABLE `PerfumeImage` ADD CONSTRAINT `PerfumeImage_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `Perfume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
