// ── Floating Particle System ──────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight * 4;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((w * h) / 25000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.7 ? 260 : 230,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  window.addEventListener('resize', () => { resize(); createParticles(); });
  requestAnimationFrame(draw);
})();

// ── Scroll Reveal Animations ──────────────────────────────────────────────
(function () {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

// ── Counter Animation ────────────────────────────────────────────────────
(function () {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;

    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target);
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (isDecimal) {
          counter.textContent = current.toFixed(1);
        } else if (target >= 1000) {
          counter.textContent = Math.floor(current).toLocaleString() + '+';
        } else {
          counter.textContent = Math.floor(current);
        }

        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) animateCounters();
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }
})();

// ── Mock Grid in Phone ───────────────────────────────────────────────────
(function () {
  const grid = document.getElementById('mockGrid');
  if (!grid) return;
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const HIGHLIGHT_WORD = 'CLIFF';
  const highlightRow = 2;
  const highlightStartCol = 1;

  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      const cell = document.createElement('div');
      cell.className = 'mock-cell';
      const isHighlight = r === highlightRow && c >= highlightStartCol && c < highlightStartCol + HIGHLIGHT_WORD.length;
      if (isHighlight) {
        cell.textContent = HIGHLIGHT_WORD[c - highlightStartCol];
        cell.classList.add('highlight');
      } else {
        cell.textContent = ALPHABET[Math.floor(Math.random() * 26)];
      }
      grid.appendChild(cell);
    }
  }
})();

// ── Navbar scroll effect ─────────────────────────────────────────────────
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
      nav.style.background = 'rgba(10, 10, 26, 0.95)';
    } else {
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
      nav.style.background = 'rgba(10, 10, 26, 0.8)';
    }
  });
})();
