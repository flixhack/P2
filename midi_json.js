
// input MIDI files from pc
var input = document.getElementById('input');
var inputList = [];
var inputSave = [];

input.addEventListener('change', function (e) {
	inputList = [];
	for (var i = 0; i < input.files.length; i++) {
	  	inputList.push(input.files[i]);
	  	inputSave.push(input.files[i]);
 		parseFile(inputList[i]);
  	}
  	screenList();
});

// print list of files to screen
var inputDisplay = document.getElementById('input-display');
var screenList = function () {
	inputDisplay.innerHTML = '';
  	inputList.forEach(function (file, index) {
		var Display = document.createElement('p');
		Display.innerHTML = (index + 1) + ': ' + file.name;
		inputDisplay.appendChild(Display);
  	});
};

// check output json files in console window
function check() { 
	console.log(inputList);
	for (var i = 0; i < inputList.length; i++) {
	  console.log(outputJson[i]);
	}
  }

// json files storage
var outputJson = []; 
// convert MIDI to json (code from program Demo)
let currentMidi = null;
function parseFile(file) {
	// read the file
	outputJsonList = []
	const reader = new FileReader();
	reader.onload = function (e) {
	const midi = new Midi(e.target.result);

	let json = JSON.stringify(midi, undefined, 2);
	outputJson.push(json);
		
	document.querySelector(
				"#ResultsText"
			).value = json;
		document
			.querySelector("tone-play-toggle")
			.removeAttribute("disabled");
		currentMidi = midi;
	};
	reader.readAsArrayBuffer(file);
}

// play MIDI file (code from program Demo)
const synths = [];
document
	.querySelector("tone-play-toggle")
	.addEventListener("play", (e) => {
		const playing = e.detail;
		if (playing && currentMidi) {
			const now = Tone.now() + 0.5;
			currentMidi.tracks.forEach((track) => {
				//create a synth for each track
				const synth = new Tone.PolySynth(Tone.Synth, {
					envelope: {
						attack: 0.02,
						decay: 0.1,
						sustain: 0.3,
						release: 1,
					},
				}).toDestination();
				synths.push(synth);
				//schedule all of the events
				track.notes.forEach((note) => {
					synth.triggerAttackRelease(
						note.name,
						note.duration,
						note.time + now,
						note.velocity
					);
				});
			});
		} else {
			//dispose the synth and make a new one
			while (synths.length) {
				const synth = synths.shift();
				synth.disconnect();
			}
		}
	});
