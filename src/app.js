const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')

const geocode = require('./utils/geocode')
const forecash = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Dibyo'
  })
})

app.get('/about',(req,res) =>{
  res.render('about', {
    title:"About us",
    name: "Dibyo"
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: "Help me",
    HelpText: "THis is help site",
    name:"Dibyo"
  })
})

app.get('/weather', (req,res) =>{
  if (!req.query.address) {
   return res.send({
    error: 'This an error'
    })
  }else{
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
  if (error) {
    return res.send({ error })
  }

  forecash(latitude,longitude,(error, forecashData) => {
    if(error){
      return res.send({ error })
    }
    res.send({
      forecash: forecashData,
      location,
      address: req.query.address 
    })
  })
})
}
})

app.get('/products', (req,res) => {
  if(!req.query.search){
    return res.send({
      error: 'you must provide a search terms'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res) => {
  res.render('404page', {
    title: '404',
    name: 'Dibyo',
    errormsg: 'This help 404'
  })
})

app.get('*', (req,res) => {
  res.render('404page',{
    title: '404',
    errormsg : 'THis is 404 page not found',
    name: 'Dibyo'
  })
})

app.listen(3000, () => {
  console.log('Server is up with msg in port 3000.');
})

