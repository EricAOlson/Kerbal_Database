/** Draws list of 'entities' in database **/
function add_kerbal(){
  var name = document.getElementById("add_kerbal_name").value,
      courage = document.getElementById("add_kerbal_courage").value,
      stupidity = document.getElementById("add_kerbal_stupidity").value;

  document.getElementById("add_kerbal_name").value = "";
  document.getElementById("add_kerbal_courage").value = 1;
  document.getElementById("add_kerbal_stupidity").value = 1;  

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
        draw_toplist('kerbal');
      }
  }
}



function add_ship(){
  var name = document.getElementById("add_ship_name").value,
      seats = document.getElementById("add_ship_seats").value,
      stages = document.getElementById("add_ship_stages").value;
      lander = document.getElementById("add_ship_lander").value;

  document.getElementById("add_ship_name").value = "";
  document.getElementById("add_ship_seats").value = "";
  document.getElementById("add_ship_stages").value = "";
  document.getElementById("add_ship_lander").value = 1;

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
        draw_toplist('ship');
      }
   }
}



function add_planet(){
  var name = document.getElementById("add_planet_name").value,
      radius = document.getElementById("add_planet_radius").value,
      inclination = document.getElementById("add_planet_inclination").value;
      gravity = document.getElementById("add_planet_gravity").value;
      atmosphere = document.getElementById("add_planet_atmosphere").value;

  document.getElementById("add_planet_name").value = "";
  document.getElementById("add_planet_radius").value = "";
  document.getElementById("add_planet_inclination").value = "";
  document.getElementById("add_planet_gravity").value = "";
  document.getElementById("add_planet_atmosphere").value = 1;

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
      draw_toplist('planet');
    }
  }
}



function add_moon(){
  var name = document.getElementById("add_moon_name").value,
      radius = document.getElementById("add_moon_radius").value,
      gravity = document.getElementById("add_moon_gravity").value;
      atmosphere = document.getElementById("add_moon_atmosphere").value;
      orbits = document.getElementById("add_moon_orbits").value;

  document.getElementById("add_moon_name").value = "";
  document.getElementById("add_moon_radius").value = "";
  document.getElementById("add_moon_gravity").value = "";
  document.getElementById("add_moon_atmosphere").value = "";
  document.getElementById("add_moon_orbits").value = "";

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
      }
  }
}
