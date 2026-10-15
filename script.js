// Fade sections up as they scroll into view. Without JS, everything shows.
document.documentElement.classList.add('js');

const items = document.querySelectorAll('.fade');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-in'));
}

// Contact form: all fields required, then sent to Formspree.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const fields = ['name', 'email', 'message'].map((id) => document.getElementById(id));

const check = (el) => {
  const ok = el.value.trim() !== '' && el.checkValidity();
  el.classList.toggle('is-invalid', !ok);
  el.setAttribute('aria-invalid', String(!ok));
  document.getElementById(`${el.id}-err`).hidden = ok;
  return ok;
};
fields.forEach((el) => el.addEventListener('input', () => { if (el.classList.contains('is-invalid')) check(el); }));

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.className = 'form__status';
  const bad = fields.filter((el) => !check(el));
  if (bad.length) { bad[0].focus(); return; }

  if (form.action.includes('%5B') || form.action.includes('[')) {
    status.textContent = 'The form is not connected yet. Please use the Email button for now.';
    status.classList.add('is-err');
    return;
  }

  status.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error();
    form.reset();
    status.textContent = 'Thank you. Your letter has been sent.';
    status.classList.add('is-ok');
  } catch {
    status.textContent = 'Something went wrong. Please try again or use the Email button.';
    status.classList.add('is-err');
  }
});
