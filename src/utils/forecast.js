const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b2e12ff4615379a98160d99579da8191&query=${lat},${long}&units=f`;
    
    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback('Cannot connect to weather service', undefined);
        } else if (body.error){
            callback('No match found, try again', undefined);
        } else {
            callback(undefined, {
                name: body.location.name,
                latitude: body.location.lat,
                longitude: body.location.lon,
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast;