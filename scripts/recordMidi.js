class Note {
  constructor(name, octave, accidental, velocity, startTime, duration) {
    this.name = name;
    this.octave = octave;
    this.accidental = accidental;
    this.velocity = velocity;
    this.startTime = startTime;
    this.duration = duration;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); //stolen
}

//Calls functions to record midi for 10 seconds, then convert it to a .mid file
async function generateMidi() {
  var inputDevice = 0;
  var outputArray = [];
  var correctedStartTime = performance.now();
  recordMidi(outputArray, inputDevice);
  await sleep(10000);
  arrayToTrack(outputArray, correctedStartTime);
  disableWebMidiRecord();
}

//Opens for recording a given MIDI bus
function recordMidi(outputArray, inputDevice) {

  WebMidi
  .enable()
  .then(onEnabled)

  function onEnabled() {

    //Error message if no MIDI devices are found
    if (WebMidi.inputs.length < 1) {
      document.body.innerHTML+= "No device detected.";
    } 

    const mySynth = WebMidi.inputs[inputDevice];

    let noteName;
    let noteAccidental;
    let noteOctave;
    let velocity;
    let startTime;
    let duration;
    var noteArray = [];

    mySynth.channels[1].addListener("noteon", e => {
      noteName = e.note.name;
      //The accidental will return "undefined" if there is no accidental, so we need to check for that to avoid an invalid note
      if (e.note.accidental == "#") {
          noteAccidental = e.note.accidental;
      }
      else {
          noteAccidental = "";
      }

      //Saving the values from noteon to the noteArray to keep track of active notes
      noteOctave = e.note.octave;
      velocity = e.rawValue;
      startTime = e.timestamp;
      let newNote = new Note(e.note.name, e.note.octave, e.note.accidental, e.note.attack, e.timestamp);

      noteArray.push(newNote);
    });

    mySynth.channels[1].addListener("noteoff", e => {
      duration = e.timestamp - startTime;

      var noteFound = false;
      var i = 0;

      //Finds the note that matches the noteoff event, and removes it from the active noteArray
      while (i < noteArray.length && !noteFound) {
        if (noteArray[i].name == e.note.name) {
          if (noteArray[i].accidental == undefined) {
            noteArray[i].accidental = "";
          }
          noteArray[i].duration = e.timestamp - noteArray[i].startTime;
          outputArray.push(noteArray[i]);
          noteArray.splice(i, 1);
          noteFound = true;
        }
        i++;
      }
      console.log(outputArray[outputArray.length-1]);
    });
  }
}

//Converts the outputArray from recordMidi to a .mid file
function arrayToTrack(outputArray, correctedStartTime){

  console.log(outputArray);

  let track = new MidiWriter.Track();
  track.setTempo(120, 0);

  //Generates each note of the .mid file from the outputArray. Also calculates the correct start time for each note
  for(var i = 0; i < outputArray.length; i++){
    let startTime = outputArray[i].startTime/1000*256-correctedStartTime/1000*256;
    track.addEvent([
      new MidiWriter.NoteEvent({pitch: [outputArray[i].name + outputArray[i].octave], duration: "T"+(outputArray[i].duration/1000*256).toFixed(0), startTick: startTime, velocity: outputArray[i].velocity*100})
    ], function(event, index) {
      return {sequential: false};
    }
    );
  }
  let write = new MidiWriter.Writer(track);
  console.log(write.dataUri());
}

//Disables the MIDI recording
function disableWebMidiRecord() {
  WebMidi.disable();
}