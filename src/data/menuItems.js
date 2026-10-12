// Image helper — Pexels CDN (verified working)
const px = (id, w = 800, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`

export const heroImage = px(1855214, 1400, 1600)
export const storyImage = px(10828396, 900, 1100)

export const menuItems = [
  // --- Coffee ---
  { id: 'latte',      name: 'Classic Latte',     category: 'coffee', label: 'COFFEE',    description: 'Rich. Smooth. Timeless.',         price: 4.50, image: px(4913342, 600, 750), featured: true },
  { id: 'cappuccino', name: 'Cappuccino',        category: 'coffee', label: 'COFFEE',    description: 'Bold espresso, silky foam.',        price: 4.00, image: px(997670, 600, 750) },
  { id: 'flatwhite',  name: 'Flat White',        category: 'coffee', label: 'COFFEE',    description: 'Velvety microfoam perfection.',     price: 4.25, image: px(4392068, 600, 750) },
  { id: 'espresso',   name: 'Double Espresso',   category: 'coffee', label: 'COFFEE',    description: 'Pure. Intense. Awakening.',        price: 3.00, image: px(302899, 600, 750) },
  { id: 'macchiato',  name: 'Caramel Macchiato', category: 'coffee', label: 'COFFEE',    description: 'Sweet caramel, warm vanilla.',     price: 5.25, image: px(2128026, 600, 750) },
  { id: 'mocha',      name: 'Caffè Mocha',       category: 'coffee', label: 'COFFEE',    description: 'Chocolate meets espresso.',         price: 5.00, image: px(459489, 600, 750) },

  // --- Cold Drinks ---
  { id: 'icedvanilla', name: 'Iced Vanilla',     category: 'cold',   label: 'COLD BREW', description: 'Cool. Creamy. Refreshing.',        price: 5.00, image: px(35229818, 600, 750), featured: true },
  { id: 'coldbrew',    name: 'Cold Brew',        category: 'cold',   label: 'COLD BREW', description: 'Slow-steeped, smooth finish.',     price: 4.75, image: px(9838373, 600, 750) },
  { id: 'icedlatte',   name: 'Iced Latte',       category: 'cold',   label: 'COLD BREW', description: 'Chilled espresso with milk.',     price: 4.50, image: px(12900864, 600, 750) },
  { id: 'nitro',       name: 'Nitro Cold Brew',   category: 'cold',   label: 'COLD BREW', description: 'Creamy cascade, no sugar needed.',  price: 5.50, image: px(12900864, 600, 750) },

  // --- Food ---
  { id: 'avotoast',  name: 'Avocado Toast',      category: 'food',   label: 'ALL DAY',   description: 'Fresh. Wholesome. Delicious.',      price: 8.50, image: px(350346, 600, 750), featured: true },
  { id: 'granola',   name: 'Granola Bowl',       category: 'food',   label: 'ALL DAY',   description: 'Yogurt, berries, honey.',           price: 7.00, image: px(6823306, 600, 750) },
  { id: 'eggbun',    name: 'Egg & Chive Bun',    category: 'food',   label: 'ALL DAY',   description: 'Soft bun, fluffy scrambled eggs.',  price: 6.50, image: px(312418, 600, 750) },
  { id: 'turkeyclub',name: 'Turkey Club',        category: 'food',   label: 'ALL DAY',   description: 'Toasted sourdough, crisp bacon.',   price: 9.00, image: px(3020919, 600, 750) },

  // --- Bakery ---
  { id: 'almond',   name: 'Almond Croissant',    category: 'bakery', label: 'BAKERY',    description: 'Buttery. Flaky. Irresistible.',     price: 4.90, image: px(14565937, 600, 750), featured: true },
  { id: 'painchoc', name: 'Pain au Chocolat',    category: 'bakery', label: 'BAKERY',    description: 'Dark chocolate, buttery layers.',   price: 4.50, image: px(17581159, 600, 750) },
  { id: 'cinnamon', name: 'Cinnamon Roll',       category: 'bakery', label: 'BAKERY',    description: 'Warm, gooey, spiced just right.',    price: 4.25, image: px(33739660, 600, 750) },
  { id: 'bananabread',name:'Banana Bread',       category: 'bakery', label: 'BAKERY',    description: 'Moist, toasted, lightly sweet.',    price: 3.75, image: px(2074130, 600, 750) },
]

export const menuFilters = [
  { key: 'all',    label: 'All' },
  { key: 'coffee', label: 'Coffee' },
  { key: 'cold',   label: 'Cold Drinks' },
  { key: 'food',   label: 'Food' },
  { key: 'bakery', label: 'Bakery' },
]
