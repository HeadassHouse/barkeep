const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { DRINKS } = require('./controllers/drinks');
const { GUESTS } = require('./controllers/guests');
const { ORDER } = require('./controllers/order');
const { QUEUE } = require('./controllers/queue');
const { ADDGUEST } = require('./controllers/addGuest');
const { ADDDRINK } = require('./controllers/addDrink');
const { CHANGEDRINKSTATUS } = require('./controllers/changeDrinkStatus');
const { CHANGEDRINKCOUNT } = require('./controllers/changeDrinkCount');
const { REMOVEGUEST } = require('./controllers/removeGuest');
const { FULFILL } = require('./controllers/fulfill');
const { REMOVEDRINK } = require('./controllers/removeDrink');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors stuff for the server
app.use(cors());

//CLIENT STUFF
app.post('/order',(req,res) => {
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

//Marks an order as Fulfilled
app.post('/fulfil',(req,res) => {
    FULFILL(req,res);
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
    REMOVEDRINK(req,res);
})

app.post('/remove_guest',(req,res) => {
    REMOVEGUEST(req,res);
})

//Changes the amount of drinks that a client has drunken
app.post('/change_drink_count',(req,res) => {
    CHANGEDRINKCOUNT(req,res);
})

var port = 8888;
app.use(express.static(__dirname + '/public')).listen(port,console.log(`Listening on ${port}...`));