let t,d,a;
let c;

let img;

let middleX, middleY;
let setScale = 1;

let enableScale = true;
let enableGrid = false;
let enableYFlip = true;

let posX = 180;
let s_length = '600px'

function setup(){
  c = createCanvas(900, 900);
  img = loadImage('assets/block.png');
  background(255);
  
  loop();

  sliderTimes = createSlider(1, 500, 100);
  sliderTimes.position(posX, 10);
  sliderTimes.style('width', s_length);

  sliderDistance = createSlider(20, 500, 100);
  sliderDistance.position(posX, 30);
  sliderDistance.style('width', s_length);

  sliderAngle = createSlider(1, 359, 106);
  sliderAngle.position(posX, 50);
  sliderAngle.style('width', s_length);
}

function draw()
{
  strokeWeight(1);
  rect(0, 0, width, height);
  image(img,5,5,145,145);
  strokeWeight(0.5);
  
  t = sliderTimes.value();
  d = sliderDistance.value();
  a = sliderAngle.value();

  textSize(17);
  textAlign(CENTER);
  fill('gray');
  text(t, 58, 31);
  text(d, 70, 68);
  text(a, 70, 106);
  fill(255);

  spirograph(t,d,a); 
}

function spirograph(times, distance, angle)
{
  let oldX = distance; 
  let oldY = 0; 
  let oldAngle = 0;

  let newX, newY, newAngle;

  let inventoryX = [0,distance];
  let inventoryY = [0,0];
  let inventoryAngle = [0,0];
  
  for (let i=0; i<times-1; i++)
  {
    newAngle = angle + oldAngle;
    newX = distance * cos(radians(newAngle))+ oldX; 
    newY = distance * sin(radians(newAngle))+ oldY;
    
    inventoryX.push(newX);
    inventoryY.push(newY);
    inventoryAngle.push(newAngle);
    
    oldX = newX;
    oldY = newY;
    oldAngle = newAngle;
  }

  // calculate the middle of the generated shape
  middleX = (min(inventoryX) + max(inventoryX)) / 2;
  middleY = (min(inventoryY) + max(inventoryY)) / 2;

  let shapeHeight = max(inventoryY) - min(inventoryY);
  let shapeWidth = max(inventoryX) - min(inventoryX);

  let aspectHeight = height/shapeHeight;
  let aspectWidth = width/shapeWidth;

  // auto scale the shape
  if (enableScale == false)
  {
    setScale = 1;
  } 
    else 
  {
    setScale = (aspectWidth < aspectHeight) ? 
               (aspectWidth * 0.95) : (aspectHeight * 0.95);
  }

  adjustPosX = width/setScale/2-middleX;
  adjustPosY = height/setScale/2-middleY;

  // flip y axis or not
  if (enableYFlip == false)
  {
    scale(setScale,setScale);
    translate(adjustPosX, adjustPosY);
  } 
    else 
  {
    scale(setScale,-setScale);
    translate(adjustPosX, -adjustPosY-max(inventoryY)-min(inventoryY));
  }

  // add xy grid or not
  if (enableGrid == false)  
  {
    // do nothing
  } 
    else 
  {
    stroke('red');
    line(min(inventoryX),0,max(inventoryX),0);
    stroke('blue');
    line(0,min(inventoryY),0,max(inventoryY));
    // line(0,min(inventoryY),0,max(inventoryY)+min(inventoryY)*0.8);
    
  }

  // draw spirograph
  stroke('black');
  for(let i=1; i<times+1; i++)
  {
    line(inventoryX[i-1], inventoryY[i-1],inventoryX[i], inventoryY[i]);
  }
  
}

function keyTyped() 
{
  if (key === 'g') 
  {
    enableGrid = !enableGrid;
    console.log("pressed g");
    console.log(enableGrid);
  }

  if (key === 'f') 
  {
    enableYFlip = !enableYFlip;
    console.log("pressed f");
    console.log(enableYFlip);
  }

  if (key === 'c') 
  {
    enableScale = !enableScale;
    console.log("pressed c");
    console.log(enableScale);
  }

  if (key === 's') 
  {
    saveCanvas(c);
  }
}
