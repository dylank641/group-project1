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
      const description = data.weather[0];
      const main = data.main;

      $('#cityTemp').html('Now: ' + Math.round(main.temp));
      $('#cityHigh').html('Low: ' + Math.round(main.temp_min));
      $('#cityLow').html('High: ' + Math.round(main.temp_max));
      $('#cityDescription').html(description.description);
      // $('#cityIcon').html(description.icon);
    };

    const getCityWeather = function () {
      // format the api url
      const apiUrl =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchInput +
        '&units=imperial&appid=5487746d0675bbfe431f4c709399c088';

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
