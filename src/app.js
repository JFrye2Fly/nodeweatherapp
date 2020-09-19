const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setyp handlebars engine and views path location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath); // Registers partial path 

// Static directory to serve 
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App dynamic value',
        name: 'Jeffrey Frye'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Jeffrey Frye'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'Need help, contact us at 111-111-1234 or by email at help@help.com',
        title: 'HELP',
        name: 'Jeffrey Frye'
    })
})
 
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
     error: 'Must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorMsg: 'Help article does not exist'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorMsg: 'Sorry page not found'
    })
})

// Server Listening
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});