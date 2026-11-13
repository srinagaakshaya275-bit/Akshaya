/* Renders every section from data.js (window.ARCHIVE). No build step. */
(() => {
  'use strict';
  const A = window.ARCHIVE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

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
  $('#hero-eyebrow').innerHTML = `<i aria-hidden="true"></i>${esc(H.eyebrow)}`;
  $('#hero-h').innerHTML = `${esc(H.lead)} <span>${esc(H.accent)}</span>`;
  $('#hero-intro').textContent = A.meta.intro;
  $('#hero-path').innerHTML = H.path.map(esc).join(' <i aria-hidden="true">→</i> ');
  $('#hero-resume').href = A.meta.resume;

  const growth = [
    { name: 'Instagram', from: 98, to: 167, a: '98K', b: '167K' },
    { name: 'LinkedIn', from: 162, to: 202, a: '162K', b: '202K' }
  ];
  const max = Math.max(...growth.map((g) => g.to));
  const bars = (g) => `<div class="gbar"><div class="gbar__top"><span>${g.name} followers</span><b>${g.a} → ${g.b}</b></div>
    <div class="gbar__track" role="img" aria-label="${g.name} followers grew from ${g.a} to ${g.b}"><i class="gbar__from" style="width:${(g.from / max) * 100}%"></i><i class="gbar__to" style="width:${(g.to / max) * 100}%"></i></div></div>`;
  $('#hero-visual').innerHTML = `
    <span class="float float--a"><i aria-hidden="true"></i>AI Overview sentiment flipped</span>
    <div class="perf glass">
      <div class="perf__top"><span>Impact snapshot</span><em>Masai School</em></div>
      <b class="perf__big">2.5M</b><span class="perf__sub">monthly organic reach</span>
      <div class="perf__bars">${growth.map(bars).join('')}</div>
      <div class="perf__tiles">
        ${stat({ value: '3,600+', label: 'Leads / month' })}${stat({ value: '₹15L', label: 'Budget / month' })}${stat({ value: '5', label: 'AI verdicts flipped' })}
      </div>
    </div>
    <span class="float float--b"><i aria-hidden="true"></i>4,000+ DMs resolved</span>`;
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
    </div>`;

  /* ---------- experience ---------- */
  const full = A.roles.filter((r) => r.type === 'full-time').reverse();
  const interns = A.roles.filter((r) => r.type === 'internship').reverse();
  const top = full.find((r) => r.promoted) || full[0];
  const tl = full.map((r, i) => `${i > 0 && full[i - 1].promoted ? '<li class="tl__promo"><span>↑ Promoted</span></li>' : ''}
    <li class="tl__item"><i class="tl__dot${i === 0 ? ' is-now' : ''}" aria-hidden="true"></i>
      <div class="role glass"><div class="role__top"><h3>${esc(r.title)}</h3><span class="role__dates">${ph(r.dates)}</span></div>
      <p>${esc(r.summary)}</p>
      <ul class="role__list">${r.responsibilities.map((x) => `<li>${esc(x.text)}</li>`).join('')}</ul></div></li>`).join('');
  const internRow = (r) => `<details class="int">
      <summary><span class="int__title">${esc(r.title)}</span><span class="int__co">${esc(r.company)}</span><span class="int__dates">${esc(r.dates)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
      <div class="int__body"><p class="int__place">${esc(r.place)}</p><ul>${r.responsibilities.map((x) => `<li>${esc(x.text)}</li>`).join('')}</ul>
      ${r.achievements.length ? `<div class="tiles tiles--sm">${r.achievements.map((a) => stat(a)).join('')}</div>` : ''}</div></details>`;
  $('#experience').innerHTML = `${head('Experience', 'exp-h', 'Where I’ve worked')}
    <div class="exp glass">
      <div class="exp__top"><h3>Masai School</h3><span class="role__dates">Jun 2025 – Present</span></div>
      <p class="exp__blurb">${esc(A.masaiBlurb)}</p>
      <ol class="tl">${tl}</ol>
      <div class="tiles">${top.achievements.map((a) => stat(a)).join('')}</div>
    </div>
    <h3 class="sub">Internships</h3>
    <div class="ints glass">${interns.map(internRow).join('')}</div>`;

  /* ---------- impact ---------- */
  const pc = (id) => {
    const p = byId(id);
    return `<article class="pcard glass">
      <p class="eyebrow">${esc(typeName(p.type))}</p>
      <h3>${esc(p.title)}</h3><p class="pcard__sum">${esc(p.summary)}</p>
      <div class="tiles tiles--col">${p.outcome.slice(0, 3).map((o) => stat(o, 'tile--row')).join('')}</div>
      <a class="more" href="${id === 'CF-001' ? '#case-study' : '#'}" ${id === 'CF-001' ? '' : `data-open="${id}"`}>${id === 'CF-001' ? 'Read the case study' : 'Read the file'} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </article>`;
  };
  $('#impact').innerHTML = `${head('Impact', 'impact-h', 'Work that moved the numbers')}
    <div class="pcards">${A.impact.map(pc).join('')}</div>
    <div class="growth glass">
      <div class="growth__top"><div><p class="eyebrow">Organic growth, zero ad spend</p><h3>Followers, start to now</h3></div><span class="badge">+70% Instagram</span></div>
      <div class="growth__bars">${growth.map(bars).join('')}</div>
      <p class="growth__note">Instagram and LinkedIn run end to end on recurring formats that earned their place through data.</p>
    </div>`;

  /* ---------- case study (CF-001) ---------- */
  const cs = byId('CF-001');
  $('#case-study').innerHTML = `${head('Case study', 'case-h', esc(cs.title), esc(cs.summary))}
    <div class="case">
      <div class="case__main">
        <div class="glass case__block"><h3>The challenge</h3><p>${ph(cs.challenge)}</p></div>
        <div class="glass case__block"><h3>The idea</h3><p>${ph(cs.strategy)}</p></div>
        <div class="glass case__block"><h3>What I did</h3><ol class="steps">${cs.execution.map((x) => `<li>${ph(x)}</li>`).join('')}</ol></div>
      </div>
      <aside class="case__side">
        <div class="glass case__block verdicts"><h3>How the AI answers changed</h3>
          <ul>${cs.verdicts.map((v) => `<li><span class="q">${esc(v.q)}</span><span class="v"><s>${esc(v.before)}</s><i aria-hidden="true">→</i><b>${esc(v.after)}</b></span></li>`).join('')}</ul></div>
        <div class="tiles tiles--2">${cs.outcome.map((o) => stat(o)).join('')}</div>
      </aside>
    </div>
    <div class="shots">${cs.visualHints.map((h) => `<figure class="shot"><div class="shot__ph"><span>${ph('[' + h + ']')}</span></div></figure>`).join('')}</div>
    <div class="glass case__block learn"><h3>What I learned</h3><ul>${cs.learnings.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`;

  /* ---------- work ---------- */
  const work = A.projects.filter((p) => p.id !== 'CF-001');
  const types = [...new Set(work.map((p) => p.type))];
  let filt = 'all';
  const card = (p) => `<article class="wcard glass">
      <p class="wcard__meta"><span>${esc(typeName(p.type))}</span><span>${ph(p.year)}</span></p>
      <h3><button type="button" class="wcard__btn" data-open="${p.id}">${ph(p.title)}</button></h3>
      <p>${ph(p.summary)}</p>
      <div class="wcard__out">${p.outcome.slice(0, 2).map((o) => `<span><b>${ph(o.value)}</b> ${ph(o.label)}</span>`).join('')}</div>
      <ul class="tags">${p.skills.slice(0, 3).map((s) => `<li>${esc(skillName[s])}</li>`).join('')}</ul>
      ${hasPh(p) ? '<span class="draft">Draft</span>' : ''}</article>`;
  $('#work').innerHTML = `${head('Work', 'work-h', 'Selected projects', 'Campaigns, creator programs and social work. Open one for the full file.')}
    <div class="filters" role="group" aria-label="Filter projects" id="filters">
      <button type="button" data-f="all" aria-pressed="true">All <span>${work.length}</span></button>
      ${types.map((t) => `<button type="button" data-f="${t}" aria-pressed="false">${esc(typeName(t))} <span>${work.filter((p) => p.type === t).length}</span></button>`).join('')}
    </div>
    <div class="wgrid" id="wgrid"></div>`;
  const drawWork = () => { $('#wgrid').innerHTML = work.filter((p) => filt === 'all' || p.type === filt).map(card).join(''); };
  drawWork();
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    filt = b.dataset.f; $$('#filters button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); drawWork();
  });

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

  /* ---------- skills ---------- */
  $('#skills').innerHTML = `${head('Skills', 'skills-h', 'What I do', 'No self-rated percentages. Each skill sits next to the work that used it.')}
    <div class="sgrid">${Object.entries(A.skillGroups).map(([k, n]) => `<div class="sgroup glass"><h3>${esc(n)}</h3>
      <ul class="pills">${A.skills.filter((s) => s.group === k).map((s) => `<li>${esc(s.name)}</li>`).join('')}</ul></div>`).join('')}</div>
    <h3 class="sub">Tools</h3><ul class="pills pills--tools">${A.tools.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;

  /* ---------- resume + education ---------- */
  $('#resume').innerHTML = `${head('Resume', 'resume-h', 'Education & resume')}
    <div class="resume">
      <div class="glass edu">${A.education.map((e) => `<div class="edu__row"><div><b>${esc(e.program)}</b><span>${esc(e.institution)}</span><em>${esc(e.years)}</em></div><strong>${esc(e.score)}</strong></div>`).join('')}</div>
      <div class="glass dl"><h3>Take it with you</h3><p>One page, with the full list of internships and results.</p>
        <a class="btn btn--primary" href="${esc(A.meta.resume)}" download>Download resume (PDF)</a></div>
    </div>
    <div class="course"><h3 class="sub">Relevant coursework & certifications</h3>
      <div class="course__grid">${A.coursework.map((c) => `<div><h4>${esc(c.group)}</h4><ul class="pills">${c.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div></div>`;

  /* ---------- contact ---------- */
  $('#link-email').href = `mailto:${A.meta.email}`;
  $('#link-linkedin').href = A.meta.linkedin;
  $('#link-resume').href = A.meta.resume;
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

  /* ---------- motion: progress bar, scroll reveal (once), active nav ---------- */
  const prog = $('#progress');
  const onScroll = () => { const h = document.documentElement; prog.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; $('#bar').classList.toggle('is-scrolled', h.scrollTop > 8); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const targets = '.sec__head, .about__copy, .card, .exp, .ints, .pcard, .growth, .case__block, .tiles--2, .shot, .wcard, .sgroup, .resume > div, .course, .contact, .hero__copy, .hero__visual, .stats li';
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
