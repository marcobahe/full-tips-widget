/**
 * Full Funnel Help Widget v4
 * Conversão fiel do "Modern Tutorial Center Final" do Marco
 * Material Symbols Outlined + CSS puro (sem Tailwind)
 */
(function() {
  'use strict';

  const TUTORIALS_CONFIG = {
    global: [],
    contacts: {
      match: ['/contacts'],
      sectionName: 'contatos',
      tutorials: [
        { id: 'importar-contatos', icon: 'upload_file', gradientFrom: '#3b82f6', gradientTo: '#2563eb', shadowColor: 'rgba(59,130,246,0.3)', title: 'Como Importar Contatos', description: 'Importe sua base via CSV em poucos cliques.', url: 'https://full.tips/tutorials/importacao-contatos/index.html', steps: '6 passos', duration: '3 min', available: true },
        { id: 'filtrar-contatos', icon: 'filter_list', gradientFrom: '#fbbf24', gradientTo: '#f97316', shadowColor: 'rgba(249,115,22,0.3)', title: 'Como Filtrar Contatos', description: 'Use filtros avançados para encontrar quem precisa.', url: 'https://full.tips/tutorials/filtrar-contatos/index.html', steps: '6 passos', duration: '3 min', available: true },
        { id: 'smart-lists', icon: 'bolt', gradientFrom: '#34d399', gradientTo: '#0d9488', shadowColor: 'rgba(13,148,136,0.3)', title: 'Listas Inteligentes', description: 'Crie segmentações automáticas que se atualizam.', url: 'https://full.tips/tutorials/listas-inteligentes/index.html', steps: '7 passos', duration: '4 min', available: true },
        { id: 'tags-contatos', icon: 'label', gradientFrom: '#fb7185', gradientTo: '#db2777', shadowColor: 'rgba(219,39,119,0.3)', title: 'Como Usar Tags', description: 'Organize contatos com tags — individual ou em massa.', url: 'https://full.tips/tutorials/tags/index.html', steps: '7 passos', duration: '4 min', available: true }
      ]
    },
    conversations: {
      match: ['/conversations'],
      sectionName: 'Conversas',
      tutorials: [
        { id: 'navegando-inbox', icon: 'forum', gradientFrom: '#3b82f6', gradientTo: '#2563eb', shadowColor: 'rgba(59,130,246,0.3)', title: 'Navegando no Inbox', description: 'Domine o inbox unificado — filtre, busque e gerencie conversas.', url: 'https://full.tips/tutorials/conversas-inbox/index.html', steps: '7 passos', duration: '3 min', available: true },
        { id: 'enviar-mensagem', icon: 'send', gradientFrom: '#34d399', gradientTo: '#0d9488', shadowColor: 'rgba(13,148,136,0.3)', title: 'Como enviar mensagens', description: 'Envie mensagens por WhatsApp, SMS ou e-mail.', url: null, available: false },
        { id: 'templates-mensagem', icon: 'description', gradientFrom: '#fbbf24', gradientTo: '#f97316', shadowColor: 'rgba(249,115,22,0.3)', title: 'Como usar templates', description: 'Crie e use templates de mensagens.', url: null, available: false }
      ]
    },
    calendars: {
      match: ['/calendars'],
      sectionName: 'Calendários',
      tutorials: [
        { id: 'criar-calendario', icon: 'calendar_today', gradientFrom: '#3b82f6', gradientTo: '#2563eb', shadowColor: 'rgba(59,130,246,0.3)', title: 'Como criar um calendário', description: 'Configure calendários de agendamento.', url: null, available: false }
      ]
    },
    opportunities: {
      match: ['/opportunities'],
      sectionName: 'Leads',
      tutorials: [
        { id: 'criar-pipeline', icon: 'view_kanban', gradientFrom: '#6366f1', gradientTo: '#4f46e5', shadowColor: 'rgba(99,102,241,0.3)', title: 'Como criar um pipeline', description: 'Configure pipelines de vendas.', url: null, available: false }
      ]
    },
    automation: {
      match: ['/automation', '/workflows'],
      sectionName: 'Automações',
      tutorials: [
        { id: 'criar-workflow', icon: 'bolt', gradientFrom: '#fbbf24', gradientTo: '#f97316', shadowColor: 'rgba(249,115,22,0.3)', title: 'Como criar um workflow', description: 'Automatize tarefas com workflows.', url: null, available: false }
      ]
    },
    funnels: {
      match: ['/funnels', '/websites'],
      sectionName: 'Sites & Funis',
      tutorials: [
        { id: 'criar-funil', icon: 'language', gradientFrom: '#3b82f6', gradientTo: '#2563eb', shadowColor: 'rgba(59,130,246,0.3)', title: 'Como criar um funil', description: 'Construa funis de vendas e landing pages.', url: null, available: false }
      ]
    }
  };

  const STYLES = `
    #ff-help-widget * {
      margin: 0; padding: 0; box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }

    /* ── Botão flutuante ── */
    #ff-help-btn {
      position: fixed;
      bottom: 40px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: white;
      border: 1px solid #f3f4f6;
      color: #1f2937;
      cursor: pointer;
      box-shadow: 0 15px 30px -5px rgba(0,0,0,0.3);
      transition: all 0.2s ease;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #ff-help-btn:hover { transform: scale(1.05); }
    #ff-help-btn:active { transform: scale(0.9); }
    #ff-help-btn .material-symbols-outlined { font-size: 26px; font-weight: 700; }

    /* ── Painel ── */
    #ff-help-panel {
      position: fixed;
      bottom: 108px;
      right: 24px;
      width: 480px;
      max-height: 85vh;
      background: white;
      border-radius: 32px;
      box-shadow: 0 -20px 25px -5px rgba(0,0,0,0.1), 0 -8px 10px -6px rgba(0,0,0,0.05), 0 20px 60px rgba(0,0,0,0.15);
      z-index: 99998;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transform: scale(0.9) translateY(10px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform-origin: bottom right;
    }
    #ff-help-panel.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* ── Handle ── */
    .ff-handle { display: flex; justify-content: center; padding: 16px 0; }
    .ff-handle span { width: 36px; height: 5px; background: rgba(0,0,0,0.1); border-radius: 3px; }

    /* ── Header ── */
    .ff-header-wrap { padding: 0 24px 24px; }
    .ff-header {
      background: linear-gradient(135deg, #7C3AED 0%, #6366F1 100%);
      padding: 24px;
      border-radius: 24px;
      color: white;
      box-shadow: 0 10px 25px -5px rgba(124,58,237,0.3);
    }
    .ff-header-top { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .ff-header-top .material-symbols-outlined { font-size: 28px; color: white; }
    .ff-header-top h3 { font-size: 24px; font-weight: 700; color: white; letter-spacing: -0.5px; }
    .ff-header p { font-size: 14px; color: #e9d5ff; line-height: 1.5; opacity: 0.9; }

    /* ── Search ── */
    .ff-search { padding: 0 24px 24px; position: relative; }
    .ff-search .material-symbols-outlined {
      position: absolute; left: 40px; top: 50%; transform: translateY(-50%);
      color: #9ca3af; font-size: 22px; transition: color 0.2s;
    }
    .ff-search input {
      width: 100%; padding: 16px 16px 16px 52px;
      background: #f9fafb; border: none; border-radius: 16px;
      font-size: 15px; color: #1f2937; outline: none; font-family: inherit;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.04);
      transition: all 0.2s;
    }
    .ff-search input::placeholder { color: #9ca3af; }
    .ff-search input:focus { box-shadow: 0 0 0 3px rgba(124,58,237,0.2); background: white; }

    /* ── List ── */
    .ff-list-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 28px 12px;
    }
    .ff-list-header h4 {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1.5px; color: #9ca3af;
    }
    .ff-list-header span { font-size: 11px; font-weight: 600; color: #7c3aed; }

    .ff-list {
      flex: 1; overflow-y: auto;
      padding: 0 24px 40px;
      display: flex; flex-direction: column; gap: 16px;
    }

    /* ── Card ── */
    .ff-card {
      width: 100%; text-align: left; background: white;
      padding: 20px; border-radius: 24px;
      border: 1px solid #f3f4f6;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      display: flex; gap: 20px; align-items: center;
      cursor: pointer; transition: all 0.15s ease;
      font-family: inherit;
    }
    .ff-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    .ff-card:active { transform: scale(0.98); }
    .ff-card.disabled { opacity: 0.4; cursor: default; }
    .ff-card.disabled:hover { box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .ff-card.disabled:active { transform: none; }

    .ff-card-icon {
      width: 56px; height: 56px; flex-shrink: 0;
      border-radius: 16px; display: flex;
      align-items: center; justify-content: center;
    }
    .ff-card-icon .material-symbols-outlined { font-size: 30px; color: white; }

    .ff-card-body { flex: 1; min-width: 0; }
    .ff-card-body h4 { font-size: 17px; font-weight: 700; color: #111827; margin-bottom: 2px; }
    .ff-card-body p { font-size: 14px; color: #6b7280; margin-bottom: 12px; line-height: 1.4; }
    .ff-card-meta { display: flex; align-items: center; gap: 16px; }
    .ff-card-meta .badge {
      font-size: 12px; font-weight: 700; padding: 4px 12px;
      background: #f3e8ff; color: #7c3aed; border-radius: 9999px;
    }
    .ff-card-meta .time {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 500; color: #9ca3af;
    }
    .ff-card-meta .time .material-symbols-outlined { font-size: 16px; }

    .ff-card-chevron { color: #d1d5db; display: flex; align-items: center; }
    .ff-card-chevron .material-symbols-outlined { font-size: 24px; }

    /* ── Footer ── */
    .ff-footer { padding: 24px 24px 24px; }
    .ff-footer button {
      width: 100%; display: flex; align-items: center;
      justify-content: center; gap: 8px; padding: 16px;
      background: transparent; border: 2px solid transparent;
      color: #7c3aed; font-size: 15px; font-weight: 700;
      cursor: pointer; border-radius: 16px; transition: all 0.2s;
      font-family: inherit;
    }
    .ff-footer button:hover { background: #faf5ff; border-color: #f3e8ff; }
    .ff-footer button .material-symbols-outlined { font-size: 20px; }

    /* ── Spacer ── */
    .ff-spacer { height: 40px; background: white; flex-shrink: 0; }

    /* ── Modal ── */
    #ff-tutorial-modal {
      position: fixed; inset: 0; background: rgba(0,0,0,0.7);
      z-index: 100000; display: none; align-items: center; justify-content: center;
      backdrop-filter: blur(4px);
    }
    #ff-tutorial-modal.open { display: flex; }
    #ff-tutorial-modal-inner {
      width: 96vw; max-width: 1400px; height: 92vh;
      background: #0f0f1a; border-radius: 12px; overflow: hidden;
      position: relative; box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    }
    #ff-tutorial-modal-close {
      position: absolute; top: 8px; right: 8px; width: 28px; height: 28px;
      border-radius: 50%; background: white; border: none; color: #1e293b;
      font-size: 14px; font-weight: 700; cursor: pointer; z-index: 100001;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      display: flex; align-items: center; justify-content: center;
    }
    #ff-tutorial-modal-close:hover { background: #f1f5f9; }
    #ff-tutorial-iframe { width: 100%; height: 100%; border: none; }

    @media (max-width: 768px) {
      #ff-help-panel { width: calc(100vw - 32px); right: 16px; bottom: 84px; }
      #ff-help-btn { bottom: 16px; right: 16px; }
      #ff-tutorial-modal-inner { width: 100vw; height: 100vh; border-radius: 0; }
    }
  `;

  function getCurrentSection() {
    const path = window.location.pathname;
    for (const [key, section] of Object.entries(TUTORIALS_CONFIG)) {
      if (key === 'global') continue;
      if (section.match && section.match.some(m => path.includes(m))) return { key, ...section };
    }
    return null;
  }

  function getAvailableTutorials() {
    const section = getCurrentSection();
    return section ? section.tutorials.map(t => ({ ...t, section: section.key })) : [];
  }

  function getSeenTutorials() {
    try { return JSON.parse(localStorage.getItem('ff-seen-tutorials') || '[]'); } catch { return []; }
  }

  function markTutorialSeen(id) {
    const seen = getSeenTutorials();
    if (!seen.includes(id)) { seen.push(id); localStorage.setItem('ff-seen-tutorials', JSON.stringify(seen)); }
  }

  function renderPanel() {
    const section = getCurrentSection();
    const tutorials = getAvailableTutorials();
    const sectionName = section ? (section.sectionName || section.key) : 'esta página';
    const availCount = tutorials.filter(t => t.available).length;

    let html = `
      <div class="ff-handle"><span></span></div>
      <div class="ff-header-wrap">
        <div class="ff-header">
          <div class="ff-header-top">
            <span class="material-symbols-outlined">auto_awesome</span>
            <h3>Central de Ajuda</h3>
          </div>
          <p>Aprenda a dominar seus ${sectionName} com tutoriais rápidos e interativos.</p>
        </div>
      </div>
      <div class="ff-search">
        <span class="material-symbols-outlined">search</span>
        <input type="text" placeholder="O que você deseja aprender?" />
      </div>
      <div class="ff-list-header">
        <h4>Tutoriais Recomendados</h4>
        <span>${availCount} disponíveis</span>
      </div>
      <div class="ff-list">
    `;

    tutorials.forEach(t => {
      const cls = t.available ? '' : 'disabled';
      const iconStyle = `background: linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo}); box-shadow: 0 10px 15px -3px ${t.shadowColor};`;
      const meta = t.available
        ? `<div class="ff-card-meta">
            <span class="badge">${t.steps}</span>
            <span class="time"><span class="material-symbols-outlined">schedule</span>${t.duration}</span>
          </div>`
        : `<div class="ff-card-meta"><span class="time">Em breve</span></div>`;

      html += `
        <div class="ff-card ${cls}" ${t.available ? `onclick="window.__ffWidget.openTutorial('${t.url}', '${t.id}')"` : ''}>
          <div class="ff-card-icon" style="${iconStyle}">
            <span class="material-symbols-outlined">${t.icon}</span>
          </div>
          <div class="ff-card-body">
            <h4>${t.title}</h4>
            <p>${t.description}</p>
            ${meta}
          </div>
          ${t.available ? '<div class="ff-card-chevron"><span class="material-symbols-outlined">chevron_right</span></div>' : ''}
        </div>
      `;
    });

    html += `
      </div>
      <div class="ff-footer">
        <button onclick="window.open('https://full.tips','_blank')">
          Ver todos os tutoriais
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
      <div class="ff-spacer"></div>
    `;

    return html;
  }

  function init() {
    // Fonts
    const l1 = document.createElement('link'); l1.rel = 'stylesheet';
    l1.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
    document.head.appendChild(l1);
    const l2 = document.createElement('link'); l2.rel = 'stylesheet';
    l2.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(l2);

    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);

    const widget = document.createElement('div');
    widget.id = 'ff-help-widget';
    widget.innerHTML = `
      <button id="ff-help-btn" onclick="window.__ffWidget.toggle()">
        <span class="material-symbols-outlined">help</span>
      </button>
      <div id="ff-help-panel">${renderPanel()}</div>
      <div id="ff-tutorial-modal">
        <div id="ff-tutorial-modal-inner">
          <button id="ff-tutorial-modal-close" onclick="window.__ffWidget.closeModal()">✕</button>
          <iframe id="ff-tutorial-iframe" src=""></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(widget);

    let lastPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        const panel = document.getElementById('ff-help-panel');
        if (panel) panel.innerHTML = renderPanel();
      }
    }, 1000);
  }

  window.__ffWidget = {
    toggle() {
      const panel = document.getElementById('ff-help-panel');
      const btn = document.getElementById('ff-help-btn');
      const icon = btn.querySelector('.material-symbols-outlined');
      if (panel.classList.contains('open')) {
        panel.classList.remove('open');
        icon.textContent = 'help';
      } else {
        panel.innerHTML = renderPanel();
        panel.classList.add('open');
        icon.textContent = 'close';
      }
    },
    openTutorial(url, id) {
      document.getElementById('ff-tutorial-iframe').src = url;
      document.getElementById('ff-tutorial-modal').classList.add('open');
      if (id) markTutorialSeen(id);
      document.getElementById('ff-help-panel').classList.remove('open');
      document.getElementById('ff-help-btn').querySelector('.material-symbols-outlined').textContent = 'help';
    },
    closeModal() {
      document.getElementById('ff-tutorial-modal').classList.remove('open');
      document.getElementById('ff-tutorial-iframe').src = '';
    }
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('ff-tutorial-modal');
      if (modal && modal.classList.contains('open')) window.__ffWidget.closeModal();
      else { const p = document.getElementById('ff-help-panel'); if (p && p.classList.contains('open')) window.__ffWidget.toggle(); }
    }
  });

  document.addEventListener('click', e => {
    const w = document.getElementById('ff-help-widget');
    if (w && !w.contains(e.target)) {
      const p = document.getElementById('ff-help-panel');
      if (p && p.classList.contains('open')) window.__ffWidget.toggle();
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
