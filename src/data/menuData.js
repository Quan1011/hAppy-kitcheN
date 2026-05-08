export const menuNotice = {
  message: 'Kartenzahlung ab 20 € – keine American Express',
  effectiveDate: 'Preisliste gültig ab 08.2025',
  extra:
    '',
}

const extractCodes = codeString => {
  if (!codeString) {
    return { allergens: [], additives: [] }
  }
  const tokens = codeString.toLowerCase().match(/[a-k]|[1-7]/g) ?? []
  const allergens = []
  const additives = []
  tokens.forEach(token => {
    if (/\d/.test(token)) {
      additives.push(token)
    } else {
      allergens.push(token)
    }
  })
  return { allergens, additives }
}

const codes = codeString => {
  const { allergens, additives } = extractCodes(codeString)
  const info = {}
  if (allergens.length) info.allergens = allergens
  if (additives.length) info.additives = additives
  return info
}

const formatPrice = value => `${value.toFixed(2)}€`

// Local section images from src/image instead of remote URLs
// import vorspeisenImage from '../image/3.jpg'
// import hauptgerichteImage from '../image/5.jpg'
// import dessertImage from '../image/6.jpg'
// import extrasImage from '../image/7.jpg'

// const sectionImages = {
//   vorspeisen: vorspeisenImage,
//   chickenWok: hauptgerichteImage,
//   dessert: dessertImage,
//   extras: extrasImage,
// }

const sauceCodeMeta = {
  40: codes('a 4 f'),
  41: codes('g'),
  42: codes('g'),
  43: codes('g'),
  44: codes('a g e'),
  45: codes('a h 4 f'),
  50: codes('a 4 f'),
  51: codes('g'),
  52: codes('g'),
  53: codes('g'),
  54: codes('a g e'),
  55: codes('a h 4 f'),
  60: codes('a 4 f'),
  61: codes('g'),
  62: codes('g'),
  63: codes('g'),
  64: codes('a g e'),
  65: codes('a h 4 f'),
  69: codes(''),
  70: codes('a 4'),
  71: codes('g'),
  72: codes('g'),
  73: codes('g'),
  74: codes('a g e'),
  75: codes('a h 4'),
  79: codes(''),
  80: codes('a 4 f'),
  81: codes('g'),
  82: codes('g'),
  83: codes('g'),
  84: codes('a g e'),
  85: codes('a h 4 f'),
  89: codes(''),
  90: codes('a 4 f'),
  91: codes('g'),
  92: codes('g'),
  93: codes('g'),
  94: codes('a g e'),
  95: codes('a h 4 f'),
  100: codes('a 4 f'),
  101: codes('g'),
  102: codes('g'),
  103: codes('g'),
  104: codes('a g e'),
  105: codes('a h 4 f'),
}

const sauceCatalog = {
  chopSuey: { label: 'Chop Suey Soße' },
  redThai: { label: 'roter Thai Currysoße', tags: ['spicy'] },
  greenThai: { label: 'grüner Thai Currysoße', tags: ['spicy'] },
  mango: { label: 'Mango Soße' },
  peanut: { label: 'Erdnuss Soße' },
  kungPao: { label: 'Kung Pao Soße', tags: ['spicy'] },
  sweetSour: { label: 'Süßsauer Soße' },
}

const sharedSauceKeys = ['chopSuey', 'redThai', 'greenThai', 'mango', 'peanut', 'kungPao']

const buildSauceOptions = ({ codeStart, baseTags = [], extraSauces = [] }) => {
  const baseSet = sharedSauceKeys.map((key, index) => {
    const sauce = sauceCatalog[key]
    const code = String(codeStart + index)
    return {
      code,
      label: sauce.label,
      ...(sauceCodeMeta[code] ?? {}),
    }
  })

  const extras = extraSauces.map(extra => {
    const sauce = sauceCatalog[extra.key]
    return {
      code: extra.code,
      label: sauce.label,
      ...(sauceCodeMeta[extra.code] ?? {}),
    }
  })

  return [...baseSet, ...extras]
}

const tofuSauceOptions = buildSauceOptions({ codeStart: 40, baseTags: ['vegan'] })
const chickenSauceOptions = buildSauceOptions({ codeStart: 50 })
const breadedChickenOptions = buildSauceOptions({
  codeStart: 60,
  extraSauces: [{ key: 'sweetSour', code: '69' }],
})
const crispyChickenOptions = buildSauceOptions({
  codeStart: 70,
  extraSauces: [{ key: 'sweetSour', code: '79' }],
})
const duckSauceOptions = buildSauceOptions({
  codeStart: 80,
  extraSauces: [{ key: 'sweetSour', code: '89' }],
})
const beefSauceOptions = buildSauceOptions({ codeStart: 90 })
const shrimpSauceOptions = buildSauceOptions({ codeStart: 100 })

const noodleBowlOptions = [
  {
    code: '110',
    label: 'mit gebr. Tofu, Gemüse, Lemongras und Knoblauch',
    price: '14.50€',
    tags: ['spicy'],
    ...codes('f 4'),
  },
  { code: '111', label: 'mit knusprigen Frühlingsrollen', price: '15.50€', ...codes('a c 4') },
  {
    code: '112',
    label: 'mit Rindfleisch, Gemüse, Lemongras und Knoblauch',
    price: '15.50€',
    tags: ['spicy'],
    ...codes('4'),
  },
]

const friedNoodleOptions = [
  { code: '120', label: 'mit Gemüsen', price: '9.50€', tags: ['vegan'] },
  { code: '121', label: 'mit Hühnerfleisch', price: '11.00€' },
  { code: '122', label: 'mit paniertem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '123', label: 'mit knusprigem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '124', label: 'mit Rindfleisch', price: '14.50€' },
  { code: '125', label: 'mit knuspriger Ente', price: '15.50€', ...codes('a 4') },
  { code: '126', label: 'mit Garnelen', price: '16.00€', ...codes('k') },
  { code: '127', label: 'Bami Goreng mit Hühner-, Rindfleisch und Curry', price: '14.50€', tags: ['spicy'] },
]

const friedRiceOptions = [
  { code: '130', label: 'mit Gemüsen', price: '9.50€', tags: ['vegan'], ...codes('a') },
  { code: '131', label: 'mit Hühnerfleisch', price: '11.00€', ...codes('a') },
  { code: '132', label: 'mit paniertem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '133', label: 'mit knusprigem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '134', label: 'mit Rindfleisch', price: '14.50€', ...codes('a') },
  { code: '135', label: 'mit knuspriger Ente', price: '15.50€', ...codes('a 4') },
  { code: '136', label: 'mit Garnelen', price: '16.00€', ...codes('a k') },
  { code: '137', label: 'Nasi Goreng mit Hühner-, Rindfleisch und Curry', price: '14.50€' },
]

const udonCurryOptions = [
  { code: '140', label: 'mit Gemüsen', price: '11.00€', tags: ['vegan'] },
  { code: '141', label: 'mit Tofu', price: '12.00€', tags: ['vegan'], ...codes('f') },
  { code: '142', label: 'mit Hühnerfleisch', price: '13.00€' },
  { code: '143', label: 'mit paniertem Hühnerfleisch', price: '15.50€', ...codes('a 4') },
  { code: '144', label: 'mit knusprigem Hühnerfleisch', price: '15.50€', ...codes('a 4') },
  { code: '145', label: 'mit Rindfleisch', price: '15.50€' },
  { code: '146', label: 'mit knuspriger Ente', price: '16.50€', ...codes('a 4') },
  { code: '147', label: 'mit Garnelen', price: '17.00€', ...codes('k') },
]

const udonFriedOptions = [
  { code: '150', label: 'mit Gemüsen', price: '10.50€', tags: ['vegan'] },
  { code: '151', label: 'mit Hühnerfleisch', price: '12.00€' },
  { code: '152', label: 'mit paniertem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '153', label: 'mit knusprigem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '154', label: 'mit Rindfleisch', price: '14.50€' },
  { code: '155', label: 'mit knuspriger Ente', price: '15.50€', ...codes('a 4') },
  { code: '156', label: 'mit Garnelen', price: '16.00€', ...codes('k') },
]

const riceNoodleOptions = [
  { code: '160', label: 'mit Gemüsen', price: '10.50€', tags: ['vegan'] },
  { code: '161', label: 'mit Hühnerfleisch', price: '12.00€' },
  { code: '162', label: 'mit paniertem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '163', label: 'mit knusprigem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '164', label: 'mit Rindfleisch', price: '14.50€' },
  { code: '165', label: 'mit knuspriger Ente', price: '15.50€', ...codes('a 4') },
  { code: '166', label: 'mit Garnelen', price: '16.00€', ...codes('k') },
]

const curryRiceNoodleOptions = [
  { code: '170', label: 'mit Gemüsen', price: '10.50€', tags: ['vegan', 'spicy'] },
  { code: '171', label: 'mit Hühnerfleisch', price: '12.00€', tags: ['spicy'] },
  { code: '172', label: 'mit paniertem Hühnerfleisch', price: '14.50€', tags: ['spicy'], ...codes('a 4') },
  { code: '173', label: 'mit knusprigem Hühnerfleisch', price: '14.50€', tags: ['spicy'], ...codes('a 4') },
  { code: '174', label: 'mit Rindfleisch', price: '14.50€', tags: ['spicy'] },
  { code: '175', label: 'mit knuspriger Ente', price: '15.50€', tags: ['spicy'], ...codes('a 4') },
  { code: '176', label: 'mit Garnelen', price: '16.00€', tags: ['spicy'], ...codes('k') },
]

export const menuSections = [
  {
    id: 'vorspeise',
    title: 'Vorspeise',
    description: '',
    // image: sectionImages.vorspeisen,
    items: [
      {
        code: '01',
        name: 'Gemüse Suppe',
        description: 'mit versch. Gemüse',
        price: '4.50€',
        tags: ['vegan'],
        ...codes('4'),
      },
      {
        code: '02',
        name: 'Tofu Suppe',
        description: 'mit Kokosmilch, versch. Gemüse',
        price: '5.50€',
        tags: ['vegan'],
        ...codes('f g'),
      },
      {
        code: '03',
        name: 'Garnelen Suppe',
        description: 'mit versch. Gemüse',
        price: '6.00€',
        ...codes('4'),
      },
      {
        code: '04',
        name: 'Lachs Suppe',
        description: 'mit versch. Gemüse',
        price: '6.00€',
        ...codes('d 4'),
      },
      {
        code: '05',
        name: 'Ramen Nudelsuppe',
        description: 'mit Hühnerfleisch und versch. Gemüse',
        price: '5.50€',
        ...codes('a 4'),
      },
      {
        code: '06',
        name: 'Kokosmilchsuppe',
        description: 'mit Gyoza und versch. Gemüse',
        price: '6.00€',
        ...codes('a g'),
      },
      {
        code: '07',
        name: 'Peking Suppe',
        description: 'Sauer-Scharf-Suppe mit Hühnerfleisch, Gemüse u. Ei',
        price: '5.50€',
        tags: ['spicy'],
        ...codes('c 4'),
      },
      {
        code: '11',
        name: 'Avocado Salat',
        description: 'mit gemischtem Salat und hausgemachte Soße',
        price: '8.50€',
        tags: ['vegan'],
        ...codes('a i'),
      },
      {
        code: '12',
        name: 'Mango Salat',
        description: 'mit gemischtem Salat, Hühnerfleisch, Erdnuss, Kräuter, und mit hausgem. Soße',
        price: '9.50€',
        ...codes('a e'),
      },
      {
        code: '13',
        name: 'Lachs Salat',
        description: 'Gemischte Salat mit frittierte Lachs und Teriyaki Soße',
        price: '15.00€',
        ...codes('a d i'),
      },
      {
        code: '20',
        name: 'Edamame',
        description: 'japanische Bohnen',
        price: '5.50€',
        tags: ['vegan'],
        ...codes('f'),
      },
      {
        code: '21',
        name: 'Sommerrollen mit Tofu (2Stk.)',
        description: 'gefüllt mit Koriander, Salat, Reisnudeln umhüllt mit Reispapier, und Fischsoße',
        price: '6.00€',
        ...codes('d f i'),
      },
      {
        code: '22',
        name: 'Sommerrollen mit Garnelen und Hühnerfleisch (2Stk.)',
        description: 'gefüllt mit Koriander, Salat, Reisnudeln umhüllt mit Reispapier, und Fischsoße',
        price: '6.50€',
        ...codes('d i k'),
      },
      {
        code: '23',
        name: 'Knusprige Frühlingsrollen (2Stk.)',
        description: 'gefüllt mit Hühnerfleisch, Glasnudeln und versch. Gemüse',
        price: '6.50€',
        ...codes('a c d 4'),
      },
      {
        code: '24',
        name: 'Veg. Mini-Frühlingsrolle (8Stk.)',
        description: '',
        price: '4.50€',
        tags: ['vegan'],
        ...codes('a 4'),
      },
      {
        code: '25',
        name: 'Gyoza (5Stk.)',
        description: 'japanische Teigtaschen mit Hühnerfleisch und Gemüse',
        price: '6.00€',
        ...codes('a f'),
      },
      // {
      //   code: '26',
      //   name: 'Yakitori (3Stk.)',
      //   description: 'japanische Hähnchenspieße',
      //   price: '6.00€',
      //   ...codes('a i'),
      // },
      {
        code: '27',
        name: 'Gebackene Garnelen (3Stk.)',
        description: '',
        price: '6.50€',
        ...codes('a k 3'),
      },
      {
        code: '28',
        name: 'Keiko (5Stk.)',
        description: 'Gedämpfte Teigtaschen mit Garnelenfüllung',
        price: '6.00€',
        ...codes('f i k'),
      },
    ],
  },
  {
    id: 'hauptgerichte',
    title: 'Hauptgerichte',
    description: '',
    // image: sectionImages.chickenWok,
    items: [
      {
        code: '40-45',
        name: 'Tofu mit buntem Gemüse im Wok gebraten (mit Reis)',
        description: '',
        price: '11.00€',
        tags: ['vegan'],
        variations: tofuSauceOptions,
        ...codes('f i'),
      },
      {
        code: '50-55',
        name: 'Hühnerfleisch mit buntem Gemüse im Wok gebraten (mit Reis)',
        description: '',
        price: '12.00€',
        variations: chickenSauceOptions,
        ...codes('i'),
      },
      {
        code: '60-69',
        name: 'Hühnerbrust paniert mit buntem Gemüse im Wok gebraten (mit Reis)',
        description: '',
        price: '14.50€',
        variations: breadedChickenOptions,
        ...codes('a i 4'),
      },
      {
        code: '70-79',
        name: 'Knusprige Hühnerfleisch mit buntem Gemüse im Wok gebraten (mit Reis)',
        description: '',
        price: '14.50€',
        variations: crispyChickenOptions,
        ...codes('a i 4'),
      },
      {
        code: '80-89',
        name: 'Knusprige Ente mit buntem Gemüse im Wok gebraten (mit Reis)',
        description: '',
        price: '15.50€',
        variations: duckSauceOptions,
        ...codes('a i 4'),
      },
      {
        code: '90-95',
        name: 'Rindfleisch mit buntem Gemüse im Wok gebraten (mit Reis)',
        description: '',
        price: '14.50€',
        variations: beefSauceOptions,
        ...codes('i'),
      },
      {
        code: '100-105',
        name: 'Garnelen mit buntem Gemüse im Wok gebraten (mit Reis)',
        description: '',
        price: '16.00€',
        variations: shrimpSauceOptions,
        ...codes('i k'),
      },
      {
        code: '110-112',
        name: 'Reisnudeln mit gemischtem Salat, Nüssen, Kräutern und Fischsoße',
        description: '',
        // price: 'ab 14.50€',
        variations: noodleBowlOptions,
        ...codes('d e i'),
      },
      {
        code: '120-127',
        name: 'Gebratene Nudeln mit buntem Gemüse und Ei',
        description: '',
        // price: 'ab 9.50€',
        variations: friedNoodleOptions,
        ...codes('a c i 4 f'),
      },
      {
        code: '130-137 f',
        name: 'Gebratener Reis mit buntem Gemüse und Ei',
        description: '',
        // price: 'ab 9.50€',
        variations: friedRiceOptions,
        ...codes('c i 4'),
      },
      {
        code: '140-147',
        name: 'Udon Nudeln mit buntem Gemüse in Currysoße',
        description: '',
        // price: 'ab 11.00€',
        variations: udonCurryOptions,
        tags: ['spicy'],
        ...codes('a g i'),
      },
      {
        code: '150-156',
        name: 'Udon Nudeln gebraten mit buntem Gemüse und Ei',
        description: '',
        // price: 'ab 10.50€',
        variations: udonFriedOptions,
        ...codes('a c i 4 f'),
      },
      {
        code: '160-166',
        name: 'Reisbandnudeln gebraten mit buntem Gemüse und Ei',
        description: '',
        // price: 'ab 10.50€',
        variations: riceNoodleOptions,
        ...codes('a c e i 4 f'),
      },
      {
        code: '170-176',
        name: 'Gebratene Reisnudeln mit Currypaste, buntem Gemüse und Ei',
        description: '',
        // price: 'ab 10.50€',
        variations: curryRiceNoodleOptions,
        tags: ['spicy'],
        ...codes('c i 4 f'),
      },
      {
        code: '180',
        name: 'Pho mit Tofu',
        description: '',
        price: '16.50€',
        tags: ['vegan'],
        ...codes('f'),
      },
      { code: '181', name: 'Pho mit Hühnerfleisch', description: '', price: '17.50€', ...codes('d 4') },
      { code: '182', name: 'Pho mit Rindfleisch', description: '', price: '18.50€', ...codes('d 4') },
    ],
  },
  {
    id: 'dessert',
    title: 'Dessert',
    description: '',
    // image: sectionImages.dessert,
    items: [
      {
        code: '1000',
        name: 'Gebackene Banane',
        description: 'mit Honig',
        price: '4.50€',
        ...codes('a i'),
      },
      {
        code: '1001',
        name: 'Knuspriger Sesam Bällchen (4Stk.)',
        description: 'mit Nüssen und Bohnen)',
        price: '4.50€',
        ...codes('a i'),
      },
      {
        code: '1002',
        name: 'Mochi Eis (2Stk.)',
        description: '',
        price: '5.50€',
        ...codes('g'),
      },
    ],
  },
  {
    id: 'extras',
    title: 'Extras',
    description: '',
    // image: sectionImages.extras,
    items: [
      {
        code: 'EX',
        name: 'Extras',
        description: '',
        extrasList: [
          { label: 'Reis', price: '2.50€' },
          { label: 'Gebrat. Reis/Nudel', description: 'statt Reis als Beilage zu den Gerichten Nr. 40 bis Nr. 105', price: '4.00€', ...codes('a c i 4') },
          { label: 'Sweet Chili Soße', price: '2.00€' },
          { label: 'Teriyaki Soße', price: '2.00€' },
          { label: 'Chop Suey/Kung Pao Soße', price: '3.00€', ...codes('a 4') },
          { label: 'Curry Soße', price: '3.00€', ...codes('g') },
          { label: 'Mango Soße', price: '3.00€', ...codes('g') },
          { label: 'Erdnuss Soße', price: '3.00€', ...codes('a g e') },
        ],
      },
    ],
  },
]

export const allergenLegend = {
  a: 'mit Gluten / Weizen Typ 405 ',
  b: 'mit Weichtieren',
  c: 'mit Eiern',
  d: 'mit Fisch',
  e: 'mit Erdnuss',
  f: 'mit Sojabohnen',
  g: 'mit Milch',
  h: 'mit Cashew',
  i: 'mit Sesam',
  k: 'mit Krebstieren',
}

export const additiveLegend = {
  1: 'mit Farbstoffen',
  2: 'mit Konservierungsstoffen',
  3: 'mit Antioxidationsmittel',
  4: 'mit Geschmacksverstärker',
  5: 'mit Süßungsmittel',
  6: 'mit Phenylalaninquelle',
  7: 'mit Coffein',
}

