'use strict';

/* ══════════════════════════════════════════
1. DADOS DOS PRODUTOS
══════════════════════════════════════════ */

const PRODUCTS = [
  {
    id: 1,
    name: 'Flamengo',
    subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times',
    liga: 'Brasileirão',
    price: 299.90,
    oldPrice: 349.90,
    badges: ['hot'],
    rating: 4.9,
    reviews: 312,
    featured: true,
    stock: 5,
    desc: 'Camisa oficial do Clube de Regatas do Flamengo...',
    imgLabel: 'Camisa Flamengo 2024',
  },
];

/* ══════════════════════════════════════════
2. ESTADO
══════════════════════════════════════════ */

const state = {
  cart: JSON.parse(localStorage.getItem('wjg_cart') || '[]'),
  currentPage: 'home',
  selectedProduct: null,
  detailSize: null,
  detailGender: 'Masculino',
  detailQty: 1,
};

function saveCart() {
  localStorage.setItem('wjg_cart', JSON.stringify(state.cart));
}

/* ══════════════════════════════════════════
3. UTILITÁRIOS
══════════════════════════════════════════ */

const fmt = (v) =>
  v.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

function pctDiscount(price, old) {
  if (!old) return null;
  return Math.round(((old - price) / old) * 100);
}

function buildPlaceholder(label) {
  return `
    <div class="product-img-placeholder">
      <span>${label}</span>
    </div>
  `;
}

/* ══════════════════════════════════════════
8. RENDERIZAÇÃO DE CARDS
══════════════════════════════════════════ */

function createCard(p) {
  const disc = pctDiscount(p.price, p.oldPrice);

  return `
    <div class="product-card" onclick="openProduct(${p.id})">
      
      <div class="product-card-img">
        ${buildPlaceholder(p.imgLabel)}
      </div>

      <div class="product-card-body">
        <div class="pcard-name">${p.name}</div>

        <div class="pcard-pricing">
          <span>${fmt(p.price)}</span>
          ${
            p.oldPrice
              ? `<span class="old">${fmt(p.oldPrice)}</span>`
              : ''
          }
          ${disc ? `<span>-${disc}%</span>` : ''}
        </div>

        <button onclick="event.stopPropagation(); quickAdd(${p.id})">
          Adicionar
        </button>
      </div>

    </div>
  `;
}

/* ══════════════════════════════════════════
CARRINHO
══════════════════════════════════════════ */

function addToCart(p, size, gender) {
  const key = `${p.id}_${size}_${gender}`;

  const existing = state.cart.find((i) => i.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      key,
      id: p.id,
      name: p.name,
      price: p.price,
      size,
      gender,
      qty: 1,
    });
  }

  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const total = state.cart.reduce((s, i) => s + i.qty, 0);

  const el = document.getElementById('cart-count');
  if (el) el.textContent = total;
}

/* ══════════════════════════════════════════
INIT
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  console.log(`WJG Loaded — ${PRODUCTS.length} produtos`);
});
