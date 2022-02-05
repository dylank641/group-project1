
var searchFormEl = $("#city-search");

$(document).ready(function () {
  // letting search city button record text input
  //$('#searchBtn').click(function () {
  //  const searchInput = $('#search-input').val();
  //  console.log(searchInput);
  //});
});

function handleSearch1(response) {
  console.log("handleSearch1");
  console.log(response);
  var resultsOfSearch1El = document.getElementById("resultsOfSearch1");
  resultsOfSearch1El.innerHTML = "<h2>Top 5 Things to Do:</h2>";
  for (var i = 0; i < 5; i++) {
    var item = response.items[i];
    var index = i + 1;
    resultsOfSearch1El.innerHTML += "<p><a href='" + item.image.contextLink + "' target='_blank'>" + index + ". " + item.htmlTitle + "</a></p><p><img src='" + item.link + "'><br/><br/></p> ";
  }
}

function handleSearch2(response) {
  console.log("handleSearch2");
  var resultsOfSearch2El = document.getElementById("resultsOfSearch2");
  resultsOfSearch2El.innerHTML = "<h2>Top 5 Places to Eat:</h2>";
  for (var i = 0; i < 5; i++) {
    var item = response.items[i];
    var index = i + 1;
    resultsOfSearch2El.innerHTML += "<p><a href='" + item.image.contextLink + "' target='_blank'>" + index + ". " + item.htmlTitle + "</a></p><p><img src='" + item.link + "'><br/><br/></p> ";
  }
}

function handleSearch3(response) {
  console.log("handleSearch3");
  var resultsOfSearch3El = document.getElementById("resultsOfSearch3");
  resultsOfSearch3El.innerHTML = "<h2>Top 5 Places to Sleep:</h2>";
  for (var i = 0; i < 5; i++) {
    var item = response.items[i];
    var index = i + 1;
    resultsOfSearch3El.innerHTML += "<p><a href='" + item.image.contextLink + "' target='_blank'>" + index + ". " + item.htmlTitle + "</a></p><p><img src='" + item.link + "'><br/><br/></p> ";
  }
}

function removeOldScripts() {
  $("script").each(function() {
    if (this.id.includes("googleScript")) {
      this.parentNode.removeChild(this);
    }
  })
}

function handleFormSubmit(event) {

  // remove old scripts
  removeOldScripts();

  // prevent default form submit behavior
  event.preventDefault();

  // get search input values
  var searchString = $('input[name="city-input"]').val();
  var searchTokens = [];
  if (searchString.includes(",")) {
      searchTokens = searchString.trim().split(",");
  } else {
      searchTokens[0] = searchString.trim();
      searchTokens[1] = "";
  }
  var city = searchTokens[0].trim();
  var state = searchTokens[1].trim();
  var country = "";

  // prepare the src attribute for different google searches
  var googleSearch1 = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDFM9Zvcj3uG-iHT16CNPqEEs7z3LhVUYA&cx=84bf6c59ec9dc5496&searchType=image&q=things to do " + city + " " + state + "&callback=handleSearch1";
  var googleSearch2 = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDFM9Zvcj3uG-iHT16CNPqEEs7z3LhVUYA&cx=84bf6c59ec9dc5496&searchType=image&q=restaurants " + city + " " + state + "&callback=handleSearch2";
  var googleSearch3 = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDFM9Zvcj3uG-iHT16CNPqEEs7z3LhVUYA&cx=84bf6c59ec9dc5496&searchType=image&q=hotels " + city + " " + state + "&callback=handleSearch3";

  // create the script elements
  var googleScriptEl1 = document.createElement("script");
  var googleScriptEl2 = document.createElement("script");
  var googleScriptEl3 = document.createElement("script");

  // set the src and ID attributes
  googleScriptEl1.src = googleSearch1;
  googleScriptEl1.id = "googleScript1";
  googleScriptEl2.src = googleSearch2;
  googleScriptEl2.id = "googleScript2";
  googleScriptEl3.src = googleSearch3;
  googleScriptEl3.id = "googleScript3";

  

  // append to body
  document.body.appendChild(googleScriptEl1);
  document.body.appendChild(googleScriptEl2);
  document.body.appendChild(googleScriptEl3);


}


searchFormEl.on("submit", handleFormSubmit);

