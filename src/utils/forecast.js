const request = require("request");

const forecast=(longitude,latitude,callback)=>{
const url =
  "http://api.weatherstack.com//current?access_key=12445c66a078c49a03a40093efd2f954&query="+longitude+","+latitude;

request({ url , json: true }, (error, { body }={}) => {
   
   
  if (error) {
    callback("Unable to connect to wheather service",undefined)
   
  } else if (body.error) {

    callback("Unable to find location",undefined)
  } else {

    callback(undefined,
      body.current.weather_descriptions[0] +
        ".  It is currently " +
      body.current.temperature +
        " degress out. It feels like " +
      body.current.feelslike +
        " degress out."
    );
  }
});
}

module.exports = forecast;