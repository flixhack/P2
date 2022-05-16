var bpm=140
var bpM=4
var isStart=false
var count=0
var intervalID

const audio1 = new Audio('beep1.mp3');
const audio2 = new Audio('beep2.mp3');

var bpmShow = document.getElementById('bpm-number')
var bpmSlider = document.getElementById('slider')

// Decrease number of beats per minute
var decreaseBpm = document.getElementById('decrease-bpm')
decreaseBpm.addEventListener('click', () => {
    if (bpm <= 20) { return }
    bpm--
    bpmShow.textContent = bpm
    bpmSlider.value = bpm
})

// Increase number of beats per minute
var increaseBpm = document.getElementById('increase-bpm')
increaseBpm.addEventListener('click', () => {
    if (bpm >= 280) { return }
    bpm++
    bpmShow.textContent = bpm
    bpmSlider.value = bpm
})

// Use slider to decrease or increase number of beats per minute
bpmSlider.addEventListener('input', () => {
    bpm = bpmSlider.value
    bpmShow.textContent = bpm
    bpmSlider.value = bpm
});

// Decrease number of beats per measure
var countBeats = document.getElementById('countBeats')
var subBeats = document.getElementById('sub-beats')
subBeats.addEventListener('click', () => {
    if (bpM <= 2) { return };
    bpM--
    countBeats.textContent = bpM
    count = 0
})

// Increase number of beats per measure
var addBeats = document.getElementById('add-beats')
addBeats.addEventListener('click', () => {
    if (bpM >= 12) { return };
    bpM++
    countBeats.textContent = bpM
    count = 0
})

// Start playing or stopping
var start = document.getElementById('start')
start.addEventListener('click', () => {
    count = 0;
    if (!isStart) {
        intervalID = setInterval(playMetronome, 60000/bpm)
        isStart = true;
        start.textContent = 'STOP';
    } else {
        clearInterval(intervalID)
       isStart = false;
        start.textContent = 'START';
    }
});

// Function plays metronome
function playMetronome() {
var currentBeat = document.getElementById("currentBeat")
    if (count === bpM) {
        count = 0;
    }
    if (count === 0) {
        audio1.play();
        audio1.currentTime = 0;
    } else {
        audio2.play();
        audio2.currentTime = 0;
    }
    count++;
}

