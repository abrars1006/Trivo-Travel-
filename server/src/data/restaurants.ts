import { Restaurant } from '../types/index.js';

export const CURATED_RESTAURANTS: Restaurant[] = [
  // MUNNAR
  {
    id: 'rest-munnar-1',
    destinationId: 'munnar',
    destinationName: 'Munnar',
    name: 'Rapsy Restaurant (Old Munnar)',
    cuisine: ['Kerala Traditional', 'South Indian', 'Malabar Biryani'],
    distanceKm: 0.4,
    address: 'Main Bazaar Road, Near Old Munnar Post Office, Munnar, Kerala 685612',
    openingHours: '07:30 AM – 10:30 PM (Daily)',
    phone: '+914865230456',
    latitude: 10.0882,
    longitude: 77.0588,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹',
    menuItems: [
      {
        name: 'Kerala Parotta with Veg Kurma',
        description: 'Layered flaky Kerala flatbread served with aromatic coconut vegetable kurma',
        price: 90,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Munnar Mountain Spice Chicken Roast',
        description: 'Tender chicken slow-cooked with fresh crushed pepper and curry leaves from local plantations',
        price: 240,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Malabar Dum Biryani (Chicken)',
        description: 'Fragrant Kaima rice cooked on dum with Kerala spices, served with raita and date pickle',
        price: 220,
        isVeg: false
      },
      {
        name: 'Traditional Kerala Sadya Lunch Thali',
        description: 'Steamed red rice, sambar, avial, thoran, rasam, payasam, and papadam on plantain leaf',
        price: 180,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Fresh Munnar Cardamom Spiced Tea',
        description: 'Locally estate-harvested black tea brewed with fresh green cardamom pods',
        price: 30,
        isVeg: true
      }
    ],
    verifiedAt: '2026-03-12'
  },
  {
    id: 'rest-munnar-2',
    destinationId: 'munnar',
    destinationName: 'Munnar',
    name: 'Saravana Bhavan (Pure Vegetarian Munnar)',
    cuisine: ['Pure Vegetarian', 'South Indian', 'Tiffin'],
    distanceKm: 0.6,
    address: 'Near KSRTC Bus Stand, Nullatanni Road, Munnar, Kerala 685612',
    openingHours: '06:30 AM – 10:00 PM (Daily)',
    phone: '+914865230890',
    latitude: 10.0870,
    longitude: 77.0610,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹',
    menuItems: [
      {
        name: 'Ghee Roast Masala Dosa',
        description: 'Crispy fermented rice-lentil crepe crisped in pure cow ghee, stuffed with spiced potato masala',
        price: 110,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Filter Coffee (South Indian Degree)',
        description: 'Strong chicory-blend coffee brewed in traditional brass filter with frothed milk',
        price: 45,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Steamed Idli Platter (3 pcs)',
        description: 'Fluffy steamed rice-lentil cakes served with three plantation chutneys and piping hot sambar',
        price: 70,
        isVeg: true
      },
      {
        name: 'South Indian Mini Meals',
        description: 'Sambar rice, curd rice, poriyal, kootu, rasam, and sweet kesari',
        price: 160,
        isVeg: true
      }
    ],
    verifiedAt: '2026-03-10'
  },
  {
    id: 'rest-munnar-3',
    destinationId: 'munnar',
    destinationName: 'Munnar',
    name: 'Copper Castle Hilltop Bistro',
    cuisine: ['Continental', 'Pan-Indian', 'Cafe'],
    distanceKm: 2.3,
    address: 'Kannandevan Hills, Bison Valley Road, Munnar, Kerala 685612',
    openingHours: '11:00 AM – 10:30 PM (Daily)',
    phone: '+914865231201',
    latitude: 10.0760,
    longitude: 77.0650,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    menuVerified: false,
    priceRange: '₹₹',
    menuItems: [],
    verifiedAt: '2026-03-14'
  },

  // OOTY
  {
    id: 'rest-ooty-1',
    destinationId: 'ooty',
    destinationName: 'Ooty',
    name: 'Nahar’s Sidewalk Cafe',
    cuisine: ['Italian', 'Artisanal Pizza', 'Bakery', 'Coffee'],
    distanceKm: 0.5,
    address: 'Charing Cross, Commercial Road, Ooty, Tamil Nadu 643001',
    openingHours: '10:00 AM – 10:00 PM (Daily)',
    phone: '+914232442173',
    latitude: 11.4110,
    longitude: 76.6965,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹₹',
    menuItems: [
      {
        name: 'Wood-Fired Margherita Pizza (10-inch)',
        description: 'San Marzano tomato sauce, fresh mozzarella, fresh basil from Nilgiri gardens, extra virgin olive oil',
        price: 360,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Nilgiri Wild Mushroom Penne Alfredo',
        description: 'Al dente penne in velvety parmesan cream sauce tossed with locally foraged button mushrooms',
        price: 340,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Hot Chocolate with Whipped Marshmallow',
        description: 'Rich dark Ooty cocoa blended with steamed milk, topped with house whipped cream',
        price: 160,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Ooty Artisan Garlic Toast',
        description: 'Crusty sourdough baguettes toasted with herbed garlic butter and melted cheddar',
        price: 180,
        isVeg: true
      }
    ],
    verifiedAt: '2026-03-11'
  },
  {
    id: 'rest-ooty-2',
    destinationId: 'ooty',
    destinationName: 'Ooty',
    name: 'Hotel Junior Kuppanna (Ooty Branch)',
    cuisine: ['Kongu Nadu Traditional', 'Chettinad', 'Non-Veg Specialties'],
    distanceKm: 0.8,
    address: 'Coonoor Road, Near Collector Office, Ooty, Tamil Nadu 643001',
    openingHours: '11:30 AM – 10:30 PM (Daily)',
    phone: '+914232448899',
    latitude: 11.4090,
    longitude: 76.6990,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹₹',
    menuItems: [
      {
        name: 'Kongu Nadu Mutton Biryani (Seeraga Samba)',
        description: 'Signature short-grain Seeraga Samba rice cooked with tender hill-grazed mutton and Kongu spices',
        price: 340,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Pallipalayam Chicken Fry',
        description: 'Shredded chicken sauteed dry with shallots, whole red chillies, and coconut slivers',
        price: 280,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Kothu Parotta (Egg & Onion)',
        description: 'Flaky parotta shredded on hot griddle with farm eggs, onions, and spicy salna gravy',
        price: 160,
        isVeg: false
      }
    ],
    verifiedAt: '2026-03-12'
  },
  {
    id: 'rest-ooty-3',
    destinationId: 'ooty',
    destinationName: 'Ooty',
    name: 'Shinkow’s Chinese Restaurant',
    cuisine: ['Indo-Chinese', 'Hakka', 'Heritage'],
    distanceKm: 0.7,
    address: '38/2 Commissioner’s Road, Ooty, Tamil Nadu 643001',
    openingHours: '12:30 PM – 03:30 PM, 06:30 PM – 09:30 PM',
    phone: '+914232442811',
    latitude: 11.4125,
    longitude: 76.6940,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    menuVerified: false,
    priceRange: '₹₹',
    menuItems: [],
    verifiedAt: '2026-03-13'
  },

  // GOA
  {
    id: 'rest-goa-1',
    destinationId: 'goa',
    destinationName: 'Goa',
    name: 'Fisherman’s Wharf (Panaji Heritage)',
    cuisine: ['Goan Seafood', 'Portuguese-Goan', 'Coastal'],
    distanceKm: 1.2,
    address: 'Campal, Near Vivanta Panaji, Dayanand Bandodkar Marg, Panaji, Goa 403001',
    openingHours: '12:00 PM – 11:00 PM (Daily)',
    phone: '+918322464901',
    latitude: 15.4960,
    longitude: 73.8180,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹₹₹',
    menuItems: [
      {
        name: 'Goan Fish Curry Thali (Kingfish/Surmai)',
        description: 'Fresh kingfish steak simmered in coconut milk, dried kokum, and Kashmiri chillies, with rice, kismoor, and tisryo',
        price: 480,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Prawn Balchão with Poi Bread',
        description: 'Spicy, tangy prawn pickle masala infused with Goan toddy vinegar, served with hot crusty local poi',
        price: 450,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Traditional Goan Bebinca',
        description: 'Multi-layered coconut milk and egg pudding baked to caramelized perfection, served warm with vanilla ice cream',
        price: 220,
        isVeg: true,
        isSpecialty: true
      }
    ],
    verifiedAt: '2026-03-14'
  },
  {
    id: 'rest-goa-2',
    destinationId: 'goa',
    destinationName: 'Goa',
    name: 'Gunpowder (Assagao)',
    cuisine: ['South Indian Coastal', 'Kerala', 'Cocktails'],
    distanceKm: 4.8,
    address: 'Anjuna Mapusa Road, Saunto Vaddo, Assagao, Goa 403507',
    openingHours: '12:00 PM – 03:30 PM, 07:00 PM – 11:00 PM (Closed Tue)',
    phone: '+918322268083',
    latitude: 15.5920,
    longitude: 73.7740,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹₹₹',
    menuItems: [
      {
        name: 'Kerala Pandi Curry (Coorg Style Pork)',
        description: 'Dark slow-braised pork belly with wild Kachampuli vinegar and dry-roasted spices',
        price: 460,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Toddy Shop Meen Curry',
        description: 'Spicy sear fish curry simmered in earthenware chatti with Kodampuli and curry leaves',
        price: 440,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Fluffy Appams (2 pcs)',
        description: 'Fermented rice and coconut hoppers with soft spongy centers and crisp lacy edges',
        price: 90,
        isVeg: true
      }
    ],
    verifiedAt: '2026-03-15'
  },

  // JAIPUR
  {
    id: 'rest-jaipur-1',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'LMB (Laxmi Misthan Bhandar) Johari Bazar',
    cuisine: ['Rajasthani Thali', 'Heritage Sweets', 'Pure Vegetarian'],
    distanceKm: 0.8,
    address: '98-99, Johari Bazar Road, Bapu Bazar, Jaipur, Rajasthan 302003',
    openingHours: '08:00 AM – 11:00 PM (Daily)',
    phone: '+911412565844',
    latitude: 26.9205,
    longitude: 75.8260,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹₹',
    menuItems: [
      {
        name: 'Royal Rajasthani Dal Baati Churma Thali',
        description: 'Ghee-soaked roasted wheat baatis, panchmel dal, gatte ki sabzi, ker sangri, and three varieties of sweet churma',
        price: 520,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Paneer Ghewar (Single Piece)',
        description: 'Iconic Rajasthani honeycomb sweet soaked in saffron syrup, topped with clotted malai and silver varq',
        price: 180,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Pyaaz Ki Kachori (2 pcs)',
        description: 'Crisp flaky pastry stuffed with spiced onion and asafoetida filling, served with tamarind sonth chutney',
        price: 110,
        isVeg: true,
        isSpecialty: true
      }
    ],
    verifiedAt: '2026-03-12'
  },
  {
    id: 'rest-jaipur-2',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    name: 'Handi Restaurant (MI Road)',
    cuisine: ['North Indian', 'Mughlai', 'Tandoori'],
    distanceKm: 1.1,
    address: 'Opposite GPO, Maya Mansion, Mirza Ismail Rd, Jaipur, Rajasthan 302001',
    openingHours: '12:00 PM – 11:00 PM (Daily)',
    phone: '+911412372275',
    latitude: 26.9180,
    longitude: 75.8080,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹₹',
    menuItems: [
      {
        name: 'Junglee Maas (Hunter’s Mutton)',
        description: 'Traditional Rajput recipe cooked with desi ghee, dry red Mathania chillies, and garlic cloves',
        price: 490,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Handi Meat in Clay Pot',
        description: 'Slow-cooked mutton with bone simmered in unglazed earthen handi on charcoal',
        price: 480,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Butter Naan & Dal Makhani',
        description: 'Slow-simmered black urad lentils finished with butter and cream, served with clay-oven baked naan',
        price: 290,
        isVeg: true
      }
    ],
    verifiedAt: '2026-03-10'
  },

  // MANALI
  {
    id: 'rest-manali-1',
    destinationId: 'manali',
    destinationName: 'Manali',
    name: 'Cafe 1947 (Old Manali Bridge)',
    cuisine: ['Italian', 'Wood-Fired Pizza', 'Riverfront Cafe'],
    distanceKm: 1.5,
    address: 'Near Nehru Kund, Old Manali Bridge, Manali, Himachal Pradesh 175131',
    openingHours: '10:30 AM – 11:00 PM (Daily)',
    phone: '+919816047194',
    latitude: 32.2540,
    longitude: 77.1820,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹₹',
    menuItems: [
      {
        name: 'The Metallica Pizza (12-inch)',
        description: 'Smoked chicken, jalapeños, sun-dried tomatoes, and mountain herbs on thin crust',
        price: 440,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Pesto Fettuccine with Pine Nuts',
        description: 'House-made basil pesto, Nilgiri parmesan cheese, and toasted Himalayan pine nuts',
        price: 360,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Himalayan Apple Crumble Pie',
        description: 'Fresh local Kinnaur apples stewed with cinnamon and brown sugar, topped with buttery crumble',
        price: 210,
        isVeg: true,
        isSpecialty: true
      }
    ],
    verifiedAt: '2026-03-11'
  },
  {
    id: 'rest-manali-2',
    destinationId: 'manali',
    destinationName: 'Manali',
    name: 'Mayur Restaurant (Mall Road)',
    cuisine: ['Himachali Specialties', 'North Indian', 'Tandoori'],
    distanceKm: 0.3,
    address: 'The Mall Road, Near State Bank of India, Manali, Himachal Pradesh 175131',
    openingHours: '11:00 AM – 10:30 PM (Daily)',
    phone: '+911902252316',
    latitude: 32.2425,
    longitude: 77.1895,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    menuVerified: true,
    priceRange: '₹₹',
    menuItems: [
      {
        name: 'Himachali Siddu with Desi Ghee',
        description: 'Traditional steamed wheat pocket stuffed with ground walnuts, poppy seeds, and mountain spices',
        price: 180,
        isVeg: true,
        isSpecialty: true
      },
      {
        name: 'Kullu Trout Fish Fry (Tawa Grilled)',
        description: 'Locally farmed fresh river trout marinated in lemon, garlic, and ground carom seeds, pan-seared to crisp',
        price: 480,
        isVeg: false,
        isSpecialty: true
      },
      {
        name: 'Kadhi Chawal Himachali Thali',
        description: 'Local buttermilk kadhi, steamed basmati rice, lingri (fiddlehead fern) pickle, and roasted papad',
        price: 220,
        isVeg: true
      }
    ],
    verifiedAt: '2026-03-09'
  }
];
