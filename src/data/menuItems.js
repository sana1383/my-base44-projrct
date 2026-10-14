// Image helper — Pexels CDN (verified working)
const px = (id, w = 800, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`

export const heroImage = px(1855214, 1400, 1600)
export const storyImage = px(10828396, 900, 1100)

// ids, categories, prices, images and `featured` flags are the data contract —
// only the display strings (name / label / description) are localized.
export const menuItems = [
  // --- Coffee ---
  { id: 'latte',      name: 'لاته کلاسیک',      category: 'coffee', label: 'قهوه',              description: 'نرم، خوش‌طعم و ماندگار.',        price: 4.50, image: px(4913342, 600, 750), featured: true },
  { id: 'cappuccino', name: 'کاپوچینو',         category: 'coffee', label: 'قهوه',              description: 'اسپرسوی پررنگ با فوم مخملی.',    price: 4.00, image: px(997670, 600, 750) },
  { id: 'flatwhite',  name: 'فلت وایت',         category: 'coffee', label: 'قهوه',              description: 'میکروفوم مخملی و بی‌نقص.',      price: 4.25, image: px(4392068, 600, 750) },
  { id: 'espresso',   name: 'دو اسپرسو',        category: 'coffee', label: 'قهوه',              description: 'خالص، غلیظ و بیدارکننده.',      price: 3.00, image: px(302899, 600, 750) },
  { id: 'macchiato',  name: 'کارامل ماکیاتو',   category: 'coffee', label: 'قهوه',              description: 'کارامل شیرین با وانیل گرم.',    price: 5.25, image: px(2128026, 600, 750) },
  { id: 'mocha',      name: 'کافه موکا',        category: 'coffee', label: 'قهوه',              description: 'شکلات و اسپرسو، در یک فنجان.',  price: 5.00, image: px(459489, 600, 750) },

  // --- Cold Drinks ---
  { id: 'icedvanilla', name: 'آیس وانیل',       category: 'cold',   label: 'قهوه سرد',          description: 'خنک، خامه‌ای و دل‌نشین.',       price: 5.00, image: px(35229818, 600, 750), featured: true },
  { id: 'coldbrew',    name: 'کلد برو',         category: 'cold',   label: 'قهوه سرد',          description: 'دم‌آوری آرام با پایانی نرم.',   price: 4.75, image: px(9838373, 600, 750) },
  { id: 'icedlatte',   name: 'آیس لاته',        category: 'cold',   label: 'قهوه سرد',          description: 'اسپرسوی خنک با شیر.',           price: 4.50, image: px(12900864, 600, 750) },
  { id: 'nitro',       name: 'نایترو کلد برو',  category: 'cold',   label: 'قهوه سرد',          description: 'مخملی و بی‌نیاز به شکر.',       price: 5.50, image: px(12900864, 600, 750) },

  // --- Food ---
  { id: 'avotoast',  name: 'تست آووکادو',      category: 'food',   label: 'صبحانه و میان‌وعده', description: 'تازه، مقوی و خوش‌طعم.',        price: 8.50, image: px(350346, 600, 750), featured: true },
  { id: 'granola',   name: 'کاسه گرانولا',     category: 'food',   label: 'صبحانه و میان‌وعده', description: 'ماست، توت و عسل.',             price: 7.00, image: px(6823306, 600, 750) },
  { id: 'eggbun',    name: 'نان و تخم‌مرغ',    category: 'food',   label: 'صبحانه و میان‌وعده', description: 'نان نرم با تخم‌مرغ هم‌زده.',    price: 6.50, image: px(312418, 600, 750) },
  { id: 'turkeyclub',name: 'باشگاه ترکی',      category: 'food',   label: 'صبحانه و میان‌وعده', description: 'نان تست با بیکن ترد.',         price: 9.00, image: px(3020919, 600, 750) },

  // --- Bakery ---
  { id: 'almond',   name: 'کروسان بادامی',     category: 'bakery', label: 'نانوایی',           description: 'کره‌ای، ترد و وسوسه‌انگیز.',    price: 4.90, image: px(14565937, 600, 750), featured: true },
  { id: 'painchoc', name: 'پن اُ شوکولا',      category: 'bakery', label: 'نانوایی',           description: 'شکلات تلخ در لایه‌های کره‌ای.', price: 4.50, image: px(17581159, 600, 750) },
  { id: 'cinnamon', name: 'رول دارچین',        category: 'bakery', label: 'نانوایی',           description: 'گرم، لطیف و به‌اندازه دارچینی.', price: 4.25, image: px(33739660, 600, 750) },
  { id: 'bananabread',name:'نان موز',          category: 'bakery', label: 'نانوایی',           description: 'مرطوب، تست‌شده و کمی شیرین.',  price: 3.75, image: px(2074130, 600, 750) },
]

export const menuFilters = [
  { key: 'all',    label: 'همه' },
  { key: 'coffee', label: 'قهوه' },
  { key: 'cold',   label: 'نوشیدنی سرد' },
  { key: 'food',   label: 'غذا' },
  { key: 'bakery', label: 'نانوایی' },
]
