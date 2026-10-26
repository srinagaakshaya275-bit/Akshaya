/* ==========================================================================
   THE GLASSHOUSE · behaviour
   Content comes from data.js (window.SITE). No frameworks.
   ========================================================================== */
(() => {
  const SITE = window.SITE || { roles: [], projects: [] };
  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /* Text inside [brackets] is a placeholder: render it in the placeholder style. */
  const txt = (s) => esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');

  /* ---------- Pointer light & perspective (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    let raf = 0;
    window.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--px', ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
        root.style.setProperty('--py', ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
      });
    }, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  const reveal = (els) => {
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    els.forEach((el) => io.observe(el));
  };
  reveal(document.querySelectorAll('.reveal'));

  /* ---------- Directory: highlight the room you are in ---------- */
  const roomLinks = [...document.querySelectorAll('.directory__rooms a')];
  const rooms = roomLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const markRoom = () => {
    const y = innerHeight * 0.35;
    let current = null;
    rooms.forEach((r) => { if (r.getBoundingClientRect().top <= y) current = r; });
    roomLinks.forEach((a) => {
      const here = !!current && a.getAttribute('href') === `#${current.id}`;
      a.classList.toggle('is-here', here);
      if (here) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  };
  addEventListener('scroll', markRoom, { passive: true });
  markRoom();

  /* ==========================================================================
     CORRIDORS
     ========================================================================== */
  const track = document.getElementById('corridor-track');
  const dossier = document.getElementById('dossier');
  let openRole = null;

  track.innerHTML = SITE.roles.map((r, i) => `
    <div class="door${r.kind.startsWith('Full') ? ' door--full' : ''}" role="listitem">
      <button class="door__btn" type="button" data-role="${esc(r.id)}" aria-expanded="false" aria-controls="dossier">
        <span class="door__no">Room ${String(i + 1).padStart(2, '0')}</span>
        <span class="door__kind">${esc(r.kind)}</span>
        <span class="door__company">${esc(r.company)}</span>
        <span class="door__title">${esc(r.title)}</span>
        <span class="door__dates">${txt(r.dates)}</span>
      </button>
    </div>`).join('');

  const figures = (arr) => `<div class="figures">${arr.map((a) => `<div class="figure"><b>${txt(a.value)}</b><span>${txt(a.label)}</span></div>`).join('')}</div>`;

  const renderDossier = (r) => `
    <div class="dossier__head">
      <div>
        <p class="dossier__kind">${esc(r.kind)} · ${esc(r.place)}</p>
        <h3 class="dossier__title">${esc(r.title)}</h3>
        <p class="dossier__meta">${esc(r.company)} · ${txt(r.dates)}</p>
      </div>
      <button class="btn btn--ghost dossier__close" type="button" data-close-dossier>Close room</button>
    </div>
    <div class="dossier__body">
      <div>
        <p class="kicker">What I did</p>
        <ul class="dossier__list" style="margin-top:12px">${r.responsibilities.map((x) => `<li>${txt(x)}</li>`).join('')}</ul>
      </div>
      <div>
        <p class="kicker" style="margin-bottom:12px">Results</p>
        ${r.achievements.length ? figures(r.achievements) : '<p class="dossier__none">[Add a result for this role in data.js]</p>'}
      </div>
    </div>`;

  const setRole = (id) => {
    const btns = track.querySelectorAll('.door__btn');
    if (!id || id === openRole) {
      openRole = null;
      dossier.hidden = true;
      btns.forEach((b) => b.setAttribute('aria-expanded', 'false'));
      return;
    }
    const role = SITE.roles.find((r) => r.id === id);
    if (!role) return;
    openRole = id;
    btns.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.role === id)));
    dossier.hidden = false;
    dossier.innerHTML = renderDossier(role);
    dossier.style.animation = 'none'; void dossier.offsetWidth; dossier.style.animation = '';
    // Keep the visitor where they are; only nudge if the panel is out of view.
    if (dossier.getBoundingClientRect().top > innerHeight - 120) {
      dossier.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  };

  track.addEventListener('click', (e) => {
    const b = e.target.closest('.door__btn');
    if (b) setRole(b.dataset.role);
  });
  track.addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const btns = [...track.querySelectorAll('.door__btn')];
    const i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? btns.length - 1 : Math.max(0, Math.min(btns.length - 1, i + (e.key === 'ArrowRight' ? 1 : -1)));
    btns[n].focus();
    btns[n].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'nearest' });
  });
  dossier.addEventListener('click', (e) => {
    if (!e.target.closest('[data-close-dossier]')) return;
    const id = openRole;
    setRole(null);
    track.querySelector(`[data-role="${id}"]`)?.focus();
  });

  /* ==========================================================================
     EXHIBITION
     ========================================================================== */
  const chambers = document.getElementById('chambers');
  const catalogue = document.getElementById('catalogue');
  const projects = SITE.projects;

  chambers.innerHTML = projects.map((p) => {
    const lead = p.stats && p.stats[0];
    const hint = (p.visualHints && p.visualHints[0]) || 'Project visual';
    const exhibit = p.visuals && p.visuals[0] ? `<img src="${esc(p.visuals[0])}" alt="" loading="lazy">` : `<span>[${esc(hint)}]</span>`;
    return `
      <article class="chamber${p.featured ? ' chamber--featured' : ''}" data-cat="${esc(p.category)}">
        <button class="case-btn" type="button" data-case="${esc(p.id)}" aria-haspopup="dialog">
          <span class="vitrine">
            <span class="vitrine__exhibit">${exhibit}</span>
            <span class="vitrine__text">
              <span class="vitrine__meta"><span>${esc(p.categoryLabel)}</span><span>${txt(p.year)}</span></span>
              <span class="vitrine__title">${txt(p.title)}</span>
              <span class="vitrine__summary">${txt(p.summary)}</span>
              ${lead ? `<span class="vitrine__stat">${txt(lead.value)} <span>${txt(lead.label)}</span></span>` : ''}
            </span>
          </span>
          <span class="plinth" aria-hidden="true"></span>
        </button>
      </article>`;
  }).join('');

  catalogue.innerHTML = projects.map((p) => `<li><a href="#case-${esc(p.id)}">${txt(p.title)}</a></li>`).join('');

  const filters = document.querySelectorAll('.filter');
  filters.forEach((f) => f.addEventListener('click', () => {
    const cat = f.dataset.filter;
    filters.forEach((x) => { const on = x === f; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
    chambers.querySelectorAll('.chamber').forEach((c) => { c.hidden = !(cat === 'all' || c.dataset.cat === cat); });
  }));

  /* ---------- Case study room ---------- */
  const dialog = document.getElementById('case');
  const caseInner = document.getElementById('case-inner');
  let returnFocus = null;

  const block = (title, body, wide) => `<section class="case__block${wide ? ' case__block--wide' : ''}"><h3>${title}</h3>${body}</section>`;
  const para = (s) => `<p>${txt(s || '[To add]')}</p>`;
  const list = (arr) => (arr && arr.length ? `<ul class="dossier__list">${arr.map((x) => `<li>${txt(x)}</li>`).join('')}</ul>` : para(''));

  const renderCase = (p) => {
    const visuals = [];
    (p.visuals || []).forEach((src, i) => visuals.push(`<figure><img src="${esc(src)}" alt="${esc((p.visualHints || [])[i] || p.title)}" loading="lazy"></figure>`));
    if (p.video) visuals.push(`<figure><iframe src="${esc(p.video)}" title="${esc(p.title)} video" loading="lazy" allowfullscreen></iframe></figure>`);
    if (!visuals.length) (p.visualHints || ['Project visual']).forEach((h) => visuals.push(`<figure><span>[${esc(h)}]</span></figure>`));

    const results = [...(p.stats || []), ...(p.extraStats || [])];
    const verdicts = p.verdicts ? `<div class="verdicts" style="margin-top:20px">${p.verdicts.map((v) => `
      <div class="verdict"><p class="verdict__q">${esc(v.q)}</p>
        <p class="verdict__row"><span class="verdict__before">${esc(v.before)}</span><span aria-hidden="true">→</span><span class="verdict__after">${esc(v.after)}</span></p>
      </div>`).join('')}</div>` : '';

    return `
      <div class="case__top">
        <p class="case__crumb">Exhibition · ${esc(p.categoryLabel)}</p>
        <button class="case__close" type="button" data-close-case aria-label="Close case study">×</button>
      </div>
      <h2 class="case__title" id="case-title">${txt(p.title)}</h2>
      <p class="case__facts"><span>Year <b>${txt(p.year)}</b></span><span>Role <b>${txt(p.role)}</b></span></p>
      <p class="case__summary">${txt(p.summary)}</p>
      <div class="case__visuals">${visuals.join('')}</div>
      <div class="case__grid">
        ${block('Challenge', para(p.challenge))}
        ${block('Objective', para(p.objective))}
        ${block('Strategy', para(p.strategy), true)}
        ${block('Execution', list(p.execution))}
        ${block('Deliverables', list(p.deliverables))}
        ${block('Results', figures(results) + verdicts, true)}
        ${block('Learnings', list(p.learnings), true)}
      </div>`;
  };

  const openCase = (id, fromEl) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    returnFocus = fromEl || document.querySelector(`[data-case="${id}"]`);
    caseInner.innerHTML = renderCase(p);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('.case__close').focus();
    if (location.hash !== `#case-${id}`) history.pushState(null, '', `#case-${id}`);
  };
  dialog.addEventListener('close', () => {
    if (location.hash.startsWith('#case-')) history.replaceState(null, '', location.pathname + location.search);
    returnFocus?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-case]') || e.target === dialog) dialog.close();
  });
  chambers.addEventListener('click', (e) => {
    const b = e.target.closest('[data-case]');
    if (b) openCase(b.dataset.case, b);
  });
  catalogue.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    openCase(a.getAttribute('href').replace('#case-', ''), a);
  });
  const fromHash = () => {
    const m = location.hash.match(/^#case-(.+)$/);
    if (m) openCase(decodeURIComponent(m[1]));
    else if (dialog.open) dialog.close();
  };
  addEventListener('popstate', fromHash);
  fromHash();

  /* ==========================================================================
     ENQUIRY FORM · never reports success unless the service accepted it
     ========================================================================== */
  const form = document.getElementById('enquiry');
  const status = document.getElementById('f-status');
  const submit = document.getElementById('f-submit');
  const label = submit.querySelector('.btn__label');
  const required = ['f-name', 'f-email', 'f-type', 'f-msg'].map((id) => document.getElementById(id));

  const check = (el) => {
    const ok = el.value.trim() !== '' && el.checkValidity();
    el.classList.toggle('is-invalid', !ok);
    el.setAttribute('aria-invalid', String(!ok));
    document.getElementById(`${el.id}-err`).hidden = ok;
    return ok;
  };
  required.forEach((el) => ['input', 'change'].forEach((ev) => el.addEventListener(ev, () => { if (el.classList.contains('is-invalid')) check(el); })));
  const setStatus = (msg, kind) => { status.textContent = msg; status.className = `enquiry__status${kind ? ` is-${kind}` : ''}`; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('');
    const bad = required.filter((el) => !check(el));
    if (bad.length) { bad[0].focus(); setStatus('Please complete the highlighted fields.', 'err'); return; }

    const endpoint = (SITE.formEndpoint || '').trim();
    if (!endpoint) { setStatus('This form is not connected yet, so nothing was sent. Please use the Email button instead.', 'err'); return; }

    submit.classList.add('is-loading');
    submit.setAttribute('aria-busy', 'true');
    label.textContent = 'Sending…';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('Thank you. Your enquiry has been sent, and I will reply by email.', 'ok');
    } catch {
      setStatus('Your enquiry could not be sent. Please try again, or use the Email button.', 'err');
    } finally {
      submit.classList.remove('is-loading');
      submit.removeAttribute('aria-busy');
      label.textContent = 'Send enquiry';
    }
  });
})();
