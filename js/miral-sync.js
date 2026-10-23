/**
 * Miral Gourmet - Client CMS Sync Engine (Bilingual AR / EN)
 * Synchronizes dishes, categories, page contents and settings from localStorage ('miral_data')
 */

const DEFAULT_MIRAL_DATA = {
  "version": 4,
  "settings": {
    "restaurantName": "مطعم ميرال جورميه",
    "restaurantNameEn": "Miral Gourmet & Ristorante",
    "restaurantSub": "MIRAL GOURMET • RIYADH",
    "restaurantSubEn": "FINE MEDITERRANEAN DINING • RIYADH",
    "phone": "+966 11 480 8899",
    "whatsapp": "+966114808899",
    "address": "الرياض، طريق الأمير محمد بن عبد العزيز (التحلية)",
    "addressEn": "Riyadh, Prince Muhammad Ibn Abd Al Aziz Rd (Tahlia St)",
    "hours": "يومياً: 12:30 ظهراً - 1:30 بعد منتصف الليل",
    "hoursEn": "Daily: 12:30 PM - 1:30 AM",
    "email": "info@miral-gourmet.sa"
  },
  "categories": [
    {
      "id": "all",
      "slug": "all",
      "name": "جميع الأطباق",
      "nameEn": "All Dishes",
      "badge": "المائدة الملكية المتكاملة",
      "badgeEn": "The Complete Royal Table"
    },
    {
      "id": "mains",
      "slug": "mains",
      "name": "الأطباق الرئيسية",
      "nameEn": "Main Courses",
      "badge": "أطايب البحر الأبيض المتوسط",
      "badgeEn": "Mediterranean Culinary Art"
    },
    {
      "id": "appetizers",
      "slug": "appetizers",
      "name": "المقبلات والسلطات",
      "nameEn": "Starters & Salads",
      "badge": "طازجة وعضوية يومياً",
      "badgeEn": "Farm-Fresh & Organic"
    },
    {
      "id": "grills",
      "slug": "grills",
      "name": "المشويات واللحوم",
      "nameEn": "Artisan Grills & Steaks",
      "badge": "على حطب الزيتون الطبيعي",
      "badgeEn": "Charred over Olive Wood"
    },
    {
      "id": "desserts",
      "slug": "desserts",
      "name": "الحلويات والموكتيل",
      "nameEn": "Desserts & Mocktails",
      "badge": "لمسات الذهب والمذاق الراقي",
      "badgeEn": "24K Gold & Signature Sips"
    }
  ],
  "dishes": [
    {
      "id": "dish-1",
      "title": "ريش الضأن المشوية بعسل السدر والزعتر البري",
      "titleEn": "Charcoal Grilled Lamb Chops with Sidr Honey & Mountain Thyme",
      "category": "grills",
      "price": 285,
      "calories": 640,
      "badge": "اختيار الشيف",
      "badgeEn": "Chef's Selection",
      "tags": [
        "لحوم نيوزيلندية فاخرة",
        "خالٍ من الجلوتين"
      ],
      "tagsEn": [
        "Prime NZ Lamb",
        "Gluten-Free"
      ],
      "desc": "أضلاع لحم ضأن طرية مشوية على لهب الحطب، مقدمة مع بيوريه البطاطس المخملية وصلصة التوت البري والزعتر الجبلي.",
      "descEn": "Tender lamb chops char-grilled over olive wood embers, served with velvet potato mousseline, wild mountain thyme jus and cranberry glaze.",
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "isSignature": true
    },
    {
      "id": "dish-2",
      "title": "فيليه الدنيس البري بصلصة الليمون والكَبَر",
      "titleEn": "Wild Sea Bream Fillet with Lemon Caper Emulsion",
      "category": "mains",
      "price": 260,
      "calories": 490,
      "badge": "صيد اليوم الطازج",
      "badgeEn": "Catch of the Day",
      "tags": [
        "بحريات طازجة",
        "صحي ومتوازن"
      ],
      "tagsEn": [
        "Daily Catch",
        "Light & Healthy"
      ],
      "desc": "سمك دنيس بحري طازج مشوي بجلد مقرمش مع الهليون الأخضر المشوي وصلصة زبدة الليمون الصقلي والأعشاب البحرية المنعشة.",
      "descEn": "Crispy-skin wild sea bream served over grilled jumbo green asparagus, Sicilian lemon butter reduction and fresh ocean herbs.",
      "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      "isSignature": true
    },
    {
      "id": "dish-3",
      "title": "ستيك تندرلوين واغيو مع زبدة الكمأة السوداء",
      "titleEn": "A5 Wagyu Tenderloin Steak with Black Truffle Butter",
      "category": "grills",
      "price": 440,
      "calories": 720,
      "badge": "واغيو A5 معتق",
      "badgeEn": "Aged A5 Wagyu",
      "tags": [
        "لحم ياباني أصيل",
        "درجة ماربلينغ 9+"
      ],
      "tagsEn": [
        "Authentic Japanese Wagyu",
        "Marble Score 9+"
      ],
      "desc": "قطعة تندرلوين يابانية معتقة تذوب في الفم، تُشوى حسب طلبكم وتُقدم مع فطر الشيتاكي المكرمل ورذاذ زيت الكمأة الإيطالي.",
      "descEn": "Melt-in-your-mouth aged Japanese tenderloin grilled to your liking, accompanied by caramelized shiitake and Italian black truffle glaze.",
      "image": "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      "isSignature": true
    },
    {
      "id": "dish-4",
      "title": "ريزوتو الفطر البري ورقائق الكمأة البيضاء",
      "titleEn": "Wild Mushroom Risotto with White Truffle Shavings",
      "category": "mains",
      "price": 195,
      "calories": 530,
      "badge": "أرز كارنارولي أصيل",
      "badgeEn": "Carnaroli Risotto",
      "tags": [
        "طبق إيطالي كلاسيكي",
        "نباتي راقٍ"
      ],
      "tagsEn": [
        "Classic Italian",
        "Vegetarian Fine Dining"
      ],
      "desc": "أرز كارنارولي مطهو بمرق الخضار العطري وجبن البارميزان المعتق 24 شهراً مع مزيج فطر البورسيني ورقائق الكمأة الفاخرة.",
      "descEn": "Carnaroli rice slow-cooked in aromatic garden vegetable stock, 24-month aged Parmigiano-Reggiano, porcini medley and white truffle.",
      "image": "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
      "isSignature": true
    },
    {
      "id": "dish-5",
      "title": "بوراتا بوليا الطازجة مع التين المكرمل والبيستو",
      "titleEn": "Puglia Burrata with Caramelized Figs & Basil Pesto",
      "category": "appetizers",
      "price": 145,
      "calories": 410,
      "badge": "طازج يومياً",
      "badgeEn": "Fresh Daily",
      "tags": [
        "مقبلات باردة",
        "نباتي منعش"
      ],
      "tagsEn": [
        "Artisan Cheese",
        "Farm Fresh"
      ],
      "desc": "كرة جبن بوراتا كريمية إيطالية مع تين طازج مكرمل، طماطم كرزية مجففة بالشمس، ريحان طازج، ورذاذ الخل البلسمي المعتق.",
      "descEn": "Creamy artisanal Italian burrata ball served with honey-glazed fresh figs, sun-dried cherry tomatoes, sweet basil and aged balsamic reduction.",
      "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      "isSignature": true
    },
    {
      "id": "dish-6",
      "title": "ميل فاي الفستق الحلبي مع غزل البنات الملكي",
      "titleEn": "Pistachio Mille-Feuille with Royal Cotton Candy",
      "category": "desserts",
      "price": 125,
      "calories": 480,
      "badge": "حلى التوقيع",
      "badgeEn": "Signature Dessert",
      "tags": [
        "حلويات ميرال",
        "فستق حلبي طبيعي"
      ],
      "tagsEn": [
        "Signature Sweet",
        "Pure Pistachio"
      ],
      "desc": "طبقات البف باستري الهشة والكراميل الخفيف محشوة بكريمة الفستق الحلبي المخملية ومزينة بلمسات ذهبية عيار 24 قابلة للأكل.",
      "descEn": "Crispy caramelized puff pastry layers filled with velvety Sicilian pistachio cream and adorned with edible 24K gold leaves.",
      "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
      "isSignature": true
    },
    {
      "id": "dish-7",
      "title": "سمان محشي بالفريكة والمكسرات",
      "titleEn": "Roasted Quail Stuffed with Smoked Freekeh & Pine Nuts",
      "category": "mains",
      "price": 210,
      "calories": 520,
      "badge": "طبق تقليدي مطور",
      "badgeEn": "Chef Special",
      "tags": [
        "طبق تقليدي مطور"
      ],
      "tagsEn": [
        "Elevated Heritage"
      ],
      "desc": "سمان مشوي ببطء محشو بالفريكة البلدية الفاخرة والصنوبر المقلي مع مرق الرمان المركز.",
      "descEn": "Slow-roasted tender quail stuffed with heirloom green freekeh, toasted golden pine nuts and tart pomegranate glaze reduction.",
      "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
      "isSignature": false
    },
    {
      "id": "dish-8",
      "title": "سيفيتشي السلمون النرويجي بالحمضيات",
      "titleEn": "Citrus-Cured Norwegian Salmon Ceviche",
      "category": "appetizers",
      "price": 135,
      "calories": 340,
      "badge": "خالٍ من الجلوتين",
      "badgeEn": "Ocean Fresh",
      "tags": [
        "خالٍ من الجلوتين"
      ],
      "tagsEn": [
        "Gluten-Free",
        "Raw Bar"
      ],
      "desc": "مكعبات سلمون طازجة منقوعة في عصير الليمون والبرتقال مع الأفوكادو، رقائق الفجل، وزيت الشمر.",
      "descEn": "Sashimi-grade salmon cubes cured in fresh Sicilian lemon and blood orange, garnished with avocado, radish crisp and fennel seed oil.",
      "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
      "isSignature": false
    },
    {
      "id": "dish-9",
      "title": "ريب آي بلاك أنجوس الأمريكي (350 جم)",
      "titleEn": "USDA Prime Black Angus Ribeye (350g)",
      "category": "grills",
      "price": 360,
      "calories": 780,
      "badge": "الأكثر طلباً",
      "badgeEn": "Top Seller",
      "tags": [
        "الأكثر طلباً"
      ],
      "tagsEn": [
        "Top Choice",
        "Prime Cut"
      ],
      "desc": "شريحة ريب آي رخامية مشوية بدرجة طلبك مع زبدة الأعشاب ومرق الفلفل الأخضر الحار وبطاطس ودجز مقرمشة.",
      "descEn": "Heavily marbled ribeye steak grilled over olive wood embers with garden herb butter, green peppercorn jus and crisp potato wedges.",
      "image": "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80",
      "isSignature": false
    },
    {
      "id": "dish-10",
      "title": "تاجين لحم العجل بالبرقوق واللوز الذهبي",
      "titleEn": "Moroccan Veal Tagine with Sun-Dried Prunes & Golden Almonds",
      "category": "mains",
      "price": 245,
      "calories": 590,
      "badge": "أصيل ومميز",
      "badgeEn": "Claypot Braise",
      "tags": [
        "أصيل ومميز"
      ],
      "tagsEn": [
        "Claypot Braise"
      ],
      "desc": "لحم عجل طري مطهو في فخار مغربي أصيل مع بهارات رأس الحانوت المعتقة والسمسم المحمص.",
      "descEn": "Succulent veal shank braised in an authentic clay tagine with aged Ras el Hanout spices, simmered prunes and toasted sesame seeds.",
      "image": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
      "isSignature": false
    },
    {
      "id": "dish-11",
      "title": "حمص ميرال بالكمأة واللحم البقري",
      "titleEn": "Truffle Hummus with Spiced Beef Tenderloin & Pine Nuts",
      "category": "appetizers",
      "price": 95,
      "calories": 420,
      "badge": "توقيع ميرال",
      "badgeEn": "Warm Starter",
      "tags": [
        "توقيع ميرال"
      ],
      "tagsEn": [
        "Miral Mezze"
      ],
      "desc": "حمص ناعم مخملي ممزوج بمعجون الكمأة الإيطالي ومغطى بشرائح لحم بقري متبلة وصنوبر بلدي.",
      "descEn": "Velvety smooth chickpea purée infused with black truffle paste, topped with seared spiced beef slivers and roasted local pine nuts.",
      "image": "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80",
      "isSignature": false
    },
    {
      "id": "dish-12",
      "title": "أوصال غنم بلدي بماء الورد والزعفران",
      "titleEn": "Local Lamb Awssal Skewers with Rosewater & Saffron",
      "category": "grills",
      "price": 220,
      "calories": 610,
      "badge": "لحم بلدي طازج",
      "badgeEn": "Wood Charcoal",
      "tags": [
        "لحم بلدي طازج"
      ],
      "tagsEn": [
        "Artisan Skewers"
      ],
      "desc": "قطع لحم غنم نعيمي طازجة متبلة بالزعفران الإيراني الفاخر وبصل الكراميل المشوي على السيخ الخشبي.",
      "descEn": "Tender lamb chunks marinated in premium Persian saffron, subtle rosewater essence and caramelized onions, char-grilled on wooden skewers.",
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "isSignature": false
    },
    {
      "id": "dish-13",
      "title": "تشيز كيك التمر الخلاص بالتوفي المملح",
      "titleEn": "Qassim Kholas Date Cheesecake with Salted Caramel",
      "category": "desserts",
      "price": 95,
      "calories": 450,
      "badge": "حلى شرقي عصري",
      "badgeEn": "Sweet Indulgence",
      "tags": [
        "حلى شرقي عصري"
      ],
      "tagsEn": [
        "Modern Fusion"
      ],
      "desc": "قاعدة بسكويت الهيل المقرمشة مع طبقة جبن كريمي غني بنكهة تمر الخلاص القصيمي وآيس كريم الفانيليا.",
      "descEn": "Crispy cardamom biscuit base topped with rich cream cheese infused with Qassimi Kholas dates and Madagascar vanilla bean ice cream.",
      "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
      "isSignature": false
    },
    {
      "id": "dish-14",
      "title": "موكتيل ميرال الملكي (Royal Gold)",
      "titleEn": "Miral Royal Gold Signature Mocktail",
      "category": "desserts",
      "price": 68,
      "calories": 180,
      "badge": "مشروب التوقيع",
      "badgeEn": "Royal Beverage",
      "tags": [
        "مشروب التوقيع"
      ],
      "tagsEn": [
        "Signature Sip"
      ],
      "desc": "مزيج منعش من الرمان الطازج وخلاصة الورد الطائفي وعصير التوت مع رذاذ أوراق الذهب الغذائية اللامعة.",
      "descEn": "A refreshing blend of fresh ruby pomegranate, Taif rosewater essence and pressed wild berries, sprinkled with shimmering edible gold flakes.",
      "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      "isSignature": false
    }
  ],
  "pages": {
    "home": {
      "heroBadge": "✨ التميز في الضيافة الراقية 2026",
      "heroTitle": "فن الطهي العصري بروح الضيافة الأندلسية والمتوسطية",
      "heroDesc": "نأخذكم في رحلة ذوقية حصرية تلتقي فيها أجود المكونات العضوية الطازجة مع لمسات الشيف المبتكرة في أجواء مضيئة وفاتنة تأسر الحواس.",
      "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85",
      "storyTitle": "حيث يتجلى شغف الطهي في لوحة بيضاء ناصعة الجمال",
      "storyP1": "انطلق مطعم «ميرال» من رؤية جريئة تهدف إلى إعادة تعريف مفهوم المطاعم الفاخرة في قلب الرياض: كسر القوالب المظلمة وابتكار بيئة بيضاء مشرقة تشع بالحياة والجمال.",
      "storyP2": "نحن نؤمن بأن كل طبق يقدم على مائدة ميرال هو عمل فني متكامل؛ تبدأ الرحلة من اختيار الحبوب والزيوت المعصورة على البارد، مروراً بالأسماك الطازجة المصطادة يومياً من مياه البحر الأحمر، وحتى تقنيات الطهي البطيء التي تمنح الأطباق نكهات عميقة لا تُنسى.",
      "storyImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "quoteText": "إن الطهي ليس مجرد وصفات تُطبّق، بل هو حوار صامت بين روح الشيف وحواس الضيف. في ميرال نسعى لأن تكون كل لقمة ذكرى خالدة.",
      "chefName": "الشيف فابريزيو لوران - رئيس الطهاة التنفيذي"
    },
    "homeEn": {
      "heroBadge": "✨ Excellence in Luxury Hospitality 2026",
      "heroTitle": "Contemporary Culinary Art with Andalusian & Mediterranean Soul",
      "heroDesc": "Embark on an exclusive sensory journey where the finest organic farm ingredients meet innovative chef craft, within an illuminated, mesmerizing atmosphere.",
      "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85",
      "storyTitle": "Where Culinary Passion Meets an Illuminated White Canvas",
      "storyP1": "Miral was born from a visionary ambition to reinvent fine dining in Riyadh: departing from shadowy dining rooms and cultivating an illuminated, vibrant sanctuary radiating life and architectural grace.",
      "storyP2": "Every dish presented at Miral is a harmonized masterpiece. The voyage commences from single-estate cold-pressed olive oils, through line-caught Red Sea delicacies, down to slow cooking over aged olive wood.",
      "storyImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "quoteText": "Cooking is not merely executing recipes; it is an unspoken dialogue between the chef's spirit and the guest's senses. At Miral, each bite is crafted to become a lasting memory.",
      "chefName": "Chef Fabrizio Laurent - Executive Head Chef"
    },
    "about": {
      "pageTitle": "قصة ميرال وفلسفة الضيافة",
      "pageSubtitle": "أكثر من خمسة عشر عاماً من الشغف في تقديم أصول الطهي المتوسطي الراقي",
      "storyHeadline": "لوحة بيضاء ناصعة وفن طهي بلا حدود",
      "p1": "انطلق مطعم «ميرال» من رؤية جريئة تهدف إلى إعادة تعريف مفهوم المطاعم الفاخرة في قلب الرياض: كسر القوالب المظلمة وابتكار بيئة بيضاء مشرقة تشع بالحياة والجمال.",
      "p2": "نلتزم بأعلى معايير الجودة الغذائية، مستخدمين أجود المكونات العضوية الطازجة وزيت الزيتون الصقلي والأسماك اليومية لنقدم لأحبائنا وضيوفنا ولائم تليق بمقامهم الرفيع.",
      "storyImage": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
      "chefQuote": "نحن لا نطهو الطعام فحسب، بل نحفظ هوية المائدة الراقية وننسج منها ذكريات تدوم.",
      "chefName": "الشيف فابريزيو لوران"
    },
    "aboutEn": {
      "pageTitle": "Our Story & Hospitality Philosophy",
      "pageSubtitle": "Over fifteen years of passion in serving authentic Mediterranean culinary art in Riyadh.",
      "storyHeadline": "An Illuminated Canvas and Culinary Craft Without Boundaries",
      "p1": "Miral Gourmet embarked from a bold vision: to redefine luxury dining in the heart of Riyadh by breaking away from dark, heavy dining rooms, introducing instead an airy architectural haven bathed in natural light and vibrant beauty.",
      "p2": "We hold that every dish served is an integrated art piece; starting with artisanal cold-pressed olive oils, through Red Sea fish caught daily at dawn, down to meticulous slow-cooking techniques that impart memorable depth to every flavor.",
      "storyImage": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
      "chefQuote": "We do not merely cook dishes; we safeguard the identity of fine dining and weave memories that endure.",
      "chefName": "Chef Fabrizio Laurent"
    },
    "menu": {
      "pageTitle": "قائمة طعام ميرال جورميه",
      "pageSubtitle": "سيمفونية من المذاقات الرفيعة تلبي كل الأذواق بأيدي أمهر الطهاة العالميين"
    },
    "menuEn": {
      "pageTitle": "Miral Gourmet Dining Menu",
      "pageSubtitle": "A symphony of refined flavors catering to every distinguished palate."
    },
    "reservation": {
      "pageTitle": "احجز مائدتك الراقية",
      "pageSubtitle": "نستقبلكم في تراس الحديقة المفتوح وصالونات VIP الملكية لتجربة استثنائية",
      "whatsappPhone": "+966 11 480 8899"
    },
    "reservationEn": {
      "pageTitle": "Reserve Your Table",
      "pageSubtitle": "We welcome you to our sunlit Garden Terrace and Royal VIP Suites for an exceptional dining experience.",
      "whatsappPhone": "+966 11 480 8899"
    },
    "contact": {
      "pageTitle": "تواصل معنا واحجز موعدك",
      "pageSubtitle": "فريق ضيافة ميرال رهن إشارتكم لتلبية كافة الترتيبات والمناسبات الخاصة",
      "address": "الرياض، حي السليمانية، طريق التحلية، مجمع ميرال للضيافة",
      "phone": "+966 11 480 8899",
      "hours": "فترة الغداء: 12:30 م - 05:00 م | فترة العشاء: 06:30 م - 01:30 ص"
    },
    "contactEn": {
      "pageTitle": "Contact Us & Plan Your Visit",
      "pageSubtitle": "Our dedicated concierge team is at your disposal for special arrangements and private events.",
      "address": "Riyadh, As Sulimaniyah, Prince Muhammad Ibn Abd Al Aziz Rd (Tahlia St)",
      "phone": "+966 11 480 8899",
      "hours": "Lunch: 12:30 PM - 05:00 PM | Dinner: 06:30 PM - 01:30 AM"
    }
  },
  "bookings": [
    {
      "id": "BK-101",
      "name": "سعود آل مقرن",
      "phone": "+966509988776",
      "guests": "4 أشخاص (عائلية)",
      "date": "2026-10-25",
      "time": "08:00 مساءً",
      "seating": "صالون VIP كبار الشخصيات",
      "occasion": "عشاء عمل رسمي",
      "status": "مؤكد",
      "notes": "يرجى تجهيز طاولة قريبة من النافذة"
    },
    {
      "id": "BK-102",
      "name": "Dr. Faisal Al-Hajri",
      "phone": "+966551234567",
      "guests": "2 Guests",
      "date": "2026-10-26",
      "time": "09:30 PM",
      "seating": "Open Garden Terrace",
      "occasion": "Anniversary",
      "status": "مؤكد",
      "notes": "Floral bouquet and celebration cake"
    }
  ]
};

function getMiralData() {
  try {
    const raw = localStorage.getItem('miral_data');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.version === 4) {
        return parsed;
      }
      // Upgrade to bilingual version 4
      parsed.version = 4;
      parsed.categories = DEFAULT_MIRAL_DATA.categories;
      parsed.dishes = DEFAULT_MIRAL_DATA.dishes;
      parsed.pages = DEFAULT_MIRAL_DATA.pages;
      parsed.settings = DEFAULT_MIRAL_DATA.settings;
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

// Render dynamic content on Arabic storefront
document.addEventListener('DOMContentLoaded', () => {
  const data = getMiralData();
  
  // 1. Categories
  const tabsContainer = document.getElementById('menuTabsNav');
  if (tabsContainer && data.categories) {
    let tabsHtml = '';
    data.categories.forEach((cat, idx) => {
      tabsHtml += `
        <div style="display:inline-flex; align-items:center; gap:4px;">
          <button class="menu-tab-btn ${idx === 0 ? 'active' : ''}" onclick="filterMenuCategory('${cat.slug}', this)">
            ${cat.name}
          </button>
          <a href="category.html?cat=${cat.slug}" title="زيارة صفحة قسم ${cat.name}" style="color:var(--primary); font-size:12px; background:var(--primary-subtle); padding:8px 10px; border-radius:50%; border:1px solid var(--primary-border);">
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
      const tagsHtml = (dish.tags || []).map(t => `<span class="dish-tag">${t}</span>`).join('');
      sigHtml += `
        <div class="dish-card">
          <div class="dish-img-wrapper">
            <a href="product.html?id=${dish.id}">
              <img src="${dish.image}" alt="${dish.title}" class="dish-img" loading="lazy">
            </a>
            <span class="dish-badge">${dish.badge || 'مميز'}</span>
            <span class="dish-price-tag">${dish.price} ر.س</span>
          </div>
          <div class="dish-info">
            <div class="dish-tags">${tagsHtml}</div>
            <h3 class="dish-title">
              <a href="product.html?id=${dish.id}" style="color:inherit;">${dish.title}</a>
            </h3>
            <p class="dish-desc">${dish.desc}</p>
            <div class="dish-footer" style="padding-top:14px; border-top:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
              <a href="product.html?id=${dish.id}" class="btn btn-outline btn-sm">
                <i class="fa-solid fa-eye"></i> صفحة الطبق
              </a>
              <button class="btn btn-primary btn-sm" onclick="quickAddToBooking('${dish.title.replace(/'/g, "\\\'")}')">
                <i class="fa-solid fa-plus"></i> إضافة للحجز
              </button>
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
    renderMenuGrid(data.dishes);
  }

  // 4. Page Content Overrides (Arabic)
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

  // Contact info
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
          <a href="product.html?id=${dish.id}">
            <img src="${dish.image}" alt="${dish.title}" loading="lazy">
          </a>
        </div>
        <div class="menu-list-content">
          <div class="menu-list-header">
            <h4 class="menu-list-title"><a href="product.html?id=${dish.id}" style="color:inherit;">${dish.title}</a></h4>
            <span class="menu-list-price">${dish.price} ر.س</span>
          </div>
          <p class="menu-list-desc">${dish.desc}</p>
          <div class="menu-list-meta">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="menu-list-tag">${tagText}</span>
              <span class="menu-list-cal"><i class="fa-solid fa-fire"></i> ${dish.calories || 0} سعرة</span>
            </div>
            <button class="btn btn-outline btn-sm quick-add-btn" onclick="quickAddToBooking('${dish.title.replace(/'/g, "\\\'")}')" style="padding:4px 12px; font-size:12px;">
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
