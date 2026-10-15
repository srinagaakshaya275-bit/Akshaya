const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Resume buttons appear once resume.pdf is in the repo ---------- */
fetch('resume.pdf', { method: 'HEAD' })
  .then((res) => { if (res.ok) document.querySelectorAll('[data-resume]').forEach((el) => { el.hidden = false; }); })
  .catch(() => {});

/* ---------- Sidebar drawer (mobile) ---------- */
const side = document.getElementById('side');
const scrim = document.getElementById('scrim');
const menuBtn = document.getElementById('menu-btn');
const setDrawer = (open) => {
  side.classList.toggle('is-open', open);
  scrim.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
};
menuBtn.addEventListener('click', () => setDrawer(!side.classList.contains('is-open')));
scrim.addEventListener('click', () => setDrawer(false));
side.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setDrawer(false); });

/* ---------- Player bar: current section, prev/next, guided tour ---------- */
const tracks = [...document.querySelectorAll('main [data-track]')];
const navLinks = [...document.querySelectorAll('.side__nav a')];
const nowTitle = document.getElementById('now-title');
const nowIndex = document.getElementById('now-index');
const progress = document.getElementById('progress');
const playBtn = document.getElementById('play-btn');
document.getElementById('now-total').textContent = tracks.length;
let current = 0;

const setCurrent = (i) => {
  current = i;
  const t = tracks[i];
  nowTitle.textContent = t.dataset.track;
  nowIndex.textContent = i + 1;
  const id = i === 0 ? 'top' : t.id;
  navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
};
const goTo = (i) => {
  const t = tracks[Math.max(0, Math.min(tracks.length - 1, i))];
  (t.id ? t : document.getElementById('top')).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
};
document.getElementById('prev-btn').addEventListener('click', () => goTo(current - 1));
document.getElementById('next-btn').addEventListener('click', () => goTo(current + 1));

let tour = null;
const setPlaying = (on) => {
  clearInterval(tour);
  tour = on ? setInterval(() => {
    if (current >= tracks.length - 1) { setPlaying(false); return; }
    goTo(current + 1);
  }, 5000) : null;
  playBtn.innerHTML = `<svg class="ico"><use href="#i-${on ? 'pause' : 'play'}"/></svg>`;
  playBtn.setAttribute('aria-label', on ? 'Pause the guided tour' : 'Play a guided tour of the page');
  if (on) goTo(current + 1);
};
playBtn.addEventListener('click', () => setPlaying(!tour));
['wheel', 'touchstart', 'keydown'].forEach((ev) => window.addEventListener(ev, (e) => {
  if (tour && !(e.target instanceof Element && e.target.closest('.player'))) setPlaying(false);
}, { passive: true }));

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  const mid = window.innerHeight * 0.4;
  let idx = 0;
  tracks.forEach((t, i) => { if (t.getBoundingClientRect().top <= mid) idx = i; });
  if (idx !== current || nowTitle.textContent !== tracks[idx].dataset.track) setCurrent(idx);
};
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

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
   Any .countup whose text starts with a number (e.g. "2.5M", "3,600+", "9.15")
   animates up from 0 when it scrolls into view. */
const animateCount = (el) => {
  const match = el.textContent.trim().match(/^(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match || reduceMotion) return;
  const raw = match[1];
  const target = parseFloat(raw.replace(/,/g, ''));
  const decimals = (raw.split('.')[1] || '').length;
  const useCommas = raw.includes(',');
  const suffix = match[2];
  const fmt = (n) => useCommas
    ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : n.toFixed(decimals);
  const start = performance.now();
  const duration = 1600;
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(target * eased) + suffix;
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

/* ---------- Expandable internship rows ---------- */
document.querySelectorAll('.xp').forEach((row) => {
  const head = row.querySelector('.xp__head');
  head.addEventListener('click', () => {
    const open = !row.classList.contains('is-open');
    row.classList.toggle('is-open', open);
    head.setAttribute('aria-expanded', String(open));
  });
});

/* ---------- Project filters ---------- */
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
const applyFilter = (cat) => {
  filters.forEach((f) => f.classList.toggle('is-active', f.dataset.filter === cat));
  projects.forEach((p) => {
    const show = cat === 'all' || p.dataset.cat === cat;
    p.classList.toggle('is-hidden', !show);
    p.classList.remove('is-entering');
    if (show) { p.classList.add('is-visible'); void p.offsetWidth; p.classList.add('is-entering'); }
  });
};
filters.forEach((btn) => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
document.querySelectorAll('[data-jump]').forEach((a) => a.addEventListener('click', () => applyFilter(a.dataset.jump)));

/* Sidebar playlist counts come from the project cards themselves */
document.querySelectorAll('[data-count]').forEach((el) => {
  const cats = el.dataset.count.split(',');
  const n = [...projects].filter((p) => cats.includes(p.dataset.cat)).length;
  el.textContent = `${n} project${n === 1 ? '' : 's'}`;
});

/* ---------- Line chart (SVG, no libraries) ----------
   Reads data-labels, data-points and data-suffix from each .chart. */
const SVG_NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs, text) => {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (text != null) el.textContent = text;
  return el;
};

function buildChart(chart) {
  const labels = chart.dataset.labels.split(',');
  const values = chart.dataset.points.split(',').map(Number);
  const suffix = chart.dataset.suffix || '';
  const name = chart.dataset.name || 'Value';
  const W = Math.round(Math.min(900, Math.max(300, chart.clientWidth - 36))), H = 200, padX = 24, padTop = 34, padBottom = 30;
  const max = Math.max(...values) * 1.1;
  const x = (i) => padX + (i * (W - padX * 2)) / (values.length - 1);
  const y = (v) => padTop + (1 - v / max) * (H - padTop - padBottom);
  const base = H - padBottom;

  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img',
    'aria-label': `${name}: ${values.map((v, i) => `${labels[i]} ${v}${suffix}`).join(', ')}` });
  svg.innerHTML = `<defs>
    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#D2B87E" stop-opacity=".35"/><stop offset="1" stop-color="#D2B87E" stop-opacity="0"/></linearGradient>
  </defs>`;

  [0.33, 0.66, 1].forEach((f) => {
    const gy = padTop + f * (base - padTop);
    svg.appendChild(svgEl('line', { x1: padX, x2: W - padX, y1: gy, y2: gy, class: 'gridline' }));
  });

  const d = values.map((v, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(v)}`).join(' ');
  svg.appendChild(svgEl('path', { d: `${d} L ${x(values.length - 1)} ${base} L ${x(0)} ${base} Z`, class: 'area' }));
  const line = svgEl('path', { d, class: 'line' });
  svg.appendChild(line);

  const tip = document.createElement('div');
  tip.className = 'chart__tip';
  const last = values.length - 1;
  values.forEach((v, i) => {
    const anchor = i === 0 ? 'start' : i === last ? 'end' : 'middle';
    svg.appendChild(svgEl('text', { x: x(i), y: H - 6, 'text-anchor': anchor, class: 'axis' }, labels[i]));
    svg.appendChild(svgEl('text', { x: x(i), y: y(v) - 14, 'text-anchor': anchor, class: 'val' }, `${v}${suffix}`));
    const pt = svgEl('circle', { cx: x(i), cy: y(v), r: 6, class: 'pt', tabindex: 0 });
    const show = () => {
      const r = svg.getBoundingClientRect();
      const cr = chart.getBoundingClientRect();
      tip.innerHTML = `<b>${labels[i]}</b><span>${v}${suffix} ${name.toLowerCase()}</span>`;
      tip.style.left = `${r.left - cr.left + (x(i) / W) * r.width}px`;
      tip.style.top = `${r.top - cr.top + (y(v) / H) * r.height}px`;
      tip.style.opacity = 1;
    };
    const hide = () => { tip.style.opacity = 0; };
    pt.addEventListener('pointerenter', show);
    pt.addEventListener('focus', show);
    pt.addEventListener('pointerleave', hide);
    pt.addEventListener('blur', hide);
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
    if (!entry.isIntersecting) return;
    drawChart(entry.target);
    chartObserver.unobserve(entry.target);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.chart').forEach((c) => { buildChart(c); chartObserver.observe(c); });

/* ---------- Contact form ----------
   All three fields are required. Empty or invalid fields turn red with a
   message; once complete, the visitor's email app opens with the message. */
const form = document.getElementById('contact-form');
const fieldValid = (el) => el.value.trim() !== '' && el.checkValidity();
const showState = (el) => {
  const ok = fieldValid(el);
  el.classList.toggle('is-invalid', !ok);
  el.setAttribute('aria-invalid', String(!ok));
  document.getElementById(`${el.id}-error`).hidden = ok;
  return ok;
};
form.querySelectorAll('input, textarea').forEach((el) => {
  el.addEventListener('input', () => { if (el.classList.contains('is-invalid')) showState(el); });
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = [form.name, form.email, form.message];
  const results = fields.map(showState);
  const firstBad = fields[results.indexOf(false)];
  if (firstBad) { firstBad.focus(); return; }
  const subject = encodeURIComponent(`Portfolio enquiry from ${form.name.value.trim()}`);
  const body = encodeURIComponent(`${form.message.value.trim()}\n\n— ${form.name.value.trim()} (${form.email.value.trim()})`);
  window.location.href = `mailto:srinagaakshaya275@gmail.com?subject=${subject}&body=${body}`;
});
