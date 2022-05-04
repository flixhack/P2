function enableWebMidi() {
  WebMidi.enable()
  .then(() => console.log("WebMIDI Enabled"));
 }

// Prints MIDI-IOs to console
function logMidiIO() {
  //  Inputs
  WebMidi.inputs.forEach(input => console.log("Input: " + input.manufacturer, input.name));

  //  Outputs
  WebMidi.outputs.forEach(output => console.log("Output: " + output.manufacturer, output.name));
}

//  Loads the JSON file
async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function sortNoteOnAndOff() {
  for (let i = 1; i < (globalArray[0].events - 2).length; i++) {
    
  }
}

//Pairing note-on and note-off events
function pairNoteOnAndOff(noteOnArray, noteOffArray) {
  for (let i = 1; i < (globalArray[0].events - 2).length; i++) {
    
  }
}

//  Plays the JSON file
async function playDemo(jsonURL) {
    
  let jsonOutput = globalArray;

console.log("Blah\n");  
console.log(jsonOutput[0].events[1]);
console.log(jsonOutput[1].events.length);

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

  //  Finding out which track has the most notes
  let maxTrackLength = 0;
  for (let i = 1; i < jsonOutput[1].events.length - 1; i++) {
    if (jsonOutput[1].events[i].length > maxTrackLength) {
      maxTrackLength = jsonOutput[1].events[i].length;
    }
  }

  //  Playing the notes
  for (let j = 1; j < 2; j++) {
    for (let i = 0; i < jsonOutput[1].events.length - 1; i++) {
      if (j < jsonOutput[1].events[i].length) {
        let duration = jsonOutput[1].events[i].duration;
        channelArray[i].playNote(jsonoutput[1].events[i].pitch, jsonoutput[1].events[i].time, jsonoutput[1].events[i][j].duration);
        channelArray[i].playNote(jsonOutput.tracks[i].notes[j].name, {duration: jsonOutput.tracks[i].notes[j].duration*1000, attack: jsonOutput.tracks[i].notes[j].velocity, time: "+"+jsonOutput.tracks[i].notes[j].time*1000});
      }
    }
  }
}

function disableWebMidi() {
  WebMidi.disable();
}
