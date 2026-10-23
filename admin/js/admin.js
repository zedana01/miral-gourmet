/**
 * Miral Gourmet - Admin Control Panel Logic
 */

let appData = null;

// Ensure initialization on DOM load
document.addEventListener('DOMContentLoaded', () => {
  checkAuthOnLoad();
  initAdminData();
});

function checkAuthOnLoad() {
  const isAuth = sessionStorage.getItem('miral_admin_auth') === 'true' || localStorage.getItem('miral_admin_auth') === 'true';
  const overlay = document.getElementById('authOverlay');
  if (isAuth && overlay) {
    overlay.style.display = 'none';
  }
}

function handleAuth(event) {
  event.preventDefault();
  const pinInput = document.getElementById('pinInput');
  const errorMsg = document.getElementById('authError');
  if (pinInput && pinInput.value.trim() === '1234') {
    sessionStorage.setItem('miral_admin_auth', 'true');
    localStorage.setItem('miral_admin_auth', 'true');
    const overlay = document.getElementById('authOverlay');
    if (overlay) overlay.style.display = 'none';
    showToast('تم تسجيل الدخول بنجاح! مرحباً بك في إدارة ميرال جورميه.');
  } else {
    if (errorMsg) errorMsg.style.display = 'block';
  }
}

function handleLogout() {
  if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
    sessionStorage.removeItem('miral_admin_auth');
    localStorage.removeItem('miral_admin_auth');
    location.reload();
  }
}

function initAdminData() {
  try {
    const raw = localStorage.getItem('miral_data');
    if (raw) {
      appData = JSON.parse(raw);
    }
  } catch(e) {
    console.error(e);
  }
  if (!appData || !appData.dishes) {
    appData = DEFAULT_MIRAL_DATA;
    localStorage.setItem('miral_data', JSON.stringify(appData));
  }

  updateMetrics();
  renderDishesTable();
  renderCategoriesTable();
  renderBookingsTable();
  populateAllPageEditors();
  populateSettings();
}

function saveAppData() {
  try {
    localStorage.setItem('miral_data', JSON.stringify(appData));
    updateMetrics();
  } catch(e) {
    console.error("Save error:", e);
    alert('حدث خطأ أثناء حفظ البيانات!');
  }
}

// Switch Sidebar Tabs
function switchTab(tabId, el) {
  document.querySelectorAll('.admin-tab-pane').forEach(p => p.style.display = 'none');
  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.sidebar-nav .menu-link').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');

  const titles = {
    'tabOverview': 'لوحة الإحصائيات العامة',
    'tabDishes': 'إدارة قائمة الطعام والأطباق',
    'tabCategories': 'إدارة أقسام المنيو والتصنيفات',
    'tabPageHome': 'تعديل محتوى الصفحة الرئيسية (Home)',
    'tabPageAbout': 'تعديل قصة ميرال (عن ميرال - About Us)',
    'tabPageMenu': 'تعديل صفحة قائمة الطعام (Menu)',
    'tabPageReservation': 'تعديل صفحة حجز طاولة وولائم (Reservation)',
    'tabPageContact': 'تعديل صفحة اتصل بنا والفروع (Contact Us)',
    'tabBookings': 'سجل الحجوزات والطلبات',
    'tabSettings': 'بيانات المطعم والتواصل',
    'tabBackup': 'النسخ الاحتياطي واستعادة البيانات'
  };
  const topTitle = document.getElementById('topbarTitle');
  if (topTitle && titles[tabId]) topTitle.innerText = titles[tabId];
}

// 1. Metrics
function updateMetrics() {
  const dishCount = document.getElementById('metricDishes');
  if (dishCount) dishCount.innerText = (appData.dishes || []).length;

  const catCount = document.getElementById('metricCats');
  if (catCount) catCount.innerText = (appData.categories || []).length;

  const bookCount = document.getElementById('metricBookings');
  if (bookCount) bookCount.innerText = (appData.bookings || []).length;
}

// 2. Dishes CRUD
function renderDishesTable() {
  const tbody = document.getElementById('dishesTableBody');
  if (!tbody) return;
  let html = '';
  (appData.dishes || []).forEach(dish => {
    html += `
      <tr>
        <td>
          <img src="${dish.image}" alt="${dish.title}" class="table-dish-thumb">
        </td>
        <td>
          <strong>${dish.title}</strong>
          <div style="font-size:12px; color:var(--text-muted);">${dish.desc ? dish.desc.substring(0, 45) + '...' : ''}</div>
        </td>
        <td><span class="badge-tag">${dish.category}</span></td>
        <td><strong style="color:var(--admin-gold);">${dish.price} ر.س</strong></td>
        <td>${dish.calories} سعرة</td>
        <td>${dish.isSignature ? '<span style="color:#10b981; font-weight:800;"><i class="fa-solid fa-star"></i> طبق توقيع</span>' : '<span style="color:var(--text-dim);">عادي</span>'}</td>
        <td>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline btn-sm" onclick="editDish('${dish.id}')"><i class="fa-solid fa-pen"></i> تعديل</button>
            <button class="btn btn-danger btn-sm" onclick="deleteDish('${dish.id}')"><i class="fa-solid fa-trash"></i> حذف</button>
          </div>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

function openAddDishModal() {
  document.getElementById('dishModalTitle').innerText = 'إضافة طبق جديد للمنيو';
  document.getElementById('dishForm').reset();
  document.getElementById('dishIdInput').value = '';
  document.getElementById('dishPreviewImg').src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80';
  populateCategorySelect();
  document.getElementById('dishModal').classList.add('show');
}

function populateCategorySelect() {
  const sel = document.getElementById('dishCategoryInput');
  if (!sel) return;
  sel.innerHTML = (appData.categories || []).map(c => `<option value="${c.slug}">${c.name} (${c.slug})</option>`).join('');
}

function editDish(id) {
  const dish = (appData.dishes || []).find(d => d.id === id);
  if (!dish) return;
  populateCategorySelect();
  document.getElementById('dishModalTitle').innerText = 'تعديل طبق: ' + dish.title;
  document.getElementById('dishIdInput').value = dish.id;
  document.getElementById('dishTitleInput').value = dish.title;
  document.getElementById('dishPriceInput').value = dish.price;
  document.getElementById('dishCategoryInput').value = dish.category;
  document.getElementById('dishCalInput').value = dish.calories || 0;
  document.getElementById('dishBadgeInput').value = dish.badge || '';
  document.getElementById('dishDescInput').value = dish.desc || '';
  document.getElementById('dishImageInput').value = dish.image || '';
  document.getElementById('dishSignatureInput').checked = !!dish.isSignature;
  document.getElementById('dishPreviewImg').src = dish.image || '';
  document.getElementById('dishModal').classList.add('show');
}

function saveDish(event) {
  event.preventDefault();
  const id = document.getElementById('dishIdInput').value;
  const title = document.getElementById('dishTitleInput').value.trim();
  const price = parseFloat(document.getElementById('dishPriceInput').value) || 0;
  const category = document.getElementById('dishCategoryInput').value;
  const calories = parseInt(document.getElementById('dishCalInput').value) || 0;
  const badge = document.getElementById('dishBadgeInput').value.trim();
  const desc = document.getElementById('dishDescInput').value.trim();
  const image = document.getElementById('dishImageInput').value.trim() || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80';
  const isSignature = document.getElementById('dishSignatureInput').checked;

  if (id) {
    const idx = appData.dishes.findIndex(d => d.id === id);
    if (idx !== -1) {
      appData.dishes[idx] = { ...appData.dishes[idx], title, price, category, calories, badge, desc, image, isSignature };
    }
  } else {
    const newId = 'dish-' + Date.now();
    appData.dishes.unshift({ id: newId, title, price, category, calories, badge, desc, image, isSignature, tags: [badge || 'أصيل'] });
  }

  saveAppData();
  renderDishesTable();
  closeDishModal();
  showToast('تم حفظ بيانات الطبق بنجاح!');
}

function deleteDish(id) {
  if (confirm('هل أنت متأكد من حذف هذا الطبق نهائياً؟')) {
    appData.dishes = appData.dishes.filter(d => d.id !== id);
    saveAppData();
    renderDishesTable();
    showToast('تم حذف الطبق.');
  }
}

function closeDishModal() {
  document.getElementById('dishModal').classList.remove('show');
}

// 3. Category CRUD
function renderCategoriesTable() {
  const tbody = document.getElementById('categoriesTableBody');
  if (!tbody) return;
  let html = '';
  (appData.categories || []).forEach(cat => {
    const isProtected = cat.slug === 'all';
    html += `
      <tr>
        <td><strong>${cat.name}</strong></td>
        <td><code>${cat.slug}</code></td>
        <td><span class="badge-tag">${cat.badge || '-'}</span></td>
        <td>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-outline btn-sm" onclick="editCategory('${cat.id || cat.slug}')"><i class="fa-solid fa-pen"></i> تعديل</button>
            ${!isProtected ? `<button class="btn btn-danger btn-sm" onclick="deleteCategory('${cat.id || cat.slug}')"><i class="fa-solid fa-trash"></i> حذف</button>` : '<span style="color:var(--text-dim); font-size:12px;">(رئيسي)</span>'}
          </div>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

function openAddCategoryModal() {
  document.getElementById('categoryModalTitle').innerText = 'إضافة قسم جديد للمنيو';
  document.getElementById('categoryForm').reset();
  document.getElementById('catIdInput').value = '';
  document.getElementById('categoryModal').classList.add('show');
}

function editCategory(id) {
  const cat = (appData.categories || []).find(c => c.id === id || c.slug === id);
  if (!cat) return;
  document.getElementById('categoryModalTitle').innerText = 'تعديل قسم: ' + cat.name;
  document.getElementById('catIdInput').value = cat.id || cat.slug;
  document.getElementById('catNameInput').value = cat.name;
  document.getElementById('catSlugInput').value = cat.slug;
  document.getElementById('catBadgeInput').value = cat.badge || '';
  document.getElementById('categoryModal').classList.add('show');
}

function saveCategory(event) {
  event.preventDefault();
  const id = document.getElementById('catIdInput').value;
  const name = document.getElementById('catNameInput').value.trim();
  const slug = document.getElementById('catSlugInput').value.trim().toLowerCase();
  const badge = document.getElementById('catBadgeInput').value.trim();

  if (id) {
    const idx = appData.categories.findIndex(c => c.id === id || c.slug === id);
    if (idx !== -1) {
      appData.categories[idx] = { ...appData.categories[idx], name, slug, badge };
    }
  } else {
    appData.categories.push({ id: slug, name, slug, badge });
  }

  saveAppData();
  renderCategoriesTable();
  closeCategoryModal();
  showToast('تم حفظ القسم بنجاح!');
}

function deleteCategory(id) {
  if (confirm('هل أنت متأكد من حذف هذا القسم؟ لن يتم حذف الأطباق التابعة له.')) {
    appData.categories = appData.categories.filter(c => c.id !== id && c.slug !== id);
    saveAppData();
    renderCategoriesTable();
    showToast('تم حذف القسم.');
  }
}

function closeCategoryModal() {
  document.getElementById('categoryModal').classList.remove('show');
}

// 4. Page Editors
function populateAllPageEditors() {
  const p = appData.pages || {};

  // Home
  if (p.home) {
    setVal('homeHeroBadge', p.home.heroBadge);
    setVal('homeHeroTitle', p.home.heroTitle);
    setVal('homeHeroDesc', p.home.heroDesc);
    setVal('homeHeroImage', p.home.heroImage);
    setImg('homeHeroPreview', p.home.heroImage);
    setVal('homeStoryTitle', p.home.storyTitle);
    setVal('homeStoryP1', p.home.storyP1);
    setVal('homeStoryP2', p.home.storyP2);
    setVal('homeStoryImage', p.home.storyImage);
    setImg('homeStoryPreview', p.home.storyImage);
    setVal('homeQuoteText', p.home.quoteText);
    setVal('homeChefName', p.home.chefName);
  }

  // About
  if (p.about) {
    setVal('aboutPageTitle', p.about.pageTitle);
    setVal('aboutPageSubtitle', p.about.pageSubtitle);
    setVal('aboutStoryHeadline', p.about.storyHeadline);
    setVal('aboutP1', p.about.p1);
    setVal('aboutP2', p.about.p2);
    setVal('aboutStoryImage', p.about.storyImage);
    setImg('aboutStoryPreview', p.about.storyImage);
    setVal('aboutChefQuote', p.about.chefQuote);
    setVal('aboutChefName', p.about.chefName);
  }

  // Menu
  if (p.menu) {
    setVal('menuPageTitle', p.menu.pageTitle);
    setVal('menuPageSubtitle', p.menu.pageSubtitle);
  }

  // Reservation
  if (p.reservation) {
    setVal('resPageTitle', p.reservation.pageTitle);
    setVal('resPageSubtitle', p.reservation.pageSubtitle);
    setVal('resWhatsapp', p.reservation.whatsappPhone);
  }

  // Contact
  if (p.contact) {
    setVal('contactPageTitle', p.contact.pageTitle);
    setVal('contactPageSubtitle', p.contact.pageSubtitle);
    setVal('contactAddress', p.contact.address);
    setVal('contactPhone', p.contact.phone);
    setVal('contactHours', p.contact.hours);
  }
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function setImg(id, src) {
  const el = document.getElementById(id);
  if (el && src) el.src = src;
}

function savePageData(pageKey) {
  if (!appData.pages) appData.pages = {};

  if (pageKey === 'home') {
    appData.pages.home = {
      heroBadge: document.getElementById('homeHeroBadge').value,
      heroTitle: document.getElementById('homeHeroTitle').value,
      heroDesc: document.getElementById('homeHeroDesc').value,
      heroImage: document.getElementById('homeHeroImage').value,
      storyTitle: document.getElementById('homeStoryTitle').value,
      storyP1: document.getElementById('homeStoryP1').value,
      storyP2: document.getElementById('homeStoryP2').value,
      storyImage: document.getElementById('homeStoryImage').value,
      quoteText: document.getElementById('homeQuoteText').value,
      chefName: document.getElementById('homeChefName').value
    };
  } else if (pageKey === 'about') {
    appData.pages.about = {
      pageTitle: document.getElementById('aboutPageTitle').value,
      pageSubtitle: document.getElementById('aboutPageSubtitle').value,
      storyHeadline: document.getElementById('aboutStoryHeadline').value,
      p1: document.getElementById('aboutP1').value,
      p2: document.getElementById('aboutP2').value,
      storyImage: document.getElementById('aboutStoryImage').value,
      chefQuote: document.getElementById('aboutChefQuote').value,
      chefName: document.getElementById('aboutChefName').value
    };
  } else if (pageKey === 'menu') {
    appData.pages.menu = {
      pageTitle: document.getElementById('menuPageTitle').value,
      pageSubtitle: document.getElementById('menuPageSubtitle').value
    };
  } else if (pageKey === 'reservation') {
    appData.pages.reservation = {
      pageTitle: document.getElementById('resPageTitle').value,
      pageSubtitle: document.getElementById('resPageSubtitle').value,
      whatsappPhone: document.getElementById('resWhatsapp').value
    };
  } else if (pageKey === 'contact') {
    appData.pages.contact = {
      pageTitle: document.getElementById('contactPageTitle').value,
      pageSubtitle: document.getElementById('contactPageSubtitle').value,
      address: document.getElementById('contactAddress').value,
      phone: document.getElementById('contactPhone').value,
      hours: document.getElementById('contactHours').value
    };
  }

  saveAppData();
  showToast('تم حفظ تعديلات صفحة (' + pageKey + ') بنجاح وربطها بالموقع!');
}

function resetPageData(pageKey) {
  if (confirm('هل أنت متأكد من إلغاء التعديلات واستعادة المحتوى السابق؟')) {
    populateAllPageEditors();
    showToast('تم إلغاء التغييرات والتراجع بنجاح.');
  }
}

// 5. Bookings Log
function renderBookingsTable() {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;
  let html = '';
  (appData.bookings || []).forEach((b, idx) => {
    const isConfirmed = b.status === 'مؤكد';
    html += `
      <tr>
        <td><strong>${b.id || ('BK-' + idx)}</strong></td>
        <td><strong>${b.name}</strong></td>
        <td><a href="tel:${b.phone}" style="color:var(--admin-gold); direction:ltr;">${b.phone}</a></td>
        <td>${b.date} (${b.time})</td>
        <td>${b.guests}</td>
        <td>${b.seating}</td>
        <td>
          <button class="btn btn-sm ${isConfirmed ? 'btn-primary' : 'btn-outline'}" onclick="toggleBookingStatus('${b.id}')">
            ${b.status || 'قيد الانتظار'}
          </button>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteBooking('${b.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

function toggleBookingStatus(id) {
  const b = (appData.bookings || []).find(x => x.id === id);
  if (!b) return;
  b.status = b.status === 'مؤكد' ? 'مكتمل' : (b.status === 'مكتمل' ? 'قيد الانتظار' : 'مؤكد');
  saveAppData();
  renderBookingsTable();
  showToast('تم تحديث حالة الحجز إلى: ' + b.status);
}

function deleteBooking(id) {
  if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
    appData.bookings = appData.bookings.filter(b => b.id !== id);
    saveAppData();
    renderBookingsTable();
    showToast('تم حذف الحجز من السجل.');
  }
}

// 6. Settings
function populateSettings() {
  const s = appData.settings || {};
  setVal('setRestName', s.restaurantName);
  setVal('setPhone', s.phone);
  setVal('setWhatsapp', s.whatsapp);
  setVal('setAddress', s.address);
  setVal('setHours', s.hours);
  setVal('setEmail', s.email);
}

function saveSettings(event) {
  event.preventDefault();
  appData.settings = {
    restaurantName: document.getElementById('setRestName').value,
    phone: document.getElementById('setPhone').value,
    whatsapp: document.getElementById('setWhatsapp').value,
    address: document.getElementById('setAddress').value,
    hours: document.getElementById('setHours').value,
    email: document.getElementById('setEmail').value
  };
  saveAppData();
  showToast('تم حفظ إعدادات وبيانات المطعم بنجاح!');
}

// 7. Image Upload Handler
function handleFileUpload(input, targetUrlInputId, previewImgId) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      document.getElementById(targetUrlInputId).value = dataUrl;
      const preview = document.getElementById(previewImgId);
      if (preview) preview.src = dataUrl;
      showToast('تم رفع الصورة بنجاح!');
    };
    reader.readAsDataURL(file);
  }
}

// 8. Backup & Restore
function exportBackup() {
  const jsonStr = JSON.stringify(appData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'miral_gourmet_backup_' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  showToast('تم تنزيل النسخة الاحتياطية بنجاح!');
}

function importBackup(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported && imported.dishes) {
          appData = imported;
          saveAppData();
          location.reload();
        } else {
          alert('ملف غير صالح!');
        }
      } catch(err) {
        alert('حدث خطأ أثناء قراءة ملف النسخة الاحتياطية!');
      }
    };
    reader.readAsText(input.files[0]);
  }
}

function resetAllData() {
  if (confirm('تحذير: هل أنت متأكد من استعادة بيانات الموقع إلى الإعدادات الافتراضية الأصلية بالكامل؟')) {
    localStorage.removeItem('miral_data');
    location.reload();
  }
}

// Toast
function showToast(msg) {
  const existing = document.getElementById('adminToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'adminToast';
  toast.style.cssText = `
    position: fixed;
    bottom: 25px;
    left: 25px;
    background: #1c2024;
    color: #dfbe87;
    border: 1px solid rgba(197, 157, 63, 0.4);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    padding: 14px 24px;
    border-radius: 9999px;
    font-size: 14.5px;
    font-weight: 800;
    z-index: 9999999;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.3s ease;
  `;
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--admin-gold);"></i> ` + msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
