$(document).ready(function () {
  $('#searchBtn').click(function () {
    const searchInput = $('#search-input').val();
    console.log(searchInput);

    const getCityWeather = function () {
      // format the api url
      const apiUrl =
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
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
});
