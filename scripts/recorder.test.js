const recorder = require('./recorder');

test('sleep stops the program the correct ammount of time', async() => {
    for(var i = 0; i < 100; i++){
        const start = Date.now();
        await recorder.sleep(i);
        const duration = Date.now() - start;
        expect(duration).toBe(i);
    }
})

//test('generateMidi generates ', () => {
    
//})


test('assembleOutputArray outputs two correctly merged two arrays', () => {
    var noteOne = new recorder.Note();
    var noteTwo = new recorder.Note();
    var noteThree = new recorder.Note(undefined, undefined, performance.now(), undefined);
    var noteFour = new recorder.Note(undefined, undefined, performance.now(), undefined);
    var outputArray = [noteOne, noteTwo];
    var inputArray = [noteThree, noteFour];

    expect(recorder.assembleOutputArray(inputArray, 42, outputArray)).toEqual([noteOne, noteTwo, noteThree, noteFour]);
})

test('calculateTimePerQuaterNote correctly calculates the time of a quater note dependant on the beats per minute', () => {
    expect(recorder.calculateTimePerQuarterNote(120)).toBe(500);
})

test('Note class correctly stores its field variables', () => {
    const noteOne = new recorder.Note("G1", 0.9, 0, 1000);
    const noteTwo = new recorder.Note("G2", 1, 1005, 995);
    const noteThree = new recorder.Note("C#2", 0.1, 2003, 2000);

    //tests note one
    expect(noteOne.name).toBe("G1");
    expect(noteOne.velocity).toBe(0.9);
    expect(noteOne.startTime).toBe(0);
    expect(noteOne.duration).toBe(1000);

    //tests note two
    expect(noteTwo.name).toBe("G2");
    expect(noteTwo.velocity).toBe(1);
    expect(noteTwo.startTime).toBe(1005);
    expect(noteTwo.duration).toBe(995);

    //tests note three
    expect(noteThree.name).toBe("C#2");
    expect(noteThree.velocity).toBe(0.1);
    expect(noteThree.startTime).toBe(2003);
    expect(noteThree.duration).toBe(2000);
})

test('ScoreInfo correctly stores its field variables',  () => {
    const scoreOne = new recorder.ScoreInfo(120, 4, 4, 3, 0);
    const scoreTwo = new recorder.ScoreInfo(110, 12, 8, 6, 12);

    //tests scoreOne
    expect(scoreOne.bpm).toBe(120);
    expect(scoreOne.timeSignatureTop).toBe(4);
    expect(scoreOne.timeSignatureBottom).toBe(4);
    expect(scoreOne.numberOfBarsToRecord).toBe(3);
    expect(scoreOne.countInCount).toBe(0);

    //tests scoreTwo
    expect(scoreTwo.bpm).toBe(110);
    expect(scoreTwo.timeSignatureTop).toBe(12);
    expect(scoreTwo.timeSignatureBottom).toBe(8);
    expect(scoreTwo.numberOfBarsToRecord).toBe(6);
    expect(scoreTwo.countInCount).toBe(12);
})