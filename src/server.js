const { DRINKS } = require('./controllers/drinks');
const { GUESTS } = require('./controllers/guests');
const { ORDER } = require('./controllers/order');
const { QUEUE } = require('./controllers/queue');
const { ADDGUEST } = require('./controllers/addGuest');
const { ADDDRINK } = require('./controllers/addDrink');
const { CHANGEDRINKSTATUS } = require('./controllers/changeDrinkStatus');

const express = require('express');

const app = express();

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
app.get('/login',(req,res) => {
    login(req,res);
})

app.get('/queue',(req,res) => {
    QUEUE(req,res);
})

app.get('/fulfil',(req,res) => {
    login(req,res);
})

app.get('/add_guest',(req,res) => {
    ADDGUEST(req,res);
})

app.get('/add_drink',(req,res) => {
    ADDDRINK(req,res);
})

app.get('/change_drink_status',(req,res) => {
    CHANGEDRINKSTATUS(req,res);
})

app.get('/remove_drink',(req,res) => {
    login(req,res);
})

app.get('/remove_guest',(req,res) => {
    login(req,res);
})

app.get('/change_drink_count',(req,res) => {
    login(req,res);
})

var port = 8888;
app.use(express.static(__dirname + '/public')).listen(port,console.log(`Listening on ${port}...`));