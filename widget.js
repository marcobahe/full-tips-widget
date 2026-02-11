/**
 * Full Tips Widget — Tutoriais interativos para o Full Funnel
 * Aparece apenas na página de Contatos
 * https://github.com/marcobahe/full-tips-widget
 */
(function () {
  'use strict';

  var TIPS_URL = 'https://full-tips.pages.dev';
  var TUTORIALS = [
    { title: 'Como Importar Contatos', desc: 'Importe sua base via CSV em poucos cliques.', steps: 6, time: 3, icon: '\uD83D\uDCE5', path: '/tutorials/importacao-contatos/' },
    { title: 'Como Filtrar Contatos', desc: 'Use filtros avançados para encontrar quem precisa.', steps: 6, time: 3, icon: '\uD83D\uDD0D', path: '/tutorials/filtrar-contatos/' },
    { title: 'Listas Inteligentes', desc: 'Crie segmentações automáticas que se atualizam.', steps: 7, time: 4, icon: '\uD83D\uDCCB', path: '/tutorials/listas-inteligentes/' },
    { title: 'Como Usar Tags', desc: 'Organize contatos com tags — individual ou em massa.', steps: 7, time: 4, icon: '\uD83C\uDFF7\uFE0F', path: '/tutorials/tags/' }
  ];

  function isContactsPage() {
    return /\/contacts(\/|$)/.test(window.location.pathname);
  }

  function init() {
    if (!isContactsPage()) {
      // Re-check on SPA navigation
      var observer = new MutationObserver(function () {
        if (isContactsPage() && !document.getElementById('ft-widget-btn')) {
          build();
        } else if (!isContactsPage() && document.getElementById('ft-widget-btn')) {
          remove();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return;
    }
    build();
  }

  function remove() {
    var btn = document.getElementById('ft-widget-btn');
    var panel = document.getElementById('ft-widget-panel');
    var style = document.getElementById('ft-widget-css');
    if (btn) btn.remove();
    if (panel) panel.remove();
    if (style) style.remove();
  }

  function build() {
    if (document.getElementById('ft-widget-btn')) return;

    // CSS
    var css = document.createElement('style');
    css.id = 'ft-widget-css';
    css.textContent = '#ft-widget-btn{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(124,58,237,.4);z-index:99999;display:flex;align-items:center;justify-content:center;font-size:24px;transition:transform .2s,box-shadow .2s}#ft-widget-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(124,58,237,.55)}#ft-widget-btn .ft-badge{position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:11px;font-weight:700;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff}#ft-widget-panel{position:fixed;bottom:92px;right:24px;width:340px;max-height:480px;background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.18);z-index:99999;overflow:hidden;opacity:0;transform:translateY(12px) scale(.96);pointer-events:none;transition:opacity .25s,transform .25s;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,system-ui,sans-serif}#ft-widget-panel.ft-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}.ft-hdr{background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;padding:18px 20px}.ft-hdr h3{margin:0 0 2px;font-size:16px;font-weight:700}.ft-hdr p{margin:0;font-size:12px;opacity:.85}.ft-list{padding:8px;overflow-y:auto;max-height:360px}.ft-card{display:flex;align-items:flex-start;gap:12px;padding:12px;border-radius:10px;cursor:pointer;transition:background .15s;text-decoration:none;color:inherit}.ft-card:hover{background:#f5f3ff}.ft-ico{font-size:28px;flex-shrink:0;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f5f3ff;border-radius:10px}.ft-nfo{flex:1;min-width:0}.ft-nfo h4{margin:0 0 3px;font-size:13.5px;font-weight:600;color:#1e293b;line-height:1.3}.ft-nfo p{margin:0 0 4px;font-size:12px;color:#64748b;line-height:1.4}.ft-meta{font-size:11px;color:#94a3b8}.ft-ftr{border-top:1px solid #f1f5f9;padding:10px 16px;text-align:center}.ft-ftr a{font-size:12px;color:#7c3aed;text-decoration:none;font-weight:600}.ft-ftr a:hover{text-decoration:underline}';
    document.head.appendChild(css);

    // Button
    var btn = document.createElement('button');
    btn.id = 'ft-widget-btn';
    btn.title = 'Tutoriais Full Funnel';
    btn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

    // Panel
    var panel = document.createElement('div');
    panel.id = 'ft-widget-panel';

    var cards = TUTORIALS.map(function (t) {
      return '<a class="ft-card" href="' + TIPS_URL + t.path + '" target="_blank" rel="noopener"><div class="ft-ico">' + t.icon + '</div><div class="ft-nfo"><h4>' + t.title + '</h4><p>' + t.desc + '</p><span class="ft-meta">' + t.steps + ' passos \u2022 ~' + t.time + ' min</span></div></a>';
    }).join('');

    panel.innerHTML = '<div class="ft-hdr"><h3>\uD83D\uDCDA Tutoriais</h3><p>Aprenda a usar a se\u00E7\u00E3o de Contatos</p></div><div class="ft-list">' + cards + '</div><div class="ft-ftr"><a href="' + TIPS_URL + '" target="_blank" rel="noopener">Ver todos os tutoriais \u2192</a></div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    var open = false;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      open = !open;
      panel.classList.toggle('ft-open', open);
    });

    document.addEventListener('click', function (e) {
      if (open && !panel.contains(e.target) && e.target !== btn) {
        open = false;
        panel.classList.remove('ft-open');
      }
    });
  }

  // SPA-aware: re-check on URL changes
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      if (isContactsPage() && !document.getElementById('ft-widget-btn')) {
        build();
      } else if (!isContactsPage() && document.getElementById('ft-widget-btn')) {
        remove();
      }
    }
  }).observe(document.body, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
