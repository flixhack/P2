
// Get MIDI files from pc (simulation program)
var inputs = document.querySelectorAll('[name]');
var checks = document.querySelectorAll('button')
var inputSave = {}
var jsonSave = {}
var id_input = []
var id_button = []
var currentMidi = null

// Control input button (new)
for(var input of inputs) {
	id_input.push(input.id)
	input.onchange = inputFile 
}

// check json output (new)
for (var check of checks) {
	id_button.push(check.id)
	check.onclick = checkjson
}

// get MIDI files (new)
function inputFile(event) {
	const selectedFile = event.target.files[0];
	var key = event.target.id
	document.querySelector(
				"#ResultsText"
			).value = ''
	inputSave[key] = (selectedFile)
	parseFile(selectedFile, key)
} 
		
// check json in the screen (new)
function checkjson(event) { 
let id_navn = event.target.id
	for(let i=0; i<id_button.length; i++) {
		if (id_button[i]==id_navn) {
			let a=i
			for(let j=0; j<id_input.length; j++) {
				if (j==a) {
					take_json(id_input[a])
					break
				}
			}
		}
	}
}

// copy json from jsonSave (new)
function take_json(index) {
	for (let key in jsonSave) {
		if (key==index) {
			json = jsonSave[index]
			document.querySelector(
				"#ResultsText"
			).value = json;
			document
			.querySelector("tone-play-toggle")
			.removeAttribute("disabled")
		}
	}	
}
	
// convert MIDI to json (code from program Demo)
function parseFile(file, key1) {
	// read the file
	const reader = new FileReader();
	reader.onload = function (e) {
	const midi = new Midi(e.target.result);
	let json = JSON.stringify(midi, undefined, 2);

	if (Object.entries(jsonSave).length === 0) {  // (new)
		jsonSave[key1] = json
	} else {
		add_json(key1, json)
	}
	currentMidi = midi;
	};
	reader.readAsArrayBuffer(file);
}

// add and connect json files (new)
function add_json(key, json) {
	for(let check in jsonSave) {
		if(check == key) {
			let temp = jsonSave[key]
			jsonSave[key] = (temp).concat(json)  //connect (same channel)
			break
		} else {jsonSave[key] = (json)  //add (new channel)
		   	break
		}
	}
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
	})
