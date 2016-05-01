// var _ = require('underscore');
 var request = require("request");
 //console.log('hello'); 

 var options = {
  url: 'https://esb.isc-seo.upenn.edu/8091/open_data/dining/menus/daily/593',
  headers: {
    'Authorization-Bearer': 'UPENN_OD_em24_1002844',
    'Authorization-Token': '8vb0t42b37k5c4nifgbif6354t'
  }
};

var bigArr = {
  foodArray: [],
  scoreArray: []
}; 

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
  	var arr = []; 
  	var max_score = []; 
    //console.log(body);
    var a =(JSON.parse(body));  
    var b = (a.result_data.Document.tblMenu); 
    var c = b.tblDayPart;
    if(c) {
      for (var i = 0; i < c.length; i++) {
      var tbStat = (c[i].tblStation);
      for (var j = 0; j < tbStat.length; j++) {
       var tbItem = (tbStat[j].tblItem); 
        for(var k =0; k<tbItem.length; k++) { 
          arr.push(tbItem[k].txtTitle); //arr
        }
      
       }; 
    };
    }
    console.log(arr);

     bigArr.foodArray = arr; 
   
	

    var foodApi = { 
      url: ('https://nutritionix-api.p.mashape.com/v1_1/search/' + arr[0]),
      headers: { 
      'X-Mashape-Key': 'tzqoJvDW9Gmsh5fL7FQm4s57Lcefp1OvysCjsnMxdD2VCJ5Nh2', 
      }
    };
		
	function callback2(error,response,body) { 
	if(!error && response.statusCode == 200) { 
		max_score.push(JSON.parse(body).max_score); 
		//console.log('in this function'); 
		  bigArr.scoreArray = max_score;
    console.log(max_score);
		}
	}
	request(foodApi, callback2);    


	};
	
    //console.log(c);  
    //console.log(b[1].tblItem.txtTitle); 
  
}

module.exports = bigArr; 
request(options, callback);
