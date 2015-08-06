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
FOREIGN KEY (orbits) REFERENCES Planet(id) ON DELETE CASCADE
)ENGINE = INNODB;

CREATE TABLE Mission(
id int AUTO_INCREMENT PRIMARY KEY,
name varchar(255) NOT NULL,
first_launch_year int,
ship_id int,
FOREIGN KEY (ship_id) REFERENCES Ship(id) ON DELETE CASCADE
)ENGINE = INNODB;

CREATE TABLE Kerbal_Mission(
kerbal_id int,
mission_id int,
PRIMARY KEY (kerbal_id, mission_id),
FOREIGN KEY (kerbal_id) REFERENCES Kerbal(id) ON DELETE CASCADE,
FOREIGN KEY (mission_id) REFERENCES Mission(id) ON DELETE CASCADE
)ENGINE = INNODB;

CREATE TABLE Mission_Planet(
mission_id int,
planet_id int,
result varchar(7),
PRIMARY KEY (mission_id, planet_id),
FOREIGN KEY (mission_id) REFERENCES Mission(id) ON DELETE CASCADE,
FOREIGN KEY (planet_id) REFERENCES Planet(id) ON DELETE CASCADE
)ENGINE = INNODB;

CREATE TABLE Mission_Moon(
mission_id int,
moon_id int,
result varchar(7),
PRIMARY KEY (mission_id, moon_id),
FOREIGN KEY (mission_id) REFERENCES Mission(id) ON DELETE CASCADE,
FOREIGN KEY (moon_id) REFERENCES Moon(id) ON DELETE CASCADE
)ENGINE = INNODB;

-- Temp Data for display
INSERT INTO Kerbal(name, courage, stupidity) VALUES
('jebadiah',7,9),
('Jesebel',8,9);

INSERT INTO Ship(name, seats, stages, lander) VALUES
('Falcon', 2, 3, TRUE),
('Spud', 0, 2, FALSE),
('Eagle', 2, 4, TRUE);

INSERT INTO Mission(name, first_launch_year, ship_id) VALUES
('Apollo',2007, 3),
('Sputnik',2010, 2);

INSERT INTO Kerbal_Mission(kerbal_id, mission_id) VALUES
(1,2),
(1,1),
(2,1);

INSERT INTO Planet(name, radius, inclination, gravity, atmosphere) VALUES
('Kerbin', 44.5, 7.4, 22.3, TRUE),
('Uolo', 12, 4.4, 2, FALSE);

INSERT INTO Moon(name, radius, gravity, atmosphere, orbits) VALUES
('Mun', 44.5, 22.3, TRUE, 1),
('Minmus', 12, 2, FALSE, 1);

INSERT INTO Mission_Planet(mission_id, planet_id, result) VALUES
(2, 1, 'Success');

INSERT INTO Mission_Moon(mission_id, moon_id, result) VALUES
(1, 1, 'Success'),
(1, 2, 'Failure');