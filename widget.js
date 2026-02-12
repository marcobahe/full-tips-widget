/**
 * Full Funnel Help Widget v5
 * Design fiel ao "Modern Tutorial Center Final" do Marco
 * SVG icons inline (sem dependência de fontes externas)
 */
(function() {
  'use strict';

  // SVG Icons (24px viewBox)
  const ICONS = {
    help: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.07 12.85c.77-1.39 2.25-2.21 3.11-3.44.91-1.29.4-3.7-2.18-3.7-1.69 0-2.52 1.28-2.87 2.34L6.54 6.96C7.25 4.83 9.18 3 11.99 3c2.35 0 3.96.95 4.87 2.06.93 1.13 1.14 2.94.42 4.25-.86 1.55-2.18 2.3-2.93 3.46-.21.32-.34.68-.39 1.13h-3.17c.08-.97.31-1.58 1.28-3.05zM14 19.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zM9 4L6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0018.95 4H5.04c-.83 0-1.3.95-.79 1.61z"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z"/></svg>',
    label: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/></svg>',
    schedule: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 000-1.41l-6.58-6.6a.996.996 0 00-1.41 0 .996.996 0 000 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/></svg>',
    forum: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>'
  };

  const TUTORIALS_CONFIG = {
    contacts: {
      match: ['/contacts'],
      sectionName: 'contatos',
      tutorials: [
        { id: 'importar-contatos', icon: 'upload', gFrom: '#3b82f6', gTo: '#2563eb', shadow: 'rgba(59,130,246,0.3)', title: 'Como Importar Contatos', desc: 'Importe sua base via CSV em poucos cliques.', url: 'https://full.tips/tutorials/importacao-contatos/index.html', steps: '6 passos', dur: '3 min', available: true },
        { id: 'filtrar-contatos', icon: 'filter', gFrom: '#fbbf24', gTo: '#f97316', shadow: 'rgba(249,115,22,0.3)', title: 'Como Filtrar Contatos', desc: 'Use filtros avançados para encontrar quem precisa.', url: 'https://full.tips/tutorials/filtrar-contatos/index.html', steps: '6 passos', dur: '3 min', available: true },
        { id: 'smart-lists', icon: 'bolt', gFrom: '#34d399', gTo: '#0d9488', shadow: 'rgba(13,148,136,0.3)', title: 'Listas Inteligentes', desc: 'Crie segmentações automáticas que se atualizam.', url: 'https://full.tips/tutorials/listas-inteligentes/index.html', steps: '7 passos', dur: '4 min', available: true },
        { id: 'tags-contatos', icon: 'label', gFrom: '#fb7185', gTo: '#db2777', shadow: 'rgba(219,39,119,0.3)', title: 'Como Usar Tags', desc: 'Organize contatos com tags — individual ou em massa.', url: 'https://full.tips/tutorials/tags/index.html', steps: '7 passos', dur: '4 min', available: true }
      ]
    },
    conversations: {
      match: ['/conversations'],
      sectionName: 'Conversas',
      tutorials: [
        { id: 'navegando-inbox', icon: 'forum', gFrom: '#3b82f6', gTo: '#2563eb', shadow: 'rgba(59,130,246,0.3)', title: 'Navegando no Inbox', desc: 'Domine o inbox unificado — filtre, busque e gerencie conversas.', url: 'https://full.tips/tutorials/conversas-inbox/index.html', steps: '7 passos', dur: '3 min', available: true },
        { id: 'enviar-mensagem', icon: 'arrow', gFrom: '#34d399', gTo: '#0d9488', shadow: 'rgba(13,148,136,0.3)', title: 'Como enviar mensagens', desc: 'Envie mensagens por WhatsApp, SMS ou e-mail.', url: null, available: false },
      ]
    },
    calendars: { match: ['/calendars'], sectionName: 'Calendários', tutorials: [] },
    opportunities: { match: ['/opportunities'], sectionName: 'Leads', tutorials: [] },
    automation: { match: ['/automation', '/workflows'], sectionName: 'Automações', tutorials: [] },
    funnels: { match: ['/funnels', '/websites'], sectionName: 'Sites & Funis', tutorials: [] }
  };

  const STYLES = `
    :host { all:initial !important; position:fixed !important; z-index:99999 !important; }
    #ff-help-widget, #ff-help-widget * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif; -webkit-tap-highlight-color:transparent; }

    #ff-help-btn {
      position:fixed; bottom:40px; right:24px; width:56px; height:56px;
      border-radius:50%; background:white; border:1px solid #f3f4f6; color:#1f2937;
      cursor:pointer; box-shadow:0 15px 30px -5px rgba(0,0,0,0.3);
      transition:all 0.2s; z-index:99999; display:flex; align-items:center; justify-content:center;
    }
    #ff-help-btn:hover { transform:scale(1.05); }
    #ff-help-btn:active { transform:scale(0.9); }
    #ff-help-btn svg { width:28px; height:28px; pointer-events:none; }

    #ff-help-panel {
      position:fixed; top:16px; bottom:24px; right:24px; width:480px; max-width:95vw;
      background:white; border-radius:32px;
      box-shadow:0 -20px 25px -5px rgba(0,0,0,0.1), 0 -8px 10px -6px rgba(0,0,0,0.05), 0 20px 60px rgba(0,0,0,0.15);
      z-index:99998; overflow:hidden; display:flex; flex-direction:column;
      transform:scale(0.9) translateY(10px); opacity:0; pointer-events:none;
      transition:all 0.3s cubic-bezier(0.175,0.885,0.32,1.275); transform-origin:bottom right;
    }
    #ff-help-panel.open { transform:scale(1) translateY(0); opacity:1; pointer-events:all; }

    .ff-handle { display:flex; justify-content:center; padding:16px 0 12px; }
    .ff-handle span { width:36px; height:5px; background:rgba(0,0,0,0.1); border-radius:3px; }

    .ff-hdr-wrap { padding:0 24px 40px; }
    .ff-hdr {
      background:linear-gradient(135deg,#7C3AED,#6366F1); padding:28px; border-radius:24px;
      color:white; box-shadow:0 10px 25px -5px rgba(124,58,237,0.3);
    }
    .ff-hdr-top { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
    .ff-hdr-top svg { width:22px; height:22px; color:white; fill:white; }
    .ff-hdr-top h3 { font-size:20px; font-weight:700; color:white; letter-spacing:-0.3px; }
    .ff-hdr p { font-size:13px; color:#e9d5ff; line-height:1.5; opacity:0.9; }

    .ff-srch { padding:0 24px 40px; position:relative; }
    .ff-srch svg { position:absolute; left:40px; top:50%; transform:translateY(-50%); width:22px; height:22px; color:#9ca3af; fill:#9ca3af; pointer-events:none; }
    .ff-srch input {
      width:100%; padding:14px 14px 14px 48px; background:#f9fafb; border:none; border-radius:16px;
      font-size:14px; color:#1f2937; outline:none; font-family:inherit;
      box-shadow:inset 0 2px 4px rgba(0,0,0,0.04); transition:all 0.2s;
    }
    .ff-srch input::placeholder { color:#9ca3af; }
    .ff-srch input:focus { box-shadow:0 0 0 3px rgba(124,58,237,0.2); background:white; }

    .ff-lhdr { display:flex; align-items:center; justify-content:space-between; padding:0 28px 20px; }
    .ff-lhdr h4 { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#9ca3af; }
    .ff-lhdr span { font-size:11px; font-weight:600; color:#7c3aed; }

    .ff-list { flex:1; overflow-y:auto; padding:0 24px 24px; display:flex; flex-direction:column; gap:24px; }

    .ff-card {
      width:100%; text-align:left; background:white; padding:20px; border-radius:20px;
      border:1px solid #f3f4f6; box-shadow:0 1px 3px rgba(0,0,0,0.05);
      display:flex; gap:20px; align-items:center; cursor:pointer; transition:all 0.15s;
    }
    .ff-card:hover { box-shadow:0 4px 16px rgba(0,0,0,0.08); }
    .ff-card:active { transform:scale(0.98); }
    .ff-card.off { opacity:0.4; cursor:default; }
    .ff-card.off:hover { box-shadow:0 1px 3px rgba(0,0,0,0.05); }
    .ff-card.off:active { transform:none; }

    .ff-cico { width:48px; height:48px; flex-shrink:0; border-radius:14px; display:flex; align-items:center; justify-content:center; }
    .ff-cico svg { width:24px; height:24px; fill:white; color:white; pointer-events:none; }

    .ff-cbody { flex:1; min-width:0; }
    .ff-cbody h4 { font-size:15px; font-weight:600; color:#111827; margin-bottom:2px; }
    .ff-cbody p { font-size:13px; color:#6b7280; margin-bottom:10px; line-height:1.4; }
    .ff-cmeta { display:flex; align-items:center; gap:12px; }
    .ff-cmeta .bg { font-size:11px; font-weight:600; padding:3px 10px; background:#f3e8ff; color:#7c3aed; border-radius:9999px; }
    .ff-cmeta .tm { display:flex; align-items:center; gap:4px; font-size:11px; font-weight:500; color:#9ca3af; }
    .ff-cmeta .tm svg { width:14px; height:14px; fill:#9ca3af; pointer-events:none; }

    .ff-chev { color:#d1d5db; display:flex; align-items:center; }
    .ff-chev svg { width:24px; height:24px; fill:#d1d5db; pointer-events:none; }

    .ff-foot { padding:20px 24px; }
    .ff-foot button {
      width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
      padding:14px; background:transparent; border:2px solid transparent;
      color:#7c3aed; font-size:14px; font-weight:600; cursor:pointer;
      border-radius:16px; transition:all 0.2s; font-family:inherit;
    }
    .ff-foot button:hover { background:#faf5ff; border-color:#f3e8ff; }
    .ff-foot button svg { width:20px; height:20px; fill:#7c3aed; pointer-events:none; }

    .ff-sp { height:40px; background:white; flex-shrink:0; }

    #ff-tutorial-modal {
      position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:100000;
      display:none; align-items:center; justify-content:center; backdrop-filter:blur(4px);
    }
    #ff-tutorial-modal.open { display:flex; }
    #ff-tutorial-modal-inner {
      width:96vw; max-width:1400px; height:92vh; background:#0f0f1a;
      border-radius:12px; overflow:hidden; position:relative; box-shadow:0 24px 80px rgba(0,0,0,0.5);
    }
    #ff-tutorial-modal-close {
      position:absolute; top:8px; right:8px; width:28px; height:28px; border-radius:50%;
      background:white; border:none; color:#1e293b; font-size:14px; font-weight:700;
      cursor:pointer; z-index:100001; box-shadow:0 1px 4px rgba(0,0,0,0.2);
      display:flex; align-items:center; justify-content:center;
    }
    #ff-tutorial-modal-close:hover { background:#f1f5f9; }
    #ff-tutorial-iframe { width:100%; height:100%; border:none; }

    @media (max-width:768px) {
      #ff-help-panel { width:calc(100vw - 32px); right:16px; bottom:84px; }
      #ff-help-btn { bottom:16px; right:16px; }
      #ff-tutorial-modal-inner { width:100vw; height:100vh; border-radius:0; }
    }
  `;

  function icon(name) { return ICONS[name] || ''; }

  function getCurrentSection() {
    const path = window.location.pathname;
    for (const [key, s] of Object.entries(TUTORIALS_CONFIG)) {
      if (s.match && s.match.some(m => path.includes(m))) return { key, ...s };
    }
    return null;
  }

  function getTutorials() {
    const s = getCurrentSection();
    return s ? s.tutorials : [];
  }

  function getSeenTutorials() {
    try { return JSON.parse(localStorage.getItem('ff-seen-tutorials') || '[]'); } catch { return []; }
  }

  function markSeen(id) {
    const s = getSeenTutorials();
    if (!s.includes(id)) { s.push(id); localStorage.setItem('ff-seen-tutorials', JSON.stringify(s)); }
  }

  function renderPanel() {
    const section = getCurrentSection();
    const tutorials = getTutorials();
    const name = section ? (section.sectionName || section.key) : 'esta página';
    const avail = tutorials.filter(t => t.available).length;

    let h = `
      <div class="ff-handle"><span></span></div>
      <div class="ff-hdr-wrap"><div class="ff-hdr">
        <div class="ff-hdr-top">${icon('sparkle')}<h3>Central de Ajuda</h3></div>
        <p>Aprenda a dominar seus ${name} com tutoriais rápidos e interativos.</p>
      </div></div>
      <div class="ff-srch">${icon('search')}<input type="text" placeholder="O que você deseja aprender?" /></div>
      <div class="ff-lhdr"><h4>Tutoriais Recomendados</h4><span>${avail} disponíveis</span></div>
      <div class="ff-list">
    `;

    tutorials.forEach(t => {
      const cls = t.available ? '' : 'off';
      const icoStyle = `background:linear-gradient(135deg,${t.gFrom},${t.gTo});box-shadow:0 10px 15px -3px ${t.shadow};`;
      const meta = t.available
        ? `<div class="ff-cmeta"><span class="bg">${t.steps}</span><span class="tm">${icon('schedule')}${t.dur}</span></div>`
        : `<div class="ff-cmeta"><span class="tm">Em breve</span></div>`;
      h += `
        <div class="ff-card ${cls}" ${t.available ? `data-url="${t.url}" data-id="${t.id}"` : ''}>
          <div class="ff-cico" style="${icoStyle}">${icon(t.icon)}</div>
          <div class="ff-cbody"><h4>${t.title}</h4><p>${t.desc}</p>${meta}</div>
          ${t.available ? `<div class="ff-chev">${icon('chevron')}</div>` : ''}
        </div>`;
    });

    h += `</div>
      <div class="ff-foot"><button id="ff-all-tutorials">Ver todos os tutoriais ${icon('arrow')}</button></div>
      <div class="ff-sp"></div>`;
    return h;
  }

  let root; // shadow root reference

  function $(sel) { return root.querySelector(sel); }

  function init() {
    // Load Inter font in main document
    const l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);

    // Create host element
    const host = document.createElement('div');
    host.id = 'ff-help-widget-host';
    host.style.cssText = 'all:initial !important; position:fixed !important; z-index:99999 !important; bottom:0 !important; right:0 !important; pointer-events:none !important;';
    document.body.appendChild(host);

    // Shadow DOM — fully isolated from GHL styles
    root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>${STYLES}</style>
      <div id="ff-help-widget" style="pointer-events:auto;">
        <button id="ff-help-btn">${icon('help')}</button>
        <div id="ff-help-panel">${renderPanel()}</div>
        <div id="ff-tutorial-modal">
          <div id="ff-tutorial-modal-inner">
            <button id="ff-tutorial-modal-close">✕</button>
            <iframe id="ff-tutorial-iframe" src=""></iframe>
          </div>
        </div>
      </div>
    `;

    // Event listeners inside shadow
    $('#ff-help-btn').addEventListener('click', () => window.__ffWidget5.toggle());
    $('#ff-tutorial-modal-close').addEventListener('click', () => window.__ffWidget5.closeModal());

    // SPA navigation
    let lp = window.location.pathname;
    setInterval(() => { if (window.location.pathname !== lp) { lp = window.location.pathname; $('#ff-help-panel').innerHTML = renderPanel(); bindCardClicks(); } }, 1000);

    bindCardClicks();
  }

  function bindCardClicks() {
    root.querySelectorAll('.ff-card:not(.off)').forEach(card => {
      card.addEventListener('click', () => {
        const url = card.dataset.url;
        const id = card.dataset.id;
        if (url) window.__ffWidget5.openTutorial(url, id);
      });
    });
    const allBtn = root.querySelector('#ff-all-tutorials');
    if (allBtn) allBtn.addEventListener('click', () => window.open('https://full.tips', '_blank'));
  }

  window.__ffWidget5 = {
    toggle() {
      const p = $('#ff-help-panel');
      const b = $('#ff-help-btn');
      if (p.classList.contains('open')) { p.classList.remove('open'); b.innerHTML = icon('help'); }
      else { p.innerHTML = renderPanel(); bindCardClicks(); p.classList.add('open'); b.innerHTML = icon('close'); }
    },
    openTutorial(url, id) {
      $('#ff-tutorial-iframe').src = url;
      $('#ff-tutorial-modal').classList.add('open');
      if (id) markSeen(id);
      $('#ff-help-panel').classList.remove('open');
      $('#ff-help-btn').innerHTML = icon('help');
    },
    closeModal() {
      $('#ff-tutorial-modal').classList.remove('open');
      $('#ff-tutorial-iframe').src = '';
    }
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const m = $('#ff-tutorial-modal');
      if (m && m.classList.contains('open')) window.__ffWidget5.closeModal();
      else { const p = $('#ff-help-panel'); if (p && p.classList.contains('open')) window.__ffWidget5.toggle(); }
    }
  });
  document.addEventListener('click', e => {
    // Close if click outside shadow host
    const host = document.getElementById('ff-help-widget-host');
    if (host && !host.contains(e.target)) {
      const p = $('#ff-help-panel');
      if (p && p.classList.contains('open')) window.__ffWidget5.toggle();
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
