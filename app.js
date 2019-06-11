var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req,res){
	res.render("search");
});

app.get("/results", function(req, res, next){
	var name = req.query.name;
	var url = "http://www.omdbapi.com/?s=" + name + "&apikey=thewdb";
	request(url, function (error, response, body){
		if(error) return next(error);
		if(!error && response.statusCode == 200){
			var parsedata = JSON.parse(body);
			console.log(parsedata);
			if(parsedata.Response.toLowerCase() !== 'false'){
				res.render("results", {parsedata:parsedata});
			}else{
				res.send("Couldn't find the movie, please be more specific");
			}
		}
	});
});

app.get("*", function(req,res){
	res.send('Movie Not Found');
});

app.listen(3000, function(){
	console.log('server running');
});