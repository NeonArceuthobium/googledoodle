// gsap.registerPlugin(GSDevTools); 
// GSDevTools.create(); // Debugging panel for easy animation tweaks
console.log("okay")

// 1️⃣ GLOBAL VARIABLES
let gameActive = false; // Prevents multiple triggers
const pill = document.querySelector(".gPill");
const doodle = document.querySelector("#stage"); // Google doodle container
const canvas = document.querySelector("#matrixCanvas"); // Canvas for the game
const ctx = canvas.getContext("2d"); // Ensure canvas context exists
const searchInput = document.querySelector("input[type='text']"); // Selects the text input
const searchContainer = document.querySelector("#search"); // Selects the div containing buttons
const searchButtons = document.querySelectorAll("#search button"); // Selects both buttons


// 2️⃣ SHEEN ANIMATION FUNCTION (Keeps the Google sheen moving)
function animateSheen(elementId, startX, startY, endX, endY, duration = 1) {
    var tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    tl.from(elementId, { x: startX, y: startY, duration: duration, ease: "none" });
    tl.to(elementId, { x: 0, y: 0, duration: 0, ease: "none" });
    tl.to(elementId, { x: endX, y: endY, duration: duration, ease: "none" });

    return tl;
}

// Start sheens looping
const leftSheen = animateSheen("#left-sheen", -75, -75, 50, 50);
const rightSheen = animateSheen("#right-sheen", -75, -75, 50, 50);

// 3️⃣ PILL SETUP
gsap.set(pill, {
    svgOrigin: "50% 50%", // Ensures the group rotates around its center
    scale: 0.3, 
    rotation: -25,
    x: 110,
    y: -20,
    opacity: 0.25
});

// 4️⃣ PILL HOVER EFFECT
pill.addEventListener("mouseenter", () => {
    gsap.to(pill, { scale: 0.5, opacity: 0.8, duration: 0.5 });
});

pill.addEventListener("mouseleave", () => {
    gsap.to(pill, { scale: 0.3, opacity: 0.25, duration: 0.5 });
});

// 5️⃣ PILL CLICK: TRANSITION TO BULLET HELL
pill.addEventListener("click", () => {
    if (gameActive) return; // Avoid multiple triggers
    gameActive = true;

    stopMatrixEffect(); // 🛑 Stop matrix effect

    // Kill sheens to stop looping animations before destruction
    leftSheen.kill();
    rightSheen.kill();

    // Pill "detonates" (expands, rotates, fades out)
    gsap.to(pill, { 
        scale: 2, 
        opacity: 0, 
        rotation: 720, 
        duration: 2, 
        ease: "power2.out"
    });

    // Google doodle distorts, scales up, and fades out
    gsap.to(doodle, {
        scale: 2,
        opacity: 0,
        rotation: 15,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => { doodle.style.display = "none"; }
    });

        // 🌟 Fade out the search input
        gsap.to(searchInput, {
            opacity: 0,
            y: -20, // Moves up while fading out
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => { searchInput.style.display = "none"; }
        });
    
        // 🌟 Fade out both buttons
        gsap.to(searchButtons, {
            opacity: 0,
            y: -20, // Moves up while fading out
            duration: 1,
            stagger: 0.2, // Buttons fade out one after the other
            ease: "power2.inOut",
            onComplete: () => { searchButtons.forEach(btn => btn.style.display = "none"); }
        });

    // Background transitions to chaotic magenta
    gsap.to("body", { 
        backgroundColor: "#FF00FF", 
        duration: 1.5, 
        ease: "power2.inOut" 
    });

    // Canvas smoothly fades in, setting up the game
    gsap.to(canvas, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        onComplete: startBulletHell // 🚀 Launch bullet hell game
    });
});

// 6️⃣ FUNCTION TO CLEAR CANVAS AND START BULLET HELL
function startBulletHell() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears matrix rain effect
    initializeBulletHell(); // 🚀 Starts the game
}
