// ── Animated grid background ──────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('gridBg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let cols, rows, cellSize, letters;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 3; // cover scroll
    cellSize = Math.floor(Math.min(window.innerWidth, 600) / 12);
    cols = Math.ceil(canvas.width / cellSize) + 1;
    rows = Math.ceil(canvas.height / cellSize) + 1;
    letters = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        letters.push({
          x: c * cellSize + cellSize / 2,
          y: r * cellSize + cellSize / 2,
          char: ALPHABET[Math.floor(Math.random() * 26)],
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.5,
        });
      }
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `700 ${Math.floor(cellSize * 0.45)}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (const l of letters) {
      const alpha = 0.15 + 0.1 * Math.sin(time * 0.001 * l.speed + l.phase);
      ctx.fillStyle = `rgba(79, 70, 229, ${alpha})`;
      ctx.fillText(l.char, l.x, l.y);
    }

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();

// ── Mock grid in phone ───────────────────────────────────────────────────
(function () {
  const grid = document.getElementById('mockGrid');
  if (!grid) return;
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const HIGHLIGHT_WORD = 'SURGE';
  const highlightRow = 2;
  const highlightStartCol = 1;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
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
