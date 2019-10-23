const { DRINKS } = require('./controllers/drinks');
const { GUESTS } = require('./controllers/guests');
const { ORDER } = require('./controllers/order');
const express = require('express');

const app = express();

// This will be the server main
//Okay papi (uwu)

//CLIENT STUFF
app.get('/order',(req,res) => {
    ORDER(req,res);
})

app.get('/guests',(req,res) => {
    GUESTS();
})

app.get('/menu',(req,res) => {
    DRINKS();
})


//ADMIN STUFF
app.get('/login',(req,res) => {
    login(req,res);
})

app.get('/queue',(req,res) => {
    queue(req,res);
})

app.get('/fulfil',(req,res) => {
    login(req,res);
})

app.get('/add_guest',(req,res) => {
    login(req,res);
})

app.get('/add_drink',(req,res) => {
    login(req,res);
})

app.get('/remove_drink',(req,res) => {
    login(req,res);
})

app.get('/empty_drink',(req,res) => {
    login(req,res);
})

app.get('/fill_drink',(req,res) => {
    login(req,res);
})

app.get('/remove_drink',(req,res) => {
    login(req,res);
})

app.get('/change_drink_count',(req,res) => {
    login(req,res);
})

var port = 8888;
app.use(express.static(__dirname + '/public')).listen(port,console.log(`Listening on ${port}...`));