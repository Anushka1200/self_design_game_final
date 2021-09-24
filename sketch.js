var backgroundImg;
var boy,boy_running;
var boy_flying;
var coinImg,coinGroup1,coinGroup2,coinGroup3,coinGroup3,coinGroup4,coinGroup5;
var monsterImg,monsterGroup;
var bg;
var alienMonsterImg;
var monster2Img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround;
var score = 0;
var  bombImg , bombGroup;
var explosionImg,explosionGroup;
var isBoyTouching = false;
var gameOverImg,gameOver;
var restartImg,restart;
var explosionSound;
var monsterTouchingSound;
var coinTouchingSound;
var themeSound;



function preload(){
   backgroundImg = loadImage("Images/bg1.png");

   boy_running = loadAnimation("Images/Running_1.png","Images/Running_2.png","Images/Running_3.png"
   ,"Images/Running_4.png","Images/Running_5.png" ,"Images/Running_6.png","Images/Running_7.png");

    boy_flying = loadAnimation("Images/Jetpack1.png","Images/Jetpack2.png");
    
    coinImg = loadAnimation("Images/Coin1.png","Images/Coin2.png","Images/Coin3.png","Images/Coin4.png"
    ,"Images/Coin5.png","Images/Coin6.png","Images/Coin7.png");
    monsterImg = loadImage("Images/Monster.png");

     alienMonsterImg = loadImage("Images/alienMonster.png");

     monster2Img = loadAnimation("Images/monster1.png","Images/monster2.png","Images/monster3.png",
     "Images/monster4.png", "Images/monster5.png","Images/monster6.png")

     bombImg = loadImage("Images/Bomb1.png");

     explosionImg = loadAnimation("Images/Bomb2.png","Images/Bomb4.png","Images/Bomb5.png","Images/Bomb6.png",
     "Images/Bomb7.png");

     gameOverImg = loadImage("Images/gameOverImg.png");
      restartImg = loadImage("Images/restartImg.png");

      explosionSound = loadSound("sounds/explosion.wav");
      coinTouchingSound = loadSound("sounds/coinTouching.wav");
      monsterTouchingSound = loadSound("sounds/monsterTouching.wav");
      themeSound = loadSound("sounds/themeSound.mp3");
     
}

function setup() {

  createCanvas(windowWidth,windowHeight);

  bg = createSprite(0,height/2-250,width,height);
  bg.scale = 2.1;
  bg.x = bg.width/2;
  bg.addImage(backgroundImg);

  boy = createSprite(200,height/2+200,40,50);
  boy.addAnimation("running",boy_running);
 // boy.debug = true;
  boy.setCollider("rectangle",0,0,boy.width-10,boy.height)

  gameOver = createSprite(width/2,height/2-100,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7;

  restart = createSprite(width/2,height/2+70,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.4;

  invisibleGround = createSprite(width/2,height-100,width,20);
  invisibleGround.visible = false;
  
  coinGroup1 = createGroup();
  coinGroup2 = createGroup();
  coinGroup3 = createGroup();
  coinGroup4 = createGroup();
  coinGroup5 = createGroup();

  bombGroup = createGroup();
  monsterGroup = createGroup();
  explosionGroup = createGroup();

  themeSound.loop();
}

function draw() {
 background(0);


  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    bg.velocityX = -(4+score/10);

    if(bg.x < 100){
      bg.x = bg.width/2;
    }
    if(touches.length > 0 || keyDown("space")&& boy.y>= 100){
      boy.velocityY = -12;
      touches = [];
    }

    if(boy.isTouching(coinGroup1)){
      coinGroup1.destroyEach();
      score = score+5;
      coinTouchingSound.play();
    }

    if(boy.isTouching(coinGroup2)){
      coinGroup2.destroyEach();
      score = score+5;
      coinTouchingSound.play();
    }

    if(boy.isTouching(coinGroup3)){
      coinGroup3.destroyEach();
      score = score+5;
      coinTouchingSound.play();
    }

    if(boy.isTouching(coinGroup4)){
      coinGroup4.destroyEach();
      score = score+5;
      coinTouchingSound.play();
    }

    if(boy.isTouching(coinGroup5)){
      coinGroup5.destroyEach();
      score = score+5;
      coinTouchingSound.play();
    }

    boy.velocityY = boy.velocityY+0.8;

      spawnMonster();
      spawnCoin();
      var rand = Math.round(random(1,4));
      switch(rand){
        case 1:
           if(frameCount % 250=== 0){
              spawnBomb();
           }
           break;
        case 2: 
            if(frameCount % 320 === 0){
              spawnBomb();
            }  
            break;
        case 3: 
             if(frameCount % 150 === 0){
               spawnBomb();
             }     
             break;
        case 4: 
              if(frameCount % 200 === 0){
                spawnBomb();
              } 
              break;

      }

      if(boy.isTouching(monsterGroup)){
        monsterTouchingSound.play();
        gameState = END;
      }

     if(boy.isTouching(bombGroup)){
       explosionSound.play(); 
      bombGroup.destroyEach();
       explosion();
       gameState = END;
       boy.visible = false;

     }

  } else if(gameState === END){
     bg.velocityX = 0;
     bombGroup.setVelocityXEach(0);
     bombGroup.setLifetimeEach(-1);
     themeSound.stop();
     /*
     coinGroup1.setVelocityXEach(0);
     coinGroup1.setLifetimeEach(-1);
     coinGroup2.setVelocityXEach(0);
     coinGroup2.setLifetimeEach(-1);
     coinGroup3.setVelocityXEach(0);
     coinGroup3.setLifetimeEach(-1);
     coinGroup4.setVelocityXEach(0);
     coinGroup4.setLifetimeEach(-1);
     coinGroup5.setVelocityXEach(0);
     coinGroup5.setLifetimeEach(-1);
     */
    coinGroup1.destroyEach();
    coinGroup2.destroyEach();
    coinGroup3.destroyEach();
    coinGroup4.destroyEach();
    coinGroup5.destroyEach();
     monsterGroup.setVelocityXEach(0);
     monsterGroup.setLifetimeEach(-1);
     
     boy.velocityY = 0;

     gameOver.visible = true;
     restart.visible = true;

     if(mousePressedOver(restart)){
      reset();
    }
  }
  boy.collide(invisibleGround);

  drawSprites();

  textSize(30);
  fill("red");
  stroke("yellow")
  text("Score: " + score ,100,50);
}

function spawnMonster(){
  if(frameCount % 150 === 0){
     var obstacle = createSprite(width,height/2+200,50,50);
    obstacle.velocityX = -(5+score/10);
    //obstacle.debug = true;

    var rand = Math.round(random(1,3))
    switch(rand){
      case 1 : obstacle.addAnimation("monster2",monster2Img); 
                obstacle.setCollider("rectangle",0,0,obstacle.width-35,obstacle.height-20)
               obstacle.scale = 1.5;
               break;
      case 2 : obstacle.addAnimation("alienMonster",alienMonsterImg);
               obstacle.setCollider("rectangle",0,0,obstacle.width-50,obstacle.height-50)
               obstacle.scale = 0.8;
               break;
      case 3 : obstacle.addAnimation("monster",monsterImg);
               obstacle.setCollider("rectangle",0,0,obstacle.width-10,obstacle.height-30)
              break;
      default: break;
    }
    monsterGroup.add(obstacle);
  }
}

function spawnCoin(){
  if(frameCount % 40 === 0){
    var coin = createSprite(width,500,50,50);
    coin.addAnimation("coin",coinImg);
  //  coin.debug = true;
    coin.setCollider("circle",0,0,coin.width-90)
    coin.velocityX = -5;
    coin.lifetime = 300;
    coin.scale = 0.5;
    coin.y = Math.round(random(width/7-100,width-1000));
    var rand = Math.round(random(1,5))
    switch(rand){ 
      case 1: coinGroup1.add(coin)
      break;
      case 2: coinGroup2.add(coin)
      break;
      case 3: coinGroup3.add(coin)
      break;
      case 4: coinGroup4.add(coin)
      break;
      case 5: coinGroup5.add(coin)
      break;
    }
  }
}

function spawnBomb(){
  
    var bomb = createSprite(width,Math.round(random(20,height/2)),50,50);
   
    if(isBoyTouching){
      bomb.addAnimation("explosion", explosionImg);
    } else {
      bomb.addImage("bomb",bombImg)
    }
   // bomb.debug = true;
    bomb.setCollider("circle",0,10,bomb.width-50)
    bomb.velocityX = -(3+score/100);
    bomb.lifetime = width;
    bomb.scale = 1;
    bomb.depth = gameOver.depth-1;
    bombGroup.add(bomb);
    
  
}

function explosion(){
  var explosion = createSprite(100,50,20,10);
  explosion.addAnimation("explosion",explosionImg);
  explosion.x = boy.x+10;
  explosion.y = boy.y-50;
  explosion.scale = 3;
  explosionGroup.add(explosion);

}

function reset(){
  gameState = PLAY;
  score = 0;
  bombGroup.destroyEach();
  monsterGroup.destroyEach();
  explosionGroup.destroyEach();
  boy.visible = true;
   themeSound.loop();
}
   
