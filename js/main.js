// WAPARCEL - Main JavaScript

// Mobile menu toggle
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('active');
}

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
}

// Scroll animations — Intersection Observer
const animateEls = document.querySelectorAll('.service-card, .stat-card, .about-feature, .contact-info-item');
if (animateEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(el);
  });
}

// Form submission (client-side demo — wire up to Formspree / your backend)
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = document.getElementById('quoteForm');
  if (!form) return;

  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  // Simulate submission (replace with real endpoint)
  setTimeout(() => {
    btn.textContent = '✓ Request Sent!';
    btn.style.background = '#16a34a';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Request →';
      btn.style.background = '';
      btn.style.opacity = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
}

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    header.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.15)' : '';
  }
});
