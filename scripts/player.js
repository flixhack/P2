 var queueRecordVar = 0;

// Prints MIDI-IOs to console
function logMidiIO() {
  //  Inputs
  WebMidi.inputs.forEach(input => console.log("Input: " + input.manufacturer, input.name));
  //  Outputs
  WebMidi.outputs.forEach(output => console.log("Output: " + output.manufacturer, output.name));
}

var toggleLoop = 0;

function togglePlay() {
  if (toggleLoop === 0) {
    toggleLoop = 1;
    play();

    toggleMetronome = 1;
    metronome();}
  else if (toggleLoop === 1) {toggleLoop = 0; toggleMetronome = 0;}
}

var serverMidiData;

socket.on("sendServerMidi", function(data) {
  serverMidiData = data;
});

//  Plays the JSON file
async function play() {

  var Score = new ScoreInfo(getTextBox("bpm"), getTextBox("timeSignatureTop"), getTextBox("timeSignatureBottom"), getTextBox("numberOfBarsToRecord"), getTextBox("countInCount"));  
  let outputBus = getTextBox("playBus") - 1;
  let playArray = serverMidiData;

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
  await sleep(calculateTimePerQuarterNote(Score.bpm)*Score.timeSignatureTop*Score.numberOfBarsToRecord);
  if (queueRecordVar === 1) {
    generateMidi(0);
    console.log("Hey!");
    queueRecordVar = 0;
  }
  if (toggleLoop === 1) {
    play();
  }
}

function metronome() {
  WebMidi.enable()
  .then(onEnabled);

  async function onEnabled() {
    let midiOutput = WebMidi.outputs[1];
    const channelArray = [
    midiOutput.channels[16]];
    metronomeClick(channelArray);
  }
} 

async function metronomeClick(channelArray) {
  while (toggleMetronome === 1) {
    for (let i = 1; i <= getTextBox("timeSignatureTop"); i++) {
      if (i === 1) {
        channelArray[0].playNote("C4", {duration: 100, time: "+"+0});
      }
      else {
        channelArray[0].playNote("C3", {duration: 100, time: "+"+0});
      }
      await sleep(calculateTimePerQuarterNote(getTextBox("bpm")));
    }
  }
}

function queueRecord() {
  queueRecordVar = 1;
}