<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

//Access User Database
include "database_setting.php";  //Contains DB login info {$db_host, $db_user, $db_pass}
$usersqli = new mysqli($db_host, $db_user, $db_pass, $db_user);
if ($usersqli->connect_errno) {
	alert("Error: Unable to access kerbal database.");  //Code for Unable to access database.
	die();
}
?>

<!-- Eric Olson - CS340_400 Final Project -->
<!doctype html>
<html>
  <head>
  <meta charset="UTF-8">
  <title>Kerbal Database</title>
  <link rel="stylesheet" href="style.css">
  <script src="kerbal.js"></script>
  </head>
  <body>
  	<p>This website allows you to utilize a kerbal database ...</p>
  	<table class="top_list" id="kerbal_list">
  		<thead>
  			<tr><th>Kerbals:</tr>
  		</thead>
  		<tbody>
  			<!-- Intentionally left blank, will be populated by draw_kerbal() -->
  		</tbody>
  	</table>
  	<table class="top_list" id="ship_list">
  		<thead>
  			<tr><th>Ships:</tr>
  		</thead>
  		<tbody>
  			<!-- Intentionally left blank, will be populated by draw_ship() -->
  		</tbody>
  	</table>
  	<table class="top_list" id="planet_list">
  		<thead>
  			<tr><th>Planets:</tr>
  		</thead>
  		<tbody>
  			<!-- Intentionally left blank, will be populated by draw_planet() -->
  		</tbody>
  	</table>
  	<table class="top_list" id="moon_list">
  		<thead>
  			<tr><th>Moons:</tr>
  		</thead>
  		<tbody>
  			<!-- Intentionally left blank, will be populated by draw_moon() -->
  		</tbody>
  	</table>
  	<p>And here is the Detailed Information:</p>
  	<div id="detail_div"></div>
  </body>
</html>