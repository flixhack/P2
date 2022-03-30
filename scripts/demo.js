function enableWebMidi() {
  WebMidi.enable()
  .then(() => console.log("WebMIDI Enabled"));
  }

function logMidiIO() {
  // Inputs
  WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));

  // Outputs
  WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));
}

//Loads and plays the JSON file
function playDemo(jsonURL) {

  //Loads the JSON file
  var xhReq = new XMLHttpRequest();
  xhReq.open("GET", jsonURL, false);
  xhReq.send(null); 
  var jsonOutput = JSON.parse(xhReq.responseText);
  console.log("test: " + jsonOutput.tracks[0].notes[0].midi);

  //Plays the file
  for (var i = 0; i < jsonOutput.tracks[0].notes.length; i++) {
    let midiOutput = WebMidi.outputs[0];
    let channelOne = midiOutput.channels[1];
    channelOne.playNote(jsonOutput.tracks[0].notes[i].name, {duration: jsonOutput.tracks[0].notes[i].duration*1000, attack: jsonOutput.tracks[0].notes[i].velocity, time: "+"+jsonOutput.tracks[0].notes[i].time*1000});
  }
}

function disableWebMidi() {
  WebMidi.disable();
}