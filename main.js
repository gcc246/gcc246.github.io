async function retrieve () {
    var url = "https://api.weatherapi.com/v1/current.json?key=7bed2218a1ac4b92ba5171814221705&q=Camarillo&days=2&aqi=yes&alerts=no"
    var req = new Request(url);
    //https://api.weatherapi.com/v1/current.json?key=7bed2218a1ac4b92ba5171814221705&q=Camarillo&days=2&aqi=yes&alerts=no
    //https://api.weatherapi.com/v1/forecast.json?key=7bed2218a1ac4b92ba5171814221705&q=Camarillo&days=2&aqi=yes&alerts=no
    
    const response = await fetch(req);
    const weatherData = await response.text();
    const weatherDataText = JSON.parse(weatherData)
    console.log(weatherDataText);
    // JSON object parsing to javascript object ^
    
    let humidity = document.getElementById("humidLabel");
    let temperature = document.getElementById("temperatureF");
    temperature.textContent += weatherDataText.current.temp_f;
    humidity.textContent += weatherDataText.current.humidity + "%";
   
    let visible = false; // control variable

//button function to toggle humid lable visibility
    document.getElementById("humidityButton").onclick = function(){
        if(visible == false){
            humidity.style.visibility = "visible";
        }
        else{
            humidity.style.visibility = "hidden";  
        }
        visible = !visible;
    }

//wind card
document.getElementById("windSpeed").textContent += weatherDataText.current["wind_mph"] + " mph"
document.getElementById("windDegree").textContent += weatherDataText.current["wind_degree"] + "°"
document.getElementById("windDirection").textContent += weatherDataText.current["wind_dir"]
document.getElementById("windGrad").style = "background-image: linear-gradient(#e5e7e7,#fdfdfd);"
document.getElementById("maxWind").textContent += weatherDataText.forecast.forecastday[0].day.maxwind_mph + " mph"
document.getElementById("windGust").textContent += weatherDataText.current["gust_mph"] +" mph"


//astro card
document.getElementById("sunset").textContent += weatherDataText.forecast.forecastday[0].astro.sunset
document.getElementById("sunrise").textContent += weatherDataText.forecast.forecastday[0].astro.sunrise
document.getElementById("uvIndex").textContent += weatherDataText.current.uv;
document.getElementById("astroGrad").style = "background-image: linear-gradient(#e5e7e7,#fdfdfd);"


//tomorrow card

document.getElementById("conditionTmr").textContent = weatherDataText.forecast.forecastday[1].day.condition.text;
document.getElementById("maxWindTmr").textContent += weatherDataText.forecast.forecastday[1].day.maxwind_mph + " mph"
document.getElementById("avgTempTmr").textContent += weatherDataText.forecast.forecastday[1].day.avgtemp_f + "°";
document.getElementById("maxTempTmr").textContent += weatherDataText.forecast.forecastday[1].day.maxtemp_f + "°";
document.getElementById("minTempTmr").textContent += weatherDataText.forecast.forecastday[1].day.mintemp_f + "°";
document.getElementById("avgHumid").textContent += weatherDataText.forecast.forecastday[1].day.avghumidity+ "%";






//aqi card
let AQI = weatherDataText.current.air_quality["gb-defra-index"];
if (AQI <=3){
    document.getElementById("AQICondition").textContent = "Low Air Pollution";
    document.getElementById("AQIGBIndex").textContent += weatherDataText.current.air_quality["gb-defra-index"];
    document.getElementById("AQIUSIndex").textContent += weatherDataText.current.air_quality["us-epa-index"];

}
else if(AQI>=4 && AQI <=6){
    document.getElementById("AQICondition").textContent = "Moderate Air Pollution";
    document.getElementById("AQIGBIndex").textContent += weatherDataText.current.air_quality["gb-defra-index"];
    document.getElementById("AQIUSIndex").textContent += weatherDataText.current.air_quality["us-epa-index"];
}
else if(AQI>= 7 && AQI<=9){
    document.getElementById("AQICondition").textContent = "High Air Pollution";
    document.getElementById("AQIGBIndex").textContent += weatherDataText.current.air_quality["gb-defra-index"];
    document.getElementById("AQIUSIndex").textContent += weatherDataText.current.air_quality["us-epa-index"];
}
else{
    document.getElementById("AQICondition").textContent = "Very High Air Pollution";
    document.getElementById("AQIGBIndex").textContent += weatherDataText.current.air_quality["gb-defra-index"];
    document.getElementById("AQIUSIndex").textContent += weatherDataText.current.air_quality["us-epa-index"];
}

let cards = document.querySelectorAll(".card");
//for each card in the cards list, set the background to a color gradient
cards.forEach((card) =>{
    card.style = "background-image: linear-gradient(#aaf2f2, #fdfdfd)";
});

    }
    retrieve();