var backimg;
var astronaut, astroimg;
var saturn, saturnimg, saturnGroup;
var ground, invGround;
var alien, alienimg, alienGroup;
var gameState=1
var Score=0;
var box1, box2, box3;
var box1G, box2G;

function preload(){
backimg=loadImage("images/background1.gif")
astroimg=loadImage("images/astronaut_PNG7.png")
saturnimg=loadImage("images/saturn1.png")
alienimg=loadImage("images/alien4.png")
}

function setup(){
createCanvas(1200,550);

ground= createSprite(600,275);
ground.velocityX=-3;
ground.addImage(backimg)
ground.scale= 5
invGround= createSprite(350,500,700,10)
invGround.visible= false;
astronaut= createSprite(50,500)
astronaut.addImage(astroimg);
astronaut.scale= 0.05;
//astronaut.setCollider("circle", astronaut.x, astronaut.y, 2050)
astronaut.debug= true
saturnGroup= createGroup();
alienGroup= createGroup();
box1G= createGroup();
box2G= createGroup();

}

function draw(){
background("black")

if (gameState===1){
    if (ground.x < 400){
        ground.x= 600;
    }
    Saturn();
    astronaut.velocityX=0
    if (keyDown("right")){
        astronaut.velocityX=3
    }
    if (keyDown("left")){
        astronaut.velocityX=-3
    }
    if (keyDown("space")){
        astronaut.velocityY=-9 
    }
    astronaut.velocityY= astronaut.velocityY + 0.5;
    astronaut.collide(invGround);
     Alien();
    
     if (saturnGroup.isTouching(astronaut)){
      astronaut.velocityY=0
      Score= Score + 1;
     }
     if (alienGroup.isTouching(astronaut) || box1G.isTouching(astronaut) || box2G.isTouching(astronaut)){
      gameState= 0;
      

     }

}
else if(gameState===0){
  
    saturnGroup.setVelocityXEach(0);
    alienGroup.setVelocityXEach(0);
    alienGroup.setVelocityYEach(0);
    astronaut.velocityX=0
   astronaut.velocityY=0
   ground.velocityX=0
   saturnGroup.setLifetimeEach(-1);
   alienGroup.setLifetimeEach(-1);

}
drawSprites();
textSize(20)
text("Score :" + Score, 1050, 50)

}

function Saturn(){
    if (frameCount % 150===0){
        saturn=createSprite(1200,Math.round(random(70,450)),20,30);
        saturn.addImage(saturnimg);
        saturn.lifetime= 400;
        saturn.velocityX= -3;
        saturn.scale= 0.15
       saturnGroup.add(saturn);
      
       box1=createSprite(1200,150, 230, 5)
       box1.y= saturn.y + 50
       box1.velocityX= -3
       box1.visible= false
       box1G.add(box1)

       box2=createSprite(1200 - 120, 20, 2, 30)
       box2.y= saturn.y + 40
       box2.velocityX= -3
       box2.visible= false
       box2G.add(box2)

       
    }

}

function Alien(){
    if (frameCount % 250===0){
        alien=createSprite(Math.round(random(1150,1200)), Math.round(random(70,450)),20,30);
        alien.addImage(alienimg);
         alien.lifetime= 600;
        alien.velocityX= -7;
        alien.velocityY= Math.round(random(-6,6));
           alien.scale= (random(0.1, 0.2));
         alienGroup.add(alien);
    } 


};
