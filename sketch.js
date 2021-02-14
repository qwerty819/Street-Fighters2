var fighter1, fighter1_stance, fighter1_punch, fighter1_kick, fighter1_ball, fighter1_block; 
var fighter2, fighter2_stance, fighter2_punch, fighter2_kick, fighter2_block; 
var arena1, arena2, arena3, arena4, arenaImg1, arenaImg2, arenaImg3, arenaImg4;
var healthBar1, healthLevel1, healthBlock1, healthBar2, healthLevel2, healthBlock2;
var MIDDLE=0;
var PLAY=1;
var END= 2;
var gameState = MIDDLE; 
var winner = null;
var loser = null;
var gameOverSound, winSound, hitSound; 
function preload(){ 
    fighter1_stance = loadAnimation("fighter1stance.png");
    fighter1_punch = loadAnimation("fighter1stance.png", "fighter1punch.png");
    fighter1_kick = loadAnimation("fighter1stance.png", "fighter1kick.png");
    fighter1_ball = loadAnimation("fighter1stance.png", "fighter1fireball.png");
    fighter1_block = loadAnimation("fighter1stance.png", "fighter1block.png");

    fighter2_stance = loadAnimation("fighter2stance.png");
    fighter2_punch = loadAnimation("fighter2stance.png", "fighter2punch.png");
    fighter2_kick = loadAnimation("fighter2stance.png", "fighter2kick.png");
    fighter2_block = loadAnimation("fighter2stance.png", "fighter2block.png");

    arenaImg1 = loadImage("background1.jpg");
    arenaImg2 = loadImage("background2.jpg");
    arenaImg3 = loadImage("background3.jpg");
    arenaImg4 = loadImage("background4.jpg");

    gameOverSound = loadSound("gameOver.mp3");
    winSound = loadSound("KO.mp3");
    hitSound = loadSound("punch.mp3");
}
function setup(){
    createCanvas(2130, 1070);
    arena1 = createSprite(0,0,2130,1070/2);
    arena1.addImage("arena1Img", arenaImg1);
    arena1.x = arena1.width /2;

    arena2 = createSprite(0,0,2130,1070/2);
    arena2.addImage("arena2Img", arenaImg2);
    arena2.x = arena2.width /2;
    
    healthBar1 = createSprite(175,100,300,25);
    healthBar1.shapeColor = "white";

    healthLevel1 = createSprite(175,100,290,15);
    healthLevel1.shapeColor = "red";

    healthBlock1 = createSprite(19,100,40,45);
    healthBlock1.shapeColor = "lightgrey";

    healthBar2 = createSprite(1955,100,300,25);
    healthBar2.shapeColor = "white";

    healthLevel2 = createSprite(1955,100,290,15);
    healthLevel2.shapeColor = "red";

    healthBlock2 = createSprite(2111,100,40,45);
    healthBlock2.shapeColor = "lightgrey";
   
    fighter1 = createSprite(400, 900, 10, 10);
    fighter1.addAnimation("stance1", fighter1_stance);
    fighter1.addAnimation("punch1", fighter1_punch);
    fighter1.addAnimation("kick1", fighter1_kick);
    fighter1.addAnimation("ball1", fighter1_ball);
    fighter1.addAnimation("block1", fighter1_block);
    fighter1.scale=5.5;
    fighter1.setCollider("rectangle",0,0,40,80)
    fighter2 = createSprite(480, 900, 10, 10);
    fighter2.addAnimation("stance2", fighter2_stance);
    fighter2.addAnimation("punch2", fighter2_punch);
    fighter2.addAnimation("kick2", fighter2_kick);
    fighter2.addAnimation("block2", fighter2_block);
    fighter2.scale=5.5;
   

    ground = createSprite(1515,1050,2130,10);
    ground.visible = false;
}

function reset(){
    gameState = MIDDLE;        
    winner = null;
    loser = null;
    
    //0,0,2130,1070/2
    arena1.x = 0;
    arena1.y = 0;
    arena2.x = 0;
    arena2.y = 0;
    arena1.visible = true;
    arena2.visible = true;
    
    healthLevel1.width = 290;
    healthLevel2.width = 290;

    healthLevel1.x = 175;
    healthLevel2.x = 1955;

    fighter1.x = 400;
    fighter1.scale = 5.5;

    fighter2.x = 600;
    fighter2.scale = 5.5;

    fighter1.changeAnimation("stance1",fighter1_stance);
    fighter2.changeAnimation("stance2",fighter2_stance);
}

function playing()
{
    background(bgImg);
    arena1.visible = false;
    arena2.visible = false;
    //console.log("in play")
    fighter1.visible = true;
    fighter2.visible = true;
    textSize(30);
    fighter1.changeAnimation("stance1",fighter1_stance);
    fighter2.changeAnimation("stance2",fighter2_stance);
    if(keyDown(LEFT_ARROW)){
        fighter1.x=fighter1.x-5;
    }
    if(keyDown(RIGHT_ARROW)){
        fighter1.x=fighter1.x+5;
    }
    if(keyDown(UP_ARROW) && fighter1.y > 800){
        fighter1.velocityY = -15;
    }
    //fighter 1 - punching
    var isFighter1Hitting = false;
    var isFighter2Hitting = false;
    var isFighter1Blocking = false;
    var isFighter2Blocking = false;

    if(keyDown("M")){
        fighter1.changeAnimation("punch1", fighter1_punch);
        fighter1.setCollider("rectangle",0,0,60,80);
        isFighter1Hitting = true;
    }
    if(keyDown("N")){
        fighter1.changeAnimation("kick1", fighter1_kick);
        fighter1.setCollider("rectangle",0,0,60,80);
        isFighter1Hitting = true;
    }
    if(keyDown("B")){
        fighter1.changeAnimation("ball1", fighter1_ball);
        fighter1.setCollider("rectangle",0,0,60,80);
        isFighter1Hitting = true;
    }    

    if(keyDown("L")){
        fighter1.changeAnimation("block1", fighter1_block);
        fighter1.setCollider("rectangle",0,0,60,80);
        isFighter1Blocking = true;
    }
    if(keyDown("A")){
        fighter2.x=fighter2.x-5;
    }
    if(keyDown("D")){
        fighter2.x=fighter2.x+5;
    }
    if(keyDown("W") && fighter2.y > 800){
        fighter2.velocityY = -15;
    }

    //fighter 2 - punching
 
    if(keyDown("Q")){
        fighter2.changeAnimation("punch2", fighter2_punch);
        fighter2.setCollider("rectangle",0,0,60,80);
        isFighter2Hitting = true;
    }
    if(keyDown("E")){
        fighter2.changeAnimation("kick2", fighter2_kick);
        fighter2.setCollider("rectangle",0,0,60,80);
        isFighter2Hitting = true;
    }

    if(keyDown("R")){
        fighter2.changeAnimation("block2", fighter2_block);
        fighter2.setCollider("rectangle",0,0,60,80);       
        isFighter2Blocking = true; 
    }

    if(fighter1.isTouching(fighter2) && isFighter1Hitting && !isFighter2Blocking){
        if(healthLevel2.width > 100){            
            healthLevel2.width=healthLevel2.width-2;
            healthLevel2.x = 1955 + 300 - healthLevel2.width;
        }else{
            console.log("GAME OVER - player 1 wins");
            winner  = fighter1;
            loser = fighter2;
            gameState = END;
        }
    }

    if(fighter2.isTouching(fighter1) && isFighter2Hitting && !isFighter1Blocking){
        if(healthLevel1.width >= 100){
            healthLevel1.width=healthLevel1.width-2;
            healthLevel1.x = -175 + healthLevel1.width;
        }else {
            console.log("GAME OVER  - player 2 wins");
            winner  = fighter2;
            loser = fighter1;
            gameState = END;
        }                
    }

}



function draw(){
    background("black");
    //console.log("DRAW");
    
    if(gameState === MIDDLE){
        arena1.scale = 1;
        arena2.scale = 1;
        arena1.x = 700;
        arena1.y = 300;
        arena2.x = 1400;
        arena2.y = 250;
        fighter1.x = 500;
        fighter2.x = 1600;

        if(mousePressedOver(arena1)){
            //arena1.scale = 3;
            arena2.visible = false;
            //background(arenaImg3);
            bgImg= arenaImg3;
           
           gameState =PLAY;
        }
        if(mousePressedOver(arena2)){
          
            arena1.visible = false;
            bgImg= arenaImg4;
           gameState = PLAY;
            console.log ("moving to play")
        }
    }
    
    if(gameState === PLAY){
        playing();
    }

     if(gameState === END){
        console.log("ko");
        background("black")

        winner.scale = 9;
        loser.scale = 1;
        winSound.play();        
        
        //fighter1.visible = false;
        //fighter2.visible = false;
        arena1.visible = false;
        arena2.visible = false;

        textSize(100);
        text("GAME OVER", 700, 485);
    
        textSize(70);
        if(winner === fighter1){            
            text("Fighter 1 wins", 800, 600);
        }else {
            text("Fighter 2 wins", 800, 600);
        }
    
        if(keyDown("space")){
            reset();
        }

       
    }

    textSize(50);
    text("STREET FIGHTERS",800,50);
    
    fighter1.velocityY=fighter1.velocityY+1;
    fighter2.velocityY=fighter2.velocityY+1;

    fighter1.collide(ground);
    fighter2.collide(ground);
    
    drawSprites();
}

