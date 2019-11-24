let t,d,a;
let posX = 180;
let s_length = '600px'

function setup()
{
    createCanvas(600, 480);

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
    stroke(0);
    rect(0, 0, width, height);
    strokeWeight(1);

    stroke('red')
    strokeWeight(1);

    t = sliderTimes.value();
    d = sliderDistance.value();
    a = sliderAngle.value();

    textSize(17);
    textAlign(CENTER);
    fill('gray');
    text(t, 30, 20);
    text(d, 30, 40);
    text(a, 30, 60);
    fill(255);

    scale(1, -1);
    translate(width/4, -height/1.2);

    spiro(t,d,a);

}

function spiro(times,length,angle){
    line(0,0,length,0);
    translate(length, 0);
    rotate(radians(angle));
    if (times < 2){
        return;
    } else {
        spiro(times-1,length,angle);
    }
}

