var backgroundImage;
var playButton;
var pauseButton;
var mySong;
var playButtonClicked = false;
var pauseButtonClicked = false;
var allMyBalls = [];
var amountOfBalls = 1;

function preload(){
  backgroundImage = loadImage("./assets/background.png");
  playButton = loadImage("./assets/playButton.png");
  pauseButton = loadImage("./assets/pauseButton.png");
  mySong = loadSound("./assets/song04.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  fft = new p5.FFT();
}

function draw() {
  var barheight = 2.725 * height / 3;


  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, 255); // 2.74 * height / 3

  push();
  imageMode(CENTER);
  image(backgroundImage, width/2, height/2, backgroundImage.width + 100, backgroundImage.height);

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


      // var hh = 2.74 * height / 3;
  // fill('white');
  // stroke('white');
  // quad(39 + 600, hh -volume*0.1, 39 + 600, hh -volume*0.1 +100, 158 + 600, hh -volume*0.1 +100, 158 + 600, hh -volume*0.1);
  //
  // fill('violet');
  // stroke('white');
  // quad(85 + 600, hh - 30 -volume*0.1, 40 + 600, hh -volume*0.1, 158 + 600, hh -volume*0.1, 197 + 600, hh - 30 -volume*0.1);
  var barheight = 2.725 * height / 3;

  var spectrum = fft.analyze();
  noStroke();
  fill('violet');
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width/2);
    var h = - barheight + map(spectrum[i], 0, 255, barheight, barheight -height/4.32);  // - height
    rect(x, barheight, width / spectrum.length/2.5, h); // height
    rect(width - x, barheight, width / spectrum.length/2.5, h);

  }

  // Band and song title
  textFont("MichelangeloFree-2O7Le");
  textSize(30);
  fill('white');
  text("Zero Call", 30, 60);

  textFont("Neoneon");
  textSize(53 + volume*0.01);
  fill(247, 96, 242, volume);
  text("Earthquake", 30, 115);


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

// function Tile
