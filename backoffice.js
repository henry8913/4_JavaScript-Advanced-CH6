// ======================================================
// API CONFIGURATION
// ======================================================
const API_URL = 'https://api-hypercar-hub.onrender.com/cars/';

// ======================================================
// INITIALIZATION
// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  const updateButton = document.createElement('button');
  updateButton.id = 'updateProductButton';
  updateButton.type = 'button';
  updateButton.className = 'btn btn-primary me-2';
  updateButton.textContent = 'Aggiorna Prodotto';
  updateButton.disabled = true;
  updateButton.style.display = 'inline-block';

  const submitButton = document.querySelector('#productForm button[type="submit"]');

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'd-flex flex-wrap gap-2 mt-3 flex-column flex-md-row';

  submitButton.className = submitButton.className + ' w-100';
  updateButton.className = updateButton.className + ' w-100';

  submitButton.parentNode.insertBefore(buttonContainer, submitButton);
  buttonContainer.appendChild(submitButton);
  buttonContainer.appendChild(updateButton);

  updateButton.onclick = () => {
    showErrorModal('Nessun prodotto selezionato', 'Seleziona prima un prodotto da aggiornare cliccando su "Modifica".');
  };
});

// ======================================================
// CREATE PRODUCT
// ======================================================
document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productData = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    brand: document.getElementById('brand').value,
    imageUrl: document.getElementById('imageUrl').value,
    price: parseFloat(document.getElementById('price').value)
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (response.ok) {
      showSuccessModal('Prodotto aggiunto', 'Il prodotto è stato aggiunto con successo!');
      document.getElementById('productForm').reset();
      loadProducts();
    } else {
      const error = await response.json();
      showErrorModal('Errore', `${error.message || 'Si è verificato un errore durante l\'aggiunta del prodotto.'}`);
    }
  } catch (error) {
    showErrorModal('Errore', 'Errore durante l\'aggiunta del prodotto: ' + error.message);
  }
});

// ======================================================
// READ PRODUCTS
// ======================================================
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    showErrorModal('Errore', 'Errore durante il caricamento dei prodotti');
  }
}

function displayProducts(products) {
  const tbody = document.getElementById('productsTableBody');
  tbody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('div');
    row.className = 'product-item';
    row.innerHTML = `
      <div class="product-detail"><span class="label d-md-none">Nome:</span> ${product.name}</div>
      <div class="product-detail"><span class="label d-md-none">Marca:</span> ${product.brand}</div>
      <div class="product-detail"><span class="label d-md-none">Prezzo:</span> €${product.price.toLocaleString()}</div>
      <div class="product-detail"><span class="label d-md-none">ID:</span> ${product.id}</div>
      <div class="product-actions">
        <button onclick="editProduct(${product.id})" class="btn btn-sm btn-warning">Modifica</button>
        <button onclick="deleteProduct(${product.id})" class="btn btn-sm btn-danger ms-2">Elimina</button>
      </div>
    `;
    tbody.appendChild(row);
  });
}

// ======================================================
// DELETE PRODUCT
// ======================================================
async function deleteProduct(id) {
  showConfirmModal('Conferma cancellazione', 'Sei sicuro di voler eliminare questo prodotto?', async () => {
    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        showSuccessModal('Prodotto eliminato', 'Il prodotto è stato eliminato con successo!');
        loadProducts();
      } else {
        showErrorModal('Errore', 'Si è verificato un errore durante l\'eliminazione del prodotto.');
      }
    } catch (error) {
      showErrorModal('Errore', 'Errore durante l\'eliminazione del prodotto: ' + error.message);
    }
  });
}

// ======================================================
// UPDATE PRODUCT
// ======================================================
async function editProduct(id) {
  try {
    const response = await fetch(`${API_URL}${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const product = await response.json();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('brand').value = product.brand;
    document.getElementById('imageUrl').value = product.imageUrl;
    document.getElementById('price').value = product.price;

    let updateButton = document.getElementById('updateProductButton');

    if (!updateButton) {
      updateButton = document.createElement('button');
      updateButton.id = 'updateProductButton';
      updateButton.type = 'button';
      updateButton.className = 'btn btn-warning me-2';
      updateButton.textContent = 'Aggiorna Prodotto';

      const submitButton = document.querySelector('#productForm button[type="submit"]');
      submitButton.parentNode.insertBefore(updateButton, submitButton);
    }

    document.querySelector('#productForm button[type="submit"]').textContent = 'Aggiungi Prodotto';

    updateButton.disabled = false;
    updateButton.onclick = async () => {
      const updatedData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        brand: document.getElementById('brand').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: parseFloat(document.getElementById('price').value)
      };

      try {
        const response = await fetch(`${API_URL}${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });

        if (response.ok) {
          showSuccessModal('Prodotto aggiornato', 'Il prodotto è stato aggiornato con successo!');
          document.getElementById('productForm').reset();
          updateButton.disabled = true;
          updateButton.onclick = () => {
            showErrorModal('Nessun prodotto selezionato', 'Seleziona prima un prodotto da aggiornare cliccando su "Modifica".');
          };
          loadProducts();
        } else {
          const errorData = await response.json();
          showErrorModal('Errore', `Si è verificato un errore durante l'aggiornamento del prodotto: ${errorData.message || 'Errore sconosciuto'}`);
          return;
        }
      } catch (error) {
        showErrorModal('Errore', 'Errore durante l\'aggiornamento del prodotto: ' + error.message);
      }
    };

    const form = document.getElementById('productForm');
    form.onsubmit = async (e) => {
      e.preventDefault();

      if (updateButton.style.display === 'inline-block') {
        return;
      }

      const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        brand: document.getElementById('brand').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: parseFloat(document.getElementById('price').value)
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(productData)
        });

        if (response.ok) {
          showSuccessModal('Prodotto aggiunto', 'Il prodotto è stato aggiunto con successo!');
          document.getElementById('productForm').reset();
          loadProducts();
        } else {
          const error = await response.json();
          showErrorModal('Errore', `${error.message || 'Si è verificato un errore durante l\'aggiunta del prodotto.'}`);
        }
      } catch (error) {
        showErrorModal('Errore', 'Errore durante l\'aggiunta del prodotto: ' + error.message);
      }
    };
  } catch (error) {
    showErrorModal('Errore', 'Errore durante il caricamento dei dettagli del prodotto: ' + error.message);
  }
}

// ======================================================
// UI MODALS AND HELPERS
// ======================================================
function showSuccessModal(title, message) {
  const modalId = 'successModal';
  createModal(modalId, title, message, 'success');
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}

function showErrorModal(title, message) {
  const modalId = 'errorModal';
  createModal(modalId, title, message, 'danger');
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}

function showConfirmModal(title, message, confirmCallback) {
  const modalId = 'confirmModal';

  const existingModal = document.getElementById(modalId);
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = modalId;
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', `${modalId}Label`);
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="${modalId}Label">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Chiudi"></button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
          <button type="button" class="btn btn-danger" id="confirmBtn">Conferma</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const bsModal = new bootstrap.Modal(document.getElementById(modalId));
  bsModal.show();

  document.getElementById('confirmBtn').addEventListener('click', () => {
    bsModal.hide();
    if (confirmCallback) confirmCallback();
  });

  document.getElementById(modalId).addEventListener('hidden.bs.modal', function () {
    document.getElementById(modalId).remove();
  });
}

function createModal(id, title, message, type = 'primary') {
  const existingModal = document.getElementById(id);
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = id;
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', `${id}Label`);
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="${id}Label">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Chiudi"></button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-${type}" data-bs-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById(id).addEventListener('hidden.bs.modal', function () {
    document.getElementById(id).remove();
  });
}