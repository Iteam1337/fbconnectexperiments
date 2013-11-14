var express = require("express");
var app = express();

app.use('/', express.static(__dirname + '/'));

app.get('/fbdetails', function(req, res) {
	res.json({
		fbId: process.env.FB_APP_ID,
		fbSecret: process.env.FB_APP_SECRET,
		fbUrl: process.env.FB_APP_URL
	});
});

var port = process.env.PORT || 5678;
app.listen(port);

console.log("Listening to", port);