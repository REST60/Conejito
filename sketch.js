const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var piso;
var rope;
var fruit,fruit2,rabbit;
var link,link2;
var rabbitImg,fruitImg,backgroundImg;
var button,button2;
var blower,muteButton;
var blink,sad,eat;

var bk_song,cut_sound,sad_sound,eat_sound,blow_sound;
var canW,canH;

function preload(){
  rabbitImg = loadImage("images/Rabbit-01.png");
  fruitImg = loadImage("images/melon.png");
  backgroundImg= loadImage("images/background.png");

  blink = loadAnimation("images/blink_1.png", "images/blink_2.png", "images/blink_3.png");
  blink.playing = true;
  eat = loadAnimation("images/eat_0.png", "images/eat_1.png", "images/eat_2.png", "images/eat_3.png", "images/eat_4.png");
  eat.playing = true;
  sad = loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png");
  sad.playing = true;

  bk_song = loadSound("mp3/sound1.mp3");
  cut_sound = loadSound("mp3/rope_cut.mp3");
  sad_sound = loadSound("mp3/sad.wav");
  eat_sound = loadSound("mp3/eating_sound.mp3");
  blow_sound = loadSound("mp3/air.wav");
}




function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }

  bk_song.play();
  bk_song.setVolume(5);
  engine = Engine.create();
  world = engine.world;

  blink.frameDelay=20;
  eat.frameDelay=20;
  sad.frameDelay=20;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  piso = new Piso(200,canH,20,600);
  rope = new Rope(8,{x:370,y:40});
  rope2 = new Rope(6,{x:245,y:30});
  rope3 = new Rope(4,{x:400,y:225});

  var options = {
    density: 0.001
  }
  fruit = Bodies.circle(300,300,15,options);
  Matter.Composite.add(rope.body,fruit);


  

  link = new Link(rope,fruit);
  link3 = new Link(rope2,fruit);
  link2 = new Link(rope3,fruit);
  
  rabbit = createSprite(400,canH-80,100,100);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.27;

  button2 = createImg("images/cut_btn.png");
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop);
  button3= createImg("images/cut_btn.png");
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop2);
  button = createImg("images/cut_btn.png");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop3);
 


  rabbit.addAnimation("blinking", blink);
  rabbit.addAnimation("eating",eat);
  rabbit.addAnimation("sad1",sad);
  rabbit.changeAnimation("blinking");

  blower = createImg("images/blower.png");
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(blow);

  muteButton = createImg("images/mute.png");
  muteButton.position(450,20);
  muteButton.size(40,40);
  muteButton.mouseClicked(mute);
}






function draw() 
{
  background(51);
  image(backgroundImg,0,0,canW,canH);
  Engine.update(engine);
   
  piso.show();
  rope.show(); rope2.show(); rope3.show();

  imageMode(CENTER);

  if(fruit != null){
    image(fruitImg,fruit.position.x,fruit.position.y,70,70);
  }

  
  text(mouseX + " - " + mouseY, mouseX,mouseY);

  if(collide(fruit,rabbit) == true){
    rabbit.changeAnimation("eating");
    eat_sound.play();
  }
  if(collide(fruit,piso.body) == true){
    rabbit.changeAnimation("sad1");
    sad_sound.play();
  }

  drawSprites();
  
}

function drop(){
  rope.break();
  link.detach();
  link = null;
  cut_sound.play();
}

function drop2(){
  rope2.break;
  link2.detach();
  link2 = null;
  cut_sound.play();
}

function drop3(){
  rope3.break();
  link3.detach();
  link3 = null;
  cut_sound.play();
}

function collide(body,sprite){
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<80){
      World.remove(world,fruit);
      fruit = null;
      return true
    } else{
      return false;
    }
  }
}

function blow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  blow_sound.play();
}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }else{
    bk_song.play();
  }
}