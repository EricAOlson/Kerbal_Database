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
  	<p>And here you can add the basics stuff:</p>
  	<div id="adds">
  		<form onsubmit="add_kerbal();">
  			<h3>Add a Kerbal</h3>
  			<input type="hidden" name="req" value="add_kerbal"/>
  			<div>
    			<label for="name">Name:</label>
    			<input type="text" name="name" id="add_kerbal_name"/>
    		</div>
    		<div>
    			<label for="courage">Courage:</label>
    			<select name="courage" id="add_kerbal_courage">
    				<option value="1">1</option>
    				<option value="2">2</option>
    				<option value="3">3</option>
    				<option value="4">4</option>
    				<option value="5">5</option>
    				<option value="6">6</option>
    				<option value="7">7</option>
    				<option value="8">8</option>
    				<option value="9">9</option>
    				<option value="10">10</option>
    			</select>
    		</div>
    		<div>
    			<label for="stupidity">Stupidity:</label>
    			<select name="stupidity" id="add_kerbal_stupidity">
    				<option value="1">1</option>
    				<option value="2">2</option>
    				<option value="3">3</option>
    				<option value="4">4</option>
    				<option value="5">5</option>
    				<option value="6">6</option>
    				<option value="7">7</option>
    				<option value="8">8</option>
    				<option value="9">9</option>
    				<option value="10">10</option>
    			</select>
    		</div>
    		<div>
    			<input type="submit" />
    		</div>
    	</form>
    	<form onsubmit="add_ship();">
  			<h3>Add a Ship</h3>
  			<input type="hidden" name="req" value="add_ship"/>
  			<div>
    			<label for="name">Name:</label>
    			<input type="text" name="name" id="add_ship_name"/>
    		</div>
    		<div>
    			<label for="seats">Seats:</label>
    			<input type="number" name="seats" min="0" max="25"id="add_ship_seats"/>
    		</div>
    		<div>
    			<label for="stages">Stages:</label>
    			<input type="number" name="stages" min="0" max="50" id="add_ship_stages"/>
    		</div>
    		<div>
    			<label for="lander">Lander:</label>
    			<select name="lander" id="add_ship_lander">
    				<option value="1">Yes</option>
    				<option value="0">No</option>
    			</select>
    		</div>
    		<div>
    			<input type="submit" />
    		</div>
    	</form>
  </body>
</html>