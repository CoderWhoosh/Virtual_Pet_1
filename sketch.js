//Create variables here
var doggy, dog, happyDog, database, foodS, foodStock;
var database;
function preload()
{
  //load images here
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  doggy = createSprite(250,300,20,20);
  doggy.addImage(dog);
  doggy.scale = 0.3;
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",function(data){
    foodS = data.val();
  });

  
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    doggy.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
  text("Food Left: "+foodS,50,50);
  text("Press UP Arrow to feed your dog some milk!",50,80);
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
    Food: x
  })
}

