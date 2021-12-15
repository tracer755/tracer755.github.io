
var colors = ['#5865F2', '#505cde'];

// do this for 30 seconds
var duration = 2.1 * 1000;
var end = Date.now() + duration;

(function frame() {
  // launch a few confetti from the left edge
  confetti({
    particleCount: 3,
    angle: 60,
    spread: 65,
    origin: { x: 0 },
    colors: colors,
    resize: true,
    useWorker: true
  });
  // and launch a few from the right edge
  confetti({
    particleCount: 3,
    angle: 120,
    spread: 65,
    origin: { x: 1 },
    colors: colors,
    resize: true,
    useWorker: true
  });

  // keep going until we are out of time
  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());