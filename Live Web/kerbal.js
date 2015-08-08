/***  Eric Olson - CS340_400 Final Project JavaScript ***/

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

      //Also updates the moon orbit select dropdown if planets were changed.
      if (entity == 'planet'){
        new_table = document.getElementById("add_moon_orbits");
        //Deletes any current planets in dropdown select.
        while(new_table.childNodes.length > 0){
          temp_table = new_table.children[0];
          temp_table.parentNode.removeChild(temp_table);
        }
        //Adds current list of planets to select dropdown
        for (x = 0; x < entities.length; x++){
        cell = document.createElement("option");
        cell.setAttribute("value", entities[x].id);
        text = document.createTextNode(entities[x].name);
        cell.appendChild(text);
        new_table.appendChild(cell);
        }
      }
    }
  }
}



function clear_detail(){
  var clear_div = document.getElementById("detail_div"),
      temp;

  //Deletes any current data in detail section.
  while(clear_div.childNodes.length > 0){
    temp = clear_div.children[0];
    temp.parentNode.removeChild(temp);
  }
}



function delete_element(type, id){
  request = new XMLHttpRequest();
    if (!request) {
      throw 'HttpRequest object not created.';
    }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=delete_' + type + '&id=' + id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      draw_toplist(type);
      clear_detail();
      if (type == 'planet') {draw_toplist('moon');}
    }
  }
}



window.onload = function() {
	draw_toplist('kerbal');
	draw_toplist('ship');
	draw_toplist('planet');
	draw_toplist('moon');
  mission_add_stage();
}