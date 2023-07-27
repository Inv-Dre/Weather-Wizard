var ApiKey = "14b5cabc2d7694d48a856a43219531d0";
var citySearch = document.getElementById("submit");
var clearLS = document.getElementById("reset");

var tempArray = [];
var windArray = [];
var humidityArray = [];
var dateArray=[];


function getGeocode(event) {
  var input = document.getElementById("city");
  var inputVal = input.value;
  localStorage.setItem("city", inputVal);
  var city = localStorage.getItem("city");
  console.log(city);

  event.preventDefault();

  if (inputVal === "") {
    alert("enter valid city");
    return;
  }

  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  console.log(searchHistory);
  var geoCodeUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    ApiKey;
  fetch(geoCodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data) {
        console.log(data);
        var lat = data[0].lat;
        localStorage.setItem("lat", lat);
        console.log(data[0].lat);
        var lon = data[0].lon;
        localStorage.setItem("lon", lon);
        console.log(data[0].lon);

        var cityDate= document.getElementById('city-date');
        cityDate.textContent=inputVal;

        showSearchHistory();
        getTemp(inputVal);
      } else alert(error);
    });
}

function getTemp(inputVal) {
  var lat = localStorage.getItem("lat");
  var lon = localStorage.getItem("lon");
  var getTempUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    ApiKey;

  fetch(getTempUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    
      tempArray.push(data.list[0].main.temp);
      tempArray.push(data.list[8].main.temp);
      tempArray.push(data.list[16].main.temp);
      tempArray.push(data.list[24].main.temp);
      tempArray.push(data.list[32].main.temp);
      tempArray.push(data.list[39].main.temp);
      
      console.log(tempArray);
      var dayOneTemp = document.getElementById('temp');
      dayOneTemp.textContent ="Temp: "+tempArray[0]+" K";
      var dayTwoTemp = document.getElementById('temp2');
      dayTwoTemp.textContent ="Temp: "+tempArray[1]+" K";
      var dayThreeTemp = document.getElementById('temp3');
      dayThreeTemp.textContent ="Temp: "+tempArray[2]+" K";
      var dayFourTemp = document.getElementById('temp4');
      dayFourTemp.textContent ="Temp: "+tempArray[3]+" K";
      var dayFiveTemp = document.getElementById('temp5');
      dayFiveTemp.textContent ="Temp: "+tempArray[4]+" K";
      var daySixTemp = document.getElementById('temp6');
      daySixTemp.textContent ="Temp: "+tempArray[5]+" K";

      
       windArray.push(data.list[0].wind.speed);
       windArray.push(data.list[8].wind.speed);
       windArray.push(data.list[16].wind.speed);
       windArray.push(data.list[24].wind.speed);
       windArray.push(data.list[32].wind.speed);
       windArray.push(data.list[39].wind.speed);

       console.log(windArray);
       var dayOneWind = document.getElementById('wind');
       dayOneWind.textContent ="Wind: "+windArray[0];
       var dayTwoWind = document.getElementById('wind2');
       dayTwoWind.textContent ="Wind: "+windArray[1];
       var dayThreeWind = document.getElementById('wind3');
       dayThreeWind.textContent ="Wind: "+windArray[2];
       var dayFourWind = document.getElementById('wind4');
       dayFourWind.textContent ="Wind: "+windArray[3];
       var dayFiveWind = document.getElementById('wind5');
       dayFiveWind.textContent ="Wind: "+windArray[4];
       var daySixWind = document.getElementById('wind6');
       daySixWind.textContent ="Wind: "+windArray[5];
 
       

      
       humidityArray.push(data.list[0].main.humidity);
       humidityArray.push(data.list[8].main.humidity);
       humidityArray.push(data.list[16].main.humidity);
       humidityArray.push(data.list[24].main.humidity);
       humidityArray.push(data.list[32].main.humidity);
       humidityArray.push(data.list[39].main.humidity);

      console.log(humidityArray);
      var dayOneHumidity = document.getElementById('humidity');
       dayOneHumidity.textContent ="Humidity: "+humidityArray[0];
       var dayTwoHumidity = document.getElementById('humidity2');
       dayTwoHumidity.textContent ="Humidity: "+humidityArray[1];
       var dayThreeHumidity = document.getElementById('humidity3');
       dayThreeHumidity.textContent ="Humidity: "+humidityArray[2];
       var dayFourHumidity = document.getElementById('humidity4');
       dayFourHumidity.textContent ="Humidity: "+humidityArray[3];
       var dayFiveHumidity = document.getElementById('humidity5');
       dayFiveHumidity.textContent ="Humidity: "+humidityArray[4];
       var daySixHumidity = document.getElementById('humidity6');
       daySixHumidity.textContent ="Humidity: "+humidityArray[5];

       dateArray.push(data.list[0].dt_txt);
       dateArray.push(data.list[8].dt_txt);
       dateArray.push(data.list[16].dt_txt);
       dateArray.push(data.list[24].dt_txt);
       dateArray.push(data.list[32].dt_txt);
       dateArray.push(data.list[39].dt_txt); 

       console.log(dateArray)

       var dayOneDate = document.getElementById('city-date');
       dayOneDate.textContent = inputVal+"/"+ dateArray[0];
       var dayTwoDate = document.getElementById('city-date2');
       dayTwoDate.textContent =inputVal+"/"+ dateArray[1];
       var dayThreeDate = document.getElementById('city-date3');
       dayThreeDate.textContent =inputVal+"/"+ dateArray[2];
       var dayFourDate = document.getElementById('city-date4');
       dayFourDate.textContent =inputVal+"/"+ dateArray[3];
       var dayFiveDate = document.getElementById('city-date5');
       dayFiveDate.textContent =inputVal+"/"+ dateArray[4];
       var daySixDate = document.getElementById('city-date6');
       daySixDate.textContent =inputVal+"/"+ dateArray[5];
       
 

    
    })
    .catch(function (error) {
      console.error("error fetching data:", error);
    });
}

citySearch.addEventListener("click", getGeocode);

function showSearchHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  var historyList = document.getElementById("searchHistory");
  historyList.innerHTML = "";

  for (var i = 0; i < searchHistory.length; i++) {
    var listButton = document.createElement("button");
    var listItem = document.createElement("li");
    listButton.setAttribute("id", "search-list");
    listButton.append(listItem);
    listItem.textContent = searchHistory[i];
    historyList.appendChild(listButton);

    listButton.addEventListener("click", function (event) {
      getGeocode(listItem.textContent);
    });
  }
}

// Call showSearchHistory initially to display the existing search history
showSearchHistory();

clearLS.addEventListener("click", function clearLocal() {
  localStorage.clear();
});
