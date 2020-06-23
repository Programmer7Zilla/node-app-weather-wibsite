const request = require('request')

const forecash = (lat,lon,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=2f5875abc8b9349c41df25f313a1f8d3&query='+lat+','+lon

  request({ url, json:true }, (error, { body }) => {
        if(error){
          callback('Unable get the connection',undefined)
        }else if(body.error){
          callback('Unable to get the location',undefined)
        }else{
        callback(undefined, "It's currently "+body.current.temperature+" C out there!"+"Temperature files like "+body.current.feelslike+" C"+
        " And Sky like "+body.current.weather_descriptions)
        } 
  })
}

module.exports = forecash