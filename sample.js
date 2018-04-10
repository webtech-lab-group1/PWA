var requestUrl = 'Content/Restaurant.json';
var request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();
var resto;

request.onload = function() {
	resto = request.response;
}

function createDiv(name, location, otherthings) {
  var div = document.createElement('div');
  div.innerHTML = `<p>some text here ${name}</p>`;

  document.body.appendChild(div);
}

function showMenu(){
  var menuItems = document.getElementById('menu');
  resto[0].menu.forEach(function(item) {
    menuItems.innerHTML += menuItem(item.name, item.description, item.price);
  });
}

function menuItem(name, description, price) {
  var html = `<div class="menuItem"><h3>${name}</h3><p>${description}</p><h4>price: ${price}</h4></div>`
  return html;
}
