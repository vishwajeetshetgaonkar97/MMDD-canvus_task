// Get the canvas and context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// this variable is used to change day and night interection
let isMouseEntered = false;

function drawSky() {
  ctx.rect(0, 0, canvas.width, canvas.height);
  // color for day and night
  ctx.fillStyle = isMouseEntered ? "#121212" : "#76d2f6";
  ctx.fill();
}

function drawSunMoon() {
  ctx.beginPath();
  // radius for sun/moon
  ctx.arc(
    canvas.width - 80,
    80,
    isMouseEntered ? 27 : 40,
    0,
    2 * Math.PI,
    false
  );
  // circle color change
  ctx.fillStyle = isMouseEntered ? "white" : "#ede923";
  ctx.fill();
  ctx.lineWidth = 5;
  // stroke color change
  ctx.strokeStyle = isMouseEntered ? "white" : "#f4b334";
  ctx.stroke();
}

function drawCarLight() {
  ctx.beginPath();
  ctx.moveTo(120, 280); // Starting point (left-bottom)
  ctx.lineTo(150, 320); // Top point (middle)
  ctx.lineTo(300, 300); // Ending point (right-bottom)
  ctx.closePath();
  ctx.fillStyle = "rgb(241,235,13,0.5)";
  ctx.fill();
}

// Car properties
const carWidth = 240;
const carHeight = 180;
let carX = canvas.width / 2 - carWidth / 2;
const carY = canvas.height - carHeight - 10;

// Function to use car image to show car
function drawCar() {
  const img = document.getElementById("car");
  ctx.drawImage(img, carX, carY, carWidth, carHeight);
}

// Road properties
const roadWidth = canvas.width;
const roadHeight = 100;
const roadY = canvas.height - roadHeight;

// Variables for animation
let roadOffset = 0;

// Function to draw the road
function drawRoad() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, roadY, roadWidth, roadHeight);
}

// Road Line properties
const lineY = 350; // Y-coordinate for the lines
const lineWidth = canvas.width;
const lineHeight = 5;
const dashLength = 80;
const dashGap = 100;
const lineSpeed = 5; // Speed of Road line movement

// Initial position of the lines
let lineOffset = 0;

function drawRoadLine(x) {
  ctx.beginPath();
  ctx.moveTo(x, lineY);
  ctx.lineTo(x + dashLength, lineY);
  ctx.lineWidth = lineHeight;
  // road middle line color change
  ctx.strokeStyle = isMouseEntered ? "grey" : "white";
  ctx.stroke();
}

// Function to update the animations
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSky();
  drawSunMoon();

  // Update road offset to create the illusion of movement
  roadOffset += 5;
  if (roadOffset > roadHeight) {
    roadOffset = 0;
  }

  // Draw the updated road
  drawRoad();

  // Draw the Road lines with updated positions
  for (
    let x = -dashLength + lineOffset;
    x < canvas.width;
    x += dashLength + dashGap
  ) {
    drawRoadLine(x);
  }

  // Update line offset for movement
  lineOffset += lineSpeed;

  // Reset line offset when it reaches a full dash length
  if (lineOffset >= dashLength + dashGap) {
    lineOffset = 0;
  }

  // show car lights only at night
  if (isMouseEntered) {
    drawCarLight();
  }

  drawCar();

  // Request the next frame
  requestAnimationFrame(update);
}

// run function on load
window.onload = () => {
  update();
};

// event listener for cursor
canvas.addEventListener("mouseenter", () => {
  isMouseEntered = true;
});

canvas.addEventListener("mouseleave", () => {
  isMouseEntered = false;
});
