const request = require('request')

const geocode = (address,callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia29sZWhkIiwiYSI6ImNrOWltdGRzeTAwYTgzZ3A4YTBrMWhtZnYifQ.O49Xe-jrPRZG4-Aee9J1-w&limit=1'
   
  request({url, json:true}, (error,{body}) => {
      if(error){
          callback('Unable to connect to location server!', undefined)
      }else if(body.features.length === 0){
          callback('Unable to find location, try an other seach', undefined)
      }else{
          callback(undefined, {
              latitude: body.features[0].geometry.coordinates[1],
              longitude: body.features[0].geometry.coordinates[0],
              location: body.features[0].place_name
          })
      }
  })
}

module.exports = geocode