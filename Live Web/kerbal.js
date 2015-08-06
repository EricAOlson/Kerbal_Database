/***  Eric Olson - CS340_400 Final Project JavaScript ***/

/** Draws list of 'entities' in database **/
function draw_toplist(entity){
  var entities = [],
      new_table = document.getElementById(entity + "_list"),
      temp_table,
      table_body = document.createElement("tbody"),
      x,
      row,
      cell,
      link,
      text,
      url;

  //Makes request to SQL for List of 'entities'.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=' + entity + '_list';
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      entities = JSON.parse(this.responseText);

      //Deletes old table is one has already been printed.
      temp_table = new_table.children[1];
      if (temp_table !== undefined) {
        temp_table.parentNode.removeChild(temp_table);
      }

      //Draws new table body with list of kerbals.
      if (entities.length > 0){
      	for (x = 0; x < entities.length; x++){
      	  //Add a new row with clickable Kerbal name.
      	  row = document.createElement("tr");
      	  cell = document.createElement("td");
      	  link = document.createElement("a");
      	  link.setAttribute("href", "#");
      	  link.setAttribute("onclick", "detail_" + entity + "(" + entities[x].id + ");");
      	  text = document.createTextNode(entities[x].name);
      	  link.appendChild(text);
      	  cell.appendChild(link);
      	  row.appendChild(cell);
      	  table_body.appendChild(row);
        }
      //Add the new body with kerbal names to table.
      new_table.appendChild(table_body);
	  }
    }
  }
}



//Detailed Form Population for Kerbals
function detail_kerbal(id){
  var new_div = document.getElementById("detail_div"),
      temp_table,
      new_table,
      new_row,
      new_cell,
      text,
      url,
      response = [];

  //Makes request to SQL for Kerbal Details.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=detail_kerbal&kerbal=' + id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      response = JSON.parse(this.responseText);

      //Deletes any current data in detail section.
      while(new_div.childNodes.length > 0){
        temp_table = new_div.children[0];
        temp_table.parentNode.removeChild(temp_table);
      }

      //Provides Kerbal Data
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("td");
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
      new_div.appendChild(new_table)

      //List Ships Ridden
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("td");
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
      new_cell = document.createElement("td");
      text = document.createTextNode("Missions Assigned:");
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
      new_cell = document.createElement("td");
      text = document.createTextNode("Planets Visited:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Ships
      for (x = 0; x < response[3].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[3][x].name);
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
      new_cell = document.createElement("td");
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
  var new_div = document.getElementById("detail_div"),
      temp_table,
      new_table,
      new_row,
      new_cell,
      text,
      url,
      response = [];

  //Makes request to SQL for Kerbal Details.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=detail_ship&ship=' + id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      response = JSON.parse(this.responseText);

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
      new_cell = document.createElement("td");
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
      //Stages
      new_row = document.createElement("tr");
      new_cell = document.createElement("td");
      text = document.createTextNode("Stages");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      text = document.createTextNode(response[0][0].lander);
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_table.appendChild(new_row);
      new_div.appendChild(new_table)

      //List Kerbals Piloted
      new_table = document.createElement("table");
      new_table.setAttribute("class", "detail_list");
      //Headers
      new_row = document.createElement("thead");
      new_cell = document.createElement("td");
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
      new_cell = document.createElement("td");
      text = document.createTextNode("Missions Assigned:");
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
      new_cell = document.createElement("td");
      text = document.createTextNode("Planets Visited:");
      new_cell.appendChild(text);
      new_row.appendChild(new_cell);
      new_cell = document.createElement("td");
      new_table.appendChild(new_row);
      //Ships
      for (x = 0; x < response[3].length; x++){
        new_row = document.createElement("tr");
        new_cell = document.createElement("td");
        text = document.createTextNode(response[3][x].name);
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
      new_cell = document.createElement("td");
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


window.onload = function() {
	draw_toplist('kerbal');
	draw_toplist('ship');
	draw_toplist('planet');
	draw_toplist('moon');
}