const request = require('request');

const getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/0e6823a03d923529bf3a0a1dd10a71c2/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
        console.log(`Current temperature: ${body.currently.temperature}`);
      } else {
        callback('Unable to fetch weather');
      }
    }
  );
};

module.exports.getWeather = getWeather;
