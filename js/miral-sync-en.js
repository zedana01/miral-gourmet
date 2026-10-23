/**
 * Miral Gourmet - English CMS Sync Engine
 */

const DEFAULT_MIRAL_DATA_EN = {
  settings: {
    restaurantName: "Miral Gourmet & Ristorante",
    restaurantSub: "FINE MEDITERRANEAN DINING • RIYADH",
    phone: "+966 11 480 8899",
    whatsapp: "+966114808899",
    address: "Riyadh, Prince Muhammad Ibn Abd Al Aziz Rd (Tahlia St)",
    hours: "Daily: 12:30 PM - 1:30 AM",
    email: "info@miral-gourmet.sa"
  },
  categories: [
    { id: "all", name: "All Dishes", slug: "all", badge: "The Complete Royal Table" },
    { id: "mains", name: "Main Courses", slug: "mains", badge: "Mediterranean Culinary Art" },
    { id: "appetizers", name: "Starters & Salads", slug: "appetizers", badge: "Farm-Fresh & Organic" },
    { id: "grills", name: "Grills & Steaks", slug: "grills", badge: "Charred over Olive Wood" },
    { id: "desserts", name: "Desserts & Mocktails", slug: "desserts", badge: "24K Gold & Signature Sips" }
  ],
  dishes: [
    {
      id: "dish-1",
      title: "Charcoal Grilled Lamb Chops with Sidr Honey & Mountain Thyme",
      category: "grills",
      price: 285,
      calories: 640,
      tags: ["Prime NZ Lamb", "Gluten-Free"],
      desc: "Tender lamb chops char-grilled over olive wood embers, served with velvet potato mousseline, wild mountain thyme jus and cranberry glaze.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "Chef's Selection"
    },
    {
      id: "dish-2",
      title: "Wild Sea Bream Fillet with Lemon Caper Emulsion",
      category: "mains",
      price: 260,
      calories: 490,
      tags: ["Daily Catch", "Light & Healthy"],
      desc: "Crispy-skin wild sea bream served over grilled jumbo green asparagus, Sicilian lemon butter reduction and fresh ocean herbs.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "Catch of the Day"
    },
    {
      id: "dish-3",
      title: "A5 Wagyu Tenderloin Steak with Black Truffle Butter",
      category: "grills",
      price: 440,
      calories: 720,
      tags: ["Authentic Japanese Wagyu", "Marble Score 9+"],
      desc: "Melt-in-your-mouth aged Japanese tenderloin grilled to your liking, accompanied by caramelized shiitake and Italian black truffle glaze.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "Aged A5 Wagyu"
    },
    {
      id: "dish-4",
      title: "Wild Mushroom Risotto with White Truffle Shavings",
      category: "mains",
      price: 195,
      calories: 530,
      tags: ["Classic Italian", "Vegetarian Fine Dining"],
      desc: "Carnaroli rice slow-cooked in aromatic garden vegetable stock, 24-month aged Parmigiano-Reggiano, porcini medley and white truffle.",
      image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "Carnaroli Risotto"
    },
    {
      id: "dish-5",
      title: "Puglia Burrata with Caramelized Figs & Basil Pesto",
      category: "appetizers",
      price: 145,
      calories: 410,
      tags: ["Artisan Cheese", "Farm Fresh"],
      desc: "Creamy artisanal Italian burrata ball served with honey-glazed fresh figs, sun-dried cherry tomatoes, sweet basil and aged balsamic reduction.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "Fresh Daily"
    },
    {
      id: "dish-6",
      title: "Pistachio Mille-Feuille with Royal Cotton Candy",
      category: "desserts",
      price: 125,
      calories: 480,
      tags: ["Signature Sweet", "Pure Pistachio"],
      desc: "Crispy caramelized puff pastry layers filled with velvety Sicilian pistachio cream and adorned with edible 24K gold leaves.",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "Signature Dessert"
    },
    {
      id: "dish-7",
      title: "Roasted Quail Stuffed with Smoked Freekeh & Pine Nuts",
      category: "mains",
      price: 210,
      calories: 520,
      tags: ["Elevated Heritage"],
      desc: "Slow-roasted tender quail stuffed with heirloom green freekeh, toasted golden pine nuts and tart pomegranate glaze reduction.",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "Chef Special"
    },
    {
      id: "dish-8",
      title: "Citrus-Cured Norwegian Salmon Ceviche",
      category: "appetizers",
      price: 135,
      calories: 340,
      tags: ["Gluten-Free", "Raw Bar"],
      desc: "Sashimi-grade salmon cubes cured in fresh Sicilian lemon and blood orange, garnished with avocado, radish crisp and fennel seed oil.",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "Ocean Fresh"
    },
    {
      id: "dish-9",
      title: "USDA Prime Black Angus Ribeye (350g)",
      category: "grills",
      price: 360,
      calories: 780,
      tags: ["Top Choice", "Prime Cut"],
      desc: "Heavily marbled ribeye steak grilled over olive wood embers with garden herb butter, green peppercorn jus and crisp potato wedges.",
      image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "Top Seller"
    },
    {
      id: "dish-10",
      title: "Moroccan Veal Tagine with Sun-Dried Prunes & Golden Almonds",
      category: "mains",
      price: 245,
      calories: 590,
      tags: ["Claypot Braise"],
      desc: "Succulent veal shank braised in an authentic clay tagine with aged Ras el Hanout spices, simmered prunes and toasted sesame seeds.",
      image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "Claypot Slow Cook"
    },
    {
      id: "dish-11",
      title: "Truffle Hummus with Spiced Beef Tenderloin & Pine Nuts",
      category: "appetizers",
      price: 95,
      calories: 420,
      tags: ["Miral Mezze"],
      desc: "Velvety smooth chickpea purée infused with black truffle paste, topped with seared spiced beef slivers and roasted local pine nuts.",
      image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "Warm Starter"
    },
    {
      id: "dish-12",
      title: "Local Lamb Awssal Skewers with Rosewater & Saffron",
      category: "grills",
      price: 220,
      calories: 610,
      tags: ["Artisan Skewers"],
      desc: "Tender lamb chunks marinated in premium Persian saffron, subtle rosewater essence and caramelized onions, char-grilled on wooden skewers.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "Wood Charcoal"
    },
    {
      id: "dish-13",
      title: "Qassim Kholas Date Cheesecake with Salted Caramel",
      category: "desserts",
      price: 95,
      calories: 450,
      tags: ["Modern Fusion"],
      desc: "Crispy cardamom biscuit base topped with rich cream cheese infused with Qassimi Kholas dates and Madagascar vanilla bean ice cream.",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "Sweet Indulgence"
    },
    {
      id: "dish-14",
      title: "Miral Royal Gold Signature Mocktail",
      category: "desserts",
      price: 68,
      calories: 180,
      tags: ["Signature Sip"],
      desc: "A refreshing blend of fresh ruby pomegranate, Taif rosewater essence and pressed wild berries, sprinkled with shimmering edible gold flakes.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "Royal Beverage"
    }
  ]
};

function getMiralDataEN() {
  return DEFAULT_MIRAL_DATA_EN;
}

// Render dynamic content on client English storefront
document.addEventListener('DOMContentLoaded', () => {
  const data = getMiralDataEN();

  // 1. Sync Categories in Navigation/Tabs
  const tabsContainer = document.getElementById('menuTabsNav');
  if (tabsContainer && data.categories) {
    let tabsHtml = '';
    data.categories.forEach((cat, idx) => {
      tabsHtml += `
        <div style="display:inline-flex; align-items:center; gap:4px;">
          <button class="menu-tab-btn ${idx === 0 ? 'active' : ''}" onclick="filterMenuCategoryEN('${cat.slug}', this)">
            ${cat.name}
          </button>
          <a href="category.html?cat=${cat.slug}" title="View ${cat.name} category page" style="color:var(--primary); font-size:12px; background:var(--primary-subtle); padding:8px 10px; border-radius:50%; border:1px solid var(--primary-border);">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      `;
    });
    tabsContainer.innerHTML = tabsHtml;
  }

  // 2. Sync Signature Dishes Grid
  const sigContainer = document.getElementById('signaturesGrid');
  if (sigContainer && data.dishes) {
    const sigDishes = data.dishes.filter(d => d.isSignature);
    let sigHtml = '';
    sigDishes.forEach(dish => {
      const tagsHtml = (dish.tags || []).map(t => `<span class="dish-tag">${t}</span>`).join('');
      sigHtml += `
        <div class="dish-card">
          <div class="dish-img-wrapper">
            <a href="product.html?id=${dish.id}">
              <img src="${dish.image}" alt="${dish.title}" class="dish-img" loading="lazy">
            </a>
            <span class="dish-badge">${dish.badge || 'Signature'}</span>
            <span class="dish-price-tag">${dish.price} SAR</span>
          </div>
          <div class="dish-info">
            <div class="dish-tags">${tagsHtml}</div>
            <h3 class="dish-title">
              <a href="product.html?id=${dish.id}" style="color:inherit;">${dish.title}</a>
            </h3>
            <p class="dish-desc">${dish.desc}</p>
            <div class="dish-footer" style="padding-top:14px; border-top:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
              <span class="dish-cal"><i class="fa-solid fa-fire"></i> ${dish.calories} kcal</span>
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

  // 3. Sync Menu Items Grid
  const menuGrid = document.getElementById('menuItemsGrid');
  if (menuGrid && data.dishes) {
    renderMenuGridEN(data.dishes);
  }
});

function renderMenuGridEN(dishes) {
  const menuGrid = document.getElementById('menuItemsGrid');
  if (!menuGrid) return;
  let html = '';
  dishes.forEach(dish => {
    const tagText = (dish.tags && dish.tags[0]) || dish.badge || 'Chef Special';
    html += `
      <div class="menu-list-card" data-category="${dish.category}">
        <div class="menu-list-thumb">
          <a href="product.html?id=${dish.id}">
            <img src="${dish.image}" alt="${dish.title}" loading="lazy">
          </a>
        </div>
        <div class="menu-list-content">
          <div class="menu-list-header">
            <h4 class="menu-list-title"><a href="product.html?id=${dish.id}" style="color:inherit;">${dish.title}</a></h4>
            <span class="menu-list-price">${dish.price} SAR</span>
          </div>
          <p class="menu-list-desc">${dish.desc}</p>
          <div class="menu-list-meta">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="menu-list-tag">${tagText}</span>
              <span class="menu-list-cal"><i class="fa-solid fa-fire"></i> ${dish.calories || 0} kcal</span>
            </div>
            <button class="btn btn-outline btn-sm quick-add-btn" onclick="quickAddToBookingEN('${dish.title.replace(/'/g, "\\'")}')" style="padding:4px 12px; font-size:12px;">
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
