const request = require("request");

 const geocode = (address, callback) => {
    const geocodingUrl =
      "http://api.positionstack.com/v1/forward?access_key=b7a070a23613a5098c67e7f783483926&query="+address+"&limit=1";
    request({ url: geocodingUrl, json: true }, (error, { body }={}) => {
      //console.log(response.body.data)
      if (error) {
        callback("Unable to connect to location service", undefined);
      } else if (body.data.length === 0) {
        callback("Unable to find location");
      } else {
      
        callback(undefined, {
          latitude: body.data[0].latitude,
          longitude: body.data[0].longitude,
          location: body.data[0].locality,
        });
      }
    });
  };

  module.exports = geocode;