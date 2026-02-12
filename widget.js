/**
 * Full Tips Widget — Tutoriais interativos para o Full Funnel
 * Versão original restaurada + multi-seção + iframe modal
 */
(function () {
  'use strict';

  var BASE = 'https://full.tips';

  var SECTIONS = {
    contacts: {
      match: /\/contacts(\/|$)/,
      title: 'Central de Ajuda',
      subtitle: 'Aprenda a usar a seção de Contatos',
      tutorials: [
        { title: 'Como Importar Contatos', desc: 'Importe sua base via CSV em poucos cliques.', steps: 6, time: 3, icon: '📥', path: '/tutorials/importacao-contatos/' },
        { title: 'Como Filtrar Contatos', desc: 'Use filtros avançados para encontrar quem precisa.', steps: 6, time: 3, icon: '🔍', path: '/tutorials/filtrar-contatos/' },
        { title: 'Listas Inteligentes', desc: 'Crie segmentações automáticas que se atualizam.', steps: 7, time: 4, icon: '📋', path: '/tutorials/listas-inteligentes/' },
        { title: 'Como Usar Tags', desc: 'Organize contatos com tags — individual ou em massa.', steps: 7, time: 4, icon: '🏷️', path: '/tutorials/tags/' }
      ]
    },
    conversations: {
      match: /\/conversations(\/|$)/,
      title: 'Central de Ajuda',
      subtitle: 'Aprenda a usar a seção de Conversas',
      tutorials: [
        { title: 'Navegando no Inbox', desc: 'Domine o inbox unificado — filtre, busque e gerencie conversas.', steps: 7, time: 3, icon: '💬', path: '/tutorials/conversas-inbox/' }
      ]
    }
  };

  function getSection() {
    var path = window.location.pathname;
    for (var key in SECTIONS) {
      if (SECTIONS[key].match.test(path)) return SECTIONS[key];
    }
    return null;
  }

  function init() {
    var section = getSection();
    if (section) { build(section); }
  }

  function remove() {
    ['ft-widget-btn','ft-widget-panel','ft-widget-modal','ft-widget-css'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
  }

  function build(section) {
    if (document.getElementById('ft-widget-btn')) return;

    var css = document.createElement('style');
    css.id = 'ft-widget-css';
    css.textContent = [
      '#ft-widget-btn{position:fixed;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;border:none;cursor:grab;box-shadow:0 4px 20px rgba(124,58,237,.4);z-index:99999;display:flex;align-items:center;justify-content:center;font-size:24px;transition:box-shadow .2s;touch-action:none;user-select:none;-webkit-user-select:none}',
      '#ft-widget-btn:hover{box-shadow:0 6px 28px rgba(124,58,237,.55)}',
      '#ft-widget-btn.ft-dragging{cursor:grabbing}',
      '#ft-widget-panel{position:fixed;width:360px;max-height:520px;background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.18);z-index:99999;overflow:hidden;opacity:0;transform:translateY(12px) scale(.96);pointer-events:none;transition:opacity .25s,transform .25s;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,system-ui,sans-serif}',
      '#ft-widget-panel.ft-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}',
      '.ft-hdr{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;padding:18px 20px}',
      '.ft-hdr h3{margin:0 0 2px;font-size:16px;font-weight:700;color:#fff!important}',
      '.ft-hdr p{margin:0;font-size:12px;opacity:.85;color:#fff!important}',
      '.ft-list{padding:8px;overflow-y:auto;max-height:380px}',
      '.ft-card{display:flex;align-items:flex-start;gap:12px;padding:12px;border-radius:10px;cursor:pointer;transition:background .15s;text-decoration:none;color:inherit}',
      '.ft-card:hover{background:#f5f3ff}',
      '.ft-ico{font-size:28px;flex-shrink:0;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f5f3ff;border-radius:10px}',
      '.ft-nfo{flex:1;min-width:0}',
      '.ft-nfo h4{margin:0 0 3px;font-size:13.5px;font-weight:600;color:#1e293b;line-height:1.3}',
      '.ft-nfo p{margin:0 0 4px;font-size:12px;color:#64748b;line-height:1.4}',
      '.ft-meta{font-size:11px;color:#94a3b8}',
      '.ft-ftr{border-top:1px solid #f1f5f9;padding:10px 16px;text-align:center}',
      '.ft-ftr a{font-size:12px;color:#7c3aed;text-decoration:none;font-weight:600}',
      '.ft-ftr a:hover{text-decoration:underline}',
      '#ft-widget-modal{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100000;display:none;align-items:center;justify-content:center;backdrop-filter:blur(4px)}',
      '#ft-widget-modal.ft-open{display:flex}',
      '#ft-widget-modal-inner{width:96vw;max-width:1400px;height:92vh;background:#0f0f1a;border-radius:12px;overflow:hidden;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.5)}',
      '#ft-widget-modal-close{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;background:#fff;border:none;color:#1e293b;font-size:14px;font-weight:700;cursor:pointer;z-index:100001;box-shadow:0 1px 4px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center}',
      '#ft-widget-modal-close:hover{background:#f1f5f9}',
      '#ft-widget-iframe{width:100%;height:100%;border:none}'
    ].join('\n');
    document.head.appendChild(css);

    // Button
    var btn = document.createElement('button');
    btn.id = 'ft-widget-btn';
    btn.title = 'Tutoriais Full Funnel';
    btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

    // Panel
    var panel = document.createElement('div');
    panel.id = 'ft-widget-panel';

    var cards = section.tutorials.map(function (t) {
      var url = BASE + t.path + 'index.html';
      return '<div class="ft-card" data-url="' + url + '"><div class="ft-ico">' + t.icon + '</div><div class="ft-nfo"><h4>' + t.title + '</h4><p>' + t.desc + '</p><span class="ft-meta">' + t.steps + ' passos \u2022 ~' + t.time + ' min</span></div></div>';
    }).join('');

    panel.innerHTML = '<div class="ft-hdr"><h3>' + section.title + '</h3><p>' + section.subtitle + '</p></div><div class="ft-list">' + cards + '</div><div class="ft-ftr"><a href="' + BASE + '" target="_blank" rel="noopener">Ver todos os tutoriais \u2192</a></div>';

    // Modal
    var modal = document.createElement('div');
    modal.id = 'ft-widget-modal';
    modal.innerHTML = '<div id="ft-widget-modal-inner"><button id="ft-widget-modal-close">\u2715</button><iframe id="ft-widget-iframe" src=""></iframe></div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);
    document.body.appendChild(modal);

    // --- Position helpers ---
    var BTN_SIZE = 56;
    var PANEL_W = 360;
    var PANEL_MAX_H = 520;
    var DRAG_THRESHOLD = 5;

    function clampBtn(x, y) {
      var vw = window.innerWidth, vh = window.innerHeight;
      x = Math.max(0, Math.min(x, vw - BTN_SIZE));
      y = Math.max(0, Math.min(y, vh - BTN_SIZE));
      return { x: x, y: y };
    }

    function setBtnPos(x, y) {
      var c = clampBtn(x, y);
      btn.style.left = c.x + 'px';
      btn.style.top = c.y + 'px';
      btn.style.right = 'auto';
      btn.style.bottom = 'auto';
      return c;
    }

    function positionPanel() {
      var r = btn.getBoundingClientRect();
      var vw = window.innerWidth, vh = window.innerHeight;
      var pLeft, pTop;

      // Vertical: prefer above
      pTop = r.top - PANEL_MAX_H - 12;
      if (pTop < 8) pTop = r.bottom + 12; // below if no room above
      if (pTop + PANEL_MAX_H > vh - 8) pTop = vh - PANEL_MAX_H - 8;
      if (pTop < 8) pTop = 8;

      // Horizontal: align right edge with btn right, fallback left
      pLeft = r.right - PANEL_W;
      if (pLeft < 8) pLeft = r.left;
      if (pLeft + PANEL_W > vw - 8) pLeft = vw - PANEL_W - 8;
      if (pLeft < 8) pLeft = 8;

      panel.style.left = pLeft + 'px';
      panel.style.top = pTop + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    }

    // --- Restore saved position or default bottom-right ---
    (function restorePos() {
      try {
        var saved = JSON.parse(localStorage.getItem('ft-widget-pos'));
        if (saved && typeof saved.x === 'number' && typeof saved.y === 'number') {
          setBtnPos(saved.x, saved.y);
          return;
        }
      } catch(e) {}
      // Default: bottom-right
      var vw = window.innerWidth, vh = window.innerHeight;
      setBtnPos(vw - BTN_SIZE - 24, vh - BTN_SIZE - 24);
    })();

    // --- Drag & Drop ---
    var dragState = null; // { startX, startY, offsetX, offsetY, dragging }

    function onPointerDown(ex, ey) {
      var r = btn.getBoundingClientRect();
      dragState = {
        startX: ex, startY: ey,
        offsetX: ex - r.left, offsetY: ey - r.top,
        dragging: false
      };
    }
    function onPointerMove(ex, ey) {
      if (!dragState) return;
      var dx = ex - dragState.startX, dy = ey - dragState.startY;
      if (!dragState.dragging && Math.sqrt(dx*dx + dy*dy) > DRAG_THRESHOLD) {
        dragState.dragging = true;
        btn.classList.add('ft-dragging');
      }
      if (dragState.dragging) {
        var c = setBtnPos(ex - dragState.offsetX, ey - dragState.offsetY);
        if (open) positionPanel();
      }
    }
    function onPointerUp() {
      if (!dragState) return;
      var wasDrag = dragState.dragging;
      if (wasDrag) {
        var r = btn.getBoundingClientRect();
        try { localStorage.setItem('ft-widget-pos', JSON.stringify({ x: r.left, y: r.top })); } catch(e) {}
      }
      btn.classList.remove('ft-dragging');
      dragState = null;
      return wasDrag;
    }

    // Mouse events
    btn.addEventListener('mousedown', function(e) {
      e.preventDefault();
      onPointerDown(e.clientX, e.clientY);
    });
    document.addEventListener('mousemove', function(e) {
      if (dragState) { e.preventDefault(); onPointerMove(e.clientX, e.clientY); }
    });
    document.addEventListener('mouseup', function(e) {
      if (dragState) {
        var wasDrag = onPointerUp();
        if (!wasDrag && (e.target === btn || btn.contains(e.target))) {
          togglePanel();
        }
      }
    });

    // Touch events
    btn.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    document.addEventListener('touchmove', function(e) {
      if (dragState) {
        if (dragState.dragging) e.preventDefault();
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });
    document.addEventListener('touchend', function(e) {
      if (dragState) {
        var wasDrag = onPointerUp();
        if (!wasDrag) { togglePanel(); }
      }
    });

    // Recalc on resize
    window.addEventListener('resize', function() {
      var r = btn.getBoundingClientRect();
      var c = setBtnPos(r.left, r.top);
      try { localStorage.setItem('ft-widget-pos', JSON.stringify({ x: c.x, y: c.y })); } catch(e) {}
      if (open) positionPanel();
    });

    // Card clicks → open iframe
    panel.querySelectorAll('.ft-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var url = card.getAttribute('data-url');
        document.getElementById('ft-widget-iframe').src = url;
        modal.classList.add('ft-open');
        panel.classList.remove('ft-open');
        open = false;
      });
    });

    // Close modal
    document.getElementById('ft-widget-modal-close').addEventListener('click', function() {
      modal.classList.remove('ft-open');
      document.getElementById('ft-widget-iframe').src = '';
    });

    // Toggle panel
    var open = false;
    function togglePanel() {
      open = !open;
      if (open) positionPanel();
      panel.classList.toggle('ft-open', open);
    }

    document.addEventListener('click', function (e) {
      if (open && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        open = false;
        panel.classList.remove('ft-open');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (modal.classList.contains('ft-open')) {
          modal.classList.remove('ft-open');
          document.getElementById('ft-widget-iframe').src = '';
        } else if (open) {
          open = false;
          panel.classList.remove('ft-open');
        }
      }
    });
  }

  // SPA navigation
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      remove();
      var section = getSection();
      if (section) build(section);
    }
  }).observe(document.body, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
