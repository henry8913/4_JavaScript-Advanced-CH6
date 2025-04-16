
// ======================================================
// PRODUCT DETAIL INITIALIZATION
// ======================================================
const productDetail = document.getElementById('product-detail');
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// ======================================================
// API DATA FETCH
// ======================================================
fetch(`https://api-hyper-car-hub-henry8913.replit.app/cars/${productId}`)
  .then(response => response.json())
  .then(product => {
    productDetail.innerHTML = `
      <div class="container">
        <div class="row flex-column">
          <div class="col-12 mb-4">
            <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid product-full-image" />
          </div>
          <div class="col-12">
            <h1>${product.name}</h1>
            <p class="brand-name">By ${product.brand}</p>
            <p class="car-price">€${product.price.toLocaleString()}</p>
            <hr>
            <p class="description">${product.description}</p>
            <div class="d-flex flex-column flex-md-row gap-2 mt-4 product-detail-buttons">
              <a href="index.html#gallery" class="btn btn-secondary">
                <i class="fas fa-arrow-left me-2"></i>Torna alla Galleria
              </a>
              <button onclick="addToCartFromDetail('${product.id}', '${product.name}', ${product.price}, '${product.brand}', '${product.imageUrl}')" class="btn btn-primary">
                <i class="fas fa-shopping-cart me-2"></i> Aggiungi al Carrello
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  })
  .catch(error => console.error('Error fetching product:', error));

// ======================================================
// CART MANAGEMENT FUNCTIONS
// ======================================================
function addToCartFromDetail(productId, name, price, brand, imageUrl) {
  let cart = [];
  const savedCart = localStorage.getItem('hypercarCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: name,
      price: price,
      brand: brand,
      imageUrl: imageUrl,
      quantity: 1
    });
  }

  localStorage.setItem('hypercarCart', JSON.stringify(cart));
  updateCartIcon();
  showCartNotification(`${name} è stato aggiunto al carrello!`);
}

// ======================================================
// UI HELPER FUNCTIONS
// ======================================================
function updateCartIcon() {
  const cartCountElement = document.getElementById('cart-count');
  const cartCountMobileElement = document.getElementById('cart-count-mobile');

  let cart = [];
  const savedCart = localStorage.getItem('hypercarCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.textContent = itemCount;
    cartCountElement.style.display = itemCount > 0 ? 'inline-flex' : 'none';
  }

  if (cartCountMobileElement) {
    cartCountMobileElement.textContent = itemCount;
    cartCountMobileElement.style.display = itemCount > 0 ? 'inline-flex' : 'none';
  }
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

// ======================================================
// EVENT LISTENERS
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  updateCartIcon();
});
