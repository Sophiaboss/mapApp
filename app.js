var x = $("demo");

function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
       
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    
}

function showPosition(position) {
    console.log(position)
    $(x).html("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
    
   apiUrl(position.coords.latitude, position.coords.longitude)
}

//make api url
function apiUrl(lat, lon){
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=d385a95cca15013cf7298b068bb34dce&units=metric"
    gotData(url);
}
//get weather

function gotData(newUrl){
 $.getJSON(newUrl, function(json) {
    weatherDescrip=json.weather[0].description;
    console.log(weatherDescrip)
    weatherId=json.weather[0].id;
    if(weatherId<700){
        weatherId = "w"+weatherId
        weatherId = weatherId.substring(0,2)
        Colorscheme(weatherId);
    }else{
        Colorscheme("w"+ weatherId);
    }
    
})

}
// constructor 

function Colorscheme(type){
    this.background= $("body").addClass(type);
}

$("body").addClass("w2")