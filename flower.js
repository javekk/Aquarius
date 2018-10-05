
var SPEED = 4;
var FPS = 50;
    
var canvas = document.getElementById('flower');
var context = canvas.getContext('2d');

var areaWidth;
var areaHeight;

var moveAngle = 1;

//Canvas object
var area = {
    draw : function(){
        area.clear();
        draw();
    } ,
    clear : function() {
        context.clearRect(-(areaWidth / 2), -(areaHeight / 2), canvas.width, canvas.height);
    }   
};

function draw() {

    moveAngle = moveAngle >= Math.PI * 2 ? 0 : moveAngle + Math.PI * 0.001;
    var angle = moveAngle;

    context.beginPath();
    context.arc(0, 0, 100, 0, 2 * Math.PI, false);
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.stroke();

    createArcF(context, 0, 0, 5, 100, "black", 3, angle);
    createArcF(context, 0, 0, 5, 122, "black", 3, -angle);
    createArcF(context, 0, 0, 5, 150, "black", 3,angle);

    context.beginPath();
    context.arc(0, 0, 187, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.stroke();

    context.beginPath();
    context.arc(0, 0, 206, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.stroke();

    createArcF(context, 0, 0, 8, 206, "black", 3, -angle);
    createArcF(context, 0, 0, 8, 225, "black", 3, 0);

    context.beginPath();
    context.arc(0, 0, 247, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.stroke();

    createArcF(context, 0, 0, 5, 250, "black", 3, angle);
};

function createArcF(context, centerX, centerY, howManyPetals, internalRadius, strokeStyle, lineWidth, rotation){

    context.translate(centerX,centerY);    
    context.rotate(rotation);    
    context.beginPath();

    var rotAngle = ((Math.PI * 2) / howManyPetals) / 2;
    var angle = (Math.PI / 2) - (Math.PI - (Math.PI / 2) - rotAngle);
    
    var h = internalRadius;
    var k = h * Math.tan(rotAngle);
    var k1 = k * (3/4);    
    var k2 = k - k1;
    var s1 = (k1/2) * Math.tan(angle);
    var s2 = (k2/2) * Math.tan(angle);

    for(var i = 0; i < howManyPetals; i++){

        context.rotate((i-1)*rotAngle*2);

        // 5 Points for the first half 
        context.moveTo(0, -h); // A
        context.quadraticCurveTo(k1/2, -h-s1, k1, -h); // B, C
        context.quadraticCurveTo(k-(k2/2), -h+s2, k, -h); // D, E
        
        context.scale(-1, 1); 

        context.moveTo(0, -h); // A
        context.quadraticCurveTo(k1/2, -h-s1, k1, -h); // B, C
        context.quadraticCurveTo(k-(k2/2), -h+s2, k, -h); // D, E

        context.scale(-1, 1); // flip context horizontally

        context.rotate(-(i-1)*rotAngle*2);
    }

    context.moveTo(0, -h); // A
    context.closePath();

    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
    context.rotate(-rotation);
    context.translate(-centerX,-centerY); 
}

window.onload = function(){
    
    areaWidth = canvas.width;
    areaHeight = canvas.height;

    context.translate(areaWidth/2,areaHeight/2);

    this.interval = setInterval(area.draw, (1000/FPS));
    
}