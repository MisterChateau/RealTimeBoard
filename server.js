/**
* Module requirements.
*/

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var path = require("path");

/**
* Configuration
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.set("port", 80);
app.set("view engine", "jade");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false });

/**
* Configuration
*/
app.get("/", function(req, res){
	res.render("index");
	}
);

app.post("/topic", function(req, res) {
	var msg = req.body.topic;
	io.sockets.emit("newTopic", msg);
});

http.listen(app.get("port"));