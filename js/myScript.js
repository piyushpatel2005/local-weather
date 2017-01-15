function getLocationInfo(weatherString) {
  $.getJSON(weatherString, function (data) {
    temperature = data['main']['temp'];
    $(".temperature").text(temperature);
    var location = data['name'] + ", " + data['sys']['country'];
    $("#location").text(location);
    // Clear 
    // Clouds   - color white
    // smoke   - color white
    // Rain    - Color white
    var weather = data['weather'][0]['main'];
    getImage(weather);
    // clear sky
    // overcast clouds
    // few clouds
    // broken clouds
    // clear sky
    var weatherText = data['weather'][0]['description'];
    $("#weather").text(weatherText);
    $(".humidity").text(data['main']['humidity']);
    getDetailedWeather(temperature, weatherText);
  })
}

function getUserWeatherInfo () {
  $.getJSON("https://geoip-db.com/json", function (data) {
    userLat = data['latitude'];
    userLon = data['longitude'];
    weatherString = "http://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLon + "&units=metric&appid=a5f68db00bb4fd42eeb47978b6b1d5c3";
    getLocationInfo(weatherString);
  });
}

function getFahrenheit(centigrade) {
	// To convert centigrade to fahrenheit
	var fahrenheit = centigrade * 9 / 5 + 32;
	$(".temperature").text(fahrenheit);
}

function getImage(weather) {
	weather = weather.toLowerCase();
	// $("body").css("background", "linear-gradient(to bottom, transparent, #777),  url('img/" + weather + ".jpg')");
	// $("body").css("background-size", "cover");
	// $("body").css("color", "#fff");
	$("body").css({
		"background": "-webkit-linear-gradient(bottom right, transparent, #6B0BCA), url('img/" + weather + ".jpg') no-repeat",
		"background": "-o-linear-gradient(bottom right, transparent, #6B0BCA), url('img/" + weather + ".jpg')",
		"background": "-moz-linear-gradient(bottom right, transparent, #6B0BCA), url('img/" + weather + ".jpg')",
		"background": "linear-gradient(to bottom right, transparent 0%, #6B0BCA),  url('img/" + weather + ".jpg') no-repeat",
		"height": "100vh",
		"background-repeat": "no-repeat",
		"-webkit-background-size": "cover",
		"-o-background-size": "cover",
		"-moz-background-size": "cover",
		"background-size": "cover"
	});
	console.log("in getimage");
}

function getDetailedWeather(temperature, weatherText) {
	var description = "";
	if(weatherText.search("smoke") > -1) {
		description += "The weather looks smoky and dull. ";
	} else if (weatherText.search("cloud") > -1) {
		description += "There is possibility of clouds, so make sure you take your umbrella with you. It is very dull weather. ";
	} else if (weatherText.search("rain") > -1) {
		description += "It is likely to rain today, so take your rain coat and make sure you do not get wet. ";
	} else if (weatherText.search("clear") > -1) {
		description += "The sky is clear and beautiful. You can go out and enjoy this beautiful day. ";
	} else if(weatherText.search("snow") > -1) {
		description += "There is possiblity of snowfall. Make sure to put on your snow shoes and put on more layers to stay warm. "
	} else {
		description += "Limited data available for today's weather. ";
	}

	if(temperature < 0 ) {
		description += "It is extremely cold outside. Stay covered to feel comfortable. ";
	} else if(temperature < 10) {
		description += "It is very cold outside. ";
	} else if(temperature >=10 && temperature < 28 && weatherText.search("cloud") != -1) {
		description += "It is a pleasant atmosphere. Go out and enjoy the day. "
	} else if (temperature >= 28) {
		description += "It's very hot outside so we advise you to stay well hydrated! ";
	}

	$(".detailed-weather-report").append(description);
}


$(document).ready(function () {
	getUserWeatherInfo();
	$("#fahrenheit").click(function () {
		getFahrenheit(temperature);
	});
	$("#centigrade").click(function () {
		$(".temperature").text(temperature);
	})
})
