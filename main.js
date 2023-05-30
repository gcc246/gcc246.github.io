let locationInput;


async function retrieve () {
    var url = `https://api.weatherapi.com/v1/forecast.json?key=7bed2218a1ac4b92ba5171814221705&q=${locationInput}&days=2&aqi=yes&alerts=no`
    var req = new Request(url);
    //api key stuff
    
    const response = await fetch(req);
    const weatherData = await response.text();
    const weatherDataText = JSON.parse(weatherData)
    console.log(weatherDataText);
    // JSON object parsing to javascript object ^
    
    let temperature = document.getElementById("temperatureF");
    temperature.textContent = "Temperature in Fahrenheit: " +  weatherDataText.current.temp_f;
    


//wind card
document.getElementById("windSpeed").textContent = weatherDataText.current["wind_mph"] + " mph"
document.getElementById("windDegree").textContent = "Wind Degree: " + weatherDataText.current["wind_degree"] + "°"
document.getElementById("windDirection").textContent = "Wind Direction: " + weatherDataText.current["wind_dir"]
document.getElementById("windGrad").style = "background-image: linear-gradient(#e5e7e7,#fdfdfd);"
document.getElementById("maxWind").textContent ="Max Wind Speed: " + weatherDataText.forecast.forecastday[0].day.maxwind_mph + " mph"
document.getElementById("windGust").textContent = "Gusts: " + weatherDataText.current["gust_mph"] +" mph"


//astro card
document.getElementById("sunset").textContent = "Sunset: " + weatherDataText.forecast.forecastday[0].astro.sunset
document.getElementById("sunrise").textContent = "Sunrise: " +  weatherDataText.forecast.forecastday[0].astro.sunrise
document.getElementById("uvIndex").textContent = "UV Index: " +  weatherDataText.current.uv;
document.getElementById("astroGrad").style = "background-image: linear-gradient(#e5e7e7,#fdfdfd);"


//tomorrow card

document.getElementById("conditionTmr").textContent = weatherDataText.forecast.forecastday[1].day.condition.text;
document.getElementById("maxWindTmr").textContent = "Max Wind: " +  weatherDataText.forecast.forecastday[1].day.maxwind_mph + " mph"
document.getElementById("avgTempTmr").textContent = "Average Temperature" +  weatherDataText.forecast.forecastday[1].day.avgtemp_f + "°";
document.getElementById("maxTempTmr").textContent = "Max Temperature: " +  weatherDataText.forecast.forecastday[1].day.maxtemp_f + "°";
document.getElementById("minTempTmr").textContent ="Min Temperature: " + weatherDataText.forecast.forecastday[1].day.mintemp_f + "°";
document.getElementById("avgHumid").textContent = "Average Humidity: " +  weatherDataText.forecast.forecastday[1].day.avghumidity+ "%";






//aqi card
let AQI = weatherDataText.current.air_quality["gb-defra-index"];
document.getElementById("AQIGBIndex").textContent = "GB Defra Index: " +  weatherDataText.current.air_quality["gb-defra-index"];
document.getElementById("AQIUSIndex").textContent = "US EPA Index: " +  weatherDataText.current.air_quality["us-epa-index"];
if (AQI <=3){
    document.getElementById("AQICondition").textContent = "Low Air Pollution";
}
else if(AQI>=4 && AQI <=6){
    document.getElementById("AQICondition").textContent = "Moderate Air Pollution";
}
else if(AQI>= 7 && AQI<=9){
    document.getElementById("AQICondition").textContent = "High Air Pollution";
}
else{
    document.getElementById("AQICondition").textContent = "Very High Air Pollution";;
}

let cards = document.querySelectorAll(".card");
//for each card in the cards list, set the background to a color gradient
cards.forEach((card) =>{
    card.style = "background-image: linear-gradient(#aaf2f2, #fdfdfd)";
});

    }


    const saveInput = () =>{
        locationInput = document.getElementById("locationInputForm").value;
        document.getElementById("locationHeader").textContent = locationInput + " Weather";
        retrieve();
        document.getElementById("weatherBody").style.visibility = "visible";
      }