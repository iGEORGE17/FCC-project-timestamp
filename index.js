// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var cors = require('cors');

// enable cors (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp", function (req, res) {
  const now = new Date();
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  let date_string = req.params.date_string;
  let userInput = new Date(date_string);

  if(userInput == "Invalid Date") {
    res.json({"error": "Invalid Date"})
  } else {
    res.json({
      "unix": userInput.getTime(),
      "utc":userInput.toUTCString()
    });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
