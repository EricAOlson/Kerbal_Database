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

//Retrieves an array of kerbals from the database.
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
	echo json_encode($kerbals);  //Successful return
	die();
}


//Deletes a kerbal from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_kerbal")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Kerbal WHERE id=?");
		$stmt->bind_param("i", $_GET['id']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}


//Adds a kerbal to the database.
if (isset($_GET['req']) && ($_GET['req'] == "add_kerbal")){
	if (isset($_GET['name']) && isset($_GET['courage']) && isset($_GET['stupidity'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Kerbal (name, courage, stupidity) 
									  VALUES (?, ?, ?)");
		$stmt->bind_param("sii", $_GET['name'], $_GET['courage'], $_GET['stupidity']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}


//Retrieves an array of ships from the database.
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
	echo json_encode($ships);  //Successful return
	die();
}


//Adds a new ships to the database.
if (isset($_GET['req']) && ($_GET['req'] == "add_ship")){
	if (isset($_GET['name']) && isset($_GET['seats']) && isset($_GET['stages']) && isset($_GET['lander'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Ship (name, seats, stages, lander) 
									  VALUES (?, ?, ?, ?)");
		$stmt->bind_param("siii", $_GET['name'], $_GET['seats'], $_GET['stages'], $_GET['lander']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}


//Deletes a ship from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_ship")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Ship WHERE id=?");
		$stmt->bind_param("i", $_GET['id']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Retrieves an array of planets from the database.
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
	echo json_encode($planets);  //Successful return
	die();
}



//Adds a new planets to the database.
if (isset($_GET['req']) && ($_GET['req'] == "add_planet")){
	if (isset($_GET['name']) && isset($_GET['radius']) && isset($_GET['inclination']) && isset($_GET['gravity']) && isset($_GET['atmosphere'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Planet (name, radius, inclination, gravity, atmosphere) 
									  VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sdddi", $_GET['name'], $_GET['radius'], $_GET['inclination'], $_GET['gravity'], $_GET['atmosphere']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}



//Deletes a planet from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_planet")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Planet WHERE id=?");
		$stmt->bind_param("i", $_GET['id']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}




//Retrieves an array of moons from the database.
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
	echo json_encode($moons);  //Successful return
	die();
}



//Retrieves an array of missions from the database.
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
	echo json_encode($missions);  //Successful return
	die();
}



//Adds a new moon to the database.
if (isset($_GET['req']) && ($_GET['req'] == "add_moon")){
	if (isset($_GET['name']) && isset($_GET['radius']) && isset($_GET['gravity']) && isset($_GET['atmosphere']) && isset($_GET['orbits'])){
		$stmt = $kerbalsqli->prepare("INSERT INTO Moon (name, radius, gravity, atmosphere, orbits) 
									  VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sddis", $_GET['name'], $_GET['radius'], $_GET['gravity'], $_GET['atmosphere'], $_GET['orbits']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}




//Deletes a planet from the database.
if (isset($_GET['req']) && ($_GET['req'] == "delete_moon")){
	if (isset($_GET['id'])){
		$stmt = $kerbalsqli->prepare("DELETE FROM Moon WHERE id=?");
		$stmt->bind_param("i", $_GET['id']);
		$stmt->execute();
		$stmt->close();
	}
	die();
}





//Retrieves an array of detailed information for a Kerbal.
if (isset($_GET['req']) && ($_GET['req'] == "detail_kerbal")){
	if(isset($_GET['kerbal'])){
		$return = array();  //Master Array to return.
		$K_detail = array();  //Array for Kerbal details.
		$S_list = array();  //Array for Ship's flown.
		$Mi_list = array();  //Array for Missions assigned.
		$P_list = array();  //Array for Planets visited.
		$Mo_list = array();  //Array for Moons visited.

		//Fetch Kerbal detail
		$stmt = $kerbalsqli->prepare("SELECT name, courage, stupidity FROM Kerbal WHERE id=?");
		$stmt->bind_param("i", $_GET['kerbal']);
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
		array_push($return, $K_detail);
		$stmt->close();

		//Fetch Ships Flown
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT S.name 
			 						  FROM Kerbal K
			                          INNER JOIN Kerbal_Mission KM ON K.id = KM.kerbal_id
			                          INNER JOIN Mission M ON KM.mission_id = M.id
			                          INNER JOIN Ship S ON M.ship_id = S.id
			                          WHERE K.id = ?");
		$stmt->bind_param("i", $_GET['kerbal']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($S_list, $temp);
		}
		array_push($return, $S_list);
		$stmt->close();

		//Fetch Missions Assigned
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT M.name 
			 						  FROM Kerbal K
			                          INNER JOIN Kerbal_Mission KM ON K.id = KM.kerbal_id
			                          INNER JOIN Mission M ON KM.mission_id = M.id
			                          WHERE K.id = ?");
		$stmt->bind_param("i", $_GET['kerbal']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mi_list, $temp);
		}
		array_push($return, $Mi_list);
		$stmt->close();

		//Fetch Planets Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT P.name 
			 						  FROM Kerbal K
			                          INNER JOIN Kerbal_Mission KM ON K.id = KM.kerbal_id
			                          INNER JOIN Mission M ON KM.mission_id = M.id
			                          INNER JOIN Mission_Planet MP ON M.id = MP.mission_id
			                          INNER JOIN Planet P ON MP.planet_id = P.id
			                          WHERE K.id = ?");
		$stmt->bind_param("i", $_GET['kerbal']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($P_list, $temp);
		}
		array_push($return, $P_list);
		$stmt->close();

		//Fetch Moons Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT Moon.name 
			 						  FROM Kerbal K
			                          INNER JOIN Kerbal_Mission KM ON K.id = KM.kerbal_id
			                          INNER JOIN Mission M ON KM.mission_id = M.id
			                          INNER JOIN Mission_Moon MM ON M.id = MM.mission_id
			                          INNER JOIN Moon ON MM.moon_id = Moon.id
			                          WHERE K.id = ?");
		$stmt->bind_param("i", $_GET['kerbal']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mo_list, $temp);
		}
		array_push($return, $Mo_list);
		$stmt->close();

	echo json_encode($return);  //Successful return
	die();
  }
}


//Retrieves an array of detailed information for a Ship.
if (isset($_GET['req']) && ($_GET['req'] == "detail_ship")){
	if(isset($_GET['ship'])){
		$return = array();  //Master Array to return.
		$S_detail = array();  //Array for Ship details.
		$K_list = array();  //Array for Kerbal pilots.
		$Mi_list = array();  //Array for Missions assigned.
		$P_list = array();  //Array for Planets visited.
		$Mo_list = array();  //Array for Moons visited.

		//Fetch Ship detail
		$stmt = $kerbalsqli->prepare("SELECT name, seats, stages, lander FROM Ship WHERE id=?");
		$stmt->bind_param("i", $_GET['ship']);
		$stmt->execute();
		$name_out = NULL;
		$seats_out = NULL;
		$stages_out = NULL;
		$lander_out = NULL;
		$stmt->bind_result($name_out, $seats_out, $stages_out, $lander_out);
		while($stmt->fetch()){
			if ($lander_out == 1) {$lander_out = "Yes";}
			else {$lander_out = "No";}
			$temp = array(
				"name" => $name_out,
				"seats" => $seats_out,
				"stages" => $stages_out,
				"lander" => $lander_out);
			array_push($S_detail, $temp);
		}
		array_push($return, $S_detail);
		$stmt->close();

		//Fetch Kerbals Piloted
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT K.name 
			 						  FROM Ship S
			                          INNER JOIN Mission M ON S.id = M.ship_id
			                          INNER JOIN Kerbal_Mission KM ON M.id = KM.mission_id
			                          INNER JOIN Kerbal K ON KM.kerbal_id = K.id
			                          WHERE S.id = ?");
		$stmt->bind_param("i", $_GET['ship']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($K_list, $temp);
		}
		array_push($return, $K_list);
		$stmt->close();

		//Fetch Missions Assigned
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT M.name 
			 						  FROM Ship S
			                          INNER JOIN Mission M ON S.id = M.ship_id
			                          WHERE S.id = ?");
		$stmt->bind_param("i", $_GET['ship']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mi_list, $temp);
		}
		array_push($return, $Mi_list);
		$stmt->close();

		//Fetch Planets Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT P.name 
			 						  FROM Ship S
			                          INNER JOIN Mission M ON S.id = M.ship_id
			                          INNER JOIN Mission_Planet MP ON M.id = MP.mission_id
			                          INNER JOIN Planet P ON MP.planet_id = P.id
			                          WHERE S.id = ?");
		$stmt->bind_param("i", $_GET['ship']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($P_list, $temp);
		}
		array_push($return, $P_list);
		$stmt->close();

		//Fetch Moons Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT Moon.name 
			 						  FROM Ship S
			                          INNER JOIN Mission M ON S.id = M.ship_id
			                          INNER JOIN Mission_Moon MM ON M.id = MM.mission_id
			                          INNER JOIN Moon ON MM.moon_id = Moon.id
			                          WHERE S.id = ?");
		$stmt->bind_param("i", $_GET['ship']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mo_list, $temp);
		}
		array_push($return, $Mo_list);
		$stmt->close();

	echo json_encode($return);  //Successful return
	die();
  }
}


//Retrieves an array of detailed information for a Planet.
if (isset($_GET['req']) && ($_GET['req'] == "detail_planet")){
	if(isset($_GET['planet'])){
		$return = array();  //Master Array to return.
		$P_detail = array();  //Array for Planet details.
		$K_list = array();  //Array for Kerbals Visited.
		$S_list = array();  //Array for Ships Visited.
		$Mi_list = array();  //Array for Missions that Targeted.
		$Mo_list = array();  //Array for Moons.

		//Fetch Planet detail
		$stmt = $kerbalsqli->prepare("SELECT name, radius, inclination, gravity, atmosphere 
			                          FROM Planet WHERE id=?");
		$stmt->bind_param("i", $_GET['planet']);
		$stmt->execute();
		$name_out = NULL;
		$radius_out = NULL;
		$inclination_out = NULL;
		$gravity_out = NULL;
		$atmosphere_out = NULL;
		$stmt->bind_result($name_out, $radius_out, $inclination_out, $gravity_out, $atmosphere_out);
		while($stmt->fetch()){
			if ($atmosphere_out == 1) {$atmosphere_out = "Present";}
			else {$atmosphere_out = "None";}
			$temp = array(
				"name" => $name_out,
				"radius" => round($radius_out, 4),
				"inclination" => round($inclination_out, 4),
				"gravity" => round($gravity_out, 4),
				"atmosphere" => $atmosphere_out);
			array_push($P_detail, $temp);
		}
		array_push($return, $P_detail);
		$stmt->close();

		//Fetch Kerbals Piloted
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT K.name 
			 						  FROM Planet P
			                          INNER JOIN Mission_Planet MP ON P.id = MP.planet_id
			                          INNER JOIN Mission M ON MP.mission_id = M.id
			                          INNER JOIN Kerbal_Mission KM ON M.id = KM.mission_id
			                          INNER JOIN Kerbal K ON KM.kerbal_id = K.id
			                          WHERE P.id = ?");
		$stmt->bind_param("i", $_GET['planet']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($K_list, $temp);
		}
		array_push($return, $K_list);
		$stmt->close();

		//Fetch Ships that have Visited
		$stmt = $kerbalsqli->prepare("SELECT S.name
									  FROM Planet P
			                          INNER JOIN Mission_Planet MP ON P.id = MP.planet_id
			                          INNER JOIN Mission M ON MP.mission_id = M.id
			                          INNER JOIN Ship S ON M.ship_id = S.id
			                          WHERE P.id = ?");
		$stmt->bind_param("i", $_GET['planet']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($S_list, $temp);
		}
		array_push($return, $S_list);
		$stmt->close();

		//Fetch Missions Assigned
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT M.name 
			 						  FROM Planet P
			                          INNER JOIN Mission_Planet MP ON P.id = MP.planet_id
			                          INNER JOIN Mission M ON MP.mission_id = M.id
			                          WHERE P.id = ?");
		$stmt->bind_param("i", $_GET['planet']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mi_list, $temp);
		}
		array_push($return, $Mi_list);
		$stmt->close();

		//Fetch Moons
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT Moon.name 
			                          FROM Planet P
			                          INNER JOIN Moon ON P.id = Moon.orbits
			                          WHERE P.id = ?");
		$stmt->bind_param("i", $_GET['planet']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mo_list, $temp);
		}
		array_push($return, $Mo_list);
		$stmt->close();

	echo json_encode($return);  //Successful return
	die();
    }
}


//Retrieves an array of detailed information for a Planet.
if (isset($_GET['req']) && ($_GET['req'] == "detail_moon")){
	if(isset($_GET['moon'])){
		$return = array();  //Master Array to return.
		$Mo_detail = array();  //Array for Planet details.
		$K_list = array();  //Array for Kerbals Visited.
		$S_list = array();  //Array for Ships Visited.
		$Mi_list = array();  //Array for Missions that Targeted.
		
		//Fetch Moon detail
		$stmt = $kerbalsqli->prepare("SELECT M.name, M.radius, M.gravity, M.atmosphere, P.name
			                          FROM Moon M
			                          INNER JOIN Planet P ON M.orbits = P.id
			                          WHERE M.id=?");
		$stmt->bind_param("i", $_GET['moon']);
		$stmt->execute();
		$name_out = NULL;
		$radius_out = NULL;
		$gravity_out = NULL;
		$atmosphere_out = NULL;
		$orbits_out = NULL;
		$stmt->bind_result($name_out, $radius_out, $gravity_out, $atmosphere_out, $orbits_out);
		while($stmt->fetch()){
			if ($atmosphere_out == 1) {$atmosphere_out = "Present";}
			else {$atmosphere_out = "None";}
			$temp = array(
				"name" => $name_out,
				"radius" => round($radius_out, 4),
				"gravity" => round($gravity_out, 4),
				"atmosphere" => $atmosphere_out,
				"orbits" => $orbits_out);
			array_push($Mo_detail, $temp);
		}
		array_push($return, $Mo_detail);
		$stmt->close();

		//Fetch Kerbals Visited
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT K.name 
			 						  FROM Moon
			                          INNER JOIN Mission_Moon MM ON Moon.id = MM.moon_id
			                          INNER JOIN Mission M ON MM.mission_id = M.id
			                          INNER JOIN Kerbal_Mission KM ON M.id = KM.mission_id
			                          INNER JOIN Kerbal K ON KM.kerbal_id = K.id
			                          WHERE Moon.id = ?");
		$stmt->bind_param("i", $_GET['moon']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($K_list, $temp);
		}
		array_push($return, $K_list);
		$stmt->close();

		//Fetch Ships that have Visited
		$stmt = $kerbalsqli->prepare("SELECT S.name
									  FROM Moon
			                          INNER JOIN Mission_Moon MM ON Moon.id = MM.moon_id
			                          INNER JOIN Mission M ON MM.mission_id = M.id
			                          INNER JOIN Ship S ON M.ship_id = S.id
			                          WHERE Moon.id = ?");
		$stmt->bind_param("i", $_GET['moon']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($S_list, $temp);
		}
		array_push($return, $S_list);
		$stmt->close();

		//Fetch Missions Assigned
		$stmt = $kerbalsqli->prepare("SELECT DISTINCT M.name 
			 						  FROM Moon
			                          INNER JOIN Mission_Moon MM ON Moon.id = MM.moon_id
			                          INNER JOIN Mission M ON MM.mission_id = M.id
			                          WHERE Moon.id = ?");
		$stmt->bind_param("i", $_GET['moon']);
		$stmt->execute();
		$name_out = NULL;
		$stmt->bind_result($name_out);
		while($stmt->fetch()){
			$temp = array("name" => $name_out);
			array_push($Mi_list, $temp);
		}
		array_push($return, $Mi_list);
		$stmt->close();

	echo json_encode($return);  //Successful return
	die();
    }
}
?>