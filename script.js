var ApiKey ="14b5cabc2d7694d48a856a43219531d0"
var citySearch = document.getElementById('submit');

//  var long = ;
//  var lat = ;



// var queryUrl= 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&appid='+ ApiKey
    
function getGeocode(event){
 
 var input = document.getElementById("city");
 var inputVal = input.value;
 localStorage.setItem('city',inputVal);
 var city =localStorage.getItem('city'); 
 console.log(city);
 event.preventDefault();
 
 var geoCodeUrl ='http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+ApiKey;
    fetch(geoCodeUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        if(data){
        console.log(data);
        var lat = data[0].lat;
        localStorage.setItem("lat",lat)
        console.log(data[0].lat);
        var lon = data[0].lon;
        localStorage.setItem("lon",lon)
        console.log(data[0].lon);

        getTemp();

      }
    else(alert(error))})
  
    
};

function getTemp(){
    var lat = localStorage.getItem("lat");
    var lon = localStorage.getItem('lon');
    var getTempUrl ='https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+ ApiKey
    
    fetch(getTempUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        var temp = data.list[0].main.temp;
        localStorage.setItem('temp',temp);
        console.log(data.list[0].main.temp)
        var wind = data.list[0].wind.speed;
        localStorage.setItem('wind',wind);
        console.log(data.list[0].wind.speed);
        var humidity = data.list[0].main.humidity;
        localStorage.setItem('humidity',humidity);
        console.log(data.list[0].main.humidity);
    })
    .catch(function(error){
        console.error("error fetching data:", error)
    })
};


citySearch.addEventListener("click",getGeocode);
 

 
 
 