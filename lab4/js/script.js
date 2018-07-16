var size = 500;
canvas = document.getElementById("canvas");
canvas.width = size;
canvas.height = size;
var context = canvas.getContext("2d");
var radius = size / 2;
context.translate(radius, radius);
radius = 0.9 * radius;
var hour_24;
var minute_24;
var second_24;
var hour_output = document.getElementById("hour_output");
var minute_output = document.getElementById("minute_output");
var second_output = document.getElementById("second_output");
var hour_input = document.getElementById("hour_input");
var minute_input = document.getElementById("minute_input");
var second_input = document.getElementById("second_input");
var system_time = true;
setInterval(drawClock, 1000);

function drawClock() {
    drawBackground(context, radius);
    drawNumbers(context, radius);
    drawHands(context, radius);
    outputTime();
}

function drawBackground(context, radius) {
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI, true);
    context.fillStyle = 'white';
    context.fill();
    context.strokeStyle = 'black';
    context.lineWidth = 0.1 * radius;
    context.stroke();
    context.closePath();
    context.beginPath();
    context.arc(0, 0, 0.1 * radius, 0, 2 * Math.PI, true);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
}

function drawNumbers(context, radius) {
    var angle;
    var number;
    context.font = 0.15 * radius + "pt Times New Roman";
    context.textBaseline= "middle";
    context.textAlign= "center";
    for (number = 1; number < 13; number++) {
        angle = number * Math.PI / 6;
        context.rotate(angle);
        context.translate(0, -0.85 * radius);
        context.rotate(-angle);
        context.fillText(number.toString(), 0, 0);
        context.rotate(angle);
        context.translate(0, 0.85 * radius);
        context.rotate(-angle);
    }
}

function getTime() {
    if (system_time === true) {
        var now = new Date();
        hour_24 = now.getHours();
        minute_24 = now.getMinutes();
        second_24 = now.getSeconds();
    }
    else if (system_time === false) {
        second_24++;
        if ((second_24 / 60) === 1) {
            minute_24++;
            second_24 /= 60;
        }
        if ((minute_24 / 60) === 1) {
            hour_24++;
            minute_24 /= 60;
        }
        if (hour_24 > 24)
            hour_24 /= 24;
    }
}

function drawHand(context, position, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0,0);
    context.rotate(position);
    context.lineTo(0, -length);
    context.stroke();
    context.closePath();
    context.rotate(-position);
}

function drawHands(context, radius){
    getTime();
    var hour_12 = hour_24 % 12;
    hour_12 = (hour_12 * Math.PI / 6) + (minute_24 * Math.PI / (6 * 60)) + (second_24 * Math.PI / (360 * 60));
    drawHand(context, hour_12, 0.45 * radius, 0.06 * radius);
    var minute_12 = (minute_24 * Math.PI / 30) + (second_24 * Math.PI / (30 * 60));
    drawHand(context, minute_12, 0.75 * radius, 0.06 * radius);
    var second_12 = (second_24 * Math.PI / 30);
    drawHand(context, second_12, 0.9 * radius, 0.02 * radius);
}

function outputTime() {
    hour_output.value = hour_24;
    minute_output.value = minute_24;
    second_output.value = second_24;
}

function inputTime() {
    system_time = false;
    hour_24 = hour_input.value;
    minute_24 = minute_input.value;
    second_24 = second_input.value;
}

function useSystem(){
    system_time = true;
    hour_input.value = 0;
    minute_input.value = 0;
    second_input.value = 0;
}