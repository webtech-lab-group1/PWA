var map;
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
	  center: {lat: 16.402357, lng: 120.595556},
	  zoom: 15
	});
	infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
	    'Error: The Geolocation service failed.' :
	    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
function dropdownMenu() {
  var dropdown = document.getElementById("dropdownClick");
  if(dropdown.className === "topnav") {
    dropdown.className += " responsive";
  } else {
    dropdown.className = "topnav";
  }
}

var restData = `[{"firstName":"John", "lastName":"Doe"}, 
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
	{"firstName":"Jacqyy", "lastName":"Laxamana"}
	{"firstName":"Cj", "lastName":"Ayon-ayon"}
	{"firstName":"Justine", "lastName":"Garcia"}]`;
	
function searchNow() {
	var file = JSON.parse(resData);
	var elem = document.getElementById("inputForm");
	alert(elem.elements[0].value);
	alert(file[0].firstName);
}
	
	
	
	
	
	
	
