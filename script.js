// ─── ROTATING TEXT (Fixed - original had 3 bugs) ───────────────────────────
const words = document.querySelectorAll('.rotating-words .word');
let currentIndex = 0;

function rotateWords() {
  const current = words[currentIndex];
  const next = words[(currentIndex + 1) % words.length];

  current.classList.remove('active');
  current.classList.add('exit');

  setTimeout(() => {
    current.classList.remove('exit');
  }, 500);

  next.classList.add('active');
  currentIndex = (currentIndex + 1) % words.length;
}

// Start first word
if (words.length > 0) {
  words[0].classList.add('active');
  setInterval(rotateWords, 2500);
}


// ─── STICKY HEADER on scroll ────────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// ─── ACTIVE NAV LINK on scroll ──────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navlist a');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector(`.navlist a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();


// ─── MOBILE MENU TOGGLE ─────────────────────────────────────────────────────
const menuIcon = document.getElementById('menu-icon');
const navlist  = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
  navlist.classList.toggle('open');
  menuIcon.classList.toggle('bx-x');
  menuIcon.classList.toggle('bx-menu');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navlist.classList.remove('open');
    menuIcon.classList.remove('bx-x');
    menuIcon.classList.add('bx-menu');
  });
});


// ─── CONTACT FORM VALIDATION ────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill in all required fields.';
      formMsg.className   = 'form-msg error';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.className   = 'form-msg error';
      return;
    }

    // ✅ Form is valid — show success message
    // To actually send email, connect to EmailJS or Formspree
    formMsg.textContent = '✓ Message sent! I\'ll get back to you soon.';
    formMsg.className   = 'form-msg success';
    contactForm.reset();

    setTimeout(() => { formMsg.textContent = ''; }, 5000);
  });
}


// ─── SCROLL REVEAL ANIMATION ────────────────────────────────────────────────
const revealElements = document.querySelectorAll(
  '.service-box, .skill-card, .project-card, .contact-item, .about-content, .stat'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});


// ─── CERTIFICATIONS FILTER ───────────────────────────────────────────────────
const certTabs = document.querySelectorAll(".cert-tab");
const certCards = document.querySelectorAll(".cert-card");

certTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    certTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.getAttribute("data-filter");

    certCards.forEach(card => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});


(function () {
  var track    = document.getElementById('pjTrack');
  var dotsWrap = document.getElementById('pjDots');
  var progBar  = document.getElementById('pjProgressBar');
  if (!track) return;

  var cards   = Array.from(track.querySelectorAll('.project-card'));
  var VISIBLE = 4;
  var AUTO_MS = 5000;
  var total   = cards.length;
  var pages   = Math.ceil(total / VISIBLE);
  var page    = 0;
  var timer   = null;

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (var i = 0; i < pages; i++) {
      (function(idx) {
        var b = document.createElement('button');
        b.className = 'pj-dot' + (idx === 0 ? ' active' : '');
        b.addEventListener('click', function() { goTo(idx); resetAuto(); });
        dotsWrap.appendChild(b);
      })(i);
    }
  }

  function updateDots() {
    var dots = dotsWrap.querySelectorAll('.pj-dot');
    dots.forEach(function(d, i) { d.classList.toggle('active', i === page); });
  }

  function goTo(p) {
    page = ((p % pages) + pages) % pages;
    var outer   = track.parentElement;
    var totalGap = 20 * (VISIBLE - 1);
    var cardW   = (outer.offsetWidth - totalGap) / VISIBLE;
    var offset  = page * VISIBLE * (cardW + 20);
    track.style.transform = 'translateX(-' + offset + 'px)';
    updateDots();
    runProgress();
  }

  function runProgress() {
    progBar.style.transition = 'none';
    progBar.style.width = '0%';
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        progBar.style.transition = 'width ' + AUTO_MS + 'ms linear';
        progBar.style.width = '100%';
      });
    });
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function() { goTo(page + 1); }, AUTO_MS);
  }

  function resetAuto() { startAuto(); }

  document.getElementById('pjPrev').addEventListener('click', function() { goTo(page - 1); resetAuto(); });
  document.getElementById('pjNext').addEventListener('click', function() { goTo(page + 1); resetAuto(); });
  window.addEventListener('resize', function() { goTo(page); });

  buildDots();
  goTo(0);
  startAuto();

  /* Modal */
  var modal     = document.getElementById('projectModal');
  var modalClose= document.getElementById('modalClose');

function openModal(card) {
  var d = card.dataset;

  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalType').innerHTML =
    '<i class="bx bx-grid-alt"></i> ' + d.type;
  document.getElementById('modalDesc').textContent = d.desc;

  var imgWrap = document.getElementById('modalImg');
  var iconEl  = document.getElementById('modalIcon');

  var oldImg = imgWrap.querySelector('img.mprev');
  if (oldImg) oldImg.remove();

  if (d.img && d.img.trim() !== '') {
    var imgEl = document.createElement('img');
    imgEl.className = 'mprev';
    imgEl.alt = d.title;

    imgEl.onerror = function() {
      imgEl.remove();
      iconEl.className = d.icon + ' modal-icon';
      iconEl.style.display = '';
    };

    imgEl.src = d.img;
    imgWrap.prepend(imgEl);
    iconEl.style.display = 'none';
  } else {
    iconEl.className = d.icon + ' modal-icon';
    iconEl.style.display = '';
  }

  document.getElementById('modalTags').innerHTML =
    d.tags.split(',').map(function(t) {
      return '<span>' + t.trim() + '</span>';
    }).join('');

  var actions = '';
  if (d.demo)
    actions += '<a href="' + d.demo + '" target="_blank" class="btn-primary">'
             + '<i class="bx bx-link-external"></i> Live Preview</a>';
  if (d.github)
    actions += '<a href="' + d.github + '" target="_blank" class="btn-ghost">'
             + '<i class="bx bxl-github"></i> GitHub</a>';
  document.getElementById('modalActions').innerHTML = actions;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

  function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }

  cards.forEach(function(c) { c.addEventListener('click', function() { openModal(c); }); });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });
})();


(function () {

  /* ── Certification Carousel ── */
  var certTrack   = document.getElementById('certTrack');
  var certDots    = document.getElementById('certDots');
  var certProg    = document.getElementById('certProgressBar');
  if (!certTrack) return;

  var VISIBLE  = 4;
  var AUTO_MS  = 5000;
  var allCards = Array.from(certTrack.querySelectorAll('.cert-card'));
  var visible  = allCards.slice(); /* currently shown cards */
  var page     = 0;
  var timer    = null;

  /* Build dots based on visible cards */
  function buildDots() {
    var pages = Math.ceil(visible.length / VISIBLE);
    certDots.innerHTML = '';
    for (var i = 0; i < pages; i++) {
      (function(idx) {
        var b = document.createElement('button');
        b.className = 'cert-dot' + (idx === 0 ? ' active' : '');
        b.addEventListener('click', function() { goTo(idx); resetAuto(); });
        certDots.appendChild(b);
      })(i);
    }
  }

  function updateDots() {
    var pages = Math.ceil(visible.length / VISIBLE);
    certDots.querySelectorAll('.cert-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === page);
    });
  }

  function goTo(p) {
    var pages = Math.ceil(visible.length / VISIBLE);
    page = ((p % pages) + pages) % pages;
    var outer    = certTrack.parentElement;
    var totalGap = 20 * (VISIBLE - 1);
    var cardW    = (outer.offsetWidth - totalGap) / VISIBLE;
    var offset   = page * VISIBLE * (cardW + 20);
    certTrack.style.transform = 'translateX(-' + offset + 'px)';
    updateDots();
    runProgress();
  }

  function runProgress() {
    certProg.style.transition = 'none';
    certProg.style.width = '0%';
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        certProg.style.transition = 'width ' + AUTO_MS + 'ms linear';
        certProg.style.width = '100%';
      });
    });
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function() {
      var pages = Math.ceil(visible.length / VISIBLE);
      goTo(page + 1);
    }, AUTO_MS);
  }

  function resetAuto() { startAuto(); }

  document.getElementById('certPrev').addEventListener('click', function() { goTo(page - 1); resetAuto(); });
  document.getElementById('certNext').addEventListener('click', function() { goTo(page + 1); resetAuto(); });
  window.addEventListener('resize', function() { goTo(page); });

  /* ── Filter Tabs ── */
  document.querySelectorAll('.cert-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      /* update active tab */
      document.querySelectorAll('.cert-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var filter = tab.dataset.filter;
      page = 0;
      certTrack.style.transform = 'translateX(0)';

      /* show/hide cards */
      visible = [];
      allCards.forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('cert-hidden');
          visible.push(card);
        } else {
          card.classList.add('cert-hidden');
        }
      });

      buildDots();
      goTo(0);
      resetAuto();
    });
  });

  /* init */
  buildDots();
  goTo(0);
  startAuto();

  /* ── Certification Modal ── */
  var certModal      = document.getElementById('certModal');
  var certModalClose = document.getElementById('certModalClose');

  function openCertModal(card) {
    var d = card.dataset;

    /* icon */
    var iconEl = document.getElementById('certModalIcon');
    iconEl.className = d.icon + ' cert-modal-big-icon';

    /* badge color based on category */
    var badge = document.getElementById('certModalBadge');
    var badgeClass = d.category === 'cybersecurity' ? 'cyber-tag'
                   : d.category === 'webdev'        ? 'webdev-tag'
                   : 'ai-tag';
    badge.className = 'cert-modal-badge ' + badgeClass;
    badge.innerHTML = '<i class="bx bx-award"></i> ' + d.categoryLabel;

    document.getElementById('certModalTitle').textContent   = d.title;
    var sub = document.getElementById('certModalSubtitle');
    sub.textContent = d.subtitle || '';
    sub.style.display = d.subtitle ? '' : 'none';

    document.getElementById('certModalIssuer').textContent = d.issuer;
    document.getElementById('certModalYear').textContent   = d.year;

    /* featured top badge in modal */
    var existing = certModal.querySelector('.cert-modal-top-badge');
    if (existing) existing.remove();
    if (d.featured === 'true') {
      var fb = document.createElement('div');
      fb.className = 'cert-top-badge cert-modal-top-badge';
      fb.style.cssText = 'position:absolute;top:14px;left:14px;';
      fb.textContent = '⭐ Top Cert';
      certModal.querySelector('.cert-modal').appendChild(fb);
    }

    /* action button */
    var actions = '<a href="' + d.pdf + '" target="_blank" class="btn-primary">'
            + '<i class="bx bx-file"></i> View Certificate</a>';

if (d.transcript && d.transcript.trim() !== '') {
  actions += '<a href="' + d.transcript + '" target="_blank" class="btn-ghost">'
           + '<i class="bx bx-notepad"></i> View Transcript</a>';
}

document.getElementById('certModalActions').innerHTML = actions;

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  allCards.forEach(function(c) {
    c.addEventListener('click', function() { openCertModal(c); });
  });
  certModalClose.addEventListener('click', closeCertModal);
  certModal.addEventListener('click', function(e) { if (e.target === certModal) closeCertModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeCertModal(); });

})();

(function () {

  /* ── Experience Carousel ── */
  var expTrack = document.getElementById('expTrack');
  var expDots  = document.getElementById('expDots');
  if (!expTrack) return;

  var VISIBLE  = 4;   // Experience -4 cards visible
  var AUTO_MS  = 5000;
  var allCards = Array.from(expTrack.querySelectorAll('.cert-card'));
  var page     = 0;
  var timer    = null;

  function buildDots() {
    var pages = Math.ceil(allCards.length / VISIBLE);
    expDots.innerHTML = '';
    for (var i = 0; i < pages; i++) {
      (function (idx) {
        var b = document.createElement('button');
        b.className = 'cert-dot' + (idx === 0 ? ' active' : '');
        b.addEventListener('click', function () { goTo(idx); resetAuto(); });
        expDots.appendChild(b);
      })(i);
    }
  }

  function updateDots() {
    expDots.querySelectorAll('.cert-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === page);
    });
  }

  function goTo(p) {
    var pages = Math.ceil(allCards.length / VISIBLE);
    page = ((p % pages) + pages) % pages;
    var outer    = expTrack.parentElement;
    var totalGap = 20 * (VISIBLE - 1);
    var cardW    = (outer.offsetWidth - totalGap) / VISIBLE;
    var offset   = page * VISIBLE * (cardW + 20);
    expTrack.style.transform = 'translateX(-' + offset + 'px)';
    updateDots();
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(page + 1); }, AUTO_MS);
  }

  function resetAuto() { startAuto(); }

  var expPrevBtn = document.getElementById('expPrev');
  var expNextBtn = document.getElementById('expNext');
  if (expPrevBtn) expPrevBtn.addEventListener('click', function () { goTo(page - 1); resetAuto(); });
  if (expNextBtn) expNextBtn.addEventListener('click', function () { goTo(page + 1); resetAuto(); });
  window.addEventListener('resize', function () { goTo(page); });

  buildDots();
  goTo(0);
  startAuto();

  /* ── Experience Modal ── */
  var expModal      = document.getElementById('expModal');
  var expModalClose = document.getElementById('expModalClose');

  function openExpModal(card) {
    var d = card.dataset;

    var iconEl = document.getElementById('expModalIcon');
    iconEl.className = d.icon + ' cert-modal-big-icon';

    var badge = document.getElementById('expModalBadge');
    badge.className = 'cert-modal-badge webdev-tag';
    badge.innerHTML = '<i class="bx bx-briefcase"></i> Experience';

    document.getElementById('expModalTitle').textContent  = d.title;
    document.getElementById('expModalIssuer').textContent = d.issuer;
    document.getElementById('expModalYear').textContent   = d.year;

    var actions = '';
    if (d.pdf && d.pdf.trim() !== '') {
      actions = '<a href="' + d.pdf + '" target="_blank" class="btn-primary">'
              + '<i class="bx bx-file"></i> View Certificate</a>';
    }
    document.getElementById('expModalActions').innerHTML = actions;

    expModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeExpModal() {
    expModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  allCards.forEach(function (c) {
    c.addEventListener('click', function () { openExpModal(c); });
  });
  if (expModalClose) expModalClose.addEventListener('click', closeExpModal);
  if (expModal) expModal.addEventListener('click', function (e) { if (e.target === expModal) closeExpModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeExpModal(); });

})();