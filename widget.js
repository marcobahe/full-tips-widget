/**
 * Full Funnel Help Widget
 * Widget flutuante de tutoriais interativos
 * 
 * Uso: Adicionar via Custom Code (header/footer) no GHL
 * <script src="URL_DO_WIDGET/ff-help-widget.js"></script>
 * 
 * O widget detecta a página atual pela URL e mostra
 * apenas os tutoriais relevantes para aquela seção.
 */
(function() {
  'use strict';

  // ═══════════════════════════════════════════
  // CONFIGURAÇÃO DOS TUTORIAIS POR PÁGINA
  // ═══════════════════════════════════════════
  const TUTORIALS_CONFIG = {
    // Tutoriais globais (aparecem em qualquer página)
    global: [
      {
        id: 'visao-geral',
        icon: '🏠',
        title: 'Visão geral da plataforma',
        url: null, // TODO: criar tutorial
        available: false
      }
    ],
    
    // Contatos
    contacts: {
      match: ['/contacts'],
      tutorials: [
        {
          id: 'importar-contatos',
          icon: '📥',
          title: 'Como importar contatos',
          description: 'Importe sua lista via CSV em poucos passos',
          url: 'https://full.tips/tutorials/importacao-contatos/index.html',
          available: true
        },
        {
          id: 'filtrar-contatos',
          icon: '🔍',
          title: 'Como filtrar contatos',
          description: 'Use filtros avançados para encontrar quem precisa',
          url: 'https://full.tips/tutorials/filtrar-contatos/index.html',
          available: true
        },
        {
          id: 'smart-lists',
          icon: '📋',
          title: 'Listas Inteligentes',
          description: 'Crie segmentações automáticas que se atualizam',
          url: 'https://full.tips/tutorials/listas-inteligentes/index.html',
          available: true
        },
        {
          id: 'tags-contatos',
          icon: '🏷️',
          title: 'Como usar tags',
          description: 'Classifique contatos com tags personalizadas',
          url: 'https://full.tips/tutorials/tags/index.html',
          available: true
        }
      ]
    },

    // Conversas
    conversations: {
      match: ['/conversations'],
      tutorials: [
        {
          id: 'navegando-inbox',
          icon: '💬',
          title: 'Navegando no Inbox de Conversas',
          description: 'Domine o inbox unificado — filtre, busque e gerencie conversas',
          url: 'https://full.tips/tutorials/conversas-inbox/index.html',
          available: true
        },
        {
          id: 'enviar-mensagem',
          icon: '✉️',
          title: 'Como enviar mensagens',
          description: 'Envie mensagens por WhatsApp, SMS ou e-mail',
          url: null,
          available: false
        },
        {
          id: 'templates-mensagem',
          icon: '📝',
          title: 'Como usar templates',
          description: 'Crie e use templates de mensagens',
          url: null,
          available: false
        }
      ]
    },

    // Calendários
    calendars: {
      match: ['/calendars'],
      tutorials: [
        {
          id: 'criar-calendario',
          icon: '📅',
          title: 'Como criar um calendário',
          description: 'Configure calendários de agendamento',
          url: null,
          available: false
        },
        {
          id: 'configurar-disponibilidade',
          icon: '⏰',
          title: 'Como configurar disponibilidade',
          description: 'Defina horários disponíveis para agendamento',
          url: null,
          available: false
        }
      ]
    },

    // Leads / Oportunidades
    opportunities: {
      match: ['/opportunities'],
      tutorials: [
        {
          id: 'criar-pipeline',
          icon: '🔄',
          title: 'Como criar um pipeline',
          description: 'Configure pipelines de vendas',
          url: null,
          available: false
        },
        {
          id: 'mover-leads',
          icon: '➡️',
          title: 'Como mover leads entre etapas',
          description: 'Gerencie o progresso das oportunidades',
          url: null,
          available: false
        }
      ]
    },

    // Automações
    automation: {
      match: ['/automation', '/workflows'],
      tutorials: [
        {
          id: 'criar-workflow',
          icon: '⚡',
          title: 'Como criar um workflow',
          description: 'Automatize tarefas com workflows',
          url: null,
          available: false
        }
      ]
    },

    // Sites / Funis
    funnels: {
      match: ['/funnels', '/websites'],
      tutorials: [
        {
          id: 'criar-funil',
          icon: '🌐',
          title: 'Como criar um funil',
          description: 'Construa funis de vendas e landing pages',
          url: null,
          available: false
        }
      ]
    }
  };

  // ═══════════════════════════════════════════
  // ESTILOS DO WIDGET
  // ═══════════════════════════════════════════
  const STYLES = `
    #ff-help-widget * {
      margin: 0; padding: 0; box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    }

    #ff-help-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      border: none;
      color: #ffffff;
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

    #ff-help-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 30px rgba(124, 58, 237, 0.6);
    }

    #ff-help-btn.active {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
    }

    #ff-help-btn .badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ef4444;
      color: white;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
    }

    #ff-help-panel {
      position: fixed;
      bottom: 92px;
      right: 24px;
      width: 360px;
      max-height: 520px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.15);
      z-index: 99998;
      overflow: hidden;
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

    .ff-panel-header {
      padding: 20px;
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      color: white;
    }

    .ff-panel-header h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .ff-panel-header p {
      font-size: 13px;
      opacity: 0.8;
    }

    .ff-panel-section {
      padding: 12px 16px 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
    }

    .ff-panel-list {
      padding: 4px 12px 12px;
      overflow-y: auto;
      max-height: 380px;
    }

    .ff-tutorial-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid transparent;
    }

    .ff-tutorial-item:hover {
      background: #f8fafc;
      border-color: #e2e8f0;
    }

    .ff-tutorial-item.disabled {
      opacity: 0.5;
      cursor: default;
    }

    .ff-tutorial-item.disabled:hover {
      background: transparent;
      border-color: transparent;
    }

    .ff-tutorial-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }

    .ff-tutorial-info h4 {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2px;
    }

    .ff-tutorial-info p {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.3;
    }

    .ff-tutorial-badge {
      margin-left: auto;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .ff-tutorial-badge.available {
      background: #ecfdf5;
      color: #059669;
    }

    .ff-tutorial-badge.coming {
      background: #f8fafc;
      color: #94a3b8;
    }

    .ff-tutorial-arrow {
      margin-left: auto;
      color: #cbd5e1;
      font-size: 16px;
      flex-shrink: 0;
    }

    /* Modal iframe overlay */
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

    #ff-tutorial-modal.open {
      display: flex;
    }

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

    #ff-tutorial-modal-close:hover {
      background: #f1f5f9;
    }

    #ff-tutorial-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    @media (max-width: 768px) {
      #ff-help-panel {
        width: calc(100vw - 32px);
        right: 16px;
        bottom: 84px;
      }
      #ff-help-btn {
        bottom: 16px;
        right: 16px;
      }
      #ff-tutorial-modal-inner {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
      }
    }
  `;

  // ═══════════════════════════════════════════
  // LÓGICA DO WIDGET
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
    
    // Tutoriais da seção atual
    if (section) {
      section.tutorials.forEach(t => {
        tutorials.push({ ...t, section: section.key });
      });
    }

    return tutorials;
  }

  function getSeenTutorials() {
    try {
      return JSON.parse(localStorage.getItem('ff-seen-tutorials') || '[]');
    } catch { return []; }
  }

  function markTutorialSeen(id) {
    const seen = getSeenTutorials();
    if (!seen.includes(id)) {
      seen.push(id);
      localStorage.setItem('ff-seen-tutorials', JSON.stringify(seen));
    }
  }

  function getAvailableCount() {
    const seen = getSeenTutorials();
    return getAvailableTutorials().filter(t => t.available && !seen.includes(t.id)).length;
  }

  function renderPanel() {
    const section = getCurrentSection();
    const tutorials = getAvailableTutorials();
    const sectionName = section ? getSectionName(section.key) : 'Esta página';

    let html = `
      <div class="ff-panel-header">
        <h3>❓ Central de Ajuda</h3>
        <p>Tutoriais interativos para ${sectionName}</p>
      </div>
    `;

    if (tutorials.length > 0) {
      html += `<div class="ff-panel-section">📚 Tutoriais disponíveis</div>`;
      html += `<div class="ff-panel-list">`;
      
      tutorials.forEach(t => {
        const cls = t.available ? '' : 'disabled';
        const badge = t.available 
          ? '<span class="ff-tutorial-badge available">Disponível</span>'
          : '<span class="ff-tutorial-badge coming">Em breve</span>';
        
        const seen = getSeenTutorials();
        const seenMark = (t.available && seen.includes(t.id)) ? ' ✓' : '';
        html += `
          <div class="ff-tutorial-item ${cls}" ${t.available ? `onclick="window.__ffWidget.openTutorial('${t.url}', '${t.id}')"` : ''}>
            <div class="ff-tutorial-icon">${t.icon}</div>
            <div class="ff-tutorial-info">
              <h4>${t.title}${seenMark}</h4>
              <p>${t.description || ''}</p>
            </div>
            ${badge}
          </div>
        `;
      });

      html += `</div>`;
    } else {
      html += `
        <div class="ff-panel-list" style="padding: 32px 16px; text-align: center;">
          <p style="color: #94a3b8; font-size: 14px;">Nenhum tutorial disponível para esta página ainda.</p>
          <p style="color: #cbd5e1; font-size: 12px; margin-top: 8px;">Estamos criando novos tutoriais constantemente! 🚀</p>
        </div>
      `;
    }

    return html;
  }

  function getSectionName(key) {
    const names = {
      contacts: 'Contatos',
      conversations: 'Conversas',
      calendars: 'Calendários',
      opportunities: 'Leads',
      automation: 'Automações',
      funnels: 'Sites & Funis'
    };
    return names[key] || key;
  }

  function init() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);

    // Create widget container
    const widget = document.createElement('div');
    widget.id = 'ff-help-widget';

    const badgeHtml = '';

    widget.innerHTML = `
      <button id="ff-help-btn" onclick="window.__ffWidget.toggle()">
        <span id="ff-help-icon" style="color:#fff;font-size:24px;font-weight:800;">?</span>
        ${badgeHtml}
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

    // Re-render on navigation (SPA)
    let lastPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        const panel = document.getElementById('ff-help-panel');
        if (panel) panel.innerHTML = renderPanel();
        // Badge removido
      }
    }, 1000);
  }

  // Public API
  window.__ffWidget = {
    toggle() {
      const panel = document.getElementById('ff-help-panel');
      const btn = document.getElementById('ff-help-btn');
      const icon = document.getElementById('ff-help-icon');
      const isOpen = panel.classList.contains('open');
      
      if (isOpen) {
        panel.classList.remove('open');
        btn.classList.remove('active');
        icon.textContent = '?';
      } else {
        panel.innerHTML = renderPanel();
        panel.classList.add('open');
        btn.classList.add('active');
        icon.textContent = '✕';
      }
    },

    openTutorial(url, id) {
      const modal = document.getElementById('ff-tutorial-modal');
      const iframe = document.getElementById('ff-tutorial-iframe');
      iframe.src = url;
      modal.classList.add('open');
      
      if (id) markTutorialSeen(id);

      // Close panel
      document.getElementById('ff-help-panel').classList.remove('open');
      document.getElementById('ff-help-btn').classList.remove('active');
      document.getElementById('ff-help-icon').textContent = '?';
    },

    closeModal() {
      const modal = document.getElementById('ff-tutorial-modal');
      const iframe = document.getElementById('ff-tutorial-iframe');
      modal.classList.remove('open');
      iframe.src = '';
    }
  };

  // Close modal on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('ff-tutorial-modal');
      if (modal && modal.classList.contains('open')) {
        window.__ffWidget.closeModal();
      } else {
        const panel = document.getElementById('ff-help-panel');
        if (panel && panel.classList.contains('open')) {
          window.__ffWidget.toggle();
        }
      }
    }
  });

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    const widget = document.getElementById('ff-help-widget');
    if (widget && !widget.contains(e.target)) {
      const panel = document.getElementById('ff-help-panel');
      if (panel && panel.classList.contains('open')) {
        window.__ffWidget.toggle();
      }
    }
  });

  // Init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
