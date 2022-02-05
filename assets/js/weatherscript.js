$(document).ready(function () {
  // enter click to submit
  $('#city-input').keydown(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $('.search-btn').click();
    }
  });

  $('.search-btn').click(function () {
    const searchInput = $('#city-input').val();

    const displayWeather = function (data) {
      const weather = data.weather;
      const main = data.main;

      //  main has been renamed to mainArr
      // const { coord, weather, main: mainArr } = data;

      $('.weather-current').html('Now: ' + main.temp);
      $('.weather-min').html('Low: ' + main.temp_min);
      $('.weather-max').html('High: ' + main.temp_max);

      // var convertMain = (main.temp - 273.15) * (9/5) + 32;
      // console.log(convertMain);
    };

    const getCityWeather = function () {
      // format the api url
      const apiUrl =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchInput +
        '&appid=5487746d0675bbfe431f4c709399c088';

      // make request to the url
      fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
          console.log(data);
          displayWeather(data);
        });
      });
    };

    getCityWeather();
  });
});
