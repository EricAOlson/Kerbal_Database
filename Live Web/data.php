<?php

/***** This file contains most of the database interaction for the basic entities, add/delete/view detail. *****/

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



//Retrieves an array of all kerbals from the database.
if (isset($_GET['req']) && ($_GET['req'] == "kerbal_list")){
	$kerbals = array();
    $stmt = $kerbalsqli->prepare("SELECT id, name FROM Kerbal");
    $stmt->execute();
    $id_out = NULL;
    $name_out = NULL;
	$stmt->bind_result($id_out, $name_out);
	while($stmt->fetch()){
		$temp = array(
			"id" => $id_out,
			"name" => $name_out);
		array_push($kerbals, $temp);
	}
	$stmt->close();
	echo json_encode($kerbals);  //Returns JSON Array of Data.
	die();
}



//Adds a kerbal to the database.
if (isset($_GET['req']) && ($_GET['req'] == "add_kerbal")){
	if (isset($_GET['name']) && isset($_GET['courage']) && isset($_GET['stupidity'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Kerbal (name, courage, stupidity) 
									  VALUES (?, ?, ?)");
		$stmt->bind_param("sii", urldecode($_GET['name']), urldecode($_GET['courage']), urldecode($_GET['stupidity']));
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Deletes a kerbal from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_kerbal")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Kerbal WHERE id=?");
		$stmt->bind_param("i", urldecode($_GET['id']));
		$stmt->execute();
		$stmt->close();
	}
	die();
}


//Retrieves an array of all ships from the database.
if (isset($_GET['req']) && ($_GET['req'] == "ship_list")){
	$ships = array();
    $stmt = $kerbalsqli->prepare("SELECT id, name FROM Ship");
    $stmt->execute();
    $id_out = NULL;
    $name_out = NULL;
	$stmt->bind_result($id_out, $name_out);
	while($stmt->fetch()){
		$temp = array(
			"id" => $id_out,
			"name" => $name_out);
		array_push($ships, $temp);
	}
	$stmt->close();
	echo json_encode($ships);  //Returns JSON Array of Data.
	die();
}



//Adds a new ship to the database.
if (isset($_GET['req']) && ($_GET['req'] == "add_ship")){
	if (isset($_GET['name']) && isset($_GET['seats']) && isset($_GET['stages']) && isset($_GET['lander'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Ship (name, seats, stages, lander) 
									  VALUES (?, ?, ?, ?)");
		$stmt->bind_param("siii", urldecode($_GET['name']), urldecode($_GET['seats']), urldecode($_GET['stages']), urldecode($_GET['lander']));
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Deletes a ship from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_ship")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Ship WHERE id=?");
		$stmt->bind_param("i", urldecode($_GET['id']));
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Retrieves an array of all planets from the database.
if (isset($_GET['req']) && ($_GET['req'] == "planet_list")){
	$planets = array();
    $stmt = $kerbalsqli->prepare("SELECT id, name FROM Planet");
    $stmt->execute();
    $id_out = NULL;
    $name_out = NULL;
	$stmt->bind_result($id_out, $name_out);
	while($stmt->fetch()){
		$temp = array(
			"id" => $id_out,
			"name" => $name_out);
		array_push($planets, $temp);
	}
	$stmt->close();
	echo json_encode($planets);  //Returns JSON Array of Data.
	die();
}



//Adds a new planet to the database.
if (isset($_GET['req']) && ($_GET['req'] == "add_planet")){
	if (isset($_GET['name']) && isset($_GET['radius']) && isset($_GET['inclination']) && isset($_GET['gravity']) && isset($_GET['atmosphere'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Planet (name, radius, inclination, gravity, atmosphere) 
									  VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sdddi", urldecode($_GET['name']), urldecode($_GET['radius']), urldecode($_GET['inclination']),
		                  urldecode($_GET['gravity']), urldecode($_GET['atmosphere']));
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Deletes a planet from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_planet")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Planet WHERE id=?");
		$stmt->bind_param("i", urldecode($_GET['id']));
		$stmt->execute();
		$stmt->close();
	}
	die();
}




//Retrieves an array of all moons from the database.
if (isset($_GET['req']) && ($_GET['req'] == "moon_list")){
	$moons = array();
    $stmt = $kerbalsqli->prepare("SELECT id, name FROM Moon");
    $stmt->execute();
    $id_out = NULL;
    $name_out = NULL;
	$stmt->bind_result($id_out, $name_out);
	while($stmt->fetch()){
		$temp = array(
			"id" => $id_out,
			"name" => $name_out);
		array_push($moons, $temp);
	}
	$stmt->close();
	echo json_encode($moons);  //Returns JSON Array of Data.
	die();
}



//Adds a new moon to the database.
if (isset($_GET['req']) && ($_GET['req'] == "add_moon")){
	if (isset($_GET['name']) && isset($_GET['radius']) && isset($_GET['gravity']) && isset($_GET['atmosphere']) && isset($_GET['orbits'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Moon (name, radius, gravity, atmosphere, orbits) 
									  VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sddis", urldecode($_GET['name']), urldecode($_GET['radius']), urldecode($_GET['gravity']), 
			              urldecode($_GET['atmosphere']), urldecode($_GET['orbits']));
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Deletes a moon from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_moon")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Moon WHERE id=?");
		$stmt->bind_param("i", urldecode($_GET['id']));
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Retrieves an array of all missions from the database.
if (isset($_GET['req']) && ($_GET['req'] == "mission_list")){
	$missions = array();
    $stmt = $kerbalsqli->prepare("SELECT id, name FROM Mission");
    $stmt->execute();
    $id_out = NULL;
    $name_out = NULL;
	$stmt->bind_result($id_out, $name_out);
	while($stmt->fetch()){
		$temp = array(
			"id" => $id_out,
			"name" => $name_out);
		array_push($missions, $temp);
	}
	$stmt->close();
	echo json_encode($missions);  //Returns JSON Array of Data.
	die();
}



//Retrieves an array of detailed information and associations for a Kerbal.
if (isset($_GET['req']) && ($_GET['req'] == "detail_kerbal")){
	if(isset($_GET['kerbal'])){
		$var = NULL;
		$return = array();  //Master Array to return.
		$K_detail = array();  //Array for Kerbal details.
		$S_list = array();  //Array for associated Ships.
		$Mi_list = array();  //Array for associated Missions.
		$P_list = array();  //Array for associated Planets.
		$Mo_list = array();  //Array for associated Moons.

		//Fetch specific Kerbal detail.
		$stmt = $kerbalsqli->prepare("SELECT name, courage, stupidity FROM Kerbal WHERE id=?");
		$var = urldecode($_GET['kerbal']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$courage_out = NULL;
		$stupidity_out = NULL;
		$stmt->bind_result($name_out, $courage_out, $stupidity_out);
		while($stmt->fetch()){
			$temp = array(
				"name" => $name_out,
				"courage" => $courage_out,
				"stupidity" => $stupidity_out);
			array_push($K_detail, $temp);
		}
		array_push($return, $K_detail);  //Adds kerbal data to master array.
		$stmt->close();

		//Fetch Ships Flown
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT S.name 
			 						  FROM Kerbal K
			                          INNER JOIN Kerbal_Mission KM ON K.id = KM.kerbal_id
			                          INNER JOIN Mission M ON KM.mission_id = M.id
			                          INNER JOIN Ship S ON M.ship_id = S.id
			                          WHERE K.id = ?");
		$var = urldecode($_GET['kerbal']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($S_list, $temp);
		}
		array_push($return, $S_list);  //Adds ships data to master array.
		$stmt->close();

		//Fetch Missions Assigned
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT M.name 
			 						  FROM Kerbal K
			                          INNER JOIN Kerbal_Mission KM ON K.id = KM.kerbal_id
			                          INNER JOIN Mission M ON KM.mission_id = M.id
			                          WHERE K.id = ?");
		$var = urldecode($_GET['kerbal']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mi_list, $temp);
		}
		array_push($return, $Mi_list);  //Adds missions data to master array.
		$stmt->close();

		//Fetch Planets Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT P.name 
			 						  FROM Kerbal K
			                          INNER JOIN Kerbal_Mission KM ON K.id = KM.kerbal_id
			                          INNER JOIN Mission M ON KM.mission_id = M.id
			                          INNER JOIN Mission_Planet MP ON M.id = MP.mission_id
			                          INNER JOIN Planet P ON MP.planet_id = P.id
			                          WHERE K.id = ?");
		$var = urldecode($_GET['kerbal']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($P_list, $temp);
		}
		array_push($return, $P_list);  //Adds planets data to master array.
		$stmt->close();

		//Fetch Moons Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT Moon.name 
			 						  FROM Kerbal K
			                          INNER JOIN Kerbal_Mission KM ON K.id = KM.kerbal_id
			                          INNER JOIN Mission M ON KM.mission_id = M.id
			                          INNER JOIN Mission_Moon MM ON M.id = MM.mission_id
			                          INNER JOIN Moon ON MM.moon_id = Moon.id
			                          WHERE K.id = ?");
		$var = urldecode($_GET['kerbal']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mo_list, $temp);
		}
		array_push($return, $Mo_list);  //Adds moons data to master array.
		$stmt->close();

	echo json_encode($return);  //Successful return of all required data to populate Kerbal detail.
	die();
  }
}



//Retrieves an array of detailed information and associations for a Ship.
if (isset($_GET['req']) && ($_GET['req'] == "detail_ship")){
	if(isset($_GET['ship'])){
		$var = NULL;
		$return = array();  //Master Array to return.
		$S_detail = array();  //Array for Ship details.
		$K_list = array();  //Array for Kerbal pilots.
		$Mi_list = array();  //Array for Missions assigned.
		$P_list = array();  //Array for Planets visited.
		$Mo_list = array();  //Array for Moons visited.

		//Fetch Ship detail
		$stmt = $kerbalsqli->prepare("SELECT name, seats, stages, lander FROM Ship WHERE id=?");
		$var = urldecode($_GET['ship']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$seats_out = NULL;
		$stages_out = NULL;
		$lander_out = NULL;
		$stmt->bind_result($name_out, $seats_out, $stages_out, $lander_out);
		while($stmt->fetch()){
			if ($lander_out == 1) {$lander_out = "Yes";}  //Translates boolean values to string.
			else {$lander_out = "No";}
			$temp = array(
				"name" => $name_out,
				"seats" => $seats_out,
				"stages" => $stages_out,
				"lander" => $lander_out);
			array_push($S_detail, $temp);
		}
		array_push($return, $S_detail);  //Adds Ship details to master array.
		$stmt->close();

		//Fetch Kerbals Piloted
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT K.name 
			 						  FROM Ship S
			                          INNER JOIN Mission M ON S.id = M.ship_id
			                          INNER JOIN Kerbal_Mission KM ON M.id = KM.mission_id
			                          INNER JOIN Kerbal K ON KM.kerbal_id = K.id
			                          WHERE S.id = ?");
		$var = urldecode($_GET['ship']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($K_list, $temp);
		}
		array_push($return, $K_list);  //Adds kerbal data to master array.
		$stmt->close();

		//Fetch Missions Assigned
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT M.name 
			 						  FROM Ship S
			                          INNER JOIN Mission M ON S.id = M.ship_id
			                          WHERE S.id = ?");
		$var = urldecode($_GET['ship']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mi_list, $temp);
		}
		array_push($return, $Mi_list);  //Adds mission data to master array.
		$stmt->close();

		//Fetch Planets Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT P.name 
			 						  FROM Ship S
			                          INNER JOIN Mission M ON S.id = M.ship_id
			                          INNER JOIN Mission_Planet MP ON M.id = MP.mission_id
			                          INNER JOIN Planet P ON MP.planet_id = P.id
			                          WHERE S.id = ?");
		$var = urldecode($_GET['ship']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($P_list, $temp);
		}
		array_push($return, $P_list);  //Adds planet data to master array.
		$stmt->close();

		//Fetch Moons Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT Moon.name 
			 						  FROM Ship S
			                          INNER JOIN Mission M ON S.id = M.ship_id
			                          INNER JOIN Mission_Moon MM ON M.id = MM.mission_id
			                          INNER JOIN Moon ON MM.moon_id = Moon.id
			                          WHERE S.id = ?");
		$var = urldecode($_GET['ship']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mo_list, $temp);
		}
		array_push($return, $Mo_list);
		$stmt->close();

	echo json_encode($return);  //Successful return of all required data to populate Ship detail.
	die();
  }
}



//Retrieves an array of detailed information for a Planet.
if (isset($_GET['req']) && ($_GET['req'] == "detail_planet")){
	if(isset($_GET['planet'])){
		$var = NULL;
		$return = array();  //Master Array to return.
		$P_detail = array();  //Array for Planet details.
		$K_list = array();  //Array for Kerbals Visited.
		$S_list = array();  //Array for Ships Visited.
		$Mi_list = array();  //Array for Missions that Targeted.
		$Mo_list = array();  //Array for Moons.

		//Fetch Planet detail
		$stmt = $kerbalsqli->prepare("SELECT name, radius, inclination, gravity, atmosphere 
			                          FROM Planet WHERE id=?");
		$var = urldecode($_GET['planet']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$radius_out = NULL;
		$inclination_out = NULL;
		$gravity_out = NULL;
		$atmosphere_out = NULL;
		$stmt->bind_result($name_out, $radius_out, $inclination_out, $gravity_out, $atmosphere_out);
		while($stmt->fetch()){
			if ($atmosphere_out == 1) {$atmosphere_out = "Present";}  //Transalte boolean meaning to string.
			else {$atmosphere_out = "None";}
			$temp = array(
				"name" => $name_out,
				"radius" => round($radius_out, 4),
				"inclination" => round($inclination_out, 4),
				"gravity" => round($gravity_out, 4),
				"atmosphere" => $atmosphere_out);
			array_push($P_detail, $temp);
		}
		array_push($return, $P_detail);  //Adds planet detail to master array.
		$stmt->close();

		//Fetch Kerbals Piloted
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT K.name 
			 						  FROM Planet P
			                          INNER JOIN Mission_Planet MP ON P.id = MP.planet_id
			                          INNER JOIN Mission M ON MP.mission_id = M.id
			                          INNER JOIN Kerbal_Mission KM ON M.id = KM.mission_id
			                          INNER JOIN Kerbal K ON KM.kerbal_id = K.id
			                          WHERE P.id = ?");
		$var = urldecode($_GET['planet']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($K_list, $temp);
		}
		array_push($return, $K_list);  //Adds Kerbal data to master array.
		$stmt->close();

		//Fetch Ships that have Visited
		$stmt = $kerbalsqli->prepare("SELECT S.name
									  FROM Planet P
			                          INNER JOIN Mission_Planet MP ON P.id = MP.planet_id
			                          INNER JOIN Mission M ON MP.mission_id = M.id
			                          INNER JOIN Ship S ON M.ship_id = S.id
			                          WHERE P.id = ?");
		$var = urldecode($_GET['planet']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($S_list, $temp);
		}
		array_push($return, $S_list);  //Adds Ship data to master array.
		$stmt->close();

		//Fetch Missions Assigned
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT M.name 
			 						  FROM Planet P
			                          INNER JOIN Mission_Planet MP ON P.id = MP.planet_id
			                          INNER JOIN Mission M ON MP.mission_id = M.id
			                          WHERE P.id = ?");
		$var = urldecode($_GET['planet']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mi_list, $temp);
		}
		array_push($return, $Mi_list);  //Adds mission data to master array.
		$stmt->close();

		//Fetch Moons
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT Moon.name 
			                          FROM Planet P
			                          INNER JOIN Moon ON P.id = Moon.orbits
			                          WHERE P.id = ?");
		$var = urldecode($_GET['planet']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mo_list, $temp);
		}
		array_push($return, $Mo_list);  //Adds moon data to master array.
		$stmt->close();

	echo json_encode($return);  //Successful return of all required data to populate Planet detail.
	die();
    }
}



//Retrieves an array of detailed information for a Moon.
if (isset($_GET['req']) && ($_GET['req'] == "detail_moon")){
	if(isset($_GET['moon'])){
		$var = NULL;
		$return = array();  //Master Array to return.
		$Mo_detail = array();  //Array for Moon details.
		$K_list = array();  //Array for Kerbals Visited.
		$S_list = array();  //Array for Ships Visited.
		$Mi_list = array();  //Array for Missions that Targeted.
		
		//Fetch Moon detail
		$stmt = $kerbalsqli->prepare("SELECT M.name, M.radius, M.gravity, M.atmosphere, P.name
			                          FROM Moon M
			                          INNER JOIN Planet P ON M.orbits = P.id
			                          WHERE M.id=?");
		$var = urldecode($_GET['moon']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$radius_out = NULL;
		$gravity_out = NULL;
		$atmosphere_out = NULL;
		$orbits_out = NULL;
		$stmt->bind_result($name_out, $radius_out, $gravity_out, $atmosphere_out, $orbits_out);
		while($stmt->fetch()){
			if ($atmosphere_out == 1) {$atmosphere_out = "Present";}  //Translate boolean meaning to string.
			else {$atmosphere_out = "None";}
			$temp = array(
				"name" => $name_out,
				"radius" => round($radius_out, 4),
				"gravity" => round($gravity_out, 4),
				"atmosphere" => $atmosphere_out,
				"orbits" => $orbits_out);
			array_push($Mo_detail, $temp);
		}
		array_push($return, $Mo_detail);  //Adds moon detail to master array.
		$stmt->close();

		//Fetch Kerbals Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT K.name 
			 						  FROM Moon
			                          INNER JOIN Mission_Moon MM ON Moon.id = MM.moon_id
			                          INNER JOIN Mission M ON MM.mission_id = M.id
			                          INNER JOIN Kerbal_Mission KM ON M.id = KM.mission_id
			                          INNER JOIN Kerbal K ON KM.kerbal_id = K.id
			                          WHERE Moon.id = ?");
		$var = urldecode($_GET['moon']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($K_list, $temp);
		}
		array_push($return, $K_list);  //Adds Kerbal data to master array.
		$stmt->close();

		//Fetch Ships that have Visited
		$stmt = $kerbalsqli->prepare("SELECT S.name
									  FROM Moon
			                          INNER JOIN Mission_Moon MM ON Moon.id = MM.moon_id
			                          INNER JOIN Mission M ON MM.mission_id = M.id
			                          INNER JOIN Ship S ON M.ship_id = S.id
			                          WHERE Moon.id = ?");
		$var = urldecode($_GET['moon']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($S_list, $temp);
		}
		array_push($return, $S_list);  //Adds ship data to master array.
		$stmt->close();

		//Fetch Missions Assigned
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT M.name 
			 						  FROM Moon
			                          INNER JOIN Mission_Moon MM ON Moon.id = MM.moon_id
			                          INNER JOIN Mission M ON MM.mission_id = M.id
			                          WHERE Moon.id = ?");
		$var = urldecode($_GET['moon']);
		$stmt->bind_param("i", $var);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mi_list, $temp);
		}
		array_push($return, $Mi_list);  //Moon data added to master array.
		$stmt->close();

	echo json_encode($return);  //Successful return of all required data to populate Planet detail.
	die();
    }
}
?>