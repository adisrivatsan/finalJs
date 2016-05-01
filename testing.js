var uri = "sausage gravy and biscuits";
var res = encodeURI(uri);
console.log(res); 

//console.log($('<div>')); 

var average = 0; 

//50zdrCB_wd2j45sp0yfwa0vemsU

$('button.dining').click(function () {
  var HOST_URL = 'http://lit-river-11355.herokuapp.com';
  console.log('in button '); 
  var $that = $(this); 
  //$('.FoodDisplay').empty(); 
  //var $menuDiv = $('<div>'); 
  //$menuDiv.text('additions? '); 
   //$menuDiv.addClass('bold'); 

      /*var bigArr = {
        foodArray: [],
        scoreArray: []
      }; */
            var maxscores = []; 
            var diningHallType = '/hill'; 


      if ($that.attr('class') ===  'dining HillFood') { 
        diningHallType = '/hill'; 

      }
      else if ($that.attr('class') === 'dining KingsCourtFood') { 
        diningHallType = '/kingsCourt'; 
      }
      else if ($that.attr('class') === 'dining CommonsFood') { 
        diningHallType = '/Commons'; 
      }
      console.log('in what'); 
      qwest.get(HOST_URL + diningHallType).then(function(response) {
          if (response.status == 200) {
            var arr = []; 
                //console.log(body);
                var a =(JSON.parse(JSON.parse(response.response).body));  
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
              //console.log(arr);
              var $newDivRow = $('<div>');
              
              //console.log($menuDiv.attr('class')); 
              //$newDivRow.append($menuDiv); 
              for (var i = 0; i < arr.length; i++) {
                var $plainDiv = $('<div>'); 
                 $plainDiv.text(arr[i]); 
                 $newDivRow.append($plainDiv); 
               }; 


              $('.FoodDisplay').append($newDivRow); 

              //bigArr.foodArray = arr; 

              for (var i = 0; i < arr.length; i++) {


                var foodApi = {
                  headers: { 
                    'X-Mashape-Key': 'tzqoJvDW9Gmsh5fL7FQm4s57Lcefp1OvysCjsnMxdD2VCJ5Nh2', 
                  }
                };
              }
              return qwest.get((HOST_URL + '/search'), {'food': arr}, foodApi);
            }
          }).then(function(response) {
            if(response.status == 200) { 
              var len = (JSON.parse(response.response).length);
              var holder = JSON.parse(response.response); 
             //console.log(holder); 
              var sum = 0; 
              for (var j = 0; j < len; j++) {
                  sum = sum + (JSON.parse(holder[j][1]).calories); 
               }; 
               var avg = sum/len; 
               average = avg; 
               //$menuDiv.text('Menu and' + '  Average Calories ' + avg); 
               console.log('calories are ' + avg); 



               
                
              }
            }, function(err, err2, err3) {
              //$menuDiv.text('dining hall closed today'); 
            })
        })



$('.load').click(function () {
	console.log('button has loaded');
	//$.cloudinary.config({cloud_name: 'vatsan', api_key: '267562143573247'});  
	qwest.get('http://lit-river-11355.herokuapp.com' + '/upload/image.png').then(function(response) {
	if(response.status ===200) { 
		$('.insertImage').empty(); 
		console.log('hello'); 
		if(average < 100) { 
			$newDiv = $('<img src=' + '"/upload/image.png"' + 'style="width:400;height:450;">'); 
		} else { 
			$newDiv = $('<img src=' + '"/upload/smileFrown.gif"' + 'style="width:400;height:450;">'); 
		}
		
		//console.log($newDiv);
		
		$('.insertImage').append($newDiv); 
		
		
	

	}

}); 

});  





