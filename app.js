
// get the location via geolocator
function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
       
    } else { 
        x.html("Geolocation is not supported by this browser.");
    }
    
}
//Send coordinates to openweather
function showPosition(position) {

    
   apiUrl(position.coords.latitude, position.coords.longitude)
}

function cityCall(){
    $("input[type='text']").keypress(function(){
        city = this.value
        if(event.keyCode == 13){
            console.log(this.value)
            apiUrl(this.value);
            this.value="";
        }
    })
}

//make api url with arguments

function apiUrl(cityOrLat, lon){
    // units=units();
    console.log(cityOrLat, lon)
    
    if(typeof(cityOrLat) == "number"){
        url = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + cityOrLat + "&lon=" + lon + "&APPID=d385a95cca15013cf7298b068bb34dce" 
    }else{
        url = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + cityOrLat + "&APPID=d385a95cca15013cf7298b068bb34dce"
    }
    
    gotData(url);
}



       

function gotData(newUrl){
 $.getJSON(newUrl, function(json) {
    console.log(json)
    //find the weather description and id for description
    displayCityWeather(json.name ,json.weather[0].description)
    callConstructor(json.weather[0].id)
    displayForcast(json.main.humidity, json.main.pressure, json.main.temp, json.weather[0].description);
    //allow for cities to be entered instead
    cityCall();
    
})
}

function displayForcast(humidity, pressure, temperature, result ){
    $("#h").html(humidity)
    $("#p").html(pressure);
    $("#t").html(temperature);
    $("#result").html(result);

}

function displayCityWeather(city, weather){
    $("h1").html("{"+city+ ": " + weather+"}");

}
    

function callConstructor(weatherId){
    // call the constructor according to class id
    //if it's less than 700 or between 800 and 900 you only need the hundreds place. This is to keep the code DRY
    if(weatherId<700|| weatherId>800&& weatherId<900){
        weatherId = "w"+weatherId
        weatherId = weatherId.substring(0,2)
        Colorscheme(weatherId);
            // otherwise you need the three digit number for those odd weathers
    }else{
        Colorscheme("w"+ weatherId);
    }

}
// constructor 
// to add the right colorscheme
function Colorscheme(type){
    this.background= $("body").addClass(type);
}

//change units

function units(){
    var unitsM="metric"
    var count =0;
    $("button").on("click", function(){
        if(count%2==0){
            unitsM="metric";
        }else{
            untisM="imperial";
        }
    })
return unitsM;
}
getLocation();
