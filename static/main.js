function pointsOnCircleDo(x, y, radius, n, func) {
    pointsOnCircle(x, y, radius, n).forEach(function(v, i, a) {
        func(v[0], v[1], radius, i);
    });
}
function pointsOnCircle(x, y, r, n) {
    points = [];
    for(i=0;i<n;i++) {
        points.push([
            x+(Math.sin(2*Math.PI*(i/n))*r),
            y-(Math.cos(2*Math.PI*(i/n))*r)
        ]);
    }
    return points;
}
function drawAnaClock(ctx) {
    gradsizepx = 20;
    centerx = canvas.width/2;
    centery = canvas.height/2;
    radius = Math.min(canvas.width, canvas.height)/2;
    ctx.beginPath();
    ctx.arc(
        centerx,
        centery,
        radius,
        0, 2*Math.PI
    );
    ctx.stroke();
        // context.moveTo(
        //     centerx+(Math.cos(Math.PI*i/6)*(radius-gradsizepx)),
        //     centery+(Math.sin(Math.PI*i/6)*(radius-gradsizepx))
        // );
        // context.lineTo(x, y);
    context.stroke();
}

function drawLedChar(ctx, x, y, r, c) {
    var SPACING = r; // space LEDs by a radius
    var CHARS = [
        [[0,1,1,1,0],
         [1,0,0,0,1],
         [1,0,0,0,1],
         [1,0,0,0,1],
         [1,0,0,0,1],
         [1,0,0,0,1],
         [0,1,1,1,0]],

        [[0,0,1,0,0],
         [0,1,1,0,0],
         [0,0,1,0,0],
         [0,0,1,0,0],
         [0,0,1,0,0],
         [0,0,1,0,0],
         [0,1,1,1,0]],

        [[0,1,1,1,0],
         [1,0,0,0,1],
         [0,0,0,0,1],
         [0,1,1,1,0],
         [1,0,0,0,0],
         [1,0,0,0,0],
         [1,1,1,1,1]],

        [[0,1,1,1,0],
         [1,0,0,0,1],
         [0,0,0,0,1],
         [0,1,1,1,0],
         [0,0,0,0,1],
         [1,0,0,0,1],
         [0,1,1,1,0]],

        [[0,0,0,1,0],
         [0,0,1,1,0],
         [0,1,0,1,0],
         [1,0,0,1,0],
         [1,1,1,1,1],
         [0,0,0,1,0],
         [0,0,0,1,0]],

        [[1,1,1,1,1],
         [1,0,0,0,0],
         [1,0,0,0,0],
         [0,1,1,1,0],
         [0,0,0,0,1],
         [1,0,0,0,1],
         [0,1,1,1,0]],

        [[0,1,1,1,0],
         [1,0,0,0,1],
         [1,0,0,0,0],
         [1,1,1,1,0],
         [1,0,0,0,1],
         [1,0,0,0,1],
         [0,1,1,1,0]],

        [[1,1,1,1,1],
         [0,0,0,0,1],
         [0,0,0,1,0],
         [0,0,1,0,0],
         [0,1,0,0,0],
         [0,1,0,0,0],
         [0,1,0,0,0]],

        [[0,1,1,1,0],
         [1,0,0,0,1],
         [1,0,0,0,1],
         [0,1,1,1,0],
         [1,0,0,0,1],
         [1,0,0,0,1],
         [0,1,1,1,0]],

        [[0,1,1,1,0],
         [1,0,0,0,1],
         [1,0,0,0,1],
         [0,1,1,1,1],
         [0,0,0,0,1],
         [0,0,0,0,1],
         [0,1,1,1,0]],

        [[0,0,0,0,0],
         [0,0,0,0,0],
         [0,0,1,0,0],
         [0,0,0,0,0],
         [0,0,1,0,0],
         [0,0,0,0,0],
         [0,0,0,0,0]],
    ];
    CHARS[c].forEach(function (row, rownum, _) { // Each row
        row.forEach(function (cell, colnum, _) { // Each Col
            if (cell) {
                ctx.beginPath();
                ctx.arc(x+r+(colnum*((2*r)+SPACING)), y+r+(rownum*((2*r)+SPACING)), r, 0, 2*Math.PI);
                ctx.fill();
            }
        });
    });
}
function drawHHMM(ctx, x, y, r) {
    d = new Date();
    var DIGITWIDTH = (5 * 2 * r) + (4 * r);
    var DIGITHEIGHT = (7 * 2 * r) + (6 * r);
    var DIGITSPACING = 4 * r;
    y -= (DIGITHEIGHT/2); // change y from center line to top
    drawLedChar(ctx, x-(2.5*DIGITWIDTH)-(2*DIGITSPACING), y, r, Math.floor(d.getHours()/10));
    drawLedChar(ctx, x-(1.5*DIGITWIDTH)-(DIGITSPACING), y, r, d.getHours()%10);
    drawLedChar(ctx, x-(DIGITWIDTH/2), y, r, 10);
    drawLedChar(ctx, x+(DIGITWIDTH/2)+(DIGITSPACING), y, r, Math.floor(d.getMinutes()/10));
    drawLedChar(ctx, x+(1.5*DIGITWIDTH)+(2*DIGITSPACING), y, r, d.getMinutes()%10);
}

function drawSS(ctx, x, y, r) {
    d = new Date();
    var DIGITWIDTH = (5 * 2 * r) + (4 * r);
    var DIGITHEIGHT = (7 * 2 * r) + (6 * r);
    var DIGITSPACING = 4 * r;
    y -= (DIGITHEIGHT/2); // change y from center line to top
    drawLedChar(ctx, x-DIGITWIDTH-(DIGITSPACING/2), y, r, Math.floor(d.getSeconds()/10));
    drawLedChar(ctx, x+(DIGITSPACING/2), y, r, d.getSeconds()%10);
}

function drawLedClock(ctx) {
    ledradius = 5;
    centerx = canvas.width/2;
    centery = canvas.height/2;
    radius = (Math.min(canvas.width, canvas.height)/2)-15;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fill();
    var d = new Date();
    // Minute LEDs
    pointsOnCircleDo(centerx, centery, radius-(ledradius*4), 60, function(x, y, r, n) {
        if (d.getMinutes() >= n) {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(x, y, ledradius, 0, 2*Math.PI);
            ctx.fill();
        }
    });
    // Hour LEDs (always on)
    pointsOnCircleDo(centerx, centery, radius, 12, function(x, y, r, n) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(x, y, ledradius, 0, 2*Math.PI);
        ctx.fill();
    });
   drawHHMM(ctx, centerx, centery, 5);
   drawSS(ctx, centerx, centery+100, 3);
}

function drawClock() {
    canvas = document.getElementById("lol");
    ctx = canvas.getContext("2d");
    drawLedClock(ctx);
}

$( document ).ready(function() {
    setInterval(drawClock, 100);
});
