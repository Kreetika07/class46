var human,humanroll,humanrun,humanjump;
var virus1,virus2,virusImg1,virusImg2,virusGrp;
var backgroundImg;
var humanHealth=5;
var block1,block2,block3,block4,block5;
var gameState= "play";


function preload(){
  humanrun = loadAnimation("images/run/run1.png","images/run/run2.png","images/run/run3.png","images/run/run4.png");
  humanroll = loadAnimation("images/roll/roll1.png","images/roll/roll2.png","images/roll/roll3.png","images/roll/roll4.png","images/roll/roll5.png","images/roll/roll6.png","images/roll/roll7.png","images/roll/roll8.png","images/roll/roll9.png","images/roll/roll10.png","images/roll/roll11.png");
  humanjump = loadAnimation("images/jump/jump1.png","images/jump/jump2.png","images/jump/jump3.png","images/jump/jump4.png","images/jump/jump5.png","images/jump/jump6.png","images/jump/jump7.png","images/jump/jump8.png","images/jump/jump9.png","images/jump/jump10.png","images/jump/jump11.png","images/jump/jump12.png");
  virusImg1 = loadImage("images/virus/virus1.png");
  backgroundImg = loadImage("bg2.jpg")

}
function setup(){
createCanvas(windowWidth,windowHeight);
human = createSprite(100,height/2,100,100);
human.addAnimation("run",humanrun);
human.addAnimation("jump",humanjump);
human.addAnimation("roll",humanroll);
human.scale= 2;
virusGroup = new Group();
block1 = createSprite(width/2,height-30,80,20);
block2 = createSprite(width/2+80,height-30,80,20);
block3 = createSprite(width/2+160,height-30,80,20);
block4 = createSprite(width/2+240,height-30,80,20);
block5 = createSprite(width/2+320,height-30,80,20);

}

function draw(){
background(backgroundImg);
textSize(15)
fill("white");
text("Human Health : ",width/2-150,height-30);
if(gameState==="play"){
human.changeAnimation("run",humanrun);
if(keyDown(UP_ARROW)){
human.y -= 5;
human.changeAnimation("jump",humanjump);
}
if(keyDown(DOWN_ARROW)){
  human.y += 5;
  human.changeAnimation("roll",humanroll);
}
if(virusGroup.isTouching(human)){
for(var i=0; i<virusGroup.length; i++){
  if(virusGroup.get(i).isTouching(human)){
    virusGroup.get(i).destroy();
    humanHealth=humanHealth-1;
    if(humanHealth===4){
      block5.destroy();
    }
    if(humanHealth===3){
      block4.destroy();
    }
    if(humanHealth===2){
      block3.destroy();
      
    }
    if(humanHealth===1){
      block2.destroy();
    }
    if(humanHealth===0){
      block1.destroy();
      gameState="end"
    }
  }
}
}
spwanVirus();
}
drawSprites();
if(gameState==="end"){
  
}
}

function spwanVirus(){
  if (frameCount % 150 === 0) {
    var virus = createSprite(width,50,40,10);
    virus.y = Math.round(random(30,500));
    virus.addImage(virusImg1);
    virus.scale = 1.5;
    virus.velocityX = -6;
    
    virus.lifetime = width/3;
    
    virus.depth = human.depth;
    human.depth = human.depth + 1;

    virusGroup.add(virus);
  }
}
