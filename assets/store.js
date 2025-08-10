
// Cart and product utilities using localStorage
function getCart(){
  const c = JSON.parse(localStorage.getItem('ozluh_cart')||'{"items":[],"total":0,"currency":"درهم"}');
  return c;
}
function saveCart(cart){ localStorage.setItem('ozluh_cart', JSON.stringify(cart)); }
function addToCart(slug, qty=1){
  const products = window.__ozluh_products || [];
  const p = products.find(x=>x.slug===slug);
  if(!p) return;
  let cart = getCart();
  const existing = cart.items.find(i=>i.slug===slug);
  if(existing) existing.qty += qty;
  else cart.items.push({slug:slug,name:p.name,price:p.price,qty:qty,currency:p.currency});
  cart.total = cart.items.reduce((s,i)=>s + (i.price*i.qty), 0);
  cart.currency = p.currency || 'درهم';
  saveCart(cart);
}
function removeFromCart(slug){
  let cart = getCart();
  cart.items = cart.items.filter(i=>i.slug!==slug);
  cart.total = cart.items.reduce((s,i)=>s + (i.price*i.qty),0);
  saveCart(cart);
}
function clearCart(){ localStorage.removeItem('ozluh_cart'); }

// load products
async function loadAll(){
  try{
    const res = await fetch('data/products.json');
    const products = await res.json();
    window.__ozluh_products = products;
    const sections = { product: document.getElementById('products-list'), book: document.getElementById('books-list'), music: document.getElementById('music-list') };
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="thumb"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
        <div class="body">
          <div>
            <h3>${p.name}</h3>
            <p class="desc">${p.description}</p>
          </div>
          <div>
            <div class="price-row">
              <div class="new">${p.price} ${p.currency}</div>
              ${p.old_price ? `<div class="old">${p.old_price} ${p.currency}</div>` : ''}
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              <a class="btn" href="product.html?slug=${p.slug}">عرض التفاصيل</a>
              ${p.price>0? `<button class="btn add-now" data-slug="${p.slug}">أضف للعربة</button>` : `<a class="btn" href="product.html?slug=${p.slug}">احصل مجاناً</a>`}
            </div>
          </div>
        </div>
      `;
      const target = sections[p.category] || sections.product;
      target.appendChild(card);
    });
    document.querySelectorAll('.add-now').forEach(b=>b.addEventListener('click', e=>{ addToCart(e.target.dataset.slug,1); alert('تمت الإضافة إلى السلة'); }));
  }catch(err){ console.error('Failed to load products', err); }
}
if(document.getElementById('products-list')) loadAll();
