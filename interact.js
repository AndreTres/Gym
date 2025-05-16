// 1. Fade-in Animation ao entrar na tela
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));

// 2. Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 3. Menu responsivo (abre e fecha)
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// 4. Fechar o menu ao clicar em link (mobile)
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});

// 5. Tema Claro/Escuro com memória local
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && !prefersDark)) {
  document.body.classList.add('light-mode');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  icon.classList.toggle('fa-sun', isLight);
  icon.classList.toggle('fa-moon', !isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// 6. Scroll otimizado: ativa menu e esconde/mostra header (com debounce)
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.menu a');
const header = document.querySelector('header');

let lastScrollY = window.scrollY;
let scrollTimeout;

function handleScroll() {
  const scrollY = window.pageYOffset;

  // 6.1 Ativa link do menu conforme a seção visível
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // 6.2 Esconde o header ao descer, mostra ao subir
  if (scrollY > lastScrollY && scrollY > 150) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollY = scrollY;
}

// 6.3 Listener com debounce (evita chamadas excessivas em scroll)
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScroll, 100);
});
