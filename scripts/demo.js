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

//Loads the JSON file
async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

//Plays the JSON file
async function playDemo(jsonURL) {
    
  let jsonOutput = await getData(jsonURL);
  console.log(jsonOutput.tracks);

  //Defining bus and channels
  let midiOutput = WebMidi.outputs[0];
  const channelArray = [
    midiOutput.channels[1], 
    midiOutput.channels[2],
    midiOutput.channels[3],
    midiOutput.channels[4],
    midiOutput.channels[5],
    midiOutput.channels[6],
    midiOutput.channels[7],
    midiOutput.channels[8],
    midiOutput.channels[9],
    midiOutput.channels[10],
    midiOutput.channels[11],
    midiOutput.channels[12],
    midiOutput.channels[13],
    midiOutput.channels[14],
    midiOutput.channels[15],
    midiOutput.channels[16]];

  //Finding out which track has the most notes
  let maxTrackLength = 0;
  for (let i = 0; i < jsonOutput.tracks.length; i++) {
    if (jsonOutput.tracks[i].notes.length > maxTrackLength) {
      maxTrackLength = jsonOutput.tracks[i].notes.length;
    }
  }

  //Playing the notes
  for (let j = 0; j < maxTrackLength; j++) {
    for (let i = 0; i < jsonOutput.tracks.length; i++) {
      if (j < jsonOutput.tracks[i].notes.length) {
        channelArray[i].playNote(jsonOutput.tracks[i].notes[j].name, {duration: jsonOutput.tracks[i].notes[j].duration*1000, attack: jsonOutput.tracks[i].notes[j].velocity, time: "+"+jsonOutput.tracks[i].notes[j].time*1000});
      }
    }
  }
}

function disableWebMidi() {
  WebMidi.disable();
}
