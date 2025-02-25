// gsap.registerPlugin(GSDevTools); 
// GSDevTools.create(); // Debugging panel for easy animation tweaks
console.log("okay")

// 1️⃣ GLOBAL VARIABLES
let gameActive = false; // Prevents multiple triggers
const pill = document.querySelector(".gPill");
const doodle = document.querySelector("#stage"); // Google doodle container
const canvas = document.querySelector("#matrixCanvas"); // Canvas for the game
//const ctx = canvas.getContext("2d"); // Ensure canvas context exists

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

    // Kill sheens to stop looping animations before destruction
    leftSheen.kill();
    rightSheen.kill();

    // Pill "detonates" (expands, rotates, fades out)
    gsap.to(pill, { 
        scale: 5, 
        opacity: 0, 
        rotation: 360, 
        duration: 1, 
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
