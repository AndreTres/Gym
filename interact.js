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

let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 150) {
    // Rolando para baixo e já ultrapassou o topo
    header.style.transform = "translateY(-100%)";
  } else {
    // Rolando para cima
    header.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;
});

// Menu Responsivo
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Tema Claro/Escuro
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Aplica o tema salvo ou padrão claro
if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && !prefersDark)) {
  document.body.classList.add('light-mode');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

// Alternar tema ao clicar
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  icon.classList.toggle('fa-sun', isLight);
  icon.classList.toggle('fa-moon', !isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
