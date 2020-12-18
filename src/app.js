const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')


const app = express()
const viewsPath = path.join(__dirname,'../templates/views') //to alter the path of View directory
const partialsPath= path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views' ,viewsPath) //define templates path instead of default "views" file
hbs.registerPartials(partialsPath)


//set up static directory to serve 
app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res) => {
    res.render('index',{
        title:"weather app",
        name : "Mahmoud"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'about me',
        name:'mahmoud'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message:"In trouble?! , better call saul",
        title:"help",
        name: 'mahmoud'
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude}= {}) => {
        if(error){return res.send({error})}
        //console.log(longitude)
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error){return res.send({error})}
            res.send({
                forecast:forecastdata,
                longitude,
                latitude,
                location:req.query.address
            })
        })

    })
    //console.log(forecastdata)

})
/*
    geocode(address, (error,{latitude,longitude}= {}) => {
        if(error){return console.log(error)}
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error){return console.log(error)}
            console.log('Data', forecastdata)
          })
    })
*/

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
    products:[]
    })
})




app.get('/help/*',(req,res) => {

    res.render ('404',{
        message:"Help article not found",
        name:"Mahmoud Samir"
    })
    
    })


app.get('*',(req,res) => {

res.render ('404',{
    message:'not found .',
    name:"MahmoudSamir"
})

})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {

    console.log('Server is up on port 3000')

})

