console.log('OK');
// left sheen
var tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
tl.from("#left-sheen", { x: -75, y: -75, duration: 1, ease: "none" });
tl.to("#left-sheen", { x: 0, y: 0, duration: 0, ease: "none" });
tl.to("#left-sheen", { x: 50, y: 50, duration: 1, ease: "none" });

// right sheen
var tl2 = gsap.timeline({ repeat: -1, repeatDelay: 0 });
tl2.from("#right-sheen", { x: -75, y: -75, duration: 1, ease: "none" });
tl2.to("#right-sheen", { x: 0, y: 0, scale: 1, duration: 0, ease: "none" });
tl2.to("#right-sheen", { x: 50, y: 50, duration: 1, ease: "none" });
