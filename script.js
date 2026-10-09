const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Nav: scrolled state, progress bar, mobile menu ---------- */
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  nav.classList.toggle('is-scrolled', window.scrollY > 10);
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
const setMenu = (open) => {
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
};
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

/* ---------- Active nav link ---------- */
const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

/* ---------- Reveal on scroll, staggered within each parent ---------- */
document.querySelectorAll('.reveal').forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
  el.style.setProperty('--d', `${Math.min(siblings.indexOf(el), 6) * 90}ms`);
});
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- Count-up numbers ----------
   Any .countup whose text starts with a number (e.g. "250K+", "12%", "3.5")
   animates from 0. Placeholder text like "XXK+" is left as-is. */
const animateCount = (el) => {
  const match = el.textContent.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match || reduceMotion) return;
  const target = parseFloat(match[1]);
  const decimals = (match[1].split('.')[1] || '').length;
  const suffix = match[2];
  const start = performance.now();
  const duration = 1600;
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCount(entry.target);
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.countup').forEach((el) => countObserver.observe(el));

/* ---------- Hero bars stagger ---------- */
document.querySelectorAll('.dash__bars span').forEach((b, i) => b.style.setProperty('--i', i));

/* ---------- Glossy spotlight that follows the cursor ---------- */
if (finePointer) {
  document.querySelectorAll('.glass').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- 3D tilt ---------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.tilt').forEach((el) => {
    const base = el.classList.contains('dash') ? 'rotateY(-10deg) rotateX(6deg)' : '';
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = base; });
  });
}

/* ---------- Accordion ---------- */
document.querySelectorAll('.acc').forEach((acc) => {
  const head = acc.querySelector('.acc__head');
  head.addEventListener('click', () => {
    const open = !acc.classList.contains('is-open');
    acc.classList.toggle('is-open', open);
    head.setAttribute('aria-expanded', String(open));
    if (open) acc.querySelectorAll('.chart').forEach(drawChart);
  });
});

/* ---------- Project filters ---------- */
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
filters.forEach((btn) => btn.addEventListener('click', () => {
  filters.forEach((f) => f.classList.toggle('is-active', f === btn));
  const cat = btn.dataset.filter;
  projects.forEach((p) => {
    const show = cat === 'all' || p.dataset.cat === cat;
    p.classList.toggle('is-hidden', !show);
    p.classList.remove('is-entering');
    if (show) { p.classList.add('is-visible'); void p.offsetWidth; p.classList.add('is-entering'); }
  });
}));

/* ---------- Line chart (SVG, no libraries) ---------- */
const SVG_NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs) => {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
};

function buildChart(chart) {
  const labels = chart.dataset.labels.split(',');
  const values = chart.dataset.points.split(',').map(Number);
  const W = 600, H = 200, padX = 10, padTop = 16, padBottom = 30;
  const max = Math.max(...values) * 1.15;
  const x = (i) => padX + (i * (W - padX * 2)) / (values.length - 1);
  const y = (v) => padTop + (1 - v / max) * (H - padTop - padBottom);

  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': chart.querySelector('.chart__caption')?.textContent || 'Chart' });
  svg.innerHTML = `<defs>
    <linearGradient id="lineGrad" x1="0" x2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#4da3ff"/><stop offset="1" stop-color="#7c6cff"/></linearGradient>
    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4da3ff" stop-opacity=".35"/><stop offset="1" stop-color="#4da3ff" stop-opacity="0"/></linearGradient>
  </defs>`;

  [0.25, 0.5, 0.75].forEach((f) => {
    const gy = padTop + f * (H - padTop - padBottom);
    svg.appendChild(svgEl('line', { x1: padX, x2: W - padX, y1: gy, y2: gy, class: 'gridline' }));
  });

  // Smooth curve through the points
  let d = `M ${x(0)} ${y(values[0])}`;
  for (let i = 1; i < values.length; i++) {
    const cx = (x(i - 1) + x(i)) / 2;
    d += ` C ${cx} ${y(values[i - 1])}, ${cx} ${y(values[i])}, ${x(i)} ${y(values[i])}`;
  }
  const base = H - padBottom;
  svg.appendChild(svgEl('path', { d: `${d} L ${x(values.length - 1)} ${base} L ${x(0)} ${base} Z`, class: 'area' }));
  const line = svgEl('path', { d, class: 'line' });
  svg.appendChild(line);

  const tip = document.createElement('div');
  tip.className = 'chart__tip';
  values.forEach((v, i) => {
    svg.appendChild(Object.assign(svgEl('text', { x: x(i), y: H - 6, 'text-anchor': i === 0 ? 'start' : i === values.length - 1 ? 'end' : 'middle', class: 'axis' }), { textContent: labels[i] }));
    const pt = svgEl('circle', { cx: x(i), cy: y(v), r: 5, class: 'pt', tabindex: 0 });
    const show = () => {
      const r = svg.getBoundingClientRect();
      const cr = chart.getBoundingClientRect();
      tip.innerHTML = `<b>${labels[i]}</b><span>value : ${v}</span>`;
      tip.style.left = `${r.left - cr.left + (x(i) / W) * r.width}px`;
      tip.style.top = `${r.top - cr.top + (y(v) / H) * r.height}px`;
      tip.style.opacity = 1;
    };
    pt.addEventListener('pointerenter', show);
    pt.addEventListener('focus', show);
    pt.addEventListener('pointerleave', () => { tip.style.opacity = 0; });
    pt.addEventListener('blur', () => { tip.style.opacity = 0; });
    svg.appendChild(pt);
  });

  chart.appendChild(svg);
  chart.appendChild(tip);
  chart._line = line;
}

function drawChart(chart) {
  if (chart.classList.contains('is-drawn')) return;
  const line = chart._line;
  if (!reduceMotion) {
    const len = line.getTotalLength();
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    line.getBoundingClientRect();
    line.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1)';
    line.style.strokeDashoffset = 0;
  }
  chart.classList.add('is-drawn');
}

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || !entry.target.closest('.acc')?.classList.contains('is-open')) return;
    drawChart(entry.target);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.chart').forEach((c) => { buildChart(c); chartObserver.observe(c); });

/* ---------- Contact form → opens the visitor's email app ----------
   Swap for a form service (e.g. Formspree) to receive messages directly. */
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent(`Portfolio enquiry from ${f.name.value.trim()}`);
  const body = encodeURIComponent(`${f.message.value.trim()}\n\n— ${f.name.value.trim()} (${f.email.value.trim()})`);
  window.location.href = `mailto:srinagaakshaya275@gmail.com?subject=${subject}&body=${body}`;
});
