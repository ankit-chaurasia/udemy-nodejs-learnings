const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(
      (results.lattitude = 37.8267),
      (results.longitude = -122.4233),
      (errorMessage, weatherResult) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(
            `It is currently ${weatherResult.temperature}. It feels like ${
              weatherResult.apparentTemperature
            }`
          );
        }
      }
    );
  }
});
