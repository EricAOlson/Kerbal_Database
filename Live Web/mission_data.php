<?php

/***** File contains database interface for all mission entitiy updates, add/delete/update/view *****/

error_reporting(E_ALL);
ini_set('display_errors', 1);

//Access User Database
include "database_setting.php";  //Contains DB login info {$db_host, $db_user, $db_pass}
$kerbalsqli = new mysqli($db_host, $db_user, $db_pass, $db_user);
if ($kerbalsqli->connect_errno) {
	echo "Error: Unable to access kerbal database.";
	die();
}

//Adds a new mission data to database.
if (isset($_GET['req']) && ($_GET['req'] == "mission_add")){
	$var1 = NULL;
	$var2 = NULL;
	$var3 = NULL;
	
	//Adds Mission and assigned ship data to database.
	if (isset($_GET['mission']) && isset($_GET['launch']) && isset($_GET['ship'])){
		//Checks if missing valid ship id.
		if($_GET['ship'] == undefined || $_GET['ship'] == "" || $_GET['ship'] == null) {
			$stmt = $kerbalsqli->prepare("INSERT INTO Mission (name, first_launch_year) 
										  VALUES (?, ?)");
			$var1 = urldecode($_GET['mission']);
			$var2 = urldecode($_GET['launch']);
			$stmt->bind_param("si", $var1, $var2);
			$stmt->execute();
			$stmt->close();
		}
		else {  //Else adds mission with ship id. 
			$stmt = $kerbalsqli->prepare("INSERT INTO Mission (name, first_launch_year, ship_id) 
										  VALUES (?, ?, ?)");
			$var1 = urldecode($_GET['mission']);
			$var2 = urldecode($_GET['launch']);
			$var3 = urldecode($_GET['ship']);
			$stmt->bind_param("sii", $var1, $var2, $var3);
			$stmt->execute();
			$stmt->close();
		}
	}
	
	//Add Kerbal's associated with mission.
	if (isset($_GET['mission']) && isset($_GET['kerbals'])){
		$var1 = urldecode($_GET['kerbals']);
		$kerbals = json_decode($var1);
		for ($x = 0; $x < count($kerbals); $x++){
			//Subquery identifies last added mission with desired name.
			$stmt = $kerbalsqli->prepare("INSERT INTO Kerbal_Mission (kerbal_id, mission_id) 
			     						  VALUES (?, (SELECT MAX(id) FROM Mission WHERE name = ?))");
			$var1 = urldecode($_GET['mission']);
			$stmt->bind_param("is", $kerbals[$x], $var1);
			$stmt->execute();
			$stmt->close();
		}
	}
	
	//Add Planet's associated with mission.
	if (isset($_GET['mission']) && isset($_GET['planets'])){
		$var1 = urldecode($_GET['planets']);
		$planets = json_decode($var1);
		for ($x = 0; $x < count($planets); $x++){
			//Subquery identifies last added mission with desired name.
			$stmt = $kerbalsqli->prepare("INSERT INTO Mission_Planet (mission_id, planet_id) 
			     						  VALUES ((SELECT MAX(id) FROM Mission WHERE name = ?), ?)");
			$var1 = urldecode($_GET['mission']);
			$stmt->bind_param("si", $var1, $planets[$x]);
			$stmt->execute();
			$stmt->close();
		}
	}
	
	//Add Moons's associated with mission.
	if (isset($_GET['mission']) && isset($_GET['moons'])){
		$var1 = urldecode($_GET['moons']);
		$moons = json_decode($var1);
		for ($x = 0; $x < count($planets); $x++){
			$stmt = $kerbalsqli->prepare("INSERT INTO Mission_Moon (mission_id, moon_id) 
			     						  VALUES ((SELECT MAX(id) FROM Mission WHERE name = ?), ?)");
			$var1 = urldecode($_GET['mission']);
			$stmt->bind_param("si", $var1, $moons[$x]);
			$stmt->execute();
			$stmt->close();
		}
	}
}



//Deletes a mission from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_mission")){
	$var1 = NULL;

	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Mission WHERE id=?");
		$var1 = urldecode($_GET['id']);
		$stmt->bind_param("i", $var1);
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Retrieves an array of arrays in order to populate mission change form.
if (isset($_GET['req']) && ($_GET['req'] == "mission_change_stage")){
	if(isset($_GET['id'])){
		$var1 = NULL;
		$return = array();  //Master Array to return.
		$M_year = NULL;  //To house launch year.
		$K_all = array();  //Array for all Kerbals Options.
		$K_used = array();  //Array for Kerbal's already assigned.
		$S_all = array();  //Array for all Ship Options.
		$S_used = NULL;  //To house ship assigned..
		$P_all = array();  //Array for all Planet Options.
		$P_used = array();  //Array for Planets already assigned.
		$M_all = array();  //Array for all Moon Options.
		$M_used = array();  //Array for Moons already assigned.

		//Fetch Mission detail
		$stmt = $kerbalsqli->prepare("SELECT first_launch_year
			                          FROM Mission WHERE id=?");
		$var1 = urldecode($_GET['id']);
		$stmt->bind_param("i", $var1);
		$stmt->execute();
		$year_out = NULL;
		$stmt->bind_result($year_out);
		$stmt->fetch();
		$M_year = $year_out;
		array_push($return, $M_year);  //Saves mission year to master array.
		$stmt->close();

		//Fetch All Kerbals
		$stmt = $kerbalsqli->prepare("SELECT id, name 
			 						  FROM Kerbal");
		$stmt->execute();
		$id_out = NULL;
		$name_out = NULL;
		$stmt->bind_result($id_out, $name_out);
		while($stmt->fetch()){
			$temp = array("id" => $id_out,
				          "name" => $name_out);
			array_push($K_all, $temp);
		}
		array_push($return, $K_all);  //Saves all kerbal list to master array.
		$stmt->close();

		//Fetch Kerbals Piloted
		$stmt = $kerbalsqli->prepare("SELECT K.id 
			 						  FROM Mission M
			                          INNER JOIN Kerbal_Mission KM ON M.id = KM.mission_id
			                          INNER JOIN Kerbal K ON KM.kerbal_id = K.id
			                          WHERE M.id = ?");
		$var1 = urldecode($_GET['id']);
		$stmt->bind_param("i", $var1);
		$stmt->execute();
		$id_out = NULL;
		$stmt->bind_result($id_out);
		while($stmt->fetch()){
			array_push($K_used, $id_out);
		}
		array_push($return, $K_used);  //Saves associated kerbals to master array.
		$stmt->close();

		//Fetch All Ships
		$stmt = $kerbalsqli->prepare("SELECT id, name 
			 						  FROM Ship");
		$stmt->execute();
		$id_out = NULL;
		$name_out = NULL;
		$stmt->bind_result($id_out, $name_out);
		while($stmt->fetch()){
			$temp = array("id" => $id_out,
				          "name" => $name_out);
			array_push($S_all, $temp);
		}
		array_push($return, $S_all);  //Saves all ship list to master array.
		$stmt->close();

		//Fetch Ship Assigned
		$stmt = $kerbalsqli->prepare("SELECT ship_id 
			 						  FROM Mission
			                          WHERE id = ?");
		$var1 = urldecode($_GET['id']);
		$stmt->bind_param("i", $var1);
		$stmt->execute();
		$id_out = NULL;
		$stmt->bind_result($id_out);
		$stmt->fetch();
		$K_used = $id_out;
		array_push($return, $K_used);  //Saves associated ships to master array.
		$stmt->close();

		//Fetch All Planets
		$stmt = $kerbalsqli->prepare("SELECT id, name 
			 						  FROM Planet");
		$stmt->execute();
		$id_out = NULL;
		$name_out = NULL;
		$stmt->bind_result($id_out, $name_out);
		while($stmt->fetch()){
			$temp = array("id" => $id_out,
				          "name" => $name_out);
			array_push($P_all, $temp);
		}
		array_push($return, $P_all);  //Saves all planet list to master array.
		$stmt->close();

		//Fetch Planets Targeted
		$stmt = $kerbalsqli->prepare("SELECT P.id 
			 						  FROM Mission M
			                          INNER JOIN Mission_Planet MP ON M.id = MP.mission_id
			                          INNER JOIN Planet P ON MP.planet_id = P.id
			                          WHERE M.id = ?");
		$var1 = urldecode($_GET['id']);
		$stmt->bind_param("i", $var1);
		$stmt->execute();
		$id_out = NULL;
		$stmt->bind_result($id_out);
		while($stmt->fetch()){
			array_push($P_used, $id_out);
		}
		array_push($return, $P_used);  //Saves associated planets to master array.
		$stmt->close();

		//Fetch All Moons
		$stmt = $kerbalsqli->prepare("SELECT id, name 
			 						  FROM Moon");
		$stmt->execute();
		$id_out = NULL;
		$name_out = NULL;
		$stmt->bind_result($id_out, $name_out);
		while($stmt->fetch()){
			$temp = array("id" => $id_out,
				          "name" => $name_out);
			array_push($M_all, $temp);
		}
		array_push($return, $M_all);  //Saves all moon list to master array.
		$stmt->close();

		//Fetch moons Targeted
		$stmt = $kerbalsqli->prepare("SELECT Moon.id 
			 						  FROM Mission M
			                          INNER JOIN Mission_Moon MM ON M.id = MM.mission_id
			                          INNER JOIN Moon ON MM.moon_id = Moon.id
			                          WHERE M.id = ?");
		$var1 = urldecode($_GET['id']);
		$stmt->bind_param("i", $var1);
		$stmt->execute();
		$id_out = NULL;
		$stmt->bind_result($id_out);
		while($stmt->fetch()){
			array_push($M_used, $id_out);
		}
		array_push($return, $M_used);  //Saves associated moons to master array.
		$stmt->close();
		
	    echo json_encode($return);  //Returns all collected data, to populate and 'checkbox' mission update area.
	    die();
    }
}



//Updates a launch year for a mission.
if (isset($_GET['req']) && ($_GET['req'] == "mission_update_launch")){
	if(isset($_GET['id']) && isset($_GET['launch'])){
		$var1 = NULL;
		$var2 = NULL;

		$stmt = $kerbalsqli->prepare("UPDATE Mission SET first_launch_year = ? WHERE id = ?");
		$var1 = urldecode($_GET['launch']);
		$var2 = urldecode($_GET['id']);
		$stmt->bind_param("ii", $var1, $var2);
		$stmt->execute();
		$stmt->close();
		die();
	}
}



//Updates a kerbal assignment for a mission.
if (isset($_GET['req']) && ($_GET['req'] == "mission_update_kerbal")){
	$var1 = NULL;
	$var2 = NULL;

	//If Kerbal checkbox was checked (need to Add kerbal association)
	if(isset($_GET['type']) && $_GET['type'] == 1 && isset($_GET['id']) && isset($_GET['kerbal'])){
		//Adds kerbal association.
		$stmt = $kerbalsqli->prepare("INSERT INTO Kerbal_Mission (mission_id, kerbal_id) 
		     						  VALUES (?, ?)");
		$var1 = urldecode($_GET['id']);
		$var2 = urldecode($_GET['kerbal']);
		$stmt->bind_param("ii", $var1, $var2);
		$stmt->execute();
		$stmt->close();
		die();
	}
	//If Kerbal checkbox was 'unchecked' (need to delete Kerbal association)
	if(isset($_GET['type']) && $_GET['type'] == 0 && isset($_GET['id']) && isset($_GET['kerbal'])){
		//Removes kerbal association.
		$stmt = $kerbalsqli->prepare("DELETE FROM Kerbal_Mission
									  WHERE kerbal_id = ? AND mission_id = ?"); 
		$var1 = urldecode($_GET['kerbal']);
		$var2 = urldecode($_GET['id']);
		$stmt->bind_param("ii", $var1, $var2);
		$stmt->execute();
		$stmt->close();
	}
}



//Updates a ship assignment for a mission.
if (isset($_GET['req']) && ($_GET['req'] == "mission_update_ship")){
	$var1 = NULL;
	$var2 = NULL;

	if(isset($_GET['id']) && isset($_GET['ship'])){
		//If ship association was removed ('None' selected).  Sets to NULL.
		if ($_GET['ship'] == 'N') {
			$stmt = $kerbalsqli->prepare("UPDATE Mission SET ship_id = NULL WHERE id = ?");
			$var1 = urldecode($_GET['id']);
			$stmt->bind_param("i", $var1);
			$stmt->execute();
			$stmt->close();
		//Otherwise updates ship_id to newly selected ship.
		} else {
			$stmt = $kerbalsqli->prepare("UPDATE Mission SET ship_id = ? WHERE id = ?");
			$var1 = urldecode($_GET['ship']);
			$var2 = urldecode($_GET['id']);
			$stmt->bind_param("ii", $var1, $var2);
			$stmt->execute();
			$stmt->close();
		}
		die();
	}
}



//Updates a planet assignment for a mission.
if (isset($_GET['req']) && ($_GET['req'] == "mission_update_planet")){
	$var1 = NULL;
	$var2 = NULL;

	//If new planet was checked (new planet associated with mission)
	if(isset($_GET['type']) && $_GET['type'] == 1 && isset($_GET['id']) && isset($_GET['planet'])){
		//Adds planet association.
		$stmt = $kerbalsqli->prepare("INSERT INTO Mission_Planet (mission_id, planet_id) 
		     						  VALUES (?, ?)");
		$var1 = urldecode($_GET['id']);
		$var2 = urldecode($_GET['planet']);
		$stmt->bind_param("ii", $var1, $var2);
		$stmt->execute();
		$stmt->close();
		die();
	}
	//Else if planet was unchecked (planet association needs to be removed from mission)
	if(isset($_GET['type']) && $_GET['type'] == 0 && isset($_GET['id']) && isset($_GET['planet'])){
		//Removes planet association.
		$stmt = $kerbalsqli->prepare("DELETE FROM Mission_Planet
									  WHERE planet_id = ? AND mission_id = ?"); 
		$var1 = urldecode($_GET['planet']);
		$var2 = urldecode($_GET['id']);
		$stmt->bind_param("ii", $var1, $var2);
		$stmt->execute();
		$stmt->close();
	}
}



//Updates a moon assignment for a mission.
if (isset($_GET['req']) && ($_GET['req'] == "mission_update_moon")){
	$var1 = NULL;
	$var2 = NULL;

	//If moon was checked (new moon associated with mission)
	if(isset($_GET['type']) && $_GET['type'] == 1 && isset($_GET['id']) && isset($_GET['moon'])){
		//Adds moon association.
		$stmt = $kerbalsqli->prepare("INSERT INTO Mission_Moon (mission_id, moon_id) 
		     						  VALUES (?, ?)");
		$var1 = urldecode($_GET['id']);
		$var2 = urldecode($_GET['moon']);
		$stmt->bind_param("ii", $var1, $var2);
		$stmt->execute();
		$stmt->close();
		die();
	}
	if(isset($_GET['type']) && $_GET['type'] == 0 && isset($_GET['id']) && isset($_GET['moon'])){
		//Removes moon association.
		$stmt = $kerbalsqli->prepare("DELETE FROM Mission_Moon
									  WHERE moon_id = ? AND mission_id = ?"); 
		$var1 = urldecode($_GET['moon']);
		$var2 = urldecode($_GET['id']);
		$stmt->bind_param("ii", $var1, $var2);
		$stmt->execute();
		$stmt->close();
	}
}