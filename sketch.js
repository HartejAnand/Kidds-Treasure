var ocean,oceanImg;
var boat,boatImg;
var gold,goldImg;
var monster,kraken,serpent;
var end,endImg;
var gameState="start";
var score=0;


function preload(){
  oceanImg=loadImage("ocean.jpg");
  boatImg=loadImage("boat.png");
  goldImg=loadImage("gold.jpg");
  kraken=loadImage("kraken.jpg");
  serpent=loadImage("sea serpent.jpg");
  endImg=loadImage("kraken and ship.jpg");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  ocean=createSprite(windowWidth/2,windowHeight/2);
  ocean.addImage(oceanImg);
  ocean.rotation=90;
  ocean.scale=windowWidth/180;
  ocean.velocityY=3;

  //boat=createSprite(windowWidth/2,windowHeight-80);
  boat=createSprite(windowWidth/2,windowHeight-120);
  boat.addImage(boatImg);
  //boat.rotation=180;
  boat.rotation=90;
  //boat.scale=windowWidth/2000;
  boat.scale=windowWidth/10000;
  
  end=createSprite(windowWidth/2,windowHeight/2);
  end.addImage(endImg);
  end.scale=windowWidth/300;
  
  coins=createGroup();
  creatures=createGroup();
  
}

function draw() {
 background(0,0,0);
  
  if(gameState==="start"){
    background(0,0,155);
    fill(100,50,50);
    textSize(windowHeight/10);
    text("You, captain of the Aqua-code® are on a\nvoyage to collect Captain Kidd's long lost\ntreasure. Steer your ship, and avoid\n krakens and other sea monsters while\ncollecting as much gold doubloons as you\ncan.🏴‍☠️\nPress 'p' or 'r' to play, or restart. Arrow\nkeys to move🦜" ,windowWidth/15,windowHeight/10);
    
    if(keyDown('p') || keyDown('r')){
      gameState="play";
    }
  }
  
  if(gameState==="play"){
    end.visible=false;
    ocean.visible=true;
    boat.visible=true;
    
    
    //background
    if(ocean.y>windowHeight*1.5){
      ocean.y=-100;
    }
    //controls
    if(keyDown("left") && boat.x>20){
      boat.x-=4;
      boat.rotation=80;
    }
    else
      if(keyDown("right") && boat.x<windowWidth-20){
      boat.x+=4;
      boat.rotation=100;
    }
    else{
      boat.rotation=90;
    }
    //coins & obstacles
    coin();
    if(boat.isTouching(coins)){
      score+=1;
      coins.destroyEach();
    }
    creature();
    if(boat.isTouching(creatures)){
      gameState="end";
    }
    
    drawSprites();
    fill(255,255,0);
    textSize(windowWidth/40);
    text("gold="+score,windowWidth/40,windowHeight/20);
  }
  
  if(gameState==="end"){
    end.visible=true;
    ocean.visible=false;
    boat.visible=false;
    coins.destroyEach();
    creatures.destroyEach();
    
    drawSprites();
    fill(255,255,255);
    stroke(0,0,0);
    textSize(100);
    text(" Yo Ho Ho",windowWidth/3,windowHeight/9);
    text("Ye feed the fish",windowWidth/3.5,windowHeight-30);
    fill(255,255,0);
    textSize(windowWidth/100);
    text("gold="+score,windowWidth/40,windowHeight/20);
    
    if(keyDown('p') || keyDown('r')){
      gameState="play";
      score=0;
    }
  }

  
}

coin = function(){
  if(frameCount%250===0){
    gold=createSprite(random(0,windowWidth),-25);
    gold.addImage(goldImg);
    gold.velocityY=3+score/5;
    gold.scale=windowHeight/4000;
    gold.lifetime=350;
    coins.add(gold);
  }
}

creature = function(){
  if(frameCount%100===0){
    monster=createSprite(random(0,windowWidth),-25);
    var Monster=floor(random(0,2));
    if(Monster===0){
      monster.addImage(kraken);
    }
    if(Monster===1){
      monster.addImage(serpent);
    }
    monster.velocityY=3+score/4;
    monster.scale=windowHeight/3000;
    monster.lifetime=350;
    creatures.add(monster);
  }
}