var size = 500;
var svg = document.getElementById("svg");
svg.setAttribute("width", size.toString());
svg.setAttribute("height",size.toString());
var radius = size / 2;
var outer_circle = document.getElementById("outer-circle");
var inner_circle = document.getElementById("inner-circle");
var hour_hand = document.getElementById("hour-hand");
var minute_hand = document.getElementById("minute-hand");
var second_hand = document.getElementById("second-hand");
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
    drawBackground(radius);
    drawNumbers(radius);
    drawHands(radius);
    outputTime();
}

function drawBackground(radius) {
    outer_circle.setAttribute("cx", radius.toString());
    outer_circle.setAttribute("cy", radius.toString());
    inner_circle.setAttribute("cx", radius.toString());
    inner_circle.setAttribute("cy", radius.toString());

    radius = 0.9 * radius;

    outer_circle.setAttribute("r", radius.toString());
    outer_circle.setAttribute("stroke-width", (0.1 * radius).toString());
    inner_circle.setAttribute("r", (0.1 * radius).toString());
}

function drawNumbers(radius) {
    var number;
    for (number = 1; number < 13; number++) {
        var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        newText.setAttribute("y", (0.3 * radius).toString());
        newText.setAttribute("x", radius.toString());
        newText.setAttribute('transform', 'rotate(' + (number * 360 / 12).toString() + ' ' + radius.toString() + ' ' + radius.toString() + ')');
        newText.style.fill = "black";
        newText.style.fontSize = (0.15 * radius).toString() + 'pt';
        newText.style.fontStyle = "'Times New Roman', Times, serif";
        newText.style.textAnchor = "middle";
        newText.style.stroke = "none";
        var textNode = document.createTextNode(number.toString());
        newText.appendChild(textNode);
        document.getElementById("numbers").appendChild(newText);
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

function drawHand(id, position, height, width, round) {
    id.setAttribute('transform', 'rotate('+ (position - 180).toString() + ' ' + radius.toString() + ' ' + radius.toString() + ')');
    id.setAttribute("width", width.toString());
    id.setAttribute("height", height.toString());
    id.setAttribute("rx", round.toString());
    id.setAttribute("ry", round.toString());
}

function drawHands(radius) {
    getTime();
    var hour_12 = (30 * (hour_24 % 12)) + (minute_24 / 2);
    var minute_12 = 6 * minute_24;
    var second_12 = 6 * second_24;
    radius = 0.9 * radius;
    drawHand(hour_hand, hour_12, 0.45 * radius, 0.06 * radius, 0.03 * radius);
    drawHand(minute_hand, minute_12, 0.75 * radius, 0.06 * radius, 0.03 * radius);
    drawHand(second_hand, second_12, 0.9 * radius, 0.02 * radius, 0.01 * radius);
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