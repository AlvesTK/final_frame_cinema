CREATE TABLE `usuario`(
    `id_usuario` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome_usuario` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `tipo_usuario` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `usuario` ADD UNIQUE `usuario_email_nome_usuario_unique`(`email`, `nome_usuario`);
CREATE TABLE `filmes`(
    `id_filme` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `titulo` VARCHAR(255) NOT NULL,
    `genero` VARCHAR(255) NOT NULL,
    `tipo_filme` VARCHAR(255) NOT NULL,
    `classificacao` SMALLINT UNSIGNED NOT NULL,
    `duracao` INT UNSIGNED NOT NULL,
    `sinopse` TEXT NOT NULL
);
CREATE TABLE `compra`(
    `id_compra` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `data_compra` DATETIME NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `status_compra` VARCHAR(20) NOT NULL,
    `data_canc` DATETIME NULL,
    `motivo_canc` TEXT NULL,
    `id_usuario` INT UNSIGNED NOT NULL
);
CREATE TABLE `pagamento`(
    `id_pagamento` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `forma_pagamento` VARCHAR(255) NOT NULL,
    `valor_pagamento` DECIMAL(10, 2) NOT NULL,
    `status_pagamento` VARCHAR(255) NOT NULL,
    `data_pagamento` DATETIME NOT NULL,
    `id_compra` BIGINT UNSIGNED NOT NULL
);
ALTER TABLE
    `pagamento` ADD UNIQUE `pagamento_id_compra_unique`(`id_compra`);
CREATE TABLE `sessao`(
    `id_sessao` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `data_sessao` DATE NOT NULL,
    `hora_sessao` TIME NOT NULL,
    `tipo_sessao` VARCHAR(255) NOT NULL,
    `sala` SMALLINT UNSIGNED NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `id_filme` INT UNSIGNED NOT NULL
);
CREATE TABLE `assento`(
    `id_assento` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fileira` CHAR(1) NOT NULL,
    `num_assento` TINYINT UNSIGNED NOT NULL,
    `status_assento` VARCHAR(255) NOT NULL DEFAULT 'livre',
    `id_sessao` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `assento` ADD UNIQUE `assento_fileira_num_assento_id_sessao_unique`(
        `fileira`,
        `num_assento`,
        `id_sessao`
    );
CREATE TABLE `ingresso`(
    `id_ingresso` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tipo` VARCHAR(255) NOT NULL,
    `status_ingresso` VARCHAR(255) NOT NULL DEFAULT 'disponivel',
    `valor_ingresso` DECIMAL(8, 2) NOT NULL,
    `id_sessao` INT UNSIGNED NOT NULL,
    `id_compra` BIGINT UNSIGNED NOT NULL
);
ALTER TABLE
    `ingresso` ADD UNIQUE `ingresso_id_sessao_tipo_id_compra_unique`(`id_sessao`, `tipo`, `id_compra`);
ALTER TABLE
    `ingresso` ADD CONSTRAINT `ingresso_id_compra_foreign` FOREIGN KEY(`id_compra`) REFERENCES `compra`(`id_compra`);
ALTER TABLE
    `assento` ADD CONSTRAINT `assento_id_sessao_foreign` FOREIGN KEY(`id_sessao`) REFERENCES `sessao`(`id_sessao`);
ALTER TABLE
    `ingresso` ADD CONSTRAINT `ingresso_id_sessao_foreign` FOREIGN KEY(`id_sessao`) REFERENCES `sessao`(`id_sessao`);
ALTER TABLE
    `sessao` ADD CONSTRAINT `sessao_id_filme_foreign` FOREIGN KEY(`id_filme`) REFERENCES `filmes`(`id_filme`);
ALTER TABLE
    `pagamento` ADD CONSTRAINT `pagamento_id_compra_foreign` FOREIGN KEY(`id_compra`) REFERENCES `compra`(`id_compra`);
ALTER TABLE
    `compra` ADD CONSTRAINT `compra_id_usuario_foreign` FOREIGN KEY(`id_usuario`) REFERENCES `usuario`(`id_usuario`);