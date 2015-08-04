-- Removal of all tables, prior to initalization, using foreign_key_checks trick found on Piazza @23.
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS Kerbal;
DROP TABLE IF EXISTS Ship;
DROP TABLE IF EXISTS Planet;
DROP TABLE IF EXISTS Moon;
DROP TABLE IF EXISTS Mission;
DROP TABLE IF EXISTS Kerbal_Mission;
DROP TABLE IF EXISTS Mission_Planet;
DROP TABLE IF EXISTS Mission_Moon;
SET foreign_key_checks = 1;

CREATE TABLE Kerbal(
id int AUTO_INCREMENT PRIMARY KEY,
name varchar(255) NOT NULL,
courage smallint NOT NULL,
stupidity smallint NOT NULL
)ENGINE = INNODB;

CREATE TABLE Ship(
id int AUTO_INCREMENT PRIMARY KEY,
name varchar(255) NOT NULL,
seats int NOT NULL,
stages int NOT NULL,
lander boolean NOT NULL
)ENGINE = INNODB;

CREATE TABLE Planet(
id int AUTO_INCREMENT PRIMARY KEY,
name varchar(255) NOT NULL,
radius float NOT NULL,
inclination float NOT NULL,
gravity float NOT NULL,
atmosphere boolean NOT NULL
)ENGINE = INNODB;

CREATE TABLE Moon(
id int AUTO_INCREMENT PRIMARY KEY,
name varchar(255) NOT NULL,
radius float NOT NULL,
gravity float NOT NULL,
atmosphere boolean NOT NULL,
orbits int NOT NULL,
FOREIGN KEY (orbits) REFERENCES Planet(id)
)ENGINE = INNODB;

CREATE TABLE Mission(
id int AUTO_INCREMENT PRIMARY KEY,
name varchar(255) NOT NULL,
first_launch_year int,
ship_id int,
FOREIGN KEY (ship_id) REFERENCES Ship(id)
)ENGINE = INNODB;

CREATE TABLE Kerbal_Mission(
kerbal_id int,
mission_id int,
PRIMARY KEY (kerbal_id, mission_id),
FOREIGN KEY (kerbal_id) REFERENCES Kerbal(id),
FOREIGN KEY (mission_id) REFERENCES Mission(id)
)ENGINE = INNODB;

CREATE TABLE Mission_Planet(
mission_id int,
planet_id int,
result varchar(7),
PRIMARY KEY (mission_id, planet_id),
FOREIGN KEY (mission_id) REFERENCES Mission(id),
FOREIGN KEY (planet_id) REFERENCES Planet(id)
)ENGINE = INNODB;

CREATE TABLE Mission_Moon(
mission_id int,
moon_id int,
result varchar(7),
PRIMARY KEY (mission_id, moon_id),
FOREIGN KEY (mission_id) REFERENCES Mission(id),
FOREIGN KEY (moon_id) REFERENCES Moon(id)
)ENGINE = INNODB;