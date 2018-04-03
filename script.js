var area = document.getElementById('map');
var context = area.getContext('2d');

make_base();

function make_base() {
	var base_image = new Image();
	base_image.src = 'map/zoom15.bmp';
	base_image.onload = function() {
		var imgwid = base_image.width;
		var imghgt = base_image.height;
		context.canvas.width = imgwid;
		context.canvas.height = imghgt;
		context.drawImage(base_image, 0, 0, imgwid, imghgt);
	}
}

function dropdownMenu() {
  var dropdown = document.getElementById("dropdownClick");
  if(dropdown.className === "topnav") {
    dropdown.className += " responsive";
  } else {
    dropdown.className = "topnav";
  }
}
