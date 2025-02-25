// Set the canvas size to match the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()".split("");
const fontSize = 30;
const lineSpacing = 1.5; // Adjust this to control vertical spacing
const columns = Math.floor(canvas.width / fontSize);
const speedFactor = .15; // Adjusted for more natural fall speed
const updateSpeed = 8; // Lower values = faster updates

// Create an array of drops, one per column
const drops = Array.from({ length: columns }, () => ({
  y: Math.random() * -canvas.height, // Start above the screen
  textStack: Array.from({ length: Math.floor(canvas.height / (fontSize * lineSpacing)) }, () =>
    characters[Math.floor(Math.random() * characters.length)]
  ),
  updateCounter: Math.floor(Math.random() * 16),
  resetThreshold: Math.random() * 0.02 + 0.98,
  fallSpeed: 0.5 + Math.random() * 1.5 // Each column falls at a different speed
}));

function drawMatrixRain() {
  // Dark translucent overlay for smooth fade effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drops.forEach((drop, i) => {
    const x = i * fontSize;
    drop.updateCounter++;

    if (drop.updateCounter >= updateSpeed) {
      drop.updateCounter = 0;
      drop.textStack.pop(); // Remove the last character
      drop.textStack.unshift(characters[Math.floor(Math.random() * characters.length)]); // Add a new character at the top
    }

    drop.textStack.forEach((char, index) => {
      const y = (drop.y - index * lineSpacing) * fontSize;
      if (y < 0) return;
    
      ctx.save(); // Save drawing state (prevents global effects)
    
      // Green glow effect for the text trail
      let opacity = 1 - index * 0.1; // Trail fades out smoothly
      ctx.fillStyle = `rgba(0, 255, 70, ${opacity})`;
    
      // Lead character is **extra bright** with glow
      if (index === 0) {
        ctx.fillStyle = "rgba(200, 255, 200, 1)"; // White-green lead character
        ctx.shadowColor = "rgba(0, 255, 70, 1)"; // Glow color
        ctx.shadowBlur = 50; // Only lead character gets glow
      }
    
      ctx.font = `${fontSize}px monospace`;
      ctx.fillText(char, x, y);
    
      ctx.restore(); // Restore to prevent glow stacking
    });
    

    drop.y += drop.fallSpeed * speedFactor; // Apply individual fall speeds

    // Reset when the drop reaches the bottom
    if (drop.y * fontSize > canvas.height && Math.random() > drop.resetThreshold) {
      drop.y = 0;
        // Assign a new random speed
  drop.fallSpeed = 0.7 + Math.random() * 1.5;
    }
  });
}

let matrixRunning = true;

function animate() {
  if (!matrixRunning) return;
  requestAnimationFrame(animate);
  drawMatrixRain();
}

// Start the Matrix effect
animate();

// Stop function
function stopMatrixEffect() {
  matrixRunning = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log("Matrix effect stopped.");
}
