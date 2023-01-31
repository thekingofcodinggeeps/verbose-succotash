objectDetector= "";

img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('Bed.jpg');
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function draw() {
  if (status != "") {
  	  image(img, 0, 0, 640, 420);
    for (var i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Objects Detected";

      fill('#FF0000');
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke('#FF0000');
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }
  
  function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
  }