var gamestate = "serve";

function preload() {
   log = loadImage("sprites/wood2.png");
   dustbin = loadImage("sprites/dustbin.jpg");
   bottle = loadImage("sprites/crushedbottle.jpg");
   leaves = loadImage("sprites/leafes.jpg");
}

function setup(){
    var canvas = createCanvas(displayWidth-30,displayHeight-30);
    player = createSprite(200,displayHeight-200,50,50);
   b1 = createSprite(10,displayHeight/2,20,displayHeight);
   b2 = createSprite(displayWidth-50,displayHeight/2,20,displayHeight);
   start = createSprite(displayWidth/2,displayHeight/2-100);
   start.visible = false; 
   bargroup = new Group();
   naturalgroup = new Group();
   score = 0;
   toxicgroup = new Group();
   restart = createSprite(displayWidth/2,displayHeight/2+100);
   gameover = createSprite(displayWidth/2,displayHeight/2-100);
   gameover.visible = false;
   restart.visible = false;
   }

function draw(){
    
    background(0);
    fill(255);
    textSize(20);
    
    if(gamestate==="serve"){
        text("Game Start",displayWidth/2,displayHeight/2);
        text("move the player left and right to save the enviroment",displayWidth/2-400,displayHeight/3);
        text("let's save the enviroment",displayWidth/2-100,displayHeight-400);
        start.visible = true;
        if(mousePressedOver(start)){
            gamestate = "play";
            start.visible = false;

        }
        
    }
    if(gamestate === "play"){
    player.x = World.mouseX;
if(naturalgroup.isTouching(player)){
    score+=10;
    console.log(score);
}
if(toxicgroup.isTouching(player)){
    score-=5;
}
    spawnYellowbars();
    spawnYellowbars1();
    spawnYellowbars2();
    natural();
    toxic();
    if(score<0){
        gamestate = "end";
    }

    if(gamestate === "end"){
        bargroup.setVelocityYEach(0);
        naturalgroup.setVelocityYEach(0);
        toxicgroup.setVelocityYEach(0);
        bargroup.setLifetimeEach(-1);
        naturalgroup.setLifetimeEach(-1);
        toxicgroup.setLifetimeEach(-1);
        gameover.visible = true;
        restart.visible = true;
    }
if (mousePressedOver(restart)){
    gamestate = "play";
    bargroup.destroyEach();
    naturalgroup.destroyEach();
    toxicgroup.destroyEach();
    gameover.visible = false;
    restart.visible = false;
    score = 0;
console.log("reset");
}
    
    }
    drawSprites();
    showscore();
    
}
function spawnYellowbars(){
    if(World.frameCount%60===0){
        bar1 = createSprite(300,0,20,100);
        bar1.shapeColor = "yellow";        
        bar1.velocityY = 5;
        bargroup.add(bar1);
        bar1.lifetime = 200;
    }
}
function spawnYellowbars1(){
    if(World.frameCount%60===0){
        bar2 = createSprite(700,0,20,100);
        bar2.shapeColor = "yellow";        
        bar2.velocityY = 5;
        bargroup.add(bar2);
        bar2.lifetime = 200;
    }
}
function spawnYellowbars2(){
    if(World.frameCount%60===0){
        bar3 = createSprite(1100,0,20,100);
        bar3.shapeColor = "yellow";        
        bar3.velocityY = 5;
        bargroup.add(bar3);
        bar3.lifetime = 200;
    }
}
function natural(){
    if(World.frameCount%200===0){
     wood = createSprite(200,0);
     wood.addImage("log",log);
     wood.x = Math.round(random(100,displayWidth-100));
     wood.velocityY = 5;
     naturalgroup.add(wood);
    wood.lifetime = 200;
    }
    if(World.frameCount%350===0){
        leaf = createSprite(200,0);
        leaf.addImage("leaves",leaves);
        leaf.scale = 0.2;
        leaf.x = Math.round(random(100,displayWidth-100));
        leaf.velocityY = 5;
        naturalgroup.add(leaf);
        leaf.lifetime = 200;
       }
}
function toxic(){
    if(World.frameCount%150===0){
     plastic = createSprite(200,-100);
     plastic.addImage("dustbin",dustbin);
     plastic.x = Math.round(random(100,displayWidth-100));
     plastic.velocityY = 5;
     toxicgroup.add(plastic);
    plastic.lifetime = 200;
    bar1.depth = plastic.depth;
    plastic.depth+= 5;
    bar2.depth = plastic.depth;
    plastic.depth+= 5;
    bar3.depth = plastic.depth;
    plastic.depth+= 5;


    

}
if(World.frameCount%300===0){
    bottle = createSprite(200,-200);
  //  bottle.addImage("bottle",bottle);
    //bottle.scale = 3;
    bottle.x = Math.round(random(100,displayWidth-100));
    bottle.velocityY = 5;
    toxicgroup.add(bottle);
    bottle.lifetime = 200;
}
}
function showscore(){
    text("score:->"+score,displayWidth-500,50);


}