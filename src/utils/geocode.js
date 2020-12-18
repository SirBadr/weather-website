const request = require('request')


const geocode = (address, callback) => {

    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFobW91ZGJhZHIiLCJhIjoiY2tpb3BxYm02MDVsazJ5cGF5aXF0eWRnayJ9.BLx-cfYGbdx4A6U6X3ObqA'

    request({url,json:true} , (error,{body}) => { 

        if (error){callback('unable to connect')}
        else if(body.features.length === 0){callback('unable to find location')}
        else{callback(undefined,{
            latitude : body.features[0].center[0],
            longitude : body.features[0].center[1]

        }
        )
    }
    }
    )
}

module.exports = geocode