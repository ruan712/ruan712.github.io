let PRODUCTS = [];
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  // busca
  const search = document.getElementById('search');
  search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q)
    );
    renderProducts(filtered);
  });

  // carrinho toggle
  document.getElementById('cart').addEventListener('click', toggleCart);
});

async function loadProducts() {
  try {
    const res = await fetch('data/products.json');
    PRODUCTS = await res.json();
    renderProducts(PRODUCTS);
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
  }
}

function renderProducts(list) {
  const el = document.getElementById('products');

  el.innerHTML = list.map(p => `
    <div class="card">
      <img src="${p.image}" />
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="price">R$ ${p.price}</p>
        <button onclick="addToCart(${p.id})">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  cart.push(product);

  document.getElementById('cart-count').innerText = cart.length;
  renderCart();
}

function renderCart() {
  const el = document.getElementById('cart-items');

  el.innerHTML = cart.map(item => `
    <div>
      ${item.name} - R$ ${item.price}
    </div>
  `).join('');
}

function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('open');
}
