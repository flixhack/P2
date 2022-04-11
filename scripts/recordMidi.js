function test() {
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
        return noteName, velocity, startTime;
    });

    mySynth.channels[1].addListener("noteoff", e => {
      document.body.innerHTML+= `${e.timestamp} <br>`;
      duration = e.timestamp - startTime;

      console.log("Name: " + noteName + noteAccidental + noteOctave + "\nVelocity: " + velocity + "\nstartTime: " + startTime + "\nduration: " + duration);
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
          return {sequential: false};
      }
      );

      let write = new MidiWriter.Writer(track);
      console.log(write.dataUri());
      console.log("test"); 
}