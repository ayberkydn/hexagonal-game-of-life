"use strict";
var canvas = document.querySelector("#myCanvas");
var body = document.querySelector("body");
var isMobile = navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/)
body.padding = 0;
canvas.height = window.innerHeight * 10 / 17;
canvas.width = window.innerWidth;
var ctx = canvas.getContext("2d");


var checkboxes = {
    born: [],
    survive: []
};

for (var n = 0; n < 7; n++) {
    var surviveId = "survive" + n;
    var bornId = "born" + n;
    checkboxes.survive.push(document.getElementById(surviveId));
    checkboxes.born.push(document.getElementById(bornId));
}



var resumeButton = document.querySelector("#resumeButton");
var pauseButton = document.querySelector("#pauseButton");
var nextButton = document.querySelector("#nextButton");
var clearButton = document.querySelector("#clearButton");
var randomButton = document.querySelector("#randomButton");
var gridColor = "blue";
var onColor = "yellow";
var offColor = "black";
var sideLength = isMobile ? canvas.width / 100 : canvas.width / 300;
var layers = [];


//initialize layers
for (var i = 0; i * sideLength * Math.sqrt(3) / 2 < canvas.height + sideLength; i++) {
    var layer = [];
    for (var n = 0; n * sideLength * 3 < canvas.width + sideLength; n++) {
        var pointX = n * sideLength * 3 + sideLength * 1.5 * (i % 2);
        var pointY = i * sideLength * Math.sqrt(3) / 2;
        var point = new Point(pointX, pointY);
        var hex = new Hexagon(point, sideLength);
        layer.push(hex);
    }

    layers.push(layer);
}

canvas.addEventListener("click", function (evt) {
    var rect = this.getBoundingClientRect();
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;
    var mousePoint = new Point(mouseX, mouseY);
    var minDist = 9999;
    var closestHex = layers[0][0];

    for (var n in layers) {
        var layer = layers[n];
        for (var i in layer) {
            var hex = layer[i];
            var dist = distance(hex.center, mousePoint);
            closestHex = (dist < minDist) ? hex : closestHex;
            minDist = (dist < minDist) ? dist : minDist;
        }
        if (minDist < closestHex.sideLength) {
            break;
        }
    }
    if (closestHex.state === true) {
        closestHex.state = false;
        closestHex.nextState = closestHex.state;
        console.log("closed");
    } else {
        closestHex.state = true;
        closestHex.nextState = closestHex.state;
        console.log("opened");
    }
    drawHex(closestHex);

});

draw();

//this is used as both id of step interval and resume flag
var resuming = setInterval(step, 150);


pauseButton.addEventListener("click", function () {
    if (resuming) {
        clearInterval(resuming);
        resuming = 0;
    }
});

resumeButton.addEventListener("click", function () {
    if (!resuming) resuming = setInterval(step, 100);
});

nextButton.addEventListener("click", step);

clearButton.addEventListener("click", clearCells);

randomButton.addEventListener("click", randomInitialize);

console.log(layers);
