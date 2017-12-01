function Point(x, y) {
    this.x = x;
    this.y = y;
}

function distance(pointA, pointB) {
    var xDist = pointA.x - pointB.x;
    var yDist = pointA.y - pointB.y;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function Hexagon(center, sideLength) {
    this.center = center;
    this.sideLength = sideLength;
    if (Math.random() > 0.8) {
        this.state = true;
    } else {
        this.state = false;
    }
}

function randomInitialize() {
    clearCells();
    for (var n = 0; n < layers.length; n++) {
        var layer = layers[n];
        for (var i = 0; i < layer.length; i++) {
            var hex = layer[i];
            hex.state = (Math.random() > 0.8) ? true : false;
            hex.nextState = hex.state;
        }
    }
    draw();
}

function clearCells() {
    for (var n in layers) {
        var layer = layers[n];
        for (var i in layer) {
            var hex = layer[i];
            hex.state = false;
            hex.nextState = hex.state;
        }
    }
    draw();
}

function step() {
    draw();
    compute();
}

function mod(n, m) {
    if (n < 0) {
        return mod(n + m, m);
    } else {
        return n % m;
    }
}

function drawRect(start, height, width, color) {
    ctx.fillStyle = color;
    ctx.fillRect(start.x, start.y, width, height);
}

function fillCanvas(color) {
    drawRect(new Point(0, 0), canvas.height, canvas.width, color);

}

function drawHex(hexagon, color) {
    var center = hexagon.center;
    var sideLength = hexagon.sideLength * 28 / 30;
    if (hexagon.state === true) {
        ctx.fillStyle = onColor;
    } else {
        ctx.fillStyle = offColor;
    }
    if (typeof (color) !== "undefined") {
        console.log("drawing with", color);
        ctx.fillStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(center.x - sideLength / 2, center.y - sideLength * Math.sqrt(3) / 2);
    ctx.lineTo(center.x + sideLength / 2, center.y - sideLength * Math.sqrt(3) / 2);
    ctx.lineTo(center.x + sideLength, center.y);
    ctx.lineTo(center.x + sideLength / 2, center.y + sideLength * Math.sqrt(3) / 2);
    ctx.lineTo(center.x - sideLength / 2, center.y + sideLength * Math.sqrt(3) / 2);
    ctx.lineTo(center.x - sideLength, center.y);
    ctx.fill();
}

function drawLayer(layer, color) {
    for (var n = 0; n < layer.length; n++) {
        drawHex(layer[n], color)
    }
}

function compute() {
    numOfLayers = layers.length;
    layerLength = layers[0].length;
    var rules = {
        born: [],
        survive: []
    }
    for (var n = 0; n < 7; n++) {
        if (checkboxes.born[n].checked) {
            rules.born.push(n);
        }
        if (checkboxes.survive[n].checked) {
            rules.survive.push(n);
        }
    }
    for (var n = 0; n < numOfLayers; n++) {
        currentLayer = layers[n];
        for (var i = 0; i < layerLength; i++) {
            var currentHex = currentLayer[i];
            var neighbors = [];
            var aliveNeighbors = 0;


            neighbors.push(layers[mod(n - 2, numOfLayers)][mod(i, layerLength)]);
            neighbors.push(layers[mod(n + 2, numOfLayers)][mod(i, layerLength)]);
            neighbors.push(layers[mod(n - 1, numOfLayers)][mod(i - 1 + (n % 2), layerLength)]);
            neighbors.push(layers[mod(n + 1, numOfLayers)][mod(i - 1 + (n % 2), layerLength)]);
            neighbors.push(layers[mod(n - 1, numOfLayers)][mod(i + (n % 2), layerLength)]);
            neighbors.push(layers[mod(n + 1, numOfLayers)][mod(i + (n % 2), layerLength)]);
            //drawLayer(neighbors, "red");
            //drawHex(currentHex, "blue");
            for (j = 0; j < neighbors.length; j++) {

                if (neighbors[j].state === true) {
                    aliveNeighbors++;
                }
            }
            if ((rules.survive.includes(aliveNeighbors) && currentHex.state === true) ||
                (rules.born.includes(aliveNeighbors) && currentHex.state === false)) {
                currentHex.nextState = true;
            } else {
                currentHex.nextState = false;
            }
        }
    }


    for (var n = 0; n < numOfLayers - 0; n++) {
        for (var i = 0; i < layerLength - 0; i++) {
            layers[n][i].state = layers[n][i].nextState;
        }
    }
}


function draw() {
    fillCanvas(gridColor);
    for (var n = 0; n < layers.length; n++) {
        drawLayer(layers[n]);
    }
}
