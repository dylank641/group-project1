$(document).ready(function () {
  let searchInput = $('#search-input').val();
  $('searchBtn').click(function () {
    event.preventDefault();
    console.log(searchInput);
  });

  // let getCityWeather = function (lat, lon) {
  //   // format the api url
  //   let apiUrl =
  //     'pro.openweathermap.org/data/2.5/forecast/hourly?lat=' +
  //     lat +
  //     '&lon=' +
  //     lon +
  //     '&appid=5487746d0675bbfe431f4c709399c088';

  //   // make request to the url
  //   fetch(apiUrl).then(function (response) {
  //     response.json().then(function (data) {
  //       // console.log(data);
  //     });
  //   });
  // };

  // api call FORMAT pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

  // api call EXAMPLE pro.openweathermap.org/data/2.5/forecast/hourly?lat=35&lon=139&appid=5487746d0675bbfe431f4c709399c088
});
