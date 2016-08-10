var alexa = require('alexa-app');
var app = new alexa.app();
var getUrl = require('request');
/**
 * LaunchRequest.
 */
app.launch(function(request,response) {
	response.say('Resistance is futile');
	response.card("Hey there fancy pants!","This is an example card");
});


/**
 * IntentRequest.
 */
app.intent('OnIntent',
  {
    'utterances':[ 'turn the light on' ]
  },
  function(request,response) {
	  console.log('On intent');
	getUrl('https://e1c0e79f.ngrok.io/api/robots/omnius/commands/on', function(err, Response, body){
		console.log(Response);
		if(!err){
			console.log(body, Response);
			response.say('turning the light on, by your command');
			response.shouldEndSession(true);
			response.send();
		}else{
			console.log(body, Response);
			response.say('I encountered a problem');
			response.shouldEndSession(true);
			response.send();
		}
	});
	  return false;
  }
);
app.intent('OffIntent',
  {
    'utterances':[ 'turn the light off' ]
  },
  function(request,response) {
	  console.log('Off Intent');
	  getUrl("https://e1c0e79f.ngrok.io/api/robots/omnius/commands/off", function(err, Response, body){
		  console.log(Response);
	 	if(!err){
			console.log(body, Response);
			response.say('turning the light off, by your command');
			response.shouldEndSession(true);
			response.send();
		} else{
			console.log(body, Response);
			response.say('something went wrong');
			response.shouldEndSession(true);
			response.send();
		}
	  });
	return false;
  }
);

app.intent('EndIntent',
	function (request, response) {
		response.say('stopping, by your command');
		response.shouldEndSession(true);
		response.send();
		return false;
	});

/**
 * Error handler for any thrown errors.
 */
app.error = function(exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
