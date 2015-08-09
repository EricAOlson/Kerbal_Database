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

-- Creation of Tables, establishing primary and foreign keys.  All deletes cascascade.
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
PRIMARY KEY (mission_id, planet_id),
FOREIGN KEY (mission_id) REFERENCES Mission(id) ON DELETE CASCADE,
FOREIGN KEY (planet_id) REFERENCES Planet(id) ON DELETE CASCADE
)ENGINE = INNODB;

CREATE TABLE Mission_Moon(
mission_id int,
moon_id int,
PRIMARY KEY (mission_id, moon_id),
FOREIGN KEY (mission_id) REFERENCES Mission(id) ON DELETE CASCADE,
FOREIGN KEY (moon_id) REFERENCES Moon(id) ON DELETE CASCADE
)ENGINE = INNODB;

-- Populated some initial data for viewing, can be deleted/changed via GUI
INSERT INTO Kerbal(name, courage, stupidity) VALUES
('Jebediah Kerman', 4, 9),
('Bob Kerman', 8, 2),
('Buzz Aldrin', 8, 4),
('Neil Armstrong', 9, 1);

INSERT INTO Ship(name, seats, stages, lander) VALUES
('Falcon', 2, 5, FALSE),
('Eagle', 2, 4, TRUE),
('Sparrow', 2, 2, TRUE);

INSERT INTO Mission(name, first_launch_year, ship_id) VALUES
('Kerbite I', 2002, 1),
('Apollo XI', 1969, 2),
('Unity II', 204, 3);

INSERT INTO Kerbal_Mission(kerbal_id, mission_id) VALUES
(1,1),
(2,1),
(2,3),
(3,2),
(4,2),
(4,3);

INSERT INTO Planet(name, radius, inclination, gravity, atmosphere) VALUES
('Kerbin', 600, 0, 9.81, TRUE),
('Eve', 700, 2.1, 16.7, TRUE),
('Jool', 6000, 1.3, 7.85, TRUE),
('Duna', 320, 0.06, 2.94, TRUE);

INSERT INTO Moon(name, radius, gravity, atmosphere, orbits) VALUES
('Mun', 200, 1.63, FALSE, 1),
('Gilly', 13, 0.049, FALSE, 2),
('Laythe', 500, 7.85, TRUE, 3),
('Tylo', 600, 7.85, FALSE, 3),
('Bop', 65, 0.589, FALSE, 3),
('Ike', 130, 1.1, FALSE, 4);

INSERT INTO Mission_Planet(mission_id, planet_id) VALUES
(1, 2),
(1, 3),
(3, 4);

INSERT INTO Mission_Moon(mission_id, moon_id) VALUES
(1, 4),
(1, 5),
(2, 1),
(3, 6);