// ============================================
// main.js — Frosty Scoops
// Manipulación del DOM con JavaScript puro
// ============================================


// ── 1. AÑO DINÁMICO en el footer ──
// Selecciona el elemento .copy del DOM y escribe el año actual
const copyEl = document.querySelector('footer .copy');
if (copyEl) {
  copyEl.textContent = '© ' + new Date().getFullYear() + ' · Todos los derechos reservados';
}


// ── 2. NAVBAR: cambia apariencia al hacer scroll ──
// Selecciona el nav y escucha el evento scroll de la ventana
const nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    nav.classList.add('nav-scrolled');       // agrega clase al DOM
  } else {
    nav.classList.remove('nav-scrolled');    // quita clase del DOM
  }
});


// ── 3. CHIPS: selección interactiva de sabores (solo en index.html) ──
const chips = document.querySelectorAll('.chip');

chips.forEach(function (chip) {
  chip.addEventListener('click', function () {

    const yaActivo = chip.classList.contains('chip-activo');

    // Quita el estado activo de todos los chips
    chips.forEach(function (c) {
      c.classList.remove('chip-activo');
    });

    if (!yaActivo) {
      chip.classList.add('chip-activo');
      mostrarMensajeSabor(chip.textContent.trim());
    } else {
      ocultarMensajeSabor();
    }
  });
});

function mostrarMensajeSabor(nombre) {
  // Busca si el mensaje ya existe, si no lo CREA en el DOM
  let msg = document.getElementById('sabor-msg');

  if (!msg) {
    msg = document.createElement('p');       // crea nuevo elemento
    msg.id = 'sabor-msg';
    msg.className = 'sabor-msg';

    const chipsGrid = document.querySelector('.chips-grid');
    if (chipsGrid) {
      // Inserta el párrafo justo después de los chips
      chipsGrid.insertAdjacentElement('afterend', msg);
    }
  }

  msg.innerHTML = '✦ Seleccionaste: <strong>' + nombre + '</strong> — ¡Excelente elección!';
  msg.classList.add('visible');
}

function ocultarMensajeSabor() {
  const msg = document.getElementById('sabor-msg');
  if (msg) msg.classList.remove('visible');
}


// ── 4. EQUIPO: crea tarjetas dinámicamente en nosotros.html ──
const equipo = [
  { nombre: 'Lucía Mamani',   rol: 'Fundadora & Chef',      emoji: '👩‍🍳' },
  { nombre: 'Carlos Quispe',  rol: 'Maestro artesano',      emoji: '👨‍🍳' },
  { nombre: 'Valeria Torres', rol: 'Atención al cliente',   emoji: '😊'  },
  { nombre: 'Diego Flores',   rol: 'Nuevos sabores',        emoji: '🎨'  },
];

const equipoGrid = document.getElementById('equipo-grid');

if (equipoGrid) {
  equipo.forEach(function (persona) {
    // Crea cada tarjeta y la agrega al DOM
    const card = document.createElement('div');
    card.className = 'equipo-card';

    card.innerHTML =
      '<div class="equipo-avatar">' + persona.emoji + '</div>' +
      '<h3>' + persona.nombre + '</h3>' +
      '<p>' + persona.rol + '</p>';

    equipoGrid.appendChild(card);   // inserta en el DOM
  });
}


// ── 5. VALORES: efecto click en nosotros.html ──
const valorCards = document.querySelectorAll('.valor-card');

valorCards.forEach(function (card) {
  card.addEventListener('click', function () {
    // Quita activo de todas y activa la clickeada
    valorCards.forEach(function (c) { c.classList.remove('valor-activo'); });
    card.classList.add('valor-activo');
  });
});


// ============================================
// FORMULARIO DE PEDIDO (pedido.html)
// ============================================

const saboresPedido = [
  { nombre: 'Fresa Natural',    color: '#f7a8c0' },
  { nombre: 'Chocolate Negro',  color: '#8c6419' },
  { nombre: 'Vainilla Bourbon', color: '#f7d08a' },
  { nombre: 'Menta & Chips',    color: '#7cd9b0' },
  { nombre: 'Mango Tropical',   color: '#f7a855' },
  { nombre: 'Lavanda',          color: '#b8a4e8' },
  { nombre: 'Maracuyá',         color: '#f4c97b' },
  { nombre: 'Limón Sorbete',    color: '#d4e8a4' },
  { nombre: 'Frambuesa',        color: '#e89fb8' },
  { nombre: 'Blueberry',        color: '#a8c4f7' },
  { nombre: 'Dulce de Leche',   color: '#e8c4a4' },
  { nombre: 'Oreo & Crema',     color: '#c8b4f7' },
];

// ── Selector de sabores en el formulario ──
const selectorGrid = document.getElementById('sabores-selector');
const saborLabel   = document.getElementById('sabor-elegido-label');
let saborElegido   = '';

if (selectorGrid) {
  saboresPedido.forEach(function (s) {
    const chip = document.createElement('div');
    chip.className = 'chip chip-pedido';
    chip.innerHTML = '<div class="chip-dot" style="background:' + s.color + '"></div>' + s.nombre;

    chip.addEventListener('click', function () {
      // Quita activo de todos y activa el clickeado
      selectorGrid.querySelectorAll('.chip').forEach(function (c) {
        c.classList.remove('chip-activo');
      });
      chip.classList.add('chip-activo');
      saborElegido = s.nombre;

      // Actualiza el texto en el DOM
      saborLabel.textContent = '✦ Elegiste: ' + s.nombre;
      saborLabel.classList.add('sabor-confirmado');
    });

    selectorGrid.appendChild(chip); // inserta chip en el DOM
  });
}

// ── Contador de cantidad ──
const btnMenos    = document.getElementById('btn-menos');
const btnMas      = document.getElementById('btn-mas');
const cantidadEl  = document.getElementById('cantidad-valor');
let cantidad = 1;

if (btnMenos) {
  btnMenos.addEventListener('click', function () {
    if (cantidad > 1) {
      cantidad--;
      cantidadEl.textContent = cantidad; // actualiza el DOM
    }
  });
}

if (btnMas) {
  btnMas.addEventListener('click', function () {
    if (cantidad < 10) {
      cantidad++;
      cantidadEl.textContent = cantidad; // actualiza el DOM
    }
  });
}

// ── Envío del formulario ──
const btnEnviar = document.getElementById('btn-enviar');

if (btnEnviar) {
  btnEnviar.addEventListener('click', function () {
    const nombre    = document.getElementById('nombre').value.trim();
    const telefono  = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const notas     = document.getElementById('notas').value.trim();
    const confirmEl = document.getElementById('confirmacion');

    // Validación básica: campos requeridos
    if (!nombre || !telefono || !direccion || !saborElegido) {
      // Crea o actualiza mensaje de error en el DOM
      confirmEl.innerHTML =
        '<div class="msg-error">⚠ Por favor completa: nombre, teléfono, dirección y sabor.</div>';
      confirmEl.classList.add('visible');
      return;
    }

    // Si todo está bien, muestra la confirmación inyectada en el DOM
    confirmEl.innerHTML =
      '<div class="msg-ok">' +
        '<div class="msg-ok-icono">🎉</div>' +
        '<h3>¡Pedido recibido, ' + nombre + '!</h3>' +
        '<p><strong>Sabor:</strong> ' + saborElegido + '</p>' +
        '<p><strong>Cantidad:</strong> ' + cantidad + ' bola' + (cantidad > 1 ? 's' : '') + '</p>' +
        '<p><strong>Entrega en:</strong> ' + direccion + '</p>' +
        (notas ? '<p><strong>Notas:</strong> ' + notas + '</p>' : '') +
        '<p class="msg-ok-sub">Te contactaremos al <strong>' + telefono + '</strong> para confirmar.</p>' +
      '</div>';
    confirmEl.classList.add('visible');

    // Hace scroll suave al mensaje de confirmación
    confirmEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Deshabilita el botón para evitar doble envío
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Pedido enviado ✓';
    btnEnviar.style.opacity = '0.6';
  });
}

// ============================================
// SLIDER AUTOMÁTICO
// ============================================

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;

function mostrarSlide(index) {

  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function siguienteSlide() {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  mostrarSlide(currentSlide);
}

// Cambio automático cada 5 segundos
setInterval(siguienteSlide, 5000);

// Click manual en dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    mostrarSlide(currentSlide);
  });
});

// ============================================
// MENÚ MOBILE
// ============================================

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {

  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });

}