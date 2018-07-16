var startOffset = 0;
var startTime = 0;

var context;
var gainNode;
var biquadFilter;
var source;

var curTrack;
var songsBuffer = {};
var seconds = 0;
var interval;
var firstSelected = true;

var playing = false;

var timeline = document.getElementById("timeline");
var cur_track = document.getElementById("current_track");
var volume = document.getElementById("volume");
var tbody = document.getElementsByTagName("tbody")[0];
var input_file = document.getElementById("file-input");

input_file.addEventListener("change",inputFile, false);
addEventListener("keydown",keyDown);

const KEY_CODE_SPACE = 32;
const KEY_CODE_LEFT = 37;
const KEY_CODE_UP = 38;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_DOWN = 40;

function drawTimeline() {
    if (seconds >= source.buffer.duration) {
        pause();
        nextTrack();
    }
    if (playing) seconds++;
    timeline.value = (seconds * (100 / source.buffer.duration)).toString();
}

function onLoad() {
    try {
        context = new window.AudioContext();
        gainNode = context.createGain();
        biquadFilter = context.createBiquadFilter();
    } catch(e) {
        alert("WebAudio не поддерживается вашим браузером!");
    }
}

function loadFile(name, file) {
    context.decodeAudioData(file, function (buffer) {
        addToBuffer(name, buffer);
    });
}

function  addToBuffer(name, data) {
    songsBuffer[name] = data;
    alert("Загружен трек " + name);
}

function  removeFromBuffer(name) {
    delete songsBuffer[name];
}

function inputFile(e) {
    if (this.files[0] === undefined) return;
    var file_name = this.files[0].name;
    addRow(file_name);

    var reader = new FileReader();
    reader.onload = function(e) {
        loadFile(file_name, this.result);
    };
    reader.readAsArrayBuffer(this.files[0]);
}

function addRow(track_name){
    var row = document.createElement("tr");
    var btn = document.createElement("button");
    var img = document.createElement("img");
    img.src = "assets/img/delete-track-button.png";
    img.className = "btn-tiny";
    img.onclick = removeTrack;
    btn.value = track_name;
    btn.appendChild(img);

    var td_track = document.createElement("td");
    td_track.appendChild(document.createTextNode(track_name));
    td_track.onclick = selectTrack;
    var td_remove = document.createElement("td");
    td_remove.appendChild(btn);

    row.appendChild(td_track);
    row.appendChild(td_remove);
    tbody.appendChild(row);
}

function removeTrack (e) {
    if (e.target.parentNode.value === curTrack.toString())
    {
        alert("Данный трек воспроизводится!");
        return;
    }
    else {
        var row = e.target.parentNode.parentNode.parentNode;
        tbody.removeChild(row);
        removeFromBuffer(e.target.parentNode.value);
    }
}

function selectTrack (e) {
    curTrack = e.target.textContent;
    cur_track.innerHTML =  curTrack;
    seconds = 0;
    if (!firstSelected) clearInterval(interval);
    else firstSelected = false;
    interval = setInterval(drawTimeline, 1000);
    stop();
    play();
}

function pause() {
    if (!playing) return;
    source.stop();
    startOffset += context.currentTime - startTime;
    playing = false;
}

function play() {
    if (playing) return;

    startTime = context.currentTime;

    source = context.createBufferSource();
    source.buffer = songsBuffer[curTrack];

    source.connect(gainNode);
    gainNode.connect(context.destination);
    source.start(0, startOffset % source.buffer.duration);

    playing = true;
}

function stop() {
    if (source !== undefined)
    {
        source.stop(0);
        startOffset = 0;
        startTime = 0;
        playing = false;
    }
}

function nextTrack() {
    var i = 0;
    var length = Object.keys(songsBuffer).length;
    for (; i<length; i++)
        if (Object.keys(songsBuffer)[i] === curTrack) break;

    curTrack = Object.keys(songsBuffer)[(i + 1)%length];
    cur_track.innerHTML =  curTrack;
    seconds = 0;

    stop();
    play();
}

function previousTrack() {
    var i = 0;
    var length = Object.keys(songsBuffer).length;
    for (; i<length; i++)
        if (Object.keys(songsBuffer)[i] === curTrack) break;

    curTrack = Object.keys(songsBuffer)[(i - 1 + length)%length];
    cur_track.innerHTML =  curTrack;
    seconds = 0;

    stop();
    play();
}

function forward10s()
{
    pause();
    if ((startOffset + 10) >= source.buffer.duration) {
        startOffset = context.endTime;
        seconds = source.buffer.duration;
    }
    else {
        startOffset += 10;
        seconds += 10;
    }
    play();
}

function backward10s()
{
    pause();
    if ((startOffset - 10) <= 0) {
        startOffset = 0;
        seconds = 0;
    }
    else {
        startOffset -= 10;
        seconds -= 10;
    }
    play();
}

function forward30s()
{
    var i = 0;
    var length = Object.keys(songsBuffer).length;
    for (; i<length; i++)
        if (Object.keys(songsBuffer)[i] === curTrack) break;

    curTrack = Object.keys(songsBuffer)[(i + 1)%length];
    cur_track.innerHTML =  curTrack;
    seconds = 0;

    stop();

    startTime += 30;
    startOffset += 30;
    seconds += 30;

    play();
}

function backward30s()
{
    var i = 0;
    var length = Object.keys(songsBuffer).length;
    for (; i<length; i++)
        if (Object.keys(songsBuffer)[i] === curTrack) break;

    curTrack = Object.keys(songsBuffer)[(i - 1 + length)%length];
    cur_track.innerHTML =  curTrack;
    seconds = 0;

    stop();

    startTime -= 30;
    startOffset -= 30;
    seconds -= 30;

    play();
}

function changeVolume(element) {
    gainNode.gain.setValueAtTime(parseInt(element.value) / parseInt(element.max), context.currentTime);
}

function changeTimelime(element) {
    pause();
    startOffset -= seconds;
    seconds = parseInt(element.value * (source.buffer.duration / 100));
    startOffset += seconds;
    play();
}

function filterDisconnect() {
    biquadFilter.disconnect();
    source.connect(gainNode);
}

function filter1st() {
    source.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    biquadFilter.type = "allpass";
    biquadFilter.frequency.setValueAtTime(200, context.currentTime);
    biquadFilter.Q.setValueAtTime(5, context.currentTime);
}
    
function filter2nd() {
    source.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    biquadFilter.type = "highshelf";
    biquadFilter.frequency.setValueAtTime(1000, context.currentTime);
    biquadFilter.gain.setValueAtTime(30, context.currentTime);
}

function filter3rd() {
    source.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.setValueAtTime(1500, context.currentTime);
    biquadFilter.Q.setValueAtTime(20, context.currentTime);
}

function keyDown(e)
{
    switch (e.keyCode) {
        case KEY_CODE_RIGHT: {
            nextTrack();
            break;
        }

        case KEY_CODE_LEFT: {
            previousTrack();
            break;
        }

        case KEY_CODE_DOWN: {
            volume.value--;
            changeVolume(volume);
            break;
        }

        case KEY_CODE_UP: {
            volume.value++;
            changeVolume(volume);
            break;
        }

        case KEY_CODE_SPACE: {
            if (playing)
                pause();
            else
                play();
            break;
        }
    }
}
