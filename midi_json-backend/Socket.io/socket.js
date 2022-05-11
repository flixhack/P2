var express = require('express')
var app = express()
app.use(express.static("public"))

var http = require('http').createServer(app)
var io = require('socket.io')(http);
var port = 3000

var arrayJason = []
var arrayUser = []
var arrayRoom = []
var listRoom = []

function RoomData(nameRoom, nameUser, admin) {
	this.nameRoom = nameRoom
	this.nameUser = nameUser
	this.admin = admin
}

io.on("connection", function(socket) {     
	console.log('a user connected,'+' id:' + socket.id)  // check connect

	// Receive register from client and check data
	socket.on('client send username', function(data) {
		socket.Username=data
		if(arrayUser.indexOf(data)>= 0) {
			// Send data to client
			socket.emit("register failure")
		} else {
			arrayUser.push(data)
			// Send data to clients
			socket.emit("register success", data)
			io.sockets.emit("server send list users", arrayUser, arrayRoom)
		}
	})

	// Receive login from client
	socket.on('client send login', function(data) {
		socket.Username=data
		if(arrayUser.indexOf(data)>= 0) {
			// Send data to clients
			socket.emit("register success", data)
			io.sockets.emit("server send list users", arrayUser, arrayRoom)
		}
	})
	 // Receive logout 		
	socket.on('logout', function() {
		arrayUser.splice(arrayUser.indexOf(socket.Username), 1)
		io.sockets.emit('server update list users', arrayUser)
	})
	
	// Receive creating new room from client 
	socket.on('client send roomName', function(data){
		socket.join(data)
		socket.room=data
		if(listRoom.length==0) {
			listRoom.push(data)
			arrayRoom.push(
			new RoomData(socket.room, [socket.Username], socket.Username))
			// Send data to client
			socket.emit("server send rooms to client", arrayRoom)
			io.sockets.emit("server send rooms",arrayRoom)
		}else {
			if (listRoom.indexOf(data)>= 0){
				socket.emit("room exists")
			} else {
				listRoom.push(data)
				arrayRoom.push(
				new RoomData(socket.room, [socket.Username], socket.Username))
				// Send data to client
				socket.emit("server send rooms to client", arrayRoom)
				io.sockets.emit("server send rooms",arrayRoom)
			}
		}
	})

	// Receive choose room from client
	socket.on("client sent choose room", function(data1, data2) {
		socket.join(data1)
		socket.room=data1
		for(let i=0; i<arrayRoom.length ; i++){
			if(arrayRoom[i].nameRoom==data1) {
				if(arrayRoom[i].nameUser.indexOf(data2)>= 0) {
					io.sockets.in(socket.room).emit("server send choose room", arrayRoom[i])
					break
				} else {
					arrayRoom[i].nameUser.push(data2)
					io.sockets.in(socket.room).emit("server send choose room", arrayRoom[i])
					break
				}
			}
		}
	})

	// Receive logout room from client
	socket.on('logoutRoom', function(data) {
		arrayRoom.find(function(room) {
			if(room.nameRoom==data) {
				room.nameUser.splice((room.nameUser).indexOf(socket.Username), 1)
				io.sockets.in(data).emit("server send update room", room.nameUser)
			}
		})
		socket.leave(data)
	})

	// Receive message chat with all from client
	socket.on('client send message', function(data) {
	// Send data to client
	io.sockets.emit('server send message', {un: socket.Username, txt: data})
	})

	// Receive message chat in room from client
	socket.on('send message in room', function(data1, data2) {
	// Send data to client
	io.sockets.in(data2).emit('server send message in room', {un: socket.Username, txt: data1})
	})	
	
	// Server receive midi data and synchronous them in array "arrayJason"
	// Array midi "arrayJason" is sended to client 
	socket.on('send Json', function(data){  
		room = socket.room
		if(room!=undefined) {
			for(let i=0; i<arrayRoom.length ; i++){
				if(arrayRoom[i].nameRoom==room) {
					if(arrayRoom[i].nameUser.indexOf(socket.Username)>= 0) {
						arrayJason.push(data) 
						function sendData(r,arr) {
							io.sockets.to(r).emit("send Json to client", arr);
						}
						setTimeout(sendData, 6000, room, arrayJason);
						setTimeout(() => {arrayJason=[]}, 10000)
						break
					} else {
						socket.emit("alert choose room")
						break
					}
				}
			}
		} else {socket.emit("alert choose room")}
	})
})

// Render to web (thu.html) to communicate with client
app.get('/', function(req, res){
	res.sendFile(__dirname + '/socket.html');
});

http.listen(port, function(){
	console.log(`App listening at http://localhost:${port}`)
});

