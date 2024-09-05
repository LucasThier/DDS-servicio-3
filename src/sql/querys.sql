CREATE DATABASE servicio;
USE servicio;

CREATE TABLE personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  localidad VARCHAR(255) NOT NULL,
  viandas_solicitadas INT NOT NULL
);

INSERT INTO personas (nombre, localidad, viandas_solicitadas)
VALUES ('a', 'Barrio A', 8),
       ('b', 'Barrio B', 3),
       ('c', 'Barrio A', 2),
       ('d', 'Barrio B', 3),
       ('e', 'Barrio A', 0),
       ('f', 'Barrio B', 3),
       ('g', 'Barrio A', 2),
       ('h', 'Barrio C', 15);
       
TRUNCATE TABLE personas;
