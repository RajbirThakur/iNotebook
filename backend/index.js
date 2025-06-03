// This index.js is my server

const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express(); //express is nodejs framework for handling http requests and building your own api's
const port = 5000;


app.use(cors());
app.use(express.json()); // Its a middleware, express apps cant handle req in the form of json, so this middleware helps it to do so

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

/*
app.get('/',(req, res)=>{
    res.send('Hello everyone');
})
app.get('/api/login',(req, res)=>{
    res.send('You have been successfully logged in');
})
*/

// / and /api/login are the endpoints which when hit sends the above responses


app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`);
})