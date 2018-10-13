var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/tvApp';
var db = pgp(connectionString);

function getAllPuppies(req, res, next) {
  db.any('select * from tvShows')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function userLogIn(req, res, next) {
	console.log(req.body.email);
    var email = req.body.email;
    var password = req.body.password;
	db.one('select * from users where email = email')
	  .then(function (data) {
	  	console.log("YERRRR");
	  	db.query('select password from users where email = email')
	  	  .then(function(response) { 
	  	  	console.log(password);
	  	  	console.log('ASDASDAS'+ JSON.stringify(data)+"BADUM"+JSON.stringify(response[0].password));
		  	    if(JSON.stringify(password) === JSON.stringify(response[0].password)){
		  	      console.log("YERRRR");
		  	      res.redirect('/tv');
		  	    } else{
		  	    	console.log("COWOWOWOW" + response.password);
		  	    }
	  	  	});
	  })
	  .catch(function(err) {
	  	return next(err);
	  });
}



module.exports = {
  getAllPuppies: getAllPuppies,
  userLogIn: userLogIn

};