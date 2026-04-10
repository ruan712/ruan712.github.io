'use strict';

/* =========================
   ESTADO
========================= */
const state = {
  cart: JSON.parse(localStorage.getItem('wjg_cart') || '[]'),
};

/* =========================
   UTIL
========================= */
function saveCart() {
  localStorage.setItem('wjg_cart', JSON.stringify(state.cart));
}

const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* =========================
   HEADER
========================= */
function initHeader() {
  const header = document.getElementById('site-header');
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }
}

/* =========================
   CARRINHO
========================= */
function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;

  const total = state.cart.reduce((s, i) => s + i.qty, 0);
  countEl.textContent = total;
}

function addToCart(name, price) {
  const item = state.cart.find(i => i.name === name);

  if (item) item.qty++;
  else state.cart.push({ name, price, qty: 1 });

  saveCart();
  updateCartUI();
  showToast('Produto adicionado!');
}

/* =========================
   TOAST
========================= */
function showToast(msg) {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;

  const el = document.createElement('div');
  el.className = 'toast-item';
  el.textContent = msg;

  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* =========================
   BUSCA
========================= */
function initSearch() {
  const btn = document.getElementById('search-btn');
  const flyout = document.getElementById('search-flyout');

  if (!btn || !flyout) return;

  btn.addEventListener('click', () => {
    flyout.classList.toggle('open');
  });
}

/* =========================
   PARTÍCULAS (seguro)
========================= */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.arc(Math.random()*W, Math.random()*H, 2, 0, Math.PI*2);
    ctx.fill();
    requestAnimationFrame(draw);
  }

  draw();
}

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initSearch();
  initParticles();
  updateCartUI();

  console.log('WJG carregado');
});
