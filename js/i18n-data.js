/* =========================================================
   SAMEO SMASH — translations
   ---------------------------------------------------------
   The KEY is the English source text, exactly as it appears
   in the HTML (including any <br>). js/i18n.js reads each
   marked element's original English on first load and uses
   it to look up Russian and Georgian here.

   That means:
   - English needs no entries; it is the source.
   - To change English wording, update the HTML AND the key
     here, or the translation stops matching.
   - A missing key falls back to English rather than showing
     an empty element.

   ⚠️ These translations were produced by Claude, not by a
   native speaker. Georgian especially must be reviewed by
   someone local before this is shown to customers — it is
   the restaurant's home market. See README §9.
   ========================================================= */

window.SAMEO_I18N = {

  /* ------------------------------------------------------ */
  ru: {

    /* --- page titles (browser tab) --- */
    "Sameo Smash — Smash Burgers in Tbilisi | სამეო სმეშ":
      "Sameo Smash — смэш-бургеры в Тбилиси | სამეო სმეშ",
    "Menu &amp; Prices — Sameo Smash | Burgers, Sliders &amp; Shakes in Tbilisi":
      "Меню и цены — Sameo Smash | бургеры, слайдеры и шейки в Тбилиси",
    "About — Sameo Smash | Smash Burger Kitchen in Tbilisi":
      "О нас — Sameo Smash | смэш-бургерная в Тбилиси",
    "Location &amp; Contact — Sameo Smash | 1 Vashlovani St, Tbilisi":
      "Адрес и контакты — Sameo Smash | ул. Вашловани 1, Тбилиси",
    "Page Not Found — Sameo Smash":
      "Страница не найдена — Sameo Smash",
    /* --- chrome / navigation --- */
    "Skip to content": "Перейти к содержанию",
    "Home": "Главная",
    "Menu": "Меню",
    "About": "О нас",
    "Location": "Адрес",
    "Order Now": "Заказать",
    "Call": "Позвонить",
    "Directions": "Маршрут",
    "Explore": "Разделы",
    "Location &amp; Contact": "Адрес и контакты",
    "Visit &amp; Order": "Прийти и заказать",
    "Get directions": "Построить маршрут",
    "Open menu": "Открыть меню",

    /* --- home: hero --- */
    "Vashlovani St · Tbilisi": "ул. Вашловани · Тбилиси",
    "Smashed hard.": "Прижимаем сильно.",
    "Served fast.": "Подаём быстро.",
    "Smash burgers, sliders, fries and shakes — pressed to order on the\n                flat-top and built for people who take a burger seriously.":
      "Смэш-бургеры, слайдеры, картофель фри и шейки — жарим под прессом на плите под заказ, для тех, кто относится к бургеру серьёзно.",
    "View Menu": "Смотреть меню",
    "Burgers from ₾20": "Бургеры от ₾20",
    "Smashed to order": "Готовим под заказ",
    "12:00 – 02:00": "12:00 – 02:00",
    "Open every day": "Открыто каждый день",
    "Vashlovani St": "ул. Вашловани",
    "Tbilisi 0108": "Тбилиси 0108",

    /* --- home: marquee --- */
    "Smash Burgers": "Смэш-бургеры",
    "Cheeseburgers": "Чизбургеры",
    "Truffle Burgers": "Трюфельные бургеры",
    "Sliders": "Слайдеры",
    "Fries": "Картофель фри",
    "Sauces": "Соусы",
    "Desserts": "Десерты",
    "Coffee": "Кофе",
    "Shakes": "Шейки",
    "Drinks": "Напитки",

    /* --- home: anatomy --- */
    "Anatomy of the smash": "Анатомия смэша",
    "The Press": "Пресс",
    "Loose beef meets a hot flat-top and gets one hard press. No moulding,\n                   no shaping — that press is where everything starts.":
      "Рубленая говядина попадает на раскалённую плиту и получает одно сильное нажатие. Без формовки — именно с этого нажатия всё начинается.",
    "The Crust": "Корочка",
    "Seconds of full contact turn the edges lacy, brown and crisp.\n                   That caramelised crust is the whole reason to smash a burger.":
      "Секунды плотного контакта превращают края в хрустящее кружево. Ради этой карамельной корочки бургер и прижимают.",
    "The Build": "Сборка",
    "Cheese goes on while it is still moving, then it is stacked and\n                   wrapped to travel — so a takeaway arrives the way it left.":
      "Сыр кладём, пока котлета ещё горячая, затем собираем и упаковываем в дорогу — чтобы заказ приехал таким же, каким уехал.",

    /* --- home: line-up --- */
    "The line-up": "Наш состав",
    "What We Smash": "Что мы жарим",
    "Four burgers, all pressed to order on the flat-top.": "Четыре бургера, все прижимаются на плите под заказ.",
    "See the Full Menu": "Всё меню",

    /* --- products --- */
    "Cheeseburger": "Чизбургер",
    "100% beef, bun, mixed sauce, onion, lettuce, pickles and cheese.":
      "100% говядина, булочка, фирменный соус, лук, салат, солёные огурцы и сыр.",
    "Also available in S / M / L — ask in store": "Также есть размеры S / M / L — спросите на кассе",
    "Chili Cheeseburger": "Чили чизбургер",
    "100% beef, bun, mango-chili sauce, onion, lettuce, jalapeño and cheese.":
      "100% говядина, булочка, соус манго-чили, лук, салат, халапеньо и сыр.",
    "Truffle Burger": "Трюфельный бургер",
    "100% beef, bun, truffle sauce, onion and white cheese.":
      "100% говядина, булочка, трюфельный соус, лук и белый сыр.",
    "Veggie Burger": "Вегетарианский бургер",
    "Falafel, bun, mixed sauce, onion, lettuce, pickles and cheese.":
      "Фалафель, булочка, фирменный соус, лук, салат, солёные огурцы и сыр.",
    "Classic Slider": "Классический слайдер",
    "Truffle Slider": "Трюфельный слайдер",
    "Chili Slider": "Чили слайдер",
    "Vanilla Shake": "Ванильный шейк",
    "Chocolate Shake": "Шоколадный шейк",
    "Strawberry Shake": "Клубничный шейк",
    "Toast": "Тост",
    "Mango Sauce": "Соус манго",
    "Truffle Sauce": "Трюфельный соус",
    "Ketchup": "Кетчуп",
    "Mustard": "Горчица",
    "Chocolate Cookie": "Шоколадное печенье",
    "Vanilla Cookie": "Ванильное печенье",
    "Espresso": "Эспрессо",
    "Double Espresso": "Двойной эспрессо",
    "Americano": "Американо",
    "Cappuccino": "Капучино",
    "Latte": "Латте",
    "Iced Coffee": "Холодный кофе",
    "Iced Latte": "Айс латте",
    "Iced Coffee with Ice Cream": "Холодный кофе с мороженым",
    "Soft Drinks": "Безалкогольные напитки",
    "Water": "Вода",
    "Coca-Cola": "Coca-Cola",
    "Coca-Cola Zero": "Coca-Cola Zero",
    "Fanta": "Fanta",
    "Sprite": "Sprite",
    "Beer": "Пиво",
    "Alkhanidze Beer": "Пиво Алханидзе",

    /* --- home: about teaser --- */
    "Who we are": "Кто мы",
    "One Thing,<br>Done Properly": "Одно дело,<br>сделанное как надо",
    "Sameo Smash is a smash burger kitchen in Tbilisi built around a single idea:\n          get the crust right and everything else follows.":
      "Sameo Smash — кухня смэш-бургеров в Тбилиси, построенная вокруг одной идеи: сделай корочку правильно, и всё остальное сложится само.",
    "No long menu of things we're average at. Burgers, sliders, sides and shakes —\n          smashed to order, handed over hot, ready for takeaway or delivery.":
      "Никакого длинного меню из блюд, которые нам удаются средне. Бургеры, слайдеры, закуски и шейки — под заказ, горячими, с собой или на доставку.",
    "More About Us": "Подробнее о нас",
    "Smashed<br>to Order": "Готовим<br>под заказ",
    "Nothing sits under a lamp waiting for you.": "Ничего не лежит под лампой в ожидании.",
    "Crisp<br>Edges": "Хрустящие<br>края",
    "Hard press, hot flat-top. That's the whole trick.": "Сильный пресс, раскалённая плита. В этом весь секрет.",
    "Built for<br>Takeaway": "Готово<br>к выносу",
    "Packed to travel without falling apart.": "Упаковано так, чтобы доехать целым.",
    "Right Here<br>in Tbilisi": "Прямо здесь,<br>в Тбилиси",
    "Find us at 1 Vashlovani St, 0108.": "Найдите нас: ул. Вашловани 1, 0108.",

    /* --- home: testimonials --- */
    "Testimonials": "Отзывы",
    "What People Say": "Что говорят гости",
    "Sample content": "Демонстрационный текст",
    "Sample": "Пример",
    "Demonstration text, not a real review": "Демонстрационный текст, не настоящий отзыв",

    /* --- home: location --- */
    "Find us": "Как нас найти",
    "Come and Get It": "Приходите и забирайте",
    "We're on Vashlovani Street in central Tbilisi. Dine in, take away, or order for delivery.":
      "Мы на улице Вашловани в центре Тбилиси. Ешьте у нас, забирайте с собой или заказывайте доставку.",
    "Address": "Адрес",
    "1 Vashlovani St, Tbilisi 0108, Georgia": "ул. Вашловани 1, Тбилиси 0108, Грузия",
    "Phone": "Телефон",
    "Opening Hours": "Часы работы",
    "Every day, 12:00 – 02:00": "Каждый день, 12:00 – 02:00",
    "Delivery": "Доставка",
    "Available through Wolt and Glovo, or call for takeaway.":
      "Доступна через Wolt и Glovo, или позвоните и заберите сами.",
    "Call to Order": "Позвонить и заказать",
    "Directions &amp; Contact": "Маршрут и контакты",
    "Hungry?": "Проголодались?",
    "Order Your Smash": "Закажите свой смэш",
    "Call the kitchen for takeaway, or get it delivered through Wolt or Glovo.":
      "Позвоните на кухню и заберите сами или закажите доставку через Wolt или Glovo.",
    "Order on Wolt": "Заказать в Wolt",
    "Order on Glovo": "Заказать в Glovo",

    /* --- footer --- */
    "Smash burgers, sliders and shakes on Vashlovani Street in Tbilisi.\n          Open every day, 12:00–02:00.":
      "Смэш-бургеры, слайдеры и шейки на улице Вашловани в Тбилиси. Открыто каждый день, 12:00–02:00.",
    "1 Vashlovani St<br>Tbilisi 0108, Georgia": "ул. Вашловани 1<br>Тбилиси 0108, Грузия",
    "Open daily 12:00–02:00": "Каждый день 12:00–02:00",
    "© 2026 Sameo Smash": "© 2026 Sameo Smash",
    "1 Vashlovani St, Tbilisi 0108, Georgia": "ул. Вашловани 1, Тбилиси 0108, Грузия",

    /* --- menu page --- */
    "The Menu": "Меню",
    "Burgers, Sliders<br>&amp; Everything Else": "Бургеры, слайдеры<br>и всё остальное",
    "Everything is smashed and built to order. Open every day from\n          12:00 to 02:00 — eat in, take away, or get it delivered.":
      "Всё готовится под заказ. Открыто каждый день с 12:00 до 02:00 — у нас, с собой или на доставку.",
    "Delivery Options": "Варианты доставки",
    "Burgers": "Бургеры",
    "Sides": "Закуски",
    "From ₾20": "от ₾20",
    "From ₾25": "от ₾25",
    "From ₾6": "от ₾6",
    "From ₾3": "от ₾3",
    "All ₾15": "все по ₾15",
    "The heart of the menu. Every patty is pressed hard on a hot flat-top so the edges\n        go crisp and caramelised, then stacked and served straight away.":
      "Сердце меню. Каждая котлета сильно прижимается на раскалённой плите, чтобы края стали хрустящими и карамельными, затем сразу собирается и подаётся.",
    "Alongside": "К бургеру",
    "Sides, sweet &amp; drinks": "Закуски, сладкое и напитки",
    "Freshly baked": "Свежая выпечка",
    "Hot &amp; iced": "Горячий и холодный",
    "Local": "Местное",
    "Ready when you are": "Мы готовы",
    "Call the kitchen directly, or order for delivery through Wolt or Glovo.":
      "Позвоните прямо на кухню или закажите доставку через Wolt или Glovo.",

    /* --- about page --- */
    "About Us": "О нас",
    "— is a smash burger kitchen\n          on Vashlovani Street in Tbilisi.":
      "— кухня смэш-бургеров на улице Вашловани в Тбилиси.",
    "The whole idea sits in the name. A smash burger isn't shaped or moulded — it's\n          pressed hard onto a hot flat-top so the surface caramelises and the edges go\n          crisp and lacy. That crust is the entire point, and it only happens if the\n          burger is cooked the moment you order it.":
      "Вся идея — в названии. Смэш-бургер не формуют руками: его сильно прижимают к раскалённой плите, чтобы поверхность карамелизовалась, а края стали хрустящими и кружевными. Ради этой корочки всё и затевается, а получается она только если бургер готовят в момент заказа.",
    "So that's what we build around. A short menu instead of a long one, made to\n          order instead of made in advance, and packed properly so a takeaway burger\n          still tastes like it did in the kitchen.":
      "Вокруг этого мы всё и строим. Короткое меню вместо длинного, готовка под заказ вместо заготовок и правильная упаковка, чтобы бургер с собой был таким же, как на кухне.",
    "View the Menu": "Смотреть меню",
    "Find Us": "Найти нас",
    "Made in<br>Tbilisi": "Сделано<br>в Тбилиси",
    "How we work": "Как мы работаем",
    "The Rules We Cook By": "Правила, по которым мы готовим",
    "Nothing is cooked in advance and held under a lamp. Your burger starts when your order does.":
      "Ничего не готовится заранее и не ждёт под лампой. Ваш бургер начинается вместе с вашим заказом.",
    "Crust<br>First": "Сначала<br>корочка",
    "Hard press, hot surface, no fiddling. The caramelised edge is what separates a smash from a patty.":
      "Сильный пресс, горячая поверхность, никакой суеты. Карамельный край — то, что отличает смэш от обычной котлеты.",
    "A Short<br>Menu": "Короткое<br>меню",
    "Burgers, sliders, sides, sauces and shakes. Fewer things, taken more seriously.":
      "Бургеры, слайдеры, закуски, соусы и шейки. Меньше позиций — больше внимания к каждой.",
    "Built to<br>Travel": "Готово<br>к дороге",
    "Packed to travel, whether you collect it yourself or order through Wolt or Glovo.":
      "Упаковано для дороги — заберёте вы сами или закажете через Wolt или Glovo.",
    "Coffee<br>Too": "И ещё<br>кофе",
    "Coffee, shakes and cold drinks, so the whole order comes from one kitchen.":
      "Кофе, шейки и холодные напитки — весь заказ с одной кухни.",
    "One kitchen at 1 Vashlovani St, Tbilisi 0108, open every day from 12:00 to 02:00.":
      "Одна кухня: ул. Вашловани 1, Тбилиси 0108, открыто каждый день с 12:00 до 02:00.",
    "Come and try it": "Приходите попробовать",
    "Call the kitchen for takeaway and delivery, or find us on Vashlovani Street.":
      "Позвоните на кухню для заказа с собой или доставки, либо найдите нас на улице Вашловани.",

    /* --- contact page --- */
    "Find Us on<br>Vashlovani Street": "Найдите нас<br>на улице Вашловани",
    "Central Tbilisi, open every day from 12:00 to 02:00. Dine in, take away, or order for delivery.":
      "Центр Тбилиси, открыто каждый день с 12:00 до 02:00. Ешьте у нас, забирайте с собой или заказывайте доставку.",
    "Visit us": "Приходите к нам",
    "Delivery &amp; Takeaway": "Доставка и самовывоз",
    "Delivery through Wolt and Glovo, or call for collection.":
      "Доставка через Wolt и Glovo, или позвоните и заберите сами.",
    "Open in Google Maps": "Открыть в Google Картах",
    "Order": "Заказ",
    "Takeaway &amp; Delivery": "Самовывоз и доставка",
    "Call the kitchen for collection, or get it delivered through Wolt or Glovo. Open every day, 12:00–02:00.":
      "Позвоните и заберите сами или закажите доставку через Wolt или Glovo. Открыто каждый день, 12:00–02:00.",
    "Call &amp; Collect": "Позвонить и забрать",
    "Ring your order through and pick it up hot from Vashlovani Street.":
      "Сделайте заказ по телефону и заберите горячим на улице Вашловани.",
    "Wolt": "Wolt",
    "Order for delivery through the Wolt app or website.":
      "Закажите доставку в приложении или на сайте Wolt.",
    "Glovo": "Glovo",
    "Order for delivery through the Glovo app or website.":
      "Закажите доставку в приложении или на сайте Glovo.",
    "Send a message": "Написать нам",
    "Questions or Bookings": "Вопросы или брони",
    "Large orders, feedback or anything else — leave your details and we'll come back to you.":
      "Большие заказы, отзывы или что-то ещё — оставьте контакты, и мы свяжемся с вами.",
    "Name": "Имя",
    "Email": "Эл. почта",
    "Message": "Сообщение",
    "Send Message": "Отправить",
    "We'll only use your details to reply to your message.":
      "Мы используем ваши данные только для ответа на сообщение.",

    /* --- 404 --- */
    "Error 404": "Ошибка 404",
    "This Page<br>Got Smashed": "Эта страница<br>разбилась",
    "We couldn't find that one. The menu is still exactly where you left it.":
      "Мы не нашли эту страницу. Меню осталось ровно там, где было.",
    "Back to Home": "На главную"
  },

  /* ------------------------------------------------------ */
  ka: {

    /* --- page titles (browser tab) --- */
    "Sameo Smash — Smash Burgers in Tbilisi | სამეო სმეშ":
      "Sameo Smash — სმეშ ბურგერები თბილისში | სამეო სმეშ",
    "Menu &amp; Prices — Sameo Smash | Burgers, Sliders &amp; Shakes in Tbilisi":
      "მენიუ და ფასები — Sameo Smash | ბურგერები, სლაიდერები და შეიქები თბილისში",
    "About — Sameo Smash | Smash Burger Kitchen in Tbilisi":
      "ჩვენ შესახებ — Sameo Smash | სმეშ ბურგერების სამზარეულო თბილისში",
    "Location &amp; Contact — Sameo Smash | 1 Vashlovani St, Tbilisi":
      "მისამართი და კონტაქტი — Sameo Smash | ვაშლოვანის ქ. 1, თბილისი",
    "Page Not Found — Sameo Smash":
      "გვერდი ვერ მოიძებნა — Sameo Smash",
    /* --- chrome / navigation --- */
    "Skip to content": "შინაარსზე გადასვლა",
    "Home": "მთავარი",
    "Menu": "მენიუ",
    "About": "ჩვენ შესახებ",
    "Location": "მდებარეობა",
    "Order Now": "შეუკვეთე",
    "Call": "დარეკვა",
    "Directions": "მარშრუტი",
    "Explore": "განყოფილებები",
    "Location &amp; Contact": "მდებარეობა და კონტაქტი",
    "Visit &amp; Order": "მოგვინახულეთ და შეუკვეთეთ",
    "Get directions": "მარშრუტის აგება",
    "Open menu": "მენიუს გახსნა",

    /* --- home: hero --- */
    "Vashlovani St · Tbilisi": "ვაშლოვანის ქუჩა · თბილისი",
    "Smashed hard.": "ვწნეხავთ ძლიერად.",
    "Served fast.": "ვაწვდით სწრაფად.",
    "Smash burgers, sliders, fries and shakes — pressed to order on the\n                flat-top and built for people who take a burger seriously.":
      "სმეშ ბურგერები, სლაიდერები, ფრი და შეიქები — ვამზადებთ შეკვეთისთანავე გახურებულ ზედაპირზე, მათთვის ვინც ბურგერს სერიოზულად უყურებს.",
    "View Menu": "მენიუს ნახვა",
    "Burgers from ₾20": "ბურგერები ₾20-დან",
    "Smashed to order": "შეკვეთისთანავე",
    "12:00 – 02:00": "12:00 – 02:00",
    "Open every day": "ღიაა ყოველდღე",
    "Vashlovani St": "ვაშლოვანის ქუჩა",
    "Tbilisi 0108": "თბილისი 0108",

    /* --- home: marquee --- */
    "Smash Burgers": "სმეშ ბურგერები",
    "Cheeseburgers": "ჩიზბურგერები",
    "Truffle Burgers": "ტრიუფელის ბურგერები",
    "Sliders": "სლაიდერები",
    "Fries": "ფრი",
    "Sauces": "სოუსები",
    "Desserts": "დესერტები",
    "Coffee": "ყავა",
    "Shakes": "შეიქები",
    "Drinks": "სასმელები",

    /* --- home: anatomy --- */
    "Anatomy of the smash": "სმეშის ანატომია",
    "The Press": "წნეხი",
    "Loose beef meets a hot flat-top and gets one hard press. No moulding,\n                   no shaping — that press is where everything starts.":
      "დაფქული საქონლის ხორცი ხვდება გახურებულ ზედაპირს და იღებს ერთ ძლიერ წნეხს. ყალიბის გარეშე — სწორედ ამ წნეხით იწყება ყველაფერი.",
    "The Crust": "ქერქი",
    "Seconds of full contact turn the edges lacy, brown and crisp.\n                   That caramelised crust is the whole reason to smash a burger.":
      "რამდენიმე წამი სრული შეხებისა კიდეებს ხრაშუნა და ოქროსფერს ხდის. სწორედ ამ კარამელიზებული ქერქისთვის იწნეხება ბურგერი.",
    "The Build": "აწყობა",
    "Cheese goes on while it is still moving, then it is stacked and\n                   wrapped to travel — so a takeaway arrives the way it left.":
      "ყველს ვდებთ სანამ ჯერ კიდევ ცხელია, შემდეგ ვაწყობთ და ვახვევთ გზისთვის — რომ წასაღები შეკვეთა ისეთივე მივიდეს, როგორიც გავიდა.",

    /* --- home: line-up --- */
    "The line-up": "ჩვენი შემადგენლობა",
    "What We Smash": "რას ვამზადებთ",
    "Four burgers, all pressed to order on the flat-top.": "ოთხი ბურგერი, ყველა იწნეხება შეკვეთისთანავე.",
    "See the Full Menu": "სრული მენიუ",

    /* --- products --- */
    "Cheeseburger": "ჩიზბურგერი",
    "100% beef, bun, mixed sauce, onion, lettuce, pickles and cheese.":
      "100% საქონლის ხორცი, ბულკი, ფირმული სოუსი, ხახვი, სალათის ფოთოლი, მწნილი და ყველი.",
    "Also available in S / M / L — ask in store": "ასევე ხელმისაწვდომია S / M / L — იკითხეთ ადგილზე",
    "Chili Cheeseburger": "ჩილი ჩიზბურგერი",
    "100% beef, bun, mango-chili sauce, onion, lettuce, jalapeño and cheese.":
      "100% საქონლის ხორცი, ბულკი, მანგო-ჩილის სოუსი, ხახვი, სალათის ფოთოლი, ხალაპენიო და ყველი.",
    "Truffle Burger": "ტრიუფელის ბურგერი",
    "100% beef, bun, truffle sauce, onion and white cheese.":
      "100% საქონლის ხორცი, ბულკი, ტრიუფელის სოუსი, ხახვი და თეთრი ყველი.",
    "Veggie Burger": "ვეგეტარიანული ბურგერი",
    "Falafel, bun, mixed sauce, onion, lettuce, pickles and cheese.":
      "ფალაფელი, ბულკი, ფირმული სოუსი, ხახვი, სალათის ფოთოლი, მწნილი და ყველი.",
    "Classic Slider": "კლასიკური სლაიდერი",
    "Truffle Slider": "ტრიუფელის სლაიდერი",
    "Chili Slider": "ჩილი სლაიდერი",
    "Vanilla Shake": "ვანილის შეიქი",
    "Chocolate Shake": "შოკოლადის შეიქი",
    "Strawberry Shake": "მარწყვის შეიქი",
    "Toast": "ტოსტი",
    "Mango Sauce": "მანგოს სოუსი",
    "Truffle Sauce": "ტრიუფელის სოუსი",
    "Ketchup": "კეტჩუპი",
    "Mustard": "მდოგვი",
    "Chocolate Cookie": "შოკოლადის ნამცხვარი",
    "Vanilla Cookie": "ვანილის ნამცხვარი",
    "Espresso": "ესპრესო",
    "Double Espresso": "ორმაგი ესპრესო",
    "Americano": "ამერიკანო",
    "Cappuccino": "კაპუჩინო",
    "Latte": "ლატე",
    "Iced Coffee": "ცივი ყავა",
    "Iced Latte": "ცივი ლატე",
    "Iced Coffee with Ice Cream": "ცივი ყავა ნაყინით",
    "Soft Drinks": "უალკოჰოლო სასმელები",
    "Water": "წყალი",
    "Coca-Cola": "Coca-Cola",
    "Coca-Cola Zero": "Coca-Cola Zero",
    "Fanta": "Fanta",
    "Sprite": "Sprite",
    "Beer": "ლუდი",
    "Alkhanidze Beer": "ალხანიძის ლუდი",

    /* --- home: about teaser --- */
    "Who we are": "ვინ ვართ",
    "One Thing,<br>Done Properly": "ერთი საქმე,<br>გაკეთებული სწორად",
    "Sameo Smash is a smash burger kitchen in Tbilisi built around a single idea:\n          get the crust right and everything else follows.":
      "Sameo Smash არის სმეშ ბურგერების სამზარეულო თბილისში, აგებული ერთ იდეაზე: სწორად გააკეთე ქერქი და დანარჩენი თავისით მოვა.",
    "No long menu of things we're average at. Burgers, sliders, sides and shakes —\n          smashed to order, handed over hot, ready for takeaway or delivery.":
      "არავითარი გრძელი მენიუ იმისა, რაც საშუალოდ გამოგვდის. ბურგერები, სლაიდერები, გარნირები და შეიქები — შეკვეთისთანავე, ცხელი, წასაღებად ან მიტანით.",
    "More About Us": "მეტი ჩვენს შესახებ",
    "Smashed<br>to Order": "შეკვეთისთანავე<br>მომზადებული",
    "Nothing sits under a lamp waiting for you.": "არაფერი დევს ნათურის ქვეშ თქვენს ლოდინში.",
    "Crisp<br>Edges": "ხრაშუნა<br>კიდეები",
    "Hard press, hot flat-top. That's the whole trick.": "ძლიერი წნეხი, გახურებული ზედაპირი. მთელი საიდუმლო ესაა.",
    "Built for<br>Takeaway": "შექმნილია<br>წასაღებად",
    "Packed to travel without falling apart.": "შეფუთულია ისე, რომ გზაში არ დაიშალოს.",
    "Right Here<br>in Tbilisi": "სწორედ აქ,<br>თბილისში",
    "Find us at 1 Vashlovani St, 0108.": "გვიპოვეთ: ვაშლოვანის ქუჩა 1, 0108.",

    /* --- home: testimonials --- */
    "Testimonials": "შეფასებები",
    "What People Say": "რას ამბობენ სტუმრები",
    "Sample content": "სადემონსტრაციო ტექსტი",
    "Sample": "ნიმუში",
    "Demonstration text, not a real review": "სადემონსტრაციო ტექსტი, არა ნამდვილი შეფასება",

    /* --- home: location --- */
    "Find us": "როგორ გვიპოვოთ",
    "Come and Get It": "მობრძანდით და წაიღეთ",
    "We're on Vashlovani Street in central Tbilisi. Dine in, take away, or order for delivery.":
      "ჩვენ ვართ ვაშლოვანის ქუჩაზე, თბილისის ცენტრში. მიირთვით ადგილზე, წაიღეთ ან შეუკვეთეთ მიტანით.",
    "Address": "მისამართი",
    "1 Vashlovani St, Tbilisi 0108, Georgia": "ვაშლოვანის ქუჩა 1, თბილისი 0108, საქართველო",
    "Phone": "ტელეფონი",
    "Opening Hours": "სამუშაო საათები",
    "Every day, 12:00 – 02:00": "ყოველდღე, 12:00 – 02:00",
    "Delivery": "მიტანა",
    "Available through Wolt and Glovo, or call for takeaway.":
      "ხელმისაწვდომია Wolt-სა და Glovo-ზე, ან დარეკეთ და წაიღეთ თავად.",
    "Call to Order": "დარეკეთ და შეუკვეთეთ",
    "Directions &amp; Contact": "მარშრუტი და კონტაქტი",
    "Hungry?": "მოგშივდათ?",
    "Order Your Smash": "შეუკვეთეთ თქვენი სმეში",
    "Call the kitchen for takeaway, or get it delivered through Wolt or Glovo.":
      "დარეკეთ სამზარეულოში წასაღებად ან შეუკვეთეთ მიტანა Wolt-ით ან Glovo-თი.",
    "Order on Wolt": "შეკვეთა Wolt-ით",
    "Order on Glovo": "შეკვეთა Glovo-თი",

    /* --- footer --- */
    "Smash burgers, sliders and shakes on Vashlovani Street in Tbilisi.\n          Open every day, 12:00–02:00.":
      "სმეშ ბურგერები, სლაიდერები და შეიქები ვაშლოვანის ქუჩაზე, თბილისში. ღიაა ყოველდღე, 12:00–02:00.",
    "1 Vashlovani St<br>Tbilisi 0108, Georgia": "ვაშლოვანის ქუჩა 1<br>თბილისი 0108, საქართველო",
    "Open daily 12:00–02:00": "ყოველდღე 12:00–02:00",
    "© 2026 Sameo Smash": "© 2026 Sameo Smash",
    "1 Vashlovani St, Tbilisi 0108, Georgia": "ვაშლოვანის ქუჩა 1, თბილისი 0108, საქართველო",

    /* --- menu page --- */
    "The Menu": "მენიუ",
    "Burgers, Sliders<br>&amp; Everything Else": "ბურგერები, სლაიდერები<br>და ყველაფერი დანარჩენი",
    "Everything is smashed and built to order. Open every day from\n          12:00 to 02:00 — eat in, take away, or get it delivered.":
      "ყველაფერი მზადდება შეკვეთისთანავე. ღიაა ყოველდღე 12:00-დან 02:00-მდე — ადგილზე, წასაღებად ან მიტანით.",
    "Delivery Options": "მიტანის ვარიანტები",
    "Burgers": "ბურგერები",
    "Sides": "გარნირები",
    "From ₾20": "₾20-დან",
    "From ₾25": "₾25-დან",
    "From ₾6": "₾6-დან",
    "From ₾3": "₾3-დან",
    "All ₾15": "ყველა ₾15",
    "The heart of the menu. Every patty is pressed hard on a hot flat-top so the edges\n        go crisp and caramelised, then stacked and served straight away.":
      "მენიუს გული. ყოველი კოტლეტი ძლიერად იწნეხება გახურებულ ზედაპირზე, რომ კიდეები ხრაშუნა და კარამელიზებული გახდეს, შემდეგ მაშინვე იწყობა და მიეწოდება.",
    "Alongside": "დამატებით",
    "Sides, sweet &amp; drinks": "გარნირები, ტკბილეული და სასმელები",
    "Freshly baked": "ახლად გამომცხვარი",
    "Hot &amp; iced": "ცხელი და ცივი",
    "Local": "ადგილობრივი",
    "Ready when you are": "ჩვენ მზად ვართ",
    "Call the kitchen directly, or order for delivery through Wolt or Glovo.":
      "დარეკეთ პირდაპირ სამზარეულოში ან შეუკვეთეთ მიტანა Wolt-ით ან Glovo-თი.",

    /* --- about page --- */
    "About Us": "ჩვენ შესახებ",
    "— is a smash burger kitchen\n          on Vashlovani Street in Tbilisi.":
      "— სმეშ ბურგერების სამზარეულო ვაშლოვანის ქუჩაზე, თბილისში.",
    "The whole idea sits in the name. A smash burger isn't shaped or moulded — it's\n          pressed hard onto a hot flat-top so the surface caramelises and the edges go\n          crisp and lacy. That crust is the entire point, and it only happens if the\n          burger is cooked the moment you order it.":
      "მთელი იდეა სახელშია. სმეშ ბურგერი ხელით არ ყალიბდება — ის ძლიერად ეწნეხება გახურებულ ზედაპირს, რომ ზედაპირი დაკარამელდეს და კიდეები ხრაშუნა გახდეს. სწორედ ეს ქერქია მთავარი და ის მხოლოდ მაშინ მიიღება, როცა ბურგერი შეკვეთის მომენტში მზადდება.",
    "So that's what we build around. A short menu instead of a long one, made to\n          order instead of made in advance, and packed properly so a takeaway burger\n          still tastes like it did in the kitchen.":
      "სწორედ ამის ირგვლივ ვაშენებთ ყველაფერს. მოკლე მენიუ გრძელის ნაცვლად, შეკვეთისთანავე მომზადება წინასწარის ნაცვლად და სწორი შეფუთვა, რომ წასაღებ ბურგერს იგივე გემო ჰქონდეს, რაც სამზარეულოში.",
    "View the Menu": "მენიუს ნახვა",
    "Find Us": "გვიპოვეთ",
    "Made in<br>Tbilisi": "დამზადებულია<br>თბილისში",
    "How we work": "როგორ ვმუშაობთ",
    "The Rules We Cook By": "წესები, რომლითაც ვამზადებთ",
    "Nothing is cooked in advance and held under a lamp. Your burger starts when your order does.":
      "არაფერი მზადდება წინასწარ და არ ინახება ნათურის ქვეშ. თქვენი ბურგერი იწყება თქვენს შეკვეთასთან ერთად.",
    "Crust<br>First": "ჯერ<br>ქერქი",
    "Hard press, hot surface, no fiddling. The caramelised edge is what separates a smash from a patty.":
      "ძლიერი წნეხი, ცხელი ზედაპირი, ზედმეტი მოძრაობის გარეშე. კარამელიზებული კიდეა ის, რაც სმეშს ჩვეულებრივი კოტლეტისგან განასხვავებს.",
    "A Short<br>Menu": "მოკლე<br>მენიუ",
    "Burgers, sliders, sides, sauces and shakes. Fewer things, taken more seriously.":
      "ბურგერები, სლაიდერები, გარნირები, სოუსები და შეიქები. ნაკლები პოზიცია — მეტი ყურადღება თითოეულზე.",
    "Built to<br>Travel": "შექმნილია<br>გზისთვის",
    "Packed to travel, whether you collect it yourself or order through Wolt or Glovo.":
      "შეფუთულია გზისთვის — თავად წაიღებთ თუ შეუკვეთავთ Wolt-ით ან Glovo-თი.",
    "Coffee<br>Too": "ყავაც<br>აქვეა",
    "Coffee, shakes and cold drinks, so the whole order comes from one kitchen.":
      "ყავა, შეიქები და ცივი სასმელები — მთელი შეკვეთა ერთი სამზარეულოდან.",
    "One kitchen at 1 Vashlovani St, Tbilisi 0108, open every day from 12:00 to 02:00.":
      "ერთი სამზარეულო: ვაშლოვანის ქუჩა 1, თბილისი 0108, ღიაა ყოველდღე 12:00-დან 02:00-მდე.",
    "Come and try it": "მობრძანდით და გასინჯეთ",
    "Call the kitchen for takeaway and delivery, or find us on Vashlovani Street.":
      "დარეკეთ სამზარეულოში წასაღებად ან მიტანისთვის, ან გვიპოვეთ ვაშლოვანის ქუჩაზე.",

    /* --- contact page --- */
    "Find Us on<br>Vashlovani Street": "გვიპოვეთ<br>ვაშლოვანის ქუჩაზე",
    "Central Tbilisi, open every day from 12:00 to 02:00. Dine in, take away, or order for delivery.":
      "თბილისის ცენტრი, ღიაა ყოველდღე 12:00-დან 02:00-მდე. მიირთვით ადგილზე, წაიღეთ ან შეუკვეთეთ მიტანით.",
    "Visit us": "მოგვინახულეთ",
    "Delivery &amp; Takeaway": "მიტანა და წაღება",
    "Delivery through Wolt and Glovo, or call for collection.":
      "მიტანა Wolt-ითა და Glovo-თი, ან დარეკეთ და წაიღეთ თავად.",
    "Open in Google Maps": "გახსენით Google რუკებში",
    "Order": "შეკვეთა",
    "Takeaway &amp; Delivery": "წაღება და მიტანა",
    "Call the kitchen for collection, or get it delivered through Wolt or Glovo. Open every day, 12:00–02:00.":
      "დარეკეთ და წაიღეთ თავად, ან შეუკვეთეთ მიტანა Wolt-ით ან Glovo-თი. ღიაა ყოველდღე, 12:00–02:00.",
    "Call &amp; Collect": "დარეკეთ და წაიღეთ",
    "Ring your order through and pick it up hot from Vashlovani Street.":
      "შეუკვეთეთ ტელეფონით და წაიღეთ ცხელი ვაშლოვანის ქუჩიდან.",
    "Wolt": "Wolt",
    "Order for delivery through the Wolt app or website.":
      "შეუკვეთეთ მიტანა Wolt-ის აპლიკაციით ან ვებგვერდით.",
    "Glovo": "Glovo",
    "Order for delivery through the Glovo app or website.":
      "შეუკვეთეთ მიტანა Glovo-ს აპლიკაციით ან ვებგვერდით.",
    "Send a message": "მოგვწერეთ",
    "Questions or Bookings": "კითხვები ან ჯავშანი",
    "Large orders, feedback or anything else — leave your details and we'll come back to you.":
      "დიდი შეკვეთები, გამოხმაურება ან სხვა რამ — დატოვეთ საკონტაქტო და დაგიკავშირდებით.",
    "Name": "სახელი",
    "Email": "ელ. ფოსტა",
    "Message": "შეტყობინება",
    "Send Message": "გაგზავნა",
    "We'll only use your details to reply to your message.":
      "თქვენს მონაცემებს გამოვიყენებთ მხოლოდ პასუხის გასაცემად.",

    /* --- 404 --- */
    "Error 404": "შეცდომა 404",
    "This Page<br>Got Smashed": "ეს გვერდი<br>გაისრისა",
    "We couldn't find that one. The menu is still exactly where you left it.":
      "ვერ ვიპოვეთ ეს გვერდი. მენიუ იქვეა, სადაც დატოვეთ.",
    "Back to Home": "მთავარზე დაბრუნება"
  }
};
