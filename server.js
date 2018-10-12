const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const bodyParser = require('body-parser');


const {ObjectId} = require('mongodb');
var{mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');




app.get('/', (req, res) => {
	res.render('home.hbs');
});

app.post('/tv', (req, res) => {
	var title = JSON.stringify(req.body.title);
	console.log(title);
	var encodedTitle = encodeURIComponent(title);
	var tvURL = `http://www.omdbapi.com/?t=${encodedTitle}&apikey=4d4f55ac`;
	console.log(tvURL);

	axios.get(tvURL).then((response) => {
		console.log(response.data.Genre);
	})

	res.render('tv.hbs');

});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

module.exports = {app};