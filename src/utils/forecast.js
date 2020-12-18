const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url =  'http://api.weatherstack.com/current?access_key=4cb0988bb4b908a4d51752e3f39a1419&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+ '&units=f'
    request({url,json:true},(error,{body}) => {
        if (error){callback('unable to connect')}
        else if(body.error){callback('unable to find location ya zmely')}
        else {callback(undefined,{
            temperature : body.current.temperature,
            perciptaion : body.current.precip
        })}
    })     
}
module.exports = forecast 