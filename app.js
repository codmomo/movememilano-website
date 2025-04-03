// Blocca il tasto destro su tutta la pagina
window.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

// Funzione per lo scroll smooth
function scrollToSection(event, sectionId) {
  event.preventDefault();
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Gestione menu hamburger per dispositivi mobili
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', function() {
    if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "block";
    }
  });
}

// Caricamento dinamico del contenuto completo dal file content.html
document.addEventListener("DOMContentLoaded", function() {
  fetch("content.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Errore nel caricamento del contenuto");
      }
      return response.text();
    })
    .then(html => {
      document.getElementById("dynamicContent").innerHTML = html;
      // Inizializza eventuali script aggiuntivi nel contenuto caricato
      initDynamicContent();
    })
    .catch(error => {
      console.error("Errore: ", error);
    });
});

// Funzione per inizializzare il contenuto dinamico (es. animazioni, prenotazioni, ecc.)
function initDynamicContent() {
  // Attiva Intersection Observer per le animazioni in scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // Inizializza eventuali altre funzionalità (ad es. gestione form di prenotazione)
}
