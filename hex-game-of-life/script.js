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
var sideLength = 10;
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

draw();
setInterval(function step() {
    draw();
    compute();
}, 100);


console.log(layers);
