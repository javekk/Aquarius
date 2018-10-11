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
        RainbowWeever.drawStepByStep(context, 0, 0, 100, 200, 300);
    } ,
    clear : function() {
        context.clearRect(-(areaWidth / 2), -(areaHeight / 2), canvas.width, canvas.height);
    }   
};


var RainbowWeever = {

    actualStep : 1,

    actualIncrement : 1,

    drawStepByStep : function(context, centerX, centerY, internalRadius, externalRadius, duration){
        
        //Circles center
        context.translate(centerX, centerY);
        
        //Every Frame update, reset for each step
        this.actualIncrement++;

        //Size of the rainbow
        var size = externalRadius - internalRadius;
        
        //Duration in frame
        var totalFrames = duration;
        
        //Different frame numbers for each step the ratio io 2-6-2
        var frameStep1 = 100;
        var frameStep2 = 300;
        var frameStep3 = 100;

        //=====STEP 1=====
        //first step, drawing the first line
        //2 seconds => frames = fps*2

        //if it is step 1 we use the percentaga otherwise the maxium
        var step1Incr = this.actualStep == 1 ? this.actualIncrement / frameStep1 : 1;

        var tmpStartingPoint = -internalRadius - (size / 2);
        
        context.beginPath();
        context.moveTo(tmpStartingPoint - ((size / 2) * step1Incr) , 0);
        context.lineTo(tmpStartingPoint + ((size / 2) * step1Incr), 0);
        context.stroke();
        

        if(this.actualStep == 1 && this.actualIncrement > frameStep1-1){
            this.actualStep = 2;
            this.actualIncrement = 0;
        }
        
        if(this.actualStep > 1){

            //=====STEP 2=====
            //Second step, drawing the arcs
            //6 seconds => frames = fps*2

            //if it is step 2 we use the percentaga otherwise the maxium
            var step2Incr = this.actualStep == 2 ? this.actualIncrement / frameStep2 : 1;

            var angle = Math.PI - (Math.PI * (step2Incr+0.00001));

            for(var i = 0; i <= 7; i++){
                var ratio = internalRadius + ((size / 7) * i);
                context.beginPath();
                context.arc(centerX, centerY, ratio, Math.PI, -angle, false);
                context.stroke();
            }

            if(this.actualIncrement > frameStep2-1){
                this.actualStep = 3;
                this.actualIncrement = 0;
            }
        }

        if(this.actualStep > 2){
            //=====STEP 3=====
            //Second step, draw two lines clonsing among each other
            //2 seconds => frames = fps*2

            var step3Incr = this.actualIncrement / frameStep3;
            
            context.beginPath();
            context.moveTo(internalRadius , 0);
            context.lineTo(internalRadius + ((size / 2) * step3Incr), 0);
            context.stroke();  

            context.beginPath();
            context.moveTo(externalRadius , 0);
            context.lineTo(externalRadius - ((size / 2) * step3Incr), 0);
            context.stroke(); 

            if(this.actualIncrement > frameStep3-1){
                this.actualStep = 1;
                this.actualIncrement = 0;
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