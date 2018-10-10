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
        RainbowWeever.drawStepByStep(context, 0, 0, 100, 200);
    } ,
    clear : function() {
        context.clearRect(-(areaWidth / 2), -(areaHeight / 2), canvas.width, canvas.height);
    }   
};


var RainbowWeever = {

    totalIncrement : 100,

    actualIncrement : 1,

    drawStepByStep : function(context, centerX, centerY, internalRadius, externalRadius){
        
        //Circles center
        context.translate(centerX, centerY);
        
        //Every Frame update 
        this.actualIncrement++;

        var percentageIncrement = this.actualIncrement / this.totalIncrement;
        
        var size = externalRadius - internalRadius;

        //=====STEP 1=====
        //first step, drawing the first line
        //2 seconds => frames = fps*2

        if(this.actualIncrement > this.totalIncrement){
            this.actualIncrement = 1;
        }

        var tmpStartingPoint = -internalRadius - (size / 2);
        
        context.beginPath();
        context.moveTo(tmpStartingPoint - ((size / 2) * percentageIncrement) , 0);
        context.lineTo(tmpStartingPoint + (size * percentageIncrement), 0);
        context.stroke();
        
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