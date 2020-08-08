DROP DATABASE IF EXISTS contacts;

CREATE DATABASE contacts;

\c contacts;

CREATE TABLE people
(id SERIAL, name VARCHAR(255), age INT);

INSERT INTO people (name, age) VALUES
('Bobby', 45),
('Thomas', 37),
('Jo', 18),
('Samantha', 25);