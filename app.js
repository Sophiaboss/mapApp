var x = $("demo");
// get the location via geolocator
function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
       
    } else { 
        x.html("Geolocation is not supported by this browser.");
    }
    
}

function showPosition(position) {
    
    $(x).html("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
    
   apiUrl(position.coords.latitude, position.coords.longitude)
}

//make api url with arguments
function apiUrl(lat, lon){
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=d385a95cca15013cf7298b068bb34dce&units=metric"
    gotData(url);
}
//get weather find weather id 

function gotData(newUrl){
 $.getJSON(newUrl, function(json) {
    //find the weather description and id for description
    weatherDescrip=json.weather[0].description;
    weatherId=json.weather[0].id;

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
    
})

}
// constructor 
// to add the right colorscheme
function Colorscheme(type){
    this.background= $("body").addClass(type);
}

