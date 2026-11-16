// Blinking string lights
const colors = ['#ff3b3b', '#ffd23b', '#3bd16f', '#3b9cff', '#ff7ad9'];
document.querySelectorAll('.lights').forEach((strand) => {
  const count = Math.max(12, Math.floor(window.innerWidth / 38));
  for (let n = 0; n < count; n++) {
    const bulb = document.createElement('i');
    bulb.style.setProperty('--c', colors[n % colors.length]);
    bulb.style.setProperty('--d', `${((n % 4) * 0.3 - 1.2).toFixed(1)}s`);
    strand.appendChild(bulb);
  }
});

// Falling snow, started by the first mouse move (or touch / key press)
(() => {
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('snow');
  const ctx = canvas.getContext('2d');
  let w, h, flakes;
  let started = false;

  const make = (initial) => {
    const r = Math.random() * 5 + 3;
    return {
      x: Math.random() * w,
      y: initial ? Math.random() * h * 0.6 - 20 : -r * 2,
      r,
      speed: (0.4 + r * 0.1 + Math.random() * 0.4) * (calm ? 0.5 : 1),
      drift: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI,
      spin: calm ? 0 : (Math.random() - 0.5) * 0.02,
    };
  };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor(w / 12)) * (calm ? 0.4 : 1);
    flakes = Array.from({ length: Math.floor(count) }, () => make(true));
  }

  function drawFlake(f) {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rot);
    ctx.lineWidth = Math.max(1, f.r / 3.5);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.rotate(Math.PI / 3);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, f.r);
      ctx.moveTo(f.r * 0.3, f.r * 0.8);
      ctx.lineTo(0, f.r * 0.5);
      ctx.lineTo(-f.r * 0.3, f.r * 0.8);
    }
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,.97)';
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(40,80,120,.6)';
    ctx.shadowBlur = 3;
    for (const f of flakes) {
      f.y += f.speed;
      f.rot += f.spin;
      f.drift += 0.015;
      if (!calm) f.x += Math.sin(f.drift) * 0.6;
      if (f.y > h + 10) Object.assign(f, make(false));
      drawFlake(f);
    }
    requestAnimationFrame(draw);
  }

  function start() {
    if (started) return;
    started = true;
    ['mousemove', 'touchstart', 'keydown'].forEach((t) => window.removeEventListener(t, start));
    canvas.classList.add('on');
    draw();
  }

  window.addEventListener('resize', resize);
  resize();
  ['mousemove', 'touchstart', 'keydown'].forEach((t) => window.addEventListener(t, start, { passive: true }));
})();

// Date picker starts today
const dateInput = document.getElementById('visit-date');
dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

// Submit to Formspree without leaving the page
const form = document.getElementById('visit-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.className = '';
  status.textContent = 'Sending...';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Request failed');
    form.reset();
    status.className = 'ok';
    status.textContent = "Thank you! We'll confirm your visit soon. Merry Christmas!";
  } catch {
    status.className = 'err';
    status.textContent = 'Sorry, something went wrong. Please call 509-422-0970 or email oktreecorral@gmail.com.';
  }
});
