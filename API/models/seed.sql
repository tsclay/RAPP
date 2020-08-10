DROP DATABASE IF EXISTS contacts;
DROP USER IF EXISTS rapp;

CREATE USER rapp WITH PASSWORD 'reactPHP';

CREATE DATABASE contacts;
ALTER DATABASE contacts OWNER TO rapp;

\c contacts;

CREATE TABLE people
(id SERIAL, name VARCHAR(255), age INT);
ALTER TABLE people OWNER TO rapp;

INSERT INTO people (name, age) VALUES
('Bobby', 45),
('Thomas', 37),
('Jo', 18),
('Samantha', 25);