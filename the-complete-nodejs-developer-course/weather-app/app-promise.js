const yargs = require('yargs');
const axios = require('axios');

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

const encoddedAddress = encodeURIComponent(argv.address);
axios
  .get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encoddedAddress}&key=AIzaSyBgBj5ffkunZ0aP1qJ6BxoaLsN-QbFbMNg`
  )
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find given address.');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    console.log(response.data.results[0].formatted_address);
    return axios.get(
      `https://api.darksky.net/forecast/0e6823a03d923529bf3a0a1dd10a71c2/${lat},${lng}`
    );
  })
  .then((response) => {
    let temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It is currently ${temperature}. It feels like ${apparentTemperature}`
    );
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to google servers!!');
    } else {
      console.log(error.message);
    }
  });
