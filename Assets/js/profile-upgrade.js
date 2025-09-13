// Enhancements for legacy Facebook-style character profiles
(function(){
  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function ensureHeader() {
    if (qs('.sp-header')) return;
    const header = document.createElement('header');
    header.className = 'sp-header';
    header.setAttribute('role','banner');
    header.innerHTML = '<nav class="sp-nav" aria-label="Primary">\
      <a class="sp-brand" href="../../../index.html">South Park Hub</a>\
      <div class="sp-links"></div>\
    </nav>';
    document.body.prepend(header);
  }

  function addSkipLink() {
    if (!qs('.skip-link')) {
      const a = document.createElement('a');
      a.href = '#main'; a.className='skip-link'; a.textContent = 'Skip to content';
      document.body.prepend(a);
    }
  }

  function slug(s){ return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }

  function deriveCharacterId() {
    const h1 = qs('.profile-name') || qs('h1');
    if (h1) return slug(h1.textContent.trim());
    const ttl = document.title.replace(/\s*-\s*Facebook.*/i,'');
    return slug(ttl);
  }

  function addWikiButton() {
    const id = deriveCharacterId();
    const target = qs('.profile-details') || qs('.profile-header') || qs('body');
    if (!target || qs('#open-wiki-link')) return;
    const wrap = document.createElement('div');
    wrap.className = 'sp-card-actions';
    wrap.style.marginTop = '8px';
    wrap.innerHTML = `<a id="open-wiki-link" class="sp-btn" href="../../../Wiki/page.html?type=character&id=${encodeURIComponent(id)}">Open Wiki</a>`;
    target.appendChild(wrap);
  }

  function enhanceImages() {
    qsa('img').forEach(img => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
      if (!img.getAttribute('alt')) img.setAttribute('alt','');
    });
  }

  function cleanMojibake() {
    const RE_BAD = /\uFFFD|�/g; // replacement chars
    const RE_CTRL = /[\u0000-\u001F\u007F-\u009F]/g; // control chars
    const mappings = [
      { from: /\s*[·•]\s*/g, to: ' · ' },
      { from: /\s*�\?�\s*/g, to: ' · ' },
      { from: /A�/g, to: '·' },
      { from: /\?Ts/g, to: '’s' }
    ];
    (function walk(node){
      if (node.nodeType === Node.TEXT_NODE) {
        let t = node.nodeValue;
        const before = t;
        t = t.replace(RE_CTRL,'').replace(RE_BAD,'');
        for (const m of mappings) t = t.replace(m.from, m.to);
        if (t !== before) node.nodeValue = t;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const c of Array.from(node.childNodes)) walk(c);
      }
    })(document.body);
  }

  function retargetFriendLinks() {
    qsa('a.friend-card').forEach(a => {
      const nameEl = a.querySelector('.friend-name');
      const text = nameEl ? (nameEl.textContent.split('\n')[0] || '').trim() : a.textContent.trim();
      const id = slug(text);
      a.href = `../../../Wiki/page.html?type=character&id=${encodeURIComponent(id)}`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    try {
      addSkipLink();
      ensureHeader();
      cleanMojibake();
      enhanceImages();
      addWikiButton();
      retargetFriendLinks();
    } catch {}
  });
})();

