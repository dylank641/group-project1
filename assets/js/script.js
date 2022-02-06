var cityPhotosEl = document.querySelector('#photos-page');
var firstPageEl = document.querySelector('#first-page');
var secondPageEl = document.querySelector('#second-page');
var selectedCityEl = document.querySelector('#selected-city');


var printPhotos = function (data) {
  for (var i = 0; i < data.length && i < 15; i++) {
    var photo = document.createElement('img');
    console.log(data[i].largeImageURL);
    photo.setAttribute('src', data[i].largeImageURL);
    photo.setAttribute('width', '600px');
    photo.setAttribute("class", "test")
    cityPhotosEl.appendChild(photo);
  }


  document.getElementById('newSearch').addEventListener("click", function(){
    photo.remove();

  })
};

var getPhotos = function (city, state) {
  console.log(city, state);
  city = city.replaceAll(' ', '+');
  state = state.replaceAll(' ', '+');
  placeUrl =
    'https://pixabay.com/api/?key=25546994-2482c2e9e7a32b9d57d2159ef&q=' +
    city +
    '+' +
    state +
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

$('#searchBtn').on('click', function (event) {
  var city = $('#city-input').val().trim();
  var state = $('#state-input').val();
  firstPageEl.className += ' hide';
  secondPageEl.classList.remove('hide');
  selectedCityEl.textContent = city.toUpperCase() + ', ' + state.toUpperCase();

  getPhotos(city, state);
  event.preventDefault();
});

$('#newSearch').on('click', function (event) {
  secondPageEl.className += ' hide';
  firstPageEl.classList.remove('hide');
  
});

//removes previous search photos
document.getElementById('newSearch').addEventListener("click", function(){
  document.getElementById("photos-page").innerHTML = "";

})
