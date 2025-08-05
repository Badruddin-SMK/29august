function showMessage() {
  document.getElementById("message").classList.remove("hidden");
}

// CONFETTI
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pieces = [];
for (let i = 0; i < 100; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 2,
    speed: Math.random() * 3 + 1,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    rotation: Math.random() * 360
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of pieces) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
    
    p.y += p.speed;
    p.rotation += 2;
    
    if (p.y > canvas.height) {
      p.y = -p.size;
      p.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawConfetti);
}

drawConfetti();

// HEART FALL
const heartCanvas = document.getElementById("hearts");
const heartCtx = heartCanvas.getContext("2d");
heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;

const hearts = [];
for (let i = 0; i < 30; i++) {
  hearts.push({
    x: Math.random() * heartCanvas.width,
    y: Math.random() * -heartCanvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 3 + 2,
    opacity: Math.random() * 0.5 + 0.5
  });
}

function drawHeart(ctx, x, y, size, opacity) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.scale(size / 20, size / 20);
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -15, -10, -15);
  ctx.bezierCurveTo(-25, -15, -25, 5, -25, 5);
  ctx.bezierCurveTo(-25, 20, 0, 30, 0, 40);
  ctx.bezierCurveTo(0, 30, 25, 20, 25, 5);
  ctx.bezierCurveTo(25, 5, 25, -15, 10, -15);
  ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`;
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
  for (let h of hearts) {
    drawHeart(heartCtx, h.x, h.y, h.size, h.opacity);
    h.y += h.speed;
    if (h.y > heartCanvas.height + 40) {
      h.y = -40;
      h.x = Math.random() * heartCanvas.width;
    }
  }
  requestAnimationFrame(animateHearts);
}

animateHearts();


//SONG
let tombolDitekan = false;
let autoCloseTimer;

function mulaiProses() {
  tombolDitekan = true;
  const audio = document.getElementById("lagu");
  audio.muted = false;
  audio.play().catch(error => {
    alert("Gagal memutar audio atau file tidak ditemukan.");
    console.error(error);
  });
}

function showMessage() {
  if (!tombolDitekan) {
    alert("Kamu harus menekan tombol terlebih dahulu!");
    return;
  }

  const msg = document.getElementById("message");
  msg.style.display = "block";

  // Auto-close setelah 120 detik
  clearTimeout(autoCloseTimer);
  autoCloseTimer = setTimeout(() => {
    msg.style.display = "none";
  }, 120000);
}

function tutupPesan() {
  document.getElementById("showMessage").style.display = "none";
  clearTimeout(autoCloseTimer);
}