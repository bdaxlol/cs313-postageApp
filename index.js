var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getRate', function(request, response) {
	handleRate(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function handleRate(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));

	var mailType = requestUrl.query.mailType;
	var weight = Number(requestUrl.query.weight);

	lookupRate(response, mailType, weight);
}

function lookupRate(response, mailType, weight) {
	mailType = mailType.toLowerCase();

	var result = 0;

	if (mailType == "stamped" && weight <= 3.5) {
		if (weight <= 1) {
			result = 0.49;
		} else if (weight <= 2) {
			result = 0.7;
		} else if (weight <= 3) {
			result = 0.91;
		} else {
			result = 1.12;
		}
	} else if (mailType == "metered" && weight <= 3.5) {
		if (weight <= 1) {
			result = 0.46;
		} else if (weight <= 2) {
			result = 0.67;
		} else if (weight <= 3) {
			result = 0.88;
		} else {
			result = 1.09;
		}		
	} else if (mailType == "package") {
		if (weight <= 4) {
			result = 3;
		} else if (weight <= 5) {
			result = 3.16;
		} else if (weight <= 6) {
			result = 3.32;
		} else if (weight <= 7) {
			result = 3.48;
		} else if (weight <= 8) {
			result = 3.64;
		} else if (weight <= 9) {
			result = 3.80;
		} else if (weight <= 10) {
			result = 3.96;
		} else if (weight <= 11) {
			result = 4.19;
		} else if (weight <= 12) {
			result = 4.36;
		} else if (weight <= 13) {
			result = 4.53;
		}
	} else if (mailType == "large" || weight > 3.5) {
		if (weight <= 1) {
			result = 0.98;
		} else if (weight <= 2) {
			result = 1.19;
		} else if (weight <= 3) {
			result = 1.4;
		} else if (weight <= 4) {
			result = 1.61;
		} else if (weight <= 5) {
			result = 1.82;
		} else if (weight <= 6) {
			result = 2.03;
		} else if (weight <= 7) {
			result = 2.24;
		} else if (weight <= 8) {
			result = 2.45;
		} else if (weight <= 9) {
			result = 2.66;
		} else if (weight <= 10) {
			result = 2.87;
		} else if (weight <= 11) {
			result = 3.08;
		} else if (weight <= 12) {
			result = 3.29;
		} else if (weight <= 13) {
			result = 3.5;
		}
	} else {
		// Something unexpected happened
		result = 200;
	}

	var params = {mailType: mailType, weight: weight, result: result};

	response.render('pages/result', params);
}