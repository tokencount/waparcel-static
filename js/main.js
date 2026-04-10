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
async function handleSubmit(e) {
  e.preventDefault();
  e.stopPropagation();
  const form = document.getElementById('quoteForm');
  const btn = document.getElementById('submitBtn');
  if (!form) return;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const formData = new FormData(form);
  console.log('Submitting to Formspree...');
  
  try {
    const response = await fetch('https://formspree.io/f/mvzvjkjy', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    console.log('Response status:', response.status);
    if (response.ok) {
      form.reset();
      btn.textContent = '✓ Sent!';
      setTimeout(() => {
        btn.textContent = 'Send Request →';
        btn.disabled = false;
      }, 3000);
    } else {
      const data = await response.json();
      console.log('Error response:', data);
      btn.textContent = 'Error - Try Again';
      btn.disabled = false;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    btn.textContent = 'Error - Try Again';
    btn.disabled = false;
  }
}
}

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    header.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.15)' : '';
  }
});
