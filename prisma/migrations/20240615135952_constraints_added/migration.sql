-- AlterTable
ALTER TABLE `cart` MODIFY `quantity` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `category` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `flower` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `image_url` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `orderitem` MODIFY `quantity` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;
