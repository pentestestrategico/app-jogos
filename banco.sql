create database loja_jogos;
use loja_jogos;

create table jogos(
    id int auto_increment primary key,
    nome varchar(50) not null,
    tipo varchar(100) not null,
    ano varchar(4) not null
   
);

INSERT INTO jogos (nome, tipo, ano) VALUES
('The Legend of Zelda: Breath of the Wild', 'Aventura/RPG', '2017'),
('God of War Ragnarök', 'Ação/Aventura', '2022');

select * from jogos;