var queueRecordVar = 0;
var serverMidiData;
var toggleLoop = 0;

// Prints MIDI-IOs to console
function logMidiIO() {
  //  Inputs
  WebMidi.inputs.forEach(input => console.log("Input: " + input.manufacturer, input.name));
  //  Outputs
  WebMidi.outputs.forEach(output => console.log("Output: " + output.manufacturer, output.name));
}

function togglePlay() {
  if (toggleLoop === 0) {
    toggleLoop = 1;
    play();
  }
  else if (toggleLoop === 1) {toggleLoop = 0;}
}

socket.on("sendServerMidi", function(data) {
  serverMidiData = data;
});

//  Plays the MIDI data
async function play() {
  var score = new ScoreInfo(getTextBox("bpm"), getTextBox("timeSignatureTop"), getTextBox("timeSignatureBottom"), getTextBox("numberOfBarsToRecord"), getTextBox("countInCount"));  
  let outputBus = getTextBox("playBus") - 1;
  let playArray = serverMidiData;
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

    metronome(channelArray, 15, getTextBox("numberOfBarsToRecord"));
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
  await sleep(calculateTimePerQuarterNote(score.bpm)*score.timeSignatureTop*score.numberOfBarsToRecord);
  if (queueRecordVar === 1) {
    generateMidi(0);
    queueRecordVar = 0;
  }
  if (toggleLoop === 1) {
    play();
  }
}

function countIn() {
  WebMidi.enable()
  .then(onEnabled);

  async function onEnabled() {
    let midiOutput = WebMidi.outputs[getTextBox("playBus") - 1];
    const channelArray = [
    midiOutput.channels[16]];
    metronome(channelArray, 0, Number(getTextBox("numberOfBarsToRecord")) + Number(getTextBox("countInCount")));
  }
} 

async function metronome(channelArray, arrayIndex, numberOfBarsToPlay) {
  for (let j = 0; j < numberOfBarsToPlay; j++) {
    for (let i = 1; i <= getTextBox("timeSignatureTop"); i++) {
      if (i === 1) {
        channelArray[arrayIndex].playNote("C4", {duration: 100, time: "+"+0});
      }
      else {
        channelArray[arrayIndex].playNote("C3", {duration: 100, time: "+"+0});
      }
      await sleep(calculateTimePerQuarterNote(getTextBox("bpm")));
    }
  }
}

function queueRecord() {
  queueRecordVar = 1;
}
