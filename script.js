//             _                                     _               
//            / \      __ _   _   _    __ _   _ __  (_)  _   _   ___ 
//           / _ \    / _` | | | | |  / _` | | '__| | | | | | | / __|
//          / ___ \  | (_| | | |_| | | (_| | | |    | | | |_| | \__ \
//         /_/   \_\  \__, |  \__,_|  \__,_| |_|    |_|  \__,_| |___/
//                       |_|                                         
//
//                                                          by @javekk


//Global variables
var areaWidth;  //visible area width
var areaHeight; //visible area height
var gameAreaDimScale = 3; //how big(in times) respect to the visible area?

var SPEED = 4;
var FPS = 50;

var maxNumberOfComponents = 10;

//Main components
var mainC;
var sCs = new Set();


window.onload = function() {
    init();
};


//Init function
function init(){

    area.init();

    mainC = new MainC();
};


//Canvas object
var area = {
    canvas : null,
    ctx : null,
    init : function() {
        
        //Get the canvas
        this.canvas = document.getElementById("area");
        this.ctx = this.canvas.getContext("2d");

        //Init a couple of variables
        areaWidth = area.canvas.width;
        areaHeight = area.canvas.height;

        this.ctx.translate(areaWidth / 2, areaHeight  / 2);

        this.interval = setInterval(update, (1000/FPS));

        //Listeners for keys
        window.addEventListener('keydown', function (e) {
            area.keys = (area.keys || []);
            area.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            area.keys[e.keyCode] = (e.type == "keydown");            
        });

        //Create components
        creator.create(true);

    },
    clear : function() {
        this.ctx.clearRect(-(areaWidth / 2), -(areaHeight / 2), this.canvas.width, this.canvas.height);
    }   
};


//Our ship
function MainC(){

    this.angle = 0;

    this.update = function(move, angleDif){

        this.angle += (angleDif * Math.PI / 180) * SPEED;       
        
        ctx = area.ctx;

        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.moveTo(-12 , -12);
        ctx.lineTo(+ 12 ,-12);
        ctx.lineTo(0  , 24);

        ctx.fillStyle = "green";
        ctx.fill();
        ctx.rotate(-this.angle);   
    }
    
    this.newPos = function() {
    }
}


//Function to create a square componets 
function SquareComponent(width, height, color, x, y) {

    //Actual size
    this.width = width;
    this.height = height;

    //Actual position
    this.x = x;
    this.y = y;    

    this.color = color;

    this.angle = 0;

    this.update = function(){

        /*
        ctx = area.ctx;
        ctx.fillStyle = color;
        //Draw the object
        area.ctx.fillRect(this.x, this.y, this.width, this.height);
        */
        /*
        area.ctx.beginPath();
        area.ctx.arc(this.x, this.y, 100, 0, 2 * Math.PI, false);
        area.ctx.strokeStyle = 'black';
        area.ctx.lineWidth = 5;
        area.ctx.stroke();
        colorWOW(area.ctx);

        FlowerArcEi.drawFA(area.ctx, this.x, this.y, 5, 100, "WOW", 3, 1);
        FlowerArcEi.drawFA(area.ctx, this.x, this.y, 5, 122, "WOW", 3, -1);
        
        */
     
        RainbowWeever.drawStepByStep(area.ctx, this.x, this.y, 100, 300,6,"WOW", 300);
       
    }
    
    this.newPos = function(move, angleDif) {    

        this.x += (move * SPEED) * Math.sin(mainC.angle);
        this.y -= (move * SPEED) * Math.cos(mainC.angle);     
        
        //kill me if I am out of the game area
        if(Math.abs(this.x) > (areaWidth * gameAreaDimScale) / 2  ||   Math.abs(this.y) > (areaHeight * gameAreaDimScale) / 2){
               this.killMe();
        }
    }   

    this.killMe = function(){
        sCs.delete(this);
        creator.actualNumberOfComponents--;
        creator.create();
    }
}


//Update the canvas/area and the componets
function update(){
    //Always clear the Area
    area.clear(); 
    
    //Get user feedbacks
    var move = 0;
    var angleDif = 0

    //leftward
    if (area.keys && area.keys[37]) {angleDif = -1; }

    //rightward
    if (area.keys && area.keys[39]) {angleDif = 1; } 

    //Forward
    if (area.keys && area.keys[38]) {
        move = 1; 
        if (area.keys && area.keys[37]) {angleDif = -1; }
        if (area.keys && area.keys[39]) {angleDif = 1; } 
    }
    
    //Backward
    if (area.keys && area.keys[40]) {
        move = -1; 
        if (area.keys && area.keys[37]) {angleDif = 1; }
        if (area.keys && area.keys[39]) {angleDif = -1; } 
    }

    //Update the componet
    sCs.forEach(function(entry){
        entry.newPos(move, angleDif);    
        entry.update();
    });
    mainC.update(move, angleDif);
}


//Creator
var creator = {
    
    actualNumberOfComponents : 0 ,
  
    //Create only outside the visible area
    //if init it will create even in the visible area
    create : function(init){
        while(this.actualNumberOfComponents < maxNumberOfComponents){

            //Random color
            var color = "red";
            switch(Math.round(Math.random()*4)){
                case 2 : color = "blue"; break;
                case 3 : color = "yellow"; break;
            }
            
            //Max possible values
            var mX = ((areaWidth * gameAreaDimScale) / 2);
            var mY = ((areaHeight * gameAreaDimScale) / 2);
        
            //not so random directions
            if(Math.round(Math.random()*4) % 2 == 0) mX = -mX;
            if(Math.round(Math.random()*4) % 2 == 0) mY = -mY;

            //make some tricks
            var x = Math.random() * mX;
            var y = Math.random() * mY;

            if(!init){
                while(Math.abs(x) < areaWidth / 2 && Math.abs(y) < areaHeight / 2){
                    x = Math.random() * mX;
                    y = Math.random() * mY;
                }
            }

            sCs.add(new SquareComponent( 20 ,20, color, x, y));
            
            //keep the count
            this.actualNumberOfComponents++;
        }
    }
}

