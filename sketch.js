var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running , monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage, bg, bgImage, restart, restartImage;
var foodGroup, obstacleGroup

var invisibleGround;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("forest.jpg");
  restartImage = loadImage("restart.png");
  
}

survival_time = 0;

function setup() {
  
createCanvas(600, 600);
  
  bg = createSprite(0,0,600,600);
  bg.addImage(bgImage);
  bg.scale=2.5;
  
  monkey = createSprite(80,380,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(200,420,400,10);
  invisibleGround.visible = false; 
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.visible = false;
 
 obstacleGroup = createGroup();
 foodGroup = createGroup();
  
}



function draw()
{

  if(gameState === PLAY){

bg.velocityX = -5; 

    if (bg.x < 0){
      bg.x = bg.width/2;
    }  
  
  if(keyDown("space")&& monkey.y >= 100) 
  {
    monkey.velocityY=-13;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
    
  monkey.collide(invisibleGround);
  
  if(foodGroup.isTouching(monkey)) {
     foodGroup.destroyEach();
     survival_time = survival_time+50;
  }
    
   if(obstacleGroup.isTouching(monkey)) {
     foodGroup.destroyEach();
     obstacleGroup.destroyEach();
     survival_time = survival_time+50;
     gameState = END;
  } 
    
  }
  
   else if (gameState === END) {
      
     restart.visible = true;
     restart.scale = 0.1
     bg.x =0;
     foodGroup.setLifetimeEach(-1);
     foodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     monkey.changeAnimation("collided", monkey_collided);
   }
  
     
  spawnobstacles();
  spawnfood();
  
drawSprites();
  
    textSize (20);
    fill ("darkgreen");
    text("SURVIVAL TIME: "+ survival_time, 230,50);
  
}


function spawnobstacles() {
  
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,390,20,20);
    obstacle.x = Math.round(random(600,700));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    
    obstacle.lifetime = 200;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    obstacleGroup.add(obstacle);
  }
}


function spawnfood() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -5;
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

