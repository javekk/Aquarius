var SPEED = 4;
var FPS = 50;
    
var canvas = document.getElementById('rainbow');
var context = canvas.getContext('2d');

var areaWidth;
var areaHeight;


//Canvas object
var area = {
    draw : function(){
        area.clear();
        RainbowWeever.drawStepByStep(context, 0, 0, 100, 200,2,"WOW", 300);
    } ,
    clear : function() {
        context.clearRect(-(areaWidth / 2), -(areaHeight / 2), canvas.width, canvas.height);
    }   
};


var RainbowWeever = {

    actualStep : 1,

    actualIncrement : 1,

    drawStepByStep : function(context, centerX, centerY, internalRadius, externalRadius,stokeSize, strokeStyle, duration){
        
        //Circles center
        context.translate(centerX, centerY);
        
        //Every Frame update, reset for each step
        this.actualIncrement++;

        //Size of the rainbow
        var size = externalRadius - internalRadius;
        
        //Duration in frame
        var totalFrames = duration;
        
        //Different frame numbers for each step the ratio io 2-6-2
        var frameStep1 = 150;
        var frameStep2 = 150;
        var frameStep3 = 30;

        //Stroke
        if(strokeStyle == "WOW"){
            context.strokeStyle = colorizeC.colorize();
        }
        else{
            context.strokeStyle = strokeStyle
        }
        context.lineWidth = stokeSize;


        //=====STEP 1=====
        //first step, drawing the first line
        if(this.actualStep > 0 && this.actualStep < 4){

            //if it is step 1 we use the percentaga otherwise the maxium
            var step1Incr = this.actualStep == 1 ? this.actualIncrement / frameStep1 : 1;

            var tmpStartingPoint = -internalRadius - (size / 2);
            
            context.beginPath();
            context.moveTo(tmpStartingPoint - ((size / 2) * step1Incr) , 0);
            context.lineTo(tmpStartingPoint + ((size / 2) * step1Incr), 0);
            context.stroke();
            
            if(this.actualStep == 1 && this.actualIncrement > frameStep1-1){
                this.actualStep = 2;
                this.actualIncrement = 1;
            }
        }
        
        //=====STEP 2=====
        //Second step, drawing the arcs
        if(this.actualStep > 1 && this.actualStep < 5){

            //if it is step 2 we use the percentaga otherwise the maxium
            var step2Incr = this.actualStep == 2 ? this.actualIncrement / frameStep2 : 1;

            var angle = Math.PI - (Math.PI * (step2Incr+0.00001));

            for(var i = 0; i <= 7; i++){
                var ratio = internalRadius + ((size / 7) * i);
                context.beginPath();
                context.arc(centerX, centerY, ratio, Math.PI, -angle, false);
                context.stroke();
            }

            if(this.actualStep == 2 && this.actualIncrement > frameStep2-1){
                this.actualStep = 3;
                this.actualIncrement = 1;
            }
        }

        //=====STEP 3=====
        //Draw the lines to close the rainbow
        if(this.actualStep > 2 && this.actualStep < 6){

            var step3Incr = this.actualStep == 3 ? this.actualIncrement / frameStep3 : 1;
            
            context.beginPath();
            context.moveTo(internalRadius , 0);
            context.lineTo(internalRadius + ((size / 2) * step3Incr), 0);
            context.stroke();  

            context.beginPath();
            context.moveTo(externalRadius , 0);
            context.lineTo(externalRadius - ((size / 2) * step3Incr), 0);
            context.stroke(); 

            if(this.actualStep == 3 && this.actualIncrement > frameStep3-1){
                this.actualStep = 4;
                this.actualIncrement = 1;
            }
        }

    
        //=====STEP 4=====
        //Draw the lines to open the rainbow
        if(this.actualStep > 3){
            
            //if it is step 4 we use the percentage(same as 1) otherwise the maxium
            var step4Incr = this.actualStep == 4 ? this.actualIncrement / frameStep1 : 1;

            var tmpStartingPoint = -internalRadius - (size / 2);
            
            context.beginPath();
            context.moveTo(-externalRadius , 0);
            context.lineTo(tmpStartingPoint - ((size / 2) * step4Incr), 0);
            context.stroke();

            context.beginPath();
            context.moveTo(-internalRadius , 0);
            context.lineTo(tmpStartingPoint + ((size / 2) * step4Incr), 0);
            context.stroke();
            
            if(this.actualStep == 4 && this.actualIncrement > frameStep1-1){
                this.actualStep = 1;
                this.actualIncrement = 1;
            }

        }

        //Go back  
        context.translate(-centerX, -centerY);
    }
}


//Get the context and start the program YEAh :D
window.onload = function(){
    
    areaWidth = canvas.width;
    areaHeight = canvas.height;

    context.translate(areaWidth/2,areaHeight/2);

    this.interval = setInterval(area.draw, (1000/FPS));
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
        this.t = this.t + 0.02 * Math.random();
        var x = scalX.nextX();
        var y = scalY.nextY();
        return col(R(x, y, this.t), G(x, y, this.t), B(x, y, this.t));
    }
}

function colorWOW(context){
    context.strokeStyle = colorizeC.colorize();
    context.stroke();   
}