var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var middleware = require('socketio-wildcard')();

var port = process.env.PORT || 9000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.use(middleware);

var i = 0;

io.on('connection', function(socket) {
	i-=-1;
	console.log("conecction: " + i);
  socket.on('*', function(){ 
		io.emit('chat message', msg);
	});
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});