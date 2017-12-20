module.change_code = 1;
'use strict';

var weather = require('weather-js');
var alexa = require('alexa-app');
var app = new alexa.app('hello_world');


app.launch( function(request, response) {
	response.say('Welcome to your alexa skill')
	.reprompt('Ask alexa to say hello world!')
	.shouldEndSession(false);
} );


app.error = function(exception, request, response) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say('Sorry an error occured ' + error.message);
};

app.intent('sayHelloWorld',
  {
    "utterances":[ 
		"say hello world",
		"tell me hello world"]
  },
  function(request,response) {
    response.say("Hello, world!");
  }
);

app.intent('sayWeather',
  {
  	"slots" : {"city" : "AMAZON.US_CITY"},
    "utterances":[ 
		"what is the weather in {- | city}",
		"tell me the weather in {- | city}",
		"how is the weather in {- | city}"]
  },
  function(request,response) {
  	var city = request.slot("city");

  	weather.find({search: city, degreeType: 'C'}, function(err, result) {
  		if(err) {
  			console.log(err);
  		}
 
  		// console.log(JSON.stringify(result, null, 2));
  		// var forecast = JSON.parse(result);
		console.log("forecast: ");
  		console.log(result[1].current.temperature);
  		var forecast = result[1].current.temperature
  		response.say("The weather in " + city + " is " + forecast + " degrees celsius");
	});

    
  }
);

module.exports = app;