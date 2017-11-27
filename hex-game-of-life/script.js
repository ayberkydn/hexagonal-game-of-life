"use strict";
var canvas = document.querySelector("#myCanvas");
var body = document.querySelector("body");
body.padding = 0;
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth;
var ctx = canvas.getContext("2d");
var backgroundColor = "blue";
var onColor = "yellow";
var offColor = "white";
var sideLength = 15;
var layers = new Array();

for (var i = 0; i * sideLength * Math.sqrt(3) / 2 < canvas.height + sideLength; i++) {
    var layer = new Array();
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
        closestHex.nextState = false;
        console.log("closed");
    } else {
        closestHex.state = true;
        closestHex.nextState = true;
        console.log("opened");
    }

    console.log(closestHex.center.x);
    console.log(closestHex.center.y);



});

draw();
setInterval(function step() {
    draw();
    compute();
}, 100);


console.log(layers);
