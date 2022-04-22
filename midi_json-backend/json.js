
// Demo program about processing json in backend
var express = require('express');
var app = express();
var fs = require("fs");
const port = 3000

// create temporary file
let tempfile = "";
import('tempfile').then(a => {
    tempfile = a.default;
});

let input = tempfile
var user1 = {
   input1 : {
      "ticks": 1921,
      "time": 12.806666666666667,
      "value": 0.0322265625
   }
}

var user2 = {
   input2 : {
      "ticks": 1937,
      "time": 12.913333333333334,
      "value": 0.0966796875
   }
}
var user3 = {
   input3 : {
      "ticks": 2280,
      "time": 15.200000000000001,
      "value": 0.9998779296875
   }
}

var user4 = {
   input4 : {
      "ticks": 2399,
      "time": 15.993333333333334,
      "value": 0.2579345703125
   }
}
var user5 = {
   input5 : {
      "ticks": 2524,
      "time": 16.826666666666668,
      "value": 0.0322265625
   }
}
var user6 = {
   input6 : {
      "ticks": 2718,
      "time": 18.12,
      "value": 0.4837646484375
   }
}

app.get('/users', function (req, res) {
   fs.readFile( "input", 'utf8', function (err, data) {
      data = Object.assign(user1, user2, user3, user4, user5, user6);
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

app.listen(port, () =>{
 console.log(`App listening at http://localhost:${port}`)
})