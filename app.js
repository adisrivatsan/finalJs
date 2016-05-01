var express = require('express');
var request = require('request');
var Q = require('q');
var _ = require('underscore');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
// var storeFood = require('./storeFood');
// Serve static pages


/*app.get('/', function (req, res) {
  
  // console.log(storeFood); 
});*/

app.get('/hill', function(req, res) {
	request.get('https://esb.isc-seo.upenn.edu/8091/open_data/dining/menus/daily/636', {
		headers: {
			'Authorization-Bearer': 'UPENN_OD_em24_1002844',
			'Authorization-Token': '8vb0t42b37k5c4nifgbif6354t'
		}
	}, function(err, data) {
		res.send(data)
	})
});

app.get('/kingsCourt', function(req, res) {
	request.get('https://esb.isc-seo.upenn.edu/8091/open_data/dining/menus/daily/638', {
		headers: {
			'Authorization-Bearer': 'UPENN_OD_em24_1002844',
			'Authorization-Token': '8vb0t42b37k5c4nifgbif6354t'
		}
	}, function(err, data) {
		res.send(data)
	})
});

app.get('/Commons', function(req, res) {
	request.get('https://esb.isc-seo.upenn.edu/8091/open_data/dining/menus/daily/593', {
		headers: {
			'Authorization-Bearer': 'UPENN_OD_em24_1002844',
			'Authorization-Token': '8vb0t42b37k5c4nifgbif6354t'
		}
	}, function(err, data) {
		res.send(data)
	})
});


app.get('/search', function(req, res) {
	var get = Q.denodeify(request.get);
	var promises = [];
	console.log("hello " + req.query.food);
	for (var i = 0; i < req.query.food.length; i++) {
		promises.push(get('https://api.edamam.com/api/nutrition-data?app_id=cb31f0fe&app_key=a9e440f6b432d6a60a7b8b65f9c3ed7c&ingr=1 ' + encodeURI(req.query.food[i])
			/*headers: {
          		'X-Mashape-Key': 'uDKW3qCSo5mshMcBQ16Pe6b88NYGp1Gt4GvjsnOfjdvVcs76No'
        	} */
		))
	};
	Q.all(promises).then(function(data) {
			//res.send(_.pluck(data, "body"));
			var statuses = _.pluck(data, "statusCode");
			var ret = _.filter(data, function(el) {
				return el[0].statusCode === 200;
			})
			res.send(ret);
		},
		function(err) {

		})
});

app.use(express.static(__dirname));

app.use(express.static('/upload'));
//console.log('please work');
/*app.use(bodyParser({uploadDir:'/Users/adityasrivatsan/Documents/JavaScript/upload'}));

var path = require('path'),
    fs = require('fs');
// ...
app.post('/upload', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.png');
    // ...
}); 

app.get('/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
}); */

app.get('/test', function(req, res) {
	res.send('is this working');
})



var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
	console.log('Express server listening on port %d', port);
});