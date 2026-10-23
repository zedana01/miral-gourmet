/**
 * Miral Gourmet - English CMS Sync Engine
 * Reads unified miral_data from localStorage and displays English fields reactively.
 */

function getMiralDataEN() {
  try {
    const raw = localStorage.getItem('miral_data');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading miral_data:", e);
  }
  return DEFAULT_MIRAL_DATA;
}

document.addEventListener('DOMContentLoaded', () => {
  const data = getMiralDataEN();

  // 1. Categories Tabs
  const tabsContainer = document.getElementById('menuTabsNav');
  if (tabsContainer && data.categories) {
    let tabsHtml = '';
    data.categories.forEach((cat, idx) => {
      const name = cat.nameEn || cat.name;
      tabsHtml += `
        <div style="display:inline-flex; align-items:center; gap:4px;">
          <button class="menu-tab-btn ${idx === 0 ? 'active' : ''}" onclick="filterMenuCategoryEN('${cat.slug}', this)">
            ${name}
          </button>
          <a href="category.html?cat=${cat.slug}" title="View ${name} category page" style="color:var(--primary); font-size:12px; background:var(--primary-subtle); padding:8px 10px; border-radius:50%; border:1px solid var(--primary-border);">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      `;
    });
    tabsContainer.innerHTML = tabsHtml;
  }

  // 2. Signatures Grid
  const sigContainer = document.getElementById('signaturesGrid');
  if (sigContainer && data.dishes) {
    const sigDishes = data.dishes.filter(d => d.isSignature);
    let sigHtml = '';
    sigDishes.forEach(dish => {
      const title = dish.titleEn || dish.title;
      const desc = dish.descEn || dish.desc;
      const badge = dish.badgeEn || dish.badge || 'Chef Special';
      const tags = dish.tagsEn || dish.tags || ['Fine Dining'];
      const tagsHtml = tags.map(t => `<span class="dish-tag">${t}</span>`).join('');
      
      sigHtml += `
        <div class="dish-card">
          <div class="dish-img-wrapper">
            <a href="product.html?id=${dish.id}">
              <img src="${dish.image}" alt="${title}" class="dish-img" loading="lazy">
            </a>
            <span class="dish-badge">${badge}</span>
            <span class="dish-price-tag">${dish.price} SAR</span>
          </div>
          <div class="dish-info">
            <div class="dish-tags">${tagsHtml}</div>
            <h3 class="dish-title">
              <a href="product.html?id=${dish.id}" style="color:inherit;">${title}</a>
            </h3>
            <p class="dish-desc">${desc}</p>
            <div class="dish-footer" style="padding-top:14px; border-top:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
              <span class="dish-cal"><i class="fa-solid fa-fire"></i> ${dish.calories || 0} kcal</span>
              <a href="product.html?id=${dish.id}" class="btn btn-outline btn-sm">
                <i class="fa-solid fa-eye"></i> View Dish
              </a>
            </div>
          </div>
        </div>
      `;
    });
    sigContainer.innerHTML = sigHtml;
  }

  // 3. Menu Grid
  const menuGrid = document.getElementById('menuItemsGrid');
  if (menuGrid && data.dishes) {
    renderMenuGridEN(data.dishes);
  }

  // 4. Page Content Overrides (English)
  if (data.pages && data.pages.homeEn) {
    const p = data.pages.homeEn;
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle && p.heroTitle) heroTitle.innerText = p.heroTitle;
    const heroDesc = document.getElementById('heroDesc');
    if (heroDesc && p.heroDesc) heroDesc.innerText = p.heroDesc;
    const heroSection = document.getElementById('heroSection');
    if (heroSection && p.heroImage) heroSection.style.backgroundImage = `url('${p.heroImage}')`;
  }

  // 5. Contact Info
  if (data.settings) {
    const s = data.settings;
    document.querySelectorAll('.sync-phone').forEach(el => el.innerText = s.phone);
    document.querySelectorAll('.sync-address').forEach(el => el.innerText = s.addressEn || s.address);
    document.querySelectorAll('.sync-hours').forEach(el => el.innerText = s.hoursEn || s.hours);
  }
});

function renderMenuGridEN(dishes) {
  const menuGrid = document.getElementById('menuItemsGrid');
  if (!menuGrid) return;
  let html = '';
  dishes.forEach(dish => {
    const title = dish.titleEn || dish.title;
    const desc = dish.descEn || dish.desc;
    const tagText = (dish.tagsEn && dish.tagsEn[0]) || dish.badgeEn || dish.badge || 'Chef Special';
    html += `
      <div class="menu-list-card" data-category="${dish.category}">
        <div class="menu-list-thumb">
          <a href="product.html?id=${dish.id}">
            <img src="${dish.image}" alt="${title}" loading="lazy">
          </a>
        </div>
        <div class="menu-list-content">
          <div class="menu-list-header">
            <h4 class="menu-list-title"><a href="product.html?id=${dish.id}" style="color:inherit;">${title}</a></h4>
            <span class="menu-list-price">${dish.price} SAR</span>
          </div>
          <p class="menu-list-desc">${desc}</p>
          <div class="menu-list-meta">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="menu-list-tag">${tagText}</span>
              <span class="menu-list-cal"><i class="fa-solid fa-fire"></i> ${dish.calories || 0} kcal</span>
            </div>
            <button class="btn btn-outline btn-sm quick-add-btn" onclick="quickAddToBookingEN('${title.replace(/'/g, "\\'")}')" style="padding:4px 12px; font-size:12px;">
              <i class="fa-solid fa-plus"></i> Add to Table
            </button>
          </div>
        </div>
      </div>
    `;
  });
  menuGrid.innerHTML = html;
}

function filterMenuCategoryEN(slug, btn) {
  document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.menu-list-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    if (slug === 'all' || cat === slug) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function quickAddToBookingEN(dishName) {
  const notesField = document.getElementById('bookingNotes');
  if (notesField) {
    const current = notesField.value.trim();
    if (current) {
      notesField.value = current + ' + Dish: ' + dishName;
    } else {
      notesField.value = 'Pre-order dish: ' + dishName;
    }
    notesField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    notesField.focus();
    showToastEN('Added (' + dishName + ') to your reservation notes!');
  } else {
    window.location.href = 'reservation.html?dish=' + encodeURIComponent(dishName);
  }
}

function handleBookingSubmitEN(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('[name="name"]')?.value || 'Guest';
  const phone = form.querySelector('[name="phone"]')?.value || '';
  const date = form.querySelector('[name="date"]')?.value || '';
  const time = form.querySelector('[name="time"]')?.value || '';
  const guests = form.querySelector('[name="guests"]')?.value || '';

  const modal = document.getElementById('bookingConfirmationModal');
  const modalDesc = document.getElementById('modalBookingDesc');
  if (modalDesc) {
    modalDesc.innerHTML = `
      Dear <strong>${name}</strong>,<br>
      Your reservation request for <strong>${date}</strong> at <strong>${time}</strong> (${guests}) has been received.<br>
      A confirmation WhatsApp message has been dispatched to <strong>${phone}</strong>.
    `;
  }
  if (modal) modal.classList.add('show');
  form.reset();
}

function closeModalEN() {
  const modal = document.getElementById('bookingConfirmationModal');
  if (modal) modal.classList.remove('show');
}

function showToastEN(msg) {
  const existing = document.getElementById('miralToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'miralToast';
  toast.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: #1e2227;
    color: #dfbe87;
    border: 1px solid rgba(197, 157, 63, 0.4);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    padding: 14px 22px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 700;
    z-index: 999999;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.3s ease;
  `;
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> ` + msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
