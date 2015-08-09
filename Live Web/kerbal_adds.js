/** This file contains javascript functions for adding basic entities to the database **/

//Function requests php to add a kerbal to the database
function add_kerbal(){
  var name = encodeURIComponent(document.getElementById("add_kerbal_name").value),
      courage = encodeURIComponent(document.getElementById("add_kerbal_courage").value),
      stupidity = encodeURIComponent(document.getElementById("add_kerbal_stupidity").value),
      temp_table;

  //Deletes pervious warning if one exists.
  temp_table = document.getElementById('adds').childNodes[1].childNodes[11];
  if (temp_table !== undefined) {
    temp_table.parentNode.removeChild(temp_table);
  }

  //Adds warning if name was not provided.
  if (name == null || name == "" || name == undefined){
    var temp = document.getElementById('adds').childNodes[1];
    var new_element = document.createElement('h5');
    var text = document.createTextNode("Warning: Name is required to submit.");
    new_element.appendChild(text);
    temp.appendChild(new_element);
    return;
  }
  
  //Resets values of form fields upon submit.
  document.getElementById("add_kerbal_name").value = "";
  document.getElementById("add_kerbal_courage").value = 1;
  document.getElementById("add_kerbal_stupidity").value = 1;  

  //Sends request to PHP to add kerbal.
  request = new XMLHttpRequest();
    if (!request) {
      throw 'HttpRequest object not created.';
    }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=add_kerbal&name=' + name + 
        '&courage=' + courage + '&stupidity=' + stupidity;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      draw_toplist('kerbal');  //Redraws kerbal list.
      mission_clear();  //Clears mission area, so new kerbal's will be available.
    }
  }
}



//Function requests php to add a ship to the database.
function add_ship(){
  var name = encodeURIComponent(document.getElementById("add_ship_name").value),
      seats = encodeURIComponent(document.getElementById("add_ship_seats").value),
      stages = encodeURIComponent(document.getElementById("add_ship_stages").value),
      lander = encodeURIComponent(document.getElementById("add_ship_lander").value),
      temp_table;

  //Deletes pervious warning if one exists.
  temp_table = document.getElementById('adds').childNodes[3].childNodes[13];
  if (temp_table !== undefined) {
    temp_table.parentNode.removeChild(temp_table);
  }

  //Adds a warning if no ship name provided.
  if (name == null || name == "" || name == undefined){
    var temp = document.getElementById('adds').childNodes[3];
    var new_element = document.createElement('h5');
    var text = document.createTextNode("Warning: Name is required to submit.");
    new_element.appendChild(text);
    temp.appendChild(new_element);
    return;
  }

  //Provides some default values for missing seats/stages data.
  if (seats == null || seats == "" || seats == undefined) { seats = 0; }
  if (stages == null || stages == "" || stages == undefined) { stages = 0; }

  //Resets form fields upon submission.
  document.getElementById("add_ship_name").value = "";
  document.getElementById("add_ship_seats").value = "";
  document.getElementById("add_ship_stages").value = "";
  document.getElementById("add_ship_lander").value = 1;

  //Sends request to PHP to add ship.
  request = new XMLHttpRequest();
    if (!request) {
      throw 'HttpRequest object not created.';
    }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=add_ship&name=' + name + 
        '&seats=' + seats + '&stages=' + stages + '&lander=' + lander;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      draw_toplist('ship');  //Redraws ship list.
      mission_clear();  //Clears mission area so new ship will be available.
    }
  }
}



//Function requests php to add planet to database.
function add_planet(){
  var name = encodeURIComponent(document.getElementById("add_planet_name").value),
      radius = encodeURIComponent(document.getElementById("add_planet_radius").value),
      inclination = encodeURIComponent(document.getElementById("add_planet_inclination").value),
      gravity = encodeURIComponent(document.getElementById("add_planet_gravity").value),
      atmosphere = encodeURIComponent(document.getElementById("add_planet_atmosphere").value),
      temp_table;

  //Deletes pervious warning if one exists.
  temp_table = document.getElementById('adds').childNodes[5].childNodes[15];
  if (temp_table !== undefined) {
    temp_table.parentNode.removeChild(temp_table);
  }

  //Adds warning if name is not provided.
  if (name == null || name == "" || name == undefined){
    var temp = document.getElementById('adds').childNodes[5];
    var new_element = document.createElement('h5');
    var text = document.createTextNode("Warning: Name is required to submit.");
    new_element.appendChild(text);
    temp.appendChild(new_element);
    return;
  }
  
  //Cleans up additional fields that may have been left blank.
  if (radius == null || radius == "" || radius == undefined) { radius = 0; }
  if (inclination == null || inclination == "" || inclination == undefined) { inclination = 0; }
  if (gravity == null || gravity == "" || gravity == undefined) { gravity = 0; }

  //Resets form fields.
  document.getElementById("add_planet_name").value = "";
  document.getElementById("add_planet_radius").value = "";
  document.getElementById("add_planet_inclination").value = "";
  document.getElementById("add_planet_gravity").value = "";
  document.getElementById("add_planet_atmosphere").value = 1;

  //Sends request to PHP to add planet.
  request = new XMLHttpRequest();
    if (!request) {
      throw 'HttpRequest object not created.';
    }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=add_planet&name=' + name + 
        '&radius=' + radius + '&inclination=' + inclination + '&gravity=' + gravity + '&atmosphere=' + atmosphere;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      draw_toplist('planet');  //Redraws planet list.
      mission_clear();  //Clears mission area to ensure all planets are made available.
    }
  }
}



//Function requests php to add moon to database.
function add_moon(){
  var name = encodeURIComponent(document.getElementById("add_moon_name").value),
      radius = encodeURIComponent(document.getElementById("add_moon_radius").value),
      gravity = encodeURIComponent(document.getElementById("add_moon_gravity").value),
      atmosphere = encodeURIComponent(document.getElementById("add_moon_atmosphere").value),
      orbits = encodeURIComponent(document.getElementById("add_moon_orbits").value),
      temp_table;

  //Deletes pervious warning if one exists.
  temp_table = document.getElementById('adds').childNodes[7].childNodes[15];
  if (temp_table !== undefined) {
    temp_table.parentNode.removeChild(temp_table);
  }

  //Adds warning if moon name not provided.
  if (name == null || name == "" || name == undefined){
    var temp = document.getElementById('adds').childNodes[7];
    var new_element = document.createElement('h5');
    var text = document.createTextNode("Warning: Name is required to submit.");
    new_element.appendChild(text);
    temp.appendChild(new_element);
    return;
  }

  //Adds warning if no parent planet selected (generally means planet table is empty)
  if (orbits == null || orbits == "" || orbits == undefined){
    var temp = document.getElementById('adds').childNodes[7];
    var new_element = document.createElement('h5');
    var text = document.createTextNode("Warning: Moons require a planet.");
    new_element.appendChild(text);
    temp.appendChild(new_element);
    return;
  }

  //Defaults additional fields if not provided.
  if (radius == null || radius == "" || radius == undefined) { radius = 0; }
  if (gravity == null || gravity == "" || gravity == undefined) { gravity = 0; }

  //Resets form fields to defaults.
  document.getElementById("add_moon_name").value = "";
  document.getElementById("add_moon_radius").value = "";
  document.getElementById("add_moon_gravity").value = "";
  document.getElementById("add_moon_atmosphere").value = 1;
  draw_toplist('planet');  //Used to also reset moon's choices.

  //Sends request to PHP to add moon.
  request = new XMLHttpRequest();
    if (!request) {
      throw 'HttpRequest object not created.';
    }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=add_moon&name=' + name + 
        '&radius=' + radius + '&gravity=' + gravity + '&atmosphere=' + atmosphere + '&orbits=' + orbits;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      draw_toplist('moon');
      clear_detail();  //Because planet may show new moon.
      mission_clear();
    }
  }
}