function dropdownMenu() {
  var dropdown = document.getElementById("dropdownClick");
  if(dropdown.className === "topnav") {
    dropdown.className += " responsive";
  } else {
    dropdown.className = "topnav";
  }
}
