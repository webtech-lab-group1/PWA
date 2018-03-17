var map;
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 8
	});
}

function dropdownMenu() {
  var dropdown = document.getElementById("dropdownClick");
  if(dropdown.className === "topnav") {
    dropdown.className += " responsive";
  } else {
    dropdown.className = "topnav";
  }
}
