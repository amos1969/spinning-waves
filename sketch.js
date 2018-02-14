var droid;
var numPoints;
var modelSize;
var rotationPhase;
var waveVertices;
var wavePhase;
var animationPosition;
var myCanvas;

function setup() {
    myCanvas = createCanvas(1000, 700, WEBGL);
    myCanvas.parent("myContainer")
    numPoints = 8000;
    rotationPhase = 0;
    wavePhase = 0;
    modelSize = 100;
    animationPosition = 0;
    waveVertices = [];
    for (var i = 0; i < numPoints; i++){
        waveVertices[i] = createVector(random(-5, 5), 0, random(-5, 5));
    }
}

function preload() {
    droid = loadModel("assets/ironman.obj");
    
}

function draw() {
    background(0);
    ambientLight(200, 200, 250);

    rotateZ(radians(180));
    translate(0, -150, 0);

    rotateY(rotationPhase);

    for (var i = 0; i < numPoints; i++){
        var index = floor(map(i, 0, numPoints, 0, droid.vertices.length));
        var droidVertex = droid.vertices[index];

        var waveVertex = waveVertices[i];
        waveVertex.y = sin(waveVertex.x + wavePhase) * cos(waveVertex.y + wavePhase) * 0.4;
        var animationLoopPostion = easeInOutQuart(map(sin(animationPosition), -1, 1, 0, 1));
        var vert = createVector(
            map(animationLoopPostion, 0, 1, waveVertex.x, droidVertex.x),
            map(animationLoopPostion, 0, 1, waveVertex.y, droidVertex.y),
            map(animationLoopPostion, 0, 1, waveVertex.z, droidVertex.z)
        )
        push();
        translate(vert.x * modelSize, vert.y * modelSize, vert.z * modelSize);
        box(2);
        pop();
    }

    rotationPhase = frameCount * 0.06;
    wavePhase = frameCount * 0.06;
    animationPosition = frameCount * 0.09;

}

function easeInOutQuart(t) {return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }

