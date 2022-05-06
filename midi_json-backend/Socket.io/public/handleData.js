
    var socket = io("http://localhost:3000")

    // simulate json from user, only check
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
     
// Onclick events (button submit)
function selectJson() {
    let selectValue = document.getElementById("select").value
    switch(selectValue) {
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

// listen from server and show data on screen to check
socket.on("send Json", function(data) {
    document.getElementById("messages").innerText =(JSON.stringify(data));
    window.scrollTo(0, document.body.scrollHeight);
});
     