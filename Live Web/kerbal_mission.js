function mission_clear(){
  var mission_div = document.getElementById("mission_box"),
  temp;

  //Deletes any current data in mission section.
  while(mission_div.childNodes.length > 0){
    temp = mission_div.children[0];
    temp.parentNode.removeChild(temp);
  }
}



function mission_add_stage(){
  var mission_div = document.getElementById("mission_box"),
  new_div,
  new_element,
  text,
  temp,
  entities,
  x;

  //clear the box of any current data.
  mission_clear();

  //Adds new div for selectable content.
  new_div = document.createElement("div");
  new_div.setAttribute("id", "mission_selection");
  mission_div.appendChild(new_div);

  //Adds Sumbit Button
  new_element = document.createElement("div");
  mission_div.appendChild(new_element);
  new_element = document.createElement("button");
  new_element.setAttribute("onclick", "mission_add();");
  text = document.createTextNode("Submit");
  new_element.appendChild(text);
  mission_div.appendChild(new_element);

  //Adds Div for Mission info
  mission_div = document.getElementById('mission_selection');
  //name input
  new_element = document.createElement("div");
  temp = document.createElement("label");
  temp.setAttribute("for", "name");
  text = document.createTextNode("Mission Name: ");
  temp.appendChild(text);
  new_element.appendChild(temp);
  temp = document.createElement("input");
  temp.setAttribute("type", "text");
  temp.setAttribute("name", "name");
  temp.setAttribute("id", "mission_name");
  new_element.appendChild(temp);
  mission_div.appendChild(new_element);
  //first_launch input
  new_element = document.createElement("div");
  temp = document.createElement("label");
  temp.setAttribute("for", "first_launch");
  text = document.createTextNode("Year Launched:");
  temp.appendChild(text);
  new_element.appendChild(temp);
  temp = document.createElement("input");
  temp.setAttribute("type", "number");
  temp.setAttribute("name", "first_launch");
  temp.setAttribute("id", "first_launch");
  new_element.appendChild(temp);
  mission_div.appendChild(new_element);

  //Makes request to SQL for list of kerbals.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  request.open('GET', 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=kerbal_list', true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      entities = JSON.parse(this.responseText);
      //Adds list of potential kerbals assigned:
      new_div = document.createElement("div");
      new_div.setAttribute("class", "mission_data");
      new_div.setAttribute("id", "mission_kerbal");
      new_element = document.createElement("list");
      text = document.createTextNode('Kerbals Assigned:');
      new_element.appendChild(text);
      new_div.appendChild(new_element);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);
      //Adds checkboxes for each kerbal.
      for (x = 0; x < entities.length; x++){
      	new_element = document.createElement("input");
      	new_element.setAttribute("type", "checkbox");
      	new_element.setAttribute("value", entities[x].id);
      	new_div.appendChild(new_element);
      	text = document.createTextNode('' + entities[x].name + '');
      	new_div.appendChild(text);
        new_element = document.createElement('br');
      	new_div.appendChild(new_element);
      }
      mission_div.appendChild(new_div);
    }
  }

  //Makes request to SQL for list of ships
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  request.open('GET', 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=ship_list', true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      entities = JSON.parse(this.responseText);
      //Adds list of potential ship assignments:
      new_div = document.createElement("div");
      new_div.setAttribute("class", "mission_data");
      new_div.setAttribute("id", "mission_ship");
      new_element = document.createElement("list");
      new_element.setAttribute("for", "ship");
      text = document.createTextNode('Ship Assigned:');
      new_element.appendChild(text);
      new_div.appendChild(new_element);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);
      //Adds checkboxes for each ship.
      for (x = 0; x < entities.length; x++){
      	new_element = document.createElement("input");
      	new_element.setAttribute("type", "radio");
      	new_element.setAttribute("name", "ship");
      	new_element.setAttribute("value", entities[x].id);
      	new_div.appendChild(new_element);
      	text = document.createTextNode('' + entities[x].name + '');
      	new_div.appendChild(text);
        new_element = document.createElement('br');
      	new_div.appendChild(new_element);
      }
      mission_div.appendChild(new_div);
    }
  }

  //Makes request to SQL for list of planets.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  request.open('GET', 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=planet_list', true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      entities = JSON.parse(this.responseText);
      //Adds list of potential planets assigned:
      new_div = document.createElement("div");
      new_div.setAttribute("class", "mission_data");
      new_div.setAttribute("id", "mission_planet");
      new_element = document.createElement("list");
      text = document.createTextNode('Target Planets:');
      new_element.appendChild(text);
      new_div.appendChild(new_element);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);
      //Adds checkboxes for each planet.
      for (x = 0; x < entities.length; x++){
      	new_element = document.createElement("input");
      	new_element.setAttribute("type", "checkbox");
      	new_element.setAttribute("value", entities[x].id);
      	new_div.appendChild(new_element);
      	text = document.createTextNode('' + entities[x].name + '');
      	new_div.appendChild(text);
        new_element = document.createElement('br');
      	new_div.appendChild(new_element);
      }
      mission_div.appendChild(new_div);
    }
  }

  //Makes request to SQL for list of moons.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  request.open('GET', 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=moon_list', true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      entities = JSON.parse(this.responseText);
      //Adds list of potential moons assigned:
      new_div = document.createElement("div");
      new_div.setAttribute("class", "mission_data");
      new_div.setAttribute("id", "mission_moon");
      new_element = document.createElement("list");
      text = document.createTextNode('Target Moons:');
      new_element.appendChild(text);
      new_div.appendChild(new_element);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);
      //Adds checkboxes for each moon.
      for (x = 0; x < entities.length; x++){
      	new_element = document.createElement("input");
      	new_element.setAttribute("type", "checkbox");
      	new_element.setAttribute("value", entities[x].id);
      	new_div.appendChild(new_element);
      	text = document.createTextNode('' + entities[x].name + '');
      	new_div.appendChild(text);
        new_element = document.createElement('br');
      	new_div.appendChild(new_element);
      }
      mission_div.appendChild(new_div);
    }
  }
}



function mission_add(){
  var mission_name = document.getElementById('mission_name').value,
      year_launch = document.getElementById('first_launch').value,
      mission_div,
      kerbals = [],
      ship,
      planets = [],
      moons = [],
      x;

  //Handles blank mission name.
  //if (mission_name == "" || mission_name = NULL) {mission_name = 'TBD';}

  //Add kerbal data to array.
  mission_div = document.getElementById('mission_kerbal');
  for (x = 2; x < mission_div.children.length ; x = x + 2){
  	if (mission_div.children[x].checked) { kerbals.push(mission_div.children[x].value); }
  }
  //Add ship data to array.
  mission_div = document.getElementById('mission_ship');
  for (x = 2; x < mission_div.children.length ; x = x + 2){
  	if (mission_div.children[x].checked) { ship = mission_div.children[x].value; }
  }
  //Add planet data to array.
  mission_div = document.getElementById('mission_planet');
  for (x = 2; x < mission_div.children.length ; x = x + 2){
  	if (mission_div.children[x].checked) { planets.push(mission_div.children[x].value); }
  }
  //Add moon data to array.
  mission_div = document.getElementById('mission_moon');
  for (x = 2; x < mission_div.children.length ; x = x + 2){
  	if (mission_div.children[x].checked) { moons.push(mission_div.children[x].value); }
  }

  //Sends data SQL server php file to process.
  request = new XMLHttpRequest();
    if (!request) {
      throw 'HttpRequest object not created.';
    }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=mission_add&mission=' + encodeURIComponent(mission_name);
  url += '&launch=' + year_launch;
  url += '&kerbals=' + JSON.stringify(kerbals);
  url += '&ship=' + ship;  
  url += '&planets=' + JSON.stringify(planets);  
  url += '&moons=' + JSON.stringify(moons);       
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
      if (this.readyState === 4) {
        mission_add_stage();
        clear_detail();
      }
  }  
}



function mission_delete_stage(){
	var mission_div = document.getElementById("mission_box"),
	    select_div,
	    new_element,
	    text,
	    missions = [],
	    x;

	//clear the box of any current data.
    mission_clear();

    new_element = document.createElement("label");
    new_element.setAttribute("for", "name");
    text = document.createTextNode("Mission Selection:");
    new_element.appendChild(text);
    mission_div.appendChild(new_element);
    new_element = document.createElement("select");
    new_element.setAttribute("name", "name");
    new_element.setAttribute("id", "mission_delete_name");
    mission_div.appendChild(new_element);
    select_div = document.getElementById("mission_delete_name");
    new_element = document.createElement("button");
    new_element.setAttribute("onclick", "mission_delete();");
    text = document.createTextNode("Delete");
    new_element.appendChild(text);
    mission_div.appendChild(new_element);

    //Gets a list of missions for drop down.
    request = new XMLHttpRequest();
    if (!request) {
    	throw 'HttpRequest object not created.';
    }
    url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/data.php?req=mission_list';
    request.open('GET', url, true);
    request.send();
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        missions = JSON.parse(this.responseText);
        for (x = 0; x < missions.length; x++){
        	new_element = document.createElement("option");
    		new_element.setAttribute("value", missions[x].id);
    		text = document.createTextNode(missions[x].name);
    		new_element.appendChild(text);
    		select_div.appendChild(new_element);
        }
      }
    }
}



function mission_delete(){
	var mission_id = document.getElementById('mission_delete_name').value;

    //Deletes selected mission from database.
    request = new XMLHttpRequest();
    if (!request) {
    	throw 'HttpRequest object not created.';
    }
    url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=delete_mission&id=' + mission_id;
    request.open('GET', url, true);
    request.send();
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
      	mission_delete_stage();
      }
    }
}