
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;

function preload(){
}


function setup() {
  createCanvas(600, 200);
  
  rocketShip = createSprite(50,180,20,50);
  rocketShip.addImage(rocket.png)
  rocketShip.scale = (0.5);
  
  ground = createSprite(200,180,400,20);
  ground.addImage();
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage();
  
  restart = createSprite(300,140);
  restart.addImage();
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      rocketShip.velocityY = -12;
    }
  
    rocketShip.velocityY = rocketShip.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    rocketShip.collide(invisibleGround);
    spawnClouds();
  
    if(obstacle.isTouching(rocketShip)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    rocketShip.velocityY = 0;
    obstacle

    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      default: break;
    }
            
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  rocketShip.changeAnimation();
  
 
  
  score = 0;
  
}