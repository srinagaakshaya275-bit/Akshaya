/* ==========================================================================
   THE CURIOSITY INDEX · behaviour
   All content comes from data.js (window.ARCHIVE). No frameworks.
   ========================================================================== */
(() => {
  'use strict';
  const A = window.ARCHIVE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smooth = reduceMotion ? 'auto' : 'smooth';

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ph = (s) => esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
  const GAP = /\[[^\]]+\]/g;
  const SKIP_KEYS = new Set(['id', 'layout', 'type', 'visuals', 'visualHints', 'video', 'skills', 'roleIds', 'years', 'startYear', 'endYear', 'promoted']);
  const strings = (o, out = []) => {
    if (typeof o === 'string') out.push(o);
    else if (Array.isArray(o)) o.forEach((x) => strings(x, out));
    else if (o && typeof o === 'object') Object.entries(o).forEach(([k, v]) => { if (!SKIP_KEYS.has(k)) strings(v, out); });
    return out;
  };
  const gapCount = (rec) => strings(rec).join(' ').match(GAP)?.length || 0;
  const tokens = (q) => (String(q).toLowerCase().match(/[\p{L}\p{N}₹+]+/gu) || []);

  /* ---------- derived data ---------- */
  const skillById = Object.fromEntries(A.skills.map((s) => [s.id, s]));
  const projectById = Object.fromEntries(A.projects.map((p) => [p.id, p]));
  const roleById = Object.fromEntries(A.roles.map((r) => [r.id, r]));
  const skillNo = Object.fromEntries(A.skills.map((s, i) => [s.id, `SK-${String(i + 1).padStart(3, '0')}`]));
  const projectsOfSkill = (id) => A.projects.filter((p) => p.skills.includes(id));
  const respsOfSkill = (id) => A.roles.flatMap((r) => r.responsibilities.filter((x) => x.skills.includes(id)).map((x) => ({ role: r, text: x.text })));
  const projectsOfRole = (id) => A.projects.filter((p) => (p.roleIds || []).includes(id));
  const rolesNewestFirst = [...A.roles].reverse();
  const status = (rec) => { const n = gapCount(rec); return n ? { label: 'DRAFT', note: `${n} to fill`, cls: 'draft' } : { label: 'FILED', note: '', cls: 'ok' }; };
  const link = (hash, html, cls = '') => `<a class="${cls}" href="${hash}">${html}</a>`;
  const skillLink = (id) => link(`#/s/${id}`, esc(skillById[id].name), 'chip chip--link');
  const meta = (pairs, cls = '') => `<dl class="meta ${cls}">${pairs.filter(Boolean).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
  const statusPair = (rec) => { const s = status(rec); return ['STATUS', `<span class="status status--${s.cls}">${s.label}</span>${s.note ? ` <span class="muted">${s.note}</span>` : ''}`]; };
  const leadStats = (p, n = 2) => p.outcome.slice(0, n).map((o) => `<li><b>${ph(o.value)}</b> <span>${ph(o.label)}</span></li>`).join('');

  /* ---------- search index ---------- */
  const entries = [];
  const add = (e) => entries.push({ ...e, hay: e.hay.join(' · '), hayL: e.hay.join(' · ').toLowerCase(), body: (e.body || e.hay).join(' · ') });
  A.projects.forEach((p) => add({
    type: 'project', id: p.id, title: p.title, sub: `${A.projectTypes[p.type]} · ${p.year}`, route: `#/p/${p.id}`,
    body: [p.summary, p.objective, p.strategy, ...p.execution, p.role, ...p.learnings],
    hay: [...strings(p), A.projectTypes[p.type], String(p.years), ...p.skills.map((s) => skillById[s].name), ...(p.roleIds || []).map((r) => `${roleById[r].title} ${roleById[r].company}`)]
  }));
  A.roles.forEach((r) => add({
    type: 'experience', id: r.id, title: `${r.title}, ${r.company}`, sub: `${r.type === 'full-time' ? 'Full-time' : 'Internship'} · ${r.dates}`, route: `#/x/${r.id}`,
    body: [r.summary, ...r.responsibilities.map((x) => x.text), ...r.achievements.map((x) => `${x.value} ${x.label}`)],
    hay: [...strings(r), r.type, ...r.responsibilities.flatMap((x) => x.skills.map((s) => skillById[s].name))]
  }));
  A.skills.forEach((s) => add({
    type: 'skill', id: skillNo[s.id], title: s.name, sub: `${A.skillGroups[s.group]} · ${projectsOfSkill(s.id).length} case files`, route: `#/s/${s.id}`,
    hay: [s.name, A.skillGroups[s.group], ...projectsOfSkill(s.id).map((p) => p.title)]
  }));
  add({ type: 'skill', id: 'TOOLS', title: 'Tools', sub: 'What I work in', route: '#skills', hay: ['Tools', ...A.tools] });
  add({ type: 'about', id: A.about.id, title: 'Profile record', sub: 'Personal statement', route: '#about', hay: [...A.about.statement, A.meta.positioning, A.meta.focus] });
  add({ type: 'about', id: A.about.id, title: 'Working principles', sub: 'How I work', route: '#about', hay: A.about.principles });
  add({ type: 'about', id: A.about.id, title: 'Professional interests', sub: 'Areas of interest', route: '#about', hay: A.about.interests });
  add({ type: 'about', id: A.about.id, title: 'Selected facts', sub: 'Location, languages, study', route: '#about', hay: A.about.facts.map((f) => `${f.k} ${f.v}`) });
  A.education.forEach((e) => add({ type: 'about', id: e.id, title: e.program, sub: `${e.institution} · ${e.years}`, route: '#education', hay: [e.program, e.institution, e.years, e.score, 'education'] }));
  A.coursework.forEach((c) => add({ type: 'about', id: 'AR-CW', title: `Coursework: ${c.group}`, sub: 'Academic register', route: '#education', hay: [c.group, ...c.items, 'coursework certifications'] }));

  const TYPE_LABEL = { project: 'Projects', experience: 'Experience', skill: 'Skills', about: 'About & education' };
  const TYPE_ORDER = ['project', 'experience', 'skill', 'about'];
  const state = { q: '', cat: 'all' };

  const matches = (hayL, terms) => terms.every((t) => hayL.includes(t));
  const mark = (text, terms) => {
    const safe = esc(text);
    if (!terms.length) return safe;
    const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    return safe.replace(re, '<mark>$1</mark>');
  };
  const snippet = (hay, terms) => {
    const low = hay.toLowerCase();
    const at = terms.map((t) => low.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? 0;
    const from = Math.max(0, at - 50);
    const piece = hay.slice(from, from + 150).replace(/\s+/g, ' ');
    return `${from > 0 ? '…' : ''}${piece}${from + 150 < hay.length ? '…' : ''}`;
  };

  const resultsEl = $('#results'), resultsBody = $('#results-body'), resultsStatus = $('#results-status');
  const qInput = $('#q'), qClear = $('#q-clear');

  function renderResults() {
    const terms = tokens(state.q);
    qClear.hidden = !state.q;
    $$('#cats button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)));
    if (!terms.length && state.cat === 'all') { resultsEl.hidden = true; resultsBody.innerHTML = ''; resultsStatus.textContent = ''; return; }

    let list = entries.filter((e) => (state.cat === 'all' || e.type === state.cat) && matches(e.hayL, terms));
    list = list.map((e) => ({ e, score: terms.reduce((s, t) => s + (e.title.toLowerCase().includes(t) ? 5 : 0) + (e.sub.toLowerCase().includes(t) ? 2 : 0) + 1, 0) }))
      .sort((a, b) => b.score - a.score).map((x) => x.e);

    resultsEl.hidden = false;
    const n = list.length;
    const scope = state.cat === 'all' ? 'records' : `${TYPE_LABEL[state.cat].toLowerCase()} records`;
    if (!n) {
      resultsStatus.textContent = `No records match “${state.q}”.`;
      const tips = A.skills.filter((s) => projectsOfSkill(s.id).length).slice(0, 5);
      resultsBody.innerHTML = `<div class="empty"><p class="empty__t">Nothing filed under “${esc(state.q)}”.</p>
        <p>Try a skill, a place or a year instead:</p>
        <p class="empty__tips">${tips.map((s) => `<button type="button" class="chip" data-suggest="${esc(s.name)}">${esc(s.name)}</button>`).join('')}<button type="button" class="chip" data-suggest="2026">2026</button></p>
        <button type="button" class="btn btn--line" data-clear-search>Clear search</button></div>`;
      return;
    }
    resultsStatus.textContent = terms.length ? `${n} ${n === 1 ? 'record matches' : 'records match'} “${state.q}”.` : `Showing all ${n} ${scope}.`;
    const groups = TYPE_ORDER.map((t) => [t, list.filter((e) => e.type === t)]).filter(([, l]) => l.length);
    resultsBody.innerHTML = groups.map(([t, l]) => `
      <section class="group"><h3 class="label">${TYPE_LABEL[t]} <span>${l.length}</span></h3>
      <ol class="hits">${l.map((e) => `
        <li class="hit"><a class="idlink" href="${e.route}" tabindex="-1" aria-hidden="true">${esc(e.id)}</a>
          <div><a class="hit__title" href="${e.route}">${mark(e.title, terms)}</a>
          <p class="hit__sub">${mark(e.sub, terms)}</p>
          ${terms.length && terms.some((t) => e.body.toLowerCase().includes(t)) ? `<p class="hit__snip">${mark(snippet(e.body, terms), terms)}</p>` : ''}</div></li>`).join('')}</ol></section>`).join('');
  }

  function setQuery(q, { focus = false, scroll = false } = {}) {
    state.q = q; qInput.value = q; renderResults(); renderLibrary(); renderLog();
    if (focus) qInput.focus();
    if (scroll) $('#top').scrollIntoView({ behavior: smooth });
  }
  qInput.addEventListener('input', () => { state.q = qInput.value; renderResults(); renderLibrary(); renderLog(); });
  $('#search-form').addEventListener('submit', (e) => { e.preventDefault(); if (!resultsEl.hidden) resultsEl.scrollIntoView({ behavior: smooth, block: 'nearest' }); });
  qClear.addEventListener('click', () => { setQuery('', { focus: true }); });
  qInput.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.q) { e.preventDefault(); setQuery(''); } });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !$('#rec').open) { e.preventDefault(); qInput.focus(); qInput.select(); }
  });
  $('#cats').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    state.cat = state.cat === b.dataset.cat ? 'all' : b.dataset.cat;
    renderResults();
    if (!resultsEl.hidden) resultsEl.scrollIntoView({ behavior: smooth, block: 'nearest' });
  });
  $$('#cats button').forEach((b) => { b.querySelector('b').textContent = entries.filter((e) => e.type === b.dataset.cat).length; });
  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-suggest]'); if (s) { setQuery(s.dataset.suggest, { focus: true }); return; }
    if (e.target.closest('[data-clear-search]')) setQuery('', { focus: true });
  });

  /* ==========================================================================
     SECTION HEADERS
     ========================================================================== */
  const head = (id, tagPairs, title, lede) => `<header class="sec__head"><p class="tag">${tagPairs.map(([k, v]) => `<span>${k}</span> / ${v}`).join(' <i aria-hidden="true">·</i> ')}</p><h2 id="${id}">${title}</h2>${lede ? `<p class="sec__lede">${lede}</p>` : ''}</header>`;
  const banner = () => state.q ? `<p class="banner" role="status">Also filtered by search “${esc(state.q)}”. <button type="button" class="linkbtn" data-clear-search>Clear</button></p>` : '';

  /* ---------- ABOUT · profile record ---------- */
  $('#about').innerHTML = `${head('about-h', [['INDEX', A.about.id], ['RECORD TYPE', 'PROFILE'], ['LAST UPDATED', esc(A.meta.updated)]], 'The profile record')}
    <div class="profile">
      <div class="profile__main">
        <p class="label">Personal statement</p>
        <div class="statement">${A.about.statement.map((p) => `<p>${ph(p)}</p>`).join('')}</div>
        <p class="label">Working principles</p>
        <ol class="principles">${A.about.principles.map((p) => `<li>${ph(p)}</li>`).join('')}</ol>
      </div>
      <aside class="profile__side">
        <p class="label">Selected facts</p>
        <dl class="facts">${A.about.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${ph(f.v)}</dd></div>`).join('')}</dl>
        <p class="label">Professional interests <span class="muted">· select to search</span></p>
        <ul class="chips">${A.about.interests.map((i) => `<li><button type="button" class="chip" data-suggest="${esc(i)}">${esc(i)}</button></li>`).join('')}</ul>
      </aside>
    </div>`;

  /* ==========================================================================
     EXPERIENCE · activity log
     ========================================================================== */
  const years = [...new Set(A.roles.flatMap((r) => Array.from({ length: r.endYear - r.startYear + 1 }, (_, i) => r.startYear + i)))].sort((a, b) => b - a);
  const log = { type: 'all', year: 'all' };
  $('#experience').innerHTML = `${head('exp-h', [['INDEX', 'XP'], ['RECORD TYPE', 'EXPERIENCE'], ['FILES', A.roles.length]], 'The activity log', 'Full-time employment and internships, newest first. Open a record for responsibilities, projects and verified results.')}
    <div class="filters glass" role="group" aria-label="Filter experience">
      <div class="seg" id="log-types">
        <button type="button" data-v="all" aria-pressed="true">All</button>
        <button type="button" data-v="full-time" aria-pressed="false">Full-time</button>
        <button type="button" data-v="internship" aria-pressed="false">Internships</button>
      </div>
      <label class="sel"><span>Year</span><select id="log-year"><option value="all">All years</option>${years.map((y) => `<option>${y}</option>`).join('')}</select></label>
      <button type="button" class="linkbtn" id="log-reset">Reset</button>
      <p class="count" id="log-count" role="status" aria-live="polite"></p>
    </div>
    <div id="log-body"></div>`;

  function logRow(r) {
    const skills = [...new Set(r.responsibilities.flatMap((x) => x.skills))].slice(0, 4);
    return `<li class="log">
      <div class="log__when"><a class="idlink" href="#/x/${r.id}">${r.id}</a><span>${ph(r.dates)}</span></div>
      <div class="log__main">
        <h4><a class="stretch" href="#/x/${r.id}">${esc(r.title)}</a>${r.promoted ? ' <span class="pill">Promoted</span>' : ''}</h4>
        <p class="log__org">${esc(r.company)} · ${esc(r.place)}</p>
        <p>${ph(r.summary)}</p>
        ${skills.length ? `<ul class="chips chips--sm">${skills.map((s) => `<li><span class="chip">${esc(skillById[s].name)}</span></li>`).join('')}</ul>` : ''}
      </div>
      ${r.achievements.length ? `<ul class="log__figs">${r.achievements.slice(0, 2).map((a) => `<li><b>${ph(a.value)}</b><span>${ph(a.label)}</span></li>`).join('')}</ul>` : '<span></span>'}
    </li>`;
  }
  function renderLog() {
    const terms = tokens(state.q);
    const inYear = (r) => log.year === 'all' || (+log.year >= r.startYear && +log.year <= r.endYear);
    const hay = (r) => (entries.find((e) => e.id === r.id)?.hayL || '');
    const rows = rolesNewestFirst.filter((r) => (log.type === 'all' || r.type === log.type) && inYear(r) && matches(hay(r), terms));
    $('#log-count').textContent = `${rows.length} of ${A.roles.length} records`;
    $$('#log-types button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === log.type)));
    const groups = [['full-time', 'Full-time employment'], ['internship', 'Internships']].map(([t, label]) => [label, rows.filter((r) => r.type === t)]).filter(([, l]) => l.length);
    $('#log-body').innerHTML = banner() + (groups.length
      ? groups.map(([label, l]) => `<section class="loggroup"><h3 class="label">${label} <span>${l.length}</span></h3><ol class="logs">${l.map(logRow).join('')}</ol></section>`).join('')
      : `<div class="empty"><p class="empty__t">No experience records match these filters.</p><button type="button" class="btn btn--line" id="log-reset-2">Reset filters</button></div>`);
  }
  $('#log-types').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { log.type = b.dataset.v; renderLog(); } });
  $('#log-year').addEventListener('change', (e) => { log.year = e.target.value; renderLog(); });
  const resetLog = () => { log.type = 'all'; log.year = 'all'; $('#log-year').value = 'all'; renderLog(); };
  $('#log-reset').addEventListener('click', resetLog);
  $('#experience').addEventListener('click', (e) => { if (e.target.id === 'log-reset-2') resetLog(); });

  /* ==========================================================================
     PROJECTS · case file library
     ========================================================================== */
  const lib = { type: 'all', skill: 'all', year: 'all' };
  const libSkills = A.skills.filter((s) => projectsOfSkill(s.id).length);
  const libYears = [...new Set(A.projects.flatMap((p) => p.years))].sort((a, b) => b - a);
  const typeCount = (t) => A.projects.filter((p) => p.type === t).length;
  $('#projects').innerHTML = `${head('proj-h', [['INDEX', 'CF'], ['RECORD TYPE', 'PROJECT'], ['FILES', A.projects.length]], 'The case file library', 'Every project is a searchable file. Filter by type, skill or year, then open one to read the full file.')}
    <div class="filters glass" role="group" aria-label="Filter projects">
      <div class="seg seg--scroll" id="lib-types">
        <button type="button" data-v="all" aria-pressed="true">All <b>${A.projects.length}</b></button>
        ${Object.entries(A.projectTypes).filter(([t]) => typeCount(t)).map(([t, l]) => `<button type="button" data-v="${t}" aria-pressed="false">${esc(l)} <b>${typeCount(t)}</b></button>`).join('')}
      </div>
      <label class="sel"><span>Skill</span><select id="lib-skill"><option value="all">All skills</option>${libSkills.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label>
      <label class="sel"><span>Year</span><select id="lib-year"><option value="all">All years</option>${libYears.map((y) => `<option>${y}</option>`).join('')}</select></label>
      <button type="button" class="linkbtn" id="lib-reset">Reset</button>
      <p class="count" id="lib-count" role="status" aria-live="polite"></p>
    </div>
    <div id="lib-body"></div>`;

  const art = (p, i = 0) => p.visuals[i]
    ? `<img src="${esc(p.visuals[i])}" alt="" loading="lazy" decoding="async">`
    : `<span class="art__ph">[${esc(p.visualHints[i] || p.visualHints[0] || 'Visual evidence')}]</span>`;
  const tagLinks = (p, n = 4) => `<ul class="chips chips--sm">${p.skills.slice(0, n).map((s) => `<li>${skillLink(s)}</li>`).join('')}</ul>`;
  const fileCard = (p) => {
    const idl = `<a class="idlink" href="#/p/${p.id}">${p.id}</a>`;
    const st = status(p);
    const top = `<div class="file__top">${idl}<span class="muted">${esc(A.projectTypes[p.type])} · ${ph(p.year)}</span><span class="status status--${st.cls}">${st.label}</span></div>`;
    if (p.layout === 'feature') return `<li class="file file--feature"><div class="file__art art">${art(p, 0)}</div>
      <div class="file__body">${top}<h3><a class="stretch" href="#/p/${p.id}">${ph(p.title)}</a></h3><p class="file__sum">${ph(p.summary)}</p>
      <ul class="stats">${leadStats(p, 4)}</ul>${tagLinks(p, 5)}</div></li>`;
    if (p.layout === 'exhibit') return `<li class="file file--exhibit"><div class="file__art art">${art(p, 0)}</div>
      <div class="file__body">${top}<h3><a class="stretch" href="#/p/${p.id}">${ph(p.title)}</a></h3><p class="file__sum">${ph(p.summary)}</p>
      <ul class="stats">${leadStats(p, 2)}</ul>${tagLinks(p, 3)}</div></li>`;
    return `<li class="file file--text"><div class="file__body">${top}<h3><a class="stretch" href="#/p/${p.id}">${ph(p.title)}</a></h3><p class="file__sum">${ph(p.summary)}</p></div>
      <div class="file__side"><ul class="stats">${leadStats(p, 1)}</ul>${tagLinks(p, 3)}</div></li>`;
  };
  function renderLibrary() {
    const terms = tokens(state.q);
    const hay = (p) => entries.find((e) => e.id === p.id)?.hayL || '';
    const rows = A.projects.filter((p) => (lib.type === 'all' || p.type === lib.type) && (lib.skill === 'all' || p.skills.includes(lib.skill)) && (lib.year === 'all' || p.years.includes(+lib.year)) && matches(hay(p), terms));
    $('#lib-count').textContent = `${rows.length} of ${A.projects.length} files`;
    $$('#lib-types button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === lib.type)));
    $('#lib-body').innerHTML = banner() + (rows.length
      ? `<ol class="files">${rows.map(fileCard).join('')}</ol>`
      : `<div class="empty"><p class="empty__t">No case files match these filters.</p><p>Projects without a confirmed year only appear under “All years”.</p><button type="button" class="btn btn--line" id="lib-reset-2">Reset filters</button></div>`);
  }
  $('#lib-types').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { lib.type = b.dataset.v; renderLibrary(); } });
  $('#lib-skill').addEventListener('change', (e) => { lib.skill = e.target.value; renderLibrary(); });
  $('#lib-year').addEventListener('change', (e) => { lib.year = e.target.value; renderLibrary(); });
  const resetLib = () => { Object.assign(lib, { type: 'all', skill: 'all', year: 'all' }); $('#lib-skill').value = 'all'; $('#lib-year').value = 'all'; renderLibrary(); };
  $('#lib-reset').addEventListener('click', resetLib);
  $('#projects').addEventListener('click', (e) => { if (e.target.id === 'lib-reset-2') resetLib(); });

  /* ==========================================================================
     SKILLS · capability map
     ========================================================================== */
  let selSkill = null;
  const groupOrder = Object.keys(A.skillGroups);
  const orderedSkills = groupOrder.flatMap((g) => A.skills.filter((s) => s.group === g));
  $('#skills').innerHTML = `${head('skills-h', [['INDEX', 'SK'], ['RECORD TYPE', 'CAPABILITY'], ['LINKS', 'FROM PROJECT DATA']], 'The capability map', 'Choose a capability to see the case files and responsibilities where it was actually used. Lines are drawn only from the skills tagged on each record.')}
    <div class="map" id="map">
      <svg class="map__svg" id="map-svg" aria-hidden="true"></svg>
      <div class="map__col map__col--skills">
        <p class="label">Capabilities</p>
        <ul class="skilllist" id="skilllist">${groupOrder.map((g) => `
          <li class="skilllist__group" role="presentation"><span>${esc(A.skillGroups[g])}</span></li>
          ${orderedSkills.filter((s) => s.group === g).map((s) => { const n = projectsOfSkill(s.id).length; return `<li><button type="button" class="skill" data-skill="${s.id}" aria-pressed="false">${esc(s.name)}<b aria-label="${n} case files">${n}</b></button></li>`; }).join('')}`).join('')}
        </ul>
      </div>
      <div class="map__col map__col--files">
        <p class="label">Case files</p>
        <ul class="filelist" id="filelist">${A.projects.map((p) => `<li><a href="#/p/${p.id}" data-file="${p.id}"><span class="idlink">${p.id}</span> ${ph(p.title)}</a></li>`).join('')}</ul>
      </div>
    </div>
    <div class="skillpanel glass" id="skillpanel" aria-live="polite"></div>
    <div class="tools"><p class="label">Tools <span class="muted">· no usage data supplied, so these are not linked to projects</span></p>
      <ul class="chips">${A.tools.map((t) => `<li><span class="chip">${esc(t)}</span></li>`).join('')}</ul></div>`;

  function renderSkillPanel() {
    const el = $('#skillpanel');
    if (!selSkill) { el.innerHTML = `<p class="label">Capability record</p><p class="skillpanel__hint">Select a capability above. You will see the case files it appears in, the responsibilities that used it and the verified outcomes behind them.</p>`; return; }
    const s = skillById[selSkill], ps = projectsOfSkill(s.id), rs = respsOfSkill(s.id);
    const roles = [...new Set(rs.map((r) => r.role.id))];
    el.innerHTML = `
      <div class="skillpanel__top">${meta([['INDEX', skillNo[s.id]], ['RECORD TYPE', 'CAPABILITY'], ['FILED UNDER', esc(A.skillGroups[s.group])], ['LINKED', `${ps.length} case file${ps.length === 1 ? '' : 's'} · ${roles.length} role${roles.length === 1 ? '' : 's'}`]], 'meta--inline')}
        <button type="button" class="linkbtn" data-skill-clear>Clear selection</button></div>
      <h3>${esc(s.name)}</h3>
      ${!ps.length && !rs.length ? `<p class="empty__t">Nothing is linked to this capability yet.</p><p class="muted">Add “${s.id}” to a project’s <code>skills</code> list, or to a responsibility’s <code>skills</code> list, in data.js.</p>` : `
      <div class="skillpanel__cols">
        <section><h4 class="label">Case files</h4>${ps.length ? `<ul class="plain">${ps.map((p) => `<li><a class="idlink" href="#/p/${p.id}">${p.id}</a> <a href="#/p/${p.id}">${ph(p.title)}</a><ul class="stats stats--inline">${leadStats(p, 2)}</ul></li>`).join('')}</ul>` : '<p class="muted">No case file is tagged with this capability yet.</p>'}</section>
        <section><h4 class="label">Responsibilities</h4>${rs.length ? `<ul class="plain">${rs.map((r) => `<li>${ph(r.text)}<br><a class="idlink" href="#/x/${r.role.id}">${r.role.id}</a> <span class="muted">${esc(r.role.title)}, ${esc(r.role.company)}</span></li>`).join('')}</ul>` : '<p class="muted">No responsibility is tagged with this capability yet.</p>'}</section>
      </div>`}`;
  }
  function paintMap() {
    $$('.skill').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.skill === selSkill)));
    const linked = selSkill ? new Set(projectsOfSkill(selSkill).map((p) => p.id)) : null;
    $$('#filelist a').forEach((a) => { a.classList.toggle('is-linked', !!linked && linked.has(a.dataset.file)); a.classList.toggle('is-dim', !!linked && !linked.has(a.dataset.file)); });
    $$('#map-svg path').forEach((p) => { const on = selSkill && p.dataset.s === selSkill; p.classList.toggle('on', !!on); p.classList.toggle('dim', !!selSkill && !on); });
  }
  function drawEdges() {
    const map = $('#map'), svg = $('#map-svg');
    if (!svg || getComputedStyle(svg).display === 'none') return;
    const mr = map.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${mr.width} ${mr.height}`);
    const paths = [];
    A.projects.forEach((p) => {
      const target = $(`#filelist [data-file="${p.id}"]`); if (!target) return;
      const b = target.getBoundingClientRect();
      p.skills.forEach((sid) => {
        const src = $(`.skill[data-skill="${sid}"]`); if (!src) return;
        const a = src.getBoundingClientRect();
        const x1 = a.right - mr.left, y1 = a.top + a.height / 2 - mr.top, x2 = b.left - mr.left, y2 = b.top + b.height / 2 - mr.top, mx = (x1 + x2) / 2;
        paths.push(`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} C${mx.toFixed(1)} ${y1.toFixed(1)} ${mx.toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" data-s="${sid}" data-p="${p.id}"/>`);
      });
    });
    svg.innerHTML = paths.join('');
    paintMap();
  }
  function selectSkill(id) { selSkill = id && skillById[id] ? id : null; renderSkillPanel(); paintMap(); }
  $('#skilllist').addEventListener('click', (e) => {
    const b = e.target.closest('.skill'); if (!b) return;
    const id = selSkill === b.dataset.skill ? null : b.dataset.skill;
    go(id ? `#/s/${id}` : '#skills', { noScroll: true });
  });
  $('#skillpanel').addEventListener('click', (e) => { if (e.target.closest('[data-skill-clear]')) go('#skills', { noScroll: true }); });
  new ResizeObserver(drawEdges).observe($('#map'));
  document.fonts?.ready.then(drawEdges);

  /* ==========================================================================
     EDUCATION · academic register
     ========================================================================== */
  $('#education').innerHTML = `${head('edu-h', [['INDEX', 'AR'], ['RECORD TYPE', 'QUALIFICATION'], ['FILES', A.education.length]], 'The academic register')}
    <ol class="register">${A.education.map((e) => `<li><span class="idtext">${e.id}</span><span class="register__yr">${esc(e.years)}</span><span class="register__prog"><b>${esc(e.program)}</b><br><span class="muted">${esc(e.institution)}</span></span><span class="register__score">${esc(e.score)}</span></li>`).join('')}</ol>
    <p class="label sub">Relevant coursework &amp; certifications</p>
    <div class="coursework">${A.coursework.map((c) => `<section><h3>${esc(c.group)}</h3><ul class="chips">${c.items.map((i) => `<li><span class="chip">${esc(i)}</span></li>`).join('')}</ul></section>`).join('')}</div>`;

  /* ==========================================================================
     RECORD VIEWER (dialog)
     ========================================================================== */
  const dlg = $('#rec'), recInner = $('#rec-inner');
  const baseTitle = document.title;
  let current = null, lastTrigger = null;

  const topbar = (id) => `<div class="rec__top"><p class="tag"><span>INDEX</span> / ${esc(id)}</p><button type="button" class="btn btn--line" data-close>Close file</button></div>`;
  const list = (arr) => (arr && arr.length ? `<ul class="bullets">${arr.map((x) => `<li>${ph(x)}</li>`).join('')}</ul>` : '<p class="muted">[Nothing recorded yet]</p>');
  const figures = (arr) => `<div class="figs">${arr.map((a) => `<div class="fig"><b>${ph(a.value)}</b><span>${ph(a.label)}</span></div>`).join('')}</div>`;

  function projectView(p) {
    const roles = (p.roleIds || []).map((id) => link(`#/x/${id}`, `${id} · ${esc(roleById[id].title)}`, 'chip chip--link')).join('') || '<span class="muted">[Role record to confirm]</span>';
    const evidence = (p.visuals.length ? p.visuals.map((src, i) => `<figure class="ev"><img src="${esc(src)}" alt="${esc(p.visualHints[i] || p.title)}" loading="lazy" decoding="async"><figcaption>${esc(p.visualHints[i] || '')}</figcaption></figure>`).join('')
      : p.visualHints.map((h) => `<figure class="ev ev--ph"><span>[${esc(h)}]</span></figure>`).join(''))
      + (p.video ? `<figure class="ev"><iframe src="${esc(p.video)}" title="${esc(p.title)} video" loading="lazy" allowfullscreen></iframe></figure>` : '');
    const tabs = [
      ['overview', 'Overview', `<h3 class="label">Objective</h3><p>${ph(p.objective)}</p><h3 class="label">Challenge</h3><p>${ph(p.challenge)}</p><h3 class="label">My role</h3><p>${ph(p.role)}</p>`],
      ['strategy', 'Strategy', `<h3 class="label">Strategy</h3><p>${ph(p.strategy)}</p>`],
      ['execution', 'Execution', `<h3 class="label">Execution</h3>${list(p.execution)}<h3 class="label">Deliverables</h3>${list(p.deliverables)}`],
      ['evidence', 'Evidence', `<h3 class="label">Visual evidence</h3><div class="evs">${evidence}</div>`],
      ['outcome', 'Outcome', `<h3 class="label">Verified outcome</h3>${figures(p.outcome)}${p.verdicts ? `<div class="verdicts">${p.verdicts.map((v) => `<div class="verdict"><p>${esc(v.q)}</p><p><s>${esc(v.before)}</s> <span aria-hidden="true">→</span> <b>${esc(v.after)}</b></p></div>`).join('')}</div>` : ''}<h3 class="label">Key learning</h3>${list(p.learnings)}`]
    ];
    return `${topbar(p.id)}
      <h2 id="rec-title">${ph(p.title)}</h2>
      ${meta([['INDEX', p.id], ['RECORD TYPE', 'PROJECT'], statusPair(p), ['FILED UNDER', esc(p.filedUnder)], ['YEAR', ph(p.year)], ['MY ROLE', ph(p.role)], ['LAST UPDATED', esc(A.meta.updated)]])}
      <p class="rec__sum">${ph(p.summary)}</p>
      <div class="related"><p class="label">Capabilities used</p><ul class="chips chips--sm">${p.skills.map((s) => `<li>${skillLink(s)}</li>`).join('')}</ul>
        <p class="label">Experience record</p><p class="chips chips--sm">${roles}</p></div>
      <div class="tabs" data-tabs>
        <div class="tabs__list" role="tablist" aria-label="Case file sections">${tabs.map(([id, label], i) => `<button type="button" role="tab" id="tab-${id}" aria-controls="panel-${id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${label}</button>`).join('')}</div>
        ${tabs.map(([id, , body], i) => `<div class="tabs__panel" role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}" ${i ? 'hidden' : ''} tabindex="0">${body}</div>`).join('')}
      </div>`;
  }
  function roleView(r) {
    const files = projectsOfRole(r.id);
    return `${topbar(r.id)}
      <h2 id="rec-title">${esc(r.title)}${r.promoted ? ' <span class="pill">Promoted</span>' : ''}</h2>
      ${meta([['INDEX', r.id], ['RECORD TYPE', 'EXPERIENCE'], statusPair(r), ['EMPLOYMENT', r.type === 'full-time' ? 'Full-time' : 'Internship'], ['COMPANY', esc(r.company)], ['DATES', ph(r.dates)], ['LOCATION', esc(r.place)], ['LAST UPDATED', esc(A.meta.updated)]])}
      <div class="rec__cols">
        <section><h3 class="label">Responsibilities &amp; contributions</h3>
          <ul class="bullets">${r.responsibilities.map((x) => `<li>${ph(x.text)}${x.skills.length ? `<ul class="chips chips--sm">${x.skills.map((s) => `<li>${skillLink(s)}</li>`).join('')}</ul>` : ''}</li>`).join('')}</ul></section>
        <section><h3 class="label">Verified achievements</h3>${r.achievements.length ? figures(r.achievements) : '<p class="muted">[No verified figure recorded for this role yet]</p>'}
          <h3 class="label">Projects filed under this role</h3>${files.length ? `<ul class="plain">${files.map((p) => `<li><a class="idlink" href="#/p/${p.id}">${p.id}</a> <a href="#/p/${p.id}">${ph(p.title)}</a></li>`).join('')}</ul>` : '<p class="muted">No case files are linked to this role yet.</p>'}</section>
      </div>`;
  }
  function wireTabs(root) {
    const wrap = $('[data-tabs]', root); if (!wrap) return;
    const tabs = $$('[role=tab]', wrap), panels = $$('[role=tabpanel]', wrap);
    const pick = (i, focus) => { tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; panels[j].hidden = i !== j; }); if (focus) tabs[i].focus(); };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => pick(i));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
        if (k !== undefined) { e.preventDefault(); pick(k, true); }
      });
    });
  }
  function showRecord(kind, id) {
    const key = kind + id;
    if (current === key && dlg.open) return;
    const rec = kind === 'p' ? projectById[id] : roleById[id];
    recInner.innerHTML = kind === 'p' ? projectView(rec) : roleView(rec);
    wireTabs(recInner);
    if (!dlg.open) { lastTrigger = document.activeElement; dlg.showModal(); }
    dlg.scrollTop = 0;
    current = key;
    document.title = `${id} · ${(kind === 'p' ? rec.title : rec.title + ', ' + rec.company).replace(/\[|\]/g, '')} · The Curiosity Index`;
  }
  function hideRecord() { if (dlg.open) dlg.close(); current = null; document.title = baseTitle; }
  dlg.addEventListener('close', () => { current = null; document.title = baseTitle; if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true }); });
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); closeRecord(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-close]')) closeRecord(); });

  /* ==========================================================================
     ROUTER · hash routes, with real history so Back behaves
       #/p/CF-001  case file    #/x/XP-007  experience record    #/s/creator  skill
     ========================================================================== */
  const isRec = (h) => /^#\/[px]\//.test(h);
  function route() {
    const h = location.hash; let m;
    if ((m = h.match(/^#\/p\/([\w-]+)$/)) && projectById[m[1]]) { ensureDeep(); showRecord('p', m[1]); return; }
    if ((m = h.match(/^#\/x\/([\w-]+)$/)) && roleById[m[1]]) { ensureDeep(); showRecord('x', m[1]); return; }
    if ((m = h.match(/^#\/s\/([\w-]+)$/)) && skillById[m[1]]) { hideRecord(); selectSkill(m[1]); if (!route.quiet) $('#skills').scrollIntoView({ behavior: route.first ? 'auto' : smooth }); return; }
    hideRecord(); selectSkill(null);
  }
  function ensureDeep() { if (!history.state) history.replaceState({ k: 1, deep: true }, '', location.href); }
  function go(hash, { noScroll = false } = {}) {
    const st = history.state || {};
    const k = isRec(hash) ? (current ? (st.k || 0) + 1 : 1) : 0;
    history.pushState({ k, deep: !!st.deep }, '', hash);
    route.quiet = noScroll; route(); route.quiet = false;
  }
  function closeRecord() {
    const st = history.state || {};
    if (st.k && !st.deep) history.go(-st.k);
    else { history.replaceState(null, '', location.pathname + location.search); route(); }
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    go(a.getAttribute('href'));
  });
  addEventListener('popstate', () => { route.quiet = true; route(); route.quiet = false; });
  addEventListener('hashchange', route);

  /* ==========================================================================
     NAV highlight
     ========================================================================== */
  const navLinks = $$('.bar__nav a'), secs = navLinks.map((a) => $(a.getAttribute('href')));
  const markNav = () => { const y = innerHeight * 0.3; let cur = null; secs.forEach((s) => { if (s && s.getBoundingClientRect().top <= y) cur = s; });
    navLinks.forEach((a) => { const on = cur && a.getAttribute('href') === `#${cur.id}`; a.classList.toggle('is-here', !!on); on ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'); }); };
  addEventListener('scroll', markNav, { passive: true });

  /* ==========================================================================
     ENQUIRY FORM · reports success only when the service accepts the message
     ========================================================================== */
  $('#e-type').insertAdjacentHTML('beforeend', A.enquiryTypes.map((t) => `<option>${esc(t)}</option>`).join(''));
  $('#link-email').href = `mailto:${A.meta.email}`;
  $('#link-linkedin').href = A.meta.linkedin;
  $('#link-resume').href = A.meta.resume;
  $('#foot-updated').textContent = A.meta.updated;

  const form = $('#enq'), st = $('#e-status'), submit = $('#e-submit'), label = $('.btn__label', submit);
  const req = ['e-name', 'e-email', 'e-type', 'e-msg'].map((id) => document.getElementById(id));
  const check = (el) => { const ok = el.value.trim() !== '' && el.checkValidity(); el.classList.toggle('is-invalid', !ok); el.setAttribute('aria-invalid', String(!ok)); document.getElementById(`${el.id}-err`).hidden = ok; return ok; };
  req.forEach((el) => ['input', 'change'].forEach((ev) => el.addEventListener(ev, () => { if (el.classList.contains('is-invalid')) check(el); })));
  const say = (msg, kind) => { st.textContent = msg; st.className = `enq__status${kind ? ` is-${kind}` : ''}`; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); say('');
    const bad = req.filter((el) => !check(el));
    if (bad.length) { bad[0].focus(); say('Please complete the highlighted fields.', 'err'); return; }
    const endpoint = (A.meta.formEndpoint || '').trim();
    if (!endpoint) { say('This form is not connected yet, so nothing was sent. Please use the Email button instead.', 'err'); return; }
    submit.classList.add('is-loading'); submit.setAttribute('aria-busy', 'true'); label.textContent = 'Submitting…';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      form.reset();
      say(`Enquiry received at ${t}. I will reply to the email address you gave.`, 'ok');
    } catch { say('Your enquiry could not be sent. Please try again, or use the Email button.', 'err'); }
    finally { submit.classList.remove('is-loading'); submit.removeAttribute('aria-busy'); label.textContent = 'Submit enquiry'; }
  });

  /* ---------- start ---------- */
  renderResults(); renderLog(); renderLibrary(); renderSkillPanel();
  route.first = true; route(); route.first = false;
  markNav();
  requestAnimationFrame(drawEdges);
})();
