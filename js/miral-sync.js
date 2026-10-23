/**
 * Miral Gourmet - Client CMS Sync Engine
 * Synchronizes dishes, categories, page contents and settings from localStorage ('miral_data')
 */

const DEFAULT_MIRAL_DATA = {
  version: 3,
  settings: {
    restaurantName: "مطعم ميرال جورميه",
    restaurantSub: "MIRAL GOURMET • RIYADH",
    phone: "+966 11 480 8899",
    whatsapp: "+966501234567",
    address: "الرياض، طريق الأمير محمد بن عبد العزيز (التحلية)",
    hours: "يومياً: 12:30 ظهراً - 1:30 بعد منتصف الليل",
    email: "info@miral-gourmet.sa"
  },
  categories: [
    { id: "all", name: "جميع الأطباق", slug: "all", badge: "المائدة الملكية المتكاملة" },
    { id: "mains", name: "الأطباق الرئيسية", slug: "mains", badge: "أطايب البحر الأبيض المتوسط" },
    { id: "appetizers", name: "المقبلات والسلطات", slug: "appetizers", badge: "طازجة وعضوية يومياً" },
    { id: "grills", name: "المشويات واللحوم", slug: "grills", badge: "على حطب الزيتون الطبيعي" },
    { id: "desserts", name: "الحلويات والموكتيل", slug: "desserts", badge: "لمسات الذهب والمذاق الراقي" }
  ],
  dishes: [
    {
      id: "dish-1",
      title: "ريش الضأن المشوية بعسل السدر والزعتر البري",
      category: "grills",
      price: 285,
      calories: 640,
      tags: ["لحوم نيوزيلندية فاخرة", "خالٍ من الجلوتين"],
      desc: "أضلاع لحم ضأن طرية مشوية على لهب الحطب، مقدمة مع بيوريه البطاطس المخملية وصلصة التوت البري والزعتر الجبلي.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "اختيار الشيف"
    },
    {
      id: "dish-2",
      title: "فيليه الدنيس البري بصلصة الليمون والكَبَر",
      category: "mains",
      price: 260,
      calories: 490,
      tags: ["بحريات طازجة", "صحي ومتوازن"],
      desc: "سمك دنيس بحري طازج مشوي بجلد مقرمش مع الهليون الأخضر المشوي وصلصة زبدة الليمون الصقلي والأعشاب البحرية المنعشة.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "صيد اليوم الطازج"
    },
    {
      id: "dish-3",
      title: "ستيك تندرلوين واغيو مع زبدة الكمأة السوداء",
      category: "grills",
      price: 440,
      calories: 720,
      tags: ["لحم ياباني أصيل", "درجة ماربلينغ 9+"],
      desc: "قطعة تندرلوين يابانية معتقة تذوب في الفم، تُشوى حسب طلبكم وتُقدم مع فطر الشيتاكي المكرمل ورذاذ زيت الكمأة الإيطالي.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "واغيو A5 معتق"
    },
    {
      id: "dish-4",
      title: "ريزوتو الفطر البري ورقائق الكمأة البيضاء",
      category: "mains",
      price: 195,
      calories: 530,
      tags: ["طبق إيطالي كلاسيكي", "نباتي راقٍ"],
      desc: "أرز كارنارولي مطهو بمرق الخضار العطري وجبن البارميزان المعتق 24 شهراً مع مزيج فطر البورسيني ورقائق الكمأة الفاخرة.",
      image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "أرز كارنارولي أصيل"
    },
    {
      id: "dish-5",
      title: "بوراتا بوليا الطازجة مع التين المكرمل والبيستو",
      category: "appetizers",
      price: 145,
      calories: 410,
      tags: ["مقبلات باردة", "نباتي منعش"],
      desc: "كرة جبن بوراتا كريمية إيطالية مع تين طازج مكرمل، طماطم كرزية مجففة بالشمس، ريحان طازج، ورذاذ الخل البلسمي المعتق.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "طازج يومياً"
    },
    {
      id: "dish-6",
      title: "ميل فاي الفستق الحلبي مع غزل البنات الملكي",
      category: "desserts",
      price: 125,
      calories: 480,
      tags: ["حلويات ميرال", "فستق حلبي طبيعي"],
      desc: "طبقات البف باستري الهشة والكراميل الخفيف محشوة بكريمة الفستق الحلبي المخملية ومزينة بلمسات ذهبية عيار 24 قابلة للأكل.",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
      isSignature: true,
      badge: "حلى التوقيع"
    },
    {
      id: "dish-7",
      title: "سمان محشي بالفريكة والمكسرات",
      category: "mains",
      price: 210,
      calories: 520,
      tags: ["طبق تقليدي مطور"],
      desc: "سمان مشوي ببطء محشو بالفريكة البلدية الفاخرة والصنوبر المقلي مع مرق الرمان المركز.",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "مميز"
    },
    {
      id: "dish-8",
      title: "سيفيتشي السلمون النرويجي بالحمضيات",
      category: "appetizers",
      price: 135,
      calories: 340,
      tags: ["خالٍ من الجلوتين"],
      desc: "مكعبات سلمون طازجة منقوعة في عصير الليمون والبرتقال مع الأفوكادو، رقائق الفجل، وزيت الشمر.",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "طازج"
    },
    {
      id: "dish-9",
      title: "ريب آي بلاك أنجوس الأمريكي (350 جم)",
      category: "grills",
      price: 360,
      calories: 780,
      tags: ["الأكثر طلباً"],
      desc: "شريحة ريب آي رخامية مشوية بدرجة طلبك مع زبدة الأعشاب ومرق الفلفل الأخضر الحار وبطاطس ودجز مقرمشة.",
      image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "الأكثر طلباً"
    },
    {
      id: "dish-10",
      title: "تاجين لحم العجل بالبرقوق واللوز الذهبي",
      category: "mains",
      price: 245,
      calories: 590,
      tags: ["أصيل ومميز"],
      desc: "لحم عجل طري مطهو في فخار مغربي أصيل مع بهارات رأس الحانوت المعتقة والسمسم المحمص.",
      image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "مطهو بالفخار"
    },
    {
      id: "dish-11",
      title: "حمص ميرال بالكمأة واللحم البقري",
      category: "appetizers",
      price: 95,
      calories: 420,
      tags: ["توقيع ميرال"],
      desc: "حمص ناعم مخملي ممزوج بمعجون الكمأة الإيطالي ومغطى بشرائح لحم بقري متبلة وصنوبر بلدي.",
      image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "مقبلات ساخنة"
    },
    {
      id: "dish-12",
      title: "أوصال غنم بلدي بماء الورد والزعفران",
      category: "grills",
      price: 220,
      calories: 610,
      tags: ["لحم بلدي طازج"],
      desc: "قطع لحم غنم نعيمي طازجة متبلة بالزعفران الإيراني الفاخر وبصل الكراميل المشوي على السيخ الخشبي.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "مشويات"
    },
    {
      id: "dish-13",
      title: "تشيز كيك التمر الخلاص بالتوفي المملح",
      category: "desserts",
      price: 95,
      calories: 450,
      tags: ["حلى شرقي عصري"],
      desc: "قاعدة بسكويت الهيل المقرمشة مع طبقة جبن كريمي غني بنكهة تمر الخلاص القصيمي وآيس كريم الفانيليا.",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
      isSignature: false,
      badge: "حلوى"
    },
    {
      id: "dish-14",
      title: "موكتيل ميرال الملكي (Royal Gold)",
      category: "desserts",
      price: 68,
      calories: 180,
      tags: ["مشروب التوقيع"],
      desc: "مزيج منعش من الرمان الطازج وخلاصة الورد الطائفي وعصير التوت مع رذاذ أوراق الذهب الغذائية اللامعة.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
      isSignature: false,
      badge: "مشروبات راقية"
    }
  ],
  pages: {
    home: {
      heroBadge: "✨ التميز في الضيافة الراقية 2026",
      heroTitle: "فن الطهي العصري بروح الضيافة الأندلسية والمتوسطية",
      heroDesc: "نأخذكم في رحلة ذوقية حصرية تلتقي فيها أجود المكونات العضوية الطازجة مع لمسات الشيف المبتكرة في أجواء مضيئة وفاتنة تأسر الحواس.",
      heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85",
      storyTitle: "حيث يتجلى شغف الطهي في لوحة بيضاء ناصعة الجمال",
      storyP1: "انطلق مطعم «ميرال» من رؤية جريئة تهدف إلى إعادة تعريف مفهوم المطاعم الفاخرة في قلب الرياض: كسر القوالب المظلمة وابتكار بيئة بيضاء مشرقة تشع بالحياة والجمال.",
      storyP2: "نحن نؤمن بأن كل طبق يقدم على مائدة ميرال هو عمل فني متكامل؛ تبدأ الرحلة من اختيار الحبوب والزيوت المعصورة على البارد، مروراً بالأسماك الطازجة المصطادة يومياً من مياه البحر الأحمر، وحتى تقنيات الطهي البطيء التي تمنح الأطباق نكهات عميقة لا تُنسى.",
      storyImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      quoteText: "إن الطهي ليس مجرد وصفات تُطبّق، بل هو حوار صامت بين روح الشيف وحواس الضيف. في ميرال نسعى لأن تكون كل لقمة ذكرى خالدة.",
      chefName: "الشيف فابريزيو لوران - رئيس الطهاة التنفيذي"
    },
    about: {
      pageTitle: "قصة ميرال وفلسفة الضيافة",
      pageSubtitle: "أكثر من خمسة عشر عاماً من الشغف في تقديم أصول الطهي المتوسطي الراقي",
      storyHeadline: "لوحة بيضاء ناصعة وفن طهي بلا حدود",
      p1: "انطلق مطعم «ميرال» من رؤية جريئة تهدف إلى إعادة تعريف مفهوم المطاعم الفاخرة في قلب الرياض: كسر القوالب المظلمة وابتكار بيئة بيضاء مشرقة تشع بالحياة والجمال.",
      p2: "نلتزم بأعلى معايير الجودة الغذائية، مستخدمين أجود المكونات العضوية الطازجة وزيت الزيتون الصقلي والأسماك اليومية لنقدم لأحبائنا وضيوفنا ولائم تليق بمقامهم الرفيع.",
      storyImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
      chefQuote: "نحن لا نطهو الطعام فحسب، بل نحفظ هوية المائدة الراقية وننسج منها ذكريات تدوم.",
      chefName: "الشيف فابريزيو لوران"
    },
    menu: {
      pageTitle: "قائمة طعام ميرال جورميه",
      pageSubtitle: "سيمفونية من المذاقات الرفيعة تلبي كل الأذواق بأيدي أمهر الطهاة العالميين"
    },
    reservation: {
      pageTitle: "احجز مائدتك الراقية",
      pageSubtitle: "نستقبلكم في تراس الحديقة المفتوح وصالونات VIP الملكية لتجربة استثنائية",
      whatsappPhone: "+966 11 480 8899"
    },
    contact: {
      pageTitle: "تواصل معنا واحجز موعدك",
      pageSubtitle: "فريق ضيافة ميرال رهن إشارتكم لتلبية كافة الترتيبات والمناسبات الخاصة",
      address: "الرياض، حي السليمانية، طريق التحلية، مجمع ميرال للضيافة",
      phone: "+966 11 480 8899",
      hours: "فترة الغداء: 12:30 م - 05:00 م | فترة العشاء: 06:30 م - 01:30 ص"
    }
  },
  bookings: [
    {
      id: "BK-101",
      name: "سعود آل مقرن",
      phone: "+966509988776",
      guests: "4 أشخاص (عائلية)",
      date: "2026-10-25",
      time: "08:00 مساءً",
      seating: "صالون VIP كبار الشخصيات",
      occasion: "عشاء عمل رسمي",
      status: "مؤكد",
      notes: "يرجى تجهيز طاولة قريبة من النافذة"
    },
    {
      id: "BK-102",
      name: "د. فيصل الهاجري",
      phone: "+966551234567",
      guests: "شخصان (طاولة ثنائية)",
      date: "2026-10-26",
      time: "09:30 مساءً",
      seating: "تراس الحديقة المفتوح",
      occasion: "ذكرى زواج",
      status: "مؤكد",
      notes: "باقة ورد وكعكة ميرال الترحيبية"
    }
  ]
};

// Getter & Setter for Data
function getMiralData() {
  try {
    const raw = localStorage.getItem('miral_data');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.version === 3) {
        return parsed;
      }
      // Migrate dishes to ensure high quality images
      parsed.version = 3;
      parsed.dishes = DEFAULT_MIRAL_DATA.dishes;
      localStorage.setItem('miral_data', JSON.stringify(parsed));
      return parsed;
    }
  } catch (e) {
    console.error("Error reading miral_data:", e);
  }
  localStorage.setItem('miral_data', JSON.stringify(DEFAULT_MIRAL_DATA));
  return DEFAULT_MIRAL_DATA;
}

function saveMiralData(data) {
  try {
    localStorage.setItem('miral_data', JSON.stringify(data));
  } catch(e) {
    console.error("Error saving miral_data:", e);
  }
}

// Render dynamic content on client storefront
document.addEventListener('DOMContentLoaded', () => {
  const data = getMiralData();
  
  // 1. Sync Categories in Navigation/Tabs
  const tabsContainer = document.getElementById('menuTabsNav');
  if (tabsContainer && data.categories) {
    let tabsHtml = '';
    data.categories.forEach((cat, idx) => {
      tabsHtml += `
        <button class="menu-tab-btn ${idx === 0 ? 'active' : ''}" onclick="filterMenuCategory('${cat.slug}', this)">
          ${cat.name}
        </button>
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
            <img src="${dish.image}" alt="${dish.title}" class="dish-img" loading="lazy">
            <span class="dish-badge">${dish.badge || 'مميز'}</span>
            <span class="dish-price-tag">${dish.price} ر.س</span>
          </div>
          <div class="dish-info">
            <div class="dish-tags">${tagsHtml}</div>
            <h3 class="dish-title">${dish.title}</h3>
            <p class="dish-desc">${dish.desc}</p>
            <div class="dish-footer">
              <span class="dish-cal"><i class="fa-solid fa-fire"></i> ${dish.calories} سعرة</span>
              <button class="btn btn-outline btn-sm" onclick="quickAddToBooking('${dish.title.replace(/'/g, "\'")}')">
                <i class="fa-solid fa-plus"></i> إضافة للحجز
              </button>
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
    window._allMiralDishes = data.dishes;
    renderMenuGrid(data.dishes);
  }

  // 4. Page Content Overrides
  // Home Page
  if (data.pages && data.pages.home) {
    const p = data.pages.home;
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle && p.heroTitle) heroTitle.innerText = p.heroTitle;
    const heroDesc = document.getElementById('heroDesc');
    if (heroDesc && p.heroDesc) heroDesc.innerText = p.heroDesc;
    const heroSection = document.getElementById('heroSection');
    if (heroSection && p.heroImage) heroSection.style.backgroundImage = `url('${p.heroImage}')`;
    
    const storyTitle = document.getElementById('storyTitle');
    if (storyTitle && p.storyTitle) storyTitle.innerText = p.storyTitle;
    const storyP1 = document.getElementById('storyP1');
    if (storyP1 && p.storyP1) storyP1.innerText = p.storyP1;
    const storyP2 = document.getElementById('storyP2');
    if (storyP2 && p.storyP2) storyP2.innerText = p.storyP2;
    const storyImage = document.getElementById('storyImage');
    if (storyImage && p.storyImage) storyImage.src = p.storyImage;
  }

  // Contact info sync
  if (data.settings) {
    document.querySelectorAll('.sync-phone').forEach(el => el.innerText = data.settings.phone);
    document.querySelectorAll('.sync-address').forEach(el => el.innerText = data.settings.address);
    document.querySelectorAll('.sync-hours').forEach(el => el.innerText = data.settings.hours);
  }
});

function renderMenuGrid(dishes) {
  const menuGrid = document.getElementById('menuItemsGrid');
  if (!menuGrid) return;
  let html = '';
  dishes.forEach(dish => {
    const tagText = (dish.tags && dish.tags[0]) || dish.badge || 'أصيل';
    html += `
      <div class="menu-list-card" data-category="${dish.category}">
        <div class="menu-list-thumb">
          <img src="${dish.image}" alt="${dish.title}" loading="lazy">
        </div>
        <div class="menu-list-content">
          <div class="menu-list-header">
            <h4 class="menu-list-title">${dish.title}</h4>
            <span class="menu-list-price">${dish.price} ر.س</span>
          </div>
          <p class="menu-list-desc">${dish.desc}</p>
          <div class="menu-list-meta">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="menu-list-tag">${tagText}</span>
              <span class="menu-list-cal"><i class="fa-solid fa-fire"></i> ${dish.calories || 0} سعرة</span>
            </div>
            <button class="btn btn-outline btn-sm quick-add-btn" onclick="quickAddToBooking('${dish.title.replace(/'/g, "\'")}')" style="padding:4px 12px; font-size:12px;">
              <i class="fa-solid fa-plus"></i> إضافة للحجز
            </button>
          </div>
        </div>
      </div>
    `;
  });
  menuGrid.innerHTML = html;
}

function filterMenuCategory(slug, btn) {
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
