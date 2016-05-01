var async = require('async');
//var storeFood = require('./storeFood'); 
//async.waterfall(storeFood); 

//console.log(storeFood); 
var request = require('request'); 

//$container = $('.HillFoodDisplay'); 
var max_score = []

var foodApi = { 
      url: ('https://nutritionix-api.p.mashape.com/v1_1/search/' + 'apple'),
      headers: { 
      'X-Mashape-Key': 'tzqoJvDW9Gmsh5fL7FQm4s57Lcefp1OvysCjsnMxdD2VCJ5Nh2', 
      }
    };
		
	function callback2(error,response,body) { 
	if(!error && response.statusCode == 200) { 
		max_score.push(JSON.parse(body).max_score); 
		//console.log('in this function'); 
		  //bigArr.scoreArray = max_score;
    //console.log(max_score);
    //console.log(max_score); 
		}
	}
	var func1 = request(foodApi, callback2);

/*for (var i = 0; i < storeFood[0].length; i++) {
	$container.text('storeFood[0][i]');  
}; */
function callback3(error,response,body) { 
	console.log(max_score); 

}
async.waterfall(func1,callback3); 


 

