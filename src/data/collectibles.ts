import { CollectibleItem } from '../types';

export const COLLECTIBLES: CollectibleItem[] = [
  // Accessories
  {
    id: 'accessory_cat_ears',
    name: 'Strawberry Cat Ears',
    category: 'accessory',
    costBeans: 25,
    description: 'Fluffy pastel cat headband with mini strawberry embroidery.',
    icon: '🐱',
  },
  {
    id: 'accessory_glasses',
    name: 'Rose Gold Wire Glasses',
    category: 'accessory',
    costBeans: 15,
    description: 'Chic rounded frames that give your avatar an earnest bookish glow.',
    icon: '👓',
  },
  {
    id: 'accessory_headphones',
    name: 'Pastel Lavender Headset',
    category: 'accessory',
    costBeans: 30,
    description: 'Over-ear cozy headphones tuned straight to lofi cafe beats.',
    icon: '🎧',
  },
  {
    id: 'accessory_ribbon',
    name: 'Silk Berry Ribbon Bow',
    category: 'accessory',
    costBeans: 20,
    description: 'A hand-tied satin ribbon for neat hair styling.',
    icon: '🎀',
  },

  // Outfits
  {
    id: 'outfit_cardigan',
    name: 'Chunky Knit Oatmeal Cardigan',
    category: 'outfit',
    costBeans: 40,
    description: 'An oversized, warm cardigan with tortoiseshell buttons.',
    icon: '🧥',
  },
  {
    id: 'outfit_barista_apron',
    name: 'Pastel Barista Linen Apron',
    category: 'outfit',
    costBeans: 50,
    description: 'Cafe staff certified apron with pockets for pencils and drink cards.',
    icon: '🎽',
  },
  {
    id: 'outfit_blazer',
    name: 'Academy Pastel Blazer',
    category: 'outfit',
    costBeans: 60,
    description: 'Crisp preppy blazer with neat lapels and gold pin.',
    icon: '👔',
  },

  // Desk Decor
  {
    id: 'desk_chibi_bear',
    name: 'Mini Chibi Brown Bear Plush',
    category: 'desk_item',
    costBeans: 35,
    description: 'Sits quietly beside your laptop to cheer you on through deep study.',
    icon: '🧸',
  },
  {
    id: 'desk_succulent_pot',
    name: 'Ceramic Bonsai Fern',
    category: 'desk_item',
    costBeans: 25,
    description: 'A miniature clay pot with a dewy green succulent.',
    icon: '🪴',
  },
  {
    id: 'desk_mushroom_lamp',
    name: 'Glowing Mushroom Desk Lamp',
    category: 'desk_item',
    costBeans: 45,
    description: 'Soft warm LED mushroom light that illuminates your notebooks.',
    icon: '🍄',
  },

  // Special Cups
  {
    id: 'cup_strawberry_ceramic',
    name: 'Artisan Strawberry Mug',
    category: 'special_cup',
    costBeans: 30,
    description: 'Hand-thrown Korean ceramic mug with strawberry speckle glaze.',
    icon: '🍓',
  },
  {
    id: 'cup_moon_tumbler',
    name: 'Nocturne Glass Tumbler',
    category: 'special_cup',
    costBeans: 35,
    description: 'Double-walled glass tumbler etched with golden constellations.',
    icon: '🌙',
  },
];
