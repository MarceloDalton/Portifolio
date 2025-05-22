// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const fadeInElements = document.querySelectorAll(".section");

  const fadeInOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(fadeInOnScroll, {
    threshold: 0.1
  });

  fadeInElements.forEach(el => {
    el.classList.add("animate-hidden");
    observer.observe(el);
  });

  // Aplica a animação de sublinhado nos links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
    const text = link.textContent;
    link.innerHTML = `<span class="hover-underline">${text}</span>`;
    });

    const carousel = document.getElementById('techCarousel');

  if (carousel) {
    // DUPLICA os cards para simular loop infinito
    const cards = carousel.innerHTML;
    carousel.innerHTML += cards;

    // PAUSA a animação ao passar o mouse
    carousel.addEventListener('mouseenter', () => {
      carousel.style.animationPlayState = 'paused';
    });

    // RETOMA ao tirar o mouse
    carousel.addEventListener('mouseleave', () => {
      carousel.style.animationPlayState = 'running';
    });
  }
  
  // Sistema de estrelas
  const techCards = document.querySelectorAll('.tech-card');

  techCards.forEach(card => {
  const starContainer = card.querySelector('.stars');
  const stars = parseInt(card.getAttribute('data-stars')) || 0;

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.textContent = i <= stars ? '★' : '☆';
      starContainer.appendChild(star);
    }
  });

  // Animação de lestras caindo

  const container = document.getElementById("codeRain");
  const characters = ["00010110", "111010110", "{", "}", "[", "]", ";", ".", ",", "<", ">", "+", "-", "*", "1110110001", "=", "!", "?", ":","const", "let", "var", "function", "return", "=>", "if", "else", "for", "while", "true", "false", "null", "undefined"];

  const numberOfSpans = 50;

  for (let i = 0; i < numberOfSpans; i++) {
    const span = document.createElement("span");
    span.textContent = characters[Math.floor(Math.random() * characters.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 2 + Math.random() * 3 + "s";
    span.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(span);
  }

  // Carousel 2 dos projetos
  
  const projCarousel = document.querySelector(".proj-carousel");
  const btnPrev = document.querySelector(".proj-carousel-btn.prev");
  const btnNext = document.querySelector(".proj-carousel-btn.next");
  const modalProj = document.getElementById("projectModal");
  const modalProjTitle = modalProj.querySelector("#modalTitle");
  const modalProjDesc = modalProj.querySelector("#modalDesc");
  const modalProjClose = modalProj.querySelector(".proj-modal-close");

  btnPrev.addEventListener("click", () => {
    projCarousel.scrollBy({ left: -300, behavior: "smooth" });
  });

  btnNext.addEventListener("click", () => {
    projCarousel.scrollBy({ left: 300, behavior: "smooth" });
  });

  projCarousel.querySelectorAll(".btn-expand").forEach(button => {
    button.addEventListener("click", (e) => {
      const cardProj = e.target.closest(".proj-card");
      modalProjTitle.textContent = cardProj.querySelector("h3").textContent;
      modalProjDesc.textContent = cardProj.querySelector(".full-desc").textContent;

      modalProj.removeAttribute("hidden");
      modalProj.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  modalProjClose.addEventListener("click", closeModalProj);
  modalProj.addEventListener("click", e => {
    if (e.target === modalProj) closeModalProj();
  });

  function closeModalProj() {
    modalProj.setAttribute("hidden", "");
    modalProj.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalProj.hasAttribute("hidden")) {
      closeModalProj();
    }
  });

    
});

const ctx = document.getElementById('skillsRadar').getContext('2d');
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Comunicação', 'Front', 'Back', 'Resolução de Problemas', 'Organização'],
    datasets: [{
      label: 'Minhas Skills',
      data: [80, 50, 75, 70, 75],
      backgroundColor: 'rgba(0, 184, 148, 0.4)',
      borderColor: '#00b894',
      pointBackgroundColor: '#0984e3',
      pointBorderColor: '#fff',
      pointHoverRadius: 6,
      pointRadius: 4,
      borderWidth: 2,
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          display: false  // Remove os números
        },
        grid: {
          color: '#dcdde1'
        },
        angleLines: {
          color: '#dfe6e9'
        },
        pointLabels: {
          color: '#2d3436',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});


