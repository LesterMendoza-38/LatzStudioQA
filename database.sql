CREATE DATABASE latz_studio;
USE latz_studio;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  precio DECIMAL(10,2),
  imagen TEXT,
  stock INT
);

INSERT INTO productos (nombre, precio, imagen, stock) VALUES
('Base Líquida', 120.00, 'https://via.placeholder.com/300', 5),
('Labial Matte', 75.00, 'https://via.placeholder.com/300', 0),
('Sombras Nude', 150.00, 'https://via.placeholder.com/300', 10);
