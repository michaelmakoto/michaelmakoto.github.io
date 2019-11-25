let t,d,a;
let c;
let img;
let table;

// store x,y,angle in here
let inventoryX = [];
let inventoryY = [];
let inventoryAngle = [];
let middleX, middleY;
let setScale = 1;

// graphic preferences
let enableScale = true;
let enableGrid = true;
let enableGridOverLap = true;
let enableYFlip = true;
// read from csv;
let enableCSV = false;

//slider position
let posX = 180;
let s_length = '400px'

function preload(){
  table = loadTable('assets/spiro.csv', 'csv', 'header');
}

function setup(){
  c = createCanvas(720, 720);
  // img = loadImage('assets/block.png');
  background(255);

  sliderTimes = createSlider(2, 500, 100);
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
  // read from table and genertate
  strokeWeight(1);
  rect(0, 0, width, height);
  // image(img,5,5,145,145);
  strokeWeight(0.5);

  if (enableCSV == false) {
    t = sliderTimes.value();
    d = sliderDistance.value();
    a = sliderAngle.value();
  } else {
    // t,d,a values will be generted 
    // function keyTyped() -> when r is pressed
  }

  textSize(17);
  textAlign(LEFT);
  fill('gray');
  text("繰り返し:" + str(t), 15, 30);
  text("動かす:" + str(d), 15, 50);
  text("回す:" + str(a), 15, 70);
  fill(255);

  spirograph(t,d,a);

  if (enableCSV == true) 
  {
    saveCanvas(c);
  }
} 

function spirograph(times, distance, angle)
{
  let oldX = distance; 
  let oldY = 0; 
  let oldAngle = 0;

  let newX, newY, newAngle;

  inventoryX = [0,distance];
  inventoryY = [0,0];
  inventoryAngle = [0,0];

  // calcute all the cordinates
  for (let i=0; i<times-1; i++)
  {
    newAngle = angle + oldAngle;
    newX = distance * cos(radians(newAngle)) + oldX; 
    newY = distance * sin(radians(newAngle)) + oldY;
    
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

  // compare length 
  let ratioHeight = height/shapeHeight;
  let ratioWidth = width/shapeWidth;

  // auto scale the shape
  if (enableScale == false)
  {
    setScale = 1;
  } 
    else 
  {
    // rescale image
    setScale = (ratioWidth < ratioHeight) ? 
               (ratioWidth * 0.8) : (ratioHeight * 0.8);
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
    // project x axis
    stroke('red');
    line(min(inventoryX),0,max(inventoryX),0);
    // scale(1,-1);
    // textSize(5);
    // text("x", max(inventoryX)*1.02, 1);
    // scale(1,-1);

    // project y axis
    if (enableGridOverLap == true)
    {
      stroke('blue');
      line(0,min(inventoryY),0,max(inventoryY));
      // scale(1,-1);
      // text("y", 0, -max(inventoryY)-3);
      // scale(1,-1);
      
    } 
      else 
    {
      stroke('blue');
      // don't let the y-axis overlap the left top image
      line(0,min(inventoryY),0,max(inventoryY)+min(inventoryY)*0.8);
      // scale(1,-1);
      // text("y", 0, -max(inventoryY)-min(inventoryY)*0.8);
      // scale(1,-1);
    }
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

  if (key === 'o') 
  {
    enableGridOverLap = !enableGridOverLap;
    console.log("pressed o");
    console.log(enableGridOverLap);
  }

  if (key === 'f') 
  {
    enableYFlip = !enableYFlip;
    console.log("pressed f");
    console.log(enableYFlip);
  }

  if (key === 's') 
  {
    enableScale = !enableScale;
    console.log("pressed s");
    console.log(enableScale);
  }

  if (key === 'c') 
  {
    saveCanvas(c);
  }

  if (key === 'r') 
  {
    enableCSV = !enableCSV;
    console.log("pressed r");
    console.log(enableCSV);

    for (let r = 0; r < table.getRowCount(); r++) 
    {
      try 
      {
        t = table.getNum(r,0);
        b = table.getNum(r,1);
        a = table.getNum(r,2);
        redraw(); 
        print(t,b,a);
      } 
        catch (error) 
      {
        print('problem with row ' + str(r+2) + ' on csv');
      }
    }
    enableCSV = false;
    console.log("done");
    console.log(enableCSV);
  }
}