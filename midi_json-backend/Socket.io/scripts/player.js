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

var test;

socket.on("sendServerMidi", function(data) {
  test = data;
});

//  Plays the JSON file
async function playDemo() {
    
  let outputBus = getTextBox("playBus") - 1;
  let playArray = test;

  console.log(playArray);

  //Defining bus and channels
  let midiOutput = WebMidi.outputs[outputBus];

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
  for (let i = 0; i < playArray.length; i++) {
    if (playArray[i].length > maxTrackLength) {
      maxTrackLength = playArray[i].length;
    }
  }

  //  Playing the notes
  for (let j = 0; j <= 16; j++) {
    if (playArray[j] !== undefined) {
      for (let i = 1; i < playArray[j].length; i++) {
        if (j < playArray[j].length) {
          channelArray[playArray[j][0]-1].playNote(playArray[j][i].name, {duration: playArray[j][i].duration, time: "+"+playArray[j][i].startTime, attack: playArray[j][i].velocity});
        }
      }
    }
  }
  await sleep(4000);
  if (something === 1) {
    console.log("Hi");
    generateMidi();
    something = 0;
  }
  playDemo();
}

function disableWebMidi() {
  WebMidi.disable();
}