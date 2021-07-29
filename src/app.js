const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
const name = 'Idan Rokach'
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: name
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send("Must provide search value")
    }
    return res.send([])
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help page',
        name: name
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) { return res.send({ 'error': "Must provide address" }) }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) { return res.send({ error }) } //error handler
        forecast(latitude, longitude, (error, forecastData) => {

            if (error) { return res.send({ error }) }//error handler

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page not found',
        name: name
    })
})

app.listen(port, () => { console.log("Listening on: " + port) })