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

async function getData(url) {
  const response = await fetch(url);

  return response.json();
}

//Loads and plays the JSON file
async function playDemo(jsonURL) {
    
  let jsonOutput = await getData("JSON/all_star.json");
  console.log(jsonOutput.tracks);

  //Plays the file
  for (var i = 0; i < jsonOutput.tracks[0].notes.length; i++) {
    let midiOutput = WebMidi.outputs[0];
    let channelOne = midiOutput.channels[1];
    // let channelTwo = midiOutput.channels[2];
    // let channelThree = midiOutput.channels[3];
    // let channelFour = midiOutput.channels[4];
    // let channelFive = midiOutput.channels[5];
    // let channelSix = midiOutput.channels[6];
    // let channelSeven = midiOutput.channels[7];
    // let channelEight = midiOutput.channels[8];
    channelOne.playNote(jsonOutput.tracks[0].notes[i].name, {duration: jsonOutput.tracks[0].notes[i].duration*1000, attack: jsonOutput.tracks[0].notes[i].velocity, time: "+"+jsonOutput.tracks[0].notes[i].time*1000});
    // channelTwo.playNote(jsonOutput.tracks[1].notes[i].name, {duration: jsonOutput.tracks[1].notes[i].duration*1000, attack: jsonOutput.tracks[1].notes[i].velocity, time: "+"+jsonOutput.tracks[1].notes[i].time*1000});
    // channelThree.playNote(jsonOutput.tracks[2].notes[i].name, {duration: jsonOutput.tracks[2].notes[i].duration*1000, attack: jsonOutput.tracks[2].notes[i].velocity, time: "+"+jsonOutput.tracks[2].notes[i].time*1000});
    // channelFour.playNote(jsonOutput.tracks[3].notes[i].name, {duration: jsonOutput.tracks[3].notes[i].duration*1000, attack: jsonOutput.tracks[3].notes[i].velocity, time: "+"+jsonOutput.tracks[3].notes[i].time*1000});
    // channelFive.playNote(jsonOutput.tracks[4].notes[i].name, {duration: jsonOutput.tracks[4].notes[i].duration*1000, attack: jsonOutput.tracks[4].notes[i].velocity, time: "+"+jsonOutput.tracks[4].notes[i].time*1000});
    // channelSix.playNote(jsonOutput.tracks[5].notes[i].name, {duration: jsonOutput.tracks[5].notes[i].duration*1000, attack: jsonOutput.tracks[5].notes[i].velocity, time: "+"+jsonOutput.tracks[5].notes[i].time*1000});
    // channelSeven.playNote(jsonOutput.tracks[6].notes[i].name, {duration: jsonOutput.tracks[6].notes[i].duration*1000, attack: jsonOutput.tracks[6].notes[i].velocity, time: "+"+jsonOutput.tracks[6].notes[i].time*1000});
    // channelEight.playNote(jsonOutput.tracks[7].notes[i].name, {duration: jsonOutput.tracks[7].notes[i].duration*1000, attack: jsonOutput.tracks[7].notes[i].velocity, time: "+"+jsonOutput.tracks[7].notes[i].time*1000});
    // console.log(jsonOutput.tracks[7].notes[i].name);
  }
}

function disableWebMidi() {
  WebMidi.disable();
}