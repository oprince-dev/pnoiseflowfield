var inc = 0.1;
var scl = 15;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;

function setup() {
    createCanvas(1536, 1920, P2D);
    background(0);
    cols = floor(width / scl);
    rows = floor(height / scl);
    flowfield = new Array(cols * rows);
    for (var i = 0; i < 10000; i++) {
        particles[i] = new Particle();
    }
}
 function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x ++) {
            var i = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.01);
            flowfield[i] = v;
            xoff += inc;
            //stroke(255, 50);
            //push();
            //translate(x * scl, y * scl);
            //rotate(v.heading());
            //line(0, 0, scl, 0);
            //pop();
        }
        yoff += inc;
        zoff += 0.005;
    }
    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edge();
        particles[i].show();
    }
    noLoop();
}
