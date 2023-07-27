var ApiKey ="14b5cabc2d7694d48a856a43219531d0"
var citySearch = document.getElementById('submit');
var clearLS = document.getElementById('reset');
var data = {temp:"",
wind:"",
humidity:''}

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

 if(inputVal===""){
  alert("enter valid city")
  return;
 }

 var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistory.push(city);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
 console.log(searchHistory)
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
        
        showSearchHistory();
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
        for (let index = 0; index < 6; index++) {
        
        temp = data.list[index].main.temp;
        tempObj=temp.value
        localStorage.setItem('temp',tempObj);
        console.log(data.list[index].main.temp)
        wind = data.list[index].wind.speed;
        localStorage.setItem('wind',wind);
        console.log(data.list[index].wind.speed);
        humidity = data.list[index].main.humidity;
        localStorage.setItem('humidity',humidity);
        console.log(data.list[index].main.humidity);

        
}})
    .catch(function(error){
        console.error("error fetching data:", error)
    })
};




citySearch.addEventListener("click",getGeocode);

function showSearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    var historyList = document.getElementById('searchHistory');
    historyList.innerHTML = '';
  
    for (var i = 0; i < searchHistory.length; i++) {
      var listButton = document.createElement('button');
      var listItem = document.createElement('li');
      listButton.setAttribute('id','search-list');
      listButton.append(listItem);
      listItem.textContent = searchHistory[i];
      historyList.appendChild(listButton);
      
      listButton.addEventListener('click',function(event){ 
      getGeocode(event.target.textContent);});
    }
  };
  
  // Call showSearchHistory initially to display the existing search history
  showSearchHistory();

  clearLS.addEventListener('click',function clearLocal(){
    localStorage.clear();
  }
);
  


 
 
 