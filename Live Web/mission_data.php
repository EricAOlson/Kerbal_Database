<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

//Access User Database
include "database_setting.php";  //Contains DB login info {$db_host, $db_user, $db_pass}
$kerbalsqli = new mysqli($db_host, $db_user, $db_pass, $db_user);
if ($kerbalsqli->connect_errno) {
	alert("Error: Unable to access kerbal database.");  //Code for Unable to access database.
	echo "Error: Unable to access kerbal database.";
	die();
}

//Adds a mission data to database.
if (isset($_GET['req']) && ($_GET['req'] == "mission_add")){
	//Adds Mission and ship assigned data.
	if (isset($_GET['mission']) && isset($_GET['launch']) && isset($_GET['ship'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Mission (name, first_launch_year, ship_id) 
									  VALUES (?, ?, ?)");
		$stmt->bind_param("sii", $_GET['mission'], $_GET['launch'], $_GET['ship']);
		$stmt->execute();
		$stmt->close();
	}
	//Add Kerbal's connected.
	if (isset($_GET['mission']) && isset($_GET['kerbals'])){
		$kerbals = json_decode($_GET['kerbals']);
		for ($x = 0; $x < count($kerbals); $x++){
			$stmt = $kerbalsqli->prepare("INSERT INTO Kerbal_Mission (kerbal_id, mission_id) 
			     						  VALUES (?, (SELECT MAX(id) FROM Mission WHERE name = ?))");
			$stmt->bind_param("is", $kerbals[$x], $_GET['mission']);
			$stmt->execute();
			$stmt->close();
		}
	}
	//Add Planet's connected.
	if (isset($_GET['mission']) && isset($_GET['planets'])){
		$planets = json_decode($_GET['planets']);
		for ($x = 0; $x < count($planets); $x++){
			$stmt = $kerbalsqli->prepare("INSERT INTO Mission_Planet (mission_id, planet_id) 
			     						  VALUES ((SELECT MAX(id) FROM Mission WHERE name = ?), ?)");
			$stmt->bind_param("si", $_GET['mission'], $planets[$x]);
			$stmt->execute();
			$stmt->close();
		}
	}
	//Add Moons's connected.
	if (isset($_GET['mission']) && isset($_GET['moons'])){
		$moons = json_decode($_GET['moons']);
		for ($x = 0; $x < count($planets); $x++){
			$stmt = $kerbalsqli->prepare("INSERT INTO Mission_Moon (mission_id, moon_id) 
			     						  VALUES ((SELECT MAX(id) FROM Mission WHERE name = ?), ?)");
			$stmt->bind_param("si", $_GET['mission'], $moons[$x]);
			$stmt->execute();
			$stmt->close();
		}
	}
}



//Deletes a mission from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_mission")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Mission WHERE id=?");
		$stmt->bind_param("i", $_GET['id']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}