$(document).ready(function () {
  $('#searchBtn').click(function () {
    const searchInput = $('#search-input').val();
    console.log(searchInput);

    let getCityWeather = function () {
      // format the api url
      let apiUrl =
        'api.openweathermap.org/data/2.5/forecast?q=' +
        searchInput +
        '&appid=5487746d0675bbfe431f4c709399c088';

      // make request to the url
      fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
          console.log(data);
        });
      });
    };
    getCityWeather();
  });
  // api call FORMAT pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

  // api call EXAMPLE pro.openweathermap.org/data/2.5/forecast/hourly?lat=35&lon=139&appid=5487746d0675bbfe431f4c709399c088
});
