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
     2.5. HUD PARALLAX (SOBRE MIM)
  ════════════════════════════════ */
  const hudAboutWrap = document.getElementById('hud-about-wrap')
  const pLayers = document.querySelectorAll('.p-layer')

  if (hudAboutWrap) {
    hudAboutWrap.addEventListener('mousemove', e => {
      const rect = hudAboutWrap.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

      pLayers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth || 0.1)
        const moveX = x * depth * 40
        const moveY = y * depth * 40
        const rotX = y * depth * -10
        const rotY = x * depth * 10
        
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
      })
    })

    hudAboutWrap.addEventListener('mouseleave', () => {
      pLayers.forEach(layer => {
        layer.style.transform = ''
      })
    })
  }


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

    vivax: {
      company: 'Vivax',
      title: 'Coordenador de Marketing',
      brief:
        'Liderança de equipe criativa e estratégica na Vivax, focada em branding digital e campanhas de alta performance.',
      time: '2023 - Presente',
      tools: ['Ps', 'Ai', 'Ae', 'Pr'],
      industry: 'Tecnologia',
      mainImg: '/assets/social/social-1.jpg',
    },
    zeepo: {
      company: 'Zeepo',
      title: 'Coordenador de Marketing',
      brief:
        'Gestão de marca e estratégias de social media para a Zeepo Motors, com foco em lançamento de produtos e engajamento.',
      time: '2022 - 2023',
      tools: ['Ps', 'Ai', 'Pr'],
      industry: 'Automobilístico',
      mainImg: '/assets/zeepo/Post - EZ2.jpg',
      gallery: [
        '/assets/zeepo/Post - EZ2.jpg',
        '/assets/zeepo/12.jpg',
        '/assets/zeepo/16.jpg',
        '/assets/zeepo/18.jpg',
        '/assets/zeepo/20.jpg',
        '/assets/zeepo/21.jpg',
        '/assets/zeepo/Banner 360 imprimir.jpg',
        '/assets/zeepo/Criativo Fábio.jpg'
      ],
      assets: [
        '/assets/zeepo/20.jpg',
        '/assets/zeepo/18.jpg',
        '/assets/zeepo/12.jpg'
      ]
    },

    grupoaxis: {
      company: 'Grupo Axis',
      title: 'Diretor de Arte',
      brief:
        'Desenvolvimento de identidades visuais e campanhas publicitárias para diversos clientes do Grupo Axis.',
      time: '2021 - 2022',
      tools: ['Ai', 'Ps', 'Id'],
      industry: 'Publicidade',
      mainImg: '/assets/social/social-3.jpg',
      gallery: [
        '/assets/axis/1.jpg',
        '/assets/axis/2.jpg',
        '/assets/axis/3.jpg',
        '/assets/axis/4.jpg',
        '/assets/axis/5.jpg',
        '/assets/axis/6.jpg',
        '/assets/axis/7.jpg',
        '/assets/axis/8.jpg'
      ],
      assets: [
        '/assets/axis/3.jpg',
        '/assets/axis/6.jpg',
        '/assets/axis/1.jpg'
      ]
    },
    wjg: {
      company: 'WJG',
      title: 'Designer Gráfico Sênior',
      brief:
        'Criação de materiais gráficos complexos e suporte na direção criativa para projetos da WJG.',
      time: '2020 - 2021',
      tools: ['Ai', 'Ps'],
      industry: 'Design',
      mainImg: '/assets/social/social-4.jpg',
    },
    sociallab: {
      company: 'Social Lab',
      title: 'Social Media Designer',
      brief:
        'Especialista em design para redes sociais, criando conteúdo dinâmico e estratégico para marcas globais.',
      time: '2019 - 2020',
      tools: ['Ps', 'Ae'],
      industry: 'Social Media',
      mainImg: '/assets/social/social-5.jpg',
    },
    esporadicos: {
      company: 'Esporádicos',
      title: 'Projetos Selecionados',
      brief:
        'Coleção de trabalhos independentes e projetos esporádicos desenvolvidos ao longo da carreira, abrangendo branding, audiovisual e design para streamers.',
      time: 'Diverso',
      tools: ['Ai', 'Ps', 'Ae', 'Pr'],
      industry: 'Multidisciplinar',
      mainImg: '/assets/esporadicos/4.jpg',
      gallery: [
        '/assets/esporadicos/1.jpg',
        '/assets/esporadicos/2.jpg',
        '/assets/esporadicos/3.jpg',
        '/assets/esporadicos/4.jpg',
        '/assets/esporadicos/gamer/gamer-video-1.mp4',
        '/assets/esporadicos/gamer/gamer-video-2.mp4',
        '/assets/esporadicos/gamer/logo-gamer.png',
        '/assets/esporadicos/gamer/gamer-cam.png',
        '/assets/esporadicos/leela/1.jpg',
        '/assets/esporadicos/leela/2.jpg',
        '/assets/esporadicos/leela/3.jpg',
        '/assets/esporadicos/leela/4.jpg',
        '/assets/esporadicos/leela/5.jpg',
        '/assets/esporadicos/leela/6.jpg',
        '/assets/esporadicos/leela/7.jpg',
        '/assets/esporadicos/leela/8.jpg',
        '/assets/esporadicos/leela/9.jpg',
        '/assets/esporadicos/leela/10.jpg',
        '/assets/esporadicos/leela/11.jpg',
        '/assets/esporadicos/leela/12.jpg',
        '/assets/esporadicos/leela/13.jpg',
        '/assets/esporadicos/leela/14.jpg',
        '/assets/esporadicos/leela/15.jpg',
        '/assets/esporadicos/leela/16.jpg'
      ],
      assets: [
        '/assets/esporadicos/leela/1.jpg',
        '/assets/esporadicos/gamer/logo-gamer.png',
        '/assets/esporadicos/2.jpg'
      ]
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
  const expoGrid = document.querySelector('.expo-grid')

  const populateAndOpenModal = (type, skipPushState = false) => {
    const data = EXP_DATA[type]
    if (!expoModal || !data) return

    if (expoRole) expoRole.textContent = data.title
    if (expoCompany) {
      expoCompany.textContent = data.company
      expoCompany.setAttribute('data-text', data.company)
    }
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
    if (expoHeroImg) expoHeroImg.src = data.mainImg

    // Galeria (Exploração Visual)
    if (expoGrid) {
      expoGrid.innerHTML = ''
      if (data.gallery && data.gallery.length > 0) {
        data.gallery.forEach((url, index) => {
          const isVideo = url.toLowerCase().endsWith('.mp4');
          const gridItem = document.createElement('div');
          gridItem.className = 'grid-item' + (isVideo ? ' is-video' : '');
          
          // Se for vídeo, usamos o logotipo do Pdrzeera como capa com preenchimento total
          let thumbUrl = isVideo ? '/assets/esporadicos/gamer/logo-gamer.png' : url;
          let content = `<div class="img-ph" style="background-image: url('${thumbUrl}'); background-size: cover; background-position: center; ${isVideo ? 'filter: brightness(0.5) saturate(1.1);' : ''}"></div>`;
          
          if (isVideo) {
            content += `
              <div class="video-indicator">
                <span class="play-icon">▶</span>
                <span class="indicator-text">VIDEO</span>
              </div>
              <div class="video-glow-overlay"></div>
            `;
          }
          
          gridItem.innerHTML = content;
          
          // Clique para abrir o Lightbox adequado
          gridItem.addEventListener('click', (e) => {
            e.stopPropagation()
            if (isVideo) {
              const vModal = document.getElementById('videoModal');
              const vVideo = document.getElementById('modalVideo');
              if (vModal && vVideo) {
                vVideo.src = url;
                vModal.classList.add('show');
                vVideo.play().catch(err => console.log('Erro ao tocar vídeo:', err));
              }
            } else {
              // Filtra apenas imagens para manter a navegação da galeria consistente
              const imageOnlyGallery = data.gallery.filter(u => !u.toLowerCase().endsWith('.mp4'));
              const imgIdx = imageOnlyGallery.indexOf(url);
              openImageGallery(imageOnlyGallery, imgIdx);
            }
          })

          expoGrid.appendChild(gridItem)
        })
      }
    }


    // Cartões Flutuantes (Assets)
    const asset1 = expoModal.querySelector('.card-1')
    const asset2 = expoModal.querySelector('.card-2')
    const asset3 = expoModal.querySelector('.card-3')
    
    const secondaryImgs = data.assets || [data.mainImg, data.mainImg, data.mainImg]
    
    if (asset1) asset1.style.backgroundImage = `url(${secondaryImgs[0] || data.mainImg})`
    if (asset2) asset2.style.backgroundImage = `url(${secondaryImgs[1] || data.mainImg})`
    if (asset3) asset3.style.backgroundImage = `url(${secondaryImgs[2] || data.mainImg})`


    // Abre o Modal com lock de scroll
    expoModal.classList.add('open')
    toggleScrollLock(true)

    // Adiciona ao histórico se não estivermos vindo de um popstate
    if (!skipPushState) {
      history.pushState({ modalOpen: true, modalType: type }, '')
    }

    /* ── INTERATIVIDADE 3D ── */
    const expoHero = expoModal.querySelector('.expo-hero')
    const mockupWrap = expoModal.querySelector('.phone-mockup-wrap')
    const cards = [asset1, asset2, asset3]

    if (expoHero && mockupWrap) {
      mockupWrap.style.transform = ''
      cards.forEach(card => {
        if (card) {
          card.style.transform = ''
          card.classList.remove('is-playing')
        }
      })

      expoHero.onmousemove = (e) => {
        if (!expoModal.classList.contains('open')) return
        const rect = expoHero.getBoundingClientRect()
        const cx = rect.width / 2
        const cy = rect.height / 2
        const dx = (e.clientX - rect.left - cx) / cx
        const dy = (e.clientY - rect.top - cy) / cy
        mockupWrap.style.transform = `rotateX(${dy * -12}deg) rotateY(${dx * 12}deg)`
        cards.forEach((card, i) => {
          if (card) {
            const depth = (i + 1) * 20
            card.style.marginLeft = `${dx * depth}px`
            card.style.marginTop = `${dy * depth}px`
          }
        })
      }

      expoHero.onmouseleave = () => {
        mockupWrap.style.transform = ''
        cards.forEach(card => {
          if (card) {
            card.style.marginLeft = '0'
            card.style.marginTop = '0'
          }
        })
      }

      const modalScrollHint = document.getElementById('modal-scroll-hint')
      const observerOptions = { root: expoModal, threshold: 0.1 }
      const modalScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            cards.forEach(card => card && card.classList.add('is-playing'))
            if (modalScrollHint) modalScrollHint.classList.remove('hidden')
          } else {
            if (entry.boundingClientRect.top < 0) {
              cards.forEach(card => card && card.classList.remove('is-playing'))
              if (modalScrollHint) modalScrollHint.classList.add('hidden')
            }
          }
        })
      }, observerOptions)

      modalScrollObserver.observe(expoHero)
      expoModal._observer = modalScrollObserver
    }
  }

  careerItems.forEach(item => {
    item.addEventListener('click', () => {
      populateAndOpenModal(item.dataset.modal)
    })
  })

  const closeExpoModal = () => {
    if (expoModal.classList.contains('open')) {
      expoModal.classList.remove('open')
      toggleScrollLock(false)
      if (expoModal._observer) expoModal._observer.disconnect()
      const allCards = expoModal.querySelectorAll('.floating-social-card')
      allCards.forEach(c => c.classList.remove('is-playing'))
    }
  }



  if (expoClose) {
    expoClose.addEventListener('click', () => {
      // Se abrimos o modal com pushState, voltamos no histórico
      if (history.state && history.state.modalOpen) {
        history.back()
      } else {
        closeExpoModal()
      }
    })
  }

  // Listener para o botão "Voltar" e "Avançar" (popstate)
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.modalOpen) {
      // Se o estado tem modalOpen, abrimos o modal (Forward case)
      populateAndOpenModal(event.state.modalType, true)
    } else {
      // Se não, fechamos (Back case)
      closeExpoModal()
    }
  })


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

  // ── CENA 3D DA JORNADA (PARALLAX E INCLINAÇÃO) ──
  const journeyScene = document.getElementById('journey-3d-scene')
  const sceneInner = journeyScene?.querySelector('.scene-inner')

  if (journeyScene && sceneInner) {
    const photo = journeyScene.querySelector('.journey-photo-3d')
    const hand = journeyScene.querySelector('.hand-cutout')

    journeyScene.addEventListener('mousemove', (e) => {
      const rect = journeyScene.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const moveX = (e.clientX - centerX) / (rect.width / 2)
      const moveY = (e.clientY - centerY) / (rect.height / 2)

      // Rotação da cena (Reduzida para 6deg para realismo)
      sceneInner.style.transform = `rotateY(${moveX * 6}deg) rotateX(${moveY * -6}deg)`

      // RGB Split Dinâmico (Limitado a 2px para profundidade sutil)
      if (photo) {
        const splitX = moveX * 2.5
        photo.style.filter = `contrast(1.15) brightness(1.05) saturate(0.92) drop-shadow(${splitX}px 0 2px rgba(255,0,0,0.15)) drop-shadow(${-splitX}px 0 2px rgba(0,255,255,0.15))`
      }
      if (hand) {
        const splitX = moveX * 2
        hand.style.filter = `contrast(1.1) brightness(1.1) saturate(0.92) drop-shadow(${splitX}px 0 1px rgba(255,0,0,0.1)) drop-shadow(${-splitX}px 0 1px rgba(0,255,255,0.1))`
      }

      // Parallax sutil entre camadas
      const layers = journeyScene.querySelectorAll('.scene-layer')
      layers.forEach((layer) => {
        const depth = layer.classList.contains('layer-fg') ? 12 :
          layer.classList.contains('layer-ui') ? 8 : 4
        const tx = moveX * depth
        const ty = moveY * depth
        const currentZ = layer.classList.contains('layer-fg') ? 280 :
          layer.classList.contains('layer-ui') ? 120 : -150
        layer.style.transform = `translate3d(${tx}px, ${ty}px, ${currentZ}px)`
      })
    })

    journeyScene.addEventListener('mouseleave', () => {
      sceneInner.style.transform = 'rotateY(0deg) rotateX(0deg)'
      if (photo) photo.style.filter = 'contrast(1.15) brightness(1.05) saturate(0.92)'
      if (hand) hand.style.filter = 'contrast(1.1) brightness(1.1) saturate(0.92)'

      const layers = journeyScene.querySelectorAll('.scene-layer')
      layers.forEach((layer) => {
        const currentZ = layer.classList.contains('layer-fg') ? 280 :
          layer.classList.contains('layer-ui') ? 120 : -150
        layer.style.transform = `translate3d(0, 0, ${currentZ}px)`
      })
    })
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
  const btnPrev = document.querySelector('.av-prev')
  const btnNext = document.querySelector('.av-next')

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
          const vids = item.querySelectorAll('video')
          vids.forEach(vid => {
            vid.muted = true
            vid.play().catch(e => e)
          })
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
    const modalBlurVideo = document.getElementById('modalBlurVideo')
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
                if (modalVideo.src !== new URL(src, window.location.origin).href) {
                  modalVideo.src = src
                  if (modalBlurVideo) modalBlurVideo.src = src
                }

                modalVideo.loop = true // Garantia via JS
                if (modalBlurVideo) modalBlurVideo.loop = true

                // Transfere o tempo exato do poster rolando para o player do modal "Seamlessly"
                modalVideo.currentTime = bgVideo.currentTime
                if (modalBlurVideo) modalBlurVideo.currentTime = bgVideo.currentTime

                videoModal.classList.add('show')
                modalVideo.play().catch(err => console.log('Erro de reprodução:', err))
                if (modalBlurVideo) modalBlurVideo.play().catch(err => console.log('Erro de reprodução:', err))
              }
            }
          })
        }
      })

      // Fecha Modal
      function closeModal() {
        videoModal.classList.remove('show')
        modalVideo.pause()
        if (modalBlurVideo) modalBlurVideo.pause()
        modalVideo.removeAttribute('src')
        if (modalBlurVideo) modalBlurVideo.removeAttribute('src')
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

    // ── Autoplay para Social Media ──
    let socialInterval = setInterval(() => {
      socialCenterIndex = (socialCenterIndex + 1) % revealPhones.length
      updateSocialPositions(socialCenterIndex)
    }, 5000)

    function resetSocialInterval() {
      clearInterval(socialInterval)
      socialInterval = setInterval(() => {
        socialCenterIndex = (socialCenterIndex + 1) % revealPhones.length
        updateSocialPositions(socialCenterIndex)
      }, 5000)
    }

    revealPhones.forEach(phone => {
      phoneObserver.observe(phone)

      phone.addEventListener('click', () => {
        const clickedIdx = parseInt(phone.getAttribute('data-index'))
        socialCenterIndex = clickedIdx
        updateSocialPositions(socialCenterIndex)
        resetSocialInterval()
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
    /* ════════════════════════════════
       12. LIGHTBOX DE GALERIA DE IMAGENS
    ════════════════════════════════ */
    const imageGalleryModal = document.getElementById('imageGalleryModal');
    const galleryFullImage = document.getElementById('galleryFullImage');
    const closeImageGallery = document.getElementById('closeImageGallery');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');
    const galleryCounter = document.getElementById('galleryCounter');

    let currentGallery = [];
    let currentImageIndex = 0;

    window.openImageGallery = function(images, index, skipPushState = false) {
      currentGallery = images;
      currentImageIndex = index;
      updateGalleryView();
      imageGalleryModal.classList.add('show');
      toggleScrollLock(true);

      if (!skipPushState) {
        // Preserva o tipo do modal atual no estado
        const currentType = history.state?.modalType;
        history.pushState({ modalOpen: true, modalType: currentType, lightboxOpen: true, imageIndex: index }, '');
      }
    };

    function updateGalleryView() {
      if (galleryFullImage && currentGallery[currentImageIndex]) {
        galleryFullImage.src = currentGallery[currentImageIndex];
        if (galleryCounter) {
          galleryCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
        }
      }
    }

    function closeGallery() {
      imageGalleryModal.classList.remove('show');
      // Só remove o lock se o modal principal também estiver fechado
      if (!expoModal.classList.contains('open')) {
        toggleScrollLock(false);
      }
    }

    if (closeImageGallery) {
      closeImageGallery.addEventListener('click', () => {
        if (history.state && history.state.lightboxOpen) {
          history.back();
        } else {
          closeGallery();
        }
      });
    }

    const navigateGallery = (direction) => {
      currentImageIndex = (currentImageIndex + direction + currentGallery.length) % currentGallery.length;
      updateGalleryView();
      // Atualiza o estado atual sem criar uma nova entrada (replaceState) para não poluir o histórico
      history.replaceState({ ...history.state, imageIndex: currentImageIndex }, '');
    };

    if (prevImageBtn) {
      prevImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(-1);
      });
    }

    if (nextImageBtn) {
      nextImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(1);
      });
    }

    imageGalleryModal.addEventListener('click', (e) => {
      if (e.target === imageGalleryModal) {
        if (history.state && history.state.lightboxOpen) history.back();
        else closeGallery();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!imageGalleryModal.classList.contains('show')) return;
      if (e.key === 'Escape') {
        if (history.state && history.state.lightboxOpen) history.back();
        else closeGallery();
      }
      if (e.key === 'ArrowLeft') navigateGallery(-1);
      if (e.key === 'ArrowRight') navigateGallery(1);
    });

    // Listener de Histórico Aprimorado (Popstate)
    window.addEventListener('popstate', (event) => {
      const state = event.state;
      
      if (state && state.modalOpen) {
        // Se o modal principal deve estar aberto
        if (!expoModal.classList.contains('open')) {
          populateAndOpenModal(state.modalType, true);
        }

        // Se o lightbox deve estar aberto
        if (state.lightboxOpen) {
          const data = EXP_DATA[state.modalType];
          if (data && data.gallery) {
            window.openImageGallery(data.gallery, state.imageIndex, true);
          }
        } else {
          closeGallery();
        }
      } else {
        // Fecha tudo
        closeGallery();
        closeExpoModal();
      }
    });
  }
})


