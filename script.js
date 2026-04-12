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
 * 14. Busca em tempo real + Página de resultados
 * 15. Toast / feedback visual
 * 16. Formulário de contato
 * 17. Autenticação e Perfil
 * 18. Init
 */

'use strict';

/* ══════════════════════════════════════════
   1. DADOS DOS PRODUTOS
   ══════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1, name: "Camisa de Time Tottenham Branca", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Premier League", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 124, featured: true, stock: 8,
    desc: "Camisa oficial de jogo do Tottenham Hotspur. Tecido de alta performance com tecnologia de ventilação.",
    imgLabel: "Tottenham Branca", sizes: ["M", "G"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/04/img_8797.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_8797.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_8798.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_8799.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_8800.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_8801.jpeg"
    ]
  },
  {
    id: 2, name: "Camisa de Time Seleção Brasil Verde c/ Patrocínio Peito", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["hot"], rating: 4.9, reviews: 215, featured: true, stock: 5,
    desc: "Edição especial da Seleção Brasileira na cor verde com detalhes de patrocínio no peito.",
    imgLabel: "Brasil Verde Patrocínio", sizes: ["M", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/04/fullsizerender-5-1.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/04/fullsizerender-5-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/fullsizerender-3-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/fullsizerender-4-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/fullsizerender-5.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/fullsizerender-2-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/fullsizerender-1-2.jpeg"
    ]
  },
  {
    id: 3, name: "Camisa de Time Santos Polo Branca Personalizada (Neymar JR)", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["hot"], rating: 5.0, reviews: 342, featured: true, stock: 4,
    desc: "Camisa polo do Santos FC, Edição personalizada Neymar JR. Estilo e Tradição alvinegra.",
    imgLabel: "Santos Polo Neymar", sizes: ["P", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2025/10/img_7994.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_7994.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_7995.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_7996.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_7997.jpeg"
    ]
  },
  {
    id: 4, name: "Camisa de Time Barcelona Listrada", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "La Liga", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["promo"], rating: 4.7, reviews: 89, featured: false, stock: 12,
    desc: "As cores icônicas do Barcelona em um design clássico e confortável.",
    imgLabel: "Barcelona Listrada", sizes: ["M"],
    img: "https://playnodrop.com.br/wp-content/uploads/2025/11/img_7581.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_7581.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_7582.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_7583.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_7584.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_7585.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_7586.jpeg"
    ]
  },
  {
    id: 5, name: "Camisa de Time Cruzeiro Azul 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 56, featured: true, stock: 15,
    desc: "Nova pele do Cruzeiro para a temporada 26/27. Tecnologia e Tradição azul.",
    imgLabel: "Cruzeiro Azul 26/27", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5200.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5200.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5201.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5202.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5203.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5204.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5205.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5206.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/10/img_5210.jpeg"
    ]
  },
  {
    id: 6, name: "Camisa de Time Seleção Espanha Copa 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 42, featured: false, stock: 7,
    desc: "Camisa da Seleção Espanhola para o ciclo da Copa do Mundo 26/27.",
    imgLabel: "Espanha Copa 26/27", sizes: ["G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/img_5049.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_5049.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_5050.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_5051.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_5052.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_5053.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_5054.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_5056.jpeg"
    ]
  },
  {
    id: 7, name: "Camisa de Time Seleção Brasil Lisa Amarela c/ Brilho", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["hot", "promo"], rating: 4.9, reviews: 178, featured: true, stock: 9,
    desc: "A Clássica amarelinha com um toque de brilho exclusivo no tecido.",
    imgLabel: "Brasil Amarela Brilho", sizes: ["M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/04/copy_7687b9ae-b276-4059-9151-a0dcfce88a0d.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/04/copy_7687b9ae-b276-4059-9151-a0dcfce88a0d.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5224.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5225.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5226.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5227.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5228.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5231.jpeg"
    ]
  },
  {
    id: 8, name: "Camisa de Time Seleção Brasil Lisa Preta c/ Brilho", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["promo"], rating: 4.8, reviews: 94, featured: false, stock: 11,
    desc: "Elegância e modernidade na versão preta com brilho da Seleção Brasileira.",
    imgLabel: "Brasil Preta Brilho", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/04/copy_337b9b41-ea8c-48fb-b8a3-698ab2be3574.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/04/copy_337b9b41-ea8c-48fb-b8a3-698ab2be3574.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5042.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5043.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5044.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5045.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5046.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5048.jpeg"
    ]
  },
  {
    id: 9, name: "Camisa de Time Seleção Brasil Lisa Azul c/ Brilho", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 65, featured: false, stock: 6,
    desc: "Versão azul da Seleção com acabamento em brilho premium.",
    imgLabel: "Brasil Azul Brilho", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/04/copy_f86a0de3-b9dc-4348-9f96-27cbcff5a4cd.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/04/copy_f86a0de3-b9dc-4348-9f96-27cbcff5a4cd.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5214.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5215.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5216.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5217.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5218.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5221.jpeg"
    ]
  },
  {
    id: 10, name: "Camisa de Time Seleção Brasil Lisa Verde c/ Brilho", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 52, featured: false, stock: 4,
    desc: "Destaque-se com a camisa verde da Seleção com detalhe em brilho.",
    imgLabel: "Brasil Verde Brilho", sizes: ["M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/04/copy_081184d8-8b0a-41a5-903b-55cb6bd75c2b.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/04/copy_081184d8-8b0a-41a5-903b-55cb6bd75c2b.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5233.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5234.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5235.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5236.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5237.jpeg"
    ]
  },
  {
    id: 11, name: "Camisa de Time Seleção Brasileira Polo Verde c/ Patrocínio Mini", subtitle: "Camisa Polo Oficial",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["outlet"], rating: 4.6, reviews: 31, featured: false, stock: 2,
    desc: "Camisa polo verde da Seleção com logos de patrocinadores em tamanho mini.",
    imgLabel: "Brasil Polo Verde Mini", sizes: ["G"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5026.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5026.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5027.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5028.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5029.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5030.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5031.jpeg"
    ]
  },
  {
    id: 12, name: "Camisa de Time Seleção Brasileira Polo Amarela c/ Patrocínio Mini", subtitle: "Camisa Polo Oficial",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 48, featured: false, stock: 8,
    desc: "Estilo casual com a polo amarela da Seleção e mini patrocínios.",
    imgLabel: "Brasil Polo Amarela Mini", sizes: ["M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5015.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5015.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5016.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5017.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5018.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5019.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/04/img_5020.jpeg"
    ]
  },
  {
    id: 13, name: "Camisa de Time Seleção Brasileira Azul Marinho c/ Símbolo Brilho", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 72, featured: true, stock: 10,
    desc: "Camisa azul marinho sofisticada com o escudo da CBF em relevo brilhante.",
    imgLabel: "Brasil Marinho Brilho", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/03/copy_52c6daef-cdde-4b74-9cab-f329fc1248ec.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/03/copy_52c6daef-cdde-4b74-9cab-f329fc1248ec.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-39.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-40.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-41.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-42.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-43.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-44.jpeg"
    ]
  },
  {
    id: 14, name: "Camisa Seleção Brasileira Copa do Mundo Preta 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["hot"], rating: 4.9, reviews: 156, featured: true, stock: 14,
    desc: "Edição especial Black da Seleção Brasileira no novo ciclo da Copa.",
    imgLabel: "Brasil Preta Copa 26/27", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-12.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-12.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-13.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-16.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-15.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-14.jpeg"
    ]
  },
  {
    id: 15, name: "Lançamento Camisa de Time Vasco Branca 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 34, featured: true, stock: 12,
    desc: "O novo manto sagrado do Vasco. Cruz de Malta em destaque na Clássica branca.",
    imgLabel: "Vasco Branca 26/27", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-5-4.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-5-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-6-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-4-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-3-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-2-5.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-1-5.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-10.jpeg"
    ]
  },
  {
    id: 16, name: "Lançamento Camisa de Time Vasco Preta 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 29, featured: true, stock: 10,
    desc: "A emblemática camisa preta do Vasco em sua versão mais atual.",
    imgLabel: "Vasco Preta 26/27", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-4-3.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-4-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-6-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-5-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-3-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-1-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-2-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/fullsizerender-9.jpeg"
    ]
  },
  {
    id: 17, name: "Camisa de Time Grêmio Polo Azul", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 67, featured: false, stock: 8,
    desc: "Elegância tricolor na camisa polo azul do Grêmio.",
    imgLabel: "Grêmio Polo Azul", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/03/img_1653.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/03/img_1653.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/img_1655.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/img_1656.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/img_1657.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/img_1658.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/img_1660.jpeg"
    ]
  },
  {
    id: 18, name: "Camisa de Time Cruzeiro Polo Azul Treino", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["outlet"], rating: 4.5, reviews: 21, featured: false, stock: 3,
    desc: "Polo de treino oficial do Cruzeiro. Conforto e estilo para o dia a dia.",
    imgLabel: "Cruzeiro Polo Treino", sizes: ["G"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-90.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-90.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-91.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-92.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-93.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-94.jpeg"
    ]
  },
  {
    id: 19, name: "Camisa de Time Seleção Brasileira Copa do Mundo Azul 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.8, reviews: 112, featured: false, stock: 9,
    desc: "Versão azul da nova coleção da Seleção Brasileira para 26/27.",
    imgLabel: "Brasil Azul Copa 26/27", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1666-1.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1666-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1667-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1668-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1670-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1671-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1672-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1673-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1677-1.jpeg"
    ]
  },
  {
    id: 20, name: "Camisa de Time Seleção Brasileira Polo Preta c/ Patrocínio", subtitle: "Camisa Polo Oficial",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 58, featured: false, stock: 11,
    desc: "Polo preta estilizada da Seleção com logos dos patrocinadores oficiais.",
    imgLabel: "Brasil Polo Preta Patrocínio", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-123.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-123.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-124.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-125.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-126.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-127.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-128.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-129.jpeg"
    ]
  },
  {
    id: 21, name: "Camisa de Time Corinthians Polo Branca Lisa Emborrachado", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.8, reviews: 76, featured: false, stock: 7,
    desc: "Polo branca do Timão com escudo emborrachado para maior durabilidade.",
    imgLabel: "Corinthians Polo Emborrachada", sizes: ["G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-118.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-118.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-119.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-120.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-121.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-122.jpeg"
    ]
  },
  {
    id: 22, name: "Camisa de Time Seleção Inglaterra Polo Branca c/ Azul", subtitle: "Camisa Polo Oficial",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 39, featured: false, stock: 5,
    desc: "O estilo clássico inglês em uma polo branca com detalhes em azul.",
    imgLabel: "Inglaterra Polo Branca", sizes: ["M", "G"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4707.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4707.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4708.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4709.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4710.jpeg"
    ]
  },
  {
    id: 23, name: "Camisa de Time Bahia Polo Vermelha", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["outlet"], rating: 4.6, reviews: 24, featured: false, stock: 2,
    desc: "Vista as cores do Esquadrão com a polo vermelha oficial.",
    imgLabel: "Bahia Polo Vermelha", sizes: ["P"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4012.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4012.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4013.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_4014.jpeg"
    ]
  },
  {
    id: 24, name: "Lançamento Camisa de Time Seleção Brasileira Copa do Mundo Amarela 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.9, reviews: 143, featured: true, stock: 13,
    desc: "O novo manto titular da Seleção Brasileira para a temporada de 26/27.",
    imgLabel: "Brasil Amarela 26/27", sizes: ["M", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/img_3365-1.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_3365-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_3368-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_3369-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_3370-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_3371-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_3372-1.jpeg"
    ]
  },
  {
    id: 25, name: "Camisa de Time Corinthians Preta Pré Jogo", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.8, reviews: 88, featured: false, stock: 15,
    desc: "Camisa de aquecimento oficial do Corinthians. Leveza e respirabilidade.",
    imgLabel: "Corinthians Pré Jogo", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-37.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-37.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-36.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-35.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-34.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-33.jpeg"
    ]
  },
  {
    id: 26, name: "Camisa de Time Roma Vinho 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Serie A", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.7, reviews: 32, featured: false, stock: 8,
    desc: "O manto giallorossi para a nova temporada italiana.",
    imgLabel: "Roma Vinho 26/27", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-42-600x600.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-42-600x600.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-41-600x600.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-40-600x600.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-39-600x600.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2862-600x600.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-38-600x600.jpeg"
    ]
  },
  {
    id: 27, name: "Camisa de Time Atlético Mineiro Listrada 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 45, featured: true, stock: 11,
    desc: "Nova camisa do Galo. Alvinegra tradicional com tecnologia avançada.",
    imgLabel: "Atlético-MG Listrada 26/27", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-46.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-46.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-45.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2847.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2848.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2849.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-44.jpeg"
    ]
  },
  {
    id: 28, name: "Camisa de Time Lyon Azul Listrada", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Ligue 1", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["outlet"], rating: 4.5, reviews: 15, featured: false, stock: 3,
    desc: "Design azul listrado exclusivo do Olympique Lyonnais.",
    imgLabel: "Lyon Azul", sizes: ["P"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-2-3.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-2-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-3-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-4-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-7.jpeg"
    ]
  },
  {
    id: 29, name: "Camisa de Time Roma Polo Bege", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Serie A", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 26, featured: false, stock: 6,
    desc: "Edição casual premium da Roma em tom bege sofisticado.",
    imgLabel: "Roma Polo Bege", sizes: ["M", "G"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-6.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-6.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-3-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-1-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-2-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/fullsizerender-5.jpeg"
    ]
  },
  {
    id: 30, name: "Camisa de Time Palmeiras Verde 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 53, featured: true, stock: 9,
    desc: "O novo verde do Palmeiras para as próximas conquistas.",
    imgLabel: "Palmeiras Verde 26/27", sizes: ["G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/img_5033.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_5033.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_5034.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_5035.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_5036.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_5037.jpeg"
    ]
  },
  {
    id: 31, name: "Camisa de Time Corinthians All Black Detalhada", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["hot"], rating: 4.9, reviews: 201, featured: true, stock: 10,
    desc: "Versão All Black com detalhes exclusivos em baixo relevo.",
    imgLabel: "Corinthians All Black Detalhada", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2468.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2468.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2469.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2470.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2471.jpeg"
    ]
  },
  {
    id: 32, name: "Camisa de Time PSG Vermelha 25/26 Total 90", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Ligue 1", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new", "hot"], rating: 4.9, reviews: 167, featured: true, stock: 12,
    desc: "Relançamento icônico do estilo Total 90 para o Paris Saint-Germain.",
    imgLabel: "PSG Vermelha Total 90", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2407-4.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2407-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2409-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2410-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2411-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2412-4.jpeg"
    ]
  },
  {
    id: 33, name: "Camisa de Time Corinthians Polo Preta c/ Laranja", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.8, reviews: 92, featured: false, stock: 10,
    desc: "Atitude e estilo na polo preta com detalhes em laranja vibrante.",
    imgLabel: "Corinthians Polo Laranja", sizes: ["M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2392.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2392.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2394.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2395.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2396.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/img_2397.jpeg"
    ]
  },
  {
    id: 34, name: "Camisa de Time Inter de Milão 25/26", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Serie A", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.7, reviews: 41, featured: false, stock: 14,
    desc: "A tradicional nerazzurri em sua versão para a temporada 25/26.",
    imgLabel: "Inter Milão 25/26", sizes: ["M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-3-3.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-3-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-4-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-2-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-11.jpeg"
    ]
  },
  {
    id: 35, name: "Lançamento Camisa Flamengo Listrada 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new", "hot"], rating: 4.9, reviews: 189, featured: true, stock: 15,
    desc: "Novo manto rubro-negro. Tradição e modernidade para a maior torcida.",
    imgLabel: "Flamengo Listrada 26/27", sizes: ["P", "M", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-15.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-15.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2941.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2942.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2943.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2944.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2945.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-14.jpeg"
    ]
  },
  {
    id: 36, name: "Camisa de Time Seleção Portugal Preta Copa do Mundo 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 37, featured: false, stock: 6,
    desc: "Elegância lusitana na versão preta especial para a Copa do Mundo.",
    imgLabel: "Portugal Preta Copa", sizes: ["M"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/img_2314.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_2314.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_2315.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_2316.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_2317.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_2318.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_2319.jpeg"
    ]
  },
  {
    id: 37, name: "Camisa de Time Seleção Brasileira Polo Amarela", subtitle: "Camisa Polo Oficial",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 29, featured: false, stock: 4,
    desc: "Polo clássica amarela da Seleção Brasileira para o casual.",
    imgLabel: "Brasil Polo Amarela", sizes: ["M"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2838.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2838.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2839.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2840.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2841.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/IMG_2842.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/02/FullSizeRender-47.jpeg"
    ]
  },
  {
    id: 38, name: "Camisa de Time Seleção Portugal Vermelha 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 62, featured: true, stock: 11,
    desc: "O novo manto principal de Portugal para o ciclo de 26/27.",
    imgLabel: "Portugal Vermelha 26/27", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-7.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-7.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-6.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-5.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/fullsizerender-3.jpeg"
    ]
  },
  {
    id: 39, name: "Camisa de Time Cruzeiro Azul c/ Dourado 25/26", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["hot"], rating: 4.9, reviews: 145, featured: false, stock: 5,
    desc: "Edição luxuosa do Cruzeiro com detalhes em dourado.",
    imgLabel: "Cruzeiro Azul Dourado", sizes: ["G"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1290.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1290.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1291.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1292.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1293.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1294.jpeg"
    ]
  },
  {
    id: 40, name: "Camisa de Time Seleção Argentina 2026", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["hot"], rating: 4.9, reviews: 254, featured: true, stock: 13,
    desc: "A albiceleste dos campeões mundiais para o próximo grande desafio.",
    imgLabel: "Argentina 2026", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1150.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1150.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1151.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1152.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1156.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1153.jpeg"
    ]
  },
  {
    id: 41, name: "Camisa de Time Napoli Azul", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Serie A", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.7, reviews: 34, featured: false, stock: 8,
    desc: "A paixão napolitana traduzida no clássico azul celeste.",
    imgLabel: "Napoli Azul", sizes: ["P", "M", "G"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1143.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1143.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1144.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1145.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1146.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1147.jpeg"
    ]
  },
  {
    id: 42, name: "Camisa de Time Corinthians All Black", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["outlet"], rating: 4.7, reviews: 121, featured: false, stock: 3,
    desc: "A lendária versão toda preta do Corinthians.",
    imgLabel: "Corinthians All Black", sizes: ["GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1139.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1139.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1185.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1186.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1188.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1187.jpeg"
    ]
  },
  {
    id: 43, name: "Camisa de Time Inglaterra Branca 2026", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.7, reviews: 22, featured: false, stock: 4,
    desc: "Tradicional Three Lions em branco imaculado para 2026.",
    imgLabel: "Inglaterra Branca 2026", sizes: ["P"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1125-2.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1125-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1132-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1134-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1136-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1135-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/01/img_1133-1.jpeg"
    ]
  },
  {
    id: 44, name: "Camisa de Time Fluminense Vinho 2026", subtitle: "Camisa Oficial de Jogo",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.8, reviews: 31, featured: false, stock: 6,
    desc: "A elegância do Fluminense em tom vinho exclusivo para 2026.",
    imgLabel: "Fluminense Vinho 2026", sizes: ["P"],
    img: "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-20.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-20.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/img_0210-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-4-3.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-1-6.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-2-5.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-3-4.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/img_0203-1.jpeg"
    ]
  },
  {
    id: 45, name: "Camisa de Time Santos Polo Azul 2026", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["new"], rating: 4.7, reviews: 27, featured: false, stock: 8,
    desc: "Novidade santista em azul royal com estilo polo.",
    imgLabel: "Santos Polo Azul 2026", sizes: ["M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-4-1.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-4-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-3-1.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-1-2.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/12/fullsizerender-2-1.jpeg"
    ]
  },
  {
    id: 46, name: "Camisa de Time Flamengo Polo Bege", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.8, reviews: 43, featured: false, stock: 10,
    desc: "Estilo casual refinado do Flamengo em tom de bege.",
    imgLabel: "Flamengo Polo Bege", sizes: ["M", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1140.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1140.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1141.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1142.jpeg"
    ]
  },
  {
    id: 47, name: "Camisa de Time Flamengo Edição Especial Polo Preta c/ Dourado", subtitle: "Camisa Polo Oficial",
    category: "times", liga: "Brasileirão", gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: ["hot"], rating: 5.0, reviews: 98, featured: true, stock: 4,
    desc: "Edição de colecionador. Polo preta com detalhes bordados em fio dourado.",
    imgLabel: "Flamengo Polo Preta Dourada", sizes: ["P", "M"],
    img: "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1298.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1298.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1294.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1295.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1296.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2025/11/img_1297.jpeg"
    ]
  },
  {
    id: 48, name: "Camisa de Time Seleção Brasileira Copa do Mundo Azul 26/27", subtitle: "Camisa Oficial de Jogo",
    category: "selecoes", liga: null, gender: "Unissex",
    price: 80.00, oldPrice: 119.99,
    badges: [], rating: 4.8, reviews: 112, featured: false, stock: 9,
    desc: "Versão azul da nova coleção da Seleção Brasileira para 26/27.",
    imgLabel: "Brasil Azul Copa 26/27 V2", sizes: ["P", "M", "G", "GG"],
    img: "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-24.jpeg",
    gallery: [
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-24.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-25.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-26.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-27.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-28.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-29.jpeg",
      "https://playnodrop.com.br/wp-content/uploads/2026/03/FullSizeRender-30.jpeg"
    ]
  }
];

/* ══════════════════════════════════════════
   2. ESTADO
   ══════════════════════════════════════════ */
const state = {
  cart: JSON.parse(localStorage.getItem('wjg_cart') || '[]'),
  user: JSON.parse(localStorage.getItem('wjg_user') || 'null'),
  currentPage: 'home',
  selectedProduct: null,
  detailSize: null,
  detailGender: 'Masculino',
  detailQty: 1,
};

function saveCart() { localStorage.setItem('wjg_cart', JSON.stringify(state.cart)); }
function saveUser() { localStorage.setItem('wjg_user', JSON.stringify(state.user)); }

/* ══════════════════════════════════════════
   3. UTILITÁRIOS
   ══════════════════════════════════════════ */
const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function pctDiscount(price, old) {
  if (!old) return null;
  return Math.round(((old - price) / old) * 100);
}

function buildPlaceholder(label) {
  return `<div class="product-img-placeholder" title="${label}"><div class="ph-inner">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
    </svg><span>${label}</span></div></div>`;
}

/* ══════════════════════════════════════════
   4. CURSOR PERSONALIZADO
   ══════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  // Ativa apenas em dispositivos nao-touch com tela suficiente
  if (!cursor || !window.matchMedia('(pointer: fine)').matches) return;

  // Inicia invisivel ate o mouse entrar na pagina
  cursor.style.opacity = '0';
  trail.style.opacity  = '0';

  let tx = 0, ty = 0, cx = 0, cy = 0, started = false;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    cursor.style.left = tx + 'px';
    cursor.style.top  = ty + 'px';
    if (!started) {
      started = true;
      cursor.style.opacity = '1';
      trail.style.opacity  = '1';
    }
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
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; trail.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { if (started) { cursor.style.opacity = '1'; trail.style.opacity = '1'; } });
}

/* ══════════════════════════════════════════
   5. PARTICULAS DE FUNDO
   ══════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  class Particle {
    constructor() { this.reset(); }
    reset() { this.x = Math.random()*W; this.y = Math.random()*H; this.r = Math.random()*1.5+0.3; this.vx = (Math.random()-0.5)*0.3; this.vy = -(Math.random()*0.5+0.2); this.alpha = Math.random()*0.6+0.1; this.color = Math.random()>0.5?'#FF2200':'#FF7700'; }
    update() { this.x+=this.vx; this.y+=this.vy; this.alpha-=0.001; if(this.y<-10||this.alpha<=0) this.reset(); }
    draw() { ctx.save(); ctx.globalAlpha=this.alpha; ctx.fillStyle=this.color; ctx.shadowColor=this.color; ctx.shadowBlur=6; ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill(); ctx.restore(); }
  }
  resize(); window.addEventListener('resize', resize);
  for (let i=0; i<80; i++) particles.push(new Particle());
  function loop() { ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(loop); }
  loop();
}

/* ══════════════════════════════════════════
   6. HEADER
   ══════════════════════════════════════════ */
function initHeader() {
  const header = document.getElementById('site-header');
  const burger = document.getElementById('hamburger');
  const nav    = document.getElementById('main-nav');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
  burger.addEventListener('click', () => { burger.classList.toggle('open'); nav.classList.toggle('open'); });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && !e.target.closest('#hamburger')) { burger.classList.remove('open'); nav.classList.remove('open'); }
  });
}

/* ══════════════════════════════════════════
   7. NAVEGACAO SPA
   ══════════════════════════════════════════ */
window.showPage = function(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + pageId);
  if (!el) return;
  el.classList.add('active');
  state.currentPage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pageId !== 'product') history.replaceState(null, '', '#' + pageId);
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('main-nav').classList.remove('open');
  if (pageId === 'times')     renderCategory('times');
  if (pageId === 'selecoes')  renderCategory('selecoes');
  if (pageId === 'promocoes') renderPromoPage();
};

/* ══════════════════════════════════════════
   8. RENDERIZACAO DE CARDS
   ══════════════════════════════════════════ */
function createCard(p) {
  const disc = pctDiscount(p.price, p.oldPrice);
  const inst = (p.price / 2).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const badgeMap = { promo: ['cbadge--fire','Promocao'], new: ['cbadge--new','Novidade'], hot: ['cbadge--hot','Top Vendas'], outlet: ['cbadge--outlet','Outlet'] };
  const badgesHTML = p.badges.map(b => { const [cls,lbl] = badgeMap[b]||[]; return cls ? `<span class="cbadge ${cls}">${lbl}</span>` : ''; }).join('');
  const urgency = p.stock <= 5 ? `<div class="pcard-urgency">Restam apenas ${p.stock} unidades!</div>` : '';
  const sizesHTML = (p.sizes||[]).map(s => `<span class="pcard-size-tag">${s}</span>`).join('');
  return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="product-card-img">
        ${p.img ? `<img src="${p.img}" alt="${p.imgLabel}" class="product-real-img" loading="lazy" />` : buildPlaceholder(p.imgLabel)}
        <div class="card-badges">${badgesHTML}</div>
        <button class="card-wish" onclick="event.stopPropagation();showToast('Adicionado aos favoritos!')">&#9825;</button>
      </div>
      <div class="product-card-body">
        <div class="pcard-meta-row">
          <span class="pcard-cat">${p.category === 'times' ? (p.liga || 'Times') : 'Selecao Nacional'}</span>
          <span class="pcard-gender">${p.gender}</span>
        </div>
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-pricing">
          <span class="pcard-price">${fmt(p.price)}</span>
          ${p.oldPrice ? `<span class="pcard-old">${fmt(p.oldPrice)}</span>` : ''}
          ${disc ? `<span class="pcard-pct">-${disc}%</span>` : ''}
        </div>
        <div class="pcard-installments">ou <span>2x R$ ${inst}</span> sem juros</div>
        <div class="pcard-sizes-wrap"><span class="pcard-sizes-label">Tam:</span><div class="pcard-sizes-list">${sizesHTML}</div></div>
        ${urgency}
        <button class="btn-card-buy" onclick="event.stopPropagation();quickAdd(${p.id})">+ Adicionar ao Carrinho</button>
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
   10. PAGINAS DE CATEGORIA
   ══════════════════════════════════════════ */
window.renderCategory = function(cat) {
  const sortEl  = document.getElementById(`${cat}-sort`);
  const sortVal = sortEl ? sortEl.value : '';
  let items = PRODUCTS.filter(p => p.category === cat);
  if (cat === 'times') {
    const checked = [...document.querySelectorAll('.liga-cb:checked')].map(el => el.value);
    if (checked.length) items = items.filter(p => checked.includes(p.liga));
  }
  if (sortVal === 'price-asc')  items.sort((a,b) => a.price - b.price);
  if (sortVal === 'price-desc') items.sort((a,b) => b.price - a.price);
  if (sortVal === 'name')       items.sort((a,b) => a.name.localeCompare(b.name));
  const grid = document.getElementById(`cat-grid-${cat}`);
  if (!grid) return;
  grid.innerHTML = items.length ? items.map(createCard).join('') : `<p style="color:var(--gray-3);padding:20px;">Nenhum produto encontrado.</p>`;
};

function buildLigaFilters() {
  const ligas = [...new Set(PRODUCTS.filter(p => p.liga).map(p => p.liga))];
  const el = document.getElementById('liga-filter-group');
  if (!el) return;
  el.innerHTML = ligas.map(l => `<label><input type="checkbox" class="liga-cb" value="${l}" onchange="renderCategory('times')" />${l}</label>`).join('');
}

/* ══════════════════════════════════════════
   11. PROMOCOES + COUNTDOWN
   ══════════════════════════════════════════ */
function renderPromoPage() {
  const promos = PRODUCTS.filter(p => p.badges.some(b => ['promo','hot','outlet'].includes(b)));
  const grid = document.getElementById('promo-grid');
  if (grid) grid.innerHTML = promos.map(createCard).join('');
}

function initCountdown() {
  let secs = 8 * 3600 + 45 * 60;
  function tick() {
    const h = Math.floor(secs/3600), m = Math.floor((secs%3600)/60), s = secs%60;
    const hEl = document.getElementById('cd-h'), mEl = document.getElementById('cd-m'), sEl = document.getElementById('cd-s');
    if (hEl) hEl.textContent = String(h).padStart(2,'0');
    if (mEl) mEl.textContent = String(m).padStart(2,'0');
    if (sEl) sEl.textContent = String(s).padStart(2,'0');
    if (secs > 0) secs--;
  }
  tick(); setInterval(tick, 1000);
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
  const inst = (p.price / 2).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pix  = fmt(p.price * 0.95);
  const rating = p.rating || 0;
  const fullStars = Math.floor(rating);
  const starsHTML = '&#9733;'.repeat(fullStars) + (rating % 1 ? '&#189;' : '');

  const thumbsHTML = p.gallery && p.gallery.length > 0
    ? p.gallery.map((url, idx) => `<div class="dthumb ${idx===0?'active':''}" onclick="switchThumb(this,'${url}')"><img src="${url}" alt="Foto ${idx+1}" class="product-real-img" style="border-radius:var(--radius-md);" /></div>`).join('')
    : `<div class="dthumb active" onclick="switchThumb(this,'frontal')">${buildPlaceholder('Frontal')}</div>
       <div class="dthumb" onclick="switchThumb(this,'costas')">${buildPlaceholder('Costas')}</div>`;

  const sizeBtns = ['P','M','G','GG'].map(s => {
    const avail = p.sizes ? p.sizes.includes(s) : true;
    return avail
      ? `<button class="sz-btn" onclick="selectSize(this,'${s}')">${s}</button>`
      : `<button class="sz-btn disabled" disabled title="Esgotado">${s}</button>`;
  }).join('');

  const html = `
    <div class="product-detail-layout">
      <div class="detail-gallery">
        <div class="detail-main-img" id="detail-main-img">
          ${p.img ? `<img src="${p.img}" alt="${p.imgLabel}" class="product-real-img" style="border-radius:var(--radius-lg);" />` : buildPlaceholder(p.imgLabel)}
        </div>
        <div class="detail-thumbs">${thumbsHTML}</div>
      </div>
      <div class="detail-info">
        <div class="detail-breadcrumb">
          <a href="#" onclick="showPage('home');return false">Inicio</a> /
          <a href="#" onclick="showPage('${p.category}');return false">${p.category === 'times' ? 'Times' : 'Selecoes'}</a> /
          ${p.name}
        </div>
        <h1 class="detail-name">${p.name}</h1>
        <p class="detail-subtitle">${p.subtitle}</p>
        <div class="detail-rating">
          <span class="stars">${starsHTML}</span>
          <strong>${p.rating}</strong>
          <span>(${p.reviews} avaliacoes)</span>
        </div>
        <div class="detail-pricing">
          ${p.oldPrice ? `<span class="dp-old">De ${fmt(p.oldPrice)}</span>` : ''}
          <div class="dp-main">
            ${fmt(p.price)}
            ${disc ? `<span class="dp-disc">-${disc}%</span>` : ''}
          </div>
          <p class="dp-install">ou 2x de R$ ${inst} sem juros no cartao</p>
          <p class="dp-pix">PIX com 5% OFF: ${pix}</p>
        </div>
        <div class="detail-options">
          <span class="option-label">Tamanho <strong id="sz-selected"></strong></span>
          <div class="size-btns">${sizeBtns}</div>
          <span class="option-label" style="margin-top:12px">Genero <strong id="gd-selected">Masculino</strong></span>
          <div class="gender-btns">
            <button class="gd-btn active" onclick="selectGender(this,'Masculino')">Masculino</button>
            <button class="gd-btn" onclick="selectGender(this,'Feminino')">Feminino</button>
          </div>
          <span class="option-label" style="margin-top:4px">Quantidade</span>
          <div class="qty-selector">
            <button class="qty-btn" onclick="detailQtyChange(-1)">&minus;</button>
            <span class="qty-num" id="detail-qty-num">1</span>
            <button class="qty-btn" onclick="detailQtyChange(+1)">+</button>
          </div>
        </div>
        <div class="detail-ctas">
          <button class="btn-fire" onclick="addDetailToCart()">
            <span>Adicionar ao Carrinho</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
          <button class="btn-wish-detail" onclick="showToast('Adicionado aos favoritos!')">&#9825;</button>
        </div>
        <div class="detail-perks">
          <div class="dperk"><span>&#128666;</span><span>Frete gratis para todo o Brasil</span></div>
          <div class="dperk"><span>&#128260;</span><span>30 dias para troca sem custo adicional</span></div>
          <div class="dperk"><span>&#127941;</span><span>Produto 100% original e licenciado</span></div>
          <div class="dperk"><span>&#128274;</span><span>Compra segura com SSL e antifraude</span></div>
        </div>
        <div class="detail-desc">
          <h3>Descricao</h3>
          <p>${p.desc}</p>
          <p>Composicao: 100% Poliester reciclado. Lavagem: maquina fria. Nao usar alvejante. Produto importado com nota fiscal.</p>
        </div>
      </div>
    </div>`;

  document.getElementById('product-detail-root').innerHTML = html;
  history.replaceState(null, '', '#produto-' + p.id);
  showPage('product');
};

window.switchThumb = function(el, url) {
  document.querySelectorAll('.dthumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const main = document.getElementById('detail-main-img');
  if (url.startsWith('http')) {
    main.innerHTML = `<img src="${url}" class="product-real-img" style="border-radius:var(--radius-lg);" />`;
  } else {
    main.innerHTML = buildPlaceholder(state.selectedProduct.imgLabel + ' - ' + url);
  }
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
  state.detailQty = Math.min(99, Math.max(1, state.detailQty + delta));
  const el = document.getElementById('detail-qty-num');
  if (el) el.textContent = state.detailQty;
};

window.addDetailToCart = function() {
  if (!state.detailSize) { showToast('Selecione um tamanho!'); return; }
  const p = state.selectedProduct;
  for (let i = 0; i < state.detailQty; i++) addToCart(p, state.detailSize, state.detailGender);
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
  if (ex) { ex.qty += 1; } else { state.cart.push({ key, id: p.id, name: p.name, price: p.price, size, gender, qty: 1, imgLabel: p.imgLabel, img: p.img }); }
  saveCart();
  updateCartUI();
  showToast(`${p.name} (${size}/${gender}) adicionado!`);
  const badge = document.getElementById('cart-count');
  badge.classList.remove('pop'); void badge.offsetWidth; badge.classList.add('pop');
}

window.removeFromCart = function(key) { state.cart = state.cart.filter(i => i.key !== key); saveCart(); updateCartUI(); };

window.changeCartQty = function(key, delta) {
  const item = state.cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.min(99, Math.max(1, item.qty + delta));
  saveCart(); updateCartUI();
};

function updateCartUI() {
  const total = state.cart.reduce((s,i) => s + i.qty, 0);
  document.getElementById('cart-count').textContent = total;
  const items  = document.getElementById('cart-panel-items');
  const footer = document.getElementById('cart-panel-footer');
  if (state.cart.length === 0) {
    items.innerHTML = `<div class="cart-empty-state"><div class="cart-empty-icon">&#128722;</div><p>Seu carrinho esta vazio</p><small>Adicione produtos para continuar</small></div>`;
    footer.style.display = 'none'; return;
  }
  footer.style.display = 'block';
  items.innerHTML = state.cart.map(item => `
    <div class="cart-item-card">
      <div class="cart-item-thumb">${item.img ? `<img src="${item.img}" alt="${item.imgLabel}" class="product-real-img" />` : buildPlaceholder(item.imgLabel)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Tam: ${item.size} - ${item.gender}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="cart-qty-row">
          <button class="qty-btn" onclick="changeCartQty('${item.key}',-1)">&minus;</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty('${item.key}',+1)">+</button>
        </div>
      </div>
      <button class="cart-item-rm" onclick="removeFromCart('${item.key}')">&#10005;</button>
    </div>`).join('');
  const subtotal = state.cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cart-subtotal').textContent = fmt(subtotal);
  document.getElementById('cart-total').textContent    = fmt(subtotal);
}

function openCart()  { document.getElementById('cart-panel').classList.add('open'); document.getElementById('cart-backdrop').classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeCart() { document.getElementById('cart-panel').classList.remove('open'); document.getElementById('cart-backdrop').classList.remove('show'); document.body.style.overflow = ''; }

/* ══════════════════════════════════════════
   14. BUSCA EM TEMPO REAL + PAGINA DE RESULTADOS
   ══════════════════════════════════════════ */
function performFullSearch(query) {
  const q = query.trim();
  if (!q) return;
  closeSrch();
  const found = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    (p.liga || '').toLowerCase().includes(q.toLowerCase()) ||
    (p.subtitle || '').toLowerCase().includes(q.toLowerCase())
  );
  const label = document.getElementById('search-query-label');
  const count = document.getElementById('search-count-label');
  const grid  = document.getElementById('search-results-grid');
  if (label) label.textContent = `"${q}"`;
  if (count) count.textContent = found.length > 0
    ? `${found.length} camisa${found.length !== 1 ? 's' : ''} encontrada${found.length !== 1 ? 's' : ''}`
    : 'Nenhuma camisa encontrada';
  if (grid) {
    grid.innerHTML = found.length > 0
      ? found.map(createCard).join('')
      : `<div class="search-empty-state"><div class="sem-icon">&#128269;</div><p>Sem resultados para "${q}"</p><small>Tente termos como "Brasil", "Flamengo", "Polo", "Azul"...</small></div>`;
  }
  const pageInput = document.getElementById('search-page-input');
  if (pageInput) pageInput.value = q;
  showPage('search');
}

function initSearch() {
  const btn    = document.getElementById('search-btn');
  const flyout = document.getElementById('search-flyout');
  const input  = document.getElementById('search-input');
  const closeX = document.getElementById('search-x');
  const goBtn  = document.getElementById('search-go-btn');
  const drop   = document.getElementById('search-results-drop');

  btn.addEventListener('click', () => {
    flyout.classList.toggle('open');
    if (flyout.classList.contains('open')) setTimeout(() => input.focus(), 200);
    else { drop.style.display = 'none'; input.value = ''; }
  });

  closeX.addEventListener('click', () => { flyout.classList.remove('open'); drop.style.display = 'none'; input.value = ''; });
  goBtn.addEventListener('click', () => performFullSearch(input.value));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); performFullSearch(input.value); } });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { drop.style.display = 'none'; return; }
    const found = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || (p.liga||'').toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)).slice(0, 6);
    if (!found.length) {
      drop.innerHTML = `<div style="padding:12px 16px;color:var(--gray-3);font-size:13px">Sem sugestoes. Pressione <strong style="color:var(--orange)">Enter</strong> para buscar.</div>`;
    } else {
      drop.innerHTML = found.map(p => `
        <div class="sr-item" onclick="openProduct(${p.id});closeSrch();">
          <div class="sr-thumb">${p.img ? `<img src="${p.img}" alt="${p.imgLabel}" class="product-real-img" />` : buildPlaceholder(p.imgLabel)}</div>
          <div class="sr-info"><strong>${p.name}</strong><span>${fmt(p.price)}</span></div>
        </div>`).join('') +
        `<div class="sr-item" onclick="performFullSearch('${input.value.trim().replace(/'/g,"\\'")}');" style="justify-content:center;color:var(--orange);font-weight:700;font-size:13px;gap:6px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          Ver todos os resultados
        </div>`;
    }
    drop.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container') && !e.target.closest('.search-results-drop')) { flyout.classList.remove('open'); drop.style.display = 'none'; input.value = ''; }
  });

  const pageInput = document.getElementById('search-page-input');
  const pageBtn   = document.getElementById('search-page-btn');
  if (pageBtn) pageBtn.addEventListener('click', () => performFullSearch(pageInput.value));
  if (pageInput) pageInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') performFullSearch(pageInput.value); });
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
   16. FORMULARIO DE CONTATO
   ══════════════════════════════════════════ */
window.submitContact = function(e) { e.preventDefault(); showToast('Mensagem enviada! Retornaremos em breve.'); e.target.reset(); };

/* ══════════════════════════════════════════
   17. AUTENTICACAO E PERFIL
   ══════════════════════════════════════════ */
function handleUserMenu() {
  if (state.user) { hydrateProfile(); showPage('profile'); } else { showPage('auth'); }
}

function toggleAuth(type) {
  document.getElementById('box-login').style.display = type === 'login' ? 'block' : 'none';
  document.getElementById('box-register').style.display = type === 'register' ? 'block' : 'none';
}

function handleLogin(e) {
  e.preventDefault();
  const id = document.getElementById('login-id').value.trim();
  const pass = document.getElementById('login-pass').value;
  if (id && pass) {
    const registered = JSON.parse(localStorage.getItem('wjg_user') || 'null');
    if (registered && (registered.email === id || registered.phone === id) && registered.pass === pass) {
      state.user = registered; saveUser(); showToast('Login realizado com sucesso!'); handleUserMenu();
    } else { showToast('Usuario ou senha invalidos.'); }
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name    = document.getElementById('reg-name').value.trim();
  const email   = document.getElementById('reg-email').value.trim();
  const phone   = document.getElementById('reg-phone').value.trim();
  const pass    = document.getElementById('reg-pass').value;
  const address = document.getElementById('reg-address').value.trim();
  if (!email && !phone) { showToast('Preencha pelo menos E-mail ou Celular.'); return; }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('E-mail invalido.'); return; }
  if (phone && phone.replace(/\D/g,'').length < 10) { showToast('Celular invalido. Inclua o DDD.'); return; }
  state.user = { name, email, phone, pass, address }; saveUser();
  showToast('Conta criada com sucesso!');
  document.getElementById('box-register').style.display = 'none';
  document.getElementById('box-login').style.display = 'block';
  setTimeout(() => handleUserMenu(), 500);
}

function logout() { state.user = null; saveUser(); showToast('Sessao encerrada.'); showPage('home'); }

function switchProfileTab(tabPath) {
  document.querySelectorAll('.pnav-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.pnav-btn[onclick="switchProfileTab('${tabPath}')"]`);
  if (activeBtn) activeBtn.classList.add('active');
  document.querySelectorAll('.ptab').forEach(t => t.style.display = 'none');
  const tab = document.getElementById('ptab-' + tabPath);
  if (tab) tab.style.display = 'block';
}

function hydrateProfile() {
  if (!state.user) return;
  document.getElementById('prof-name').value    = state.user.name    || '';
  document.getElementById('prof-email').value   = state.user.email   || '';
  document.getElementById('prof-phone').value   = state.user.phone   || '';
  document.getElementById('prof-address').value = state.user.address || '';
  const ordersList = document.getElementById('profile-orders-list');
  const mockOrder  = JSON.parse(localStorage.getItem('wjg_mock_order'));
  if (mockOrder && ordersList) {
    ordersList.innerHTML = `<div class="order-card"><div class="order-card-header"><span class="order-id">Pedido #99281</span><span class="order-date">Hoje</span></div><div class="order-items">Camisa WJG Especial (x1) — ${fmt(129.90)}</div><div><span class="order-status os-preparo">Em preparo</span></div></div>`;
  }
}

function updateProfile(e) {
  e.preventDefault();
  if (!state.user) return;
  const email = document.getElementById('prof-email').value.trim();
  const phone = document.getElementById('prof-phone').value.trim();
  if (!email && !phone) { showToast('O perfil precisa de pelo menos E-mail ou Celular.'); return; }
  state.user.name    = document.getElementById('prof-name').value.trim();
  state.user.email   = email;
  state.user.phone   = phone;
  state.user.address = document.getElementById('prof-address').value.trim();
  saveUser(); showToast('Dados atualizados com sucesso!');
}

function handleCheckout() {
  if (!state.user) { closeCart(); showToast('Faca login ou cadastre-se para comprar.'); showPage('auth'); return; }
  if (state.cart.length > 0) {
    localStorage.setItem('wjg_mock_order', 'true');
    state.cart = []; saveCart(); updateCartUI(); closeCart(); showToast('Compra finalizada com sucesso!');
    handleUserMenu(); switchProfileTab('pedidos');
  } else { showToast('Seu carrinho esta vazio.'); }
}

/* ══════════════════════════════════════════
   18. INIT
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initCursor(); initParticles(); initHeader();
  renderHomeGrids(); buildLigaFilters(); updateCartUI();
  initSearch(); initCountdown();
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('cart-panel-close').addEventListener('click', closeCart);
  document.getElementById('cart-backdrop').addEventListener('click', closeCart);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeCart(); closeSrch(); } });

  const validPages = ['home','times','selecoes','promocoes','sobre','contato','institucional'];
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('produto-')) {
    const prodId = parseInt(hash.replace('produto-', ''), 10);
    if (!isNaN(prodId) && PRODUCTS.find(p => p.id === prodId)) { openProduct(prodId); } else { showPage('home'); }
  } else {
    showPage(validPages.includes(hash) ? hash : 'home');
  }
  console.log(`WJG Loaded - ${PRODUCTS.length} produtos`);
});
