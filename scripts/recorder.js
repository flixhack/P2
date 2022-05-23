var socket = io("https://gentle-meadow-24148.herokuapp.com/");

class Note {
  constructor(name, velocity, startTime, duration) {
    this.name = name;
    this.velocity = velocity;
    this.startTime = startTime;
    this.duration = duration;
  }
}

class ScoreInfo {
  constructor(bpm, timeSignatureTop, timeSignatureBottom, numberOfBarsToRecord, countInCount) {
    this.bpm = bpm;
    this.timeSignatureTop = timeSignatureTop;
    this.timeSignatureBottom = timeSignatureBottom;
    this.numberOfBarsToRecord = numberOfBarsToRecord;
    this.countInCount = countInCount;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Calls functions to record midi for the length of recordDuration
async function generateMidi(firstRecord) {
  var score = new ScoreInfo(getTextBox("bpm"), getTextBox("timeSignatureTop"), getTextBox("timeSignatureBottom"), getTextBox("numberOfBarsToRecord"), getTextBox("countInCount"));
  if (firstRecord === 1) {
    countIn();
    //Wait while the count in is happening
    await sleep(calculateTimePerQuarterNote(score.bpm)*score.timeSignatureBottom*score.countInCount);
  }
  var inputBus = getTextBox("recordBus") - 1;
  //Webmidi starts playing based on how long ago the page was loaded. We log the time the page has been opened to adjust for this
  var correctedStartTime = performance.now();
  recordMidi(inputBus, calculateTimePerQuarterNote(score.bpm)*score.timeSignatureTop*score.numberOfBarsToRecord, correctedStartTime);
  await sleep(calculateTimePerQuarterNote(score.bpm)*score.timeSignatureTop*score.numberOfBarsToRecord, correctedStartTime);
}

//Gets the contents of an HTML input box
function getTextBox(boxID) {
  return document.getElementById(boxID).value;
}

//Opens for recording a given MIDI bus
async function recordMidi(inputBus, amountOfTimeToRecord, correctedStartTime) {
  var enableListeners = 0;
  var outputArray = [];
  var noteArray = [];

  WebMidi
  .enable()
  .then(onEnabled)

  function onEnabled() {

    //Error message if no MIDI devices are found
    if (WebMidi.inputs.length < 1) {
      document.body.innerHTML += "No device detected.";
    }

    const synth = WebMidi.inputs[inputBus];

    noteOnListener(synth, enableListeners, correctedStartTime, noteArray);
    noteOffListener(synth, enableListeners, noteArray, correctedStartTime, outputArray);
  }

  await sleep(amountOfTimeToRecord);

  enableListeners = 1;
  outputArray.unshift(getTextBox("trackNumber"));
  socket.emit("sendClientMidi", outputArray);
}

function noteOnListener(synth, enableListeners, correctedStartTime, noteArray) {
  return synth.channels[getTextBox("trackNumber")].addListener("noteon", e => {
    //The accidental will return "undefined" if there is no accidental, so we need to check for that to avoid an invalid note

    if (enableListeners === 1) {
      synth.channels[getTextBox("trackNumber")].removeListener("noteon");
    }

    if (e.note.accidental === "#") {
        noteAccidental = e.note.accidental;
    }
    else {
        noteAccidental = "";
    }

    //Saving the values from noteon to the noteArray to keep track of active notes
    let newNote = new Note(e.note.name + noteAccidental + e.note.octave, e.note.attack, e.timestamp - correctedStartTime, 0);
    noteArray.push(newNote);
  });
}

function noteOffListener(synth, enableListeners, noteArray, correctedStartTime, outputArray) {
  return synth.channels[getTextBox("trackNumber")].addListener("noteoff", e => {

    if (enableListeners === 1) {
      synth.channels[getTextBox("trackNumber")].removeListener("noteoff");
    }

    var noteFound = false;
    var i = 0;

    //Finds the note that matches the noteoff event, and removes it from the active noteArray
    while (i < noteArray.length && !noteFound) {
      if (e.note.accidental === "#") {
        noteAccidental = e.note.accidental;
      }
      else {
        noteAccidental = "";
      }

      if (noteArray[i].name === e.note.name + noteAccidental + e.note.octave) {
        if (noteArray[i].accidental === undefined) {
          noteArray[i].accidental = "";
        }
        noteArray[i].duration = e.timestamp - noteArray[i].startTime - correctedStartTime;
        outputArray.push(noteArray[i]);
        noteArray.splice(i, 1);
        noteFound = true;
      }
      i++;
    }
    console.log(outputArray[outputArray.length-1]);
  });
}

function calculateTimePerQuarterNote(bpm) {
  return 60/bpm*1000;
}
