export const menuNotice = {
  message: 'Kartenzahlung ab 20 € – keine American Express',
  effectiveDate: 'Preisliste gültig ab 08.2025',
  extra:
    'Alle Preise verstehen sich in Euro und beinhalten Reis, wo nicht anders angegeben.',
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

const sectionImages = {
  vorspeisen: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
  smallBites: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
  tofuWok: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
  chickenWok: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
  duckBeefShrimp: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80',
  bunBowls: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80',
  friedNoodles: 'https://images.unsplash.com/photo-1612874472278-5cede24d8686?auto=format&fit=crop&w=900&q=80',
  friedRice: 'https://images.unsplash.com/photo-1612874472073-f1b5815f3b1d?auto=format&fit=crop&w=900&q=80',
  udonCurry: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80',
  udonFried: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
  riceNoodles: 'https://images.unsplash.com/photo-1608039829574-6eef31002850?auto=format&fit=crop&w=900&q=80',
  pho: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
  dessert: 'https://images.unsplash.com/photo-1505253668822-42074d58a7f9?auto=format&fit=crop&w=900&q=80',
  extras: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=900&q=80',
}

const sauceCodeMeta = {
  40: codes('a 4'),
  41: codes('g'),
  42: codes('g'),
  43: codes('g'),
  44: codes('a g e'),
  45: codes('a h 4'),
  50: codes('a 4'),
  51: codes('g'),
  52: codes('g'),
  53: codes('g'),
  54: codes('a g e'),
  55: codes('a h 4'),
  60: codes('a 4'),
  61: codes('g'),
  62: codes('g'),
  63: codes('g'),
  64: codes('a g e'),
  65: codes('a h 4'),
  69: codes(''),
  70: codes('a 4'),
  71: codes('g'),
  72: codes('g'),
  73: codes('g'),
  74: codes('a g e'),
  75: codes('a h 4'),
  79: codes(''),
  80: codes('a 4'),
  81: codes('g'),
  82: codes('g'),
  83: codes('g'),
  84: codes('a g e'),
  85: codes('a h 4'),
  89: codes(''),
  90: codes('a 4'),
  91: codes('g'),
  92: codes('g'),
  93: codes('g'),
  94: codes('a g e'),
  95: codes('a h 4'),
  100: codes('a 4'),
  101: codes('g'),
  102: codes('g'),
  103: codes('g'),
  104: codes('a g e'),
  105: codes('a h 4'),
}

const sauceCatalog = {
  chopSuey: { label: 'Chop Suey Soße' },
  redThai: { label: 'Rote Thai Currysoße', tags: ['spicy'] },
  greenThai: { label: 'Grüne Thai Currysoße', tags: ['spicy'] },
  mango: { label: 'Mango Soße' },
  peanut: { label: 'Erdnuss Soße' },
  kungPao: { label: 'Kung Pao Soße', tags: ['spicy'] },
  sweetSour: { label: 'Süß-Sauer Soße' },
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
    label: 'mit gebr. Tofu, Gemüse, Lemongras & Knoblauch',
    price: '14.50€',
    tags: ['spicy', 'vegan'],
    ...codes('f 4'),
  },
  { code: '111', label: 'Knusprige Frühlingsrollen', price: '15.50€', ...codes('a c 4') },
  {
    code: '112',
    label: 'Rindfleisch, Gemüse, Lemongras & Knoblauch',
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
  { code: '127', label: 'Bami Goreng mit Huhn & Rind im Curry', price: '14.50€', tags: ['spicy'] },
]

const friedRiceOptions = [
  { code: '130', label: 'mit Gemüsen', price: '9.50€', tags: ['vegan'], ...codes('a') },
  { code: '131', label: 'mit Hühnerfleisch', price: '11.00€', ...codes('a') },
  { code: '132', label: 'mit paniertem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '133', label: 'mit knusprigem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '134', label: 'mit Rindfleisch', price: '14.50€', ...codes('a') },
  { code: '135', label: 'mit knuspriger Ente', price: '15.50€', ...codes('a 4') },
  { code: '137', label: 'Nasi Goreng mit Huhn & Rind im Curry', price: '14.50€', tags: ['spicy'] },
]

const udonCurryOptions = [
  { code: '140', label: 'mit Gemüsen', price: '11.00€', tags: ['vegan'] },
  { code: '141', label: 'mit Tofu', price: '12.00€', tags: ['vegan'], ...codes('f') },
  { code: '142', label: 'mit Hühnerfleisch', price: '13.00€' },
  { code: '143', label: 'mit paniertem Hühnerfleisch', price: '15.50€', ...codes('a 4') },
  { code: '144', label: 'mit knusprigem Hühnerfleisch', price: '15.50€', ...codes('a 4') },
  { code: '145', label: 'mit Rindfleisch', price: '15.50€' },
  { code: '146', label: 'mit knuspriger Ente', price: '16.50€', ...codes('a 4') },
]

const udonFriedOptions = [
  { code: '150', label: 'mit Gemüsen', price: '10.50€', tags: ['vegan'] },
  { code: '151', label: 'mit Hühnerfleisch', price: '12.00€' },
  { code: '152', label: 'mit paniertem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '153', label: 'mit knusprigem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '154', label: 'mit Rindfleisch', price: '14.50€' },
  { code: '155', label: 'mit knuspriger Ente', price: '15.50€', ...codes('a 4') },
]

const riceNoodleOptions = [
  { code: '160', label: 'mit Gemüsen', price: '10.50€', tags: ['vegan'] },
  { code: '161', label: 'mit Hühnerfleisch', price: '12.00€' },
  { code: '162', label: 'mit paniertem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '163', label: 'mit knusprigem Hühnerfleisch', price: '14.50€', ...codes('a 4') },
  { code: '164', label: 'mit Rindfleisch', price: '14.50€' },
  { code: '165', label: 'mit knuspriger Ente', price: '15.50€', ...codes('a 4') },
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
    description: 'Suppen, Salate und kleine Snacks – perfekt zum Start.',
    image: sectionImages.vorspeisen,
    items: [
      {
        code: '01',
        name: 'Gemüse Suppe',
        description: 'Klare Gemüsebrühe mit saisonalem Gemüse',
        price: '4.50€',
        tags: ['vegan'],
        ...codes('4'),
      },
      {
        code: '02',
        name: 'Tofu Suppe mit Kokosmilch',
        description: 'Cremige Kokosbasis, Tofu und buntes Gemüse',
        price: '5.50€',
        tags: ['vegan'],
        ...codes('f g'),
      },
      {
        code: '03',
        name: 'Garnelen Suppe',
        description: 'Aromatische Brühe mit Garnelen und Gemüse',
        price: '6.00€',
        ...codes('4'),
      },
      {
        code: '04',
        name: 'Lachs Suppe',
        description: 'Mild geräucherter Lachs mit frischem Gemüse',
        price: '6.00€',
        ...codes('d 4'),
      },
      {
        code: '05',
        name: 'Ramen Nudelsuppe',
        description: 'Hühnerfleisch, Eiernudeln und Gemüse in würziger Brühe',
        price: '5.50€',
        ...codes('a 4'),
      },
      {
        code: '06',
        name: 'Kokosmilchsuppe mit Gyoza',
        description: 'Seidige Kokosbrühe mit Gyoza und Gemüse',
        price: '6.00€',
        ...codes('a g'),
      },
      {
        code: '07',
        name: 'Peking Suppe',
        description: 'Sauer-scharfe Suppe mit Huhn, Gemüse und Ei',
        price: '5.50€',
        tags: ['spicy'],
        ...codes('c 4'),
      },
      {
        code: '11',
        name: 'Avocado Salat',
        description: 'Gemischter Salat mit Avocado und hausgemachter Soße',
        price: '8.50€',
        tags: ['vegan'],
        ...codes('a i'),
      },
      {
        code: '12',
        name: 'Mango Salat',
        description: 'Frischer Mangosalat mit Huhn, Kräutern und Erdnüssen',
        price: '9.50€',
        ...codes('a e'),
      },
      {
        code: '13',
        name: 'Lachs Salat',
        description: 'Gemischter Salat mit knusprigem Lachs & Teriyaki',
        price: '15.00€',
        ...codes('a d i'),
      },
      {
        code: '20',
        name: 'Edamame',
        description: 'Japanische Bohnen mit Meersalz',
        price: '5.50€',
        tags: ['vegan'],
        ...codes('f'),
      },
      {
        code: '21',
        name: 'Sommerrollen mit Tofu (2 Stk.)',
        description: 'Reispapierrollen mit Tofu, Kräutern & Fischsoße',
        price: '6.00€',
        ...codes('d f i'),
      },
      {
        code: '22',
        name: 'Sommerrollen mit Garnelen & Huhn (2 Stk.)',
        description: 'Kombination aus Garnelen, Hühnerfleisch und Kräutern',
        price: '6.50€',
        ...codes('d i k'),
      },
      {
        code: '23',
        name: 'Knusprige Frühlingsrollen (2 Stk.)',
        description: 'Gefüllt mit Huhn, Glasnudeln und Gemüse',
        price: '6.50€',
        ...codes('a c d 4'),
      },
      {
        code: '24',
        name: 'Vegane Mini-Frühlingsrollen (8 Stk.)',
        description: 'Knusprige Rollen mit Gemüsefüllung',
        price: '4.50€',
        tags: ['vegan'],
        ...codes('a 4'),
      },
      {
        code: '25',
        name: 'Gyoza (5 Stk.)',
        description: 'Japanische Teigtaschen mit Huhn und Gemüse',
        price: '6.00€',
        ...codes('a f'),
      },
      {
        code: '26',
        name: 'Yakitori (3 Stk.)',
        description: 'Japanische Hähnchenspieße mit Teriyaki',
        price: '6.00€',
        ...codes('a i'),
      },
      {
        code: '27',
        name: 'Gebackene Garnelen (3 Stk.)',
        description: 'Knusprig frittiert mit Dip',
        price: '6.50€',
        ...codes('a k 3'),
      },
      {
        code: '28',
        name: 'Keiko (5 Stk.)',
        description: 'Gedämpfte Teigtaschen mit Garnelenfüllung',
        price: '6.00€',
        ...codes('f i k'),
      },
    ],
  },
  {
    id: 'hauptgerichte',
    title: 'Hauptgerichte',
    description: 'Wok-Klassiker, Nudelgerichte und Phở – unsere Hauptgerichte.',
    image: sectionImages.chickenWok,
    items: [
      {
        code: '40-45',
        name: 'Tofu Selection',
        description: 'Wähle deine Lieblingssoße für unser veganes Wok-Gericht.',
        price: '11.00€',
        tags: ['vegan'],
        variations: tofuSauceOptions,
        ...codes('f i'),
      },
      {
        code: '50-55',
        name: 'Hühnerfleisch',
        description: 'Klassisches Wok-Gericht mit leichter Marinade.',
        price: '12.00€',
        variations: chickenSauceOptions,
        ...codes('i'),
      },
      {
        code: '60-69',
        name: 'Paniertes Hühnerfleisch',
        description: 'Knusprig paniert, außen kross – innen saftig.',
        price: '14.50€',
        variations: breadedChickenOptions,
        ...codes('a i 4'),
      },
      {
        code: '70-79',
        name: 'Knuspriges Hühnerfleisch',
        description: 'Im Wok geschwenkt und extra kross.',
        price: '14.50€',
        variations: crispyChickenOptions,
        ...codes('a i 4'),
      },
      {
        code: '80-89',
        name: 'Knusprige Ente',
        description: 'Außen kross, innen zart – perfekt mit fruchtigen Soßen.',
        price: '15.50€',
        variations: duckSauceOptions,
        ...codes('a i 4'),
      },
      {
        code: '90-95',
        name: 'Rindfleisch',
        description: 'Fein geschnittenes Rindfleisch im Wok',
        price: '14.50€',
        variations: beefSauceOptions,
        ...codes('i'),
      },
      {
        code: '100-105',
        name: 'Garnelen',
        description: 'Saftige Garnelen mit knackigem Gemüse',
        price: '16.00€',
        variations: shrimpSauceOptions,
        ...codes('i k'),
      },
      {
        code: '110-112',
        name: 'Bún Signature',
        description: 'Frische Kräuter, knackiger Salat und knusprige Toppings.',
        // price: 'ab 14.50€',
        variations: noodleBowlOptions,
        ...codes('d e i'),
      },
      {
        code: '120-127',
        name: 'Gebratene Nudeln',
        description: 'Individuell kombinierbar – von Gemüse bis Garnelen.',
        // price: 'ab 9.50€',
        variations: friedNoodleOptions,
        ...codes('a c i 4'),
      },
      {
        code: '130-137',
        name: 'Gebratener Reis',
        description: 'Beliebt als Hauptgericht oder Beilage.',
        // price: 'ab 9.50€',
        variations: friedRiceOptions,
        ...codes('c i 4'),
      },
      {
        code: '140-147',
        name: 'Udon Curry Bowl',
        description: 'Wärmende Curry-Basis mit deiner Lieblingsprotein.',
        // price: 'ab 11.00€',
        variations: udonCurryOptions,
        tags: ['spicy'],
        ...codes('a g i'),
      },
      {
        code: '150-156',
        name: 'Gebratene Udon',
        description: 'Herzhaft und sättigend.',
        // price: 'ab 10.50€',
        variations: udonFriedOptions,
        ...codes('a c i 4'),
      },
      {
        code: '160-166',
        name: 'Gebratene Reisbandnudeln',
        description: 'Wähle deine Protein-Begleitung.',
        // price: 'ab 10.50€',
        variations: riceNoodleOptions,
        ...codes('a c e i 4'),
      },
      {
        code: '170-176',
        name: 'Reisnudeln mit Currypaste',
        description: 'Currypaste bringt feine Schärfe ins Spiel.',
        // price: 'ab 10.50€',
        variations: curryRiceNoodleOptions,
        tags: ['spicy'],
        ...codes('c i 4'),
      },
      {
        code: '180',
        name: 'Pho mit Tofu',
        description: 'Leicht & aromatisch',
        price: '16.50€',
        tags: ['vegan'],
        ...codes('f'),
      },
      { code: '181', name: 'Pho mit Hühnerfleisch', description: 'Klassisch & wärmend', price: '17.50€', ...codes('d 4') },
      { code: '182', name: 'Pho mit Rindfleisch', description: 'Intensiv & herzhaft', price: '18.50€', ...codes('d 4') },
    ],
  },
  {
    id: 'dessert',
    title: 'Dessert',
    description: 'Süßer Abschluss nach vietnamesischer Art.',
    image: sectionImages.dessert,
    items: [
      {
        code: '1000',
        name: 'Gebackene Banane mit Honig',
        description: 'mit Honig',
        price: '4.50€',
        ...codes('a i'),
      },
      {
        code: '1001',
        name: 'Knusprige Sesam-Bällchen (4 Stk.)',
        description: 'mit Nüssen und Bohnen',
        price: '4.50€',
        ...codes('a i'),
      },
      {
        code: '1002',
        name: 'Mochi Eis (2 Stk.)',
        description: '',
        price: '5.50€',
        ...codes('g'),
      },
    ],
  },
  {
    id: 'extras',
    title: 'Extras & Soßen',
    description: 'Perfekt zum Kombinieren oder als Beilage.',
    image: sectionImages.extras,
    items: [
      {
        code: 'EX',
        name: 'Beilagen & Soßen',
        description: 'Erweitere dein Menü mit Reis, gebratenen Nudeln oder Signature-Soßen.',
        extrasList: [
          { label: 'Reis', price: '2.50€' },
          { label: 'Gebratener Reis / Nudeln', price: '4.00€', ...codes('a c i 4') },
          { label: 'Sweet Chili Soße', price: '2.00€' },
          { label: 'Teriyaki Soße', price: '2.00€' },
          { label: 'Chop Suey / Kung Pao Soße', price: '3.00€', ...codes('a 4') },
          { label: 'Curry Soße', price: '3.00€', ...codes('g') },
          { label: 'Mango Soße', price: '3.00€', ...codes('g') },
        ],
      },
    ],
  },
]

export const allergenLegend = {
  a: 'Gluten / Weizen',
  b: 'Weichtiere',
  c: 'Ei',
  d: 'Fisch',
  e: 'Erdnuss',
  f: 'Sojabohnen',
  g: 'Milch',
  h: 'Cashew',
  i: 'Sesam',
  k: 'Krebstiere',
}

export const additiveLegend = {
  1: 'mit Farbstoff',
  2: 'mit Konservierungsstoffen',
  3: 'mit Antioxidationsmittel',
  4: 'mit Geschmacksverstärker',
  5: 'mit Süßungsmittel',
  6: 'mit Phenylalaninquelle',
  7: 'mit Koffein',
}

