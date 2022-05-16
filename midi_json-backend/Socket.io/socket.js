var express = require('express');
var app = express()
app.use(express.static("scripts"))
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var trackArray = []
io.on("connection", function(socket) {     
	console.log('a user connected,'+' id:' + socket.id)  // check connect
	socket.on('sendClientMidi', function(data){  // listen client
		console.log(trackArray.length);
		for (let i = 0; i < trackArray.length; i++) {
			console.log(data[0]);
			// if (data[0] === trackArray[i][0]) {
			// 	trackArray.splice(i, 1);
			// }
			// if (i === trackArray.length-1) {
			// 	console.log("Before: " + data);
			// 	data = [];
			// 	console.log("After: " + data);
			// }
		}
		
		trackArray.push(data);

		// console.log(trackArray)
		setTimeout(() => {io.sockets.emit('sendServerMidi', trackArray)}, 2000)
		//setTimeout(() => {trackArray=[]}, 12000)  // delete arrays elementes
	});
});
 
// Render to web (socket.html) to communicate
app.get('/', function(req, res){
	res.sendFile(__dirname + '/PlayJSON.html');
});

http.listen(port, function(){
	console.log(`App listening at http://localhost:${port}`)
});

