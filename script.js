var area = document.getElementById('map');
var elemLeft = area.offsetLeft;
var elemTop = area.offsetTop;
var context = area.getContext('2d');
var restaurants = [];
var resto;
var initWidth;
var imgwid;
var imghgt;
var list;
//loading of JSON file
var requestUrl = 'Content/Restaurant.json';
var request = new XMLHttpRequest();

window.onload = function() {
	initWidth = document.documentElement.clientWidth;
	request.open('GET', requestUrl);
	request.responseType = 'json';
	request.send();
	make_base();
};

if('serviceWorker' in navigator){
    try {
        navigator.serviceWorker.register('sw.js');
        console.log('SW resgitered');
    } catch (error) {
        console.log('SW registration failed');
    }
}

//loading of map
function make_base() {
	var base_image = new Image();
	base_image.src = 'map/zoom15.bmp';
	base_image.onload = function() {
		imgwid = base_image.width;
		imghgt = base_image.height;
		context.canvas.width = imgwid;
		context.canvas.height = imghgt;
	}
	request.onload = function() {
		resto = request.response;
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
		make_location(restaurants);
		addClickEvent();
	}
};
//create the locations for each collections
function make_location(collections) {
	collections.forEach(function(restaurant) {
		context.fillStyle = restaurant.colour;
		context.beginPath();
		context.arc(restaurant.left, restaurant.top, restaurant.radius, 0, 2 * Math.PI);
		context.stroke();
		context.fill();
	});
}
//click event for all
var clickRestaurant = function(event) {
	var x = event.pageX - elemLeft;
	var y = event.pageY - elemTop;
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
			var restoName = restaurant.name;
			buildContent(restoName);
		}
	});
}
var addClickEvent = function() {
	area.addEventListener('click', clickRestaurant, false);
}
var removeClickEvent = function() {
	area.removeEventListener('click', clickRestaurant, false);
}
//click event for some
function clickSomeRestaurant(collections) {
	return function(event) {
		var x = event.pageX - elemLeft;
		var y = event.pageY - elemTop;
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
		collections.forEach(function(restaurant) {
			if (y < restaurant.top + restaurant.radius && y > restaurant.top - restaurant.radius
				&& x < restaurant.left + restaurant.radius && x > restaurant.left - restaurant.radius) {
				var restoName = restaurant.name;
				buildContent(restoName);
			}
		});
	}
}
function buildContent(name) {
	var container = document.getElementById('rest-container');
	container.className = "show";
	resto.forEach(function(restaurant) {
		if(name == restaurant.name) {
			container.innerHTML = createResto(restaurant.name, restaurant.category, restaurant.location);
			var menuButton = document.getElementById('buttonMenu');
			menuButton.onclick = function() {
				var menuItems = document.getElementById('menu');
				menuItems.innerHTML = "";
				restaurant.menu.forEach(function(item) {
					menuItems.innerHTML += menuItem(item.name, item.description, item.price);
				});
			}
			var exit = document.getElementById('exitButton');
			exit.onclick = function() {
				container.className = "hidden";
			};
		}
	})
}
var addSomeClickEvent = function(collections) {
	area.addEventListener('click', clickSomeRestaurant(collections), false);
}
var removeSomeClickEvent = function(collections) {
	area.removeEventListener('click', clickSomeRestaurant(collections), false);
}
//show per category
var categories = document.getElementsByClassName('categ');
for(var i = 0; i < categories.length; i++) {
	categories[i].addEventListener('click', function() {
		removeClickEvent();
		removeSomeClickEvent(list);
		var tempid = this.id;
		context.clearRect(0, 0, imgwid, imghgt);
		list = [];
		resto.forEach(function(restaurant) {
			if(tempid == restaurant.category) {
				list.push({
					colour: '#05EFFF',
					top: parseInt(restaurant.top, 10),
					left: parseInt(restaurant.left, 10),
					radius: 10,
					name: restaurant.name
				});
			}
		});
		make_location(list);
		addSomeClickEvent(list);
	});
}
//create html elements
function createResto(name, category, location) {
	var html = `<div class="somebox">
	<h1>${name}</h1>
	<h3>Category: ${category}</h3>
	<p>Location: </br> ${location}</p>
	<div class="divBot">
		<button class="menuButton" id="buttonMenu">Menu</button>
	</div>
	<div id="menu">
	</div>
	<div class="divBot">
		<button class="menuButton" id="exitButton">Exit</button>
	</div>
	</div>`
	return html;
}
//create menu
function menuItem(name, description, price) {
  var html = `<div class="menuItem">
	<h3>${name}</h3>
	<p>${description}</p>
	<h4>price: ${price}</h4>
	</div>`
  return html;
}
//search function
var icon = document.getElementById('search');
icon.onclick = function() {
	var form = document.getElementById('inputForm');
	resto.forEach(function(restaurant) {
		if(form.elements[0].value.toLowerCase() === restaurant.name.toLowerCase()) {
			removeClickEvent();
			removeSomeClickEvent(list);
			context.clearRect(0, 0, imgwid, imghgt);
			list = [];
			list.push({
				colour: '#05EFFF',
				top: parseInt(restaurant.top, 10),
				left: parseInt(restaurant.left, 10),
				radius: 10,
				name: restaurant.name
			});
			make_location(list);
			addSomeClickEvent(list);
		}
	});
}

//responsive dropdown menu
function dropdownMenu() {
	var dropdown = document.getElementById("dropdownClick");
	if(dropdown.className === "topnav") {
		dropdown.className += " responsive";
  } else {
		dropdown.className = "topnav";
  }
};
