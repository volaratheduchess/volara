/* shared.js — Volara personal site */

/* ===== EMBER PARTICLES ===== */
(function() {
  const canvas = document.getElementById('embers');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#5900ff','#7a2fff','#00ffee','#d6b36a','#ffffff'];

  function spawn() {
    return {
      x: Math.random() * W,
      y: H + 10,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 1.2 + 0.4),
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife: Math.random() * 200 + 150,
    };
  }

  for (let i = 0; i < 40; i++) {
    const p = spawn();
    p.y = Math.random() * H;
    p.life = Math.random() * p.maxLife;
    particles.push(p);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    if (Math.random() < 0.15) particles.push(spawn());
    particles = particles.filter(p => p.life < p.maxLife);

    particles.forEach(p => {
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      const fade = 1 - p.life / p.maxLife;
      ctx.globalAlpha = p.alpha * fade;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===== SPROCKET CAMEO ===== */
(function() {
  const cameo = document.getElementById('sprocket');
  if (!cameo) return;

  const messages = [
    '⚙ The Mayor approves of this website.',
    '⚙ Sprocket has entered the premises.',
    '⚙ Governance is going fine. Totally fine.',
    '⚙ No press conferences scheduled.',
    '⚙ The sky is for everyone now.',
    '⚙ This site has been officially endorsed.',
    '⚙ Sprocket was never here.',
  ];

  function showCameo() {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    cameo.querySelector('span').textContent = msg;
    cameo.classList.add('visible');
    setTimeout(() => cameo.classList.remove('visible'), 4000);
  }

  // first appearance after 6s, then every 45-90s
  setTimeout(() => {
    showCameo();
    setInterval(showCameo, Math.random() * 45000 + 45000);
  }, 6000);
})();

/* ===== MOBILE MENU ===== */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}