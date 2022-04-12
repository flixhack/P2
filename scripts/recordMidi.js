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

var outputArray = [];

function test() {

  let testNote = new Note("C", 4, "", 0);

  console.log(testNote.accidental);

  WebMidi
  .enable()
  .then(onEnabled)

  function onEnabled() {

    if (WebMidi.inputs.length < 1) {
      document.body.innerHTML+= "No device detected.";
    } 
    else {
      WebMidi.inputs.forEach((device, index) => {
        document.body.innerHTML+= `${index}: ${device.name} <br>`;
      });
    }

    const mySynth = WebMidi.inputs[0];

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
      noteOctave = e.note.octave;
      velocity = e.rawValue;
      startTime = e.timestamp;
      let newNote = new Note(e.note.name, e.note.octave, e.note.accidental, e.note.attack, e.timestamp);

      noteArray.push(newNote);
      // console.log(noteArray[noteArray.length-1]);
      // console.log(noteArray.length);
    });

    mySynth.channels[1].addListener("noteoff", e => {
      document.body.innerHTML+= `${e.timestamp} <br>`;
      duration = e.timestamp - startTime;

      var noteFound = false;
      var i = 0;
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
      console.log("input: " + noteArray.length + "\noutput: " + outputArray.length);
      console.log("Blah: " + (outputArray[outputArray.length-1].duration/1000).toFixed(1));
    });
  }
}

function testTwo() {
  let track = new MidiWriter.Track();

  track.addEvent([
    new MidiWriter.NoteEvent({pitch: ['E4'], duration: '4'}),
    new MidiWriter.NoteEvent({pitch: ['D4'], duration: '4', startTick: '1024'}),
    new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2', startTick: '1536'}),
    new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
    new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
    new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
    new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
    new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
  ], function(event, index) {
    return {sequential: true};
  }
  );

  let write = new MidiWriter.Writer(track);
  console.log(write.dataUri());
  console.log("test"); 

  



}

function arrayToTrack(){

  let track = new MidiWriter.Track();

  for(var i = 0; i < outputArray.length; i++){
    console.log(outputArray[i].velocity*100);
    track.addEvent([
      new MidiWriter.NoteEvent({pitch: [outputArray[i].name + outputArray[i].octave], duration: "T"+(outputArray[i].duration/1000*256).toFixed(0), startTick: outputArray[i].startTime/1000*256, velocity: outputArray[i].velocity*100})
    ], function(event, index) {
      return {sequential: false};
    }
    );
  }
  let write = new MidiWriter.Writer(track);
  console.log(write.dataUri());
}