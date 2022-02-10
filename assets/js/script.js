// ******************************
// Global Variables
// ******************************

// array to store app data
var priorSearches = [];

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
var priorSearchesEl = document.querySelector("#search-history");
var searchStringEl = document.querySelector("#city-input");
var toDoTitleEl = document.getElementById("to-do-title");
var weatherTitleEl = document.getElementById("weather-title");
var restaurantsTitleEl = document.getElementById("restaurants-title");
var hotelsTitleEl = document.getElementById("hotels-title");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// weather elements
var cityNameEl = $(".cityName");
var weatherIcon = $("#weatherIcon");
var cityTempEl = $("#cityTemp");
var cityWindEl = $("#cityWind");
var cityHumidityEl = $("#cityHumidity");
var cityUVIndexEl = $("#cityUVIndex");
var currentDate = moment().format("l");



// refresh app
var refreshApp = function () {
  thingsToDoResultsEl.textContent = "";
  restaurantResultsEl.textContent = "";
  hotelResultsEl.textContent = "";
  cityPhotosEl.textContent = "";
  searchPageEl.style.display = "none";
  resultsPageEl.style.display = "flex";
  galleryEl.style.display = "inline";
}

var showResultPg = function () {
  searchPageEl.style.display = "none";
  resultsPageEl.style.display = "flex";
  galleryEl.style.display = "inline";
}

var showSearchPg = function () {
  searchPageEl.style.display = "flex";
  resultsPageEl.style.display = "none";
  galleryEl.style.display = "none";
}


// handler for the Restaurants google search
function handleRestaurants(response) {
  var restaurantsEl = document.getElementById("restaurant-results");
  for (var i = 0; i < 6; i++) {
    var item = response.items[i];
    var index = i + 1;
    var header = "<a href='" + item.image.contextLink + "' target='_blank'>Check it out</a>";
    var imageURL = item.link;
    var content = "<p>" + item.htmlTitle + "</p>";
    restaurantsEl.innerHTML += "<div class='card'><a href = '" + item.image.contextLink + "' target='_blank'><div class='card-section'>" + content + "</div></a><img class='bozo' src='" + imageURL + "'>"
  }
}

// handler for the Hotels google search
function handleHotels(response) {
  var hotelsEl = document.getElementById("hotel-results");
  for (var i = 0; i < 6; i++) {
    var item = response.items[i];
    var index = i + 1;
    var header = "<a href='" + item.image.contextLink + "' target='_blank'>Check it out</a>";
    var imageURL = item.link;
    var content = "<p>" + item.htmlTitle + "</p>";
    hotelsEl.innerHTML += "<div class='card'><a href = '" + item.image.contextLink + "' target='_blank'><div class='card-section'>" + content + "</div></a><img class='bozo' src='" + imageURL + "'>"
  }
}

// handler for the Things to Do google search
function handleThingsToDo(response) {
  var thingsToDoEl = document.getElementById("things-to-do-results");

  for (var i = 0; i < 6; i++) {
    var item = response.items[i];
    var index = i + 1;
    var header = "<a href='" + item.image.contextLink + "' target='_blank'>Check it out</a>";
    var imageURL = item.link;

    var content = "<p>" + item.htmlTitle + "</p>";
    thingsToDoEl.innerHTML += "<div class='card'><a href = '" + item.image.contextLink + "' target='_blank'><div class='card-section'>" + content + "</div></a><img class='bozo' src='" + imageURL + "'>"

  }
}

var changeTitle = function () {
  toDoTitleEl.textContent = "Things to Do in " + searchStringEl.value;
  weatherTitleEl.textContent = "Weather in " + searchStringEl.value;
  restaurantsTitleEl.textContent = "Great Restaurants in " + searchStringEl.value;
  hotelsTitleEl.textContent = "Noteworthy Hotels in " + searchStringEl.value;


}

// form submit handler
function handleCitySearch(event) {

  // prevent default form behavior
  event.preventDefault();
  // set the view state
  var searchString = searchStringEl.value.trim();

  if (!searchString) {
    // TO DO: replace with with call to modal
    alert("Please enter a city!");
    return;
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
  city = city.toLowerCase();

  // get coordinates and location name
  var lattitude = 0;
  var longitude = 0;
  var location = "";
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=0f495242c82beba70a7e55f7073bedf1";
  fetch(apiURL)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        loadSearches();
        if (!priorSearches.includes(city)) {
          priorSearches.unshift(city);
        }
        changeTitle();
        saveSearches();
        refreshApp();
        showResultPg();
        response.json().then(function (data) {
          if (data.length !== 0) {
            lattitude = data.coord.lat;
            longitude = data.coord.lat;
            $('#cityHigh').html('Low: ' + Math.round(data.main.temp_min));
            $('#cityLow').html('High: ' + Math.round(data.main.temp_max));
            $('#cityDescription').html(data.weather[0].description);
            cityNameEl.text(city + ", " + state + " (" + currentDate + ")");
            getWeatherData(lattitude, longitude);
            getPhotos(city);
            gSearch(city, state);
          }
        });
      } else {
        modal.style.display = 'block';
        searchStringEl.value = "";
        span.onclick = function() {
          modal.style.display = "none";
        }
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
      }
    })

    .catch(function (error) {
      // TO DO: replace with call to modal
      console.log("error: " + error);
    });


};

// ********************
// Things to Do
// ********************
var printPhotos = function (data) {
  for (var i = 0; i < data.length && i < 15; i++) {
    var photo = document.createElement('img');
    photo.setAttribute('src', data[i].largeImageURL);
    photo.setAttribute('width', '600px');
    photo.setAttribute("class", "test")
    cityPhotosEl.appendChild(photo);
  }

};

var getPhotos = function (city) {
  city = city.replaceAll(' ', '+');
  placeUrl =
    'https://pixabay.com/api/?key=25546994-2482c2e9e7a32b9d57d2159ef&q=' +
    city +
    '&image_type=photo&pretty=true';
  fetch(placeUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        printPhotos(data.hits);
      });

    }
  });
};


var gSearch = function (city, state) {
  // prepare src attribute
  var googleSearch4ThingsToDo = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDFM9Zvcj3uG-iHT16CNPqEEs7z3LhVUYA&cx=84bf6c59ec9dc5496&searchType=image&q=things to do " + city + " " + state + "&callback=handleThingsToDo";

  // create the script element
  var googleScriptEl4ThingsToDo = document.createElement("script");

  // set the src and id attributes
  googleScriptEl4ThingsToDo.src = googleSearch4ThingsToDo;
  googleScriptEl4ThingsToDo.id = "googleSearch4ThingsToDo";

  // append to body
  document.body.appendChild(googleScriptEl4ThingsToDo);

  // prepare src attribute
  var googleSearch4Restaurants = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDFM9Zvcj3uG-iHT16CNPqEEs7z3LhVUYA&cx=84bf6c59ec9dc5496&searchType=image&q=restaurants " + city + " " + state + "&callback=handleRestaurants";

  // create the script element
  var googleScriptEl4Restaurants = document.createElement("script");

  // set the src and id attributes
  googleScriptEl4Restaurants.src = googleSearch4Restaurants;
  googleScriptEl4Restaurants.id = "googleSearch4Restaurants";

  // append to body
  document.body.appendChild(googleScriptEl4Restaurants);

  // ********************
  // Hotels
  // ********************

  // prepare src attribute
  var googleSearch4Hotels = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDFM9Zvcj3uG-iHT16CNPqEEs7z3LhVUYA&cx=84bf6c59ec9dc5496&searchType=image&q=hotels " + city + " " + state + "&callback=handleHotels";

  // create the script element
  var googleScriptEl4Hotels = document.createElement("script");

  // set the src and id attributes
  googleScriptEl4Hotels.src = googleSearch4Hotels;
  googleScriptEl4Hotels.id = "googleSearch4Hotels";

  // append to body
  document.body.appendChild(googleScriptEl4Hotels);

}





var getWeatherData = function (lattitude, longitude) {
  var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=alerts&units=imperial&lang=en&appid=41acdc298e9f5bb9684ae3f719dae78a";
  fetch(apiURL)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
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
    .catch(function (error) {
      console.log("Unable to connect to Open Weather One Call API");
    })

}
var loadSearches = function () {
  priorSearches = JSON.parse(localStorage.getItem("priorSearches") || "[]");
  if (priorSearches == null) { priorSearches = [] };
  // Limits search history to 8 hits
  if (priorSearches.length > 5) {
    priorSearches.pop();
  }
};

var saveSearches = function () {
  localStorage.setItem("priorSearches", JSON.stringify(priorSearches));
}

var displayPriorSearches = function () {
  loadSearches();
  priorSearchesEl.textContent = "";
  for (var i = 0; i < priorSearches.length; i++) {
    var searchBtn = document.createElement("button");
    searchBtn.className += "prior-search-btn upper-case";
    searchBtn.setAttribute("type", "button");
    searchBtn.textContent = priorSearches[i];
    priorSearchesEl.appendChild(searchBtn);
  };
}

function handleNewSearch(event) {
  // set the view state
  searchStringEl.value = "";
  location.reload();
};

var searchBtnHandler = function (event) {
  searchStringEl.value = event.target.textContent;
  handleCitySearch(event);
}

// ******************************
// Action Listeners
// ******************************
citySearchEl.addEventListener("submit", handleCitySearch);
newSearchBtn.addEventListener("click", handleNewSearch);
priorSearchesEl.addEventListener("click", searchBtnHandler);

showSearchPg();
displayPriorSearches();

// ******************************
// Function Calls
// ******************************
showSearchPg();
displayPriorSearches();
