CREATE TABLE usuario (
    id_usuasio int,
    nom_usuario varchar(80),
    email varchar(50),
    senha varchar(20),
    tipo_usuario int
)

CREATE TABLE filmes (
    id_filme int,
    titulo varchar(50),
    genero varchar(20),
    tipo_filme varchar(20),
    classificacao smallint,
    duracao int,
    sinopse text
)