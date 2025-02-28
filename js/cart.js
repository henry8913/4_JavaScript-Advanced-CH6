
// ======================================================
// CART STATE MANAGEMENT
// ======================================================
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  updateCartIcon();

  if (document.getElementById('cart-items-container')) {
    displayCartItems();
  }

  if (document.getElementById('checkout-form')) {
    displayCheckoutSummary();
  }
});

// ======================================================
// CART ITEM FUNCTIONS
// ======================================================
function addToCart(productId, name, price, brand, imageUrl, quantity = 1) {
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

  saveCart();
  updateCartIcon();
  showCartNotification(`${name} è stato aggiunto al carrello!`);
}

function saveCart() {
  localStorage.setItem('hypercarCart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('hypercarCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

function updateCartIcon() {
  const cartCountElement = document.getElementById('cart-count');
  if (!cartCountElement) return;

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  cartCountElement.textContent = itemCount;
  cartCountElement.style.display = itemCount > 0 ? 'inline-flex' : 'none';
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

function removeCartItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartIcon();

  if (document.getElementById('cart-items-container')) {
    displayCartItems();
  }

  if (document.getElementById('checkout-summary')) {
    displayCheckoutSummary();
  }
}

function updateCartItemQuantity(productId, newQuantity) {
  const itemIndex = cart.findIndex(item => item.id === productId);

  if (itemIndex !== -1) {
    if (newQuantity <= 0) {
      removeCartItem(productId);
      return;
    }

    cart[itemIndex].quantity = newQuantity;
    saveCart();
    updateCartIcon();

    if (document.getElementById('cart-items-container')) {
      displayCartItems();
    }

    if (document.getElementById('checkout-summary')) {
      displayCheckoutSummary();
    }
  }
}

function calculateCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ======================================================
// CART UI RENDERING
// ======================================================
function displayCartItems() {
  const cartContainer = document.getElementById('cart-items-container');
  const cartTotalElement = document.getElementById('cart-total');

  if (!cartContainer) return;

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart fa-4x"></i>
        <h3>Il tuo carrello è vuoto</h3>
        <p>Aggiungi alcune auto di lusso al tuo carrello per continuare.</p>
        <a href="../index.html" class="btn btn-primary">Continua lo Shopping</a>
      </div>
    `;

    const checkoutBtn = document.getElementById('checkout-button');
    if (checkoutBtn) {
      checkoutBtn.style.display = 'none';
    }

    if (cartTotalElement) {
      cartTotalElement.textContent = '€0';
    }

    return;
  }

  const checkoutBtn = document.getElementById('checkout-button');
  if (checkoutBtn) {
    checkoutBtn.style.display = 'flex';
  }

  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.imageUrl}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="cart-item-brand">${item.brand}</p>
        <p class="cart-item-price">€${item.price.toLocaleString()}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn minus" onclick="updateCartItemQuantity('${item.id}', ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn plus" onclick="updateCartItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
      </div>
      <div class="cart-item-subtotal">
        <p>€${(item.price * item.quantity).toLocaleString()}</p>
      </div>
      <div class="cart-item-remove">
        <button onclick="removeCartItem('${item.id}')" class="remove-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    cartContainer.appendChild(cartItemElement);
  });

  if (cartTotalElement) {
    cartTotalElement.textContent = `€${calculateCartTotal().toLocaleString()}`;
  }
}

function displayCheckoutSummary() {
  const summaryContainer = document.getElementById('checkout-summary');
  const checkoutTotalElement = document.getElementById('checkout-total');

  if (!summaryContainer || !checkoutTotalElement) return;

  summaryContainer.innerHTML = '';

  if (cart.length === 0) {
    summaryContainer.innerHTML = `
      <div class="empty-cart-message">
        <p>Il tuo carrello è vuoto. Aggiungi prodotti prima di procedere al checkout.</p>
        <a href="../index.html" class="btn btn-secondary">Torna allo Shopping</a>
      </div>
    `;

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.style.display = 'none';
    }

    checkoutTotalElement.textContent = '€0';

    return;
  }

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.style.display = 'block';
  }

  cart.forEach(item => {
    const summaryItem = document.createElement('div');
    summaryItem.className = 'checkout-item';
    summaryItem.innerHTML = `
      <div class="checkout-item-details">
        <div class="checkout-item-image">
          <img src="${item.imageUrl}" alt="${item.name}">
        </div>
        <div>
          <h4>${item.name}</h4>
          <p>Quantità: ${item.quantity}</p>
        </div>
      </div>
      <div class="checkout-item-price">
        €${(item.price * item.quantity).toLocaleString()}
      </div>
    `;

    summaryContainer.appendChild(summaryItem);
  });

  checkoutTotalElement.textContent = `€${calculateCartTotal().toLocaleString()}`;
}

// ======================================================
// CHECKOUT PROCESS
// ======================================================
function processOrder(e) {
  e.preventDefault();

  const form = e.target;

  const nome = form.querySelector('#nome').value;
  const cognome = form.querySelector('#cognome').value;
  const email = form.querySelector('#email').value;
  const telefono = form.querySelector('#telefono').value;
  const indirizzo = form.querySelector('#indirizzo').value;
  const citta = form.querySelector('#citta').value;
  const cap = form.querySelector('#cap').value;

  if (!nome || !cognome || !email || !telefono || !indirizzo || !citta || !cap) {
    alert('Per favore, compila tutti i campi obbligatori.');
    return;
  }

  const orderDetails = {
    customer: {
      nome,
      cognome,
      email,
      telefono,
      indirizzo,
      citta,
      cap
    },
    items: cart,
    total: calculateCartTotal(),
    date: new Date().toISOString(),
    orderNumber: Math.floor(100000 + Math.random() * 900000)
  };

  localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

  cart = [];
  saveCart();
  updateCartIcon();

  window.location.href = 'thank-you.html';
}

// ======================================================
// ORDER CONFIRMATION
// ======================================================
function initThankYouPage() {
  const orderItemsElement = document.getElementById('order-items');
  if (!orderItemsElement) return;

  const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
  if (!lastOrder) {
    window.location.href = '../index.html';
    return;
  }

  const orderNumberElement = document.getElementById('order-number');
  const orderDateElement = document.getElementById('order-date');
  const orderTotalElement = document.getElementById('order-total');
  const customerNameElement = document.getElementById('customer-name');
  const customerEmailElement = document.getElementById('customer-email');

  if (orderNumberElement) {
    orderNumberElement.textContent = lastOrder.orderNumber;
  }

  if (orderDateElement) {
    const orderDate = new Date(lastOrder.date);
    orderDateElement.textContent = orderDate.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (orderItemsElement) {
    if (lastOrder.items.length === 0) {
      orderItemsElement.innerHTML = '<p class="text-center py-3">Nessun articolo nell\'ordine</p>';
    } else {
      lastOrder.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'thank-you-item';
        itemElement.innerHTML = `
          <div class="thank-you-item-info">
            <img src="${item.imageUrl}" alt="${item.name}" class="thank-you-item-image">
            <div>
              <h4>${item.name}</h4>
              <p class="small">${item.brand} • Quantità: ${item.quantity}</p>
            </div>
          </div>
          <div class="thank-you-item-price">€${(item.price * item.quantity).toLocaleString()}</div>
        `;
        orderItemsElement.appendChild(itemElement);
      });
    }
  }

  if (orderTotalElement) {
    orderTotalElement.textContent = `€${lastOrder.total.toLocaleString()}`;
  }

  if (customerNameElement) {
    customerNameElement.textContent = `${lastOrder.customer.nome} ${lastOrder.customer.cognome}`;
  }

  if (customerEmailElement) {
    customerEmailElement.textContent = lastOrder.customer.email;
  }
}
