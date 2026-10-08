-- CreateTable
CREATE TABLE `contato` (
    `id_cont` INTEGER NOT NULL AUTO_INCREMENT,
    `id_transp` INTEGER NOT NULL,
    `telefone` VARCHAR(20) NULL,
    `email` VARCHAR(255) NOT NULL,

    INDEX `fk_contato_transp`(`id_transp`),
    PRIMARY KEY (`id_cont`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `id_end` INTEGER NOT NULL AUTO_INCREMENT,
    `id_transp` INTEGER NOT NULL,
    `cep` CHAR(8) NOT NULL,
    `bairro` VARCHAR(150) NOT NULL,
    `numero` VARCHAR(10) NULL,
    `complemento` VARCHAR(50) NULL,
    `cidade` VARCHAR(80) NOT NULL,
    `estado` CHAR(2) NOT NULL,

    INDEX `fk_endereco_transp`(`id_transp`),
    PRIMARY KEY (`id_end`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transportadora` (
    `id_transp` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` CHAR(14) NOT NULL,
    `razao_social` VARCHAR(150) NOT NULL,
    `nome_fantasia` VARCHAR(150) NULL,
    `inscricao_estadual` VARCHAR(20) NULL,
    `data_cadastro` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ativo` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `uk_transportadora_cnpj`(`cnpj`),
    PRIMARY KEY (`id_transp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `id_transp` INTEGER NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `ativo` BOOLEAN NULL DEFAULT true,
    `tipo_usuario` ENUM('ADMIN', 'USER') NOT NULL,
    `data_cadastro` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uk_usuario_email`(`email`),
    INDEX `fk_usuario_transp`(`id_transp`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agendamento` (
    `id_agenda` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `data_agenda` DATETIME(0) NOT NULL,
    `observacoes` TEXT NULL,
    `status` ENUM('PENDENTE', 'CONFIRMADO', 'CANCELADO', 'CONCLUIDO') NULL DEFAULT 'PENDENTE',
    `tipo` ENUM('COLETA', 'ENTREGA', 'DEVOLUCAO') NOT NULL,
    `data_cadastro` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_id_user`(`id_user`),
    PRIMARY KEY (`id_agenda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contato` ADD CONSTRAINT `fk_contato_transp` FOREIGN KEY (`id_transp`) REFERENCES `transportadora`(`id_transp`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `fk_endereco_transp` FOREIGN KEY (`id_transp`) REFERENCES `transportadora`(`id_transp`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_usuario_transp` FOREIGN KEY (`id_transp`) REFERENCES `transportadora`(`id_transp`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `agendamento` ADD CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user`) REFERENCES `usuario`(`id_user`) ON DELETE CASCADE ON UPDATE RESTRICT;
