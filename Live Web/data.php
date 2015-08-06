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
			                          INNER JOIN Mission_Planet MP ON M.id = MP.mission_id
			                          INNER JOIN Moon ON MP.planet_id = Moon.id
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
			                          INNER JOIN Mission_Planet MP ON M.id = MP.mission_id
			                          INNER JOIN Moon ON MP.planet_id = Moon.id
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
?>