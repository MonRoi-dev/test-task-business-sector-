/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `sex` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    ADD PRIMARY KEY (`id`);
