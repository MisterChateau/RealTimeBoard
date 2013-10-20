
//import Modules
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var path = require("path");

//Configure express app
//Set static file path
app.use(express.static(path.join(__dirname, 'public')));
//add JSON support
app.use(express.bodyParser());
//set port
app.set("port", 80);
//set view engine
app.set("view engine", "jade");
//set view directory
app.set("views", __dirname + "/views");

//configure routes
app.get("/", function(req, res){
	res.render("index");
	}
);

app.post("/topic", function(req, res) {
	var msg = req.body.topic;
	io.sockets.emit("newTopic", msg);
});

//start the server
http.listen(app.get("port"));