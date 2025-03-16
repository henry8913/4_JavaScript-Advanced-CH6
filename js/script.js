
// ======================================================
// NAVIGATION & INITIALIZATION
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        bsCollapse.hide();
      }
    });
  });
});

// ======================================================
// PRODUCT LOADING AND DISPLAY
// ======================================================
const productList = document.getElementById('product-list');
const initialProductsToShow = 9;
let allProducts = [];

fetch('https://striveschool-api.herokuapp.com/api/product/', {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q3MmEzNWQyMGE5ZTAwMTU2MjA4NjEiLCJpYXQiOjE3NDIxNTQyOTQsImV4cCI6MTc0MzM2Mzg5NH0.JPSnCVxkwlBBl69Sgv836R-ZSKq9-3vcAfv-ISJlc7M'
  }
})
  .then(response => response.json())
  .then(products => {
    allProducts = shuffleArray(products);
    
    const initialProducts = allProducts.slice(0, initialProductsToShow);
    displayProducts(initialProducts);
    
    if (allProducts.length > initialProductsToShow) {
      addShowMoreButton();
    }
  })
  .catch(error => console.error('Error fetching products:', error));

function displayProducts(products) {
  products.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="car-card">
        <img src="${product.imageUrl}" alt="${product.name}" />
        <div class="car-card-body">
          <h3>${product.name}</h3>
          <p class="text-muted">${product.brand}</p>
          <p class="car-price">€${product.price.toLocaleString()}</p>
          <div class="car-card-actions">
            <a href="product.html?id=${product._id}" class="btn btn-outline-primary">Dettagli</a>
            <button onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.brand}', '${product.imageUrl}')" class="btn btn-primary">
              <i class="fas fa-shopping-cart"></i> Aggiungi
            </button>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });
}

function addShowMoreButton() {
  const container = document.querySelector('.featured-section .container');
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'text-center mt-4';
  buttonContainer.id = 'show-more-container';
  
  const showMoreButton = document.createElement('button');
  showMoreButton.className = 'btn btn-primary';
  showMoreButton.textContent = 'Carica altri veicoli';
  showMoreButton.id = 'show-more-button';
  
  showMoreButton.addEventListener('click', () => {
    buttonContainer.remove();
    
    const remainingProducts = allProducts.slice(initialProductsToShow);
    displayProducts(remainingProducts);
  });
  
  buttonContainer.appendChild(showMoreButton);
  container.appendChild(buttonContainer);
}

// ======================================================
// UTILITY FUNCTIONS
// ======================================================
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function openLightbox(index) {
  const images = [
    'https://www.wsupercars.com/wallpapers-regular/Nissan/2024-Nissan-Frontier-Tarmac-001-1080.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2023-Porsche-911-GT3-RS-004-1080.jpg',
    'https://www.wsupercars.com/wallpapers-regular/BMW/2025-BMW-M3-CS-Touring-009-1080.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Toyota/2024-Toyota-GR-86-Rally-Legacy-Concept-001-1080.jpg'
  ];

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="${images[index]}" alt="Gallery Image">
      <span class="close-lightbox" onclick="this.parentElement.parentElement.remove()">&times;</span>
    </div>
  `;
  document.body.appendChild(lightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.remove();
    }
  });
}

// ======================================================
// SHOPPING CART FUNCTIONS
// ======================================================
function addToCart(productId, name, price, brand, imageUrl, quantity = 1) {
  let cart = [];
  const savedCart = localStorage.getItem('hypercarCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: name,
      price: price,
      brand: brand,
      imageUrl: imageUrl,
      quantity: quantity
    });
  }

  localStorage.setItem('hypercarCart', JSON.stringify(cart));

  updateCartIcon();

  showCartNotification(`${name} è stato aggiunto al carrello!`);
}

function updateCartIcon() {
  const cartCount = document.getElementById('cart-count');
  const cartCountMobile = document.getElementById('cart-count-mobile');

  let cart = [];
  const savedCart = localStorage.getItem('hypercarCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cartCount) cartCount.textContent = totalItems;
  if (cartCountMobile) cartCountMobile.textContent = totalItems;
}

function showCartNotification(message) {
  let notification = document.getElementById('cart-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    notification.className = 'cart-notification';
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartIcon();
});

// ======================================================
// BOOKING SYSTEM
// ======================================================
document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formFields = [];

  let allFieldsValid = true;

  const nome = form.querySelector('input[placeholder="Nome e Cognome"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const telefono = form.querySelector('input[type="tel"]').value;
  const data = form.querySelector('input[type="date"]').value;
  const auto = form.querySelector('select').value;
  const note = form.querySelector('textarea').value;

  if (!nome || !email || !telefono || !data || !auto) {
    allFieldsValid = false;
    alert('Per favore, compila tutti i campi obbligatori.');
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'bookingModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'bookingModalLabel');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bookingModalLabel">Prenotazione Confermata</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Grazie <strong>${nome}</strong> per la tua prenotazione!</p>
          <p>Hai prenotato un test drive per l'auto: <strong>${auto}</strong></p>
          <p>Data selezionata: <strong>${data}</strong></p>
          <p>Ti contatteremo al numero <strong>${telefono}</strong> o all'email <strong>${email}</strong> per confermare i dettagli.</p>
          ${note ? `<p>Note: "${note}"</p>` : ''}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Chiudi</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
  bookingModal.show();

  document.getElementById('bookingModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('bookingModal').remove();
  });

  form.reset();
});

// ======================================================
// FAQ SECTION
// ======================================================
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector('i');

  element.classList.toggle('active');
  if (answer.classList.contains('show')) {
    answer.classList.remove('show');
  } else {
    answer.classList.add('show');
  }
}

// ======================================================
// CONTACT FORM
// ======================================================
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;

  const nome = form.querySelector('input[placeholder="Il Tuo Nome"]').value;
  const email = form.querySelector('input[placeholder="La Tua Email"]').value;
  const messaggio = form.querySelector('textarea').value;

  if (!nome || !email || !messaggio) {
    alert('Per favore, compila tutti i campi del form per contattarci.');
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'contactModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'contactModalLabel');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contactModalLabel">Messaggio Inviato</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Grazie <strong>${nome}</strong> per averci contattato!</p>
          <p>Abbiamo ricevuto il tuo messaggio:</p>
          <p><em>"${messaggio}"</em></p>
          <p>Ti risponderemo al più presto all'indirizzo email <strong>${email}</strong>.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Chiudi</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
  contactModal.show();

  document.getElementById('contactModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('contactModal').remove();
  });

  form.reset();
});
