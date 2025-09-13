document.addEventListener('DOMContentLoaded', async () => {
  try {
    let id = null;
    const meta = document.querySelector('meta[name="sp:location-id"]');
    if (meta) id = meta.getAttribute('content');

    // Try to find the UL placeholder
    const list = document.querySelector('#notable-episodes, [data-populate="episodes"], section[aria-label*="Notable"] ul.clean');
    if (!list) return;
    if (!id && list.dataset && list.dataset.locationId) id = list.dataset.locationId;
    if (!id) return;

    // Resolve JSON path (works for Locations/*/index.html)
    const jsonPath = '../assets/locations-data.json';
    const res = await fetch(jsonPath, { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    const items = data[id];
    if (!items || !items.length) return;

    // Clear existing placeholders and populate
    list.innerHTML = '';
    for (const ep of items) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = ep.ref;
      a.textContent = `${ep.id} — ${ep.title}`;
      a.className = 'link';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      list.appendChild(li);
    }
  } catch (e) {
    // Fail silently; placeholders remain
  }
});
