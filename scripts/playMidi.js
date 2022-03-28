var main = document.getElementsByTagName('main')[0]
function log(msg) {
  var p = document.createElement('p')
  p.innerHTML = msg
  main.appendChild(p)
}
midibus.access(function () {
  log('Access granted<br><br>')

  //Accessing the JSON file and logs a simple test
  var xhReq = new XMLHttpRequest();
  xhReq.open("GET", "./midiTest.json", false);
  xhReq.send(null);
  var jsonOutput = JSON.parse(xhReq.responseText);
  console.log("test: " + jsonOutput.tracks[0].notes[0].midi);

  let inputsLog = 'inputs: '
  midibus.inputs.forEach((el, i) => { inputsLog += el.name + (midibus.inputs[i+1] ? ', ' : '') })
  log(inputsLog)

  let outputsLog = 'outputs: '
  midibus.inputs.forEach((el, i) => { outputsLog += el.name + (midibus.outputs[i+1] ? ', ' : '') })
  log(outputsLog + '<br><br>')

  var bus = midibus.bus(midibus.inputs[0], midibus.outputs[0])

  //Loop plays all notes from the JSON file

  /* -----Outputs from JSON-----
  jsonOutput.track[] === Channel/Instrument
  jsonOutput.note[] === Containing infomation about the different notes
  jsonOutput.midi[] === Note
  jsonOutput.velocity === velocity
  jsonOutput.time === When the chord start playing
  jsonOutput.duration === How long the chord is playing
  */


  for (var i = 0; i < 16; i++) {
      console.log("pre: " + i); //For testing

      window.setTimeout(function () {
      console.log("[" + i + "]" + jsonOutput.tracks[0].notes[i].midi);
      bus.send('noteOff', midibus.message(0, jsonOutput.tracks[0].notes[i].midi, 128*(jsonOutput.tracks[0].notes[i].velocity) -1))
      }, jsonOutput.tracks[0].notes[i].time*1000)

      var bus = midibus.bus(midibus.inputs[0], midibus.outputs[0])
      window.setTimeout(function () {
      bus.send('noteOn', midibus.message(0, jsonOutput.tracks[0].notes[i].midi, 128*(jsonOutput.tracks[0].notes[i].velocity) -1))
      }, jsonOutput.tracks[0].notes[i].duration*1000 + jsonOutput.tracks[0].notes[i].time*1000)
  }

  //Destroys the bus after 10 seconds
  window.setTimeout(function () {
    log('<br>Destroying the bus')
    bus.destroy()
  }, 10000)
})
