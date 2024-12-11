let posX = 800;
let posY = 400;
let speed = 10;

let obstacles = [
  { x: 175, y: 745, w: 680, h: 250 },  // Desk
  { x: 35, y: 150, w: 600, h: 335 },   // Bookshelf
  { x: 35, y: 590, w: 100, h: 100 },   // Laundry
  { x: 30, y: 1680, w: 100, h: 200 },  // Plant 1
  { x: 170, y: 1680, w: 70, h: 200 },  // Plant 2
  { x: 380, y: 1450, w: 290, h: 450 }, // Bed
];

let bgImage;
let characterImg;
let button1 = { x: 250, y: 1140, w: 75, h: 75 };
let button2 = { x: 480, y: 1140, w: 75, h: 75 };
let button3 = { x: 720, y: 1140, w: 75, h: 75 };
let soundPlaying = false;
let currentButton = null;
let sound;

let sound1, sound2, sound3;

function preload() {
  bgImage = loadImage('Brain sound project with buttons.jpg'); 
  characterImg = loadImage('chris.png');
  sound1 = loadSound('Intro sound.mp3');  
  sound2 = loadSound('Rock the Dragon.mp3'); 
  sound3 = loadSound('PlayStation 3 .mp3');  
}

function setup() {
  createCanvas(1080, 1920); 
}

function draw() {
  // Draw Buttons
  rect(button1.x, button1.y, button1.w, button1.h); // Button 1
  rect(button2.x, button2.y, button2.w, button2.h); // Button 2
  rect(button3.x, button3.y, button3.w, button3.h); // Button 3
  
  noFill();
  stroke(0);
  strokeWeight(5);
  for (let i = 0; i < obstacles.length; i++) {
    rect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
//ImageLayer
  image(bgImage, 0, 0, width, height);
  
  }
  //CharacterLayer
  image(characterImg, posX, posY, 150, 240);

  // Control the character with arrow keys
  if (keyIsDown(LEFT_ARROW) && !checkCollision(posX - speed, posY)) {
    posX -= speed;
  }
  if (keyIsDown(RIGHT_ARROW) && !checkCollision(posX + speed, posY)) {
    posX += speed;
  }
  if (keyIsDown(UP_ARROW) && !checkCollision(posX, posY - speed)) {
    posY -= speed;
  }
  if (keyIsDown(DOWN_ARROW) && !checkCollision(posX, posY + speed)) {
    posY += speed;
  }

  // Keep the character within the bounds of the canvas
  posX = constrain(posX, 0, width - 150);
  posY = constrain(posY, 0, height - 240);

  // Check if the character is over any button
  if (isOverButton(button1)) {
    currentButton = button1;
    sound = sound1; 
  } else if (isOverButton(button2)) {
    currentButton = button2;
    sound = sound2;  
  } else if (isOverButton(button3)) {
    currentButton = button3;
    sound = sound3; 
  } else {
    currentButton = null;
  }

  // Play the sound if spacebar is pressed while on a button
  if (currentButton && keyIsDown(32) && !soundPlaying) { 
    sound.play();
    soundPlaying = true;
  }

  // Stop the sound if the character moves off the button
  if (!currentButton && soundPlaying) {
    sound.stop();
    soundPlaying = false;
  }
}

// Function to check if the character collides with any obstacles
function checkCollision(newX, newY) {
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    if (
      newX + 150 > obs.x && newX < obs.x + obs.w && // Horizontal collision
      newY + 240 > obs.y && newY < obs.y + obs.h   // Vertical collision
    ) {
      return true; // There is a collision
    }
  }
  return false; // No collision
}

// Function to check if the character is over a button
function isOverButton(button) {
  return posX + 150 > button.x && posX < button.x + button.w &&
         posY + 240 > button.y && posY < button.y + button.h;
}
