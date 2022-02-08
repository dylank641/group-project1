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
var cityPhotosEl = document.querySelector('#photos-page');
var galleryEl = document.querySelector("#gallery");


// weather elements
var cityNameEl = $(".cityName");
var weatherIcon = $("#weatherIcon");
var cityTempEl = $("#cityTemp");
var cityWindEl = $("#cityWind");
var cityHumidityEl = $("#cityHumidity");
var cityUVIndexEl = $("#cityUVIndex");
var currentDate = moment().format("l");


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

// refresh app
var refreshApp = function() {
  switch (appData[0].currentPage) {
    case "search-page":
      // show the search page
      searchPageEl.style.display = "flex";
      resultsPageEl.style.display = "none";
      galleryEl.style.display = "none";
      break;
    case "results-page":
      // show the results page
      searchPageEl.style.display = "none";
      resultsPageEl.style.display = "flex";
      galleryEl.style.display = "inline";
      break;
  }
}

// remove old script elements: this is for the google searches
function removeOldScripts() {
  $("script").each(function() {
    if (this.id.includes("googleScript")) {
      this.parentNode.removeChild(this);
    }
  })
}

// handler for the Things to Do google search
function handleThingsToDo(response) {
  console.log(response);
  var thingsToDoEl = document.getElementById("things-to-do-results");
  for (var i = 0; i < 5; i++) {
    var item = response.items[i];
    var index = i + 1;
    var header = "<a href='" + item.image.contextLink + "' target='_blank'>Check it out</a>";
    var imageURL = item.link;
    
    var content = "<p>" + item.htmlTitle + "</p>";
    thingsToDoEl.innerHTML += "<div class='card'><a href = '" + item.image.contextLink + "' target='_blank'><div class='card-section'>" + content + "</div></a><img class='bozo' src='" + imageURL + "'>"

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

  // ********************
  // Weather
  // ********************
  // get search input values
  var searchString = $('input[name="city-input"]').val();
  if (!searchString.trim() ) {
    // TO DO: replace with with call to modal
      console.log("Please enter a city!");
  }
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

  // get coordinates and location name
  var lattitude = 0;
  var longitude = 0;
  var location = "";
  var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + country + "&limit=1&appid=41acdc298e9f5bb9684ae3f719dae78a";
  fetch(apiURL)
  .then(function(response) {
      // request was successful
      if (response.ok) {
          response.json().then(function(data) {
              try {
                  lattitude = data[0].lat;
                  longitude = data[0].lon;
                  location = data[0].name + ", " + data[0].state;
                  console.log("Lat: " + lattitude);
                  console.log("Lon: " + longitude);
                  console.log("Loc: " + location);
                  cityNameEl.text(location + " (" + currentDate + ")");
              } catch(error) {
                // TO DO: replace with call to modal
                console.log("Sorry, we could not find any data for that city!");
              }
              // get weather data
              var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=alerts&units=imperial&lang=en&appid=41acdc298e9f5bb9684ae3f719dae78a";
              fetch(apiURL)
              .then(function(response) {
                  // request was successful
                  if (response.ok) {
                      response.json().then(function(data) {
                          console.log(data);
                          console.log(data.current.temp);
                          var icon = data.current.weather[0].icon;
                          var iconDesc = data.current.weather[0].description;
                          var temp = "Temp: " + data.current.temp + "&deg;" + "F";
                          var wind = "Wind: " + data.current.wind_speed + " MPH";
                          var humidity = "Humidity: " + data.current.humidity + " %";
                          var uvindex = data.current.uvi;
                          weatherIcon.html("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png' width='50px' height='50px' alt='" + iconDesc + "'>");
                          cityTempEl.html(temp);
                          cityWindEl.html(wind);
                          cityHumidityEl.html(humidity);
                          if (parseFloat(uvindex) <= 2) {
                              cityUVIndexEl.html("UV Index: <span class='bg-success colorCodedUVIndex'>" + uvindex + "</span>");
                          } else if (parseFloat(uvindex) <= 8) {
                              cityUVIndexEl.html("UV Index: <span class='bg-warning colorCodedUVIndex'>" + uvindex + "</span>");
                          } else {
                              cityUVIndexEl.html("UV Index: <span class='bg-danger colorCodedUVIndex'>" + uvindex + "</span>");
                          }
                          
                      })
                  } else {
                      console.log('Error: Weather Data Not Found');
                  }
              })
              .catch(function(error) {
                  console.log("Unable to connect to Open Weather One Call API");
              })
              // end get weather data
          })
      } else {
          console.log('Error: City Not Found');
      }
  })
  .catch(function(error) {
      console.log("Unable to connect to Open Weather Geocoding API");
  });
  // end get coordinates and location name

  // ********************
  // Things to Do
  // ********************
  var printPhotos = function (data) {
    for (var i = 0; i < data.length && i < 15; i++) {
      var photo = document.createElement('img');
      console.log(data[i].largeImageURL);
      photo.setAttribute('src', data[i].largeImageURL);
      photo.setAttribute('width', '600px');
      photo.setAttribute("class", "test")
      cityPhotosEl.appendChild(photo);
    }
    document.getElementById('new-search').addEventListener("click", function(){
      photo.remove();
  
    })
  
  };
  
  var getPhotos = function (city) {
    console.log(city);
    city = city.replaceAll(' ', '+');
    //state = state.replaceAll(' ', '+');
    placeUrl =
      'https://pixabay.com/api/?key=25546994-2482c2e9e7a32b9d57d2159ef&q=' +
      city +
      '&image_type=photo&pretty=true';
    console.log(placeUrl);
    fetch(placeUrl).then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          printPhotos(data.hits);
        });
        
      }
    });
  };
  getPhotos(city);

 
  // prepare src attribute
  var googleSearch4ThingsToDo = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDFM9Zvcj3uG-iHT16CNPqEEs7z3LhVUYA&cx=84bf6c59ec9dc5496&searchType=image&q=things to do " + city + " " + state + "&callback=handleThingsToDo";

  // create the script element
  var googleScriptEl4ThingsToDo = document.createElement("script");

  // set the src and id attributes
  googleScriptEl4ThingsToDo.src = googleSearch4ThingsToDo;
  googleScriptEl4ThingsToDo.id = "googleSearch4ThingsToDo";

  // append to body
  document.body.appendChild(googleScriptEl4ThingsToDo);

}



function handleNewSearch() {
  // set the view state
  appData[0].currentPage = "search-page"
  saveAppData();
  refreshApp();
  document.getElementById("photos-page").innerHTML = "";
}

//clears things to do section when new search is clicked
document.getElementById("new-search").addEventListener("click", function(){
  document.getElementById("things-to-do-results").innerHTML = "";
})




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