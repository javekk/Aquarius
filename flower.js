/*
var SPEED = 4;
var FPS = 50;
    
var canvas = document.getElementById('flower');
var context = canvas.getContext('2d');

var areaWidth;
var areaHeight;


//Canvas object
var area = {
    draw : function(){
        area.clear();
        drawFlower();
    } ,
    clear : function() {
        context.clearRect(-(areaWidth / 2), -(areaHeight / 2), canvas.width, canvas.height);
    }   
};

function drawFlower() {

    context.beginPath();
    context.arc(0, 0, 100, 0, 2 * Math.PI, false);
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.stroke();
    colorWOW(context);

    FlowerArcEi.drawFA(context, 0, 0, 5, 100, "WOW", 3, 1);
    FlowerArcEi.drawFA(context, 0, 0, 5, 122, "WOW", 3, -1);
    FlowerArcEi.drawFA(context, 0, 0, 5, 150, "WOW", 3, 1);

    context.beginPath();
    context.arc(0, 0, 187, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.stroke();
    colorWOW(context);

    context.beginPath();
    context.arc(0, 0, 206, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.stroke();
    colorWOW(context);

    FlowerArcEi.drawFA(context, 0, 0, 8, 206, "WOW", 3, -1);
    FlowerArcEi.drawFA(context, 0, 0, 8, 225, "WOW", 3, 0);

    context.beginPath();
    context.arc(0, 0, 247, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.stroke();
    colorWOW(context);

    FlowerArcEi.drawFA(context, 0, 0, 5, 250, "WOW", 3, 1);
};
*/

var FlowerArcEi = {
    
    //Angle used in the animation
    moveAngleAni : 0.00001,

    drawFA : function (context, centerX, centerY, howManyPetals, internalRadius, strokeStyle, lineWidth, rotation) {
        
        //Center of the circle
        context.translate(centerX, centerY);

        //Base on the animation angle step, rotate
        context.rotate(0);
        this.moveAngleAni = this.moveAngleAni >= Math.PI * 2 ? 0 : Math.abs(this.moveAngleAni) + Math.PI * 0.00001;
        context.rotate(this.moveAngleAni * rotation);

        //Trigonometric functions as fuck
        var rotAngle = ((Math.PI * 2) / howManyPetals) / 2;
        var angle = (Math.PI / 2) - (Math.PI - (Math.PI / 2) - rotAngle);
        var h = internalRadius;
        var k = h * Math.tan(rotAngle);
        var k1 = k * (3 / 4);
        var k2 = k - k1;
        var s1 = (k1 / 2) * Math.tan(angle);
        var s2 = (k2 / 2) * Math.tan(angle);

        context.beginPath();
        for (var i = 0; i < howManyPetals; i++) {
            context.rotate((i - 1) * rotAngle * 2);
            // 5 Points for the first half 
            context.moveTo(0, -h); // A
            context.quadraticCurveTo(k1 / 2, -h - s1, k1, -h); // B, C
            context.quadraticCurveTo(k - (k2 / 2), -h + s2, k, -h); // D, E
            //mirror
            context.scale(-1, 1);
            context.moveTo(0, -h); // A
            context.quadraticCurveTo(k1 / 2, -h - s1, k1, -h); // B, C
            context.quadraticCurveTo(k - (k2 / 2), -h + s2, k, -h); // D, E
            context.scale(-1, 1); // flip context horizontally
            context.rotate(-(i - 1) * rotAngle * 2);
        }
        context.moveTo(0, -h); // A
        context.closePath();
        //Stroke
        context.lineWidth = lineWidth;
        if(strokeStyle != "WOW"){
            context.strokeStyle = strokeStyle;
            context.stroke();
        }
        else{
            colorWOW(context);
        }
        //All back to normal
        context.rotate(-this.moveAngleAni * rotation);
        context.translate(-centerX, -centerY);
    }
}

/*
 * Color animation   
 */

function col(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}
function R(x, y, t) {
    return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
}
function G(x, y, t) {
   return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
} 
function B(x, y, t) {
   return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
}
var scalX = {
    x : 0,
    inc : 0.001,
    nextX : function(){
        this.x = this.x >= 35 ? 0 : this.x+this.inc;
        return Math.round(this.x); 
    }
}
var scalY = {
    y : 0,
    inc : 0.001,
    nextY : function(){
        this.y = this.y >= 35 ? 0 : this.y+this.inc;
        return Math.round(this.y); 
    }
}

var colorizeC = {
    t : 0 ,
    colorize : function() {
        this.t = this.t + 0.0002 * Math.random();
        var x = scalX.nextX();
        var y = scalY.nextY();
        return col(R(x, y, this.t), G(x, y, this.t), B(x, y, this.t));
    }
}

function colorWOW(context){
    context.strokeStyle = colorizeC.colorize();
    context.stroke();   
}

/*
window.onload = function(){
    
    areaWidth = canvas.width;
    areaHeight = canvas.height;

    context.translate(areaWidth/2,areaHeight/2);

    this.interval = setInterval(area.draw, (1000/FPS));
    
}
*/