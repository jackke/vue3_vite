// The spacing equation came from here: https://math.stackexchange.com/questions/1039482/how-to-evenly-space-a-number-of-points-in-a-rectangle
// And yes, it was just as fun to code as it looks :P

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const dotCount = 10000;
const size = 4;
const f = 3;
const dots = [];
const v = 128; // Center of color range
const l = 127; // Maximum color deviation
const rot = 80;
let w = 0;
let h = 0;
let cX = 0;
let cY = 0;
let mD = 0;
let mouseDown = false;

let nX = 0;
let nY = 0;
let sX = 0;
let sY = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  cX = w / 2;
  cY = h / 2;
  mD = Math.sqrt((cX * cX) + (cY * cY));
  
  nX = Math.sqrt((w / h * dotCount) + ((w - h) * (w - h) / ((4 * h) * (4 * h)))) - ((w - h) / (2 * h));
  nY = dotCount / nX;
  sX = w / (nX - 1);
  sY = h / (nY - 1);
  
  for (let i = 0; i < dotCount; i++) {
    //const x = Math.random() * w;
    //const y = Math.random() * h;
    const x = sX * (i % nX);
    const y = sY * (i / nX | 0);
    const t = Math.random() * 3000;
    const c = Math.random() * 360 | 0;
    dots[i] = { x, y, oX: x, oY: y, t, c };
  }
}

window.addEventListener('resize', resize);
window.addEventListener('mousedown', () => { mouseDown = true });
document.addEventListener('touchstart', () => { mouseDown = true });
window.addEventListener('mouseup', () => { mouseDown = false });
document.addEventListener('touchend', () => { mouseDown = false });
resize();

function draw(time = 0) {
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < dotCount; i++) {
    const d = dots[i];
    const t = (d.t + time) * 0.005;
          
    if (mouseDown) {
      const s = (Math.sqrt(((d.x - cX) * (d.x - cX)) + ((d.y - cY) * (d.y - cY))) / mD) + 0.2;
      d.x -= (d.x - cX) * s;
      d.y -= (d.y - cY) * s;
    } else {
      const s = (Math.sqrt(((d.x - d.oX) * (d.x - d.oX)) + ((d.y - d.oY) * (d.y - d.oY))) / mD) + 0.2;
      d.x -= (d.x - d.oX) * s;
      d.y -= (d.y - d.oY) * s;
    }
    
    //const a = 1;
    const a = Math.sin(t);
    
    if ((Math.abs(d.x - d.oX) > f || Math.abs(d.y - d.oY) > f) && !mouseDown) {
      d.c += d.c < rot ? 360 : -rot; // Rotate hue through 360 degrees
      let k = d.c * Math.PI / 180; // Degrees to radians
      let r = Math.sin(k) * l + v | 0; // Red channel value (each channel is spaced 120 degrees apart)
      let g = Math.sin(k + 2 * Math.PI / 3) * l + v | 0; // Green channel value
      let b = Math.sin(k + 4 * Math.PI / 3) * l + v | 0; // Blue channel value
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    } else {
      ctx.fillStyle = `rgba(0, 255, 255, ${a})`;
    }
    
    ctx.fillRect(d.x, d.y, size, size);
  }
  requestAnimationFrame(draw);
}

draw();

function isFullscreen() {
  return document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;
}

function fullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

document.addEventListener('dblclick', () => {
  if (!isFullscreen()) fullscreen();
  else exitFullscreen();
});