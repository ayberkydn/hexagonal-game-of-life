function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Hexagon(center, sideLength) {
    this.center = center;
    this.sideLength = sideLength;
    if (Math.random() > 0.5) {
        this.status = true;
    } else {
        this.status = false;
    }
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
    if (hexagon.status === true) {
        ctx.fillStyle = "yellow";
    } else {
        ctx.fillStyle = "black";
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
    for (var n = 0; n < numOfLayers; n++) {
        currentLayer = layers[n];
        for (var i = 0; i < layerLength; i++) {
            var currentHex = currentLayer[i];
            var neighbors = [];
            var live = [3, 4]; //how many alive neigbors means live
            var born = [2]; //how many alive neighbors means born
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

                if (neighbors[j].status === true) {
                    aliveNeighbors++;
                }
            }
            if ((live.includes(aliveNeighbors) && currentHex.status === true) ||
                (born.includes(aliveNeighbors) && currentHex.status === false)) {
                currentHex.nextStatus = true;
            } else {
                currentHex.nextStatus = false;
            }
        }
    }


    for (var n = 0; n < numOfLayers - 0; n++) {
        for (var i = 0; i < layerLength - 0; i++) {
            layers[n][i].status = layers[n][i].nextStatus;
        }
    }
}


function draw() {
    fillCanvas(backgroundColor);
    for (var n = 0; n < layers.length; n++) {
        drawLayer(layers[n]);
    }
}