console.log("Hello World!");


midibus.access(function () {
  var xhReq = new XMLHttpRequest();
  xhReq.open("GET", "././midiTest.json", false); //Access midi as JSON
  xhReq.send(null);
  var jsonOutput = JSON.parse(xhReq.responseText);
  console.log("test: " + jsonOutput.tracks[0].notes[0].midi); //Outputs first note to test if opened correct


 //Connects Input Bus
  var bus = midibus.bus(midibus.inputs[0])

  console.log(midibus.inputs[0] , midibus.outputs[0]);

  console.log(bus);
  // destroyBus();
  function destroyBus() {
    console.log("Hej");
    bus.destroy()
  }

  console.log(bus);
  // console.log(midibus.inputs[0] , midibus.outputs[0]);
})
