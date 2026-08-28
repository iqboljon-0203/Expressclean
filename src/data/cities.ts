export interface CityData {
  slug: string;
  name: {
    uz: string;
    ru: string;
  };
  region: {
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
  heroHeadline: {
    uz: string;
    ru: string;
  };
  heroSubtitle: {
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
  geo: {
    latitude: number;
    longitude: number;
  };
  /** Approximate population for social proof */
  population: string;
  /** Landmark or well-known area for local flavor */
  landmark: {
    uz: string;
    ru: string;
  };
  /** Local-specific services emphasis */
  serviceHighlights: {
    uz: string[];
    ru: string[];
  };
  /** LSI keywords targeting this city */
  keywords: {
    uz: string[];
    ru: string[];
  };
  /** Testimonial / social proof for this city */
  testimonial: {
    name: string;
    text: {
      uz: string;
      ru: string;
    };
    district: {
      uz: string;
      ru: string;
    };
  };
}

export const cities: CityData[] = [
  {
    slug: "toshkent",
    name: {
      uz: "Toshkent",
      ru: "Ташкент",
    },
    region: {
      uz: "Toshkent shahri",
      ru: "Город Ташкент",
    },
    metaTitle: {
      uz: "Toshkentda Gilam Yuvish — Express Clean | Bepul Yetkazish 24/7",
      ru: "Стирка Ковров в Ташкенте — Express Clean | Бесплатная Доставка 24/7",
    },
    metaDescription: {
      uz: "Toshkentda professional gilam yuvish xizmati ✅ Barcha tumanlar bo'ylab bepul olib ketish ✅ 12,000 so'm/m² dan ✅ Mebel, parda, adyol tozalash ✅ 24/7 qo'ng'iroq qiling",
      ru: "Профессиональная стирка ковров в Ташкенте ✅ Бесплатная доставка по всем районам ✅ от 12,000 сум/м² ✅ Чистка мебели, штор, одеял ✅ Звоните 24/7",
    },
    heroHeadline: {
      uz: "Toshkentda #1 Gilam Yuvish Xizmati",
      ru: "Стирка Ковров №1 в Ташкенте",
    },
    heroSubtitle: {
      uz: "Toshkent shahrining barcha tumanlariga bepul olib ketish va yetkazib berish. Professional tozalash — gilamingiz yangidek!",
      ru: "Бесплатная доставка по всем районам Ташкента. Профессиональная чистка — ваш ковёр как новый!",
    },
    description: {
      uz: "Express Clean — Toshkent bo'ylab tez va sifatli gilam yuvish xizmatini taqdim etadi. Chilonzor, Yunusobod, Mirzo Ulug'bek, Sergeli va boshqa barcha tumanlarga bepul yetkazib beramiz.",
      ru: "Express Clean — быстрая и качественная стирка ковров по всему Ташкенту. Бесплатная доставка в Чиланзар, Юнусабад, Мирзо Улугбек, Сергели и все другие районы.",
    },
    longDescription: {
      uz: "Toshkent — O'zbekistonning poytaxti va eng katta shahri. 3 milliondan ortiq aholisi bilan bu shahar kundalik hayotda gilam va mebel tozalash xizmatlariga katta talabga ega. Express Clean Toshkentdagi barcha 11 tumanga — Chilonzor, Yunusobod, Mirzo Ulug'bek, Sergeli, Olmazor, Yakkasaroy, Shayxontohur, Uchtepa, Bektemir, Mirobod va Yashnobod tumanlariga xizmat ko'rsatadi. Bizning maxsus sexlarimiz zamonaviy jihozlar bilan jihozlangan bo'lib, har qanday murakkablikdagi tozalash ishlarini bajarishga qodir. Buyurtma bering — 30 daqiqa ichida kurierimiz uyingizga yetib boradi!",
      ru: "Ташкент — столица и крупнейший город Узбекистана. С населением более 3 миллионов человек город имеет огромный спрос на услуги чистки ковров и мебели. Express Clean обслуживает все 11 районов Ташкента — Чиланзар, Юнусабад, Мирзо Улугбек, Сергели, Алмазар, Яккасарай, Шайхантахур, Учтепа, Бектемир, Мирабад и Яшнабад. Наши специализированные цеха оснащены современным оборудованием для выполнения работ любой сложности. Оставьте заказ — наш курьер приедет к вам в течение 30 минут!",
    },
    geo: {
      latitude: 41.2995,
      longitude: 69.2401,
    },
    population: "3,000,000+",
    landmark: {
      uz: "Chorsu bozori, Amir Temur maydoni, Toshkent teleminorasi",
      ru: "Базар Чорсу, Площадь Амира Темура, Ташкентская телебашня",
    },
    serviceHighlights: {
      uz: [
        "Barcha 11 tumanga bepul yetkazish",
        "30 daqiqada kuryer xizmati",
        "Ofis va uy uchun gilam yuvish",
        "VIP tezkor xizmat (12 soat)",
        "Katta hajmdagi buyurtmalar uchun chegirma",
        "Ko'p qavatli bino xizmati",
      ],
      ru: [
        "Бесплатная доставка во все 11 районов",
        "Курьер за 30 минут",
        "Стирка ковров для офисов и квартир",
        "VIP экспресс-сервис (12 часов)",
        "Скидки на крупные заказы",
        "Обслуживание многоэтажных домов",
      ],
    },
    keywords: {
      uz: [
        "toshkentda gilam yuvish", "gilam yuvish toshkent", "gilam yuvish toshkent shahri",
        "gilam tozalash toshkent", "gilam yuvish xizmati toshkent", "toshkentda mebel tozalash",
        "gilam yuvish chilonzor", "gilam yuvish yunusobod", "gilam yuvish sergeli",
      ],
      ru: [
        "стирка ковров ташкент", "чистка ковров ташкент", "стирка ковров в ташкенте",
        "химчистка ковров ташкент", "мойка ковров ташкент", "клининг ташкент",
        "стирка ковров чиланзар", "стирка ковров юнусабад", "стирка ковров сергели",
      ],
    },
    testimonial: {
      name: "Dilshod A.",
      text: {
        uz: "Chilonzor tumanidan buyurtma berdim. 25 daqiqada kuryer keldi, gilamni olib ketdi. Ertasiga yangidek qilib olib kelishdi. Juda mamnunman!",
        ru: "Заказал из Чиланзарского района. Курьер приехал за 25 минут, забрал ковёр. На следующий день привезли как новый. Очень доволен!",
      },
      district: {
        uz: "Chilonzor tumani",
        ru: "Чиланзарский район",
      },
    },
  },
  {
    slug: "samarqand",
    name: {
      uz: "Samarqand",
      ru: "Самарканд",
    },
    region: {
      uz: "Samarqand viloyati",
      ru: "Самаркандская область",
    },
    metaTitle: {
      uz: "Samarqandda Gilam Yuvish — Express Clean | Professional Tozalash",
      ru: "Стирка Ковров в Самарканде — Express Clean | Профессиональная Чистка",
    },
    metaDescription: {
      uz: "Samarqandda professional gilam yuvish xizmati ✅ Shahar bo'ylab bepul yetkazish ✅ 12,000 so'm/m² dan ✅ Mebel va parda tozalash ✅ Bugun buyurtma bering",
      ru: "Профессиональная стирка ковров в Самарканде ✅ Бесплатная доставка по городу ✅ от 12,000 сум/м² ✅ Чистка мебели и штор ✅ Закажите сегодня",
    },
    heroHeadline: {
      uz: "Samarqandda Gilam Yuvish Xizmati",
      ru: "Стирка Ковров в Самарканде",
    },
    heroSubtitle: {
      uz: "Samarqand shahri va atrofiga professional gilam yuvish va tozalash xizmati. Tarixiy shaharning zamonaviy tozalik yechimi!",
      ru: "Профессиональная стирка и чистка ковров по Самарканду и окрестностям. Современное решение чистоты для исторического города!",
    },
    description: {
      uz: "Express Clean endi Samarqandda ham! O'zbekistonning ikkinchi katta shahriga professional gilam yuvish va mebel tozalash xizmatini taqdim etamiz.",
      ru: "Express Clean теперь и в Самарканде! Предоставляем профессиональную стирку ковров и чистку мебели во втором по величине городе Узбекистана.",
    },
    longDescription: {
      uz: "Samarqand — O'zbekistonning qadimiy va go'zal shahri, Buyuk Ipak Yo'lining markazi. 500 000 dan ortiq aholisi bilan shahar zamonaviy tozalash xizmatlariga muhtoj. Express Clean Samarqand filiali shahardagi barcha tumanlar — Samarqand shahri, Oqdaryo, Ishtixon, Jomboy va boshqa hududlarga xizmat ko'rsatadi. Bizning professional jamoamiz gilamlaringizni eng yuqori sifatda tozalab, uyingizga yetkazib beradi. Qimmatbaho gilamlar uchun maxsus ehtiyotkorlik bilan ishlash tajribamiz bor.",
      ru: "Самарканд — древний и прекрасный город Узбекистана, центр Великого Шёлкового пути. С населением более 500 000 человек город нуждается в современных клининговых услугах. Филиал Express Clean в Самарканде обслуживает все районы — город Самарканд, Акдарья, Иштыхан, Джамбай и другие территории. Наша профессиональная команда качественно почистит ваши ковры и доставит домой. У нас есть опыт бережной работы с дорогими коврами.",
    },
    geo: {
      latitude: 39.6542,
      longitude: 66.9597,
    },
    population: "550,000+",
    landmark: {
      uz: "Registon maydoni, Shohizinda, Bibi Xonim masjidi",
      ru: "Площадь Регистан, Шахи-Зинда, Мечеть Биби-Ханым",
    },
    serviceHighlights: {
      uz: [
        "Samarqand shahri bo'ylab bepul yetkazish",
        "Qimmatbaho gilamlar uchun maxsus xizmat",
        "Viloyat tumanlariga xizmat",
        "Mehmonxona va restoran uchun korporativ xizmat",
        "An'anaviy o'zbek gilamlari uchun maxsus ishlov",
        "Tez xizmat — 24-48 soat",
      ],
      ru: [
        "Бесплатная доставка по городу Самарканд",
        "Специальный сервис для дорогих ковров",
        "Обслуживание районов области",
        "Корпоративный сервис для гостиниц и ресторанов",
        "Специальная обработка традиционных узбекских ковров",
        "Быстрый сервис — 24-48 часов",
      ],
    },
    keywords: {
      uz: [
        "samarqandda gilam yuvish", "gilam yuvish samarqand", "gilam tozalash samarqand",
        "samarqandda mebel tozalash", "gilam yuvish xizmati samarqand",
        "samarqandda parda yuvish", "tozalash xizmati samarqand",
      ],
      ru: [
        "стирка ковров самарканд", "чистка ковров самарканд", "стирка ковров в самарканде",
        "химчистка ковров самарканд", "мойка ковров самарканд", "клининг самарканд",
        "химчистка мебели самарканд",
      ],
    },
    testimonial: {
      name: "Nodira K.",
      text: {
        uz: "Samarqandda bunday sifatli xizmat bor ekanligini bilmasdim. Gilamlarimni juda toza qilib yuvishibdi. Rahmat Express Clean!",
        ru: "Не знала, что в Самарканде есть такой качественный сервис. Ковры постирали идеально чисто. Спасибо Express Clean!",
      },
      district: {
        uz: "Samarqand shahri",
        ru: "Город Самарканд",
      },
    },
  },
  {
    slug: "andijon",
    name: {
      uz: "Andijon",
      ru: "Андижан",
    },
    region: {
      uz: "Andijon viloyati",
      ru: "Андижанская область",
    },
    metaTitle: {
      uz: "Andijonda Gilam Yuvish — Express Clean | Professional Xizmat",
      ru: "Стирка Ковров в Андижане — Express Clean | Профессиональный Сервис",
    },
    metaDescription: {
      uz: "Andijonda professional gilam yuvish xizmati ✅ Shahar bo'ylab bepul yetkazish ✅ Arzon narxlar ✅ Mebel va parda tozalash ✅ Sifat kafolatlanadi",
      ru: "Профессиональная стирка ковров в Андижане ✅ Бесплатная доставка по городу ✅ Доступные цены ✅ Чистка мебели и штор ✅ Гарантия качества",
    },
    heroHeadline: {
      uz: "Andijonda Gilam Yuvish Xizmati",
      ru: "Стирка Ковров в Андижане",
    },
    heroSubtitle: {
      uz: "Farg'ona vodiysi markazi — Andijonga professional tozalash xizmati yetib keldi. Gilamlaringizni ishonchli qo'llarga topshiring!",
      ru: "Профессиональный клининг пришёл в центр Ферганской долины — Андижан. Доверьте ваши ковры надёжным рукам!",
    },
    description: {
      uz: "Express Clean Andijonda professional gilam yuvish, mebel tozalash va parda yuvish xizmatlarini taqdim etadi. Farg'ona vodiysidagi eng sifatli tozalash xizmati.",
      ru: "Express Clean предоставляет в Андижане профессиональную стирку ковров, чистку мебели и стирку штор. Лучший клининг-сервис в Ферганской долине.",
    },
    longDescription: {
      uz: "Andijon — Farg'ona vodiysining eng katta shahri va O'zbekistonning to'rtinchi katta shahri. 450 000 dan ortiq aholisi bilan shahar sifatli tozalash xizmatlariga katta ehtiyoj sezmoqda. Express Clean Andijonda o'z filialini ochib, shahar va atrofdagi tumanlar aholisiga xizmat ko'rsatmoqda. Biz Andijondagi oilalarga qulay narxlarda eng yuqori sifatli gilam yuvish xizmatini taklif etamiz. Maxsus jihozlar va ekologik toza vositalar bilan ishlaymiz.",
      ru: "Андижан — крупнейший город Ферганской долины и четвёртый по величине город Узбекистана. С населением более 450 000 человек город остро нуждается в качественных клининговых услугах. Express Clean открыл филиал в Андижане, обслуживая население города и окрестных районов. Мы предлагаем семьям Андижана высочайшее качество стирки ковров по доступным ценам. Работаем на специальном оборудовании с экологически чистыми средствами.",
    },
    geo: {
      latitude: 40.7821,
      longitude: 72.3442,
    },
    population: "450,000+",
    landmark: {
      uz: "Jome masjidi, Bobur bog'i, Andijon dehqon bozori",
      ru: "Соборная мечеть, Сад Бабура, Андижанский дехканский базар",
    },
    serviceHighlights: {
      uz: [
        "Andijon shahri bo'ylab bepul yetkazish",
        "Farg'ona vodiysi tumanlariga xizmat",
        "Oilaviy chegirmalar",
        "An'anaviy gilamlar uchun maxsus yuvish",
        "Tez va arzon xizmat",
        "Kafolatlangan sifat",
      ],
      ru: [
        "Бесплатная доставка по Андижану",
        "Обслуживание районов Ферганской долины",
        "Семейные скидки",
        "Специальная стирка традиционных ковров",
        "Быстрый и доступный сервис",
        "Гарантированное качество",
      ],
    },
    keywords: {
      uz: [
        "andijonda gilam yuvish", "gilam yuvish andijon", "gilam tozalash andijon",
        "andijonda mebel tozalash", "gilam yuvish xizmati andijon",
        "andijonda parda yuvish", "tozalash xizmati andijon",
      ],
      ru: [
        "стирка ковров андижан", "чистка ковров андижан", "стирка ковров в андижане",
        "химчистка ковров андижан", "мойка ковров андижан", "клининг андижан",
        "химчистка мебели андижан",
      ],
    },
    testimonial: {
      name: "Abdulloh M.",
      text: {
        uz: "Andijonda birinchi marta professional gilam yuvish xizmatidan foydalandim. Natija kutganimdan ham yaxshi bo'ldi. Tavsiya qilaman!",
        ru: "Впервые воспользовался профессиональной стиркой ковров в Андижане. Результат превзошёл ожидания. Рекомендую!",
      },
      district: {
        uz: "Andijon shahri",
        ru: "Город Андижан",
      },
    },
  },
  {
    slug: "namangan",
    name: {
      uz: "Namangan",
      ru: "Наманган",
    },
    region: {
      uz: "Namangan viloyati",
      ru: "Наманганская область",
    },
    metaTitle: {
      uz: "Namanganda Gilam Yuvish — Express Clean | Sifatli Tozalash",
      ru: "Стирка Ковров в Намангане — Express Clean | Качественная Чистка",
    },
    metaDescription: {
      uz: "Namanganda professional gilam yuvish xizmati ✅ Bepul yetkazish ✅ Hamyonbop narxlar ✅ Mebel, parda, adyol tozalash ✅ Express Clean sifati",
      ru: "Профессиональная стирка ковров в Намангане ✅ Бесплатная доставка ✅ Доступные цены ✅ Чистка мебели, штор, одеял ✅ Качество Express Clean",
    },
    heroHeadline: {
      uz: "Namanganda Gilam Yuvish Xizmati",
      ru: "Стирка Ковров в Намангане",
    },
    heroSubtitle: {
      uz: "Namangan shahriga Express Clean sifati yetib keldi. Gilamlaringizni professional usulda tozalab, yangidek holga keltiramiz!",
      ru: "Качество Express Clean теперь в Намангане. Профессионально почистим ваши ковры и вернём им первозданный вид!",
    },
    description: {
      uz: "Express Clean Namanganda ham o'z xizmatlarini taqdim etmoqda. Professional gilam yuvish, mebel tozalash va boshqa tozalash xizmatlarimizdan foydalaning.",
      ru: "Express Clean теперь предоставляет свои услуги и в Намангане. Воспользуйтесь профессиональной стиркой ковров, чисткой мебели и другими клининговыми услугами.",
    },
    longDescription: {
      uz: "Namangan — O'zbekistonning uchinchi katta shahri va Farg'ona vodiysining muhim markazi. 600 000 dan ortiq aholisi bilan shahar sifatli tozalash xizmatlariga muhtoj. Express Clean Namangan filiali shahardagi barcha tumanlar va atrofdagi hududlarga xizmat ko'rsatadi. Biz namanganglik oilalarga qulay narxlarda professional gilam yuvish xizmatini taqdim etamiz. Zamonaviy texnologiyalar va tajribali mutaxassislar jamoamiz gilamlaringizni eng yuqori sifatda tozalaydi.",
      ru: "Наманган — третий по величине город Узбекистана и важный центр Ферганской долины. С населением более 600 000 человек город нуждается в качественных клининговых услугах. Филиал Express Clean в Намангане обслуживает все районы города и прилегающие территории. Мы предлагаем семьям Намангана профессиональную стирку ковров по доступным ценам. Современные технологии и команда опытных специалистов обеспечат высочайшее качество чистки ваших ковров.",
    },
    geo: {
      latitude: 40.9983,
      longitude: 71.6726,
    },
    population: "600,000+",
    landmark: {
      uz: "Xo'jakon dahasi, Namangan markaziy bozori, Mulla Kirgiz masjidi",
      ru: "Район Ходжакон, Наманганский центральный базар, Мечеть Мулла Киргиз",
    },
    serviceHighlights: {
      uz: [
        "Namangan shahri bo'ylab bepul yetkazish",
        "Viloyat tumanlariga xizmat",
        "Hamyonbop narxlar",
        "Katta oilalar uchun maxsus takliflar",
        "Yirik gilamlar uchun kuchli tozalash",
        "Professional quritish texnologiyasi",
      ],
      ru: [
        "Бесплатная доставка по Намангану",
        "Обслуживание районов области",
        "Доступные цены",
        "Специальные предложения для больших семей",
        "Мощная чистка для крупных ковров",
        "Профессиональная технология сушки",
      ],
    },
    keywords: {
      uz: [
        "namanganda gilam yuvish", "gilam yuvish namangan", "gilam tozalash namangan",
        "namanganda mebel tozalash", "gilam yuvish xizmati namangan",
        "namanganda parda yuvish", "tozalash xizmati namangan",
      ],
      ru: [
        "стирка ковров наманган", "чистка ковров наманган", "стирка ковров в намангане",
        "химчистка ковров наманган", "мойка ковров наманган", "клининг наманган",
        "химчистка мебели наманган",
      ],
    },
    testimonial: {
      name: "Zulfiya R.",
      text: {
        uz: "Namanganda shunday professional xizmat borligidan xursandman. 3 ta katta gilamni yuvishibdi, hammasi juda toza. Narxi ham qulay ekan.",
        ru: "Рада, что в Намангане есть такой профессиональный сервис. Постирали 3 больших ковра, все идеально чистые. И цена приятная.",
      },
      district: {
        uz: "Namangan shahri",
        ru: "Город Наманган",
      },
    },
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
