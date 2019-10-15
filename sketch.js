var backgroundImage;
var playButton;
var pauseButton;
var mySong;
var playButtonClicked = false;
var pauseButtonClicked = false;
var allMyLines = [];
var amountOfLines = 25;
var realWidth;
var g;
var h;
var f = 1;
var ampSlider;
var rateSlider;

function preload(){
  backgroundImage = loadImage("./assets/background.png");
  playButton = loadImage("./assets/playButton.png");
  pauseButton = loadImage("./assets/pauseButton.png");
  mySong = loadSound("./assets/song04.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  realWidth = windowWidth;
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  fft = new p5.FFT();

  for(var i = 0; i < amountOfLines; i++) {
    // var tempx = random()* windowWidth;
    // var tempy = random()* windowHeight;
    // var tempr = random()* 50 + 10;

    var tempLine = new Line(i*65 + 180, height/2 + 142, 0, 300); // istance
    // tempBall.s
    // tempBall.color = color(random()*255, random()*255, random()*255);

    allMyLines.push(tempLine);
  }

  // sliders to control the amplitude and the rate
  ampSlider = createSlider(0, 4, 1, 0.01);
  ampSlider.position(width - width/64 - width/12.8, 35);
  ampSlider.style('width', 'width/12.8');

  rateSlider = createSlider(-2, 2, 1, 0.01);
  rateSlider.position(width - width/64 - width/12.8, 80);
  rateSlider.style('width', 'width/12.8');
}

function draw() {
  var barheight = 2.725 * height / 3;


  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, 255); // volume remapped from 0 to 255 to change text transparency




  push();
  imageMode(CENTER);
  image(backgroundImage, width/2, height/2, backgroundImage.width + width/96, backgroundImage.height);


  // Play and Pause buttons
  if (playButtonClicked == true) {
    tint(255, 0);
  } else {
    tint(255, 255);
  }
  image(playButton, width/2, barheight + height/20.5, playButton.width, playButton.height);  // 35X39
  if (pauseButtonClicked == false) {
    tint(255, 0);
  } else {
    tint(255, 255);
  }
  image(pauseButton, width/2, barheight + height/20.5, pauseButton.width, pauseButton.height);
  pop();

  if (windowWidth < realWidth) {
    backgroundImage.resize(0, height);
    playButton.resize(0, height/27.69);
    pauseButton.resize(0, height/27.69);
  }

  // Waves
  var barheight = 2.725 * height / 3;
  var spectrum = fft.analyze();
  noStroke();
  fill('violet');
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width/2);
    var h = - barheight + map(spectrum[i], 0, 255, barheight, barheight -height/4.32);
    rect(x, barheight, width / spectrum.length/2.5, h);
    rect(width - x, barheight, width / spectrum.length/2.5, h);
  }

  // Band text
  textFont("MichelangeloFree-2O7Le");
  textSize(width/64);
  fill('white');
  text("Zero Call", width/64, width/32);
  // Song title text
  textFont("Neoneon");
  textSize(width/36.2 + volume*0.01);
  fill(247, 96, 242, volume);
  text("Earthquake", width/64, width/16.7);


  for(var i = 0; i < allMyLines.length; i++) {
    var tempLine = allMyLines[i];

    tempLine.display();

  }

  // sliders to control the rate and the amplitude

  var val1 = ampSlider.value();
  mySong.amp(val1);

  var val2 = rateSlider.value();
  mySong.rate(val2);


}
function mouseClicked() {
  var barheight = 2.725 * height / 3;
  if (mouseX > width / 2 - 35 && mouseX < width / 2 + 35 && mouseY > barheight + height / 20.5 - 39 && mouseY < barheight + height / 20.5 + 39) {
    if (mySong.isPlaying() == false) {
      playButtonClicked = true;
      pauseButtonClicked = true;
      mySong.loop();
    } else {
      playButtonClicked = false;
      pauseButtonClicked = false;
      mySong.pause();
    }
  }
}

function Line (_x, _y, _x2, _y2) {

  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, width/3.84);  // 500

  this.x = _x;
  this.y = _y;
  this.x2 = _x2;
  this.y2 = _y2;
  this.rotation = -0.2;
  this.color = 'violet';

  this.display = function() {

    push();
    translate(this.x, this.y);

    stroke(color(247, 96, 242, volume));
    strokeWeight(2.5);

    // length of the central line
    if (_x == width/2) {
      f = 1.3;
    }
    else {
      f = 1;
    }

    // length of the lines based on the volume
    this.y2 = volume * f;

    // rotation of the lines
    g = -0.2;

    // lines at the right
    var w70 = 27.4;
    if (_x > width/2 && _x < width/2 + width/w70) {
       rotate(g);
    }
    else if (_x > width/2 + width/w70 && _x < width/2 + width/w70*2) {
       rotate(g*2);
    }
    else if (_x > width/2 + width/w70*2 && _x < width/2 + width/w70*3) {
       rotate(g*2.5);
    }
    else if (_x > width/2 + width/w70*3 && _x < width/2 + width/w70*4) {
       rotate(g*3.3);
    }
    else if (_x > width/2 + width/w70*4 && _x < width/2 + width/w70*5) {
       rotate(g*3.8);
    }
    else if (_x > width/2 + width/w70*5 && _x < width/2 + width/w70*6) {
       rotate(g*4.4);
    }
    else if (_x > width/2 + width/w70*6 && _x < width/2 + width/w70*7) {
       rotate(g*4.75);
    }
    else if (_x > width/2 + width/w70*7 && _x < width/2 + width/w70*8) {
       rotate(g*5.2);
    }
    else if (_x > width/2 + width/w70*8 && _x < width/2 + width/w70*9) {
       rotate(g*5.5);
    }
    else if (_x > width/2 + width/w70*9 && _x < width/2 + width/w70*10) {
       rotate(g*5.65);
    }
    else if (_x > width/2 + width/w70*10 && _x < width/2 + width/w70*11) {
       rotate(g*5.8);
    }
    else if (_x > width/2 + width/w70*11) {
       rotate(g*5.95);
    }

    // lines at the left

    else if (_x < width/2 && _x > width/2 - width/w70) {
       rotate(-g);
    }
    else if (_x < width/2 - width/w70 && _x > width/2 - width/w70*2) {
       rotate(-g*2);
    }
    else if (_x < width/2 - width/w70*2 && _x > width/2 - width/w70*3) {
       rotate(-g*2.5);
    }
    else if (_x < width/2 - width/w70*3 && _x > width/2 - width/w70*4) {
       rotate(-g*3.3);
    }
    else if (_x < width/2 - width/w70*4 && _x > width/2 - width/w70*5) {
       rotate(-g*3.8);
    }
    else if (_x < width/2 - width/w70*5 && _x > width/2 - width/w70*6) {
       rotate(-g*4.4);
    }
    else if (_x < width/2 - width/w70*6 && _x > width/2 - width/w70*7) {
       rotate(-g*4.75);
    }
    else if (_x < width/2 - width/w70*7 && _x > width/2 - width/w70*8) {
       rotate(-g*5.2);
    }
    else if (_x < width/2 - width/w70*8 && _x > width/2 - width/w70*9) {
       rotate(-g*5.5);
    }
    else if (_x < width/2 - width/w70*9 && _x > width/2 - width/w70*10) {
       rotate(-g*5.65);
    }
    else if (_x < width/2 - width/w70*10 && _x > width/2 - width/w70*11) {
       rotate(-g*5.8);
    }
    else if (_x < width/2 - width/w70*11) {
       rotate(-g*5.95);
    }

    line(0, 0, this.x2, this.y2);

    pop();
  }
}
