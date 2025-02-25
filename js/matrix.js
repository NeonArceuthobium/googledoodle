//matrix rain


const ctx = canvas.getContext("2d");

// Set the canvas size to match the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()".split("");
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const speedFactor = .15; // Speed at which characters fall
const characterUpdateRate = 16; // Lower value = faster character change

const drops = Array.from({ length: columns }, () => ({
  y: Math.random() * -canvas.height, // Ensure rain starts from the top
  textStack: Array.from({ length: Math.floor(canvas.height / fontSize) }, () =>
    characters[Math.floor(Math.random() * characters.length)]
  ),
  updateCounter: Math.floor(Math.random() * characterUpdateRate),
  resetThreshold: Math.random() * 0.02 + 0.98 // Controls how often drops reset
}));

function drawMatrixRain() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Transparent overlay for smooth fading effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drops.forEach((drop, i) => {
    const x = i * fontSize;
    drop.updateCounter++;

    if (drop.updateCounter >= characterUpdateRate) {
      drop.updateCounter = 0;
      drop.textStack.pop(); // Remove oldest character
      drop.textStack.unshift(characters[Math.floor(Math.random() * characters.length)]); // Add new character at the top
    }

    drop.textStack.forEach((char, index) => {
      const y = (drop.y - index) * fontSize;
      if (y < 0) return; // Don't draw above the screen

      if (index === 0) {
        ctx.fillStyle = "#FFFFFF"; // Lead character in white
      } else {
        ctx.fillStyle = `rgba(0, 255, 0, ${1 - index * 0.1})`; // Green trail with opacity fade
      }

      ctx.font = `${fontSize}px monospace`;
      ctx.fillText(char, x, y);
    });

    drop.y += speedFactor;

    // Reset only when the drop has fully fallen off screen
    if (drop.y * fontSize > canvas.height && Math.random() > drop.resetThreshold) {
      drop.y = 0; // Reset to top of the screen
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  drawMatrixRain();
}

animate();