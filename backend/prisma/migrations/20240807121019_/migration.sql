-- CreateTable
CREATE TABLE `alats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_alat` VARCHAR(100) NOT NULL,
    `gambar` VARCHAR(100) NULL,
    `url` VARCHAR(100) NULL,
    `service` BOOLEAN NULL DEFAULT false,
    `kondisi` VARCHAR(200) NULL,
    `dipakai` BOOLEAN NULL DEFAULT false,
    `deskripsi` VARCHAR(100) NULL,
    `no_seri` VARCHAR(100) NULL,
    `diperoleh` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dipakais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pemakai` VARCHAR(100) NULL,
    `waktu_pinjam` VARCHAR(100) NULL,
    `waktu_selesai` VARCHAR(100) NULL,
    `deskripsi` VARCHAR(100) NULL,
    `alat_id` INTEGER NULL,

    INDEX `fk_dipakai_alats`(`alat_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_service` VARCHAR(100) NULL,
    `waktu` VARCHAR(100) NULL,
    `waktu_selesai` VARCHAR(100) NULL,
    `gambar` VARCHAR(100) NULL,
    `url` VARCHAR(100) NULL,
    `alat_id` INTEGER NULL,

    INDEX `fk_service_alats`(`alat_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `passwords` VARCHAR(100) NOT NULL,
    `roles` VARCHAR(100) NOT NULL,
    `uuid` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dipakais` ADD CONSTRAINT `fk_dipakai_alats` FOREIGN KEY (`alat_id`) REFERENCES `alats`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `fk_service_alats` FOREIGN KEY (`alat_id`) REFERENCES `alats`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
