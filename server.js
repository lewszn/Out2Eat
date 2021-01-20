var express = require('express')
  , app = express();

// don't forget to set your environment variables on heroku!
var yelp = require("yelp").createClient({
  consumer_key: 'GgvlroOhB4Oa7JqRmxD1dA',
  consumer_secret: 'J0fG66rBTNT_TwimoYa8ZmD2iI8',
  token: '6_cj--NmfEeV8w5rxasoNN0TKkpt07sw',
  token_secret: '2kZJQTftiQDIKdZC0Qg2hvejLGA'
});

app.use(function(req, res, next) {
  // Null allows access from "file:///" urls. Set to your own domain to prevent abuse
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/search", function(req, res, next){

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search(req.query, function(error, data) {
    if(error){ res.status(400).send(error); }
    else { res.status(200).send(data); }
    next();
  });

})

app.get("/business/:id", function(req, res, next){

  // See http://www.yelp.com/developers/documentation/v2/business
  yelp.business(req.params.id, function(error, data) {
    if(error){ res.status(400).send(error); }
    else { res.status(200).send(data); }
    next();
  });

});

app.use("/", function(req, res, next) {
  // Null allows access from "file:///" urls. Set to your own domain to prevent abuse
  res.status(200).send('http://localhost:8080');
});


app.use(function(req, res, next) {
  res.status(404).send("something went wrong");
});

var port = process.env.PORT || 1234;
app.listen(port);

console.log("listening on port " + port);
