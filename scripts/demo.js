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

  let midiOutput = WebMidi.outputs[0];
  let channelOne = midiOutput.channels[1];
  let channelTwo = midiOutput.channels[2];
  let channelThree = midiOutput.channels[3];
  let channelFour = midiOutput.channels[4];
  let channelFive = midiOutput.channels[5];
  let channelSix = midiOutput.channels[6];
  let channelSeven = midiOutput.channels[7];
  let channelEight = midiOutput.channels[8];
  let channelNine = midiOutput.channels[9];
  let channelTen = midiOutput.channels[10];
  let channelEleven = midiOutput.channels[11];
  let channelTwelve = midiOutput.channels[12];
  let channelThirteen = midiOutput.channels[13];
  let channelFourteen = midiOutput.channels[14];
  let channelFifteen = midiOutput.channels[15];
  let channelSixteen = midiOutput.channels[16];

  //Plays the file
  for (var i = 0; i < jsonOutput.tracks[0].notes.length; i++) {
    if (i < jsonOutput.tracks[0].notes.length) {
      channelOne.playNote(jsonOutput.tracks[0].notes[i].name, {duration: jsonOutput.tracks[0].notes[i].duration*1000, attack: jsonOutput.tracks[0].notes[i].velocity, time: "+"+jsonOutput.tracks[0].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[1].notes.length) {
      channelTwo.playNote(jsonOutput.tracks[1].notes[i].name, {duration: jsonOutput.tracks[1].notes[i].duration*1000, attack: jsonOutput.tracks[1].notes[i].velocity, time: "+"+jsonOutput.tracks[1].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[2].notes.length) {
      channelThree.playNote(jsonOutput.tracks[2].notes[i].name, {duration: jsonOutput.tracks[2].notes[i].duration*1000, attack: jsonOutput.tracks[2].notes[i].velocity, time: "+"+jsonOutput.tracks[2].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[3].notes.length) {
      channelFour.playNote(jsonOutput.tracks[3].notes[i].name, {duration: jsonOutput.tracks[3].notes[i].duration*1000, attack: jsonOutput.tracks[3].notes[i].velocity, time: "+"+jsonOutput.tracks[3].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[4].notes.length) {
      channelFive.playNote(jsonOutput.tracks[4].notes[i].name, {duration: jsonOutput.tracks[4].notes[i].duration*1000, attack: jsonOutput.tracks[4].notes[i].velocity, time: "+"+jsonOutput.tracks[4].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[5].notes.length) {
      channelSix.playNote(jsonOutput.tracks[5].notes[i].name, {duration: jsonOutput.tracks[5].notes[i].duration*1000, attack: jsonOutput.tracks[5].notes[i].velocity, time: "+"+jsonOutput.tracks[5].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[6].notes.length) {
      channelSeven.playNote(jsonOutput.tracks[6].notes[i].name, {duration: jsonOutput.tracks[6].notes[i].duration*1000, attack: jsonOutput.tracks[6].notes[i].velocity, time: "+"+jsonOutput.tracks[6].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[7].notes.length) {
      channelEight.playNote(jsonOutput.tracks[7].notes[i].name, {duration: jsonOutput.tracks[7].notes[i].duration*1000, attack: jsonOutput.tracks[7].notes[i].velocity, time: "+"+jsonOutput.tracks[7].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[8].notes.length) {
      channelNine.playNote(jsonOutput.tracks[8].notes[i].name, {duration: jsonOutput.tracks[8].notes[i].duration*1000, attack: jsonOutput.tracks[8].notes[i].velocity, time: "+"+jsonOutput.tracks[8].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[9].notes.length) {
      channelTen.playNote(jsonOutput.tracks[9].notes[i].name, {duration: jsonOutput.tracks[9].notes[i].duration*1000, attack: jsonOutput.tracks[9].notes[i].velocity, time: "+"+jsonOutput.tracks[9].notes[i].time*1000});
    }
    if (i < jsonOutput.tracks[10].notes.length) {
      channelEleven.playNote(jsonOutput.tracks[10].notes[i].name, {duration: jsonOutput.tracks[10].notes[i].duration*1000, attack: jsonOutput.tracks[10].notes[i].velocity, time: "+"+jsonOutput.tracks[10].notes[i].time*1000});
    }
    // if (i < jsonOutput.tracks[11].notes.length) {
    //   channelTwelve.playNote(jsonOutput.tracks[11].notes[i].name, {duration: jsonOutput.tracks[11].notes[i].duration*1000, attack: jsonOutput.tracks[11].notes[i].velocity, time: "+"+jsonOutput.tracks[11].notes[i].time*1000});
    // }
    // if (i < jsonOutput.tracks[12].notes.length) {
    //   channelThirteen.playNote(jsonOutput.tracks[12].notes[i].name, {duration: jsonOutput.tracks[12].notes[i].duration*1000, attack: jsonOutput.tracks[12].notes[i].velocity, time: "+"+jsonOutput.tracks[12].notes[i].time*1000});
    // }
    // if (i < jsonOutput.tracks[13].notes.length) {
    //   channelFourteen.playNote(jsonOutput.tracks[13].notes[i].name, {duration: jsonOutput.tracks[13].notes[i].duration*1000, attack: jsonOutput.tracks[13].notes[i].velocity, time: "+"+jsonOutput.tracks[13].notes[i].time*1000});
    // }
    // if (i < jsonOutput.tracks[14].notes.length) {
    //   channelFifteen.playNote(jsonOutput.tracks[14].notes[i].name, {duration: jsonOutput.tracks[14].notes[i].duration*1000, attack: jsonOutput.tracks[14].notes[i].velocity, time: "+"+jsonOutput.tracks[14].notes[i].time*1000});
    // }
    // if (i < jsonOutput.tracks[15].notes.length) { 
    //   channelSixteen.playNote(jsonOutput.tracks[15].notes[i].name, {duration: jsonOutput.tracks[15].notes[i].duration*1000, attack: jsonOutput.tracks[15].notes[i].velocity, time: "+"+jsonOutput.tracks[15].notes[i].time*1000});
    // }
  }
}

//TODO: Fix track count to be dynamic

function disableWebMidi() {
  WebMidi.disable();
}