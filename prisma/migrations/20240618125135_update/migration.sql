-- DropForeignKey
ALTER TABLE `flower` DROP FOREIGN KEY `Flower_category_id_fkey`;

-- AddForeignKey
ALTER TABLE `Flower` ADD CONSTRAINT `Flower_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
