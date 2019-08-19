function weatherBalloon( latitude, longitude ) {
    var key = '{a7e04a65a9a6e5f58c2a7d08f4e7ebc1}';
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=43.700111&lon=-79.416298&appid={a7e04a65a9a6e5f58c2a7d08f4e7ebc1}')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
    weatherBalloon( 6167865 );
  }
 
 