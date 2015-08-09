/*** File provides 4 similiar functions to build the detail view for all basic entities ***/

//Detailed Form Population for Kerbals
function detail_kerbal(id){
  id = encodeURIComponent(id);
  var new_div = document.getElementById("detail_div"),
      temp_table,
      new_table,
      new_row,
      new_cell,
      text,
      button,
      url,
      response = [];

  //Makes request to PHP for Kerbal Details.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=detail_kerbal&kerbal=' + id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      response = JSON.parse(this.responseText);  //Parses array with all required details.

      //Deletes any current data in detail section.
      while(new_div.childNodes.length > 0){
        temp_table = new_div.children[0];
        temp_table.parentNode.removeChild(temp_table);
      }

      //Adds Kerbal Detail Data
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Attribute:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("th");
      text = document.createTextNode("Value:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Name
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Name");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].name);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Courage
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Courage");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].courage);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Stupidity
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Stupidity");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].stupidity);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Delete Button
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      new_cell.setAttribute("align", "center");
      new_cell.setAttribute("colspan", "2");
      button = document.createElement("Button");
      button.setAttribute("onclick", "delete_element('kerbal', " + id + ");");
      text = document.createTextNode("Delete");
      button.appendChild(text);
      new_cell.appendChild(button);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      new_div.appendChild(new_table);

      //List Ships Ridden
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Ships Ridden In:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Ships
      for (x = 0; x < response[1].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[1][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Missions Assigned
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Missions Assigned:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Missions
      for (x = 0; x < response[2].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[2][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Planets Visited
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Planets Visited:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Planets
      for (x = 0; x < response[3].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[3][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Moons Visited
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Moons Visited:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Ships
      for (x = 0; x < response[4].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[4][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);
    }
  }
}



//Detailed Form Population for Ships
function detail_ship(id){
  id = encodeURIComponent(id);
  var new_div = document.getElementById("detail_div"),
      temp_table,
      new_table,
      new_row,
      new_cell,
      text,
      url,
      response = [];

  //Makes request to PHP for Ship Details.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=detail_ship&ship=' + id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      response = JSON.parse(this.responseText);  //Parses all requested data.

      //Deletes any current data in detail section.
      while(new_div.childNodes.length > 0){
        temp_table = new_div.children[0];
        temp_table.parentNode.removeChild(temp_table);
      }

      //Provides Ship Data
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Attribute:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("th");
      text = document.createTextNode("Value:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Name
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Name");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].name);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Seats
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Seats");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].seats);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Stages
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Stages");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].stages);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Lander
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Lander");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].lander);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Delete Button
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      new_cell.setAttribute("align", "center");
      new_cell.setAttribute("colspan", "2");
      button = document.createElement("Button");
      button.setAttribute("onclick", "delete_element('ship', " + id + ");");
      text = document.createTextNode("Delete");
      button.appendChild(text);
      new_cell.appendChild(button);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      new_div.appendChild(new_table);

      //List Kerbals Piloted
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Piloted By:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Kerbals
      for (x = 0; x < response[1].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[1][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Missions Assigned
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Missions Assigned:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Missions
      for (x = 0; x < response[2].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[2][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Planets Visited
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Planets Visited:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Planets
      for (x = 0; x < response[3].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[3][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Moons Vistied
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Moons Visited:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Moons
      for (x = 0; x < response[4].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[4][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);
    }
  }
}



//Detailed Form Population for Planets
function detail_planet(id){
  id = encodeURIComponent(id);
  var new_div = document.getElementById("detail_div"),
      temp_table,
      new_table,
      new_row,
      new_cell,
      text,
      url,
      response = [];

  //Makes request to PHP for Planet Details.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=detail_planet&planet=' + id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      response = JSON.parse(this.responseText);  //Parses all requested data.

      //Deletes any current data in detail section.
      while(new_div.childNodes.length > 0){
        temp_table = new_div.children[0];
        temp_table.parentNode.removeChild(temp_table);
      }

      //Provides Planet Data
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Attribute:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("th");
      text = document.createTextNode("Value:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Name
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Name");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].name);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Radius
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Radius");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].radius + "km");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Inclination
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Inclination");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].inclination + "deg");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //gravity
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Gravity");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].gravity + "m/s^2");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //atmosphere
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Atmosphere");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].atmosphere);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Delete Button
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      new_cell.setAttribute("align", "center");
      new_cell.setAttribute("colspan", "2");
      button = document.createElement("Button");
      button.setAttribute("onclick", "delete_element('planet', " + id + ");");
      text = document.createTextNode("Delete");
      button.appendChild(text);
      new_cell.appendChild(button);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Footer warning for moon loss on planet delete.
      new_cell = document.createElement("tfoot");
      text = document.createTextNode("Warning: Upon delete, any moons");
      new_cell.appendChild(text);
      text = document.createElement("br");
      new_cell.appendChild(text);
      text = document.createTextNode("orbiting " + response[0][0].name + " will also be deleted.");
      new_cell.appendChild(text);
      new_table.appendChild(new_cell);
      new_div.appendChild(new_table);

      //List Kerbals Visited
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Visited By:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Kerbals
      for (x = 0; x < response[1].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[1][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Ships Arrived
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Ships Arrived:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Ships
      for (x = 0; x < response[2].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[2][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Missions Assigned
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Missions:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Missions
      for (x = 0; x < response[3].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[3][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Moons
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Moons:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Moons
      for (x = 0; x < response[4].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[4][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);
    }
  }
}



//Detailed Form Population for Moons
function detail_moon(id){
  id = encodeURIComponent(id);
  var new_div = document.getElementById("detail_div"),
      temp_table,
      new_table,
      new_row,
      new_cell,
      text,
      url,
      response = [];

  //Makes request to PHP for Planet Details.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=detail_moon&moon=' + id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      response = JSON.parse(this.responseText);  //Parses all requested data.

      //Deletes any current data in detail section.
      while(new_div.childNodes.length > 0){
        temp_table = new_div.children[0];
        temp_table.parentNode.removeChild(temp_table);
      }

      //Provides Planet Detail Data
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Attribute:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode("Value:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Name
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Name");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].name);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //Radius
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Radius");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].radius + "km");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //gravity
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Gravity");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].gravity + "m/s^2");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //atmosphere
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Atmosphere");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].atmosphere);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      //orbits
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Orbits");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].orbits);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      new_div.appendChild(new_table);
      //Delete Button
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      new_cell.setAttribute("align", "center");
      new_cell.setAttribute("colspan", "2");
      button = document.createElement("Button");
      button.setAttribute("onclick", "delete_element('moon', " + id + ");");
      text = document.createTextNode("Delete");
      button.appendChild(text);
      new_cell.appendChild(button);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      new_div.appendChild(new_table);

      //List Kerbals Visited
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Visited By:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Kerbals
      for (x = 0; x < response[1].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[1][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Ships Arrived
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Ships Arrived:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Ships
      for (x = 0; x < response[2].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[2][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);

      //List Missions Assigned
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("th");
      text = document.createTextNode("Missions:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Missions
      for (x = 0; x < response[3].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[3][x].name);
        new_cell.appendChild(text);
        new_row.appendChild(new_cell);
        new_table.appendChild(new_row);
      }
      new_div.appendChild(new_table);
    }
  }
}