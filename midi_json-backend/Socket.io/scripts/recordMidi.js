var socket = io("http://localhost:3271");

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

//Calls functions to record midi for the length of recordDuration, then convert it to a .mid file
async function generateMidi() {
  var Score = new ScoreInfo(getTextBox("bpm"), getTextBox("timeSignatureTop"), getTextBox("timeSignatureBottom"), getTextBox("numberOfBarsToRecord"), getTextBox("countInCount"));
  playCountIn(Score, Score.timeSignatureBottom*Score.countInCount);
  //Wait while the count in is happening
  await sleep(caclulateTimePerQuaterNote(Score.bpm)*Score.timeSignatureBottom*Score.countInCount);
  console.log(Score);
  var inputDevice = getTextBox("recordBus") - 1;
  var outputArray = [];
  //Webmidi starts playing based on how long ago the page was loaded. We log the time the page has been opened to adjust for this
  var correctedStartTime = performance.now();
  recordMidi(outputArray, inputDevice, caclulateTimePerQuaterNote(Score.bpm)*Score.timeSignatureTop*Score.numberOfBarsToRecord, correctedStartTime);
  await sleep(caclulateTimePerQuaterNote(Score.bpm)*Score.timeSignatureTop*Score.numberOfBarsToRecord);
  // disableWebMidiRecord();
}

//Gets the contents of an HTML input box
function getTextBox(boxID) {
  return document.getElementById(boxID).value;
}

//Plays the desired count in
async function playCountIn(Score, countInNum) {
  var countIn = generateCountIn(countInNum);

  for (var i = 0; i < countInNum; i++) {
    countIn[i].play();
    await sleep(caclulateTimePerQuaterNote(Score.bpm));
  }
}

//Generates the array to used by playCountIn
async function generateCountIn(countInNum) {
  var countIn = [];
  for (var i = 0; i < countInNum; i++) {
    countIn[i] = new Audio("/countIn.mp3");
  }
  return countIn;
}

//Opens for recording a given MIDI bus
async function recordMidi(outputArray, inputDevice, amountOfTimeToRecord, correctedStartTime) {
  var testyBoi = 0;

  let noteAccidental;
  var noteArray = [];

  WebMidi
  .enable()
  .then(onEnabled)

  function onEnabled() {

    //Error message if no MIDI devices are found
    if (WebMidi.inputs.length < 1) {
      document.body.innerHTML+= "No device detected.";
    } 

    const mySynth = WebMidi.inputs[inputDevice];

    mySynth.channels[getTextBox("trackNumber")].addListener("noteon", e => {
      //The accidental will return "undefined" if there is no accidental, so we need to check for that to avoid an invalid note

      if (testyBoi == 1) {
        mySynth.channels[getTextBox("trackNumber")].removeListener("noteon");
      }

      if (e.note.accidental == "#") {
          noteAccidental = e.note.accidental;
      }
      else {
          noteAccidental = "";
      }

      //Saving the values from noteon to the noteArray to keep track of active notes
      let newNote = new Note(e.note.name + noteAccidental + e.note.octave, e.note.attack, e.timestamp - correctedStartTime, 0);
      noteArray.push(newNote);
    });

    let recordBus = getTextBox("recordBus");
    mySynth.channels[getTextBox("trackNumber")].addListener("noteoff", e => {

      if (testyBoi == 1) {
        mySynth.channels[getTextBox("trackNumber")].removeListener("noteoff");
      }

      var noteFound = false;
      var i = 0;

      //Finds the note that matches the noteoff event, and removes it from the active noteArray
      while (i < noteArray.length && !noteFound) {
        if (e.note.accidental == "#") {
          noteAccidental = e.note.accidental;
        }
        else {
          noteAccidental = "";
        }
        
        if (noteArray[i].name == e.note.name + noteAccidental + e.note.octave) {
          if (noteArray[i].accidental == undefined) {
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

  await sleep(amountOfTimeToRecord);
  for (let i = 0; i < noteArray.length; i++) {
    console.log(noteArray[i]);
    noteArray[i].duration = performance.now() - noteArray[i].startTime - correctedStartTime;
    outputArray.push(noteArray[i]);
  }

  testyBoi = 1;
  outputArray.unshift(getTextBox("trackNumber"));
  console.log(outputArray);
  socket.emit("sendClientMidi", outputArray);
  outputArray = [];
}

function caclulateTimePerQuaterNote(bpm) {
  return 60/bpm*1000;
}

var queueRecordVar = 0;

function queueRecord() {
  queueRecordVar = 1;
}

//Disables the MIDI recording
function disableWebMidiRecord() {
  WebMidi.disable();
}