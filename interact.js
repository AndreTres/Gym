// 1. Fade-in suave quando os elementos entram na tela
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));


// 2. Destaque automático no menu com base na seção visível
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionTop = current.offsetTop - 80;
    const sectionHeight = current.offsetHeight;
    const sectionId = current.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});


// 3. Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});