const { DRINKS } = require('./controllers/drinks');
const { GUESTS } = require('./controllers/guests');
const { ORDER } = require('./controllers/order');
const { QUEUE } = require('./controllers/queue');
const { ADDGUEST } = require('./controllers/addGuest');
const { ADDDRINK } = require('./controllers/addDrink');
const { CHANGEDRINKSTATUS } = require('./controllers/changeDrinkStatus');
const { CHANGEDRINKCOUNT } = require('./controllers/changeDrinkCount');
const { FULFIL } = require('./controllers/fulfil');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// This will be the server main
//Okay papi (uwu)

//CLIENT STUFF
app.get('/order',(req,res) => {
    ORDER(req,res);
})

app.get('/guests',(req,res) => {
    GUESTS(req, res);
})

app.get('/menu',(req,res) => {
    DRINKS(req, res);
})


//ADMIN STUFF
app.post('/login',(req,res) => {
    login(req,res);
})

app.get('/queue',(req,res) => {
    QUEUE(req,res);
})

app.post('/fulfil',(req,res) => {
    FULFIL(req,res);
})

//Adds a guest to be served
app.post('/add_guest',(req,res) => {
    ADDGUEST(req,res);
})

//Adds a drink to be served
app.post('/add_drink',(req,res) => {
    ADDDRINK(req,res);
})

//Changes the availibility of a drink
app.post('/change_drink_status',(req,res) => {
    CHANGEDRINKSTATUS(req,res);
})

app.post('/remove_drink',(req,res) => {
    login(req,res);
})

app.post('/remove_guest',(req,res) => {
    login(req,res);
})

//Changes the amount of drinks that a client has drunken
app.post('/change_drink_count',(req,res) => {
    CHANGEDRINKCOUNT(req,res);
})

var port = 8888;
app.use(express.static(__dirname + '/public')).listen(port,console.log(`Listening on ${port}...`));