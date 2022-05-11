var socket = io("http://localhost:3000")

var userName=''
var roomChoose=''

// Don't use in project
// Delete all these variables in project
var json1 = {"input1":{
    "duration": 0.8023255813953488,
    "durationTicks": 69,
    "midi": 97,
    "name": "C#7",
    "ticks": 0,
    "time": 0,
    "velocity": 0.5039370078740157
  }}
var json2 = {"input2":{
    "duration": 1.0465116279069768,
    "durationTicks": 90,
    "midi": 99,
    "name": "D#7",
    "ticks": 7,
    "time": 0.08139534883720931,
    "velocity": 0.5511811023622047
  }}
var json3 = {"input3":{
    "duration": 0.18604651162790695,
    "durationTicks": 16,
    "midi": 103,
    "name": "G7",
    "ticks": 15,
    "time": 0.1744186046511628,
    "velocity": 0.5196850393700787
  }}
var json4 = {"input4":{
    "duration": 0.1046511627906977,
    "durationTicks": 9,
    "midi": 103,
    "name": "G7",
    "ticks": 32,
    "time": 0.37209302325581395,
    "velocity": 0.33070866141732286
  }}
var json5 = {"input5":{
    "duration": 0.6627906976744186,
    "durationTicks": 57,
    "midi": 101,
    "name": "F7",
    "ticks": 38,
    "time": 0.4418604651162791,
    "velocity": 0.4566929133858268
  }}
var json6 = {"input6":{
    "duration": 0.2209302325581396,
    "durationTicks": 19,
    "midi": 103,
    "name": "G7",
    "ticks": 42,
    "time": 0.4883720930232558,
    "velocity": 0.2204724409448819
  }}
var json7 = {"input7":{
    "duration": 0.046511627906976716,
    "durationTicks": 4,
    "midi": 103,
    "name": "G7",
    "ticks": 65,
    "time": 0.7558139534883721,
    "velocity": 0.07086614173228346
  }}
var json8 = {"input8":{
    "duration": 0.2209302325581457,
    "durationTicks": 13,
    "midi": 103,
    "name": "G7",
    "ticks": 42,
    "time": 0.4883720930232558,
    "velocity": 0.2204724409448819
  }}

// Choose json, only check 
// In project only use commando (socket.emit ("send Json", json1))
// to send midi data to server
// "send Json" adjust accordingly (fx. "send midi to server")
// json1 is replaced midi data

function selectJson(json) {
switch(json) {
 case '1':  
   socket.emit("send Json", json1);
   break
 case '2':  
   socket.emit("send Json", json2);
   break
 case '3':  
   socket.emit("send Json", json3);
   break
 case '4':  
   socket.emit("send Json", json4);
   break
 case '5':  
   socket.emit("send Json", json5);
   break
 case '6':  
   socket.emit("send Json", json6);
   break
 case '7':  
   socket.emit("send Json", json7);
   break
 case '8':  
   socket.emit("send Json", json8);
   break
 }
}

// Alert choose room
socket.on("alert choose room", () => {alert("Please choose room!")})

// listen from server and show data on screen to check 
// In project use this but don't must show
socket.on("send Json to client", function(data) {
// In project midi array received her (data)
// Data is handled in this function
console.log(data)
  document.getElementById("messages").innerText =(JSON.stringify(data)); //(this line don't use in project)
});

// Choose json in the list to check
// Don't use this function in project (delete)
function SelectBox(obj){
  var options = obj.children;
  var choosejson = '';
  for (var i = 0; i < options.length; i++){
      if (options[i].selected){
          choosejson   += options[i].value
console.log(choosejson)
          selectJson(choosejson)
      }
  }
}

// Hide button play music and chat in room
function hideChatRoom(t) {
    document.getElementById("boxMessage1").style.display = t
}
hideChatRoom("none")

 // Hide chat with all users
function hideChatAll(t) {
    document.getElementById("boxMessage").style.display = t
}
hideChatAll("none")

// Client register and send data to server
var buttonRegister = document.getElementById("btnRegister");
buttonRegister.onclick = function(){
    var textContent = document.getElementById("textName").value
    userName=textContent
    if(textContent=='') {
        alert('Please input your name!')
    } else {
        // Send data to server
        socket.emit('client send username', textContent)
        document.getElementById("textName").value='' 
    }
}

// Receive failed register from server
socket.on("register failure", function(){
    alert('User exists!!!')
})


// Receive success register from server
socket.on("register success", function(data) {
    document.getElementById("currentUser").innerText = data +"!"
    document.getElementById("btnLogout").removeAttribute("disabled")
    document.getElementById("btnChat").removeAttribute("disabled")
    document.getElementById("nameRoom").removeAttribute("disabled")
    document.getElementById("btnCreateRoom").removeAttribute("disabled")
    document.getElementById("btnRegister").disabled="disabled"
})

// Client login and send data to server
var buttonLogin = document.getElementById("btnLogin");
buttonLogin.onclick = function(){
    var textContent = document.getElementById("textName").value
    userName=textContent
    if(textContent=='') {
        alert('Please input your name!')
    } else {
        // Send data to server
        socket.emit('client send login', textContent) 
        document.getElementById("textName").value=''
    }
}

// Log out and send data to server
var buttonLogout = document.getElementById("btnLogout");
buttonLogout.onclick = function(){
    // Send data to server
    socket.emit('logout') 
    window.location.reload()
}

// Receive list of users from server and show them in screen
socket.on("server send list users", function(data1, data2) {
    var boxUsers = document.getElementById("boxContent")
    boxUsers.innerText =''
    let numberOnline = data1.length
    // Show list of users
    document.getElementById("numberOnline").innerText = ': '+ numberOnline
    data1.forEach(function(user) {
        boxUsers.innerHTML +=`${user}\n`
    })
    // Show list of rooms
    let listRoom = document.getElementById("listRoom")
    listRoom.innerText =''
    let numberRoom = data2.length
    for (let i = 0; i<numberRoom; i++){
        var opt = document.createElement('option')
        opt.value = data2[i].nameRoom
        opt.innerHTML = data2[i].nameRoom
        listRoom.appendChild(opt)
    }
})

// Receive updating list of users efter client logout
socket.on("server update list users", function(data) {
    var boxUsers = document.getElementById("boxContent")
    boxUsers.innerText =''
    let numberOnline = data.length
    document.getElementById("numberOnline").innerText = ': '+ numberOnline
    data.forEach(function(i) {
    boxUsers.innerHTML +=`${i}\n`
   })
})

// Create new room and send data to server
var buttonCreateRoom = document.getElementById("btnCreateRoom");
buttonCreateRoom.onclick = function(){
var textContent = document.getElementById("nameRoom").value
    roomChoose=textContent
    if(textContent=='') {
        alert('Please input Rooms name!')
    } else {
        // Send data to server
        socket.emit('client send roomName', textContent) 
        document.getElementById("nameRoom").value=''
    }
}

// Receive creating room from server
socket.on("server send rooms", function(data) {
    let listRoom = document.getElementById("listRoom")
    listRoom.innerText =''
    let numberRoom = data.length
    // Show them in screen
    for (let i = 0; i<numberRoom; i++){
        var opt = document.createElement('option')
        opt.value = data[i].nameRoom
        opt.innerHTML = data[i].nameRoom
        listRoom.appendChild(opt)
    }
})

// Receive send rooms to client from server
socket.on("server send rooms to client", function(data) {
  
console.log(data)
    let numberRoom = data.length
    let roomIn = document.getElementById("currentRoom")
    let numberUser=document.getElementById("roomNow")
    let listRoom=document.getElementById("contentRoom")
    numberUser.innerText=''
    listRoom.innerText =''
    document.getElementById("btnChatMusic").removeAttribute("disabled")
    document.getElementById("logoutRoom").removeAttribute("disabled")
    for (var i = 0; i<numberRoom; i++){
console.log(data[i].nameRoom)     
        if((data[i].nameUser).includes(userName)) {
            roomIn.innerText=': ' + data[i].nameRoom
            numberUser.innerText=': '+ '1'
            listRoom.innerText +=  `${(data[i].nameUser)}\n`
        }
    }
})

// Receive room exists from server
socket.on("room exists", function() {
    alert('Room exists!')
})

// Choose room from the list and send it to server
function validateSelectBox(obj){
    var options = obj.children;
    var chooseRoom = '';
    for (var i = 0; i < options.length; i++){
        if (options[i].selected){
            chooseRoom   += options[i].value
            document.getElementById("currentRoom").innerText =': ' + chooseRoom
            roomChoose=chooseRoom
            // Send data to server
            socket.emit("client sent choose room", chooseRoom, userName)
        }
    }
    document.getElementById("logoutRoom").removeAttribute("disabled")
    document.getElementById("btnChatMusic").removeAttribute("disabled")
}

// Receive choosing room from server
socket.on("server send choose room", function(data){
    let usersRoom = (data.nameUser).length
    let boxRoom = document.getElementById("contentRoom")
    boxRoom.innerText =''
     document.getElementById("roomNow").innerText = ': '+ usersRoom
     for (var i = 0; i<usersRoom; i++){
          boxRoom.innerHTML += `${(data.nameUser)[i]}\n`
    }
})

// Log out room and send data to server
var buttonLogoutRoom = document.getElementById("logoutRoom");
buttonLogoutRoom.onclick = function(){
    // Send data to server
    socket.emit('logoutRoom', roomChoose) 
    buttonLogoutRoom.disabled="disabled"
    document.getElementById("roomNow").innerText=''
    document.getElementById("contentRoom").innerText=''
    document.getElementById("currentRoom").innerText=''
    document.getElementById("listMessage").innerText=''
    document.getElementById("currentStatus").innerText=''
    document.getElementById("btnChatMusic").disabled="disabled"
    hideChatRoom("none")
}

// Receive update room from server
socket.on("server send update room", function(data) {
    let usersRoom = (data).length
    let boxRoom = document.getElementById("contentRoom")
    boxRoom.innerText =''
    document.getElementById("roomNow").innerText = ': '+ usersRoom
     for (var i = 0; i<usersRoom; i++){
        boxRoom.innerHTML += `${data[i]}\n`
    }
})

// Button chat with all users
var buttonChatAll = document.getElementById("btnChat");
buttonChatAll.onclick = function(){
    document.getElementById("currentStatus").innerText = " with all users!"
    document.getElementById("message").removeAttribute("disabled")
    document.getElementById("btnSend").removeAttribute("disabled")
    document.getElementById("listMessage").innerText=''
    hideChatAll('')  
    hideChatRoom("none")   
}
 
// Send message chat with all to server
var buttonSend = document.getElementById("btnSend");
buttonSend.onclick = function(){
    var message = document.getElementById("message").value    
    if(message=='') {
        alert('Please write message!')
    } else { 
        // Send message to server
        socket.emit('client send message', message) 
        document.getElementById("message").value =''
    }
}

// Receive data chat with all from server
socket.on('server send message', function(data) {
    var messages = document.getElementById("listMessage")
    messages.innerHTML +=`${data.un}: ${data.txt}\n`
})

// Button chat in room 
var buttonChatPlay = document.getElementById("btnChatMusic");
buttonChatPlay.onclick = function(){
    document.getElementById("currentStatus").innerText = " in room!"
    document.getElementById("message1").removeAttribute("disabled")
    document.getElementById("btnSend1").removeAttribute("disabled")
    document.getElementById("listMessage").innerText=''
    hideChatAll('none') 
    hideChatRoom("")   
}

// Send message chat in room to server
var buttonSend = document.getElementById("btnSend1");
buttonSend.onclick = function(){
    var message = document.getElementById("message1").value    
    if(message=='') {
        alert('Please write message!')
    } else { 
        // Send message to server
        socket.emit('send message in room', message, `${roomChoose}`) 
        document.getElementById("message1").value =''
    }
}

// Receive data chat in room from server
socket.on('server send message in room', function(data) {
    var messages = document.getElementById("listMessage")
    messages.innerHTML +=`${data.un}: ${data.txt}\n`
})















