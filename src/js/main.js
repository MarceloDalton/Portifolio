import { CodeRain } from './modules/CodeRain.js';
import { TextAnimation } from './modules/TextAnimation.js';
import { SkillWeb } from './modules/SkillWeb.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Background Effect
  new CodeRain('codeRain');

  // Initialize Hero Text
  const phrases = [
    "Transformando ideias em soluções digitais modernas.",
    "Desenvolvendo sistemas personalizados para seu negócio.",
    "Criando experiências digitais inovadoras e funcionais."
  ];
  new TextAnimation('animated-text', phrases);

  // Initialize Custom Skill Web
  const skillData = [
    { label: 'Comunicação', value: 80 },
    { label: 'Front', value: 50 },
    { label: 'Back', value: 75 },
    { label: 'Resolução de Problemas', value: 70 },
    { label: 'Organização', value: 75 }
  ];
  new SkillWeb('skillWeb', skillData);

  // Scroll Reveal Implementation
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Tech Stars Logic
  const initStars = () => {
    document.querySelectorAll('.tech-card').forEach(card => {
      const starContainer = card.querySelector('.stars-container');
      if (!starContainer || starContainer.children.length > 0) return;

      const starCount = parseInt(card.getAttribute('data-stars')) || 0;
      
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star', 'star-icon');
        
        if (i <= starCount) {
          star.classList.add('filled');
          star.style.animationDelay = `${i * 0.1}s`;
        } else {
          star.classList.add('empty');
        }
        
        starContainer.appendChild(star);
      }
    });
  };

  initStars();

  // Tech Carousel Loop
  const techCarousel = document.getElementById('techCarousel');
  if (techCarousel) {
    const originalContent = techCarousel.innerHTML;
    techCarousel.innerHTML += originalContent;
    // After duplicating, we need to init stars for the new cards too
    initStars();
  }

  // Contact Reveal Logic
  const btnMostrar = document.getElementById('btnMostrarContato');
  const infoContato = document.getElementById('infoContato');

  if (btnMostrar && infoContato) {
    btnMostrar.addEventListener('click', () => {
      const isHidden = infoContato.classList.contains('hidden');
      if (isHidden) {
        infoContato.classList.remove('hidden');
        btnMostrar.textContent = 'Ocultar Contato';
      } else {
        infoContato.classList.add('hidden');
        btnMostrar.textContent = 'Mostrar Contato';
      }
    });
  }

  // Project Modal Logic
  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const closeModalBtn = document.getElementById('closeModal');

  document.querySelectorAll('.link-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.proj-card');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-description');

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  const closeModal = () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Navbar Logic
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
});
