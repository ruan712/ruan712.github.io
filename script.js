/* ═══════════════════════════════════════════════════════════
   WADSON SILVA PORTFÓLIO — script.js v2
   • Custom cursor com lerp
   • Mouse parallax no hero (glow + foto + nome + bg-text)
   • Animação de saída/entrada do nome ao rolar
   • Contagem animada nos stats
   • Scroll reveal direcional
   • Canvas de partículas no hero
   • Nav ativa por seção
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* ════════════════════════════════
     1. CUSTOM CURSOR (com lerp + stretch)
  ════════════════════════════════ */
  const cursor = document.getElementById('cursor')
  let mx = window.innerWidth / 2
  let my = window.innerHeight / 2
  let cx = mx,
    cy = my

  document.addEventListener('mousemove', e => {
    mx = e.clientX
    my = e.clientY
  })

  function lerpCursor() {
    cx += (mx - cx) * 0.15
    cy += (my - cy) * 0.15

    // Translada apenas sua posição tridimensional. Mantém forma rígida (Radar/HUD).
    cursor.style.transform = `translate3d(calc(${cx}px - 50%), calc(${cy}px - 50%), 0)`

    requestAnimationFrame(lerpCursor)
  }
  lerpCursor()

  // Hover em elementos interativos
  document
    .querySelectorAll(
      'a, button, .toc-tag, .skill-chips span, .career-item, .clients-ticker span, .name-char, .interactive-card, .expo-close, .tool-badge, .grid-item'
    )
    .forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'))
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
    })

  /* ════════════════════════════════
     1.5. LOGICA DE SCROLL E CURSOR (FLUIDEZ)
  ════════════════════════════════ */
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  const siteHeader = document.getElementById('site-header')

  function toggleScrollLock(lock) {
    if (lock) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      if (siteHeader) siteHeader.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      if (siteHeader) siteHeader.style.paddingRight = ''
    }
  }

  // Ocultar cursor ao clicar na barra de rolagem (extrema direita)
  window.addEventListener('mousedown', e => {
    // Se clicar nos últimos 20px da tela (área da scrollbar)
    if (e.clientX >= window.innerWidth - 20) {
      cursor.style.opacity = '0'
    }
  })

  window.addEventListener('mouseup', () => {
    cursor.style.opacity = '1'
  })

  /* ════════════════════════════════
     2. MOUSE PARALLAX NO RADAR E FOTO
  ════════════════════════════════ */
  const heroSection = document.getElementById('sobre')
  const radarBg = document.getElementById('radar-bg')
  const heroPhotoWrap = document.getElementById('hero-photo-wrap')
  const heroNameWrap = document.getElementById('hero-name-wrap')

  heroSection.addEventListener('mousemove', e => {
    const rect = heroSection.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = (e.clientX - rect.left - cx) / cx // -1 to 1
    const dy = (e.clientY - rect.top - cy) / cy // -1 to 1

    // Radar — movimento sutil ao fundo
    if (radarBg)
      radarBg.style.transform = `translate(calc(-50% + ${dx * 18}px), calc(-50% + ${dy * 8}px))`

    // Foto — paralaxe moderada
    if (heroPhotoWrap) heroPhotoWrap.style.transform = `translate(${dx * -10}px, ${dy * -6}px)`

    // Nome — movimento magnético suave
    if (heroNameWrap) heroNameWrap.style.transform = `translate(${dx * 16}px, ${dy * 6}px)`
  })

  heroSection.addEventListener('mouseleave', () => {
    if (radarBg) radarBg.style.transform = 'translate(-50%, -50%)'
    if (heroPhotoWrap) heroPhotoWrap.style.transform = ''
    if (heroNameWrap) heroNameWrap.style.transform = ''
  })

  /* ════════════════════════════════
     4. ANIMAÇÃO DE FADE + PARALLAX AO ROLAR 
  ════════════════════════════════ */
  const heroBgText = document.getElementById('hero-bg-text')

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY

      // Some após descer levemente a pagina
      if (heroNameWrap) {
        if (y > 40) {
          heroNameWrap.classList.add('disappear')
        } else {
          heroNameWrap.classList.remove('disappear')
        }
      }

      if (heroBgText) {
        const greekLayer = document.querySelector('.bg-elements-layer')
        if (y > 40) {
          heroBgText.classList.add('disappear')
          if (greekLayer) greekLayer.classList.add('vibrant')
        } else {
          heroBgText.classList.remove('disappear')
          if (greekLayer) greekLayer.classList.remove('vibrant')
        }
      }
    },
    { passive: true }
  )

  // Expansão dos balões (tags) para empurrar a foto
  const tagWrapLeft = document.getElementById('tag-left')
  const tagWrapRight = document.getElementById('tag-right')
  const photoWrap = document.getElementById('hero-photo-wrap')

  if (tagWrapLeft && tagWrapRight && photoWrap) {
    const cardLeft = tagWrapLeft.querySelector('.interactive-card')
    const cardRight = tagWrapRight.querySelector('.interactive-card')

    cardLeft.addEventListener('mouseenter', () => {
      photoWrap.style.left = '60px'
      tagWrapRight.style.opacity = '0'
      tagWrapRight.style.pointerEvents = 'none'
      tagWrapLeft.style.zIndex = '10'
    })
    cardLeft.addEventListener('mouseleave', () => {
      photoWrap.style.left = '0'
      tagWrapRight.style.opacity = '1'
      tagWrapRight.style.pointerEvents = 'auto'
      tagWrapLeft.style.zIndex = '4'
    })

    cardRight.addEventListener('mouseenter', () => {
      photoWrap.style.left = '-60px'
      tagWrapLeft.style.opacity = '0'
      tagWrapLeft.style.pointerEvents = 'none'
      tagWrapRight.style.zIndex = '10'
    })
    cardRight.addEventListener('mouseleave', () => {
      photoWrap.style.left = '0'
      tagWrapLeft.style.opacity = '1'
      tagWrapLeft.style.pointerEvents = 'auto'
      tagWrapRight.style.zIndex = '4'
    })
  }

  /* ════════════════════════════════
     4.5. EXPO MODAL (PORTFÓLIO SCREEN)
  ════════════════════════════════ */
  const EXP_DATA = {
    freelance: {
      title: 'Identidade de Luxo Imobiliário',
      brief:
        'Desenvolvimento de ecossistema visual para incorporadora de alto padrão. O objetivo foi transmitir exclusividade e sofisticação através de uma paleta sóbria e tipografia clássica, focando em investidores do mercado premium.',
      time: '3 Semanas',
      tools: ['Ai', 'Ps', 'Id'],
      industry: 'Imobiliário',
      mainImg: 'assets/social/realestate_social.png',
    },
    mkv: {
      title: 'Performance Automotiva Digital',
      brief:
        'Campanha de lançamento para modelo esportivo em Dubai. Criação de peças dinâmicas para redes sociais que enfatizam velocidade e tecnologia, utilizando manipulação de imagem avançada e efeitos de iluminação neon.',
      time: '2 Semanas',
      tools: ['Ps', 'Ae', 'Pr'],
      industry: 'Automobilístico',
      mainImg: 'assets/social/auto_social.png',
    },
    mystics: {
      title: 'Branding para Bem-Estar e Saúde',
      brief:
        'Rebranding estratégico para clínica médica focada em longevidade. O design utiliza espaços em branco e cores suaves para promover calma e confiança, alinhando a comunicação visual à excelência do atendimento.',
      time: '4 Semanas',
      tools: ['Ai', 'Ps'],
      industry: 'Saúde',
      mainImg: 'assets/social/health_social.png',
    },
    matrics: {
      title: 'Inovação no Agronegócio Tech',
      brief:
        'Interface e branding para plataforma de monitoramento agrícola via drones. A linguagem visual une o rústico do campo com o tecnológico do software, facilitando a visualização de dados complexos para o produtor.',
      time: '6 Semanas',
      tools: ['Ai', 'Ps', 'Figma'],
      industry: 'Agronegócio',
      mainImg: 'assets/social/agro_social.png',
    },
    artwing: {
      title: 'Campanhas de Alta Moda',
      brief:
        'Direção de arte para campanha sazonal de marca de moda europeia. Foco em estética minimalista e composições editoriais que valorizam o produto através de contrastes marcantes e tipografia vanguardista.',
      time: '3 Semanas',
      tools: ['Ps', 'Id', 'Lr'],
      industry: 'Moda',
      mainImg: 'assets/social/fashion_social.png',
    },
    nexon: {
      title: 'Ecossistema Visual de Tecnologia',
      brief:
        'Liderança criativa para rebranding de software house global. Desenvolvimento de sistema de design modular e ativos para marketing digital que comunicam robustez, escalabilidade e inovação disruptiva.',
      time: 'Indeterminado',
      tools: ['Ai', 'Ps', 'Ae', 'Figma'],
      industry: 'Tecnologia',
      mainImg: 'assets/social/tech_social.png',
    },
    chinagrill: {
      title: 'Social Media Campaign Designs',
      brief:
        'China Grill has entered the fast food business and established its popular name in a small span of time. With a unique sense of cooking, meal prep and customer services, we take pride in creating a fusion of traditional Chinese cuisine and blending it with a modern twist. China Grill is not just a Restaurant. We have created an eatery that is fun, entertaining and offers you decadent Asian flavors packed in every meal.',
      time: '1 Week',
      tools: ['Ai', 'Ps', 'Ae', 'Pr'],
      industry: 'Food & Beverage',
      mainImg: './assets/img/hero_section_initial_1776660348874.png',
    },
  }

  const careerItems = document.querySelectorAll('.career-item')
  const expoModal = document.getElementById('expo-modal')
  const expoClose = document.getElementById('expo-close')
  const expoRole = document.getElementById('expo-role')
  const expoCompany = document.getElementById('expo-company')
  const expoTitle = document.getElementById('expo-title-h2')
  const expoBrief = document.getElementById('expo-brief-p')
  const expoTime = document.getElementById('expo-time-val')
  const expoTools = document.getElementById('expo-tools-list')
  const expoHeroImg = document.getElementById('expo-main-image')

  careerItems.forEach(item => {
    item.addEventListener('click', () => {
      const type = item.dataset.modal
      const data = EXP_DATA[type]

      if (expoModal && data) {
        const role = item.querySelector('.career-role').textContent
        const company = item.querySelector('.career-company').textContent

        if (expoRole) expoRole.textContent = role
        if (expoCompany) expoCompany.textContent = company
        if (expoTitle) expoTitle.textContent = data.title
        if (expoBrief) expoBrief.innerHTML = `<strong>Brief:</strong><br>${data.brief}`
        if (expoTime) expoTime.textContent = data.time

        // Limpa e adiciona ferramentas
        if (expoTools) {
          expoTools.innerHTML = ''
          data.tools.forEach(tool => {
            const span = document.createElement('span')
            span.className = 'tool-badge'
            span.textContent = tool
            expoTools.appendChild(span)
          })
        }

        // Imagem Principal
        if (expoHeroImg) {
          expoHeroImg.src = data.mainImg
        }

        // Cartões Flutuantes (Assets)
        const asset1 = expoModal.querySelector('.card-1');
        const asset2 = expoModal.querySelector('.card-2');
        const asset3 = expoModal.querySelector('.card-3');
        if(asset1) asset1.style.backgroundImage = `url(${data.mainImg})`;
        if(asset2) asset2.style.backgroundImage = `url(${data.mainImg})`;
        if(asset3) asset3.style.backgroundImage = `url(${data.mainImg})`;

        // Abre o Modal com lock de scroll no fundo
        expoModal.classList.add('open');
        toggleScrollLock(true);

        /* ── INTERATIVIDADE 3D (TILT + PARALLAX) ── */
        const expoHero = expoModal.querySelector('.expo-hero');
        const mockupWrap = expoModal.querySelector('.phone-mockup-wrap');
        const cards = [asset1, asset2, asset3];

        if (expoHero && mockupWrap) {
          // Limpa transformações anteriores
          mockupWrap.style.transform = '';
          cards.forEach(card => { 
            if(card) {
               card.style.transform = '';
               card.classList.remove('is-playing'); // Reset inicial
            }
          });

          const handleMouseMove = (e) => {
            if (!expoModal.classList.contains('open')) return;
            const rect = expoHero.getBoundingClientRect();
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (e.clientX - rect.left - cx) / cx;
            const dy = (e.clientY - rect.top - cy) / cy;

            mockupWrap.style.transform = `rotateX(${dy * -12}deg) rotateY(${dx * 12}deg)`;
            cards.forEach((card, i) => {
              if (card) {
                const depth = (i + 1) * 20;
                card.style.marginLeft = `${dx * depth}px`;
                card.style.marginTop = `${dy * depth}px`;
              }
            });
          };

          const handleMouseLeave = () => {
            mockupWrap.style.transform = '';
            cards.forEach(card => { 
              if(card) {
                card.style.marginLeft = '0';
                card.style.marginTop = '0';
              }
            });
          };

          expoHero.onmousemove = handleMouseMove;
          expoHero.onmouseleave = handleMouseLeave;

          /* ── REPLAY DA ANIMAÇÃO NO SCROLL INTERNO ── */
          const modalScrollHint = document.getElementById('modal-scroll-hint');
          const observerOptions = {
            root: expoModal,
            threshold: 0.1 // Dispara quando 10% do hero estiver visível
          };

          const modalScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                cards.forEach(card => card && card.classList.add('is-playing'));
                if (modalScrollHint) modalScrollHint.classList.remove('hidden');
              } else {
                // Remove a classe quando o herói sai de vista (usuario desceu)
                // Usamos um pequeno delay ou verificação para evitar flickers
                if (entry.boundingClientRect.top < 0) { // Saiu por cima (subiu/desceu scroll)
                   cards.forEach(card => card && card.classList.remove('is-playing'));
                   if (modalScrollHint) modalScrollHint.classList.add('hidden');
                }
              }
            });
          }, observerOptions);

          modalScrollObserver.observe(expoHero);

          // Guardar referência para desconectar ao fechar o modal
          expoModal._observer = modalScrollObserver;
        }
      }
    })
  })

  if (expoClose) {
    expoClose.addEventListener('click', () => {
      expoModal.classList.remove('open')
      toggleScrollLock(false)
      
      // Desconectar o observer ao fechar
      if (expoModal._observer) {
        expoModal._observer.disconnect();
      }
      
      // Limpar classes de animação de todos os cards
      const allCards = expoModal.querySelectorAll('.floating-social-card');
      allCards.forEach(c => c.classList.remove('is-playing'));
    })
  }

  /* ════════════════════════════════
     5. SCROLL REVEAL DIRECIONAL
  ════════════════════════════════ */
  const revealEls = document.querySelectorAll('.scroll-reveal')

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || 0)
          setTimeout(() => entry.target.classList.add('visible'), delay)
        } else {
          entry.target.classList.remove('visible')
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  )

  revealEls.forEach(el => revealObserver.observe(el))

  /* ════════════════════════════════
     6. HEADER SCROLL
  ════════════════════════════════ */
  const header = document.getElementById('site-header')
  let lastY = 0

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY
      if (y > 60) header.classList.add('scrolled')
      else header.classList.remove('scrolled')
      lastY = y
    },
    { passive: true }
  )

  /* ════════════════════════════════
     7. NAV LINK ATIVO POR SEÇÃO
  ════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link')

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.tab === id)
          })
        }
      })
    },
    { threshold: 0.4 }
  )
  sections.forEach(s => sectionObserver.observe(s))

  /* ════════════════════════════════
     8. CONTAGEM ANIMADA — STATS
     Usa setTimeout por inteiro com easing pow(0.4):
     cada número aparece exatamente uma vez,
     sem travar no penúltimo nem saltar para o final.
  ════════════════════════════════ */
  const countupTimers = new WeakMap()

  function countUp(el, target, suffix) {
    // Cancela qualquer animação anterior no mesmo elemento
    const prev = countupTimers.get(el)
    if (prev) prev.forEach(id => clearTimeout(id))

    const ids = []
    const duration = 1500

    for (let i = 1; i <= target; i++) {
      // pow(0.4) → começa rápido, desacelera suavemente, termina sem travar
      const delay = Math.pow(i / target, 0.4) * duration
      const id = setTimeout(() => {
        el.textContent = i + suffix
      }, delay)
      ids.push(id)
    }

    countupTimers.set(el, ids)
  }

  const statObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting) {
          const target = parseInt(el.dataset.target)
          const suffix = el.dataset.suffix || ''
          countUp(el, target, suffix)
        } else {
          // Cancela timers pendentes e reseta o display
          const prev = countupTimers.get(el)
          if (prev) {
            prev.forEach(id => clearTimeout(id))
            countupTimers.delete(el)
          }
          el.textContent = '0' + (el.dataset.suffix || '')
        }
      })
    },
    { threshold: 0.7 }
  )

  document.querySelectorAll('.stat-num[data-target]').forEach(el => statObserver.observe(el))

  /* ════════════════════════════════
     8.5. JORNADA CRIATIVA — Animação de Atenção
     Dispara anim-active após o card entrar na tela,
     dando tempo para o scroll-reveal terminar primeiro.
  ════════════════════════════════ */
  const journeyCard = document.querySelector('.journey-card')
  if (journeyCard) {
    const jObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          // Pequeno delay para o scroll-reveal do card terminar (800ms transition)
          setTimeout(() => journeyCard.classList.add('anim-active'), 500)
          jObserver.disconnect() // dispara só uma vez
        }
      },
      { threshold: 0.3 }
    )
    jObserver.observe(journeyCard)
  }

  /* ════════════════════════════════
     9. PARALLAX LEVE NAS LETRAS
     Cada letra do nome reage ao scroll
  ════════════════════════════════ */
  const nameChars = document.querySelectorAll('.name-char')
  window.addEventListener(
    'scroll',
    () => {
      if (!heroVisible) return
      const y = window.scrollY
      nameChars.forEach((ch, i) => {
        const offset = Math.sin((i / nameChars.length) * Math.PI) * y * 0.04
        ch.style.transform = `translateY(${-offset}px)`
      })
    },
    { passive: true }
  )

  /* ════════════════════════════════
     10. CARROSSEL 3D AUDIOVISUAL
  ════════════════════════════════ */
  const avItems = Array.from(document.querySelectorAll('.av-item'))
  const btnPrev = document.querySelector('.av-prev-btn')
  const btnNext = document.querySelector('.av-next-btn')

  if (avItems.length > 0) {
    let currentIndex = 1 // O vídeo central (do meio) começa ativo

    function updateCarousel() {
      const total = avItems.length
      const prevIndex = (currentIndex - 1 + total) % total
      const nextIndex = (currentIndex + 1) % total

      avItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next')
        if (index === currentIndex) {
          item.classList.add('active')
          const vid = item.querySelector('video')
          if (vid) {
            vid.muted = true
            // Removemos 'vid.currentTime = 0;' para não resetar o giro natural do vídeo
            vid.play().catch(e => e)
          }
        } else if (index === prevIndex) {
          item.classList.add('prev')
        } else if (index === nextIndex) {
          item.classList.add('next')
        }
      })
    }

    // Navegação clicando puramente no vídeo espelhado (lateral)
    avItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (index !== currentIndex) {
          currentIndex = index
          updateCarousel()
        }
      })
    })

    // Setas inferiores manuais
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + avItems.length) % avItems.length
        updateCarousel()
      })
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % avItems.length
        updateCarousel()
      })
    }

    /* ════ Modal de Vídeo (Lightbox) ════ */
    const videoModal = document.getElementById('videoModal')
    const modalVideo = document.getElementById('modalVideo')
    const closeModalBtn = document.querySelector('.close-modal')

    if (videoModal && modalVideo) {
      // Abre modal ao clicar na área do card central
      avItems.forEach(item => {
        const bgVideo = item.querySelector('.bg-video')
        const clickTarget = item.querySelector('.av-video-ph') // Pega toda a tela do cartaz

        if (clickTarget && bgVideo) {
          clickTarget.addEventListener('click', e => {
            if (item.classList.contains('active')) {
              e.stopPropagation() // Evita vazamento pra carrossel

              const src = bgVideo.getAttribute('src')
              if (src) {
                // Se a URL mudou, atribui
                if (modalVideo.getAttribute('src') !== src) {
                  modalVideo.setAttribute('src', src)
                }

                // Transfere o tempo exato do poster rolando para o player do modal "Seamlessly"
                modalVideo.currentTime = bgVideo.currentTime

                videoModal.classList.add('show')
                modalVideo.play().catch(err => console.log('Erro de reprodução:', err))
              }
            }
          })
        }
      })

      // Fecha Modal
      function closeModal() {
        videoModal.classList.remove('show')
        modalVideo.pause()
        modalVideo.removeAttribute('src')
      }

      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal)
      }

      // Fecha ao clicar fora do vídeo
      videoModal.addEventListener('click', e => {
        if (e.target === videoModal) {
          closeModal()
        }
      })
    }

    // Dispara a lógica inicial
    updateCarousel()

    /* ════════════════════════════════
       CARROSSEL INTERATIVO — SOCIAL
    ════════════════════════════════ */
    const revealPhones = document.querySelectorAll('.reveal-phone')
    const phoneTimeouts = new Map()
    let socialCenterIndex = 2 // O terceiro celular (index 2) começa no centro

    function updateSocialPositions(centerIdx) {
      const total = revealPhones.length
      revealPhones.forEach((phone) => {
        const dataIdx = parseInt(phone.getAttribute('data-index'))
        // Calcula a posição (0 a 4) baseada no centro selecionado
        const pos = (dataIdx - centerIdx + 2 + total) % total
        
        // Mantém as classes base e re-adiciona active se necessário
        const wasActive = phone.classList.contains('active') || phone.dataset.shouldBeActive === 'true'
        phone.className = 'phone-item reveal-phone' 
        if (wasActive) phone.classList.add('active')
        
        phone.classList.add(`pos-${pos}`)
      })
    }

    const phoneObserverOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const phoneObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target
        const style = el.getAttribute('style') || ''
        const match = style.match(/--i:(\d+)/)
        const index = match ? parseInt(match[1]) : 0

        if (phoneTimeouts.has(el)) {
          clearTimeout(phoneTimeouts.get(el))
          phoneTimeouts.delete(el)
        }

        if (entry.isIntersecting) {
          const timeoutId = setTimeout(() => {
            el.classList.add('active')
            el.dataset.shouldBeActive = 'true'
          }, index * 150)
          phoneTimeouts.set(el, timeoutId)
        } else {
          el.classList.remove('active')
          el.dataset.shouldBeActive = 'false'
        }
      })
    }, phoneObserverOptions)

    // Inicializa posições e adiciona cliques
    updateSocialPositions(socialCenterIndex)
    
    revealPhones.forEach(phone => {
      phoneObserver.observe(phone)
      
      phone.addEventListener('click', () => {
        const clickedIdx = parseInt(phone.getAttribute('data-index'))
        socialCenterIndex = clickedIdx
        updateSocialPositions(socialCenterIndex)
      })
    })

    /* ════════════════════════════════
       11. GREEK GODS PARALLAX (SIDES)
       Movimentação premium nas laterais
    ════════════════════════════════ */
    /* ════════════════════════════════
       11. GREEK GODS SCATTER SCROLL
       Efeito de espalhamento: Começam na capa e se distribuem pelo site
    ════════════════════════════════ */
    const zeus = document.querySelector('.bg-zeus');
    const athena = document.querySelector('.bg-athena');
    const hermes = document.querySelector('.bg-hermes');
    const poseidon = document.querySelector('.bg-poseidon');

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      
      // Multiplicadores "Cinematográficos":
      // Movimentos extremamente lentos para que os deuses acompanhem o usuário
      // por quase toda a experiência, sumindo de forma imperceptível e sequencial.
      if (athena) athena.style.setProperty('--sy', `${y * -0.10}px`);  
      if (zeus) zeus.style.setProperty('--sy', `${y * -0.08}px`);      
      if (hermes) hermes.style.setProperty('--sy', `${y * -0.06}px`);  
      if (poseidon) poseidon.style.setProperty('--sy', `${y * -0.04}px`); 
    }, { passive: true });

    // Paralaxe ao mover o mouse (mantido para profundidade 3D)
    document.addEventListener('mousemove', (e) => {
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      const bgGods = [zeus, athena, hermes, poseidon];
      bgGods.forEach((god, i) => {
        if (!god) return;
        // Intensidades aumentadas para maior impacto visual (Paralaxe 3D)
        const intensity = 35 + (i * 35); 
        god.style.setProperty('--mx', `${dx * intensity}px`);
        god.style.setProperty('--my', `${dy * intensity}px`);
      });
    });
  }
})
