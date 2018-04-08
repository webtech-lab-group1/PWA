var area = document.getElementById('map');
var elemLeft = area.offsetLeft
var elemTop = area.offsetTop
var context = area.getContext('2d');
var restaurants = [];
var resto;
var initWidth;

//loading of JSON file
var requestUrl = 'Content/Restaurant.json';
var request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();

window.onload = function() {
	resto = request.response;
	initWidth = document.documentElement.clientWidth;
	// Add element.
	resto.forEach(function(restaurant) {
		restaurants.push({
			colour: '#05EFFF',
			top: parseInt(restaurant.top, 10),
			left: parseInt(restaurant.left, 10),
			radius: 10,
			name: restaurant.name
		});
	});
	// Render elements.
	restaurants.forEach(function(restaurant) {
		context.fillStyle = restaurant.colour;
		context.beginPath();
		context.arc(restaurant.left, restaurant.top, restaurant.radius, 0, 2 * Math.PI);
		context.stroke();
	});
	make_all_location();
};
//loading of map
function make_base() {
	var base_image = new Image();
	base_image.src = 'map/zoom15.bmp';
	base_image.onload = function() {
		var imgwid = base_image.width;
		var imghgt = base_image.height;
		context.canvas.width = imgwid;
		context.canvas.height = imghgt;
	}
};

function make_all_location() {
	restaurants.forEach(function(restaurant) {
		context.fillStyle = restaurant.colour;
		context.beginPath();
		context.arc(restaurant.left, restaurant.top, restaurant.radius, 0, 2 * Math.PI);
		context.stroke();
	});
}
make_base();
//click event
area.addEventListener('click', function(event) {
	var x = event.pageX - elemLeft;
	var y = event.pageY - elemTop;
	console.log(x,y);
	if(initWidth > 680) {
		if(document.documentElement.clientWidth < 680) {
			x = x + 250;
		}
	} else {
		if(document.documentElement.clientWidth > 680) {
			x = x - 250;
		}
	}
	// Collision detection between clicked offset and element.
	restaurants.forEach(function(restaurant) {
		if (y < restaurant.top + restaurant.radius && y > restaurant.top - restaurant.radius
			&& x < restaurant.left + restaurant.radius && x > restaurant.left - restaurant.radius) {
			alert(restaurant.name);
			console.log((restaurant.top + restaurant.radius),(restaurant.top - restaurant.radius));
		}
	});
}, false);
//responsive dropdown menu
function dropdownMenu() {
	var dropdown = document.getElementById("dropdownClick");
	if(dropdown.className === "topnav") {
		dropdown.className += " responsive";
  } else {
		dropdown.className = "topnav";
  }
};
