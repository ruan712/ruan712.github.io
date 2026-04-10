'use strict';

/* =========================
   PRODUTOS (mantido igual)
========================= */
const PRODUCTS = [
  {
    id: 1,
    name: 'Flamengo',
    category: 'times',
    price: 299.90,
    imgLabel: 'Camisa Flamengo',
    stock: 5,
    badges: ['hot']
  },
  {
    id: 2,
    name: 'Brasil',
    category: 'selecoes',
    price: 349.90,
    imgLabel: 'Camisa Brasil',
    stock: 8,
    badges: ['promo']
  }
];

/* =========================
   ESTADO
========================= */
const state = {
  cart: JSON.parse(localStorage.getItem('wjg_cart') || '[]'),
  currentPage: 'home'
};

function saveCart() {
  localStorage.setItem('wjg_cart', JSON.stringify(state.cart));
}

/* =========================
   UTIL
========================= */
const fmt = (v) => v.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

/* =========================
   NAVEGAÇÃO
========================= */
window.showPage = function(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const el = document.getElementById('page-' + pageId);
  if (!el) return;

  el.classList.add('active');
  state.currentPage = pageId;
};

/* =========================
   PRODUTOS
========================= */
function createCard(p) {
  return `
    <div class="product-card">
      <div>${p.name}</div>
      <div>${fmt(p.price)}</div>
      <button onclick="quickAdd(${p.id})">Comprar</button>
    </div>
  `;
}

function renderHome() {
  const el = document.getElementById('home-grid');
  if (!el) return;

  el.innerHTML = PRODUCTS.map(createCard).join('');
}

/* =========================
   CARRINHO
========================= */
window.quickAdd = function(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const item = state.cart.find(i => i.id === id);

  if (item) item.qty++;
  else state.cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });

  saveCart();
  updateCartUI();
  showToast('Adicionado ao carrinho');
};

function updateCartUI() {
  const el = document.getElementById('cart-count');
  if (!el) return;

  const total = state.cart.reduce((s, i) => s + i.qty, 0);
  el.textContent = total;
}

/* =========================
   SEARCH
========================= */
function initSearch() {
  const btn = document.getElementById('search-btn');
  const box = document.getElementById('search-flyout');

  if (!btn || !box) return;

  btn.addEventListener('click', () => {
    box.classList.toggle('open');
  });
}

/* =========================
   TOAST
========================= */
window.showToast = function(msg) {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;

  const el = document.createElement('div');
  el.className = 'toast-item';
  el.textContent = msg;

  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3000);
};

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  updateCartUI();
  initSearch();
  showPage('home');

  console.log('WJG restaurado com sucesso');
});
