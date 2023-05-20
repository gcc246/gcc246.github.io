async function retrieve () {
    var url = `http://api.weatherapi.com/v1/forecast.json?key=7bed2218a1ac4b92ba5171814221705&q=Camarillo&days=2&aqi=yes&alerts=no`
    var req = new Request(url);
    
    const response = await fetch(req);
    const weatherData = await response.text();
    const weatherDataText = JSON.parse(weatherData)
    console.log(weatherDataText);
    // JSON parsing ^
    
    
   
    }
    retrieve();