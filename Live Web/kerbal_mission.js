/*** File contains javascript functions in support of the Missions Area of the page **/

//Clears the mission area of existing data, and resets radio buttons.
function mission_clear(){
  var mission_div = document.getElementById("mission_box"),
  temp;

  document.getElementById("mission_header_add").checked = false;
  document.getElementById("mission_header_delete").checked = false;
  document.getElementById("mission_header_update").checked = false;

  //Deletes any current data in mission section.
  while(mission_div.childNodes.length > 0){
    temp = mission_div.children[0];
    temp.parentNode.removeChild(temp);
  }
}



//Function stages the Add Mission area with needed data.
function mission_add_stage(){
  var mission_div = document.getElementById("mission_box"),
  new_div,
  new_element,
  text,
  temp,
  entities,
  x;

  //Deletes any current data in mission section.
  while(mission_div.childNodes.length > 0){
    temp = mission_div.children[0];
    temp.parentNode.removeChild(temp);
  }

  //Adds new div for selectable content.
  new_div = document.createElement("div");
  new_div.setAttribute("id", "mission_selection");
  mission_div.appendChild(new_div);

  //Adds Sumbit Button
  new_element = document.createElement("div");
  mission_div.appendChild(new_element);
  new_element = document.createElement("button");
  new_element.setAttribute("onclick", "mission_add();");
  new_element.setAttribute("id", "add_submit");
  text = document.createTextNode("Submit");
  new_element.appendChild(text);
  mission_div.appendChild(new_element);

  //Adds Div for Mission info
  mission_div = document.getElementById('mission_selection');
  //name input
  new_element = document.createElement("div");
  temp = document.createElement("label");
  temp.setAttribute("for", "name");
  temp.setAttribute("id", "head");
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
  temp.setAttribute("id", "head");
  text = document.createTextNode("Launch Year:");
  temp.appendChild(text);
  new_element.appendChild(temp);
  temp = document.createElement("input");
  temp.setAttribute("type", "number");
  temp.setAttribute("name", "first_launch");
  temp.setAttribute("id", "first_launch");
  new_element.appendChild(temp);
  mission_div.appendChild(new_element);

  //Makes request to SQL for list of all kerbals.
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
      new_element.setAttribute("id", "head");
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

  //Makes request to SQL for list of all ships
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
      new_element.setAttribute("id", "head");
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
      //On additional checkbox for 'None' if no ships yet assigned Mission.
      new_element = document.createElement("input");
      new_element.setAttribute("type", "radio");
      new_element.setAttribute("name", "ship");
      new_element.setAttribute("value", "");
      new_element.setAttribute("checked", "checked");
      new_div.appendChild(new_element);
      text = document.createTextNode('None');
      new_div.appendChild(text);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);
      mission_div.appendChild(new_div);
    }
  }

  //Makes request to SQL for list of all planets.
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
      new_element.setAttribute("id", "head");
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

  //Makes request to SQL for list of all moons.
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
      new_element.setAttribute("id", "head");
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



//Function preforms the mission add, sending data to PHP to be added to database.
function mission_add(){
  var mission_name = encodeURIComponent(document.getElementById('mission_name').value),
      year_launch = encodeURIComponent(document.getElementById('first_launch').value),
      mission_div,
      kerbals = [],
      ship,
      planets = [],
      moons = [],
      x,
      temp_table;

  //Deletes pervious warning if one exists.
  temp_table = document.getElementById('mission_box').childNodes[3];
  if (temp_table !== undefined) {
    temp_table.parentNode.removeChild(temp_table);
  }

  //Adds warning if no mission name provided.
  if (mission_name == null || mission_name == "" || mission_name == undefined){
    var temp = document.getElementById('mission_box');
    var new_element = document.createElement('h5');
    var text = document.createTextNode("Warning: Name is required to submit.");
    new_element.appendChild(text);
    temp.appendChild(new_element);
    return;
  }

  //Defaults year of launch if none provided.
  if (year_launch == null || year_launch == undefined) { year_launch = ""; }

  //Add kerbal data to array.
  mission_div = document.getElementById('mission_kerbal');
  for (x = 2; x < mission_div.children.length ; x = x + 2){
  	if (mission_div.children[x].checked) { kerbals.push(encodeURIComponent(mission_div.children[x].value)); }
  }
  //Add ship data to array.
  mission_div = document.getElementById('mission_ship');
  for (x = 2; x < mission_div.children.length ; x = x + 2){
  	if (mission_div.children[x].checked) { ship = encodeURIComponent(mission_div.children[x].value); }
  }
  //Add planet data to array.
  mission_div = document.getElementById('mission_planet');
  for (x = 2; x < mission_div.children.length ; x = x + 2){
  	if (mission_div.children[x].checked) { planets.push(encodeURIComponent(mission_div.children[x].value)); }
  }
  //Add moon data to array.
  mission_div = document.getElementById('mission_moon');
  for (x = 2; x < mission_div.children.length ; x = x + 2){
  	if (mission_div.children[x].checked) { moons.push(encodeURIComponent(mission_div.children[x].value)); }
  }

  //Sends data to php file to process.
  request = new XMLHttpRequest();
    if (!request) {
      throw 'HttpRequest object not created.';
    }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=mission_add&mission=' + mission_name;
  url += '&launch=' + year_launch;
  url += '&kerbals=' + JSON.stringify(kerbals);
  url += '&ship=' + ship;  
  url += '&planets=' + JSON.stringify(planets);  
  url += '&moons=' + JSON.stringify(moons);       
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      mission_add_stage();  //Clears Mission area, and restages for new mission add.
      clear_detail();  //Clears the detail section as the mission add likely changed associations.
    }
  }  
}



//Function prepares mission delete area, with list of existing missions.
function mission_delete_stage(){
  var mission_div = document.getElementById("mission_box"),
      select_div,
      new_element,
      text,
      missions = [],
      x;

  //Deletes any current data in mission section.
  while(mission_div.childNodes.length > 0){
   	temp = mission_div.children[0];
   	temp.parentNode.removeChild(temp);
  }

  //Adds labels and mission dropdown select.
  new_element = document.createElement("label");
  new_element.setAttribute("for", "name");
  text = document.createTextNode("Mission Name:");
  new_element.appendChild(text);
  mission_div.appendChild(new_element);
  new_element = document.createElement("select");
  new_element.setAttribute("name", "name");
  new_element.setAttribute("id", "mission_delete_name");
  mission_div.appendChild(new_element);
  select_div = document.getElementById("mission_delete_name");
  new_element = document.createElement("button");
  new_element.setAttribute("onclick", "mission_delete();");
  new_element.setAttribute("id", "delete_button");
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
      //Adds each existing mission to select dropdown.
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



//Preforms mission delete, sending data to PHP for execution.
function mission_delete(){
  var mission_id = encodeURIComponent(document.getElementById('mission_delete_name').value);

  //Sends delete request to PHP to process.
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
      clear_detail();
    }
  }
}



//Function stages the mission area for a real time mission update. 
function mission_update_stage(){
  var mission_div = document.getElementById("mission_box"),
      select_div,
	  new_div,
	  new_element,
	  text,
	  missions = [],
	  x;

  //Deletes any current data in mission section.
  while(mission_div.childNodes.length > 0){
    temp = mission_div.children[0];
    temp.parentNode.removeChild(temp);
  }

  //Add name Selector
  new_div = document.createElement('div');
  new_element = document.createElement("label");
  new_element.setAttribute("for", "name");
  new_element.setAttribute("id", "head");
  text = document.createTextNode("Mission Name:");
  new_element.appendChild(text);
  new_div.appendChild(new_element);
  new_element = document.createElement("select");
  new_element.setAttribute("name", "name");
  new_element.setAttribute("id", "mission_update_name");
  new_div.appendChild(new_element);
  mission_div.appendChild(new_div);
  //Add Year Launched Text Input
  new_div = document.createElement('div');
  new_element = document.createElement("label");
  new_element.setAttribute("for", "first_launch");
  new_element.setAttribute("id", "head");
  text = document.createTextNode("Launch Year:");
  new_element.appendChild(text);
  new_div.appendChild(new_element);
  new_element = document.createElement("input");
  new_element.setAttribute("type", "number");
  new_element.setAttribute("name", "first_launch");
  new_element.setAttribute("id", "first_launch");
  new_div.appendChild(new_element);
  mission_div.appendChild(new_div);
  new_element = document.createElement('div');
  mission_div.appendChild(new_element);
    
  //Adds new div for selectable content.
  new_div = document.createElement("div");
  new_div.setAttribute("id", "mission_selection");
  mission_div.appendChild(new_div);
  new_div = document.createElement('div');
  text = document.createTextNode("Note: All changes reflected immeditely in database, no submission required.");
  new_div.appendChild(text);
  mission_div.appendChild(new_div);
  select_div = document.getElementById("mission_update_name");

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
      //Adds each mission to mission list with checkbox.
      for (x = 0; x < missions.length; x++){
      	new_element = document.createElement("option");
   		new_element.setAttribute("value", missions[x].id);
   		text = document.createTextNode(missions[x].name);
   		new_element.appendChild(text);
   		select_div.appendChild(new_element);
      }
      new_element = document.getElementById("mission_update_name");
      new_element.setAttribute("onchange", "update_fill();")  //Provides function call to populate mission specific data.
      update_fill();  //Calls to populate data for default mission selected.
    }
  }
}



//Actually fills in mission update area with real time updateable data.
function update_fill(){
  var id = encodeURIComponent(document.getElementById("mission_update_name").value),
      mission_div = document.getElementById("mission_selection"),
      mission_clear = document.getElementById("mission_selection"),
      new_element,
      new_div,
      text,
      temp,
      x;


  //Deletes any current data in mission section.
  while(mission_clear.childNodes.length > 0){
      temp = mission_div.children[0];
      temp.parentNode.removeChild(temp);
  }

  //Gets an array of ALL available data, and also data associated with mission already.
  request = new XMLHttpRequest();
  if (!request) {
    throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=mission_change_stage';
  url += '&id=' + id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      response = JSON.parse(this.responseText);

      //Adds year launched
      temp = document.getElementById('first_launch');
      temp.value = response[0];
      temp.setAttribute("onchange", "update_launch();");  //Adds real time update function call.
      	
      //Adds list of potential kerbals assigned:
      new_div = document.createElement("div");
      new_div.setAttribute("class", "mission_data");
      new_div.setAttribute("id", "mission_kerbal");
      new_element = document.createElement("list");
      new_element.setAttribute("id", "head");
      text = document.createTextNode('Kerbals Assigned:');
      new_element.appendChild(text);
      new_div.appendChild(new_element);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);
      	
      //Adds checkboxes for each kerbal.
      for (x = 0; x < response[1].length; x++){
        new_element = document.createElement("input");
      	new_element.setAttribute("type", "checkbox");
      	new_element.setAttribute("value", response[1][x].id);
      	new_element.setAttribute("id", "update_kerbal" + x);
      	new_element.setAttribute("onclick", "update_kerbal(" + x + ")");  //Adds real time update function call.
      	//Checks checkbox if already associated with mission.
      	if (response[2].indexOf(response[1][x].id) != -1) { new_element.setAttribute("checked", "checked"); }
      	new_div.appendChild(new_element);
      	text = document.createTextNode(response[1][x].name);
      	new_div.appendChild(text);
        new_element = document.createElement('br');
      	new_div.appendChild(new_element);
      }
      mission_div.appendChild(new_div);

      //Adds list of potential ships:
      new_div = document.createElement("div");
      new_div.setAttribute("class", "mission_data");
      new_div.setAttribute("id", "mission_ship");
      new_element = document.createElement("list");
      new_element.setAttribute("id", "head");
      new_element.setAttribute("for", "ship");
      text = document.createTextNode('Ship Assigned:');
      new_element.appendChild(text);
      new_div.appendChild(new_element);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);
      	
      //Adds radio buttons for each ship.
      for (x = 0; x < response[3].length; x++){
      	new_element = document.createElement("input");
      	new_element.setAttribute("type", "radio");
      	new_element.setAttribute("name", "ship");
      	new_element.setAttribute("value", response[3][x].id);
      	new_element.setAttribute("id", "update_ship" + x);
      	new_element.setAttribute("onclick", "update_ship(" + x + ")");  //Adds real time update function call.
      	//Selects radio button for already associated ship.
      	if (response[4] == response[3][x].id) { new_element.setAttribute("checked", "checked"); }
      	new_div.appendChild(new_element);
      	text = document.createTextNode(response[3][x].name);
      	new_div.appendChild(text);
       	new_element = document.createElement('br');
       	new_div.appendChild(new_element);
      }
      //Adds additiona radio button for None.
      new_element = document.createElement("input");
      new_element.setAttribute("type", "radio");
      new_element.setAttribute("name", "ship");
      new_element.setAttribute("value", 'N');
      new_element.setAttribute("id", "update_shipN");
      new_element.setAttribute("onclick", "update_ship('N')");
      //selects None if no ships have previouslly been associated with mission.
      if (response[4] == "" || response[4] == undefined || response[4] == null) {
      	new_element.setAttribute("checked", "checked");
      }
      new_div.appendChild(new_element);
      text = document.createTextNode('None');
      new_div.appendChild(text);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);
      mission_div.appendChild(new_div);

      //Adds list of potential planets assigned:
      new_div = document.createElement("div");
      new_div.setAttribute("class", "mission_data");
      new_div.setAttribute("id", "mission_planet");
      new_element = document.createElement("list");
      new_element.setAttribute("id", "head");
      text = document.createTextNode('Planets Targeted:');
      new_element.appendChild(text);
      new_div.appendChild(new_element);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);

      //Adds checkboxes for each planet.
      for (x = 0; x < response[5].length; x++){
      	new_element = document.createElement("input");
      	new_element.setAttribute("type", "checkbox");
      	new_element.setAttribute("value", response[5][x].id);
      	new_element.setAttribute("id", "update_planet" + x);
      	new_element.setAttribute("onclick", "update_planet(" + x + ")");  //Adds real time update function call.
      	//Checks box if already associated with mission.
      	if (response[6].indexOf(response[5][x].id) != -1) { new_element.setAttribute("checked", "checked"); }
      	new_div.appendChild(new_element);
      	text = document.createTextNode(response[5][x].name);
      	new_div.appendChild(text);
       	new_element = document.createElement('br');
      	new_div.appendChild(new_element);
      }
      mission_div.appendChild(new_div);

      //Adds list of potential moons assigned:
      new_div = document.createElement("div");
      new_div.setAttribute("class", "mission_data");
      new_div.setAttribute("id", "mission_moon");
      new_element = document.createElement("list");
      new_element.setAttribute("id", "head");
      text = document.createTextNode('Moons Targeted:');
      new_element.appendChild(text);
      new_div.appendChild(new_element);
      new_element = document.createElement('br');
      new_div.appendChild(new_element);

      //Adds checkboxes for each planet.
      for (x = 0; x < response[7].length; x++){
      	new_element = document.createElement("input");
      	new_element.setAttribute("type", "checkbox");
      	new_element.setAttribute("value", response[7][x].id);
      	new_element.setAttribute("id", "update_moon" + x);
      	new_element.setAttribute("onclick", "update_moon(" + x + ")");  //Adds real time update function call.
      	//Checks box if already associated with mission.
      	if (response[8].indexOf(response[7][x].id) != -1) { new_element.setAttribute("checked", "checked"); }
      	new_div.appendChild(new_element);
      	text = document.createTextNode(response[7][x].name);
      	new_div.appendChild(text);
       	new_element = document.createElement('br');
      	new_div.appendChild(new_element);
      }
      mission_div.appendChild(new_div);
    }
  }
}



//Makes real time upate of launch year if changed in update area.
function update_launch(){
  var launch = encodeURIComponent(document.getElementById("first_launch").value),
	  mission_id = encodeURIComponent(document.getElementById("mission_update_name").value);

  //Sends request to PHP to update launch year.
  request = new XMLHttpRequest();
  if (!request) {
   	throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=mission_update_launch';
  url += '&id=' + mission_id;
  url += '&launch=' + launch;
  request.open('GET', url, true);
  request.send();
}



//Provides real time update of Kerbals assigned a mission.
function update_kerbal(item){
  var kerbal_id = encodeURIComponent(document.getElementById("update_kerbal" + item).value),
	  mission_id = encodeURIComponent(document.getElementById("mission_update_name").value),
	  type = 0;

  //Determines if Kerbal is being added or deleted.. . .
  if (document.getElementById("update_kerbal" + item).checked){ type = 1; }
  //Sends Add/Delete request to PHP.
  request = new XMLHttpRequest();
  if (!request) {
   	throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=mission_update_kerbal';
  url += '&type=' + type;
  url += '&id=' + mission_id;
  url += '&kerbal=' + kerbal_id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
   	if (this.readyState === 4) {
  	  clear_detail();  //Cleans up detail area to reflect change.
    }
  }
}



//Provides real time update of Ships assigned a mission.
function update_ship(item){
  var ship_id = encodeURIComponent(document.getElementById("update_ship" + item).value),
      mission_id = encodeURIComponent(document.getElementById("mission_update_name").value),
      type = 0;

  //Updates Mission.ship_id in database.
  request = new XMLHttpRequest();
  if (!request) {
   	throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=mission_update_ship';
  url += '&id=' + mission_id;
  url += '&ship=' + ship_id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
   	if (this.readyState === 4) {
      clear_detail();
    }
  }
}



//Provides real time update of planets assigned to mission.
function update_planet(item){
  var planet_id = encodeURIComponent(document.getElementById("update_planet" + item).value),
      mission_id = encodeURIComponent(document.getElementById("mission_update_name").value),
      type = 0;

  //Determines if planet is being added or deleted. . .
  if (document.getElementById("update_planet" + item).checked){ type = 1; }
  //Adds/Deletes data on Planet_Mission Table.
  request = new XMLHttpRequest();
  if (!request) {
   	throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=mission_update_planet';
  url += '&type=' + type;
  url += '&id=' + mission_id;
  url += '&planet=' + planet_id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
   	if (this.readyState === 4) {
  	  clear_detail();
    }
  }
}



//Provides real time update of moons associated with mission.
function update_moon(item){
  var moon_id = document.getElementById("update_moon" + item).value,
      mission_id = document.getElementById("mission_update_name").value,
      type = 0;

  //Determines if moon is being added or removed. . .
  if (document.getElementById("update_moon" + item).checked){ type = 1; }
  //Adds/Deletes data on Moon_Mission Table.
  request = new XMLHttpRequest();
  if (!request) {
   	throw 'HttpRequest object not created.';
  }
  url = 'http://web.engr.oregonstate.edu/~olsoeric/CS340/mission_data.php?req=mission_update_moon';
  url += '&type=' + type;
  url += '&id=' + mission_id;
  url += '&moon=' + moon_id;
  request.open('GET', url, true);
  request.send();
  request.onreadystatechange = function () {
   	if (this.readyState === 4) {
  	  clear_detail();
    }
  }
}