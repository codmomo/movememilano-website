document.addEventListener("DOMContentLoaded", function() {
  disableRightClick();
  protectImages();
  // Carica la pagina iniziale
  loadPage("home");
});

function loadPage(section) {
  // Qui simulo contenuti dinamici; per un sito dinamico vero, dovresti chiamare un API endpoint
  let content = "";
  switch(section) {
    case "home":
      content = `<section class="hero" id="hero">
                   <div class="container">
                     <h1>Traslochi semplici e veloci a Milano</h1>
                     <p>MoveMe offre un servizio professionale per muovere i tuoi oggetti in tutta Milano e provincia.</p>
                     <a href="#booking" class="btn" onclick="navigate(event, 'booking')">Programma il tuo trasloco</a>
                   </div>
                 </section>
                 <section id="homeContent" class="animate-on-scroll">
                   <div class="container">
                     <h2>Benvenuto su MoveMe</h2>
                     <p>Scopri il nostro servizio dinamico e sicuro.</p>
                   </div>
                 </section>`;
      break;
    case "booking":
      content = `<section id="booking" class="booking-section animate-on-scroll">
                   <div class="container">
                     <h2>Prenota il tuo Trasloco</h2>
                     <div class="booking-description">
                       <p><strong>First step:</strong> Seleziona il tuo tipo di trasloco.</p>
                       <p><strong>Second step:</strong> Compila i dati sottostanti per richiedere il servizio.</p>
                     </div>
                     <!-- Qui andranno i moduli dinamici per selezionare traslochi interi e altri oggetti -->
                     <!-- Puoi caricare il contenuto del modulo via AJAX oppure inserirlo qui -->
                     <div id="dynamicBookingContent">
                       <!-- Contenuti dinamici -->
                     </div>
                   </div>
                 </section>`;
      break;
    case "punti-forza":
      content = `<section id="punti-forza" class="punti-forza animate-on-scroll">
                   <div class="container">
                     <h2>MoveMe: Azienda leader di traslochi</h2>
                     <p class="slogan">Affidabilità, Professionalità e Sostenibilità: il tuo partner ideale a Milano</p>
                     <div class="punti-grid">
                       <div class="punto">
                         <i class="fas fa-tools"></i>
                         <h4>Tecnici Addestrati</h4>
                         <p>Montaggio dei mobili a regola d'arte.</p>
                       </div>
                       <div class="punto">
                         <i class="fas fa-award"></i>
                         <h4>Massima Professionalità</h4>
                         <p>Servizio garantito per traslochi senza stress.</p>
                       </div>
                       <div class="punto">
                         <i class="fas fa-leaf"></i>
                         <h4>Sostenibilità</h4>
                         <p>Utilizziamo solo materiali riciclabili al 100%.</p>
                       </div>
                       <div class="punto">
                         <i class="fas fa-certificate"></i>
                         <h4>Certificati ISO</h4>
                         <p>Garanzia di qualità e sicurezza.</p>
                       </div>
                     </div>
                   </div>
                 </section>`;
      break;
    case "contattaci":
      content = `<section id="contattaci" class="contattaci-section animate-on-scroll">
                   <div class="container">
                     <h2>Contattaci</h2>
                     <div class="contatti-box">
                       <div class="contatti-info">
                         <p><i class="fas fa-envelope"></i> Email: <a href="mailto:mangooasi@gmail.com">mangooasi@gmail.com</a></p>
                         <p><i class="fas fa-phone-alt"></i> Telefono: <a href="tel:+393668770059">+39 3668770059</a></p>
                         <p>Operiamo a Milano e Provincia.</p>
                       </div>
                       <div class="contatti-map">
                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44779.85563133365!2d9.139336911671807!3d45.461143815058004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6a3ba3c3823%3A0x21d5a3c3698b3927!2sMilano%20MI!5e0!3m2!1sit!2sit!4v1689999999999!5m2!1sit!2sit" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                       </div>
                     </div>
                   </div>
                 </section>`;
      break;
    default:
      content = "<h1>Pagina non trovata</h1>";
  }
  document.getElementById("content").innerHTML = content;
  initAnimateOnScroll(); // Inizializza eventuali animazioni per il nuovo contenuto
}

function navigate(event, section) {
  event.preventDefault();
  loadPage(section);
}

// Disabilita tasto destro, F12, Ctrl+U, etc.
function disableRightClick() {
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });
  document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && (e.key === "u" || e.key === "s" || e.key === "i" || e.key === "j" || e.key === "p")) {
      e.preventDefault();
    }
    if (e.keyCode === 123) {
      e.preventDefault();
    }
  });
}

// Protegge le immagini impedendone il trascinamento
function protectImages() {
  document.querySelectorAll("img").forEach(function(img) {
    img.setAttribute("onmousedown", "return false");
    img.setAttribute("oncontextmenu", "return false");
  });
}

// Animazioni in scroll (inizializza l'IntersectionObserver)
function initAnimateOnScroll() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".animate-on-scroll").forEach(function(el) {
    observer.observe(el);
  });
}

// Funzioni per i controlli plus/minus dei traslochi interi (max 1 per box)
function increaseTrasloco(btn, type) {
  const span = document.getElementById("trasloco-" + type);
  let val = parseInt(span.textContent);
  if (val < 1) {
    val++;
    span.textContent = val;
    btn.parentElement.parentElement.classList.add("selected");
    updateCartUI();
  }
}
function decreaseTrasloco(btn, type) {
  const span = document.getElementById("trasloco-" + type);
  let val = parseInt(span.textContent);
  if (val > 0) {
    val--;
    span.textContent = val;
    btn.parentElement.parentElement.classList.remove("selected");
    updateCartUI();
  }
}

// Gestione degli articoli della cart
let bookingCart = {
  divano: 0,
  tavolo: 0,
  sedie: 0,
  letto: 0,
  armadio: 0,
  sofa: 0,
  frigo: 0,
  bici: 0,
  scrivania: 0,
  libreria: 0,
  lavatrice: 0,
  forno: 0,
  lavastoviglie: 0,
  stufa: 0,
  tv: 0,
  computer: 0,
  stereo: 0,
  vetrine: 0,
  specchi: 0,
  scatolaPiatti: 0,
  pianoforte: 0,
  tapisRoulant: 0,
  sgabelli: 0,
  scatoloni: 0,
  piante: 0,
  barbecue: 0,
  mobiliGiardino: 0,
  scatolone30kg: 0,
  appartamento: 0
};

function getPrice(item) {
  const prices = {
    divano: 150,
    tavolo: 100,
    sedie: 50,
    letto: 150,
    armadio: 150,
    sofa: 150,
    frigo: 150,
    bici: 30,
    scrivania: 80,
    libreria: 100,
    lavatrice: 150,
    forno: 60,
    lavastoviglie: 100,
    stufa: 100,
    tv: 100,
    computer: 30,
    stereo: 50,
    vetrine: 150,
    specchi: 60,
    scatolaPiatti: 40,
    pianoforte: 200,
    tapisRoulant: 150,
    sgabelli: 30,
    scatoloni: 30,
    piante: 30,
    barbecue: 80,
    mobiliGiardino: 40,
    scatolone30kg: 40,
    appartamento: 1000,
    monolocale: 500,
    bilocale: 800,
    casaIndipendente: 2500
  };
  return prices[item] || 0;
}

function updateCartUI() {
  let total = 0;
  for (let item in bookingCart) {
    total += bookingCart[item] * getPrice(item);
    let display = document.getElementById(item + "-qty");
    if (display) display.textContent = bookingCart[item];
  }
  // Aggiungi il prezzo dei box traslochi interi
  const traslochiItems = document.querySelectorAll(".traslochi-item");
  traslochiItems.forEach(function(item) {
    if (item.querySelector(".traslochi-controls span").textContent === "1") {
      total += Number(item.getAttribute("data-price"));
    }
  });
  if (document.getElementById("extra-fuoriMilano") && document.getElementById("extra-fuoriMilano").checked) {
    total += 100;
  }
  document.getElementById("total-price").textContent = total;
  let totalHeader = document.querySelector(".total-header span");
  if (totalHeader) totalHeader.textContent = total;
}

function increaseQuantity(item) {
  bookingCart[item]++;
  updateCartUI();
}

function decreaseQuantity(item) {
  if (bookingCart[item] > 0) {
    bookingCart[item]--;
    updateCartUI();
  }
}

function showModal(title, message) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMessage").textContent = message;
  document.getElementById("confirmationModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("confirmationModal").style.display = "none";
}

function validateBookingForm() {
  const form = document.getElementById("bookingForm");
  const requiredFields = form.querySelectorAll("input[required], select[required]");
  let allValid = true;
  let errorMessages = [];
  requiredFields.forEach(function(field) {
    if (!field.value.trim()) {
      allValid = false;
      let fieldName = field.previousElementSibling ? field.previousElementSibling.innerText : "Campo obbligatorio";
      errorMessages.push(fieldName);
    }
  });
  return { valid: allValid, messages: errorMessages };
}

function submitBooking() {
  const validation = validateBookingForm();
  const errorDiv = document.getElementById("bookingFormErrors");
  if (!validation.valid) {
    errorDiv.textContent = "Compilare questi campi: " + validation.messages.join(", ");
    return;
  } else {
    errorDiv.textContent = "";
  }
  document.getElementById("bookingCartInput").value = JSON.stringify(bookingCart);
  document.getElementById("totaleInput").value = document.getElementById("total-price").textContent;
  const form = document.getElementById("bookingForm");
  const formData = new FormData(form);
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { "Accept": "application/json" }
  })
  .then(response => {
    if (response.ok) {
      showModal("Richiesta Inviata", "La tua richiesta di trasloco è stata inviata correttamente. Controlla la tua mail per la conferma. Grazie da MoveMe!");
      form.reset();
      for (let item in bookingCart) {
        bookingCart[item] = 0;
      }
      updateCartUI();
    } else {
      response.json().then(data => {
        if (data.errors) {
          alert("Errore: " + data.errors.map(error => error.message).join(", "));
        } else {
          alert("Errore nell'invio della richiesta.");
        }
      });
    }
  })
  .catch(error => {
    alert("Errore di rete: " + error.message);
  });
}
