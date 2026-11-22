export interface Destination {
  id: string;
  name: string;
  region: 'Hunza & Upper Gojal' | 'Skardu & Baltistan' | 'Nanga Parbat & Gilgit';
  altitude: string;
  bestSeason: string;
  summary: string;
  highlights: string[];
  image: string;
}

export interface TourService {
  number: string;
  title: string;
  description: string;
}

export interface TourPackage {
  id: string;
  title: string;
  category: 'Adventure' | 'Family' | 'Honeymoon' | 'Luxury';
  duration: string;
  pricePkr: number;
  priceUnit: string;
  destinations: string[];
  highlights: string[];
  image: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  category: 'Hunza & Gojal' | 'Skardu & Baltistan' | 'Alpine Peaks';
  image: string;
  caption: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  tripRoute: string;
  dateLabel: string;
  quote: string;
  isPlaceholder: boolean;
}

export const COMPANY_INFO = {
  name: 'TRAVEL WITH JALAL',
  owner: 'Jalal',
  category: 'Travel & Tourism Agency',
  location: 'Gilgit-Baltistan, Pakistan',
  phoneDisplay: '03438870100',
  phoneHref: 'tel:+923438870100',
  whatsappNumber: '923438870100',
  email: 'jalalhun1234@gmail.com',
  emailHref: 'mailto:jalalhun1234@gmail.com',
  tagline: 'Discover the Beauty of Pakistan',
  about:
    'TRAVEL WITH JALAL is a travel and tourism company based in the beautiful region of Gilgit-Baltistan, Pakistan. Our mission is to provide unforgettable travel experiences and help local and international tourists explore the breathtaking beauty of Northern Pakistan.',
  heroImage: '/src/assets/images/hero_hunza_karakoram_1795298205562.jpg',
};

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    handle: '@travelwithjalal (Profile Placeholder)',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    handle: 'TRAVEL WITH JALAL (Page Placeholder)',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    handle: 'TRAVEL WITH JALAL (Channel Placeholder)',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/',
    handle: '@travelwithjalal (Profile Placeholder)',
  },
];

export const SERVICES: TourService[] = [
  {
    number: '01',
    title: 'Customized Tour Packages',
    description:
      'Tailor-made itineraries across Gilgit-Baltistan crafted around your schedule, comfort level, and seasonal landscapes.',
  },
  {
    number: '02',
    title: 'Family Tours',
    description:
      'Safe, well-paced northern getaways featuring scenic stops, comfortable family lodging, and attentive coordination.',
  },
  {
    number: '03',
    title: 'Honeymoon Packages',
    description:
      'Private valley retreats overlooking snow-clad peaks and turquoise lakes with curated mountain hospitality.',
  },
  {
    number: '04',
    title: 'Adventure Trips',
    description:
      'High-altitude expeditions to base camps, alpine plateaus, suspension bridges, and dramatic Karakoram passes.',
  },
  {
    number: '05',
    title: 'Hotel Reservations',
    description:
      'Handpicked boutique resorts, heritage forts, and mountain lodges selected for views, warmth, and reliability.',
  },
  {
    number: '06',
    title: 'Transport Services',
    description:
      'Well-maintained 4x4 jeeps, luxury coasters, and private SUVs driven by experienced Karakoram road specialists.',
  },
  {
    number: '07',
    title: 'Professional Tour Guides',
    description:
      'Knowledgeable local guides fluent in regional history, mountain trails, and cultural traditions of Gilgit-Baltistan.',
  },
  {
    number: '08',
    title: 'Airport Transfers',
    description:
      'Punctual meet-and-greet pickups and drop-offs at Islamabad, Gilgit, and Skardu airports for seamless arrivals.',
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'hunza-valley',
    name: 'Hunza Valley',
    region: 'Hunza & Upper Gojal',
    altitude: '2,438 m',
    bestSeason: 'April – October',
    summary:
      'A storied mountain sanctuary framed by Rakaposhi and Ultar Sar, renowned for ancient forts, terraced orchards, and warm hospitality.',
    highlights: ['Baltit & Altit Forts', 'Karimabad Heritage Bazaar', 'Eagle’s Nest Sunset Viewpoint'],
    image: '/src/assets/images/hero_hunza_karakoram_1795298205562.jpg',
  },
  {
    id: 'skardu',
    name: 'Skardu',
    region: 'Skardu & Baltistan',
    altitude: '2,228 m',
    bestSeason: 'May – October',
    summary:
      'The gateway to the Karakoram giants, uniting glacial lakes, high-altitude cold deserts, and timeless Balti mountain culture.',
    highlights: ['Shangrila & Upper Kachura Lakes', 'Katpana Cold Desert', 'Manthokha Waterfall'],
    image: '/src/assets/images/skardu_shangrila_valley_1795298205496.jpg',
  },
  {
    id: 'fairy-meadows',
    name: 'Fairy Meadows',
    region: 'Nanga Parbat & Gilgit',
    altitude: '3,300 m',
    bestSeason: 'May – September',
    summary:
      'A lush alpine grassland perched directly beneath the towering Raikot Face of Nanga Parbat, the ninth-highest peak on Earth.',
    highlights: ['4x4 Jeep Track from Raikot', 'Nanga Parbat Base Camp Hike', 'Pine Forest Timber Cabins'],
    image: '/src/assets/images/fairy_meadows_nanga_parbat_1795298205312.jpg',
  },
  {
    id: 'attabad-lake',
    name: 'Attabad Lake',
    region: 'Hunza & Upper Gojal',
    altitude: '2,559 m',
    bestSeason: 'March – November',
    summary:
      'Vivid turquoise alpine waters stretching between towering Karakoram granite walls in Gojal, ideal for boating and lakeside stays.',
    highlights: ['Private Boat & Jet Ski Cruises', 'Karakoram Highway Tunnels', 'Turquoise Gorge Views'],
    image: '/src/assets/images/attabad_lake_turquoise_1795298205627.jpg',
  },
  {
    id: 'passu-cones',
    name: 'Passu Cones',
    region: 'Hunza & Upper Gojal',
    altitude: '2,480 m',
    bestSeason: 'April – October',
    summary:
      'Cathedral-like serrated peaks rising sharply above the Hunza River and winding Karakoram Highway in Upper Gojal.',
    highlights: ['Cathedral Ridge Panorama', 'Hussaini Suspension Bridge', 'Batura & Passu Glaciers'],
    image: '/src/assets/images/passu_cones_cathedral_1795298205436.jpg',
  },
  {
    id: 'naltar-valley',
    name: 'Naltar Valley',
    region: 'Nanga Parbat & Gilgit',
    altitude: '2,800 m',
    bestSeason: 'June – September',
    summary:
      'A verdant pine-forested valley near Gilgit celebrated for its multi-hued Satrangi alpine lakes and tranquil mountain air.',
    highlights: ['Satrangi & Blue Lakes', 'Dense Himalayan Pine Forests', 'Summer Meadow Picnics'],
    image: '/src/assets/images/naltar_valley_lakes_1795298205372.jpg',
  },
  {
    id: 'khunjerab-pass',
    name: 'Khunjerab Pass',
    region: 'Hunza & Upper Gojal',
    altitude: '4,693 m',
    bestSeason: 'May – October',
    summary:
      'The highest paved international border crossing in the world, connecting Northern Pakistan with the Pamir plateau across Khunjerab National Park.',
    highlights: ['Highest Paved Border Crossing', 'Khunjerab National Park Wildlife', 'Snow-Capped Pamir Approach'],
    image: '/src/assets/images/passu_cones_cathedral_1795298205436.jpg',
  },
  {
    id: 'deosai-national-park',
    name: 'Deosai National Park',
    region: 'Skardu & Baltistan',
    altitude: '4,114 m',
    bestSeason: 'July – September',
    summary:
      'Known as the Land of Giants, this vast high-altitude plateau blooms with summer wildflowers and cradles crystal-clear Sheosar Lake.',
    highlights: ['Sheosar Lake Reflection', 'Bara Pani River Crossing', 'Summer Wildflower Plains'],
    image: '/src/assets/images/deosai_national_park_1795298204964.jpg',
  },
  {
    id: 'shigar-valley',
    name: 'Shigar Valley',
    region: 'Skardu & Baltistan',
    altitude: '2,350 m',
    bestSeason: 'April – October',
    summary:
      'A serene river valley leading toward K2, home to the restored 17th-century Shigar Fort, stone mosques, and tranquil apricot orchards.',
    highlights: ['Historic Shigar Fort', 'Sarfaranga High-Altitude Desert', 'Blind Lake'],
    image: '/src/assets/images/khaplu_shigar_heritage_1795298205631.jpg',
  },
  {
    id: 'khaplu-valley',
    name: 'Khaplu Valley',
    region: 'Skardu & Baltistan',
    altitude: '2,600 m',
    bestSeason: 'April – October',
    summary:
      'Eastern Baltistan’s architectural jewel, featuring the royal Khaplu Palace, Chaqchan Mosque, and dramatic Shyok River scenery.',
    highlights: ['Khaplu Palace Heritage Stay', 'Chaqchan Mosque', 'Saling & Machlu Viewpoints'],
    image: '/src/assets/images/khaplu_shigar_heritage_1795298205631.jpg',
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'hunza-attabad-escape',
    title: 'Royal Hunza & Attabad Lake Escape',
    category: 'Luxury',
    duration: '5 Days · 4 Nights',
    pricePkr: 85000,
    priceUnit: 'Per Person',
    destinations: ['Hunza Valley', 'Attabad Lake', 'Passu Cones', 'Khunjerab Pass'],
    highlights: [
      '4-star heritage & lakefront hotel stays with breakfast',
      'Private AC SUV / Prado transport with experienced driver',
      'Guided visits to Altit Fort, Baltit Fort & Attabad boating',
    ],
    image: '/src/assets/images/attabad_lake_turquoise_1795298205627.jpg',
  },
  {
    id: 'skardu-deosai-expedition',
    title: 'Skardu, Shigar & Deosai Expedition',
    category: 'Adventure',
    duration: '6 Days · 5 Nights',
    pricePkr: 115000,
    priceUnit: 'Per Person',
    destinations: ['Skardu', 'Deosai National Park', 'Shigar Valley', 'Khaplu Valley'],
    highlights: [
      '4x4 jeep excursion across Deosai National Park & Sheosar Lake',
      'Heritage stays near Shigar Fort & Khaplu Valley',
      'Skardu airport pickup & drop-off included',
    ],
    image: '/src/assets/images/deosai_national_park_1795298204964.jpg',
  },
  {
    id: 'fairy-meadows-trek',
    title: 'Fairy Meadows & Nanga Parbat Adventure',
    category: 'Adventure',
    duration: '4 Days · 3 Nights',
    pricePkr: 78000,
    priceUnit: 'Per Person',
    destinations: ['Fairy Meadows', 'Nanga Parbat Viewpoint'],
    highlights: [
      'Thrilling 4x4 Raikot jeep transfer & guided alpine trek',
      'Cozy timber cabin accommodation with full-board meals',
      'Day hike to Beyal Camp & Nanga Parbat Base Camp viewpoint',
    ],
    image: '/src/assets/images/fairy_meadows_nanga_parbat_1795298205312.jpg',
  },
  {
    id: 'honeymoon-hunza-naltar',
    title: 'Hunza & Naltar Valley Honeymoon Retreat',
    category: 'Honeymoon',
    duration: '7 Days · 6 Nights',
    pricePkr: 195000,
    priceUnit: 'Per Couple',
    destinations: ['Hunza Valley', 'Attabad Lake', 'Naltar Valley', 'Passu Cones'],
    highlights: [
      'Private scenic luxury suites overlooking Rakaposhi & Attabad Lake',
      'Dedicated private vehicle, chauffeur & candlelit dinner setup',
      'Naltar Valley 4x4 jeep tour to Satrangi emerald lakes',
    ],
    image: '/src/assets/images/naltar_valley_lakes_1795298205372.jpg',
  },
  {
    id: 'family-northern-discovery',
    title: 'Family Northern Heritage Tour',
    category: 'Family',
    duration: '8 Days · 7 Nights',
    pricePkr: 135000,
    priceUnit: 'Per Person',
    destinations: ['Hunza Valley', 'Naltar Valley', 'Attabad Lake', 'Passu Cones', 'Khunjerab Pass'],
    highlights: [
      'Spacious family-friendly resorts & relaxed daily travel pace',
      'Private luxury coaster or SUV with dedicated family tour guide',
      'Cultural village walks, orchard visits & safe scenic viewpoints',
    ],
    image: '/src/assets/images/skardu_shangrila_valley_1795298205496.jpg',
  },
  {
    id: 'grand-gilgit-baltistan',
    title: 'Grand Gilgit-Baltistan Complete Circuit',
    category: 'Luxury',
    duration: '12 Days · 11 Nights',
    pricePkr: 245000,
    priceUnit: 'Per Person',
    destinations: [
      'Hunza Valley',
      'Attabad Lake',
      'Passu Cones',
      'Khunjerab Pass',
      'Naltar Valley',
      'Fairy Meadows',
      'Skardu',
      'Deosai National Park',
      'Shigar Valley',
      'Khaplu Valley',
    ],
    highlights: [
      'All 10 signature Gilgit-Baltistan destinations in one seamless route',
      'Premier hotels, domestic airport transfers & 4x4 alpine jeeps',
      'End-to-end trip management led by TRAVEL WITH JALAL',
    ],
    image: '/src/assets/images/khaplu_shigar_heritage_1795298205631.jpg',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-hunza',
    title: 'Golden Hour over Hunza & Rakaposhi',
    location: 'Hunza Valley, Gilgit-Baltistan',
    category: 'Hunza & Gojal',
    image: '/src/assets/images/hero_hunza_karakoram_1795298205562.jpg',
    caption: 'Late afternoon alpine light sweeping across the ancient terraced villages of Hunza.',
  },
  {
    id: 'g-attabad',
    title: 'Turquoise Calm of Attabad Lake',
    location: 'Gojal, Upper Hunza',
    category: 'Hunza & Gojal',
    image: '/src/assets/images/attabad_lake_turquoise_1795298205627.jpg',
    caption: 'Traditional wooden boat gliding between steep Karakoram granite walls.',
  },
  {
    id: 'g-passu',
    title: 'Cathedral Ridge of Passu Cones',
    location: 'Passu, Upper Hunza',
    category: 'Hunza & Gojal',
    image: '/src/assets/images/passu_cones_cathedral_1795298205436.jpg',
    caption: 'Iconic serrated granite spires rising above the Karakoram Highway.',
  },
  {
    id: 'g-skardu',
    title: 'Morning Mist in Skardu Valley',
    location: 'Skardu, Baltistan',
    category: 'Skardu & Baltistan',
    image: '/src/assets/images/skardu_shangrila_valley_1795298205496.jpg',
    caption: 'Still alpine reflections surrounded by autumn golden poplars and stone chalets.',
  },
  {
    id: 'g-fairy',
    title: 'Fairy Meadows & Nanga Parbat',
    location: 'Diamer District, Gilgit-Baltistan',
    category: 'Alpine Peaks',
    image: '/src/assets/images/fairy_meadows_nanga_parbat_1795298205312.jpg',
    caption: 'Emerald high-altitude meadows beneath the towering wall of Nanga Parbat.',
  },
  {
    id: 'g-deosai',
    title: 'Wildflower Plains of Deosai',
    location: 'Deosai National Park',
    category: 'Skardu & Baltistan',
    image: '/src/assets/images/deosai_national_park_1795298204964.jpg',
    caption: 'Crystal streams winding across the high-altitude Land of Giants.',
  },
  {
    id: 'g-naltar',
    title: 'Emerald Lakes of Naltar Valley',
    location: 'Naltar, Gilgit',
    category: 'Alpine Peaks',
    image: '/src/assets/images/naltar_valley_lakes_1795298205372.jpg',
    caption: 'Jewel-toned glacier lakes nestled inside dense Himalayan pine groves.',
  },
  {
    id: 'g-khaplu',
    title: 'Balti Heritage of Khaplu & Shigar',
    location: 'Khaplu & Shigar Valleys',
    category: 'Skardu & Baltistan',
    image: '/src/assets/images/khaplu_shigar_heritage_1795298205631.jpg',
    caption: 'Carved timber and stone architecture framed by apricot orchards and cliffs.',
  },
];

export const PLACEHOLDER_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-placeholder-1',
    author: '[Guest Name Placeholder]',
    tripRoute: 'Hunza Valley & Attabad Lake Tour',
    dateLabel: 'Sample Testimonial Slot',
    quote:
      '[Placeholder for verified traveler feedback: Replace this text with an authentic review from a TRAVEL WITH JALAL guest sharing their itinerary, transport, and guide experience.]',
    isPlaceholder: true,
  },
  {
    id: 't-placeholder-2',
    author: '[Family Traveler Name Placeholder]',
    tripRoute: 'Skardu & Deosai National Park',
    dateLabel: 'Sample Testimonial Slot',
    quote:
      '[Placeholder for verified family tour review: Add actual feedback regarding hotel comfort, family pacing, and scenic coordination across Baltistan.]',
    isPlaceholder: true,
  },
  {
    id: 't-placeholder-3',
    author: '[Couple / Adventure Guest Placeholder]',
    tripRoute: 'Fairy Meadows & Naltar Valley',
    dateLabel: 'Sample Testimonial Slot',
    quote:
      '[Placeholder for verified honeymoon or adventure review: Insert genuine client impressions of local hospitality and customized planning by Jalal.]',
    isPlaceholder: true,
  },
];

export function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}
