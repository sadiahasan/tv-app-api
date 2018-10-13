const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require("path")
const pg = require('pg');



var db = require('../queries');
var app = express();

hbs.registerPartials(__dirname + '/../views/partials' );

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');

app.get('/h', (req, res) => {
	res.render('home.hbs');

});

app.post('/h', db.userLogIn);



app.get('/', db.getAllPuppies);

app.post('/tv', (req, res) => {
	var title = JSON.stringify(req.body.title);
	console.log(title);
	var encodedTitle = encodeURIComponent(title);
	var tvURL = `http://www.omdbapi.com/?t=${encodedTitle}&apikey=4d4f55ac`;
	console.log(tvURL);

	axios.get(tvURL).then((response) => {
		console.log(response.data.Genre);
		res.render('tv.hbs', {
		genre: response.data.Genre
	})
}).catch((e) => {
		if(e.code === 'ENOTFOUND') {

		}else{
			console.log(e.message);
			res.render('weather.hbs', {
				location: location,
				weatherMessage: e.message
			})
		}

});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

module.exports = {app};