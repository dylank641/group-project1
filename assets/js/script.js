// ******************************
// Global Variables
// ******************************

// array to store app data
var appData = [];

// page sections
var newSearchBtn = document.querySelector("#new-search");
var searchPageEl = document.querySelector("#search-page");
var citySearchEl = document.querySelector("#city-search");
var resultsPageEl = document.querySelector("#results-page");
var weatherResultsEl = document.querySelector("#weather-results");
var thingsToDoResultsEl = document.querySelector("#things-to-do-results");
var restaurantResultsEl = document.querySelector("#restaurant-results");
var hotelResultsEl = document.querySelector("#hotel-results");


// ******************************
// Functions
// ******************************

// load app data
var loadAppData = function() {
  appData = localStorage.getItem("CityScoutAppData");
  if(!appData) {
    appData = [];
    var appState = {
      currentPage: "search-page"
    }
    appData.push(appState);
    return false;
  }
  appData = JSON.parse(appData);
}

// store app data
var saveAppData = function() {
  localStorage.setItem("CityScoutAppData", JSON.stringify(appData));
}

// refresh app view
var refreshApp = function() {
  switch (appData[0].currentPage) {
    case "search-page":
      // show the search page
      searchPageEl.style.display = "flex";
      resultsPageEl.style.display = "none";
      break;
    case "results-page":
      // show the results page
      searchPageEl.style.display = "none";
      resultsPageEl.style.display = "flex";
      break;
  }
}

// form submit handler
function handleCitySearch(event) {

  // prevent default form behavior
  event.preventDefault();

  // set the view state
  appData[0].currentPage = "results-page"
  saveAppData();
  refreshApp();

}

function handleNewSearch() {
  // set the view state
  appData[0].currentPage = "search-page"
  saveAppData();
  refreshApp();
}




// ******************************
// Action Listeners
// ******************************
citySearchEl.addEventListener("submit", handleCitySearch);
newSearchBtn.addEventListener("click", handleNewSearch);



// ******************************
// Function Calls
// ******************************
loadAppData();
refreshApp();