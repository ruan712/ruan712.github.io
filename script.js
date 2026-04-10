/**
 * WJG — SCRIPT.JS
 * Módulos:
 *  1. Dados dos produtos
 *  2. Estado da aplicação
 *  3. Utilitários
 *  4. Cursor personalizado
 *  5. Partículas de fundo
 *  6. Header (scroll + hamburger)
 *  7. Navegação SPA
 *  8. Renderização de produtos (cards)
 *  9. Home — grids iniciais
 * 10. Páginas de categoria (filtros + sort)
 * 11. Promoções + countdown
 * 12. Detalhe do produto
 * 13. Carrinho (adicionar, remover, qtd, total)
 * 14. Busca em tempo real
 * 15. Toast / feedback visual
 * 16. Formulário de contato
 * 17. Init
 */
 
'use strict';
 
/* ══════════════════════════════════════════
   1. DADOS DOS PRODUTOS
   ══════════════════════════════════════════ */
const PRODUCTS = [
  // ── TIMES BRASILEIROS ──
  {
    id: 1, name: 'Flamengo', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'Brasileirão',
    price: 299.90, oldPrice: 349.90,
    badges: ['hot'], rating: 4.9, reviews: 312, featured: true, stock: 5,
    desc: 'Camisa oficial do Clube de Regatas do Flamengo para a temporada 2024/25. Tecido DryCool com tecnologia de ventilação aprimorada. Estamparia sublimada de alta durabilidade. Produto licenciado com patch oficial do Brasileirão.',
    imgLabel: 'Camisa Flamengo 2024',
    /* [SUBSTITUIR IMAGEM] src="flamengo-2024.jpg" */
  },
  {
    id: 2, name: 'Corinthians', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'Brasileirão',
    price: 289.90, oldPrice: null,
    badges: ['new'], rating: 4.8, reviews: 254, featured: true, stock: 12,
    desc: 'Camisa do Sport Club Corinthians Paulista para a nova temporada. Listras icônicas em tecido premium. Tecnologia de absorção de suor. 100% produto oficial.',
    imgLabel: 'Camisa Corinthians 2024',
  },
  {
    id: 3, name: 'Palmeiras', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'Brasileirão',
    price: 279.90, oldPrice: 319.90,
    badges: ['promo'], rating: 4.7, reviews: 198, featured: true, stock: 8,
    desc: 'Camisa oficial da Sociedade Esportiva Palmeiras. Design verde e dourado com detalhes exclusivos da nova temporada. Tecido leve e respirável.',
    imgLabel: 'Camisa Palmeiras 2024',
  },
  {
    id: 4, name: 'São Paulo FC', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'Brasileirão',
    price: 269.90, oldPrice: 299.90,
    badges: ['promo'], rating: 4.6, reviews: 176, featured: false, stock: 3,
    desc: 'Camisa tricolor do São Paulo Futebol Clube. Três listras tradicionais em corte moderno. Material de alta performance para campo e arquibancada.',
    imgLabel: 'Camisa São Paulo FC 2024',
  },
  {
    id: 5, name: 'FC Barcelona', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'La Liga',
    price: 389.90, oldPrice: 449.90,
    badges: ['hot'], rating: 4.9, reviews: 421, featured: true, stock: 9,
    desc: 'Camisa oficial do Futbol Club Barcelona. Listras verticais grená e azul-royal com patch da La Liga. Tecido Dri-FIT ADV com 96% de poliéster reciclado.',
    imgLabel: 'Camisa FC Barcelona 2024',
  },
  {
    id: 6, name: 'Real Madrid', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'La Liga',
    price: 379.90, oldPrice: null,
    badges: ['new'], rating: 4.8, reviews: 389, featured: true, stock: 14,
    desc: 'Camisa do Real Madrid Club de Fútbol. Branco imaculado com detalhes dourados. Tecnologia de absorção rápida. Patch da La Liga e Champions League.',
    imgLabel: 'Camisa Real Madrid 2024',
  },
  {
    id: 7, name: 'Manchester United', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'Premier League',
    price: 369.90, oldPrice: 419.90,
    badges: ['promo'], rating: 4.7, reviews: 308, featured: false, stock: 2,
    desc: 'Camisa do Manchester United FC. Vermelho vibrante tradicional dos Red Devils. Produzida pela Adidas com tecnologia HEAT.RDY.',
    imgLabel: 'Camisa Manchester United 2024',
  },
  {
    id: 8, name: 'Liverpool FC', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'Premier League',
    price: 359.90, oldPrice: 399.90,
    badges: ['promo'], rating: 4.8, reviews: 334, featured: false, stock: 6,
    desc: 'Camisa do Liverpool Football Club. Vermelho clássico de Anfield com detalhes brancos. Produzida pela Nike com Dri-FIT ADV.',
    imgLabel: 'Camisa Liverpool FC 2024',
  },
  {
    id: 9, name: 'PSG', subtitle: 'Camisa Oficial 2024/25 — Titular',
    category: 'times', liga: 'Ligue 1',
    price: 369.90, oldPrice: 429.90,
    badges: ['hot', 'promo'], rating: 4.7, reviews: 292, featured: false, stock: 4,
    desc: 'Camisa do Paris Saint-Germain FC. Design icônico azul com detalhes vermelhos e dourados. Edição especial com logotipo em relevo dourado.',
    imgLabel: 'Camisa PSG 2024',
  },
 
  // ── SELEÇÕES ──
  {
    id: 10, name: 'Brasil', subtitle: 'Seleção Canarinho 2024 — Titular',
    category: 'selecoes', liga: null,
    price: 349.90, oldPrice: 449.90,
    badges: ['hot', 'promo'], rating: 5.0, reviews: 612, featured: true, stock: 8,
    desc: 'A camisa mais amada do futebol mundial. Amarela, verde e azul do Escrete Canarinho. Patch bordado da CBF. Tecnologia Nike Dri-FIT ADV. Edição especial comemorativa.',
    imgLabel: 'Camisa Seleção Brasil 2024',
  },
  {
    id: 11, name: 'Argentina', subtitle: 'Albiceleste 2024 — Titular',
    category: 'selecoes', liga: null,
    price: 329.90, oldPrice: 399.90,
    badges: ['promo'], rating: 4.9, reviews: 489, featured: true, stock: 10,
    desc: 'Camisa da Selección Argentina, bicampeã mundial. Listras celeste e branco eternizadas por Messi. Patch AFA bordado. Produto oficial Adidas.',
    imgLabel: 'Camisa Seleção Argentina 2024',
  },
  {
    id: 12, name: 'França', subtitle: 'Les Bleus 2024 — Titular',
    category: 'selecoes', liga: null,
    price: 319.90, oldPrice: 369.90,
    badges: ['promo'], rating: 4.8, reviews: 367, featured: false, stock: 5,
    desc: 'Camisa da Équipe de France. Azul, branco e vermelho dos campeões mundiais. Tecido Nike Dri-FIT Stadium.',
    imgLabel: 'Camisa Seleção França 2024',
  },
  {
    id: 13, name: 'Portugal', subtitle: 'Seleção das Quinas 2024',
    category: 'selecoes', liga: null,
    price: 329.90, oldPrice: 379.90,
    badges: ['hot'], rating: 4.8, reviews: 354, featured: true, stock: 7,
    desc: 'Camisa de Portugal, a Seleção das Quinas. Vermelho vibrante com escudo bordado em alta resolução. Tecido Nike Dri-FIT.',
    imgLabel: 'Camisa Seleção Portugal 2024',
  },
  {
    id: 14, name: 'Espanha', subtitle: 'La Roja 2024 — Titular',
    category: 'selecoes', liga: null,
    price: 309.90, oldPrice: null,
    badges: ['new'], rating: 4.7, reviews: 298, featured: false, stock: 12,
    desc: 'Camisa da Selección Española. Vermelho intenso com detalhes dourados reais. Produto Adidas oficial.',
    imgLabel: 'Camisa Seleção Espanha 2024',
  },
  {
    id: 15, name: 'Itália', subtitle: 'Gli Azzurri 2024 — Titular',
    category: 'selecoes', liga: null,
    price: 309.90, oldPrice: 349.90,
    badges: ['outlet'], rating: 4.7, reviews: 267, featured: false, stock: 2,
    desc: 'Camisa da Nazionale Italiana. Azul profundo azzurro com detalhes brancos. Simboliza a rica história do futebol italiano. Produto Puma oficial.',
    imgLabel: 'Camisa Seleção Itália 2024',
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
const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
 
function pctDiscount(price, old) {
  if (!old) return null;
  return Math.round(((old - price) / old) * 100);
}
 
function buildPlaceholder(label) {
  /*
   * Gera HTML de placeholder de imagem.
   * [SUBSTITUIR] Troque o retorno deste bloco por <img src="..." alt="..." />
   * quando tiver as imagens reais dos produtos.
   */
  return `
    <div class="product-img-placeholder" title="[SUBSTITUIR IMAGEM] ${label}">
      <div class="ph-inner">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="m21 15-5-5L5 21"/>
        </svg>
        <span>${label}</span>
      </div>
    </div>`;
}
 
/* ══════════════════════════════════════════
   4. CURSOR PERSONALIZADO
   ══════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  if (!cursor || window.innerWidth < 768) return;
 
  let tx = 0, ty = 0, cx = 0, cy = 0;
 
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    cursor.style.left = tx + 'px';
    cursor.style.top  = ty + 'px';
  });
 
  function animTrail() {
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    trail.style.left = cx + 'px';
    trail.style.top  = cy + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();
 
  document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(0.7)');
  document.addEventListener('mouseup',   () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
}
 
/* ══════════════════════════════════════════
   5. PARTÍCULAS DE FUNDO
   ══════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
 
  let W, H, particles = [];
 
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
 
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.5 + 0.2);
      this.alpha = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.5 ? '#FF2200' : '#FF7700';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.001;
      if (this.y < -10 || this.alpha <= 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
 
  resize();
  window.addEventListener('resize', resize);
 
  for (let i = 0; i < 80; i++) particles.push(new Particle());
 
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}
 
/* ══════════════════════════════════════════
   6. HEADER
   ══════════════════════════════════════════ */
function initHeader() {
  const header = document.getElementById('site-header');
  const burger = document.getElementById('hamburger');
  const nav    = document.getElementById('main-nav');
 
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
 
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
 
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && !e.target.closest('#hamburger')) {
      burger.classList.remove('open');
      nav.classList.remove('open');
    }
  });
}
 
/* ══════════════════════════════════════════
   7. NAVEGAÇÃO SPA
   ══════════════════════════════════════════ */
window.showPage = function(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + pageId);
  if (!el) return;
  el.classList.add('active');
  state.currentPage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
 
  // Fechar nav mobile
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('main-nav').classList.remove('open');
 
  if (pageId === 'times')     renderCategory('times');
  if (pageId === 'selecoes')  renderCategory('selecoes');
  if (pageId === 'promocoes') renderPromoPage();
};
 
/* ══════════════════════════════════════════
   8. RENDERIZAÇÃO DE CARDS
   ══════════════════════════════════════════ */
function createCard(p) {
  const disc = pctDiscount(p.price, p.oldPrice);
  const inst = (p.price / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
 
  const badgeMap = {
    promo:  ['cbadge--fire',   'Promoção'],
    new:    ['cbadge--new',    'Novidade'],
    hot:    ['cbadge--hot',    '🔥 Top Vendas'],
    outlet: ['cbadge--outlet', 'Outlet'],
  };
  const badgesHTML = p.badges.map(b => {
    const [cls, lbl] = badgeMap[b] || [];
    return cls ? `<span class="cbadge ${cls}">${lbl}</span>` : '';
  }).join('');
 
  const urgency = p.stock <= 5
    ? `<div class="pcard-urgency">⚠️ Restam apenas ${p.stock} unidades!</div>`
    : '';
 
  return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="product-card-img">
        ${buildPlaceholder(p.imgLabel)}
        <div class="card-badges">${badgesHTML}</div>
        <button class="card-wish" onclick="event.stopPropagation();showToast('❤️ Adicionado aos favoritos!')">♡</button>
      </div>
      <div class="product-card-body">
        <div class="pcard-cat">${p.category === 'times' ? (p.liga || 'Times') : 'Seleção Nacional'}</div>
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-pricing">
          <span class="pcard-price">${fmt(p.price)}</span>
          ${p.oldPrice ? `<span class="pcard-old">${fmt(p.oldPrice)}</span>` : ''}
          ${disc ? `<span class="pcard-pct">-${disc}%</span>` : ''}
        </div>
        <div class="pcard-installments">ou <span>10x R$ ${inst}</span> sem juros</div>
        ${urgency}
        <button class="btn-card-buy" onclick="event.stopPropagation();quickAdd(${p.id})">
          + Adicionar ao Carrinho
        </button>
      </div>
    </div>`;
}
 
/* ══════════════════════════════════════════
   9. HOME GRIDS
   ══════════════════════════════════════════ */
function renderHomeGrids() {
  const featured = (cat) => PRODUCTS.filter(p => p.category === cat && p.featured).slice(0, 4);
  const promos   = PRODUCTS.filter(p => p.badges.includes('promo')).slice(0, 4);
 
  document.getElementById('home-grid-times').innerHTML    = featured('times').map(createCard).join('');
  document.getElementById('home-grid-selecoes').innerHTML = featured('selecoes').map(createCard).join('');
  document.getElementById('home-grid-promos').innerHTML   = promos.map(createCard).join('');
}
 
/* ══════════════════════════════════════════
   10. PÁGINAS DE CATEGORIA
   ══════════════════════════════════════════ */
window.renderCategory = function(cat) {
  const sortEl  = document.getElementById(`${cat}-sort`);
  const sortVal = sortEl ? sortEl.value : '';
  const priceEl = document.querySelector(`input[name="${cat === 'times' ? 'tp' : 'sp'}"]:checked`);
  const priceV  = priceEl ? priceEl.value : '';
 
  let items = PRODUCTS.filter(p => p.category === cat);
 
  // filtro de preço
  if (priceV) {
    const [mn, mx] = priceV.split('-').map(Number);
    items = items.filter(p => p.price >= mn && p.price <= mx);
  }
 
  // filtro de liga (times)
  if (cat === 'times') {
    const checked = [...document.querySelectorAll('.liga-cb:checked')].map(el => el.value);
    if (checked.length) items = items.filter(p => checked.includes(p.liga));
  }
 
  // ordenação
  if (sortVal === 'price-asc')  items.sort((a, b) => a.price - b.price);
  if (sortVal === 'price-desc') items.sort((a, b) => b.price - a.price);
  if (sortVal === 'name')       items.sort((a, b) => a.name.localeCompare(b.name));
 
  const grid = document.getElementById(`cat-grid-${cat}`);
  if (!grid) return;
  grid.innerHTML = items.length
    ? items.map(createCard).join('')
    : `<p style="color:var(--gray-3);padding:20px;">Nenhum produto encontrado para esses filtros.</p>`;
};
 
function buildLigaFilters() {
  const ligas = [...new Set(PRODUCTS.filter(p => p.liga).map(p => p.liga))];
  const el = document.getElementById('liga-filter-group');
  if (!el) return;
  el.innerHTML = ligas.map(l => `
    <label>
      <input type="checkbox" class="liga-cb" value="${l}" onchange="renderCategory('times')" />
      ${l}
    </label>`).join('');
}
 
/* ══════════════════════════════════════════
   11. PROMOÇÕES + COUNTDOWN
   ══════════════════════════════════════════ */
function renderPromoPage() {
  const promos = PRODUCTS.filter(p => p.badges.some(b => ['promo', 'hot', 'outlet'].includes(b)));
  const grid = document.getElementById('promo-grid');
  if (grid) grid.innerHTML = promos.map(createCard).join('');
}
 
function initCountdown() {
  let secs = 8 * 3600 + 45 * 60;
  function tick() {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const hEl = document.getElementById('cd-h');
    const mEl = document.getElementById('cd-m');
    const sEl = document.getElementById('cd-s');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
    if (secs > 0) secs--;
  }
  tick();
  setInterval(tick, 1000);
}
 
/* ══════════════════════════════════════════
   12. DETALHE DO PRODUTO
   ══════════════════════════════════════════ */
window.openProduct = function(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  state.selectedProduct = p;
  state.detailSize   = null;
  state.detailGender = 'Masculino';
  state.detailQty    = 1;
 
  const disc = pctDiscount(p.price, p.oldPrice);
  const inst = (p.price / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const pix  = fmt(p.price * 0.95);
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 ? '☆' : '');
 
  const html = `
    <div class="product-detail-layout">
      <!-- GALERIA -->
      <div class="detail-gallery">
        <div class="detail-main-img" id="detail-main-img">
          <!--
            ╔══════════════════════════════════════════════════════╗
            ║  [SUBSTITUIR] IMAGEM PRINCIPAL — PRODUTO DETALHE     ║
            ║  Remova o placeholder abaixo e adicione:             ║
            ║  <img src="${p.imgLabel.toLowerCase().replace(/ /g,'-')}.jpg"  ║
            ║       alt="${p.name}"                                ║
            ║       style="width:100%;height:100%;object-fit:cover"/>  ║
            ╚══════════════════════════════════════════════════════╝
          -->
          ${buildPlaceholder(p.imgLabel + ' — Vista Frontal')}
        </div>
        <div class="detail-thumbs">
          <div class="dthumb active" onclick="switchThumb(this,'frontal')">
            ${buildPlaceholder('Frontal')}
          </div>
          <div class="dthumb" onclick="switchThumb(this,'costas')">
            ${buildPlaceholder('Costas')}
          </div>
          <div class="dthumb" onclick="switchThumb(this,'detalhe')">
            ${buildPlaceholder('Detalhe')}
          </div>
        </div>
      </div>
 
      <!-- INFO -->
      <div class="detail-info">
        <div class="detail-breadcrumb">
          <a href="#" onclick="showPage('home');return false">Início</a> /
          <a href="#" onclick="showPage('${p.category}');return false">${p.category === 'times' ? 'Times' : 'Seleções'}</a> /
          ${p.name}
        </div>
 
        <h1 class="detail-name">${p.name}</h1>
        <p class="detail-subtitle">${p.subtitle}</p>
 
        <div class="detail-rating">
          <span class="stars">${stars}</span>
          <strong>${p.rating}</strong>
          <span>(${p.reviews} avaliações)</span>
        </div>
 
        <div class="detail-pricing">
          ${p.oldPrice ? `<span class="dp-old">De ${fmt(p.oldPrice)}</span>` : ''}
          <div class="dp-main">
            ${fmt(p.price)}
            ${disc ? `<span class="dp-disc">-${disc}%</span>` : ''}
          </div>
          <p class="dp-install">ou 10x de R$ ${inst} sem juros no cartão</p>
          <p class="dp-pix">⚡ PIX com 5% OFF: ${pix}</p>
        </div>
 
        <!-- TAMANHO -->
        <div class="detail-options">
          <span class="option-label">Tamanho <strong id="sz-selected">—</strong></span>
          <div class="size-btns">
            ${['PP','P','M','G','GG','XGG'].map(s => `<button class="sz-btn" onclick="selectSize(this,'${s}')">${s}</button>`).join('')}
          </div>
 
          <!-- GÊNERO -->
          <span class="option-label" style="margin-top:0">Gênero <strong id="gd-selected">Masculino</strong></span>
          <div class="gender-btns">
            ${['Masculino','Feminino'].map((g,i) => `<button class="gd-btn ${i===0?'active':''}" onclick="selectGender(this,'${g}')">${g}</button>`).join('')}
          </div>
 
          <!-- QUANTIDADE -->
          <span class="option-label" style="margin-top:4px">Quantidade</span>
          <div class="qty-selector">
            <button class="qty-btn" onclick="detailQtyChange(-1)">−</button>
            <span class="qty-num" id="detail-qty-num">1</span>
            <button class="qty-btn" onclick="detailQtyChange(+1)">+</button>
          </div>
        </div>
 
        <div class="detail-ctas">
          <button class="btn-fire" onclick="addDetailToCart()">
            <span>Adicionar ao Carrinho</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
          <button class="btn-wish-detail" onclick="showToast('❤️ Adicionado aos favoritos!')">♡</button>
        </div>
 
        <div class="detail-perks">
          <div class="dperk"><span>🚚</span><span>Frete grátis em compras acima de R$299</span></div>
          <div class="dperk"><span>🔄</span><span>30 dias para troca sem custo adicional</span></div>
          <div class="dperk"><span>🏅</span><span>Produto 100% original e licenciado</span></div>
          <div class="dperk"><span>🔒</span><span>Compra segura com SSL e antifraude</span></div>
        </div>
 
        <div class="detail-desc">
          <h3>Descrição</h3>
          <p>${p.desc}</p>
          <p>Composição: 100% Poliéster reciclado. Lavagem: máquina fria. Não usar alvejante. Produto importado com nota fiscal.</p>
        </div>
      </div>
    </div>`;
 
  document.getElementById('product-detail-root').innerHTML = html;
  showPage('product');
};
 
window.switchThumb = function(el, view) {
  document.querySelectorAll('.dthumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  // Aqui você trocaria a imagem principal ao integrar imagens reais
};
 
window.selectSize = function(el, sz) {
  document.querySelectorAll('.sz-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  state.detailSize = sz;
  const lbl = document.getElementById('sz-selected');
  if (lbl) lbl.textContent = sz;
};
 
window.selectGender = function(el, g) {
  document.querySelectorAll('.gd-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  state.detailGender = g;
  const lbl = document.getElementById('gd-selected');
  if (lbl) lbl.textContent = g;
};
 
window.detailQtyChange = function(delta) {
  state.detailQty = Math.max(1, state.detailQty + delta);
  const el = document.getElementById('detail-qty-num');
  if (el) el.textContent = state.detailQty;
};
 
window.addDetailToCart = function() {
  if (!state.detailSize) {
    showToast('⚠️ Selecione um tamanho!');
    return;
  }
  const p = state.selectedProduct;
  for (let i = 0; i < state.detailQty; i++) {
    addToCart(p, state.detailSize, state.detailGender);
  }
};
 
/* ══════════════════════════════════════════
   13. CARRINHO
   ══════════════════════════════════════════ */
window.quickAdd = function(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (p) addToCart(p, 'M', 'Masculino');
};
 
function addToCart(p, size, gender) {
  const key = `${p.id}_${size}_${gender}`;
  const ex  = state.cart.find(i => i.key === key);
  if (ex) {
    ex.qty += 1;
  } else {
    state.cart.push({ key, id: p.id, name: p.name, price: p.price, size, gender, qty: 1, imgLabel: p.imgLabel });
  }
  saveCart();
  updateCartUI();
  showToast(`✅ ${p.name} (${size}/${gender}) adicionado!`);
 
  // animação badge
  const badge = document.getElementById('cart-count');
  badge.classList.remove('pop');
  void badge.offsetWidth;
  badge.classList.add('pop');
}
 
window.removeFromCart = function(key) {
  state.cart = state.cart.filter(i => i.key !== key);
  saveCart();
  updateCartUI();
};
 
window.changeCartQty = function(key, delta) {
  const item = state.cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
};
 
function updateCartUI() {
  const total = state.cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = total;
 
  const items  = document.getElementById('cart-panel-items');
  const footer = document.getElementById('cart-panel-footer');
 
  if (state.cart.length === 0) {
    items.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛒</div>
        <p>Seu carrinho está vazio</p>
        <small>Adicione produtos para continuar</small>
      </div>`;
    footer.style.display = 'none';
    return;
  }
 
  footer.style.display = 'block';
  items.innerHTML = state.cart.map(item => `
    <div class="cart-item-card">
      <div class="cart-item-thumb">
        ${buildPlaceholder(item.imgLabel)}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Tam: ${item.size} · ${item.gender}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="cart-qty-row">
          <button class="qty-btn" onclick="changeCartQty('${item.key}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty('${item.key}',+1)">+</button>
        </div>
      </div>
      <button class="cart-item-rm" onclick="removeFromCart('${item.key}')">✕</button>
    </div>`).join('');
 
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const frete    = subtotal >= 299 ? 0 : 19.90;
  const total2   = subtotal + frete;
  document.getElementById('cart-subtotal').textContent = fmt(subtotal);
  document.getElementById('cart-total').textContent    = fmt(total2);
}
 
// Open / close cart
function openCart() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-backdrop').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-backdrop').classList.remove('show');
  document.body.style.overflow = '';
}
 
/* ══════════════════════════════════════════
   14. BUSCA EM TEMPO REAL
   ══════════════════════════════════════════ */
function initSearch() {
  const btn    = document.getElementById('search-btn');
  const flyout = document.getElementById('search-flyout');
  const input  = document.getElementById('search-input');
  const closeX = document.getElementById('search-x');
  const drop   = document.getElementById('search-results-drop');
 
  btn.addEventListener('click', () => {
    flyout.classList.toggle('open');
    if (flyout.classList.contains('open')) setTimeout(() => input.focus(), 200);
    else { drop.style.display = 'none'; input.value = ''; }
  });
 
  closeX.addEventListener('click', () => {
    flyout.classList.remove('open');
    drop.style.display = 'none';
    input.value = '';
  });
 
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { drop.style.display = 'none'; return; }
    const found = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.liga || '').toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q)
    ).slice(0, 7);
 
    if (!found.length) {
      drop.innerHTML = '<div style="padding:16px;color:var(--gray-3);font-size:14px">Nenhum resultado encontrado.</div>';
    } else {
      drop.innerHTML = found.map(p => `
        <div class="sr-item" onclick="openProduct(${p.id});closeSrch();">
          <div class="sr-thumb">${buildPlaceholder(p.imgLabel)}</div>
          <div class="sr-info">
            <strong>${p.name}</strong>
            <span>${fmt(p.price)}</span>
          </div>
        </div>`).join('');
    }
    drop.style.display = 'block';
  });
 
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container') && !e.target.closest('.search-results-drop')) {
      flyout.classList.remove('open');
      drop.style.display = 'none';
      input.value = '';
    }
  });
}
 
window.closeSrch = function() {
  document.getElementById('search-flyout').classList.remove('open');
  document.getElementById('search-results-drop').style.display = 'none';
  document.getElementById('search-input').value = '';
};
 
/* ══════════════════════════════════════════
   15. TOAST
   ══════════════════════════════════════════ */
window.showToast = function(msg) {
  const wrap = document.getElementById('toast-wrap');
  const el   = document.createElement('div');
  el.className = 'toast-item';
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3200);
};
 
/* ══════════════════════════════════════════
   16. FORMULÁRIO DE CONTATO
   ══════════════════════════════════════════ */
window.submitContact = function(e) {
  e.preventDefault();
  showToast('✅ Mensagem enviada! Retornaremos em breve.');
  e.target.reset();
};
 
/* ══════════════════════════════════════════
   17. INIT
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Sistema visual
  initCursor();
  initParticles();
  initHeader();
 
  // Dados
  renderHomeGrids();
  buildLigaFilters();
  updateCartUI();
 
  // Busca
  initSearch();
 
  // Countdown promos
  initCountdown();
 
  // Eventos do carrinho
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('cart-panel-close').addEventListener('click', closeCart);
  document.getElementById('cart-backdrop').addEventListener('click', closeCart);
 
  // ESC fecha sobreposições
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeCart(); closeSrch(); }
  });
 
  // Página inicial
  showPage('home');
 
  console.log(`%cWJG 🔥 Loaded — ${PRODUCTS.length} produtos`, 'color:#FF7700;font-weight:bold;font-size:14px');
});
