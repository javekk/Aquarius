//             _                                     _               
//            / \      __ _   _   _    __ _   _ __  (_)  _   _   ___ 
//           / _ \    / _` | | | | |  / _` | | '__| | | | | | | / __|
//          / ___ \  | (_| | | |_| | | (_| | | |    | | | |_| | \__ \
//         /_/   \_\  \__, |  \__,_|  \__,_| |_|    |_|  \__,_| |___/
//                       |_|                                         
//
//                                                          by @javekk


//Global variables
var areaWidth;
var areaHeight;


//Main components
var mainC;
var sCs = [];

window.onload = function() {
    init();
};


//Init function
function init(){
    area.init();

    mainC = new MainC();

    for(var i = 0; i < 1000; i++){
        sCs.push(new SquareComponent( 20 ,20,"red", (Math.random()*5000) % 5000, (Math.random()*5000) % 5000));
        sCs.push(new SquareComponent( 20 ,20,"yellow", (Math.random()*5000) , (Math.random()*5000) ));
        sCs.push(new SquareComponent( 20 ,20,"blue", (Math.random()*5000), (Math.random()*5000)));
    }
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

        this.interval = setInterval(update, 20);

        //Listeners for keys
        window.addEventListener('keydown', function (e) {
            area.keys = (area.keys || []);
            area.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            area.keys[e.keyCode] = (e.type == "keydown");            
        })
    },
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }   
};


function MainC(){

    this.update = function(moveX,moveY){

        if(moveX != 0 || moveY != 0){
           this.angle = (Math.PI / 2) + getAngle(moveX,moveY);
        }

        ctx = area.ctx;

        ctx.translate(areaWidth / 2, areaHeight /2 );
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.moveTo(-12 , -12);
        ctx.lineTo(+ 12 ,-12);
        ctx.lineTo(0  , 24);

        ctx.fillStyle = "green";
        ctx.fill();
        ctx.rotate(-this.angle);
        ctx.translate(-(areaWidth / 2),-(areaHeight / 2));
        
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
    
    //Speed
    this.speed = 2;

    //Do I have to move?
    this.moveX = 0;
    this.moveY = 0;    

    this.update = function(){
        ctx = area.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.newPos = function(moveX, moveY) {
        this.x += moveX * this.speed;
        this.y += moveY * this.speed;        
    }   
}


//Update the canvas/area and the componets
function update(){
    //Always clear the Area
    area.clear(); 
    
    //Get user feedbacks
    var moveX = 0;
    var moveY = 0;

    if (area.keys && area.keys[37]) {moveX = 1; }
    if (area.keys && area.keys[38]) {moveY = 1; }
    if (area.keys && area.keys[39]) {moveX = -1; }   
    if (area.keys && area.keys[40]) {moveY = -1; }

    //Update the componet
    for(var i = 0; i < sCs.length; i++){
        sCs[i].newPos(moveX, moveY);    
        sCs[i].update();
    }
    mainC.update(moveX, moveY);
}


function getAngle(moveX, moveY){
    switch (moveX){
        case 0 : if(moveY == 0) return 10;
                 else if(moveY == 1) return Math.PI / 2;
                 else if(moveY == -1) return Math.PI * (3/2);
        break;
        case 1 :if(moveY == 0) return Math.PI * 2;
                else if(moveY == 1) return Math.PI / 4;
                else if(moveY == -1) return Math.PI * (7/4);
        break;
        case -1 :if(moveY == 0) return Math.PI;
                else if(moveY == 1) return Math.PI * (3/4);
                else if(moveY == -1) return Math.PI * (5/4);
        break;
    }
}