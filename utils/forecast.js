const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ef40d2809da09d3cb808b39c17ec7e6e&query=' + latitude + ',' + longitude + '&units=m'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (String(response.statusCode) !== '200') {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const weather_callback = response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out"
                + " With humidity of " + response.body.current.humidity + "%. Currently feels like " + response.body.current.feelslike + " degrees."
            callback(undefined, weather_callback)
        }
    })
}

module.exports = forecast