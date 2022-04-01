 // Enable WebMidi.js and trigger the onEnabled() function when ready
 WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));


// Function triggered when WebMidi.js is ready
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
        document.body.innerHTML+= "No device detected.";
    } else {
        WebMidi.inputs.forEach((device, index) => {
        document.body.innerHTML+= `${index}: ${device.name} <br>`;
        });
    }

    const mySynth = WebMidi.inputs[0];
    // const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")
  
    mySynth.channels[1].addListener("noteon", e => {
        document.body.innerHTML+= `${e.note.name} <br>`;
    });
}

function recordMIDI(){
    var midiFile;

    for(var i = 0; i < 16; i++){ 
        new InputChannel(input, i);
    }
    


    return midiFile;
}
