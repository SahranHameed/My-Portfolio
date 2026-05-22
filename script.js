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

