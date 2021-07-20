var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;

  ghost = createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);

  if(gameState==="play") {
        if(tower.y > 400){
          tower.y = 300
      }

      if(keyDown("left_arrow")) {
        ghost.x -= 3;
      }

      if(keyDown("right_arrow")) {
        ghost.x += 3;
      }

      if(keyDown("space")) {
        ghost.velocityY = -5;
      }
      ghost.velocityY += 0.8;

      if(invisibleBlockGroup.isTouching(ghost)) {
        ghost.destroy();
        gameState = "end";
      }

      spawnDoors();
  }
  
  if(gameState==="end") {
    text("Game Over",230,250);
    tower.velocityY = 0;
  }

  drawSprites();
}

function spawnDoors() {
  if(frameCount%240===0) {
    door = createSprite(200,-50);
    door.velocityY = 1;
    door.addImage(doorImg);
    
    door.x = Math.round(random(120,400));

    climber = createSprite(200,10);
    climber.velocityY = 1;
    climber.addImage(climberImg);

    climber.x = door.x;

    invisibleBlock = createSprite(200,15);
    invisibleBlock.velocityY = 1;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;

    invisibleBlock.x = door.x;

    door.lifetime = 600;
    doorsGroup.add(door);

    climber.lifetime = 600;
    climbersGroup.add(climber);

    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}