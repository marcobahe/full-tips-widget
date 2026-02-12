/**
 * Full Funnel Help Widget v3
 * Baseado no design "Modern Tutorial Center V2" do Marco
 */
(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // CONFIGURAÇÃO DOS TUTORIAIS POR PÁGINA
  // ═══════════════════════════════════════════
  const TUTORIALS_CONFIG = {
    global: [
      { id: 'visao-geral', materialIcon: 'home', iconColor: '#6366f1', iconBg: '#eef2ff', title: 'Visão geral da plataforma', url: null, available: false }
    ],
    contacts: {
      match: ['/contacts'],
      tutorials: [
        { id: 'importar-contatos', materialIcon: 'upload_file', iconColor: '#3b82f6', iconBg: '#eff6ff', title: 'Como Importar Contatos', description: 'Importe sua base via CSV em poucos cliques.', url: 'https://full.tips/tutorials/importacao-contatos/index.html', steps: '6 passos', duration: '~3 min', available: true },
        { id: 'filtrar-contatos', materialIcon: 'manage_search', iconColor: '#f97316', iconBg: '#fff7ed', title: 'Como Filtrar Contatos', description: 'Use filtros avançados para encontrar quem precisa.', url: 'https://full.tips/tutorials/filtrar-contatos/index.html', steps: '6 passos', duration: '~3 min', available: true },
        { id: 'smart-lists', materialIcon: 'assignment', iconColor: '#22c55e', iconBg: '#f0fdf4', title: 'Listas Inteligentes', description: 'Crie segmentações automáticas que se atualizam.', url: 'https://full.tips/tutorials/listas-inteligentes/index.html', steps: '7 passos', duration: '~4 min', available: true },
        { id: 'tags-contatos', materialIcon: 'sell', iconColor: '#f43f5e', iconBg: '#fff1f2', title: 'Como Usar Tags', description: 'Organize contatos com tags — individual ou em massa.', url: 'https://full.tips/tutorials/tags/index.html', steps: '7 passos', duration: '~4 min', available: true }
      ]
    },
    conversations: {
      match: ['/conversations'],
      tutorials: [
        { id: 'navegando-inbox', materialIcon: 'forum', iconColor: '#3b82f6', iconBg: '#eff6ff', title: 'Navegando no Inbox de Conversas', description: 'Domine o inbox unificado — filtre, busque e gerencie conversas.', url: 'https://full.tips/tutorials/conversas-inbox/index.html', steps: '7 passos', duration: '~3 min', available: true },
        { id: 'enviar-mensagem', materialIcon: 'send', iconColor: '#22c55e', iconBg: '#f0fdf4', title: 'Como enviar mensagens', description: 'Envie mensagens por WhatsApp, SMS ou e-mail', url: null, available: false },
        { id: 'templates-mensagem', materialIcon: 'description', iconColor: '#f97316', iconBg: '#fff7ed', title: 'Como usar templates', description: 'Crie e use templates de mensagens', url: null, available: false }
      ]
    },
    calendars: {
      match: ['/calendars'],
      tutorials: [
        { id: 'criar-calendario', materialIcon: 'calendar_today', iconColor: '#3b82f6', iconBg: '#eff6ff', title: 'Como criar um calendário', description: 'Configure calendários de agendamento', url: null, available: false },
        { id: 'configurar-disponibilidade', materialIcon: 'schedule', iconColor: '#f97316', iconBg: '#fff7ed', title: 'Como configurar disponibilidade', description: 'Defina horários disponíveis para agendamento', url: null, available: false }
      ]
    },
    opportunities: {
      match: ['/opportunities'],
      tutorials: [
        { id: 'criar-pipeline', materialIcon: 'view_kanban', iconColor: '#6366f1', iconBg: '#eef2ff', title: 'Como criar um pipeline', description: 'Configure pipelines de vendas', url: null, available: false },
        { id: 'mover-leads', materialIcon: 'swap_horiz', iconColor: '#22c55e', iconBg: '#f0fdf4', title: 'Como mover leads entre etapas', description: 'Gerencie o progresso das oportunidades', url: null, available: false }
      ]
    },
    automation: {
      match: ['/automation', '/workflows'],
      tutorials: [
        { id: 'criar-workflow', materialIcon: 'bolt', iconColor: '#eab308', iconBg: '#fefce8', title: 'Como criar um workflow', description: 'Automatize tarefas com workflows', url: null, available: false }
      ]
    },
    funnels: {
      match: ['/funnels', '/websites'],
      tutorials: [
        { id: 'criar-funil', materialIcon: 'language', iconColor: '#3b82f6', iconBg: '#eff6ff', title: 'Como criar um funil', description: 'Construa funis de vendas e landing pages', url: null, available: false }
      ]
    }
  };

  // ═══════════════════════════════════════════
  // ESTILOS — Convertido do Tailwind do Marco
  // ═══════════════════════════════════════════
  const STYLES = `
    #ff-help-widget * {
      margin: 0; padding: 0; box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    /* ── Botão flutuante ── */
    #ff-help-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      border: none;
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
      transition: all 0.3s ease;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #ff-help-btn:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(124, 58, 237, 0.6); }
    #ff-help-btn.active { background: #ef4444; box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4); }

    /* ── Painel (bottom-sheet style) ── */
    #ff-help-panel {
      position: fixed;
      bottom: 92px;
      right: 24px;
      width: 480px;
      max-height: 85vh;
      background: #f3f4f6;
      border-radius: 32px;
      box-shadow: 0 -10px 25px -5px rgba(0,0,0,0.1), 0 -8px 10px -6px rgba(0,0,0,0.1), 0 16px 56px rgba(0,0,0,0.18);
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
    .ff-drag-handle {
      display: flex;
      justify-content: center;
      padding: 12px 0;
    }
    .ff-drag-handle span {
      width: 36px;
      height: 5px;
      background: rgba(0,0,0,0.1);
      border-radius: 3px;
    }

    /* ── Header roxo ── */
    .ff-panel-header-wrap {
      padding: 0 24px 16px;
    }
    .ff-gradient-header {
      background: linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%);
      padding: 20px;
      border-radius: 16px;
      color: white;
      box-shadow: 0 4px 12px rgba(124,58,237,0.3);
    }
    .ff-gradient-header .ff-header-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .ff-gradient-header .ff-header-title h3 {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
    .ff-gradient-header .ff-header-title .material-icons-round {
      font-size: 20px;
      color: white;
    }
    .ff-gradient-header p {
      font-size: 14px;
      color: #e9d5ff;
      line-height: 1.4;
    }

    /* ── Search bar ── */
    .ff-search-wrap {
      padding: 0 24px 16px;
      position: relative;
    }
    .ff-search-wrap .material-icons-round {
      position: absolute;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      font-size: 20px;
    }
    .ff-search-wrap input {
      width: 100%;
      padding: 14px 16px 14px 48px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      font-size: 15px;
      color: #1f2937;
      outline: none;
      font-family: inherit;
      transition: all 0.2s;
    }
    .ff-search-wrap input::placeholder { color: #9ca3af; }
    .ff-search-wrap input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }

    /* ── Section title ── */
    .ff-section-title {
      padding: 4px 28px 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6b7280;
    }

    /* ── Scrollable list ── */
    .ff-panel-list {
      flex: 1;
      overflow-y: auto;
      padding: 0 24px 12px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* ── Tutorial card ── */
    .ff-tutorial-card {
      width: 100%;
      text-align: left;
      background: white;
      padding: 16px;
      border-radius: 16px;
      border: 1px solid #f3f4f6;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      display: flex;
      gap: 16px;
      cursor: pointer;
      transition: all 0.15s ease;
      align-items: center;
    }
    .ff-tutorial-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .ff-tutorial-card:active {
      transform: scale(0.98);
    }
    .ff-tutorial-card.disabled {
      opacity: 0.45;
      cursor: default;
    }
    .ff-tutorial-card.disabled:hover {
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .ff-tutorial-card.disabled:active {
      transform: none;
    }

    /* ── Icon box ── */
    .ff-card-icon {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ff-card-icon .material-icons-round {
      font-size: 24px;
    }

    /* ── Card content ── */
    .ff-card-content {
      flex: 1;
      min-width: 0;
    }
    .ff-card-content h4 {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 2px;
    }
    .ff-card-content p {
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .ff-card-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .ff-card-meta .steps-badge {
      font-size: 11px;
      font-weight: 500;
      padding: 2px 8px;
      background: #faf5ff;
      color: #7c3aed;
      border-radius: 9999px;
    }
    .ff-card-meta .duration {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #9ca3af;
    }
    .ff-card-meta .duration .material-icons-round {
      font-size: 14px;
    }

    /* ── Chevron ── */
    .ff-card-chevron {
      color: #d1d5db;
      display: flex;
      align-items: center;
    }
    .ff-card-chevron .material-icons-round {
      font-size: 24px;
    }

    /* ── Footer ── */
    .ff-panel-footer {
      padding: 16px 24px 24px;
    }
    .ff-panel-footer button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      background: transparent;
      border: none;
      color: #7c3aed;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      border-radius: 16px;
      transition: background 0.2s;
      font-family: inherit;
    }
    .ff-panel-footer button:hover {
      background: #faf5ff;
    }
    .ff-panel-footer button .material-icons-round {
      font-size: 20px;
    }

    /* ── Modal iframe overlay ── */
    #ff-tutorial-modal {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      z-index: 100000;
      display: none;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    #ff-tutorial-modal.open { display: flex; }
    #ff-tutorial-modal-inner {
      width: 96vw;
      max-width: 1400px;
      height: 92vh;
      background: #0f0f1a;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    }
    #ff-tutorial-modal-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: white;
      border: none;
      color: #1e293b;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      z-index: 100001;
      transition: background 0.2s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #ff-tutorial-modal-close:hover { background: #f1f5f9; }
    #ff-tutorial-iframe { width: 100%; height: 100%; border: none; }

    @media (max-width: 768px) {
      #ff-help-panel { width: calc(100vw - 32px); right: 16px; bottom: 84px; }
      #ff-help-btn { bottom: 16px; right: 16px; }
      #ff-tutorial-modal-inner { width: 100vw; height: 100vh; border-radius: 0; }
    }
  `;

  // ═══════════════════════════════════════════
  // LÓGICA
  // ═══════════════════════════════════════════
  function getCurrentSection() {
    const path = window.location.pathname;
    for (const [key, section] of Object.entries(TUTORIALS_CONFIG)) {
      if (key === 'global') continue;
      if (section.match && section.match.some(m => path.includes(m))) {
        return { key, ...section };
      }
    }
    return null;
  }

  function getAvailableTutorials() {
    const section = getCurrentSection();
    const tutorials = [];
    if (section) {
      section.tutorials.forEach(t => tutorials.push({ ...t, section: section.key }));
    }
    return tutorials;
  }

  function getSeenTutorials() {
    try { return JSON.parse(localStorage.getItem('ff-seen-tutorials') || '[]'); }
    catch { return []; }
  }

  function markTutorialSeen(id) {
    const seen = getSeenTutorials();
    if (!seen.includes(id)) { seen.push(id); localStorage.setItem('ff-seen-tutorials', JSON.stringify(seen)); }
  }

  function getSectionName(key) {
    const names = { contacts: 'Contatos', conversations: 'Conversas', calendars: 'Calendários', opportunities: 'Leads', automation: 'Automações', funnels: 'Sites & Funis' };
    return names[key] || key;
  }

  function renderPanel() {
    const section = getCurrentSection();
    const tutorials = getAvailableTutorials();
    const sectionName = section ? getSectionName(section.key) : 'Esta página';

    let html = `
      <div class="ff-drag-handle"><span></span></div>
      <div class="ff-panel-header-wrap">
        <div class="ff-gradient-header">
          <div class="ff-header-title">
            <span class="material-icons-round">help_outline</span>
            <h3>Central de Ajuda</h3>
          </div>
          <p>Aprenda a dominar seus ${sectionName} com tutoriais rápidos e interativos.</p>
        </div>
      </div>
      <div class="ff-search-wrap">
        <span class="material-icons-round">search</span>
        <input type="text" placeholder="O que você deseja aprender?" />
      </div>
    `;

    if (tutorials.length > 0) {
      html += `<div class="ff-section-title">Tutoriais em destaque</div>`;
      html += `<div class="ff-panel-list">`;

      tutorials.forEach(t => {
        const cls = t.available ? '' : 'disabled';
        const meta = t.available
          ? `<div class="ff-card-meta">
              <span class="steps-badge">${t.steps || '7 passos'}</span>
              <span class="duration"><span class="material-icons-round">schedule</span> ${t.duration || '~3 min'}</span>
            </div>`
          : `<div class="ff-card-meta"><span class="duration">Em breve</span></div>`;

        html += `
          <div class="ff-tutorial-card ${cls}" ${t.available ? `onclick="window.__ffWidget.openTutorial('${t.url}', '${t.id}')"` : ''}>
            <div class="ff-card-icon" style="background:${t.iconBg || '#f3f4f6'}">
              <span class="material-icons-round" style="color:${t.iconColor || '#6b7280'}">${t.materialIcon || 'article'}</span>
            </div>
            <div class="ff-card-content">
              <h4>${t.title}</h4>
              <p>${t.description || ''}</p>
              ${meta}
            </div>
            ${t.available ? '<div class="ff-card-chevron"><span class="material-icons-round">chevron_right</span></div>' : ''}
          </div>
        `;
      });

      html += `</div>`;
    } else {
      html += `
        <div class="ff-panel-list" style="padding: 32px 24px; text-align: center; display: block;">
          <p style="color: #6b7280; font-size: 14px;">Nenhum tutorial disponível para esta página ainda.</p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 8px;">Estamos criando novos tutoriais constantemente! 🚀</p>
        </div>
      `;
    }

    html += `
      <div class="ff-panel-footer">
        <button onclick="window.open('https://full.tips', '_blank')">
          Ver todos os tutoriais
          <span class="material-icons-round">arrow_forward</span>
        </button>
      </div>
    `;

    return html;
  }

  function init() {
    // Load Material Icons font
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Round';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(link2);

    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);

    const widget = document.createElement('div');
    widget.id = 'ff-help-widget';
    widget.innerHTML = `
      <button id="ff-help-btn" onclick="window.__ffWidget.toggle()">
        <span id="ff-help-icon" class="material-icons-round" style="color:#fff;font-size:28px;">help_outline</span>
      </button>
      <div id="ff-help-panel">
        ${renderPanel()}
      </div>
      <div id="ff-tutorial-modal">
        <div id="ff-tutorial-modal-inner">
          <button id="ff-tutorial-modal-close" onclick="window.__ffWidget.closeModal()">✕</button>
          <iframe id="ff-tutorial-iframe" src=""></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(widget);

    // SPA navigation
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
      const icon = document.getElementById('ff-help-icon');
      const isOpen = panel.classList.contains('open');
      if (isOpen) {
        panel.classList.remove('open');
        btn.classList.remove('active');
        icon.textContent = 'help_outline';
      } else {
        panel.innerHTML = renderPanel();
        panel.classList.add('open');
        btn.classList.add('active');
        icon.textContent = 'close';
      }
    },
    openTutorial(url, id) {
      const modal = document.getElementById('ff-tutorial-modal');
      const iframe = document.getElementById('ff-tutorial-iframe');
      iframe.src = url;
      modal.classList.add('open');
      if (id) markTutorialSeen(id);
      document.getElementById('ff-help-panel').classList.remove('open');
      document.getElementById('ff-help-btn').classList.remove('active');
      document.getElementById('ff-help-icon').textContent = 'help_outline';
    },
    closeModal() {
      document.getElementById('ff-tutorial-modal').classList.remove('open');
      document.getElementById('ff-tutorial-iframe').src = '';
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('ff-tutorial-modal');
      if (modal && modal.classList.contains('open')) { window.__ffWidget.closeModal(); }
      else {
        const panel = document.getElementById('ff-help-panel');
        if (panel && panel.classList.contains('open')) { window.__ffWidget.toggle(); }
      }
    }
  });

  document.addEventListener('click', (e) => {
    const widget = document.getElementById('ff-help-widget');
    if (widget && !widget.contains(e.target)) {
      const panel = document.getElementById('ff-help-panel');
      if (panel && panel.classList.contains('open')) { window.__ffWidget.toggle(); }
    }
  });

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();
