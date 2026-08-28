export interface ServiceData {
  slug: string;
  title: {
    uz: string;
    ru: string;
  };
  metaTitle: {
    uz: string;
    ru: string;
  };
  metaDescription: {
    uz: string;
    ru: string;
  };
  description: {
    uz: string;
    ru: string;
  };
  longDescription: {
    uz: string;
    ru: string;
  };
  price: string;
  priceNote: {
    uz: string;
    ru: string;
  };
  image: string;
  icon: string; // lucide icon name
  features: {
    uz: string[];
    ru: string[];
  };
  keywords: {
    uz: string[];
    ru: string[];
  };
}

export const services: ServiceData[] = [
  {
    slug: "gilam-yuvish",
    title: {
      uz: "Gilam Yuvish",
      ru: "Стирка Ковров",
    },
    metaTitle: {
      uz: "Gilam Yuvish Toshkentda — Professional Tozalash | Express Clean",
      ru: "Стирка Ковров в Ташкенте — Профессиональная Чистка | Express Clean",
    },
    metaDescription: {
      uz: "Toshkentda professional gilam yuvish xizmati ✅ Chuqur tozalash ✅ Bepul olib ketish va yetkazib berish ✅ 12,000 so'm/m² dan ✅ 24/7 buyurtma qabul qilinadi",
      ru: "Профессиональная стирка ковров в Ташкенте ✅ Глубокая чистка ✅ Бесплатная доставка ✅ от 12,000 сум/м² ✅ Приём заказов 24/7",
    },
    description: {
      uz: "Maxsus sexlarda chuqur yuvish, quritish va maxsus o'rab yetkazib berish xizmati.",
      ru: "Глубокая стирка в специализированных цехах, сушка и доставка в специальной упаковке.",
    },
    longDescription: {
      uz: "Express Clean gilam yuvish xizmati — Toshkentdagi eng zamonaviy gilam yuvish sexi. Biz gilamlaringizni maxsus import qilingan jihozlar va ekologik toza vositalar yordamida yuqori sifatda tozalaymiz. Har bir gilam alohida e'tibor bilan ko'rib chiqiladi: dog'lar ketkaziladi, changlar so'riladi, chuqur yuvish amalga oshiriladi va maxsus quritgichlarda quritiladi. Gilamingiz yangidek holatda, maxsus o'rab uyingizga yetkaziladi.",
      ru: "Услуга стирки ковров Express Clean — самый современный цех стирки ковров в Ташкенте. Мы чистим ваши ковры с помощью специального импортного оборудования и экологически чистых средств. Каждый ковёр обрабатывается с особым вниманием: выводятся пятна, удаляется пыль, проводится глубокая стирка и сушка на специальных сушилках. Ваш ковёр доставляется домой как новый, в специальной упаковке.",
    },
    price: "12,000 so'm / m²",
    priceNote: {
      uz: "Minimal buyurtma 10 m². Bepul olib ketish va yetkazib berish.",
      ru: "Минимальный заказ 10 м². Бесплатная доставка.",
    },
    image: "/service1_v3.png",
    icon: "SplitSquareHorizontal",
    features: {
      uz: [
        "Chuqur yuvish texnologiyasi",
        "Ekologik toza vositalar",
        "Bepul olib ketish va yetkazib berish",
        "24-48 soat ichida tayyor",
        "Dog'larni ketkazish kafolati",
        "Maxsus o'rab yetkazish",
      ],
      ru: [
        "Технология глубокой стирки",
        "Экологически чистые средства",
        "Бесплатная доставка",
        "Готовность за 24-48 часов",
        "Гарантия выведения пятен",
        "Доставка в специальной упаковке",
      ],
    },
    keywords: {
      uz: ["gilam yuvish", "gilam yuvish toshkent", "gilam tozalash", "gilam yuvish narxlari", "gilam yuvish xizmati"],
      ru: ["стирка ковров", "стирка ковров ташкент", "чистка ковров", "стирка ковров цены", "мойка ковров"],
    },
  },
  {
    slug: "joyida-gilam-yuvish",
    title: {
      uz: "Joyida Gilam Yuvish",
      ru: "Чистка Ковров На Дому",
    },
    metaTitle: {
      uz: "Joyida Gilam Yuvish Toshkentda — Uyda Tozalash | Express Clean",
      ru: "Чистка Ковров На Дому в Ташкенте — Выездная Чистка | Express Clean",
    },
    metaDescription: {
      uz: "Gilamingizni joyidan jildirmay professional tozalash ✅ Maxsus uskunalar ✅ 16,000 so'm/m² dan ✅ Tez va sifatli natija ✅ Toshkent bo'ylab xizmat",
      ru: "Выездная чистка ковров на дому в Ташкенте ✅ Профессиональное оборудование ✅ от 16,000 сум/м² ✅ Быстрый и качественный результат",
    },
    description: {
      uz: "Gilamlaringizni o'z joyidan jildirmay maxsus uskunalar yordamida tozalab beramiz.",
      ru: "Чистим ковры прямо у вас дома с помощью профессионального оборудования, не сдвигая с места.",
    },
    longDescription: {
      uz: "Gilamingizni ko'chirish imkoni yo'qmi? Muammo emas! Express Clean joyida gilam yuvish xizmati — bu sizning uyingizga maxsus uskunalar bilan kelib, gilamni joyidan jildirmay professional tarzda tozalash demakdir. Biz kuchli so'rish va chuqur yuvish uskunalari orqali gilamdagi changni, dog'larni va mikroorganizmlarni to'liq yo'q qilamiz. Xizmat tugagandan so'ng gilam tez qurib, xona muddatidan oldin foydalanishga tayyor bo'ladi.",
      ru: "Нет возможности перевезти ковёр? Не проблема! Выездная чистка ковров Express Clean — это профессиональная чистка у вас дома с помощью специального оборудования без перемещения ковра. С помощью мощных пылесосов и систем глубокой очистки мы полностью удаляем пыль, пятна и микроорганизмы. После чистки ковёр быстро высыхает, и комната готова к использованию раньше срока.",
    },
    price: "16,000 so'm / m²",
    priceNote: {
      uz: "Minimal buyurtma 15 m². Uyga chiqish bepul.",
      ru: "Минимальный заказ 15 м². Выезд на дом бесплатный.",
    },
    image: "/service2.png",
    icon: "Home",
    features: {
      uz: [
        "Uyga chiqish xizmati",
        "Gilamni ko'chirmasdan tozalash",
        "Kuchli so'rish texnologiyasi",
        "Tez qurish — 2-4 soat",
        "Antibakterial ishlov",
        "Hid ketkazish xizmati",
      ],
      ru: [
        "Выезд на дом",
        "Чистка без перемещения ковра",
        "Мощная технология всасывания",
        "Быстрая сушка — 2-4 часа",
        "Антибактериальная обработка",
        "Удаление запахов",
      ],
    },
    keywords: {
      uz: ["joyida gilam yuvish", "uyda gilam yuvish", "gilam tozalash uyda", "gilam yuvish xizmati uyga chiqish"],
      ru: ["чистка ковров на дому", "выездная чистка ковров", "стирка ковров на дому ташкент", "чистка ковров дома"],
    },
  },
  {
    slug: "yumshoq-mebel-tozalash",
    title: {
      uz: "Yumshoq Mebel Tozalash",
      ru: "Химчистка Мягкой Мебели",
    },
    metaTitle: {
      uz: "Yumshoq Mebel Tozalash Toshkentda — Divan Yuvish | Express Clean",
      ru: "Химчистка Мягкой Мебели в Ташкенте — Чистка Диванов | Express Clean",
    },
    metaDescription: {
      uz: "Divan va yumshoq mebel professional tozalash ✅ Kimyoviy tozalash ✅ 50,000 so'm dan ✅ Dog' va hid ketkazish ✅ Uyga chiqish bepul",
      ru: "Профессиональная химчистка диванов и мягкой мебели ✅ Выведение пятен ✅ от 50,000 сум ✅ Удаление запахов ✅ Выезд бесплатный",
    },
    description: {
      uz: "Narx 1 joy (o'tiradigan o'rin) uchun. Divan va kreslolarni chuqur tozalash.",
      ru: "Цена за 1 место (посадочное). Глубокая чистка диванов и кресел.",
    },
    longDescription: {
      uz: "Express Clean yumshoq mebel tozalash xizmati — bu divan, kresel, puf va boshqa yumshoq mebellaringizni professional tarzda tozalash. Biz maxsus kimyoviy vositalar va issiq bug' texnologiyasi yordamida mebelingizni chuqur tozalaymiz: dog'lar ketkaziladi, hidlar yo'qotiladi, allergiya keltirib chiqaruvchi chang va zarrachalar butunlay yo'q qilinadi. Natijada mebelingiz yangidek toza va xushbo'y bo'ladi.",
      ru: "Химчистка мягкой мебели Express Clean — профессиональная чистка диванов, кресел, пуфов и другой мягкой мебели. С помощью специальных химических средств и технологии горячего пара мы проводим глубокую чистку: выводим пятна, устраняем запахи, полностью уничтожаем пыль и аллергены. В результате ваша мебель становится чистой и свежей, как новая.",
    },
    price: "50,000 - 80,000 so'm",
    priceNote: {
      uz: "1 o'tiradigan joy uchun. Kreslo — 50,000, divan 1 joy — 60,000 so'm.",
      ru: "За 1 посадочное место. Кресло — 50,000, диван 1 место — 60,000 сум.",
    },
    image: "/service3.png",
    icon: "Sofa",
    features: {
      uz: [
        "Issiq bug' texnologiyasi",
        "Dog'larni ketkazish",
        "Hid yo'qotish",
        "Allergenlari yo'q qilish",
        "Mato tuzilishini saqlash",
        "Uyga chiqish bepul",
      ],
      ru: [
        "Технология горячего пара",
        "Выведение пятен",
        "Устранение запахов",
        "Уничтожение аллергенов",
        "Сохранение структуры ткани",
        "Выезд на дом бесплатно",
      ],
    },
    keywords: {
      uz: ["yumshoq mebel tozalash", "divan yuvish", "mebel tozalash", "kresel yuvish", "divan kimyoviy tozalash"],
      ru: ["химчистка мебели", "чистка диванов", "химчистка мягкой мебели ташкент", "чистка кресел"],
    },
  },
  {
    slug: "parda-yuvish",
    title: {
      uz: "Parda Yuvish",
      ru: "Стирка Штор",
    },
    metaTitle: {
      uz: "Parda Yuvish Toshkentda — Professional Tozalash | Express Clean",
      ru: "Стирка Штор в Ташкенте — Профессиональная Чистка | Express Clean",
    },
    metaDescription: {
      uz: "Professional parda yuvish xizmati Toshkentda ✅ Nafis matolarga zarar yetkazmay tozalash ✅ 25,000 so'm/metr ✅ Dazmollash bilan ✅ Olib ketish va yetkazish bepul",
      ru: "Профессиональная стирка штор в Ташкенте ✅ Бережная чистка деликатных тканей ✅ 25,000 сум/метр ✅ С глажкой ✅ Бесплатная доставка",
    },
    description: {
      uz: "Nafis matolarga zarar yetkazmagan holda ehtiyotkorlik bilan tozalash va dazmollash.",
      ru: "Бережная чистка деликатных тканей с глажкой, без повреждения материала.",
    },
    longDescription: {
      uz: "Pardalar uyning ko'rkini belgilovchi muhim detallardan biridir. Express Clean parda yuvish xizmati orqali pardalaringiz changdan, dog'lardan va sarg'ish rangdan xalos bo'ladi. Biz har xil turdagi matolarga — jumladan shoyi, velvet, organza va boshqa nozik matolarga mos yuvish usullarini qo'llaymiz. Yuvishdan so'ng pardalar professional tarzda dazmollanadi va uyingizga tayyor holda yetkaziladi.",
      ru: "Шторы — важная деталь интерьера. Стирка штор Express Clean избавит ваши шторы от пыли, пятен и пожелтения. Мы используем подходящие методы стирки для всех видов тканей — включая шёлк, бархат, органзу и другие деликатные материалы. После стирки шторы профессионально отглаживаются и доставляются к вам домой в готовом виде.",
    },
    price: "25,000 so'm / 1 metr",
    priceNote: {
      uz: "Pardaning uzunligi bo'yicha hisoblanadi. Bepul olib ketish va yetkazish.",
      ru: "Расчёт по длине штор. Бесплатная доставка.",
    },
    image: "/service6.png",
    icon: "Sparkles",
    features: {
      uz: [
        "Nafis matolarga mos yuvish",
        "Professional dazmollash",
        "Rangni saqlash kafolati",
        "Bepul olib ketish va yetkazish",
        "Chang va dog'larni ketkazish",
        "Qayta o'rnatish xizmati",
      ],
      ru: [
        "Подходящая стирка для деликатных тканей",
        "Профессиональная глажка",
        "Гарантия сохранения цвета",
        "Бесплатная доставка",
        "Удаление пыли и пятен",
        "Услуга повторного монтажа",
      ],
    },
    keywords: {
      uz: ["parda yuvish", "parda tozalash", "parda yuvish toshkent", "parda yuvish narxlari"],
      ru: ["стирка штор", "химчистка штор", "стирка штор ташкент", "чистка штор"],
    },
  },
  {
    slug: "adyol-yuvish",
    title: {
      uz: "Adyol Yuvish",
      ru: "Стирка Одеял",
    },
    metaTitle: {
      uz: "Adyol Yuvish Toshkentda — Chuqur Tozalash | Express Clean",
      ru: "Стирка Одеял в Ташкенте — Глубокая Чистка | Express Clean",
    },
    metaDescription: {
      uz: "Adyollarni professional yuvish va tozalash ✅ 1 kishilik 50,000 so'm ✅ 2 kishilik 80,000 so'm ✅ Bepul yetkazib berish ✅ Antibakterial ishlov",
      ru: "Профессиональная стирка одеял ✅ Односпальное 50,000 сум ✅ Двуспальное 80,000 сум ✅ Бесплатная доставка ✅ Антибактериальная обработка",
    },
    description: {
      uz: "1 kishilik adyol - 50,000 so'm. 2 kishilik adyol - 80,000 so'm.",
      ru: "Односпальное одеяло — 50,000 сум. Двуспальное одеяло — 80,000 сум.",
    },
    longDescription: {
      uz: "Adyollar kundalik hayotda ko'p ishlatiladi, shuning uchun ularni muntazam tozalab turish muhim. Express Clean adyol yuvish xizmati adyollaringizni changdan, terdан, mikroorganizmlardan va noxush hidlardan to'liq tozalaydi. Biz maxsus yirik yuvish mashinalari va quritgichlar yordamida har xil turdagi adyollarni — paxtali, singtepon va junli adyollarni ehtiyotkorlik bilan yuqori sifatda tozalaymiz.",
      ru: "Одеяла используются ежедневно, поэтому их регулярная чистка очень важна. Стирка одеял Express Clean полностью очищает от пыли, пота, микроорганизмов и неприятных запахов. С помощью специальных промышленных стиральных машин и сушилок мы бережно и качественно стираем все виды одеял — ватные, синтепоновые и шерстяные.",
    },
    price: "50,000 so'm dan",
    priceNote: {
      uz: "1 kishilik — 50,000, 2 kishilik — 80,000 so'm. Bepul yetkazish.",
      ru: "Односпальное — 50,000, двуспальное — 80,000 сум. Бесплатная доставка.",
    },
    image: "/service5.png",
    icon: "BedDouble",
    features: {
      uz: [
        "Har xil turdagi adyollar uchun",
        "Antibakterial ishlov",
        "Maxsus quritish texnologiyasi",
        "Hid ketkazish",
        "Bepul olib ketish va yetkazish",
        "1-2 kun ichida tayyor",
      ],
      ru: [
        "Для всех видов одеял",
        "Антибактериальная обработка",
        "Специальная технология сушки",
        "Удаление запахов",
        "Бесплатная доставка",
        "Готовность за 1-2 дня",
      ],
    },
    keywords: {
      uz: ["adyol yuvish", "adyol tozalash", "adyol yuvish toshkent", "ko'rpa yuvish"],
      ru: ["стирка одеял", "чистка одеял", "стирка одеял ташкент", "стирка пледов"],
    },
  },
  {
    slug: "korpachalar-tozalash",
    title: {
      uz: "Ko'rpachalar Tozalash",
      ru: "Чистка Курпачей",
    },
    metaTitle: {
      uz: "Ko'rpachalar Tozalash Toshkentda — Professional Yuvish | Express Clean",
      ru: "Чистка Курпачей в Ташкенте — Профессиональная Стирка | Express Clean",
    },
    metaDescription: {
      uz: "Ko'rpachalarni professional tozalash va yuvish ✅ 15,000 so'm/metr ✅ Chang, kir va hidlardan to'liq tozalash ✅ Bepul yetkazib berish",
      ru: "Профессиональная чистка и стирка курпачей ✅ 15,000 сум/метр ✅ Полное удаление пыли, грязи и запахов ✅ Бесплатная доставка",
    },
    description: {
      uz: "Ko'rpachalarni chang, kir va hidlardan to'liq tozalab, yangidek holatga keltiramiz.",
      ru: "Полностью очищаем курпачи от пыли, грязи и запахов, возвращая им первоначальный вид.",
    },
    longDescription: {
      uz: "Ko'rpachalar — o'zbek oilalarida keng qo'llaniladigan an'anaviy ko'rpa-to'shak. Express Clean ko'rpacha tozalash xizmati orqali ko'rpachalaringiz to'liq tozalanadi: ichidagi chang va zarrachalar so'riladi, dog'lar ketkaziladi, antibakterial ishlov o'tkaziladi. Biz ko'rpachalarning tuzilishini buzmasdan, ehtiyotkorlik bilan tozalaymiz. Natijada ko'rpachalaringiz yangiday yumshoq va toza bo'ladi.",
      ru: "Курпачи — традиционные узбекские стёганые одеяла для сидения и сна, широко используемые в узбекских семьях. Чистка курпачей Express Clean полностью очищает: удаляется внутренняя пыль и частицы, выводятся пятна, проводится антибактериальная обработка. Мы бережно чистим, не нарушая структуру. В результате ваши курпачи становятся мягкими и чистыми, как новые.",
    },
    price: "15,000 so'm / 1 metr",
    priceNote: {
      uz: "Ko'rpachaning uzunligi bo'yicha hisoblanadi.",
      ru: "Расчёт по длине курпачи.",
    },
    image: "/service4.png",
    icon: "Layers",
    features: {
      uz: [
        "Chuqur chang tozalash",
        "Dog'larni ketkazish",
        "Antibakterial ishlov",
        "Ko'rpacha tuzilishini saqlash",
        "Bepul olib ketish va yetkazish",
        "1-2 kun ichida tayyor",
      ],
      ru: [
        "Глубокое удаление пыли",
        "Выведение пятен",
        "Антибактериальная обработка",
        "Сохранение структуры курпачи",
        "Бесплатная доставка",
        "Готовность за 1-2 дня",
      ],
    },
    keywords: {
      uz: ["ko'rpacha tozalash", "ko'rpacha yuvish", "ko'rpachalar tozalash toshkent", "to'shak yuvish"],
      ru: ["чистка курпачей", "стирка курпачей", "чистка курпачей ташкент", "стирка курпачи"],
    },
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
