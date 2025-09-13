// Centralized layout helpers: nav + footer injection
(function() {
  function makeLink(href, label, isActive) {
    const a = document.createElement('a');
    a.className = 'sp-pill' + (isActive ? ' sp-active' : '');
    a.href = href;
    if (isActive) a.setAttribute('aria-current', 'page');
    a.textContent = label;
    return a;
  }

  function buildNav() {
    const nav = document.querySelector('.sp-nav .sp-links');
    if (!nav) return;
    const here = location.pathname.replace(/\\/g, '/');
    const root = here.endsWith('/') ? here.slice(0, -1) : here;
    const active = (p) => here.toLowerCase().includes('/' + p.toLowerCase() + '/');
    // Clear existing
    nav.innerHTML = '';
    // Build consistent links
    nav.append(
      makeLink(getRel('index.html'), 'Home', here.toLowerCase().endsWith('/index.html') || here === '/' ),
      makeLink(getRel('themes.html'), 'Themes', here.toLowerCase().endsWith('/themes.html')),
      makeLink(getRel('ideas.html'), 'Ideas', here.toLowerCase().endsWith('/ideas.html')),
      makeLink(getRel('social.html'), 'Social', here.toLowerCase().endsWith('/social.html')),
      makeLink(getRel('Characters/index.html'), 'Characters', active('Characters')),
      makeLink(getRel('Episodes/index.html'), 'Episodes', active('Episodes')),
      makeLink(getRel('Organizations/index.html'), 'Organizations', active('Organizations')),
      makeLink(getRel('Quotes/index.html'), 'Quotes', active('Quotes')),
      makeLink(getRel('Timeline/index.html'), 'Timeline', active('Timeline')),
      makeLink(getRel('Search/index.html'), 'Search', active('Search'))
    );
  }

  function buildFooter() {
    const foot = document.querySelector('.sp-footer');
    if (!foot) return;
    // Ensure consistent footer text
    foot.innerHTML = '<p>Fan-made hub for educational/entertainment purposes. South Park and related properties belong to their respective owners.</p>' +
      '<p><a href="' + getRel('privacy.html') + '">Privacy</a> · <a href="' + getRel('404.html') + '">404</a></p>';
  }

  // Compute relative path from current page to target within site root
  function getRel(target) {
    const cur = location.pathname.replace(/\\/g, '/');
    const depth = (cur.match(/\//g) || []).length - 1; // leading slash counts one
    // If we are at root path like '/index.html', depth ~1; for '/Folder/index.html' depth ~2
    const up = Array(Math.max(0, depth - 1)).fill('..').join('/');
    return (up ? up + '/' : '') + target;
  }

  document.addEventListener('DOMContentLoaded', function() {
    try { buildNav(); buildFooter(); fixMojibake(); enhanceMedia(); } catch (e) { /* no-op */ }
  });

  function fixMojibake() {
    // Basic text cleanup for stray replacement chars seen in some files
    const replacements = [
      { from: /\uFFFD/g, to: '' }, // remove replacement character if present
      { from: /\?Ts/g, to: '’s' },
      { from: /A�/g, to: '·' }
    ];
    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        let t = node.nodeValue;
        let changed = false;
        for (const r of replacements) {
          if (r.from.test(t)) { t = t.replace(r.from, r.to); changed = true; }
        }
        if (changed) node.nodeValue = t;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const child of Array.from(node.childNodes)) walk(child);
      }
    }
    walk(document.body);
    // Index-specific fixes
    const here = location.pathname.toLowerCase();
    if (here.endsWith('/index.html') || here === '/' || here.endsWith('/')) {
      document.title = 'South Park Hub — Ideas & Themes';
      const h1 = document.getElementById('hero-title');
      if (h1) h1.textContent = 'Explore South Park’s Big Ideas';
    }
  }

  function enhanceMedia() {
    try {
      document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      });
      document.querySelectorAll('a').forEach(a => {
        a.addEventListener('focus', () => a.classList.add('focus-ring'));
        a.addEventListener('blur', () => a.classList.remove('focus-ring'));
      });
    } catch {}
  }
})();
