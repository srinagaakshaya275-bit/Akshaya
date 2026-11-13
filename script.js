/* Renders every section from data.js (window.ARCHIVE). No build step. */
(() => {
  'use strict';
  const A = window.ARCHIVE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  /* sections are built by script, so the browser's saved scroll spot is wrong on refresh: start at the top (or the #hash) */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /* [bracketed] text is a placeholder: keep it visible, in italics */
  const ph = (s) => esc(s).replace(/\[[^\]]+\]/g, (m) => `<span class="ph">${m}</span>`);
  const hasPh = (v) => /\[[^\]]+\]/.test(JSON.stringify(v));
  const skillName = Object.fromEntries(A.skills.map((s) => [s.id, s.name]));
  const typeName = (t) => A.projectTypes[t] || t;
  const byId = (id) => A.projects.find((p) => p.id === id);

  const ICON = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="3"/><path d="m16 10 5-3v10l-5-3"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M18 14.4c1.9.7 3 2.4 3 5.6"/>',
    mega: '<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1Z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.500a8 8 0 0 1 0 11"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="m8 15 4-4 3 3 5-6"/>',
    wrench: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    award: '<circle cx="12" cy="9" r="5"/><path d="m9 13.500-1.500 7L12 18l4.500 2.500-1.500-7"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.500C19 14.800 12 21 12 21Z"/><circle cx="12" cy="9.500" r="2.500"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[n] || ICON.search}</svg>`;

  const stat = (o, cls = '') => `<div class="tile ${cls}"><b>${ph(o.value)}</b><span>${ph(o.label)}</span></div>`;
  const head = (eyebrow, id, title, lede) => `<header class="sec__head"><p class="eyebrow">${eyebrow}</p><h2 id="${id}">${title}</h2>${lede ? `<p class="lede">${lede}</p>` : ''}</header>`;

  /* ---------- nav ---------- */
  const menu = $('#menu'), nav = $('#nav');
  menu.addEventListener('click', () => { const o = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!o)); nav.classList.toggle('is-open', !o); });
  $$('a', nav).forEach((a) => a.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }));

  /* ---------- hero ---------- */
  const H = A.hero;
  $('#hero-h').innerHTML = `${esc(H.lead)} <span>${esc(H.accent)}</span>`;
  $('#hero-intro').textContent = A.meta.intro;
  $('#hero-resume').href = A.meta.resume;

  const growth = [
    { name: 'Instagram', from: 98, to: 167, a: '98K', b: '167K' },
    { name: 'LinkedIn', from: 162, to: 202, a: '162K', b: '202K' }
  ];
  const max = Math.max(...growth.map((g) => g.to));
  const bars = (g) => `<div class="gbar"><div class="gbar__top"><span>${g.name} followers</span><b>${g.a} → ${g.b}</b></div>
    <div class="gbar__track" role="img" aria-label="${g.name} followers grew from ${g.a} to ${g.b}"><i class="gbar__from" style="width:${(g.from / max) * 100}%"></i><i class="gbar__to" style="width:${(g.to / max) * 100}%"></i></div></div>`;
  $('#hero-visual').innerHTML = `
    <div class="perf glass">
      <div class="perf__top"><span>Impact snapshot</span><em>Masai School</em></div>
      <b class="perf__big">2.5M</b><span class="perf__sub">monthly organic reach</span>
      <div class="perf__bars">${growth.map(bars).join('')}</div>
      <div class="perf__tiles">
        ${stat({ value: '3,600+', label: 'Leads / month' })}${stat({ value: '₹15L', label: 'Budget / month' })}${stat({ value: '7+', label: 'AI verdicts flipped, ongoing' })}
      </div>
    </div>`;
  $('#stats').innerHTML = A.highlights.map((h) => `<li><b>${esc(h.value)}</b><span>${esc(h.label)}</span></li>`).join('');
  $('#marquee').innerHTML = [0, 1].map(() => `<ul>${A.marquee.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`).join('');

  /* ---------- about ---------- */
  const ab = A.about;
  $('#about').innerHTML = `${head('About', 'about-h', 'A little about me')}
    <div class="about">
      <div class="about__copy">
        ${ab.statement.map((p) => `<p>${esc(p)}</p>`).join('')}
        <dl class="facts">${ab.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}</dl>
      </div>
      <ul class="cards">${ab.cards.map((c) => `<li class="card glass"><span class="card__ico">${icon(c.icon)}</span><div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div></li>`).join('')}</ul>
    </div>
    <h3 class="sub">How I work</h3>
    <ol class="how">${ab.principles.map((p, i) => `<li class="glass"><span class="how__n">${String(i + 1).padStart(2, '0')}</span><h4>${esc(['Understand', 'Create', 'Execute', 'Measure'][i] || '')}</h4><p>${esc(p)}</p></li>`).join('')}</ol>`;

  /* ---------- experience ---------- */
  const full = A.roles.filter((r) => r.type === 'full-time').reverse();
  const interns = A.roles.filter((r) => r.type === 'internship').reverse();
  const tl = full.map((r, i) => `<li class="tl__item"><i class="tl__dot${i === 0 ? ' is-now' : ''}" aria-hidden="true"></i>
      <div class="role glass"><div class="role__top"><h3>${esc(r.title)}</h3><span class="role__dates">${ph(r.dates)}</span></div>
      <ul class="role__list">${r.responsibilities.map((x) => `<li>${ph(x.text)}</li>`).join('')}</ul></div></li>`).join('');
  const internRow = (r) => `<details class="int">
      <summary><span class="int__title">${esc(r.title)}</span><span class="int__co">${esc(r.company)}</span><span class="int__dates">${esc(r.dates)}</span></summary>
      <div class="int__body"><p class="int__place">${esc(r.place)}</p><ul>${r.responsibilities.map((x) => `<li>${ph(x.text)}</li>`).join('')}</ul>
      ${r.achievements.length ? `<div class="tiles tiles--sm">${r.achievements.map((a) => stat(a)).join('')}</div>` : ''}</div></details>`;
  $('#experience').innerHTML = `${head('Experience', 'exp-h', 'Where I\u2019ve worked')}
    <div class="exp glass">
      <div class="exp__top"><h3>Masai School</h3><span class="role__dates">Jun 2025 – Present</span></div>
      <ol class="tl">${tl}</ol>
    </div>
    <h3 class="sub">Internships</h3>
    <div class="ints glass">${interns.map(internRow).join('')}</div>`;

  /* ---------- impact ---------- */
  /* two real data points per chart: no invented months in between */
  const line = (g) => {
    const lo = Math.min(g.from, g.to) * 0.6, hi = g.to * 1.08, W = 600, H = 220, px = 48;
    const y = (v) => 24 + (1 - (v - lo) / (hi - lo)) * (H - 80);
    const x1 = px, x2 = W - px, y1 = y(g.from), y2 = y(g.to), id = 'lg' + g.name;
    const pct = Math.round((g.to / g.from - 1) * 100);
    return `<div class="growth__card glass">
      <div class="growth__top"><div><p class="eyebrow">${g.name} followers</p><h3>${g.a} <i aria-hidden="true">→</i> ${g.b}</h3></div><span class="badge">+${pct}%${g.name === 'Instagram' ? ' organic' : ''}</span></div>
      <svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${g.name} followers grew from ${g.a} to ${g.b}" preserveAspectRatio="xMidYMid meet">
        <defs><linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset=".5" stop-color="#4C8DFF"/><stop offset="1" stop-color="#8B7BFF"/></linearGradient>
        <linearGradient id="${id}f" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4C8DFF" stop-opacity=".35"/><stop offset="1" stop-color="#4C8DFF" stop-opacity="0"/></linearGradient></defs>
        <g class="chart__grid">${[0.25, 0.5, 0.75, 1].map((t) => `<line x1="${px}" x2="${W - px}" y1="${24 + t * (H - 80)}" y2="${24 + t * (H - 80)}"/>`).join('')}</g>
        <path d="M${x1} ${y1}L${x2} ${y2}V${H - 56}H${x1}Z" fill="url(#${id}f)"/>
        <path d="M${x1} ${y1}L${x2} ${y2}" stroke="url(#${id}s)" stroke-width="5" stroke-linecap="round"/>
        <circle cx="${x1}" cy="${y1}" r="9" class="chart__dot"/><circle cx="${x2}" cy="${y2}" r="9" class="chart__dot"/>
        <text x="${x1}" y="${y1 - 20}" class="chart__val">${g.a}</text><text x="${x2}" y="${y2 - 20}" text-anchor="end" class="chart__val">${g.b}</text>
        <text x="${x1}" y="${H - 18}" class="chart__lbl">Start</text><text x="${x2}" y="${H - 18}" text-anchor="end" class="chart__lbl">Now</text>
      </svg></div>`;
  };

  const pc = (id) => {
    const p = byId(id);
    return `<article class="pcard glass">
      <p class="eyebrow">${esc(typeName(p.type))}${p.year ? ' · ' + ph(p.year) : ''}</p>
      <h3>${ph(p.title)}</h3><p class="pcard__sum">${ph(p.summary)}</p>
      <div class="tiles tiles--col">${p.outcome.slice(0, 3).map((o) => stat(o, 'tile--row')).join('')}</div>
      <a class="more" href="${id === 'CF-001' ? '#case-study' : '#'}" ${id === 'CF-001' ? '' : `data-open="${id}"`}>${id === 'CF-001' ? 'Read the case study' : 'Read the file'} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </article>`;
  };
  $('#impact').innerHTML = `${head('Impact', 'impact-h', 'Work that moved the numbers')}
    <div class="pcards">${[...A.impact, ...A.projects.map((p) => p.id).filter((id) => !A.impact.includes(id))].map(pc).join('')}</div>
    <div class="growth">${growth.map(line).join('')}</div>`;

  /* ---------- case study (CF-001) ---------- */
  const cs = byId('CF-001');
  $('#case-study').innerHTML = `<header class="sec__head"><p class="eyebrow">Featured case study</p><h2 id="case-h">${esc(cs.title)}</h2>
      <ul class="tags tags--lg">${cs.skills.slice(0, 3).map((s) => `<li>${esc(skillName[s])}</li>`).join('')}</ul></header>
    <div class="case2">
      <div class="glass case__block"><h3>The problem</h3><p>${ph(cs.challenge)}</p></div>
      <div class="glass case__block"><h3>The approach</h3><p>${ph(cs.strategy)}</p></div>
      <div class="glass case__block case2__wide"><h3>What I did</h3><ol class="steps2">${cs.execution.map((x, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><span>${ph(x)}</span></li>`).join('')}</ol></div>
    </div>
    <div class="glass vt">
      <div class="vt__top"><h3>AI Overview sentiment</h3><span class="vt__key"><i class="k-bad"></i>Before <i class="k-good"></i>After</span></div>
      <ul>${cs.verdicts.map((v) => `<li><span class="q">${esc(v.q)}</span><span class="pill pill--bad">${ph(v.before)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span class="pill pill--good">${ph(v.after)}</span></li>`).join('')}</ul>
      <div class="vt__src"><span class="tag">Reddit</span><span class="tag">Quora</span><p>Reddit and Quora answers also get cited as sources in AI answers about a brand.</p></div>
    </div>
    <div class="outcome"><p class="eyebrow">The outcome</p><ul>${cs.outcome.map((o) => `<li><b>${ph(o.value)}</b><span>${ph(o.label)}</span></li>`).join('')}</ul></div>
    <div class="shots">${cs.visualHints.map((h) => `<figure class="shot"><div class="shot__ph"><span>${ph('[' + h + ']')}</span></div></figure>`).join('')}</div>`;

  /* ---------- project dialog ---------- */
  const dlg = $('#rec'); let opener = null;
  const list = (a) => `<ul>${a.map((x) => `<li>${ph(x)}</li>`).join('')}</ul>`;
  const open = (id, from) => {
    const p = byId(id); if (!p) return; opener = from || null;
    $('#rec-inner').innerHTML = `<button type="button" class="rec__close" data-close aria-label="Close">×</button>
      <p class="eyebrow">${esc(typeName(p.type))} · ${ph(p.year)}</p><h2 id="rec-title">${ph(p.title)}</h2><p class="lede">${ph(p.summary)}</p>
      <div class="tiles">${p.outcome.map((o) => stat(o)).join('')}</div>
      <dl class="rec__dl">
        <dt>My role</dt><dd>${ph(p.role)}</dd>
        <dt>Challenge</dt><dd>${ph(p.challenge)}</dd>
        <dt>Objective</dt><dd>${ph(p.objective)}</dd>
        <dt>Strategy</dt><dd>${ph(p.strategy)}</dd>
        <dt>What I did</dt><dd>${list(p.execution)}</dd>
        <dt>Deliverables</dt><dd>${list(p.deliverables)}</dd>
        <dt>Learnings</dt><dd>${list(p.learnings)}</dd>
      </dl>
      <div class="shots shots--sm">${p.visualHints.map((h) => `<figure class="shot"><div class="shot__ph"><span>${ph('[' + h + ']')}</span></div></figure>`).join('')}</div>
      <ul class="tags">${p.skills.map((s) => `<li>${esc(skillName[s])}</li>`).join('')}</ul>`;
    if (!dlg.open) dlg.showModal();
  };
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); open(o.dataset.open, o); return; }
    if (e.target.closest('[data-close]') || e.target === dlg) dlg.close();
  });
  dlg.addEventListener('close', () => { if (opener) opener.focus(); opener = null; });

  /* ---------- skills (+ education & certifications) ---------- */
  const searchMock = `<div class="mock" aria-hidden="true"><div class="mock__q"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span>is this course worth it?</span><i class="caret"></i></div>
    <div class="mock__ai"><b>AI Overview</b><div><s></s><s></s><em>Positive</em></div></div></div>`;
  const scard = (c, i) => `<div class="scard glass scard--${i}"><div class="scard__h"><span class="card__ico">${icon(c.icon)}</span><div><h3>${esc(c.title)}</h3><p>${esc(c.sub)}</p></div></div>
    ${c.search ? searchMock : ''}<ul class="dots">${c.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  const GLYPH = {
    bolt: '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/>', share: '<circle cx="6" cy="12" r="2.500"/><circle cx="18" cy="6" r="2.500"/><circle cx="18" cy="18" r="2.500"/><path d="m8.200 10.800 7.600-3.600M8.200 13.200l7.600 3.600"/>',
    people: ICON.people, video: '<rect x="3" y="6" width="13" height="12" rx="3"/><path d="m16 10 5-3v10l-5-3"/>', grid: '<rect x="4" y="4" width="7" height="7" rx="1.500"/><rect x="13" y="4" width="7" height="7" rx="1.500"/><rect x="4" y="13" width="7" height="7" rx="1.500"/><rect x="13" y="13" width="7" height="7" rx="1.500"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="m8 15 4-4 3 3 5-6"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.500-3.500"/>'
  };
  const toolIcon = (t) => t.brand && window.BRAND && window.BRAND[t.brand]
    ? `<svg viewBox="0 0 24 24" aria-hidden="true" class="brand"><path d="${window.BRAND[t.brand]}"/></svg>`
    : `<svg viewBox="0 0 24 24" aria-hidden="true">${GLYPH[t.glyph] || GLYPH.grid}</svg>`;
  const certs = A.coursework.flatMap((c) => c.items);
  $('#skills').innerHTML = `${head('Skills', 'skills-h', 'What I bring to the table')}
    <div class="sgrid">${A.skillCards.map(scard).join('')}
      <div class="scard glass scard--tools"><div class="scard__h"><span class="card__ico">${icon('wrench')}</span><div><h3>Tools</h3><p>What I work in every day</p></div></div>
        <ul class="tools">${A.tools.map((t) => `<li><i>${toolIcon(t)}</i>${esc(t.name)}</li>`).join('')}</ul></div>
    </div>
    <h3 class="sub">Education</h3>
    <div class="edu2">
      <div class="glass edu2__main"><div class="edu2__top"><div><h3>${esc(A.education[0].institution)}</h3><p>${esc(A.education[0].program)}</p></div><span class="role__dates">${esc(A.education[0].years)}</span></div>
        <div class="tile edu2__score"><b>${esc(A.education[0].score.replace('CGPA ', ''))}</b><span>CGPA</span></div>
        <ul class="edu2__rows">${A.education.slice(1).map((e) => `<li><span>${esc(e.program)} · ${esc(e.years)}</span><b>${esc(e.score)}</b></li>`).join('')}</ul></div>
      <div class="glass edu2__certs"><p class="eyebrow">Certifications & coursework</p><ul>${certs.map((c) => { const n = typeof c === 'string' ? c : c.name, u = typeof c === 'string' ? '' : c.url; return u ? `<li><a href="${esc(u)}" target="_blank" rel="noopener">${icon('award')}${esc(n)}<span class="sr"> (opens certificate)</span></a></li>` : `<li>${icon('award')}${esc(n)}</li>`; }).join('')}</ul></div>
    </div>
    <p class="resume-line"><a class="btn btn--ghost" href="${esc(A.meta.resume)}" download>Download resume (PDF)</a></p>`;

  /* ---------- contact ---------- */
  $('#link-email').href = `mailto:${A.meta.email}`;
  $('#link-linkedin').href = A.meta.linkedin;
  $('#foot-updated').textContent = A.meta.updated;
  $('#e-type').insertAdjacentHTML('beforeend', A.enquiryTypes.map((t) => `<option>${esc(t)}</option>`).join(''));

  const form = $('#enq'), status = $('#e-status'), submit = $('#e-submit');
  const fields = [['e-name', (v) => v.trim().length > 0], ['e-email', (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())], ['e-type', (v) => v !== ''], ['e-msg', (v) => v.trim().length > 0]];
  const mark = (id, ok) => { const el = $('#' + id); el.classList.toggle('is-invalid', !ok); el.setAttribute('aria-invalid', String(!ok)); $('#' + id + '-err').hidden = ok; return ok; };
  fields.forEach(([id, test]) => { $('#' + id).addEventListener('blur', () => mark(id, test($('#' + id).value))); $('#' + id).addEventListener('input', () => { if ($('#' + id).classList.contains('is-invalid')) mark(id, test($('#' + id).value)); }); });
  const say = (msg, kind) => { status.textContent = msg; status.className = 'enq__status' + (kind ? ' is-' + kind : ''); };
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); say('');
    const results = fields.map(([id, test]) => mark(id, test($('#' + id).value)));
    if (results.includes(false)) { $('.is-invalid', form).focus(); say('Please fix the fields marked above.', 'bad'); return; }
    if (!A.meta.formEndpoint) { say('The form is not connected yet, so nothing was sent. Please use the email button.', 'bad'); return; }
    submit.disabled = true; say('Sending…');
    try {
      const r = await fetch(A.meta.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (r.ok) { form.reset(); say('Thank you. Your message has been sent.', 'ok'); } else say('The message could not be sent. Please use the email button.', 'bad');
    } catch (err) { say('The message could not be sent. Please check your connection or use the email button.', 'bad'); }
    submit.disabled = false;
  });

  /* land on the hero (or the #hash target) */
  requestAnimationFrame(() => {
    let t = null; try { t = location.hash.length > 1 ? $(location.hash) : null; } catch (e) { /* not a selector */ }
    if (t) t.scrollIntoView({ behavior: 'instant' }); else window.scrollTo({ top: 0, behavior: 'instant' });
  });

  /* ---------- motion: progress bar, scroll reveal (once), active nav ---------- */
  const prog = $('#progress');
  const onScroll = () => { const h = document.documentElement; prog.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; $('#bar').classList.toggle('is-scrolled', h.scrollTop > 8); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const targets = '.sec__head, .about__copy, .card, .exp, .ints, .pcard, .growth, .case__block, .vt, .outcome, .learn3 li, .growth__card, .shot, .wcard, .how li, .scard, .edu2 > div, .resume-line, .contact, .hero__copy, .hero__visual, .stats li';
  const io = 'IntersectionObserver' in window && !reduceMotion
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' })
    : null;
  $$(targets).forEach((el) => { el.classList.add('rv'); if (io) io.observe(el); else el.classList.add('is-in'); });

  const links = $$('a', nav).filter((a) => a.hash && a.hash !== '#contact');
  const secs = [$('#top'), ...links.map((a) => $(a.hash))].filter(Boolean);
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle('is-active', a.hash === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => so.observe(s));
  }
})();
