export interface BlogPost {
  slug: string;
  title: {
    uz: string;
    ru: string;
  };
  excerpt: {
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
  coverImage: string;
  coverImageAlt: {
    uz: string;
    ru: string;
  };
  datePublished: string;
  dateModified: string;
  readingTime: {
    uz: string;
    ru: string;
  };
  category: {
    uz: string;
    ru: string;
  };
  author: {
    name: string;
    role: {
      uz: string;
      ru: string;
    };
    avatar: string;
  };
  tags: {
    uz: string[];
    ru: string[];
  };
  content: {
    uz: {
      intro: string;
      sections: {
        heading: string;
        text: string;
        tips?: string[];
        warning?: string;
      }[];
      conclusion: string;
    };
    ru: {
      intro: string;
      sections: {
        heading: string;
        text: string;
        tips?: string[];
        warning?: string;
      }[];
      conclusion: string;
    };
  };
  keywords: {
    uz: string[];
    ru: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "gilamdagi-kofe-dogini-ketkazish",
    title: {
      uz: "Gilamdagi kofe dog'ini uy sharoitida ketkazish: 5 ta samarali usul",
      ru: "Как вывести пятно от кофе с ковра в домашних условиях: 5 проверенных способов",
    },
    excerpt: {
      uz: "To'kilgan kofe dog'i gilam matosiga chuqur singib ketmasligi uchun zudlik bilan qilinishi kerak bo'lgan oddiy va xavfsiz usullar.",
      ru: "Простые и безопасные методы экстренной помощи ковру при пролитом кофе: от соды и уксуса до профессиональных средств.",
    },
    metaTitle: {
      uz: "Gilamdagi Kofe Dog'ini Ketkazish — Uy Sharoitida 5 Usul | Express Clean",
      ru: "Как Вывести Пятно от Кофе с Ковра Дома — 5 Способов | Express Clean",
    },
    metaDescription: {
      uz: "Gilamga kofe to'kildimi? ✅ Dog'ni ketkazishning 5 ta sinalgan usuli ✅ Sirka, soda, glitserin va eko shampun bilan tozalash ✅ Mutaxassis tavsiyalari",
      ru: "Пролили кофе на ковёр? ✅ 5 проверенных способов удаления кофейных пятен ✅ Сода, уксус, глицерин и эко-средства ✅ Советы экспертов клининга",
    },
    coverImage: "/service1_v3.png",
    coverImageAlt: {
      uz: "Gilamdagi kofe dog'ini tozalash va dog'larni ketkazish jarayoni",
      ru: "Процесс выведения пятен кофе с ворса ковра",
    },
    datePublished: "2025-01-15T08:00:00+05:00",
    dateModified: "2025-02-10T11:30:00+05:00",
    readingTime: {
      uz: "4 daqiqa",
      ru: "4 мин",
    },
    category: {
      uz: "Dog'larni ketkazish",
      ru: "Удаление пятен",
    },
    author: {
      name: "Sardor Rahimov",
      role: {
        uz: "Bosh texnolog va tozalash mutaxassisi",
        ru: "Главный технолог клининга",
      },
      avatar: "/logo.png",
    },
    tags: {
      uz: ["kofe dog'i", "gilam tozalash", "uy sharoitida", "dog' ketkazish", "maslahatlar"],
      ru: ["пятна кофе", "чистка ковра", "в домашних условиях", "лайфхаки", "советы"],
    },
    content: {
      uz: {
        intro:
          "Ertalabki xushbo'y qahva kayfiyatni ko'taradi, ammo tasodifan gilamga to'kilsa, haqiqiy boshog'riqqa aylanishi mumkin. Kofe tarkibidagi tanin moddasi gilam tolalariga tezda singib, to'q jigarrang iz qoldiradi. Asosiysi — vahimaga tushmaslik va xatolarga yo'l qo'ymaslik!",
        sections: [
          {
            heading: "1-qadam: Birinchi yordam (Dog'ni aslo ishqalamang!)",
            text:
              "Kofe to'kilgan zahoti qog'oz salfetka yoki toza paxta mato bilan suyuqlikni ehtiyotkorlik bilan shimib oling. Hech qachon dog'ni qattiq ishqalamang, aks holda suyuqlik gilamning eng chuqur qatlamlariga singib ketadi va dog' maydoni ikki barobar kengayadi.",
            tips: [
              "Qog'oz sochiqni dog' ustiga bosib turing",
              "Chetidan markazga qarab harakatlaning",
              "Issiq suv ishlatmang — u tanin moddasini tolalarga yopishtirib qo'yadi",
            ],
          },
          {
            heading: "2. Oq sirka va idish yuvish suyuqligi aralashmasi",
            text:
              "1 osh qoshiq oq sirka (9%), 1 osh qoshiq idish yuvish geli va 2 stakan iliq (issiq emas!) suvni aralashtiring. Olingan eritmani toza latta yordamida dog' ustiga yengil surting va 10-15 daqiqa kuting. So'ngra nam sochiq bilan artib oling.",
            tips: [
              "Sirka kofedagi kislotali pigmentlarni parchalaydi",
              "Rangli gilamlarning ko'rinmas burchagida oldin sinab ko'ring",
            ],
          },
          {
            heading: "3. Oziq-ovqat sodasi (Pishiriq sodasi) usuli",
            text:
              "Yangi to'kilgan kofe dog'i ustiga qalin qilib pishiriq sodasini seping. Soda namlikni va rang pigmentlarini o'ziga tortib oladi. 30-40 daqiqa qurigach, changyutgich (Karcher yoki oddiy uy changyutgichi) bilan yaxshilab tortib oling.",
          },
          {
            heading: "4. Glitserin bilan eski kofe dog'larini yumshatish",
            text:
              "Agar kofe dog'i allaqachon qurib ulgurgan bo'lsa, uni oddiy suv bilan ketkazib bo'lmaydi. Dorixonadan olingan iliq glitserinni dog' ustiga surtib, 1-2 soatga qoldiring. Glitserin qotib qolgan taninlarni yumshatadi, undan so'ng sovunli suv bilan oson yuviladi.",
            warning:
              "Diqqat: Ipak va qimmatbaho tabiiy jun gilamlarga xlorli yoki kuchli oqartiruvchi vositalarni aslo ishlatmang!",
          },
          {
            heading: "5. Qachon professional xizmatga murojaat qilish kerak?",
            text:
              "Agar dog' juda katta bo'lsa yoki gilamingiz nozik qimmatbaho matodan (ipak, viskoza, tabiiy jun) to'qilgan bo'lsa, uy sharoitidagi tajribalar gilamni butunlay yaroqsiz holga keltirishi mumkin. Bunday hollarda maxsus ekstraktorlar va organik fermentli vositalar bilan ishlaydigan mutaxassislarga topshirgan ma'qul.",
          },
        ],
        conclusion:
          "Xulosa qilib aytganda, yangi kofe dog'ini tezda shimib olish va to'g'ri eritma bilan tozalash gilamni qutqarib qoladi. Agar dog' ketmasa, Express Clean professional gilam yuvish fabrikasi yordamga keladi — biz bepul olib ketib, maxsus sentrifuga va Karcher apparatlari yordamida 100% toza qilib qaytaramiz!",
      },
      ru: {
        intro:
          "Утренний ароматный кофе заряжает энергией, но случайно пролитая чашка на ковёр может испортить настроение. Танины в составе кофе мгновенно въедаются в ворс, оставляя стойкие тёмные пятна. Главное — действовать быстро и не допускать распространенных ошибок!",
        sections: [
          {
            heading: "Шаг 1: Первая помощь (Ни в коем случае не трите!)",
            text:
              "Сразу после того как кофе пролился, аккуратно промокните жидкость бумажным полотенцем или сухой хлопковой тканью. Никогда не трите пятно, иначе красящий пигмент проникнет в основание ковра, а площадь пятна увеличится вдвое.",
            tips: [
              "Прижимайте салфетку от краёв пятна к центру",
              "Не используйте горячую воду — она заварит танины в волокнах",
            ],
          },
          {
            heading: "2. Раствор белого уксуса и геля для посуды",
            text:
              "Смешайте 1 столовую ложку белого уксуса (9%), 1 столовую ложку мягкого геля для посуды и 2 стакана тёплой воды. Нанесите раствор чистой губкой на пятно, оставьте на 10-15 минут, затем промокните влажной тканью.",
          },
          {
            heading: "3. Пищевая сода для свежих пятен",
            text:
              "Обильно посыпьте свежее пятно содой. Она впитает влагу и красящие вещества. Через 30-40 минут, когда сода высохнет, тщательно пропылесосьте участок.",
          },
          {
            heading: "4. Глицерин против застарелых пятен",
            text:
              "Если пятно кофе уже высохло, нанесите тёплый аптечный глицерин на 1-2 часа. Он размягчит засохшие танины, после чего ковёр можно промыть мыльным раствором.",
            warning:
              "Внимание: Никогда не используйте хлорные отбеливатели на шерстяных и шёлковых коврах!",
          },
          {
            heading: "5. Когда лучше обратиться к профессионалам?",
            text:
              "Если ковёр деликатный (шёлк, вискоза, длинноворсный шегги) или пятно въелось глубоко, домашняя химия может разрушить структуру и цвет ворса. В таких ситуациях безопаснее доверить чистку цеховым экстракторам и экошампуням.",
          },
        ],
        conclusion:
          "Своевременная реакция спасёт ваш ковёр в большинстве случаев. А если пятно не поддаётся — специалисты Express Clean бесплатно заберут изделие, бережно выведут пятна на профессиональном оборудовании и вернут идеально чистым!",
      },
    },
    keywords: {
      uz: [
        "gilamdagi kofe dog'ini ketkazish", "kofe dog'i tozalash", "gilam tozalash sirlari",
        "gilam dog'larini ketkazish", "uyda gilam tozalash", "karcher gilam tozalash",
      ],
      ru: [
        "как вывести пятно от кофе с ковра", "чистка ковра от кофе", "удаление пятен с ковра",
        "химчистка ковров ташкент", "как очистить ковер дома",
      ],
    },
  },
  {
    slug: "gilamni-tez-quritish-usullari",
    title: {
      uz: "Gilam yuvgandan keyin hid chiqarmay tez quritish sirlari",
      ru: "Как быстро высушить ковер после стирки без запаха сырости",
    },
    excerpt: {
      uz: "Noto'g'ri quritilgan gilamdan nam va noxush mog'or hidi kelishi mumkin. Gilamni xonada va fabrikada to'g'ri quritish qoidalari.",
      ru: "Секреты быстрой и правильной сушки ковров: почему появляется запах сырости и как профессиональные камеры сушки решают эту проблему.",
    },
    metaTitle: {
      uz: "Gilamni Tez Quritish Usullari va Qoidalari | Express Clean",
      ru: "Как Быстро Высушить Ковер После Стирки | Express Clean",
    },
    metaDescription: {
      uz: "Gilam yuvgandan keyin mog'or hidi chiqmasligi uchun qanday quritish kerak? ✅ Sentrifuga va shamollatish usullari ✅ Express Clean quritish kamerasi",
      ru: "Правильная сушка ковров без неприятного запаха ✅ Использование центрифуги и осушителей ✅ Преимущества камерной сушки в Express Clean",
    },
    coverImage: "/service5.png",
    coverImageAlt: {
      uz: "Gilamlarni maxsus avtomatlashtirilgan kamerada quritish jarayoni",
      ru: "Камера сушки ковров с климат-контролем",
    },
    datePublished: "2025-01-22T09:00:00+05:00",
    dateModified: "2025-02-15T14:00:00+05:00",
    readingTime: {
      uz: "5 daqiqa",
      ru: "5 мин",
    },
    category: {
      uz: "Parvarishlash",
      ru: "Уход за коврами",
    },
    author: {
      name: "Jasur Aliyev",
      role: {
        uz: "Sex boshlig'i va sifat nazoratchisi",
        ru: "Начальник цеха и контроля качества",
      },
      avatar: "/logo.png",
    },
    tags: {
      uz: ["quritish", "gilam parvarishi", "sentrifuga", "nam hidi", "maslahatlar"],
      ru: ["сушка ковров", "уход", "центрифуга", "запах сырости", "клининг"],
    },
    content: {
      uz: {
        intro:
          "Ko'pchilik gilamni yuvish qiyin deb o'ylaydi, aslida esa eng muhim va nozik bosqich — bu quritishdir. Agar gilam 24 soatdan ortiq nam holatda qolsa, uning ichida zamburug' va mog'or bakteriyalari ko'payib, o'tkir noxush hid paydo bo'ladi.",
        sections: [
          {
            heading: "1. Nega gilamdan nam hidi keladi?",
            text:
              "Asosiy sabab — namlikning gilam tag qismida (osnovasida) to'planib qolishi. Oddiy quyoshda yoki havosi yetarli bo'lmagan xonada quritilganda ustki momiq qismi qurigandek tuyulsa-da, ichki qavati bir necha kun nam qoladi.",
          },
          {
            heading: "2. Uy sharoitida quritishni tezlashtirish usullari",
            text:
              "Uyda gilam yuvilgan bo'lsa, xonadagi derazalarni ochib kuchli havo aylanishini ta'minlang. Ventilyator va havo quritgich (osushitel) uskunalarini to'g'ridan-to'g'ri gilam tomon yo'naltiring. Gilam tagiga yog'och g'o'lalarni qo'yib, ostidan ham havo o'tishini ta'minlash lozim.",
            tips: [
              "Konditsionerni 'Dry' (Quritish) rejimiga qo'ying",
              "To'g'ridan-to'g'ri jazirama quyoshga uzoq qo'ymang — ranglari o'chishi mumkin",
            ],
          },
          {
            heading: "3. Sentrifuganing ahamiyati: 95% namlik 3 daqiqada chiqadi",
            text:
              "Professional tozalash fabrikalarida maxsus quvursimon sentrifugalar ishlatiladi. Gilam o'ralgan holda daqiqasiga 1400 marta aylanadi va 3 daqiqa ichida barcha suv tolalarga zarar yetkazmasdan siqib chiqariladi.",
          },
          {
            heading: "4. Maxsus quritish kameralari",
            text:
              "Sentrifugadan chiqqan yarim quruq gilam harorati 35-40°C va namligi 20% bo'lgan maxsus quritish xonalariga osiladi. Bu yerda kuchli turbinalar yordamida gilam 6-8 soatda 100% to'liq quriydi, mog'or va bakteriyalar esa butunlay nobud bo'ladi.",
          },
        ],
        conclusion:
          "Gilamlaringiz uzoq yillar xizmat qilishi va toza hid taratishi uchun ularni professional sharoitda yuvdiring va quriting. Express Clean barcha sanitariya me'yorlariga rioya qilgan holda xizmat ko'rsatadi!",
      },
      ru: {
        intro:
          "Многие считают, что самое сложное — отстирать ковёр, однако решающий этап — это сушка. Если ковёр остаётся влажным более 24 часов, внутри основания начинают размножаться бактерии и плесень, вызывая стойкий затхлый запах.",
        sections: [
          {
            heading: "1. Почему появляется неприятный запах?",
            text:
              "Главная причина — застой влаги в плотной основе ковра. При естественной сушке ворс может казаться сухим, тогда как внутри ткань остаётся сырой.",
          },
          {
            heading: "2. Как ускорить сушку дома",
            text:
              "Обеспечьте сквозное проветривание. Направьте на ковёр вентилятор или включите кондиционер в режим осушения (Dry). Приподнимите ковёр над полом для циркуляции воздуха снизу.",
          },
          {
            heading: "3. Роль промышленной центрифуги",
            text:
              "В цехах Express Clean ковры отжимаются в трубчатых центрифугах со скоростью 1400 об/мин. За 3 минуты удаляется до 95% влаги без заломов и повреждения ворса.",
          },
          {
            heading: "4. Сушильные камеры с климат-контролем",
            text:
              "Окончательная сушка происходит в закрытых камерах с промышленными осушителями при температуре 35-40°C. Ковёр высыхает за несколько часов, оставаясь мягким и свежим.",
          },
        ],
        conclusion:
          "Доверьте стирку профессионалам Express Clean — мы гарантируем идеальную чистоту и быструю сушку без неприятных запахов!",
      },
    },
    keywords: {
      uz: [
        "gilam quritish", "gilamdan nam hidi ketkazish", "sentrifugada gilam siqish",
        "gilam quritish kamerasi", "gilam yuvish toshkent",
      ],
      ru: [
        "как высушить ковер", "запах сырости от ковра", "сушка ковров в цеху",
        "центрифуга для ковров", "стирка ковров ташкент",
      ],
    },
  },
  {
    slug: "divan-va-yumshoq-mebellarni-tozalash",
    title: {
      uz: "Divan va yumshoq mebellarni dog'lardan tozalash va parvarishlash qoidalari",
      ru: "Уход за мягкой мебелью: как очистить диван от пятен и пылевых клещей",
    },
    excerpt: {
      uz: "Yumshoq mebellarni yangidek saqlash, chang kanalaridan xalos bo'lish va mato rangini himoya qilish bo'yicha qo'llanma.",
      ru: "Полное руководство по химчистке мягкой мебели: избавляемся от пятен, запахов и пылевых клещей без вреда для обивки.",
    },
    metaTitle: {
      uz: "Divan va Mebel Tozalash Sirlari — Karcher Ekstraktor | Express Clean",
      ru: "Химчистка Диванов и Мягкой Мебели — Советы | Express Clean",
    },
    metaDescription: {
      uz: "Divan va kreslolarni qanday tozalash kerak? ✅ Dog'lar, kleshlar va changlardan xalos bo'lish ✅ Karcher ekstraktorli tozalash ✅ Foydali maslahatlar",
      ru: "Как правильно чистить диван дома? ✅ Борьба с пылевыми клещами и сложными пятнами ✅ Экстракторная чистка Karcher ✅ Советы профессионалов",
    },
    coverImage: "/service3.png",
    coverImageAlt: {
      uz: "Karcher uskunasi yordamida divan va yumshoq mebel kimyoviy tozalash",
      ru: "Экстракторная химчистка дивана на дому оборудованием Karcher",
    },
    datePublished: "2025-02-01T10:00:00+05:00",
    dateModified: "2025-02-20T16:00:00+05:00",
    readingTime: {
      uz: "4 daqiqa",
      ru: "4 мин",
    },
    category: {
      uz: "Mebel tozalash",
      ru: "Химчистка мебели",
    },
    author: {
      name: "Sardor Rahimov",
      role: {
        uz: "Bosh texnolog va tozalash mutaxassisi",
        ru: "Главный технолог клининга",
      },
      avatar: "/logo.png",
    },
    tags: {
      uz: ["divan yuvish", "mebel tozalash", "karcher ekstraktor", "kleshlar", "maslahatlar"],
      ru: ["чистка дивана", "химчистка мебели", "пылевые клещи", "karcher", "советы"],
    },
    content: {
      uz: {
        intro:
          "Divan — butun oila jam bo'ladigan eng shinam maskan. Ammo vaqt o'tishi bilan uning matosiga chang, oziq-ovqat qoldiqlari va ko'zga ko'rinmas chang kanalari (kleshlar) to'planadi. Muntazam tozalash nafaqat estetik ko'rinish, balki salomatlik uchun ham juda muhimdir.",
        sections: [
          {
            heading: "1. Chang kanalari (kleshlar) xavfi",
            text:
              "Yumshoq mebellarning ichki qatlamlarida millionlab chang kanalari yashaydi. Ularning hayot faoliyati qoldiqlari allergiya, rinit va hatto astma xurujlariga sabab bo'lishi mumkin. Oddiy changyutgich faqat ustki changni oladi, chuqur parazitlarni yo'qotish uchun kuchli ekstraksiya talab etiladi.",
          },
          {
            heading: "2. Mato turiga qarab tozalash usuli",
            text:
              "Velvet, jakkard, flok va charm qoplamalar turli xil e'tiborni talab qiladi. Masalan, charm mebellarni spirtli vositalar bilan artish qat'iyan taqiqlanadi (teri yoriladi). Velvet va velurni esa qattiq cho'tka bilan ishqalab bo'lmaydi.",
            tips: [
              "Tozalashdan oldin mebelning pasportidagi yuvish belgisiga qarang",
              "Doimo gipoallergen vositalardan foydalaning",
            ],
          },
          {
            heading: "3. Karcher professional ekstraksiyasi qanday ishlaydi?",
            text:
              "Professional xizmatda Karcher puzzi ekstraktori bosim ostida maxsus organik yuvish eritmasini tolalarning 5-8 sm chuqurligiga purkaydi va shu zahoti barcha kirlar, dog'lar va kleshlarni kuchli vakuum orqali qaytarib so'rib oladi. Natijada mebel atigi 2-4 soatda quriydi.",
          },
        ],
        conclusion:
          "Uyingizdagi mebellar toza va xavfsiz bo'lishi uchun yiliga kamida 1-2 marta professional chuqur tozalashni amalga oshirish tavsiya etiladi. Express Clean mutaxassislari istalgan vaqtda uyingizga borib, mebellaringizni yangidek tozalab berishadi!",
      },
      ru: {
        intro:
          "Диван — центр семейного уюта. Однако со временем обивка накапливает пыль, жировые следы и пылевых клещей. Регулярная химчистка важна не только для красоты интерьера, но и для здоровья всех домочадцев.",
        sections: [
          {
            heading: "1. Чем опасны пылевые клещи?",
            text:
              "В наполнителе мягкой мебели обитают миллионы микроскопических клещей-сапрофитов, вызывающих аллергию и приступы астмы. Обычный бытовой пылесос не способен извлечь их из глубины наполнителя.",
          },
          {
            heading: "2. Подбор химии под тип ткани",
            text:
              "Велюр, флок, жаккард и кожа требуют строго индивидуального подхода. Агрессивные растворители могут повредить защитную пропитку или вызвать выцветание обивки.",
          },
          {
            heading: "3. Экстракторная чистка Karcher на дому",
            text:
              "Профессиональный экстрактор под давлением подаёт раствор гипоаллергенного экошампуня вглубь ткани и мгновенно всасывает грязь вместе с микроорганизмами. Обивка остаётся лишь слегка влажной и высыхает за 2-4 часа.",
          },
        ],
        conclusion:
          "Закажите профессиональную выездную химчистку диванов в Express Clean — верните вашей мебели первозданную чистоту и свежесть уже сегодня!",
      },
    },
    keywords: {
      uz: [
        "divan tozalash", "mebel yuvish toshkent", "karcher divan tozalash",
        "mebel dog'larini ketkazish", "chang kanalari tozalash",
      ],
      ru: [
        "химчистка диванов ташкент", "чистка мягкой мебели на дому",
        "удаление пылевых клещей", "экстрактор karcher",
      ],
    },
  },
  {
    slug: "gilamga-yopishgan-saqichni-ketkazish",
    title: {
      uz: "Gilamga yopishgan saqichni ketkazish: 4 ta sinalgan usul",
      ru: "Как убрать присохшую жвачку с ковра: 4 проверенных способа",
    },
    excerpt: {
      uz: "Gilam tuklariga yopishib qotib qolgan saqichni tolalarga zarar yetkazmasdan oson va xavfsiz tozalash usullari.",
      ru: "Эффективные методы удаления жвачки и пластилина с ворса ковра: от заморозки льдом до профессиональных очистителей.",
    },
    metaTitle: {
      uz: "Gilamga Yopishgan Saqichni Ketkazish Usullari | Express Clean",
      ru: "Как Убрать Жвачку с Ковра — 4 Способа | Express Clean",
    },
    metaDescription: {
      uz: "Gilamga saqich yopishib qoldimi? ✅ Muz bilan muzlatish usuli ✅ Saqichni tolalarga zarar bermasdan tozalash ✅ Mutaxassis tavsiyalari",
      ru: "Прилипла жвачка к ковру? ✅ Метод заморозки кубиками льда ✅ Безопасное удаление без повреждения ворса ✅ Советы клининга",
    },
    coverImage: "/service6.png",
    coverImageAlt: {
      uz: "Gilamdan saqich va yopishqoq moddalarni tozalash",
      ru: "Удаление жевательной резинки с коврового покрытия",
    },
    datePublished: "2025-02-12T09:00:00+05:00",
    dateModified: "2025-02-22T12:00:00+05:00",
    readingTime: {
      uz: "3 daqiqa",
      ru: "3 мин",
    },
    category: {
      uz: "Dog'larni ketkazish",
      ru: "Удаление пятен",
    },
    author: {
      name: "Sardor Rahimov",
      role: {
        uz: "Bosh texnolog",
        ru: "Главный технолог",
      },
      avatar: "/logo.png",
    },
    tags: {
      uz: ["saqich ketkazish", "gilam tozalash", "dog'lar", "layfxak"],
      ru: ["удалить жвачку", "чистка ковра", "пятна", "лайфхаки"],
    },
    content: {
      uz: {
        intro:
          "Gilamga tushib ezilgan saqich eng yoqimsiz ifloslanishlardan biridir. Uni pichoq bilan qirib olishga urinmang — bu gilam tuklarini uzib tashlaydi!",
        sections: [
          {
            heading: "1. Muz bilan muzlatish usuli (Eng xavfsiz va tez usul)",
            text:
              "Polietilen paketga 4-5 dona muz bo'lagini soling va saqich ustiga 10-15 daqiqa bosib turing. Saqich tosh kabi qotgandan so'ng, qattiq qoshiq yoki plastmassa karta bilan yengil ko'chirib oling.",
          },
          {
            heading: "2. Spirt yoki sirka eritmasi",
            text:
              "Saqichdan qolgan yopishqoq qoldiq izlariga paxta orqali spirt yoki oq sirka surtib, 5 daqiqadan so'ng nam sochiq bilan arting.",
          },
        ],
        conclusion:
          "Agar saqich juda katta maydonga yoyilib ketgan bo'lsa, Express Clean mutaxassislariga murojaat qiling — biz maxsus krio-vositalar yordamida gilamingizni tozalab beramiz!",
      },
      ru: {
        intro:
          "Въевшаяся в ворс ковра жвачка кажется неразрешимой проблемой. Но не спешите срезать ворс ножницами!",
        sections: [
          {
            heading: "1. Метод заморозки льдом",
            text:
              "Положите кубики льда в пакет и прижмите к жвачке на 10-15 минут. Когда она станет хрупкой, аккуратно снимите её пластиковым шпателем или ложкой.",
          },
          {
            heading: "2. Удаление остаточного липкого следа",
            text:
              "Смочите ватный диск спиртом и протрите остатки клеящего состава, затем промойте мыльным раствором.",
          },
        ],
        conclusion:
          "Специалисты Express Clean удалят любые стойкие загрязнения бережно и без вреда для ковра!",
      },
    },
    keywords: {
      uz: ["gilamga yopishgan saqichni ketkazish", "saqich tozalash", "gilamdan saqichni olish"],
      ru: ["как убрать жвачку с ковра", "удалить жвачку с ворса", "чистка ковра от жвачки"],
    },
  },
  {
    slug: "gilamdagi-zax-hidini-yoqotish",
    title: {
      uz: "Gilamdagi zax va noxush hidlarni yo'qotish sirlari",
      ru: "Как избавиться от запаха сырости и затхлости на ковре",
    },
    excerpt: {
      uz: "Gilamdan kelayotgan zax, mog'or va uy hayvonlari hidlarini ildizi bilan yo'qotish bo'yicha to'liq qo'llanma.",
      ru: "Проверенные способы нейтрализации неприятных запахов сырости, плесени и домашних животных с ковровых изделий.",
    },
    metaTitle: {
      uz: "Gilamdagi Zax va Noxush Hidni Yo'qotish | Express Clean",
      ru: "Как Избавиться от Запаха Сырости на Ковре | Express Clean",
    },
    metaDescription: {
      uz: "Gilamdan zax va namlik hidi kelyaptimi? ✅ Hid sabablari va yo'qotish usullari ✅ Soda va dezinfeksiya ✅ Ozonli tozalash",
      ru: "Появился запах сырости от ковра? ✅ Причины и методы нейтрализации ✅ Сода и антибактериальная обработка ✅ Озонирование",
    },
    coverImage: "/service2.png",
    coverImageAlt: {
      uz: "Gilamdagi noxush hidlarni dezinfeksiya qilish va tozalash",
      ru: "Устранение запахов и дезинфекция ковра",
    },
    datePublished: "2025-02-18T10:00:00+05:00",
    dateModified: "2025-02-25T15:00:00+05:00",
    readingTime: {
      uz: "4 daqiqa",
      ru: "4 мин",
    },
    category: {
      uz: "Parvarishlash",
      ru: "Уход за коврами",
    },
    author: {
      name: "Jasur Aliyev",
      role: {
        uz: "Texnolog",
        ru: "Технолог",
      },
      avatar: "/logo.png",
    },
    tags: {
      uz: ["zax hidi", "hid yo'qotish", "gilam dezinfeksiya", "mog'or"],
      ru: ["запах сырости", "удаление запахов", "дезинфекция", "плесень"],
    },
    content: {
      uz: {
        intro:
          "Zax hidi shunchaki noqulaylik emas, balki gilam tolalari ichida mog'or zamburug'lari ko'payayotganidan dalolat beradi. Bunday havoda nafas olish salomatlik uchun xavflidir.",
        sections: [
          {
            heading: "1. Nega xushbo'y spreylar yordam bermaydi?",
            text:
              "Oddiy parfyum va spreylar hidni faqat vaqtincha niqoblaydi. Asosiy bakteriyalar manbai gilam tagida qolaveradi. Yechim — to'liq antibakterial tozalash va quritishdir.",
          },
          {
            heading: "2. Soda va efir moylari bilan hidni tortib olish",
            text:
              "1 stakan sodaga 5-6 tomchi lavanda yoki choy daraxti efir moyini tomizing, gilamga teng sepib 2-3 soatga qoldiring. So'ngra changyutgich bilan tortib oling.",
          },
          {
            heading: "3. Professional ozonlash va kamerada quritish",
            text:
              "Express Clean fabrikasida hidli gilamlar maxsus antibakterial eritmalar bilan yuviladi va ozon kamerasida dezinfeksiya qilinadi — 100% noxush hidlar yo'qoladi.",
          },
        ],
        conclusion:
          "Zax hidi bo'lgan gilamlarni darhol tozalashga bering — Express Clean uyingizga musaffo tozalik olib kiradi!",
      },
      ru: {
        intro:
          "Запах сырости свидетельствует о размножении спор плесени в основании ковра. Обычные освежители воздуха проблему не решат.",
        sections: [
          {
            heading: "1. Почему спреи не работают",
            text:
              "Освежители лишь маскируют запах, тогда как бактерии продолжают размножаться во влажной среде.",
          },
          {
            heading: "2. Профессиональная антибактериальная стирка и озонирование",
            text:
              "В цехе Express Clean изделия проходят глубокую обработку антисептическими растворами и озонирование, гарантированно уничтожающее источник запаха.",
          },
        ],
        conclusion:
          "Закажите профессиональную стирку с бесплатной доставкой в Express Clean!",
      },
    },
    keywords: {
      uz: ["gilamdagi zax hidini yo'qotish", "gilam hidini ketkazish", "gilamdan nam hidi kelsa"],
      ru: ["как убрать запах сырости с ковра", "запах плесени на ковре", "устранение запахов ковер"],
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
