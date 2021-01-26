// global variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var monkeyd;
var scores;
var ba,baIMG;
var reset,resetI;
var monkeyde;
var blank;

//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//function Preload
function preload(){
  
  
//Monkey
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
  
monkeyd = loadImage("sprite_0.png")

baIMG = loadImage("background.jpg");
resetI = loadImage("901841-200.png");
}


//function Setup
function setup() {
  

// create canvas
createCanvas(400,400);


  
//Monkey
monkey = createSprite(50, 315, 10, 10);
monkey.addAnimation("monkey_running",monkey_running);
monkey.scale = 0.1;
  
// Ground
ground = createSprite(70, 350, 800, 10);
ground.velocityX = -4;
ground.x=ground.width/2;
ground.visible=true;
  
//Groups
FoodGroup = createGroup();
obstacleGroup = createGroup();
  
//score
score = 0;
scores = 0;
}

//funtion draw
function draw() {
  
//Background
background (180);
  
//displaying survialtime
stroke("black");
fill("black");
textSize(20);
text("Survial Time: "+  score, 100, 50);

// displaying score
stroke("black");
fill("black")
textSize(20);
text("score: " + scores,120,80);
  

  
// monkey Collide
monkey.collide(ground);
  

// gamestate play
if(gameState === PLAY){
score = Math.ceil(frameCount/frameRate());
     
  

// ground re generation
if (ground.x < 0){
ground.x = ground.width/2;
}
  
// background re

    
//jump
if(keyDown("space")&&monkey.y>250){
monkey.velocityY = -13;
}    
  

    
//Gravity
monkey.velocityY = monkey.velocityY + 0.8;
  
if(monkey.isTouching(FoodGroup)){
scores = scores+1;
FoodGroup.destroyEach();
}
  
switch(scores){
case 5: monkey.scale=0.11;
break;
case 10: monkey.scale=0.12;
break;
case 15: monkey.scale=0.13;
break;
case 20: monkey.scale=0.14;
break;
case 25: monkey.scale=0.15;
break;
case 30: monkey.scale=0.16;
break;
case 40: monkey.scale=0.18;
break;
case 50: monkey.scale=0.20;
break;
case 60: monkey.scale=0.22;
    break;
case 70: monkey.scale=0.24;
break;
case 80: monkey.scale=0.26;
break;
default:break;
}
  
//Adding Functions
food();
obstacles();
    
// switch to end
if(obstacleGroup.isTouching(monkey)&&scores>0){
monkey.scale=0.1
scores=0;
obstacleGroup.destroyEach();
}

if(obstacleGroup.isTouching(monkey)&&scores<1){
gameState=END;
}

}

// gamestate END
if (gameState === END) {
obstacleGroup.destroyEach();
FoodGroup.destroyEach();
ground.velocityX=0;
monkey.destroy();
reset = createSprite(200,200);
reset.addImage(resetI);
reset.scale=0.5;
if(mousePressedOver(reset)||keyDown("space")){
restart();
reset.visible = false;
}
text("dead,dead,dead!!",100 ,120);

}
 
//draw Sprites
drawSprites();
}

// function Banana
function food() {
if (frameCount % 80 === 0) {
banana = createSprite(400,350,40,10);
banana.addImage(bananaImage);
banana.y = Math.round(random(120,200));
banana.scale = 0.1;
banana.velocityX = -3;
banana.lifetime = 130;
FoodGroup.add(banana);
}
}

//function Obstacles
function obstacles() {
if (frameCount % 120 === 0){
obstacle = createSprite(460,325,10,10);
obstacle.addImage(obstacleImage);
obstacle.velocityX = -3;
obstacle.lifetime = 145;
obstacle.scale = 0.1 ;
obstacleGroup.add(obstacle);
}
}

function restart(){
gameState=PLAY;
scores=0;
score=0;
  monkey = createSprite(50, 315, 10, 10);
monkey.addAnimation("monkey_running",monkey_running);
monkey.scale = 0.1;
blank=createSprite(200,200,100,100);
  blank.shapeColor=180;
}
