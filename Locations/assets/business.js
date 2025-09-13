// Lightweight helpers for modals and simple carts
(function(){
  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  // Modal handling
  function openModal(id){ const el = qs(id); if(el){ el.style.display = 'flex'; qs('.modal-close', el)?.focus(); } }
  function closeModal(el){ (el.closest('.modal-backdrop')||el).style.display = 'none'; }

  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(t.matches('[data-open-modal]')){ e.preventDefault(); openModal(t.getAttribute('data-open-modal')); }
    if(t.matches('[data-close-modal]')){ e.preventDefault(); closeModal(t); }
    if(t.classList.contains('modal-backdrop') && t.dataset.clickToClose === 'true'){ closeModal(t); }
  });

  // Cart utilities (basic)
  function initCart(root){
    const cartEl = qs('.cart', root) || root;
    const listEl = qs('.cart-list', cartEl);
    const totalEl = qs('.cart-total', cartEl);
    const state = { items: [] };
    function render(){
      listEl.innerHTML = '';
      let total = 0;
      state.items.forEach((it, idx)=>{
        total += it.price * it.qty;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `<div>${it.name}</div>
          <div>$${(it.price*it.qty).toFixed(2)}</div>
          <div>
            <button class="qty-btn" data-idx="${idx}" data-delta="-1">-</button>
            <span style="padding:0 6px">${it.qty}</span>
            <button class="qty-btn" data-idx="${idx}" data-delta="1">+</button>
          </div>`;
        listEl.appendChild(row);
      });
      totalEl.textContent = `$${total.toFixed(2)}`;
    }
    cartEl.addEventListener('click', (e)=>{
      const b = e.target;
      if(b.classList.contains('qty-btn')){
        const i = +b.dataset.idx, d = +b.dataset.delta;
        state.items[i].qty = Math.max(0, state.items[i].qty + d);
        if(state.items[i].qty === 0) state.items.splice(i,1);
        render();
      }
    });
    return {
      add(name, price){
        const found = state.items.find(i=>i.name===name && i.price===price);
        if(found) found.qty++; else state.items.push({name, price, qty:1});
        render();
      },
      items: state.items
    }
  }

  // Expose globals for pages to use
  window.SPBiz = { initCart };
})();

