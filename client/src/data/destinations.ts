import { Destination } from '../types';

export const CURATED_DESTINATIONS: Destination[] = [
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    country: 'India',
    latitude: 10.0889,
    longitude: 77.0595,
    description: 'Perched at 1,600m in the Western Ghats, Munnar is famous for rolling tea plantations, mist-covered valleys, cool mountain air, and endangered Nilgiri Tahr.',
    travelHighlights: [
      'Endless emerald tea estates and the KDHP Tea Museum',
      'Eravikulam National Park and Anamudi Peak (highest in South India)',
      'Scenic boating at Mattupetty Dam and Echo Point acoustic marvel',
      'Top Station viewpoints overlooking Tamil Nadu valley plains'
    ],
    popularAttractions: [
      {
        id: 'munnar-1',
        name: 'Eravikulam National Park',
        destinationId: 'munnar',
        latitude: 10.2014,
        longitude: 77.0850,
        description: 'Home to the endangered Nilgiri Tahr and the blooming Neelakurinji flowers.',
        category: 'Wildlife & Nature',
        entryFee: 200,
        suggestedTimeHours: 3
      },
      {
        id: 'munnar-2',
        name: 'Mattupetty Dam & Lake',
        destinationId: 'munnar',
        latitude: 10.1064,
        longitude: 77.1245,
        description: 'Storage concrete gravity dam offering scenic speedboating and elephant sightings.',
        category: 'Boating & Scenic',
        entryFee: 50,
        suggestedTimeHours: 2
      },
      {
        id: 'munnar-3',
        name: 'Tea Museum (KDHP)',
        destinationId: 'munnar',
        latitude: 10.0838,
        longitude: 77.0542,
        description: 'Historic museum displaying century-old tea manufacturing machinery and tea tasting.',
        category: 'Heritage & Culture',
        entryFee: 150,
        suggestedTimeHours: 1.5
      },
      {
        id: 'munnar-4',
        name: 'Top Station',
        destinationId: 'munnar',
        latitude: 10.1243,
        longitude: 77.2447,
        description: 'Highest viewpoint on the Munnar-Kodaikanal road offering panoramic views of the Western Ghats.',
        category: 'Viewpoint',
        entryFee: 30,
        suggestedTimeHours: 2
      }
    ],
    estimatedBudgetRange: {
      min: 7500,
      max: 18000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Hill Station', 'Nature', 'Wildlife', 'Romantic'],
    bestSeasonGuidance: 'September to March offers crisp, clear mountain weather. Monsoons (June-August) bring lush greenery but frequent ghat road landslides.',
    practicalTips: [
      'Ghat roads are winding; carry motion sickness remedies.',
      'Book Eravikulam National Park safari entry slots in advance via the official Kerala Forest portal.',
      'Evenings get cold (10°C-15°C); pack a light fleece or warm jacket.'
    ],
    sourceUrls: [
      { title: 'Kerala Tourism Official Portal - Munnar', url: 'https://www.keralatourism.org/destination/munnar/202' },
      { title: 'Incredible India - Munnar Overview', url: 'https://www.incredibleindia.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616388969587-8196f32388b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 's1', name: 'Tata General Hospital Munnar', type: 'hospital', latitude: 10.0820, longitude: 77.0610, address: 'Nullatanni, Munnar', contact: '+91 4865 230222', distanceKm: 1.2 },
      { id: 's2', name: 'Munnar Police Station', type: 'police', latitude: 10.0860, longitude: 77.0630, address: 'Old Munnar Town', contact: '112 / +91 4865 230321', distanceKm: 0.8 },
      { id: 's3', name: 'HP Petrol Pump Munnar Town', type: 'fuel', latitude: 10.0872, longitude: 77.0581, address: 'Main Bazaar, Munnar', distanceKm: 0.4 },
      { id: 's4', name: 'SBI ATM & Branch Munnar', type: 'atm', latitude: 10.0885, longitude: 77.0599, address: 'Munnar Town Center', distanceKm: 0.2 },
      { id: 's5', name: 'KSRTC Munnar Bus Station', type: 'bus', latitude: 10.0855, longitude: 77.0622, address: 'Main Road, Munnar', distanceKm: 0.7 }
    ],
    lastVerified: '2026-03-15'
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 11.4102,
    longitude: 76.6950,
    description: 'The Queen of Hill Stations in the Nilgiri hills, featuring the UNESCO Nilgiri Mountain Railway, colonial botanical gardens, and the tranquil Ooty Lake.',
    travelHighlights: [
      'Heritage ride on the Nilgiri Mountain Toy Train from Mettupalayam',
      'Vast Government Botanical Garden established in 1848',
      'Panoramic 360-degree vistas from Doddabetta Peak (2,637m)',
      'Boating and cycling along Ooty Lake and Pykara Waterfalls'
    ],
    popularAttractions: [
      {
        id: 'ooty-1',
        name: 'Government Botanical Garden',
        destinationId: 'ooty',
        latitude: 11.4180,
        longitude: 76.7118,
        description: 'Terraced garden housing over a thousand exotic flora species and a 20-million-year-old fossil tree trunk.',
        category: 'Gardens & Heritage',
        entryFee: 40,
        suggestedTimeHours: 2.5
      },
      {
        id: 'ooty-2',
        name: 'Doddabetta Peak',
        destinationId: 'ooty',
        latitude: 11.4010,
        longitude: 76.7358,
        description: 'Highest mountain peak in the Nilgiri Mountains with an observatory telescope house.',
        category: 'Viewpoint',
        entryFee: 20,
        suggestedTimeHours: 2
      },
      {
        id: 'ooty-3',
        name: 'Ooty Lake & Boathouse',
        destinationId: 'ooty',
        latitude: 11.4075,
        longitude: 76.6872,
        description: 'Artificial lake built by John Sullivan in 1824 with paddle and motorboats.',
        category: 'Leisure',
        entryFee: 30,
        suggestedTimeHours: 2
      },
      {
        id: 'ooty-4',
        name: 'Nilgiri Mountain Railway (Ooty Station)',
        destinationId: 'ooty',
        latitude: 11.4060,
        longitude: 76.6980,
        description: 'UNESCO World Heritage steam rack-railway connecting Mettupalayam, Coonoor and Ooty.',
        category: 'Heritage Train',
        entryFee: 205,
        suggestedTimeHours: 3
      }
    ],
    estimatedBudgetRange: {
      min: 6000,
      max: 16000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Hill Station', 'Heritage', 'Nature', 'Family'],
    bestSeasonGuidance: 'October to June provides pleasant daytime temperatures (15°C-22°C). Peak flower shows occur during May.',
    practicalTips: [
      'Book Nilgiri Mountain Railway tickets at least 60-90 days early on IRCTC.',
      'Expect heavy weekend traffic at Doddabetta and Botanical Garden during summer.',
      'Purchase homemade artisan Nilgiri chocolates and Nilgiri eucalyptus oil from certified co-operatives.'
    ],
    sourceUrls: [
      { title: 'Tamil Nadu Tourism - Ooty Hills', url: 'https://www.tamilnadutourism.tn.gov.in/destinations/ooty' },
      { title: 'Incredible India Nilgiri Guide', url: 'https://www.incredibleindia.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'ot-1', name: 'Government District Headquarter Hospital Ooty', type: 'hospital', latitude: 11.4110, longitude: 76.7020, address: 'Hospital Road, Ooty', contact: '+91 423 2442212', distanceKm: 1.0 },
      { id: 'ot-2', name: 'Ooty Town Police Station', type: 'police', latitude: 11.4080, longitude: 76.6990, address: 'Commercial Road, Ooty', contact: '+91 423 2442222', distanceKm: 0.6 },
      { id: 'ot-3', name: 'Indian Oil Petrol Station', type: 'fuel', latitude: 11.4055, longitude: 76.6965, address: 'Near Railway Station, Ooty', distanceKm: 0.5 },
      { id: 'ot-4', name: 'Udagamandalam Railway Station', type: 'railway', latitude: 11.4062, longitude: 76.6983, address: 'Railway Station Road, Ooty', distanceKm: 0.4 }
    ],
    lastVerified: '2026-02-20'
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 10.2381,
    longitude: 77.4892,
    description: 'The Princess of Hill Stations situated in the Palani Hills, renowned for its star-shaped Kodai Lake, forested walking trails, and cliff-edge viewpoints.',
    travelHighlights: [
      'Scenic star-shaped Kodaikanal Lake with cycling and rowing',
      'The Coaker’s Walk cliffside promenade with valley mist views',
      'Pillar Rocks granite cliffs and the hidden Guna Caves',
      'Bryant Park landscaped gardens and pine forests'
    ],
    popularAttractions: [
      {
        id: 'kodai-1',
        name: 'Kodaikanal Lake',
        destinationId: 'kodaikanal',
        latitude: 10.2325,
        longitude: 77.4860,
        description: 'Star-shaped lake in the heart of town offering pedal and row boating with bicycle tracks along its perimeter.',
        category: 'Leisure & Boating',
        entryFee: 40,
        suggestedTimeHours: 2.5
      },
      {
        id: 'kodai-2',
        name: 'Coaker\'s Walk',
        destinationId: 'kodaikanal',
        latitude: 10.2330,
        longitude: 77.4945,
        description: 'A 1-kilometer pedestrian path along steep slope ridges overlooking the plains and Pambar valley.',
        category: 'Viewpoint',
        entryFee: 30,
        suggestedTimeHours: 1.5
      },
      {
        id: 'kodai-3',
        name: 'Pillar Rocks',
        destinationId: 'kodaikanal',
        latitude: 10.2185,
        longitude: 77.4680,
        description: 'Three giant 122-meter vertical granite rock pillars towering over the misty chasm.',
        category: 'Nature & Geology',
        entryFee: 20,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 6500,
      max: 15500,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Hill Station', 'Nature', 'Romantic', 'Adventure'],
    bestSeasonGuidance: 'October to May features cool, clear days. June to September receives moderate to heavy monsoon rainfall.',
    practicalTips: [
      'Bicycle rentals near Kodai Lake cost around ₹50-₹100/hr.',
      'Check morning visibility forecast before visiting Coaker’s Walk for panoramic vistas.',
      'Carry umbrellas even in sunny months as light mountain drizzle is common.'
    ],
    sourceUrls: [
      { title: 'Tamil Nadu Tourism - Kodaikanal', url: 'https://www.tamilnadutourism.tn.gov.in/destinations/kodaikanal' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'kd-1', name: 'KHMS Hospital Kodaikanal', type: 'hospital', latitude: 10.2360, longitude: 77.4870, address: 'Seven Roads Junction, Kodaikanal', contact: '+91 4542 241254', distanceKm: 0.8 },
      { id: 'kd-2', name: 'Kodaikanal Police Station', type: 'police', latitude: 10.2370, longitude: 77.4880, address: 'Near Bus Stand, Kodaikanal', contact: '+91 4542 240222', distanceKm: 0.3 },
      { id: 'kd-3', name: 'Bharat Petroleum Kodaikanal', type: 'fuel', latitude: 10.2395, longitude: 77.4850, address: 'Laws Ghat Road, Kodaikanal', distanceKm: 0.9 },
      { id: 'kd-4', name: 'Kodaikanal Central Bus Stand', type: 'bus', latitude: 10.2365, longitude: 77.4885, address: 'Bazaar Road, Kodaikanal', distanceKm: 0.4 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'coorg',
    name: 'Coorg (Kodagu)',
    state: 'Karnataka',
    country: 'India',
    latitude: 12.4244,
    longitude: 75.7382,
    description: 'Known as the Scotland of India, Coorg is a verdant district renowned for its aromatic coffee plantations, Abbey Falls, and Tibetan Buddhist monasteries at Bylakuppe.',
    travelHighlights: [
      'Vast Arabica & Robusta coffee estate walks with spice plantations',
      'Namdroling Golden Temple Monastery in Bylakuppe',
      'Abbey Falls and Iruppu Falls in the Western Ghats',
      'Raja’s Seat sunset viewpoint and Madikeri Fort heritage'
    ],
    popularAttractions: [
      {
        id: 'coorg-1',
        name: 'Namdroling Monastery (Golden Temple)',
        destinationId: 'coorg',
        latitude: 12.4300,
        longitude: 75.9660,
        description: 'Largest teaching center of the Nyingma lineage of Tibetan Buddhism with 40-foot gilded statues.',
        category: 'Spiritual & Heritage',
        entryFee: 0,
        suggestedTimeHours: 2.5
      },
      {
        id: 'coorg-2',
        name: 'Abbey Falls',
        destinationId: 'coorg',
        latitude: 12.4542,
        longitude: 75.7198,
        description: 'Roaring waterfall nestled amidst dense coffee plantations and pepper vines.',
        category: 'Waterfall & Nature',
        entryFee: 15,
        suggestedTimeHours: 1.5
      },
      {
        id: 'coorg-3',
        name: 'Raja\'s Seat',
        destinationId: 'coorg',
        latitude: 12.4208,
        longitude: 75.7346,
        description: 'Historic garden pavilion used by the Kodagu kings to watch valley sunsets.',
        category: 'Viewpoint & Heritage',
        entryFee: 10,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 7000,
      max: 17000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Hill Station', 'Culture', 'Nature', 'Culinary'],
    bestSeasonGuidance: 'October to April provides cool coffee-flowering breezes (15°C-25°C). Monsoon season (June-September) is lush but receives intense precipitation.',
    practicalTips: [
      'Try authentic Kodava cuisine, especially Pandi curry and Akki rotti.',
      'Respect silence and prayer etiquette inside the Namdroling Monastery prayer halls.',
      'Buy freshly ground single-origin coffee beans and wild forest honey from local planters.'
    ],
    sourceUrls: [
      { title: 'Karnataka Tourism - Kodagu Guide', url: 'https://www.karnatakatourism.org' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f444856f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600100397608-f010f444856f?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'cg-1', name: 'District Hospital Madikeri', type: 'hospital', latitude: 12.4225, longitude: 75.7360, address: 'College Road, Madikeri', contact: '+91 8272 228345', distanceKm: 0.8 },
      { id: 'cg-2', name: 'Madikeri Town Police Station', type: 'police', latitude: 12.4230, longitude: 75.7390, address: 'Main Road, Madikeri', contact: '+91 8272 228333', distanceKm: 0.5 },
      { id: 'cg-3', name: 'Indian Oil Petrol Pump', type: 'fuel', latitude: 12.4210, longitude: 75.7410, address: 'Mysore Road, Madikeri', distanceKm: 1.1 },
      { id: 'cg-4', name: 'KSRTC Bus Stand Madikeri', type: 'bus', latitude: 12.4235, longitude: 75.7375, address: 'Madikeri Bus Stand', distanceKm: 0.3 }
    ],
    lastVerified: '2026-03-10'
  },
  {
    id: 'goa',
    name: 'Goa (North & South)',
    state: 'Goa',
    country: 'India',
    latitude: 15.2993,
    longitude: 74.1240,
    description: 'India’s premier coastal paradise featuring golden sandy shores, Portuguese baroque architecture, vibrant beach shacks, Dudhsagar falls, and fresh seafood.',
    travelHighlights: [
      'UNESCO heritage churches of Old Goa (Basilica of Bom Jesus)',
      'Sun-kissed beaches: Palolem, Vagator, Anjuna, and Morjim',
      'Historic 17th-century Fort Aguada and Chapora Fort overlooking Arabian Sea',
      'Thrilling watersports, night markets, and sunset river cruises'
    ],
    popularAttractions: [
      {
        id: 'goa-1',
        name: 'Basilica of Bom Jesus',
        destinationId: 'goa',
        latitude: 15.5009,
        longitude: 73.9116,
        description: 'UNESCO World Heritage church holding the sacred relics of St. Francis Xavier.',
        category: 'Heritage & Architecture',
        entryFee: 0,
        suggestedTimeHours: 2
      },
      {
        id: 'goa-2',
        name: 'Fort Aguada & Lighthouse',
        destinationId: 'goa',
        latitude: 15.4925,
        longitude: 73.7736,
        description: '17th-century Portuguese fortress and jail overlooking Sinquerim beach and the Mandovi river mouth.',
        category: 'Heritage & Ocean View',
        entryFee: 50,
        suggestedTimeHours: 2
      },
      {
        id: 'goa-3',
        name: 'Palolem Beach',
        destinationId: 'goa',
        latitude: 15.0100,
        longitude: 74.0232,
        description: 'Crescent-shaped serene beach in South Goa famous for calm waters and dolphin-watching tours.',
        category: 'Beach & Nature',
        entryFee: 0,
        suggestedTimeHours: 4
      },
      {
        id: 'goa-4',
        name: 'Dudhsagar Waterfalls',
        destinationId: 'goa',
        latitude: 15.3144,
        longitude: 74.3143,
        description: 'Four-tiered sea-of-milk waterfall cascading 310m through the Bhagwan Mahavir Wildlife Sanctuary.',
        category: 'Adventure Waterfall',
        entryFee: 500,
        suggestedTimeHours: 5
      }
    ],
    estimatedBudgetRange: {
      min: 10000,
      max: 25000,
      currency: 'INR'
    },
    recommendedDurationDays: 4,
    categories: ['Beach', 'Heritage', 'Nightlife', 'Culinary'],
    bestSeasonGuidance: 'November to February offers dry, breezy beach weather (20°C-31°C). Monsoons (June-September) showcase verdant waterfalls and quiet uncrowded charm.',
    practicalTips: [
      'Rent a two-wheeler (scooter) with an authorized yellow-on-black number plate and wear a helmet.',
      'Swim only in zones designated by lifeguards (Drishti Marine); observe red flag beach warnings.',
      'North Goa is livelier with nightlife; South Goa is peaceful and pristine.'
    ],
    sourceUrls: [
      { title: 'Goa Tourism Development Corporation', url: 'https://goatourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'goa-s1', name: 'Goa Medical College & Hospital (GMC)', type: 'hospital', latitude: 15.4610, longitude: 73.8600, address: 'Bambolim, Goa', contact: '+91 832 2458727', distanceKm: 4.5 },
      { id: 'goa-s2', name: 'Panaji Town Police Station', type: 'police', latitude: 15.4989, longitude: 73.8278, address: 'Panaji, Goa', contact: '+91 832 2420873', distanceKm: 2.1 },
      { id: 'goa-s3', name: 'Dabolim International Airport (GOI)', type: 'airport', latitude: 15.3808, longitude: 73.8314, address: 'Dabolim, South Goa', contact: '+91 832 2540806', distanceKm: 18.0 },
      { id: 'goa-s4', name: 'Madgaon Railway Junction', type: 'railway', latitude: 15.2736, longitude: 73.9789, address: 'Margao, South Goa', distanceKm: 12.0 }
    ],
    lastVerified: '2026-03-12'
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry (Puducherry)',
    state: 'Puducherry',
    country: 'India',
    latitude: 11.9416,
    longitude: 79.8083,
    description: 'A charming coastal union territory reflecting French colonial heritage, pastel villas, tree-lined boulevards, experimental township of Auroville, and seaside promenades.',
    travelHighlights: [
      'Stroll through the cobblestone White Town French Quarter',
      'Peaceful meditation at Sri Aurobindo Ashram and Matrimandir Auroville',
      'Seaside evening walk along the iconic Rock Beach Promenade',
      'Surfing and kayaking at Serenity Beach and Paradise Beach'
    ],
    popularAttractions: [
      {
        id: 'pondi-1',
        name: 'Promenade Beach (Rock Beach)',
        destinationId: 'pondicherry',
        latitude: 11.9333,
        longitude: 79.8358,
        description: '1.2 km pedestrian oceanfront flanked by French war memorial, Gandhi statue, and old lighthouse.',
        category: 'Promenade & Leisure',
        entryFee: 0,
        suggestedTimeHours: 2
      },
      {
        id: 'pondi-2',
        name: 'Matrimandir & Auroville',
        destinationId: 'pondicherry',
        latitude: 12.0070,
        longitude: 79.8105,
        description: 'Golden geodesic dome in universal township dedicated to human unity and peaceful meditation.',
        category: 'Spiritual & Architecture',
        entryFee: 0,
        suggestedTimeHours: 3.5
      },
      {
        id: 'pondi-3',
        name: 'Sri Aurobindo Ashram',
        destinationId: 'pondicherry',
        latitude: 11.9360,
        longitude: 79.8340,
        description: 'Spiritual community founded in 1926 by Sri Aurobindo and Mirra Alfassa (The Mother).',
        category: 'Spiritual Heritage',
        entryFee: 0,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 6000,
      max: 16000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Coastal', 'Heritage', 'Spiritual', 'Culinary'],
    bestSeasonGuidance: 'October to March offers pleasant coastal weather (21°C-30°C). April to June is hot and humid.',
    practicalTips: [
      'Rent a bicycle or vintage scooter to explore the French and Tamil quarters comfortably.',
      'Matrimandir inner chamber meditation requires booking passes in person 1-2 days ahead at the visitors centre.',
      'Rock Beach is closed to motorized vehicles from 6 PM to 7:30 AM daily.'
    ],
    sourceUrls: [
      { title: 'Puducherry Tourism Portal', url: 'https://pondytourism.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'pondi-s1', name: 'JIPMER Super Specialty Hospital', type: 'hospital', latitude: 11.9540, longitude: 79.7980, address: 'Gorimedu, Puducherry', contact: '+91 413 2272380', distanceKm: 3.5 },
      { id: 'pondi-s2', name: 'Grand Bazaar Police Station', type: 'police', latitude: 11.9340, longitude: 79.8310, address: 'MG Road, Puducherry', contact: '+91 413 2337144', distanceKm: 0.8 },
      { id: 'pondi-s3', name: 'Puducherry Railway Station', type: 'railway', latitude: 11.9280, longitude: 79.8280, address: 'Subbiah Salai, Puducherry', distanceKm: 1.2 }
    ],
    lastVerified: '2026-02-28'
  },
  {
    id: 'jaipur',
    name: 'Jaipur (Pink City)',
    state: 'Rajasthan',
    country: 'India',
    latitude: 26.9124,
    longitude: 75.7873,
    description: 'Capital of Rajasthan and UNESCO World Heritage City, famous for terra-cotta pink palaces, monumental hilltop forts, astronomical observatories, and vibrant bazaars.',
    travelHighlights: [
      'Majestic Amer Fort with Maota Lake reflection and Sheesh Mahal',
      'The iconic honeycomb facade of Hawa Mahal (Palace of Winds)',
      'UNESCO-listed astronomical instruments at Jantar Mantar',
      'City Palace royal museum and traditional block print textiles'
    ],
    popularAttractions: [
      {
        id: 'jai-1',
        name: 'Amer Fort',
        destinationId: 'jaipur',
        latitude: 26.9855,
        longitude: 75.8513,
        description: 'Imposing 16th-century fortress complex made of red sandstone and marble overlooking Maota Lake.',
        category: 'Fort & Heritage',
        entryFee: 100,
        suggestedTimeHours: 3.5
      },
      {
        id: 'jai-2',
        name: 'Hawa Mahal',
        destinationId: 'jaipur',
        latitude: 26.9239,
        longitude: 75.8267,
        description: 'Five-storey palace with 953 intricate jharokhas built for royal ladies to observe street festivals.',
        category: 'Palace Architecture',
        entryFee: 50,
        suggestedTimeHours: 1.5
      },
      {
        id: 'jai-3',
        name: 'Jantar Mantar',
        destinationId: 'jaipur',
        latitude: 26.9196,
        longitude: 75.8244,
        description: 'World’s largest stone sundial and astronomical instruments built by Maharaja Sawai Jai Singh II.',
        category: 'UNESCO Heritage & Science',
        entryFee: 50,
        suggestedTimeHours: 2
      }
    ],
    estimatedBudgetRange: {
      min: 8000,
      max: 22000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Heritage', 'Forts & Palaces', 'Culture', 'Shopping'],
    bestSeasonGuidance: 'October to March offers cool dry weather (10°C-26°C). Summers (April-June) reach 40°C+.',
    practicalTips: [
      'Buy the composite tourism ticket from Rajasthan Tourism covering Amer, Hawa Mahal, Jantar Mantar, and Albert Hall.',
      'Visit Amer Fort early at 8:00 AM or attend the evening sound and light show.',
      'Savor authentic Dal Baati Churma and Ghewar at heritage sweets shops.'
    ],
    sourceUrls: [
      { title: 'Rajasthan Tourism Official - Jaipur', url: 'https://www.tourism.rajasthan.gov.in/jaipur.html' },
      { title: 'Incredible India Jaipur Guide', url: 'https://www.incredibleindia.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'jai-s1', name: 'SMS Hospital (Sawai Man Singh)', type: 'hospital', latitude: 26.8990, longitude: 75.8160, address: 'JLN Marg, Jaipur', contact: '+91 141 2518224', distanceKm: 2.5 },
      { id: 'jai-s2', name: 'Manak Chowk Police Station', type: 'police', latitude: 26.9240, longitude: 75.8270, address: 'Near Badi Chaupar, Jaipur', contact: '+91 141 2603833', distanceKm: 0.2 },
      { id: 'jai-s3', name: 'Jaipur Junction Railway Station', type: 'railway', latitude: 26.9190, longitude: 75.7870, address: 'Station Road, Jaipur', distanceKm: 3.5 },
      { id: 'jai-s4', name: 'Jaipur International Airport (JAI)', type: 'airport', latitude: 26.8286, longitude: 75.8056, address: 'Sanganer, Jaipur', distanceKm: 11.0 }
    ],
    lastVerified: '2026-03-05'
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    latitude: 32.2432,
    longitude: 77.1892,
    description: 'High-altitude Himalayan resort town on the Beas River, serving as the gateway to Solang Valley adventures, Atal Tunnel, Rohtang Pass, and ancient wooden cedar temples.',
    travelHighlights: [
      'Solang Valley paragliding, zorbing, and winter snow skiing',
      'Drive through the world’s longest highway tunnel (Atal Tunnel, 9.02km)',
      'Ancient wooden Hadimba Temple set inside sacred deodar cedar forest',
      'Old Manali bohemian cafes, apple orchards, and Jogini Waterfall trek'
    ],
    popularAttractions: [
      {
        id: 'manali-1',
        name: 'Hadimba Devi Temple',
        destinationId: 'manali',
        latitude: 32.2483,
        longitude: 77.1706,
        description: '16th-century pagoda-style cedar temple dedicated to Hadimba Devi, set in Dhungri forest.',
        category: 'Heritage & Spiritual',
        entryFee: 0,
        suggestedTimeHours: 1.5
      },
      {
        id: 'manali-2',
        name: 'Solang Valley',
        destinationId: 'manali',
        latitude: 32.3167,
        longitude: 77.1575,
        description: 'Spectacular mountain valley renowned for summer adventure sports and winter snow activities.',
        category: 'Adventure & Snow',
        entryFee: 100,
        suggestedTimeHours: 4
      },
      {
        id: 'manali-3',
        name: 'Jogini Waterfalls',
        destinationId: 'manali',
        latitude: 32.2690,
        longitude: 77.1950,
        description: 'Picturesque cascading waterfall reachable via a scenic 3km nature trek from Vashisht village.',
        category: 'Trek & Nature',
        entryFee: 0,
        suggestedTimeHours: 3
      }
    ],
    estimatedBudgetRange: {
      min: 9000,
      max: 24000,
      currency: 'INR'
    },
    recommendedDurationDays: 4,
    categories: ['Himalayas', 'Adventure', 'Snow', 'Nature'],
    bestSeasonGuidance: 'October to June. December-February for heavy snow and skiing; March-June for pleasant summer weather (10°C-25°C). Monsoons (July-August) pose high landslide risk along NH-3.',
    practicalTips: [
      'Rohtang Pass entry requires an environmental permit from the Kullu District Administration website.',
      'Check Atal Tunnel winter weather advisories before traveling towards Lahaul/Sissu.',
      'Acclimatize properly and pack layered thermal clothing.'
    ],
    sourceUrls: [
      { title: 'Himachal Tourism Official - Manali', url: 'https://himachaltourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'manali-s1', name: 'Civil Hospital Manali', type: 'hospital', latitude: 32.2410, longitude: 77.1870, address: 'Mall Road, Manali', contact: '+91 1902 252327', distanceKm: 0.5 },
      { id: 'manali-s2', name: 'Manali Police Station', type: 'police', latitude: 32.2420, longitude: 77.1880, address: 'Model Town, Manali', contact: '+91 1902 252322', distanceKm: 0.3 },
      { id: 'manali-s3', name: 'Indian Oil Petrol Pump Manali', type: 'fuel', latitude: 32.2350, longitude: 77.1840, address: 'Rangri, Manali', distanceKm: 1.5 },
      { id: 'manali-s4', name: 'Manali Inter State Bus Terminal (ISBT)', type: 'bus', latitude: 32.2395, longitude: 77.1890, address: 'Mall Road, Manali', distanceKm: 0.6 }
    ],
    lastVerified: '2026-03-14'
  },
  {
    id: 'wayanad',
    name: 'Wayanad',
    state: 'Kerala',
    country: 'India',
    latitude: 11.6854,
    longitude: 76.1320,
    description: 'Enchanting hill district in northern Kerala, characterized by mist-clad peaks, prehistoric Edakkal rock engravings, wildlife sanctuaries, and cascading waterfalls.',
    travelHighlights: [
      'Prehistoric Neolithic petroglyphs at Edakkal Caves',
      'Banasura Sagar Dam — largest earth dam in India',
      'Spotting wild elephants in Wayanad Wildlife Sanctuary (Muthanga)',
      'Scenic trek to Chembra Peak and its heart-shaped lake'
    ],
    popularAttractions: [
      {
        id: 'wayanad-1',
        name: 'Edakkal Caves',
        destinationId: 'wayanad',
        latitude: 11.6288,
        longitude: 76.2347,
        description: 'Two natural caves atop Ambukuthi Mala showcasing rock carvings dating from 6000 BCE.',
        category: 'Prehistoric Archaeology',
        entryFee: 50,
        suggestedTimeHours: 3
      },
      {
        id: 'wayanad-2',
        name: 'Banasura Sagar Dam',
        destinationId: 'wayanad',
        latitude: 11.6698,
        longitude: 75.9575,
        description: 'India’s largest earthen dam with speedboating amidst submerged islands and mountain backdrop.',
        category: 'Dam & Boating',
        entryFee: 40,
        suggestedTimeHours: 2.5
      },
      {
        id: 'wayanad-3',
        name: 'Soochipara Waterfalls (Sentinel Rock)',
        destinationId: 'wayanad',
        latitude: 11.5120,
        longitude: 76.1600,
        description: 'Three-tiered waterfall descending through evergreen rainforest into a natural pool.',
        category: 'Waterfall',
        entryFee: 80,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 6500,
      max: 16500,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Nature', 'Wildlife', 'Adventure', 'Heritage'],
    bestSeasonGuidance: 'October to May offers pleasant trekking temperatures. Monsoon brings heavy rainfall (Western Ghats catchment).',
    practicalTips: [
      'Edakkal Caves involves a steep climb of over 300 steps; wear sturdy walking shoes.',
      'Night traffic through Bandipur/Wayanad forest borders is strictly restricted between 9 PM and 6 AM.',
      'Purchase organic Wayanad spices, bamboo crafts, and wild forest honey.'
    ],
    sourceUrls: [
      { title: 'Kerala Tourism Wayanad Guide', url: 'https://www.keralatourism.org/destination/wayanad/339' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'wy-s1', name: 'Wayanad District Hospital Mananthavady', type: 'hospital', latitude: 11.8020, longitude: 76.0040, address: 'Mananthavady, Wayanad', contact: '+91 4935 240223', distanceKm: 8.0 },
      { id: 'wy-s2', name: 'Kalpetta Police Station', type: 'police', latitude: 11.6110, longitude: 76.0820, address: 'Kalpetta, Wayanad', contact: '+91 4936 202229', distanceKm: 1.5 },
      { id: 'wy-s3', name: 'Kalpetta KSRTC Bus Station', type: 'bus', latitude: 11.6095, longitude: 76.0845, address: 'NH 766, Kalpetta', distanceKm: 1.2 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'mysuru',
    name: 'Mysuru (Mysore)',
    state: 'Karnataka',
    country: 'India',
    latitude: 12.2958,
    longitude: 76.6394,
    description: 'The City of Palaces and cultural capital of Karnataka, celebrated for the Indo-Saracenic Mysore Palace, Chamundi Hills, silk weaving, and royal Dasara heritage.',
    travelHighlights: [
      'Illuminated Mysore Palace with nearly 100,000 light bulbs on weekends',
      'Panoramic temple visit atop Chamundeshwari Temple on Chamundi Hills',
      'St. Philomena’s Neo-Gothic Cathedral and Devaraja Heritage Market',
      'Brindavan Gardens illuminated musical water fountains'
    ],
    popularAttractions: [
      {
        id: 'mys-1',
        name: 'Mysore Palace (Amba Vilas)',
        destinationId: 'mysuru',
        latitude: 12.3051,
        longitude: 76.6551,
        description: 'Exquisite royal residence of the Wadiyar dynasty showcasing stained glass, carved mahogany ceilings, and golden throne.',
        category: 'Palace & Heritage',
        entryFee: 100,
        suggestedTimeHours: 3
      },
      {
        id: 'mys-2',
        name: 'Chamundi Hills & Temple',
        destinationId: 'mysuru',
        latitude: 12.2749,
        longitude: 76.6708,
        description: 'Historic hilltop temple dedicated to Goddess Chamundeshwari with a monolithic 15-foot Nandi statue.',
        category: 'Spiritual & Viewpoint',
        entryFee: 0,
        suggestedTimeHours: 2.5
      },
      {
        id: 'mys-3',
        name: 'Brindavan Gardens',
        destinationId: 'mysuru',
        latitude: 12.4244,
        longitude: 76.5732,
        description: 'Terraced formal gardens below the Krishnarajasagara (KRS) Dam featuring musical fountains.',
        category: 'Gardens & Fountains',
        entryFee: 50,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 5500,
      max: 14000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Heritage', 'Palaces', 'Culture', 'Family'],
    bestSeasonGuidance: 'October to March offers pleasant temperatures (19°C-30°C). Mysore Dasara festival in October is world-famous.',
    practicalTips: [
      'Mysore Palace lights up on Sundays and public holidays from 7:00 PM to 7:45 PM.',
      'Purchase genuine Mysore Silk directly from the KSIC factory showroom on Mananthavady Road.',
      'Taste authentic Mysore Pak at Guru Sweets (the original birthplace of the dessert).'
    ],
    sourceUrls: [
      { title: 'Karnataka Tourism - Mysuru', url: 'https://www.karnatakatourism.org' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'mys-s1', name: 'K.R. Hospital (Government Medical College)', type: 'hospital', latitude: 12.3120, longitude: 76.6500, address: 'Irwin Road, Mysuru', contact: '+91 821 2520512', distanceKm: 1.0 },
      { id: 'mys-s2', name: 'Devaraja Police Station', type: 'police', latitude: 12.3080, longitude: 76.6510, address: 'Near Devaraja Market, Mysuru', contact: '+91 821 2418306', distanceKm: 0.6 },
      { id: 'mys-s3', name: 'Mysuru Junction Railway Station', type: 'railway', latitude: 12.3150, longitude: 76.6450, address: 'Medar Block, Mysuru', distanceKm: 1.5 }
    ],
    lastVerified: '2026-03-08'
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    country: 'India',
    latitude: 15.3350,
    longitude: 76.4600,
    description: 'UNESCO World Heritage open-air museum and 14th-century capital of the Vijayanagara Empire, featuring majestic boulder-strewn landscapes and monumental Dravidian ruins.',
    travelHighlights: [
      'Virupaksha Temple — still active after over 700 years',
      'Vittala Temple with its iconic Stone Chariot and musical pillars',
      'Coracle boat ride on the Tungabhadra River',
      'Sunset views over boulder fields from Matanga Hill'
    ],
    popularAttractions: [
      {
        id: 'hampi-1',
        name: 'Vittala Temple & Stone Chariot',
        destinationId: 'hampi',
        latitude: 15.3392,
        longitude: 76.4795,
        description: 'Architectural masterpiece housing the famous Stone Chariot (featured on the ₹50 banknote) and acoustic musical pillars.',
        category: 'UNESCO Monument',
        entryFee: 40,
        suggestedTimeHours: 3
      },
      {
        id: 'hampi-2',
        name: 'Virupaksha Temple',
        destinationId: 'hampi',
        latitude: 15.3352,
        longitude: 76.4608,
        description: 'Seventh-century temple complex dedicated to Lord Shiva with a 50-meter-high gopuram tower.',
        category: 'Spiritual Heritage',
        entryFee: 25,
        suggestedTimeHours: 2
      },
      {
        id: 'hampi-3',
        name: 'Matanga Hill',
        destinationId: 'hampi',
        latitude: 15.3320,
        longitude: 76.4680,
        description: 'Highest point in central Hampi offering panoramic sunrise and sunset views across the boulder landscape.',
        category: 'Viewpoint & Trek',
        entryFee: 0,
        suggestedTimeHours: 2
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 13000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Heritage', 'UNESCO World Heritage', 'Archaeology', 'Adventure'],
    bestSeasonGuidance: 'November to February is the ideal season (18°C-32°C). March-May is intensely hot with rocky heat reflection.',
    practicalTips: [
      'Rent a bicycle or electric scooter to explore the sprawling 41-square-kilometer archaeological zone.',
      'Wear slip-resistant footwear for climbing smooth granite boulders at Matanga Hill.',
      'Carry plenty of water and a sun hat as shade is minimal across the ruins.'
    ],
    sourceUrls: [
      { title: 'Archaeological Survey of India - Hampi', url: 'https://asi.nic.in' },
      { title: 'Karnataka Tourism Hampi', url: 'https://www.karnatakatourism.org' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f444856f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600100397608-f010f444856f?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'hmp-s1', name: 'Primary Health Centre Hampi', type: 'hospital', latitude: 15.3330, longitude: 76.4620, address: 'Near Hampi Bazaar, Hampi', contact: '+91 8394 241244', distanceKm: 0.4 },
      { id: 'hmp-s2', name: 'Hampi Police Outpost', type: 'police', latitude: 15.3340, longitude: 76.4610, address: 'Hampi Bazaar, Hampi', contact: '+91 8394 241233', distanceKm: 0.2 },
      { id: 'hmp-s3', name: 'Hosapete Railway Junction (HPT)', type: 'railway', latitude: 15.2750, longitude: 76.3920, address: 'Hosapete, Karnataka', distanceKm: 12.0 }
    ],
    lastVerified: '2026-03-02'
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 9.2876,
    longitude: 79.3129,
    description: 'Sacred island pilgrimage destination at the tip of the Indian peninsula, connected by the engineering wonder Pamban Bridge and home to the Ramanathaswamy Temple and Dhanushkodi ghost town.',
    travelHighlights: [
      'Ramanathaswamy Temple with the longest corridor of 1,212 carved pillars in the world',
      'Crossing the oceanic Pamban Sea Bridge',
      'Expedition to Dhanushkodi and Ram Setu (Adam\'s Bridge) vantage point',
      'Dr. APJ Abdul Kalam National Memorial'
    ],
    popularAttractions: [
      {
        id: 'ram-1',
        name: 'Ramanathaswamy Temple',
        destinationId: 'rameswaram',
        latitude: 9.2881,
        longitude: 79.3174,
        description: 'Historic Jyotirlinga temple boasting massive sculptured pillared corridors and 22 sacred theerthams (water wells).',
        category: 'Spiritual & Heritage',
        entryFee: 0,
        suggestedTimeHours: 3
      },
      {
        id: 'ram-2',
        name: 'Dhanushkodi & Arichal Munai',
        destinationId: 'rameswaram',
        latitude: 9.1790,
        longitude: 79.4180,
        description: 'Ruined township engulfed by the 1964 cyclone at the meeting point of the Bay of Bengal and Indian Ocean.',
        category: 'Ghost Town & Ocean Tip',
        entryFee: 0,
        suggestedTimeHours: 3
      },
      {
        id: 'ram-3',
        name: 'Pamban Rail & Road Bridge',
        destinationId: 'rameswaram',
        latitude: 9.2785,
        longitude: 79.2000,
        description: 'First sea bridge in India spanning 2.06 km across the Palk Strait.',
        category: 'Engineering & Ocean View',
        entryFee: 0,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 13000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Spiritual', 'Coastal', 'Heritage', 'Engineering'],
    bestSeasonGuidance: 'October to April provides comfortable coastal winds (22°C-31°C). Monsoons (October-December) bring Northeast monsoon sea swells.',
    practicalTips: [
      'Dress code inside Ramanathaswamy Temple requires traditional attire (dhoti/pants and saree/churidar).',
      'Dhanushkodi is best reached by four-wheel drive jeeps or government shuttle buses before 5:00 PM.',
      'Visit the Dr. APJ Abdul Kalam Memorial at Pei Karumbu for inspiring insights into India’s space pioneer.'
    ],
    sourceUrls: [
      { title: 'Tamil Nadu Tourism - Rameswaram', url: 'https://www.tamilnadutourism.tn.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'ram-s1', name: 'Government Hospital Rameswaram', type: 'hospital', latitude: 9.2890, longitude: 79.3100, address: 'Near Railway Station, Rameswaram', contact: '+91 4573 221233', distanceKm: 0.8 },
      { id: 'ram-s2', name: 'Rameswaram Town Police Station', type: 'police', latitude: 9.2865, longitude: 79.3140, address: 'East Car Street, Rameswaram', contact: '+91 4573 221223', distanceKm: 0.3 },
      { id: 'ram-s3', name: 'Rameswaram Railway Station (RMM)', type: 'railway', latitude: 9.2850, longitude: 79.3080, address: 'Station Road, Rameswaram', distanceKm: 0.9 }
    ],
    lastVerified: '2026-03-09'
  },
  {
    id: 'madurai',
    name: 'Madurai',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 9.9252,
    longitude: 78.1198,
    description: 'The ancient Cultural Capital of Tamil Nadu, centered around the stunning multi-hued gopurams of the historic Meenakshi Amman Temple and the grand Thirumalai Nayakkar Palace.',
    travelHighlights: [
      'Meenakshi Amman Temple with 14 colorful gopuram towers and Hall of 1,000 Pillars',
      'Thirumalai Nayakkar Mahal with giant stucco-decorated Italian-Dravidian pillars',
      'Vibrant night food walks tasting Jigarthanda, Bun Parotta, and Kari Dosai',
      'Gandhi Memorial Museum housed in the historic Rani Mangammal Palace'
    ],
    popularAttractions: [
      {
        id: 'mad-1',
        name: 'Meenakshi Amman Temple',
        destinationId: 'madurai',
        latitude: 9.9195,
        longitude: 78.1193,
        description: 'Monumental 2,500-year-old temple complex dedicated to Goddess Meenakshi and Sundareswarar with intricate Dravidian carvings.',
        category: 'Spiritual Heritage',
        entryFee: 50,
        suggestedTimeHours: 3.5
      },
      {
        id: 'mad-2',
        name: 'Thirumalai Nayakkar Mahal',
        destinationId: 'madurai',
        latitude: 9.9150,
        longitude: 78.1240,
        description: '17th-century palace built by King Thirumalai Nayak featuring massive circular pillars and light-and-sound shows.',
        category: 'Palace Heritage',
        entryFee: 30,
        suggestedTimeHours: 2
      }
    ],
    estimatedBudgetRange: {
      min: 4500,
      max: 12000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Heritage', 'Spiritual', 'Culinary', 'Culture'],
    bestSeasonGuidance: 'October to March offers moderate temperatures (22°C-32°C). April-June is hot with temperatures exceeding 38°C.',
    practicalTips: [
      'Mobile phones and cameras are prohibited inside the Meenakshi Temple inner shrine; secure lockers are available at the East Gate.',
      'Do not miss trying the cooling local specialty drink "Famous Jigarthanda" on East Marret Street.'
    ],
    sourceUrls: [
      { title: 'Tamil Nadu Tourism - Madurai', url: 'https://www.tamilnadutourism.tn.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'mad-s1', name: 'Government Rajaji Hospital', type: 'hospital', latitude: 9.9280, longitude: 78.1250, address: 'Panagal Road, Madurai', contact: '+91 452 2532535', distanceKm: 1.2 },
      { id: 'mad-s2', name: 'Madurai Junction Railway Station', type: 'railway', latitude: 9.9230, longitude: 78.1110, address: 'Railway Feeder Road, Madurai', distanceKm: 1.0 },
      { id: 'mad-s3', name: 'Madurai International Airport (IXM)', type: 'airport', latitude: 9.8345, longitude: 78.0934, address: 'Airport Road, Madurai', distanceKm: 11.5 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 8.0883,
    longitude: 77.5385,
    description: 'The southernmost tip of the Indian mainland, Triveni Sangam of the Arabian Sea, Indian Ocean, and Bay of Bengal, famous for simultaneous sunrise and sunset views.',
    travelHighlights: [
      'Vivekananda Rock Memorial and 133-foot Thiruvalluvar Statue on offshore rocky islets',
      'Triveni Sangam confluence where three oceans meet',
      'Bhagavathy Amman Temple at Cape Comorin',
      'Sunset Point and multi-colored sand beach'
    ],
    popularAttractions: [
      {
        id: 'kany-1',
        name: 'Vivekananda Rock Memorial',
        destinationId: 'kanyakumari',
        latitude: 8.0780,
        longitude: 77.5550,
        description: 'Monument built on an offshore rock where Swami Vivekananda attained spiritual enlightenment in 1892.',
        category: 'Memorial & Sea View',
        entryFee: 75,
        suggestedTimeHours: 2.5
      },
      {
        id: 'kany-2',
        name: 'Thiruvalluvar Statue',
        destinationId: 'kanyakumari',
        latitude: 8.0772,
        longitude: 77.5558,
        description: 'Colossal 133-foot stone sculpture honoring the ancient Tamil poet and philosopher Thiruvalluvar.',
        category: 'Monuments',
        entryFee: 50,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 13000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Coastal', 'Spiritual', 'Monuments', 'Geography'],
    bestSeasonGuidance: 'October to March offers cool ocean breezes. Chitra Pournami (Full Moon in April/May) allows viewing moonrise and sunset simultaneously.',
    practicalTips: [
      'Ferry boats to Vivekananda Rock run from 8:00 AM to 4:00 PM; arrive early to beat long queues.',
      'Wake up at 5:30 AM to catch the spectacular sunrise over the Bay of Bengal.'
    ],
    sourceUrls: [
      { title: 'Tamil Nadu Tourism - Kanyakumari', url: 'https://www.tamilnadutourism.tn.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'kny-s1', name: 'Government Hospital Kanyakumari', type: 'hospital', latitude: 8.0890, longitude: 77.5450, address: 'Kovalam Road, Kanyakumari', contact: '+91 4652 246222', distanceKm: 0.9 },
      { id: 'kny-s2', name: 'Kanyakumari Railway Station (CAPE)', type: 'railway', latitude: 8.0870, longitude: 77.5480, address: 'Railway Station Road', distanceKm: 0.7 }
    ],
    lastVerified: '2026-03-05'
  },
  {
    id: 'yercaud',
    name: 'Yercaud',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 11.7753,
    longitude: 78.2093,
    description: 'The Jewel of the Shevaroy Hills in the Eastern Ghats, celebrated for its quiet coffee plantations, cool climate, Emerald Lake boating, and Pagoda Point viewpoints.',
    travelHighlights: [
      'Emerald Lake (Yercaud Lake) boating surrounded by deer park and gardens',
      'Pagoda Point and Lady’s Seat sunset vantage points over Salem valley',
      'Kiliyur Falls cascading into a tranquil valley basin',
      'Shevaroy Temple at the highest altitude in the hills (1,620m)'
    ],
    popularAttractions: [
      {
        id: 'yer-1',
        name: 'Yercaud Emerald Lake',
        destinationId: 'yercaud',
        latitude: 11.7770,
        longitude: 78.2085,
        description: 'Serene natural mountain lake in the town center offering pedal and motor boating.',
        category: 'Lake & Boating',
        entryFee: 30,
        suggestedTimeHours: 2
      },
      {
        id: 'yer-2',
        name: 'Lady\'s Seat & Pagoda Point',
        destinationId: 'yercaud',
        latitude: 11.7680,
        longitude: 78.2160,
        description: 'Historic rock seat viewpoint equipped with viewing telescope overlooking Ghat hairpins.',
        category: 'Viewpoint',
        entryFee: 15,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 4500,
      max: 11500,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Hill Station', 'Nature', 'Quiet Getaway', 'Coffee'],
    bestSeasonGuidance: 'October to June provides mild, comfortable hill climate (13°C-25°C).',
    practicalTips: [
      'The 20-hairpin bend drive from Salem is well-paved and scenic; drive cautiously in fog.',
      'Pick up fresh black pepper, cardamoms, and coffee beans from local horticulture outlets.'
    ],
    sourceUrls: [
      { title: 'Tamil Nadu Tourism - Yercaud', url: 'https://www.tamilnadutourism.tn.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'yer-s1', name: 'Government Hospital Yercaud', type: 'hospital', latitude: 11.7760, longitude: 78.2110, address: 'Hospital Road, Yercaud', contact: '+91 4281 222233', distanceKm: 0.5 },
      { id: 'yer-s2', name: 'Yercaud Bus Stand', type: 'bus', latitude: 11.7750, longitude: 78.2080, address: 'Main Road, Yercaud', distanceKm: 0.3 }
    ],
    lastVerified: '2026-03-02'
  },
  {
    id: 'udaipur',
    name: 'Udaipur (City of Lakes)',
    state: 'Rajasthan',
    country: 'India',
    latitude: 24.5854,
    longitude: 73.7125,
    description: 'The Venice of the East, famed for shimmering Lake Pichola, the sprawling City Palace complex, romantic lakefront heritage hotels, and Rajput marble architecture.',
    travelHighlights: [
      'Boat cruise on Lake Pichola passing Taj Lake Palace and Jag Mandir',
      'Exploring the grand City Palace of Udaipur overlooking the lake',
      'Saheliyon-ki-Bari ornamental fountains and marble pavilions',
      'Monsoon Palace (Sajjangarh) sunset views over the Aravalli hills'
    ],
    popularAttractions: [
      {
        id: 'uda-1',
        name: 'City Palace of Udaipur',
        destinationId: 'udaipur',
        latitude: 24.5764,
        longitude: 73.6835,
        description: 'Largest royal palace complex in Rajasthan, built over 400 years with marble courtyards, mirrors, and murals.',
        category: 'Palace & Heritage',
        entryFee: 300,
        suggestedTimeHours: 3.5
      },
      {
        id: 'uda-2',
        name: 'Lake Pichola & Jag Mandir',
        destinationId: 'udaipur',
        latitude: 24.5710,
        longitude: 73.6780,
        description: 'Historic artificial freshwater lake featuring royal island palaces and sunset boat cruises.',
        category: 'Lake Boating',
        entryFee: 450,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 8500,
      max: 23000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Heritage', 'Lakes', 'Romantic', 'Architecture'],
    bestSeasonGuidance: 'October to March offers idyllic days (12°C-28°C). Monsoons replenish the lakes to full beauty.',
    practicalTips: [
      'Take the 5:00 PM sunset boat cruise from Rameshwar Ghat for best photos of the City Palace facade.',
      'Attend the evening Dharohar folk dance show at Bagore Ki Haveli.'
    ],
    sourceUrls: [
      { title: 'Rajasthan Tourism - Udaipur', url: 'https://www.tourism.rajasthan.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'ud-s1', name: 'Maharana Bhupal Hospital (MB Hospital)', type: 'hospital', latitude: 24.5890, longitude: 73.7020, address: 'Hospital Road, Udaipur', contact: '+91 294 2528811', distanceKm: 1.8 },
      { id: 'ud-s2', name: 'Udaipur City Railway Station', type: 'railway', latitude: 24.5730, longitude: 73.6980, address: 'Station Road, Udaipur', distanceKm: 2.0 },
      { id: 'ud-s3', name: 'Maharana Pratap Airport (UDR)', type: 'airport', latitude: 24.6177, longitude: 73.8961, address: 'Dabok, Udaipur', distanceKm: 22.0 }
    ],
    lastVerified: '2026-03-11'
  },
  {
    id: 'leh-ladakh',
    name: 'Leh-Ladakh',
    state: 'Ladakh',
    country: 'India',
    latitude: 34.1526,
    longitude: 77.5771,
    description: 'High-altitude cold desert plateau nestled between the Karakoram and Himalayan ranges, famed for dramatic lunar landscapes, turquoise Pangong Lake, and Buddhist gompas.',
    travelHighlights: [
      'The surreal changing blue shades of Pangong Tso Lake (4,250m)',
      'Crossing Khardung La Pass (5,359m) into the double-humped camel dunes of Nubra Valley',
      'Ancient cliffside monasteries: Thiksey, Hemis, and Diskit Gompa',
      'Magnetic Hill optical gravity phenomenon and Confluence of Indus and Zanskar rivers'
    ],
    popularAttractions: [
      {
        id: 'leh-1',
        name: 'Pangong Tso Lake',
        destinationId: 'leh-ladakh',
        latitude: 33.7595,
        longitude: 78.6674,
        description: 'Endorheic saltwater lake extending from Ladakh to Tibet, world-famous for crystal blue waters.',
        category: 'High Altitude Lake',
        entryFee: 0,
        suggestedTimeHours: 5
      },
      {
        id: 'leh-2',
        name: 'Thiksey Monastery',
        destinationId: 'leh-ladakh',
        latitude: 34.0578,
        longitude: 77.6669,
        description: 'Twelve-storey Gelug monastery resembling the Potala Palace of Lhasa with a 15m Maitreya Buddha statue.',
        category: 'Monastery & Heritage',
        entryFee: 50,
        suggestedTimeHours: 2.5
      },
      {
        id: 'leh-3',
        name: 'Khardung La Pass',
        destinationId: 'leh-ladakh',
        latitude: 34.2787,
        longitude: 77.6047,
        description: 'Historic high mountain pass connecting Leh to Nubra and Shyok valleys.',
        category: 'Mountain Pass',
        entryFee: 0,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 15000,
      max: 38000,
      currency: 'INR'
    },
    recommendedDurationDays: 6,
    categories: ['High Altitude', 'Himalayas', 'Adventure', 'Spiritual'],
    bestSeasonGuidance: 'May to September offers open mountain passes and pleasant daytime temperatures (15°C-22°C). High altitude winters freeze to -20°C.',
    practicalTips: [
      'CRITICAL: Rest completely for the first 24-48 hours upon flying into Leh (3,500m) to acclimatize and prevent Acute Mountain Sickness (AMS).',
      'Obtain Protected Area Permits (PAP / ILP) online through the Ladakh LAHDC portal for Nubra and Pangong.',
      'Only postpaid mobile SIM cards (BSNL/Airtel/Jio) function in Ladakh.'
    ],
    sourceUrls: [
      { title: 'Ladakh Tourism Official Portal', url: 'https://ladakh.nic.in/tourism/' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'leh-s1', name: 'SNM Hospital Leh (Sonam Norboo Memorial)', type: 'hospital', latitude: 34.1610, longitude: 77.5840, address: 'Hospital Road, Leh', contact: '+91 1982 252014', distanceKm: 1.0 },
      { id: 'leh-s2', name: 'Leh Police Station', type: 'police', latitude: 34.1630, longitude: 77.5860, address: 'Main Market, Leh', contact: '+91 1982 252200', distanceKm: 0.8 },
      { id: 'leh-s3', name: 'Kushok Bakula Rimpochee Airport (IXL)', type: 'airport', latitude: 34.1359, longitude: 77.5465, address: 'Airport Road, Leh', contact: '+91 1982 251781', distanceKm: 4.5 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    latitude: 30.0869,
    longitude: 78.2676,
    description: 'The Yoga Capital of the World and Himalayan gateway on the banks of the sacred Ganges River, renowned for river rafting, ashrams, and the evening Triveni Ghat Ganga Aarti.',
    travelHighlights: [
      'Spiritual evening Ganga Aarti with floating lamps at Parmarth Niketan and Triveni Ghat',
      'Thrilling white-water river rafting from Shivpuri through Grade III+ rapids',
      'Crossing historic suspension bridges Ram Jhula and Lakshman Jhula',
      'The Beatles Ashram (Chaurasi Kutia) adorned with vibrant murals'
    ],
    popularAttractions: [
      {
        id: 'rish-1',
        name: 'Parmarth Niketan & Ganga Aarti',
        destinationId: 'rishikesh',
        latitude: 30.1190,
        longitude: 78.3120,
        description: 'Largest ashram in Rishikesh hosting uplifting daily evening Ganga Aarti ceremonies on the riverbank.',
        category: 'Spiritual Heritage',
        entryFee: 0,
        suggestedTimeHours: 2.5
      },
      {
        id: 'rish-2',
        name: 'The Beatles Ashram (Chaurasi Kutia)',
        destinationId: 'rishikesh',
        latitude: 30.1120,
        longitude: 78.3140,
        description: 'Historic ashram where the Beatles studied Transcendental Meditation in 1968, set in Rajaji Tiger Reserve boundary.',
        category: 'Heritage & Art',
        entryFee: 150,
        suggestedTimeHours: 2.5
      },
      {
        id: 'rish-3',
        name: 'Shivpuri River Rafting',
        destinationId: 'rishikesh',
        latitude: 30.1380,
        longitude: 78.3890,
        description: 'Popular starting point for 16km white-water rafting downstream to Rishikesh.',
        category: 'Adventure Water',
        entryFee: 800,
        suggestedTimeHours: 3.5
      }
    ],
    estimatedBudgetRange: {
      min: 6000,
      max: 16000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Spiritual', 'Adventure', 'Himalayas', 'Wellness'],
    bestSeasonGuidance: 'September to November and March to May are ideal for rafting and yoga. Rafting is suspended during monsoons (July-August).',
    practicalTips: [
      'Book rafting only with operators certified by Uttarakhand Tourism having licensed safety kayakers.',
      'Rishikesh is a strictly vegetarian and non-alcoholic holy city.',
      'Be cautious around cheeky macaques near Ram Jhula bridge.'
    ],
    sourceUrls: [
      { title: 'Uttarakhand Tourism - Rishikesh Guide', url: 'https://uttarakhandtourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'rsh-s1', name: 'AIIMS Rishikesh (All India Institute of Medical Sciences)', type: 'hospital', latitude: 30.0750, longitude: 78.2880, address: 'Virbhadra Road, Rishikesh', contact: '+91 135 2462929', distanceKm: 3.0 },
      { id: 'rsh-s2', name: 'Muni Ki Reti Police Station', type: 'police', latitude: 30.1210, longitude: 78.3180, address: 'Tehri Garhwal, Rishikesh', contact: '+91 1378 262100', distanceKm: 1.0 },
      { id: 'rsh-s3', name: 'Yog Nagari Rishikesh Railway Station (YNRK)', type: 'railway', latitude: 30.0890, longitude: 78.2780, address: 'Rishikesh, Uttarakhand', distanceKm: 2.2 }
    ],
    lastVerified: '2026-03-04'
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    state: 'West Bengal',
    country: 'India',
    latitude: 27.0410,
    longitude: 88.2663,
    description: 'The Queen of the Hills in the Eastern Himalayas, world-renowned for Darjeeling tea, the UNESCO Himalayan Railway Toy Train, and dawn views of Mount Kanchenjunga from Tiger Hill.',
    travelHighlights: [
      'Golden sunrise illuminating Mount Kanchenjunga (8,586m) from Tiger Hill',
      'Historic joyride on the UNESCO World Heritage Darjeeling Himalayan Railway',
      'Tasting Muscatel tea at Happy Valley Tea Estate',
      'Visiting the Himalayan Mountaineering Institute and Padmaja Naidu Himalayan Zoo'
    ],
    popularAttractions: [
      {
        id: 'darj-1',
        name: 'Tiger Hill',
        destinationId: 'darjeeling',
        latitude: 26.9961,
        longitude: 88.2861,
        description: 'Iconic vantage point offering sunrise illumination of the Kanchenjunga snow massif.',
        category: 'Mountain Sunrise',
        entryFee: 50,
        suggestedTimeHours: 3
      },
      {
        id: 'darj-2',
        name: 'Darjeeling Himalayan Railway (Toy Train)',
        destinationId: 'darjeeling',
        latitude: 27.0360,
        longitude: 88.2630,
        description: 'Two-foot narrow gauge steam railway built in 1881 negotiating the Batasia Loop spiral.',
        category: 'UNESCO Heritage Train',
        entryFee: 1000,
        suggestedTimeHours: 2.5
      },
      {
        id: 'darj-3',
        name: 'Batasia Loop & War Memorial',
        destinationId: 'darjeeling',
        latitude: 27.0167,
        longitude: 88.2472,
        description: 'Dramatic railway spiral loop featuring landscaped gardens and Gorkha soldiers war memorial.',
        category: 'Viewpoint & Garden',
        entryFee: 20,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 7500,
      max: 18500,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Hill Station', 'Himalayas', 'Tea Estates', 'UNESCO Heritage'],
    bestSeasonGuidance: 'October to December and March to May provide crisp skies for mountain views. Monsoons (July-August) bring dense fog and landslides.',
    practicalTips: [
      'Leave for Tiger Hill by 4:00 AM to beat traffic for the sunrise show.',
      'Book Toy Train joy rides from Darjeeling to Ghum well in advance on IRCTC.',
      'Savor steaming hot Tibetan momos and Thukpa at Chowrasta Mall.'
    ],
    sourceUrls: [
      { title: 'West Bengal Tourism - Darjeeling', url: 'https://wbtourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'drj-s1', name: 'Darjeeling District Hospital (Eden Hospital)', type: 'hospital', latitude: 27.0430, longitude: 88.2680, address: 'Cart Road, Darjeeling', contact: '+91 354 2254218', distanceKm: 0.6 },
      { id: 'drj-s2', name: 'Sadar Police Station Darjeeling', type: 'police', latitude: 27.0420, longitude: 78.2650, address: 'Laden La Road, Darjeeling', contact: '+91 354 2254422', distanceKm: 0.4 },
      { id: 'drj-s3', name: 'Darjeeling Railway Station', type: 'railway', latitude: 27.0350, longitude: 88.2620, address: 'Hill Cart Road, Darjeeling', distanceKm: 0.8 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'varanasi',
    name: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    country: 'India',
    latitude: 25.3176,
    longitude: 82.9739,
    description: 'One of the world\'s oldest continually inhabited cities and the spiritual heart of India on the sacred Ganges, famous for ancient ghats, Kashi Vishwanath temple corridor, and evening Maha Aarti.',
    travelHighlights: [
      'Electrifying Dashashwamedh Ghat evening Ganga Aarti ceremony',
      'Dawn rowboat ride watching pilgrims bathe along 84 historic ghats',
      'The renovated Kashi Vishwanath Golden Temple Corridor',
      'Day trip to Sarnath where Lord Buddha preached his first sermon'
    ],
    popularAttractions: [
      {
        id: 'var-1',
        name: 'Dashashwamedh Ghat & Maha Aarti',
        destinationId: 'varanasi',
        latitude: 25.3072,
        longitude: 83.0105,
        description: 'Main ghat on the Ganges where Vedic priests perform the synchronized evening brass lamp rituals.',
        category: 'Spiritual Riverfront',
        entryFee: 0,
        suggestedTimeHours: 2.5
      },
      {
        id: 'var-2',
        name: 'Kashi Vishwanath Temple',
        destinationId: 'varanasi',
        latitude: 25.3109,
        longitude: 83.0107,
        description: 'Ancient Jyotirlinga temple dedicated to Lord Shiva, recently modernized with a grand direct corridor to the river.',
        category: 'Spiritual Heritage',
        entryFee: 0,
        suggestedTimeHours: 3
      },
      {
        id: 'var-3',
        name: 'Sarnath Deer Park & Dhamek Stupa',
        destinationId: 'varanasi',
        latitude: 25.3811,
        longitude: 83.0228,
        description: 'Historic Buddhist pilgrimage site housing the 34-meter Dhamek Stupa and the original Ashoka Lion Capital.',
        category: 'Buddhist Archaeology',
        entryFee: 25,
        suggestedTimeHours: 3
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 14000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Spiritual', 'Ancient Heritage', 'Riverfront', 'Culture'],
    bestSeasonGuidance: 'October to March offers cool comfortable days (12°C-28°C). Summers (April-June) are scorching hot.',
    practicalTips: [
      'Take a morning boat ride around 5:30 AM from Assi Ghat to Manikarnika Ghat.',
      'Strict security protocols are in effect at Kashi Vishwanath; leave electronics and metal items in hotel or cloakrooms.',
      'Indulge in Banarasi Malaiyo (winter milk froth) and famous Banarasi Paan.'
    ],
    sourceUrls: [
      { title: 'Uttar Pradesh Tourism - Varanasi', url: 'https://uptourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'var-s1', name: 'Sir Sunderlal Hospital (IMS BHU)', type: 'hospital', latitude: 25.2750, longitude: 82.9990, address: 'BHU Campus, Varanasi', contact: '+91 542 2369291', distanceKm: 3.5 },
      { id: 'var-s2', name: 'Dashashwamedh Police Station', type: 'police', latitude: 25.3090, longitude: 83.0080, address: 'Dashashwamedh, Varanasi', contact: '+91 542 2450123', distanceKm: 0.3 },
      { id: 'var-s3', name: 'Varanasi Junction (BSB)', type: 'railway', latitude: 25.3280, longitude: 82.9860, address: 'Cantonment, Varanasi', distanceKm: 3.2 },
      { id: 'var-s4', name: 'Lal Bahadur Shastri Airport (VNS)', type: 'airport', latitude: 25.4524, longitude: 82.8593, address: 'Babatpur, Varanasi', distanceKm: 22.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'shimla',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    country: 'India',
    latitude: 31.1048,
    longitude: 77.1734,
    description: 'Former summer capital of British India nestled among cedar forests, celebrated for its colonial heritage, pedestrianized Mall Road, Christ Church, and Himalayan mountain panoramas.',
    travelHighlights: [
      'Strolling along the heritage pedestrian Mall Road and The Ridge',
      'Neo-Gothic Christ Church constructed in 1857',
      'The monumental Viceregal Lodge (Rashtrapati Niwas) and gardens',
      'Ascending the Jakhoo Temple ropeway to see the 108-foot Hanuman statue'
    ],
    popularAttractions: [
      {
        id: 'shm-1',
        name: 'The Ridge & Christ Church',
        destinationId: 'shimla',
        latitude: 31.1042,
        longitude: 77.1751,
        description: 'Vast open pedestrian esplanade overlooking snow peaks with northern India\'s second oldest church.',
        category: 'Heritage Promenade',
        entryFee: 0,
        suggestedTimeHours: 2
      },
      {
        id: 'shm-2',
        name: 'Viceregal Lodge (IIAS)',
        destinationId: 'shimla',
        latitude: 31.1030,
        longitude: 77.1390,
        description: 'Elizabethan-revival stone mansion that served as the residence of the British Viceroy of India.',
        category: 'Colonial Heritage',
        entryFee: 50,
        suggestedTimeHours: 2.5
      },
      {
        id: 'shm-3',
        name: 'Jakhoo Hill & Ropeway',
        destinationId: 'shimla',
        latitude: 31.1010,
        longitude: 77.1850,
        description: 'Shimla\'s highest peak (2,455m) featuring an aerial ropeway and massive orange Hanuman statue.',
        category: 'Ropeway & Temple',
        entryFee: 500,
        suggestedTimeHours: 2
      }
    ],
    estimatedBudgetRange: {
      min: 7000,
      max: 18000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Hill Station', 'Colonial Heritage', 'Himalayas', 'Family'],
    bestSeasonGuidance: 'March to June for mild weather (15°C-28°C); December to February for winter snowfall. Monsoons (July-August) can trigger landslides on the Kalka-Shimla NH.',
    practicalTips: [
      'Take the Kalka-Shimla Toy Train for a leisurely scenic mountain ride across 102 tunnels.',
      'Keep personal items and eyeglasses secure from monkeys around Jakhoo Temple.',
      'Shimla Mall Road is completely vehicle-free; use the government municipal lift from Cart Road.'
    ],
    sourceUrls: [
      { title: 'Himachal Tourism - Shimla', url: 'https://himachaltourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'shm-s1', name: 'Indira Gandhi Medical College (IGMC) Shimla', type: 'hospital', latitude: 31.1090, longitude: 77.1820, address: 'Snowdon, Shimla', contact: '+91 177 2804251', distanceKm: 1.5 },
      { id: 'shm-s2', name: 'Sadar Police Station Shimla', type: 'police', latitude: 31.1020, longitude: 77.1720, address: 'Mall Road, Shimla', contact: '+91 177 2804103', distanceKm: 0.3 },
      { id: 'shm-s3', name: 'Shimla Railway Station', type: 'railway', latitude: 31.1030, longitude: 77.1630, address: 'Station Road, Shimla', distanceKm: 1.2 }
    ],
    lastVerified: '2026-03-06'
  },
  {
    id: 'alleppey',
    name: 'Alleppey (Alappuzha)',
    state: 'Kerala',
    country: 'India',
    latitude: 9.4981,
    longitude: 76.3388,
    description: 'The Venice of the East, famous for overnight luxury houseboat cruises through serene palm-fringed backwaters, paddy fields below sea level in Kuttanad, and Marari beach.',
    travelHighlights: [
      'Gliding through tranquil backwater canals on a traditional thatched Kettuvallam houseboat',
      'The agricultural miracle of Kuttanad farming below sea level',
      'Alappuzha Beach with its 150-year-old historic pier and lighthouse',
      'Watching or practicing snake boat racing along the Punnamada Lake'
    ],
    popularAttractions: [
      {
        id: 'alp-1',
        name: 'Vembanad Lake & Backwaters',
        destinationId: 'alleppey',
        latitude: 9.5833,
        longitude: 76.4167,
        description: 'Longest lake in India, offering traditional houseboat cruising through village lagoons and bird sanctuaries.',
        category: 'Backwater Cruising',
        entryFee: 1500,
        suggestedTimeHours: 6
      },
      {
        id: 'alp-2',
        name: 'Alappuzha Beach & Lighthouse',
        destinationId: 'alleppey',
        latitude: 9.4925,
        longitude: 76.3180,
        description: 'Coastal shoreline featuring a ruined colonial pier and climbing the striped maritime lighthouse.',
        category: 'Beach & Maritime',
        entryFee: 20,
        suggestedTimeHours: 2
      },
      {
        id: 'alp-3',
        name: 'Marari Beach',
        destinationId: 'alleppey',
        latitude: 9.6010,
        longitude: 76.2980,
        description: 'Peaceful fishing village beach lined with coconut palms and pristine sands.',
        category: 'Beach & Leisure',
        entryFee: 0,
        suggestedTimeHours: 3
      }
    ],
    estimatedBudgetRange: {
      min: 7500,
      max: 20000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Backwaters', 'Houseboat', 'Coastal', 'Culinary'],
    bestSeasonGuidance: 'September to March provides pleasant breezy weather (22°C-31°C). Monsoon season (June-August) transforms the canals into emerald waterways.',
    practicalTips: [
      'Book government-approved (DTPC accredited Gold/Silver category) houseboats with certified cooks.',
      'Savor Karimeen Pollichathu (pearl spot fish wrapped in banana leaf) cooked on board.',
      'For budget travel, take the Kerala State Water Transport Department (SWTD) ferry for just ₹15-₹30.'
    ],
    sourceUrls: [
      { title: 'Kerala Tourism - Alappuzha', url: 'https://www.keralatourism.org/destination/alappuzha/205' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'alp-s1', name: 'General Hospital Alappuzha', type: 'hospital', latitude: 9.4970, longitude: 76.3310, address: 'Iron Bridge, Alappuzha', contact: '+91 477 2253324', distanceKm: 0.8 },
      { id: 'alp-s2', name: 'Alappuzha South Police Station', type: 'police', latitude: 9.4950, longitude: 76.3340, address: 'Near Beach Road, Alappuzha', contact: '+91 477 2251444', distanceKm: 0.5 },
      { id: 'alp-s3', name: 'Alappuzha Railway Station (ALLP)', type: 'railway', latitude: 9.5050, longitude: 76.3260, address: 'Railway Station Road', distanceKm: 1.5 }
    ],
    lastVerified: '2026-03-07'
  },
  {
    id: 'shillong',
    name: 'Shillong',
    state: 'Meghalaya',
    country: 'India',
    latitude: 25.5788,
    longitude: 91.8933,
    description: 'The Scotland of the East and capital of Meghalaya, celebrated for rolling pine hills, living root bridges, Umiam Lake, and a vibrant rock music and cafe culture.',
    travelHighlights: [
      'Living root bridges crafted by Khasi tribes from ficus tree roots',
      'Water sports and tranquil vistas at Umiam Lake (Barapani)',
      'Elephant Falls three-tiered cascading water sheets',
      'Day trip to Cherrapunji (Sohra) and the plunging Nohkalikai Falls'
    ],
    popularAttractions: [
      {
        id: 'shl-1',
        name: 'Elephant Falls',
        destinationId: 'shillong',
        latitude: 25.5350,
        longitude: 91.8250,
        description: 'Iconic mountain waterfall cascading across three successive rock tiers nestled in lush ferns.',
        category: 'Waterfall',
        entryFee: 30,
        suggestedTimeHours: 2
      },
      {
        id: 'shl-2',
        name: 'Umiam Lake',
        destinationId: 'shillong',
        latitude: 25.6560,
        longitude: 91.8990,
        description: 'Expansive reservoir framed by coniferous hills, offering boating, kayaking, and resort views.',
        category: 'Lake & Water Sports',
        entryFee: 20,
        suggestedTimeHours: 2.5
      },
      {
        id: 'shl-3',
        name: 'Don Bosco Museum',
        destinationId: 'shillong',
        latitude: 25.5990,
        longitude: 91.8960,
        description: 'Seven-storey hexagonal museum showcasing indigenous Northeast Indian tribal cultures and artifacts.',
        category: 'Tribal Culture Museum',
        entryFee: 100,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 8000,
      max: 20000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Northeast India', 'Hill Station', 'Tribal Culture', 'Nature'],
    bestSeasonGuidance: 'September to May provides pleasant weather (12°C-24°C). The monsoon season is world-famous for record rainfall in nearby Cherrapunji/Mawsynram.',
    practicalTips: [
      'Take a shared or private cab from Guwahati airport/railway station (approx. 3-4 hours via NH-6).',
      'Respect Khasi matrilineal customs and clean eco-regulations (Meghalaya is renowned for cleanliness).',
      'Visit Police Bazar for local warm shawls and ginger tea.'
    ],
    sourceUrls: [
      { title: 'Meghalaya Tourism Official', url: 'https://www.meghalayatourism.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'shl-s1', name: 'NEIGRIHMS Super Specialty Hospital', type: 'hospital', latitude: 25.5870, longitude: 91.9350, address: 'Mawdiangdiang, Shillong', contact: '+91 364 2538025', distanceKm: 6.0 },
      { id: 'shl-s2', name: 'Sadar Police Station Shillong', type: 'police', latitude: 25.5760, longitude: 91.8840, address: 'Police Bazar, Shillong', contact: '+91 364 2224400', distanceKm: 0.5 },
      { id: 'shl-s3', name: 'Shillong Airport (SHL - Umroi)', type: 'airport', latitude: 25.7036, longitude: 91.9789, address: 'Umroi, Meghalaya', distanceKm: 30.0 }
    ],
    lastVerified: '2026-03-03'
  },
  {
    id: 'chikmagalur',
    name: 'Chikmagalur',
    state: 'Karnataka',
    country: 'India',
    latitude: 13.3161,
    longitude: 75.7720,
    description: 'The Coffee Land of Karnataka in the Western Ghats, featuring Karnataka’s highest summit (Mullayanagiri, 1,930m), Baba Budangiri hills, and fragrant Robusta and Arabica plantations.',
    travelHighlights: [
      'Trek to Mullayanagiri Peak, the highest summit in Karnataka',
      'The sacred Baba Budangiri shrine where coffee seeds were first planted in India in 1670',
      'Cascading Hebbe Falls and Jhari (Buttermilk) Falls',
      'Coffee plantation home stays and estate tours'
    ],
    popularAttractions: [
      {
        id: 'ckm-1',
        name: 'Mullayanagiri Peak',
        destinationId: 'chikmagalur',
        latitude: 13.3917,
        longitude: 75.7214,
        description: 'Highest peak in Karnataka offering a brisk 500-step climb to the Shiva temple with mist-shrouded valley views.',
        category: 'Trek & Summit',
        entryFee: 0,
        suggestedTimeHours: 3
      },
      {
        id: 'ckm-2',
        name: 'Baba Budangiri (Dattatreya Peetha)',
        destinationId: 'chikmagalur',
        latitude: 13.4240,
        longitude: 75.7680,
        description: 'Sacred mountain range revered by both Hindus and Muslims, named after Sufi saint Baba Budan.',
        category: 'Spiritual & Mountain',
        entryFee: 0,
        suggestedTimeHours: 2.5
      },
      {
        id: 'ckm-3',
        name: 'Hebbe Falls',
        destinationId: 'chikmagalur',
        latitude: 13.5380,
        longitude: 75.7480,
        description: 'Exotic two-stage waterfall accessible via 4x4 forest jeep through coffee estates.',
        category: 'Waterfall',
        entryFee: 500,
        suggestedTimeHours: 3.5
      }
    ],
    estimatedBudgetRange: {
      min: 6500,
      max: 16000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Hill Station', 'Coffee Estates', 'Trekking', 'Nature'],
    bestSeasonGuidance: 'September to March offers pleasant weather (16°C-26°C). Monsoons (June-August) are heavy but turn the ghats emerald green.',
    practicalTips: [
      'Start Mullayanagiri trek early by 6:30 AM to catch the cloud bed before strong winds roll in.',
      'Hire a local 4WD jeep for Hebbe Falls as normal cars cannot handle the rocky jungle trail.',
      'Purchase fresh roasted coffee chicory blends from local family roasteries.'
    ],
    sourceUrls: [
      { title: 'Karnataka Tourism - Chikmagalur', url: 'https://www.karnatakatourism.org' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f444856f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600100397608-f010f444856f?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'ckm-s1', name: 'District Government Hospital Chikmagalur', type: 'hospital', latitude: 13.3180, longitude: 75.7750, address: 'Mallandur Road, Chikmagalur', contact: '+91 8262 230441', distanceKm: 0.8 },
      { id: 'ckm-s2', name: 'Chikmagalur Town Police Station', type: 'police', latitude: 13.3150, longitude: 75.7710, address: 'MG Road, Chikmagalur', contact: '+91 8262 230433', distanceKm: 0.4 },
      { id: 'ckm-s3', name: 'KSRTC Bus Stand Chikmagalur', type: 'bus', latitude: 13.3170, longitude: 75.7760, address: 'Bus Stand Road', distanceKm: 0.6 }
    ],
    lastVerified: '2026-03-08'
  },
  {
    id: 'gokarna',
    name: 'Gokarna',
    state: 'Karnataka',
    country: 'India',
    latitude: 14.5479,
    longitude: 74.3188,
    description: 'A tranquil coastal temple town known for pristine cliff-flanked beaches (Om Beach, Kudle Beach, Half Moon Beach) and the sacred Mahabaleshwar Temple.',
    travelHighlights: [
      'The natural Om-shaped coastline of Om Beach',
      'The scenic cliffside beach trek connecting Kudle, Om, Half Moon, and Paradise Beach',
      'Mahabaleshwar Temple housing the sacred Atmalinga',
      'Bioluminescence boat rides and beach camping'
    ],
    popularAttractions: [
      {
        id: 'gok-1',
        name: 'Om Beach',
        destinationId: 'gokarna',
        latitude: 14.5160,
        longitude: 74.3160,
        description: 'Coastline shaped naturally like the auspicious Hindu symbol ॐ, with rocky shores and beach cafes.',
        category: 'Beach & Cliffs',
        entryFee: 0,
        suggestedTimeHours: 3
      },
      {
        id: 'gok-2',
        name: 'Mahabaleshwar Temple',
        destinationId: 'gokarna',
        latitude: 14.5420,
        longitude: 74.3180,
        description: '4th-century CE temple dedicated to Lord Shiva, considered Dakshina Kashi.',
        category: 'Spiritual Heritage',
        entryFee: 0,
        suggestedTimeHours: 2
      },
      {
        id: 'gok-3',
        name: 'Kudle Beach',
        destinationId: 'gokarna',
        latitude: 14.5260,
        longitude: 74.3140,
        description: 'Sprawling golden sand beach surrounded by palm-fringed hillocks, ideal for sunsets and quiet relaxation.',
        category: 'Beach & Sunset',
        entryFee: 0,
        suggestedTimeHours: 3
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 14000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Coastal', 'Beach Trekking', 'Spiritual', 'Relaxation'],
    bestSeasonGuidance: 'October to March offers dry sunny days and gentle sea waves (22°C-31°C).',
    practicalTips: [
      'Do the 5-beach cliff trek in the late afternoon (starting 3:30 PM) to avoid midday heat.',
      'Respect sacred temple rules: men must wear dhotis (no shirts allowed in inner sanctum).',
      'Take boats between Om Beach and Paradise Beach if you prefer not to hike back over the rocks.'
    ],
    sourceUrls: [
      { title: 'Karnataka Tourism - Gokarna', url: 'https://www.karnatakatourism.org' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'gok-s1', name: 'Primary Health Centre Gokarna', type: 'hospital', latitude: 14.5440, longitude: 74.3210, address: 'Near Main Temple, Gokarna', contact: '+91 8386 256230', distanceKm: 0.5 },
      { id: 'gok-s2', name: 'Gokarna Police Station', type: 'police', latitude: 14.5460, longitude: 74.3230, address: 'Car Street, Gokarna', contact: '+91 8386 256233', distanceKm: 0.6 },
      { id: 'gok-s3', name: 'Gokarna Road Railway Station (GOK)', type: 'railway', latitude: 14.5820, longitude: 74.3850, address: 'Konkan Railway, Gokarna', distanceKm: 9.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram (Mamallapuram)',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 12.6269,
    longitude: 80.1927,
    description: 'UNESCO World Heritage coastal town famous for 7th-century Pallava rock-cut monolithic sanctuaries, the iconic Shore Temple on the Bay of Bengal, and stone carving artisans.',
    travelHighlights: [
      'Shore Temple perched directly on the Bay of Bengal shoreline',
      'Pancha Rathas — monolithic rock chariot shrines carved from granite outcrops',
      'Descent of the Ganges (Arjuna’s Penance) open-air bas-relief sculpture',
      'Krishna’s Butter Ball giant precarious balancing granite boulder'
    ],
    popularAttractions: [
      {
        id: 'mah-1',
        name: 'Shore Temple',
        destinationId: 'mahabalipuram',
        latitude: 12.6163,
        longitude: 80.1983,
        description: 'Eighth-century structural stone temple dedicated to Shiva and Vishnu, surviving centuries of sea spray.',
        category: 'UNESCO Monument',
        entryFee: 40,
        suggestedTimeHours: 2
      },
      {
        id: 'mah-2',
        name: 'Pancha Rathas (Five Rathas)',
        destinationId: 'mahabalipuram',
        latitude: 12.6080,
        longitude: 80.1930,
        description: 'Five monolithic rock-cut shrines named after the Pandavas and Draupadi, showcasing early Dravidian temple designs.',
        category: 'Rock Architecture',
        entryFee: 40,
        suggestedTimeHours: 2
      },
      {
        id: 'mah-3',
        name: 'Krishna\'s Butter Ball',
        destinationId: 'mahabalipuram',
        latitude: 12.6190,
        longitude: 80.1920,
        description: 'Massive 250-ton balancing granite boulder resting on a 45-degree smooth rock slope.',
        category: 'Geological Wonder',
        entryFee: 0,
        suggestedTimeHours: 1
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 13500,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['UNESCO Heritage', 'Coastal', 'Archaeology', 'Artisan Crafts'],
    bestSeasonGuidance: 'November to February is the most comfortable coastal window (21°C-29°C).',
    practicalTips: [
      'The ASI composite ticket grants entry to both Shore Temple and Pancha Rathas on the same day.',
      'The town is an easy 1.5-hour drive from Chennai along the scenic East Coast Road (ECR).',
      'Watch living master sculptors carve granite statues in workshops along Five Rathas Road.'
    ],
    sourceUrls: [
      { title: 'Archaeological Survey of India - Mamallapuram', url: 'https://asi.nic.in' },
      { title: 'Tamil Nadu Tourism - Mahabalipuram', url: 'https://www.tamilnadutourism.tn.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'mah-s1', name: 'Government Primary Health Centre Mahabalipuram', type: 'hospital', latitude: 12.6250, longitude: 80.1910, address: 'Kovalam Road', contact: '+91 44 27442333', distanceKm: 0.4 },
      { id: 'mah-s2', name: 'Mahabalipuram Police Station', type: 'police', latitude: 12.6240, longitude: 80.1900, address: 'ECR Road', contact: '+91 44 27442220', distanceKm: 0.5 },
      { id: 'mah-s3', name: 'Mahabalipuram Bus Stand', type: 'bus', latitude: 12.6230, longitude: 80.1915, address: 'East Coast Road', distanceKm: 0.3 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer (The Golden City)',
    state: 'Rajasthan',
    country: 'India',
    latitude: 26.9157,
    longitude: 70.9083,
    description: 'The Golden City of the Thar Desert, distinguished by yellow sandstone architecture, the living Jaisalmer Fort (Sonar Qella), desert camel safaris, and carved havelis.',
    travelHighlights: [
      'Exploring the living medieval Jaisalmer Fort inhabited by 4,000 residents',
      'Sunset camel safari and glamping among the Sam Sand Dunes',
      'The intricate sandstone lattices of Patwon Ki Haveli and Salim Singh Ki Haveli',
      'Tranquil boating on Gadisar Lake surrounded by cenotaphs'
    ],
    popularAttractions: [
      {
        id: 'jsm-1',
        name: 'Jaisalmer Fort (Sonar Qella)',
        destinationId: 'jaisalmer',
        latitude: 26.9124,
        longitude: 70.9128,
        description: '12th-century UNESCO World Heritage living yellow sandstone fort rising out of the Thar Desert.',
        category: 'UNESCO Living Fort',
        entryFee: 100,
        suggestedTimeHours: 3.5
      },
      {
        id: 'jsm-2',
        name: 'Sam Sand Dunes',
        destinationId: 'jaisalmer',
        latitude: 26.8330,
        longitude: 70.5100,
        description: 'Vast undulating desert dunes offering sunset camel safaris, quad biking, and Kalbeliya folk dances.',
        category: 'Desert Safari',
        entryFee: 750,
        suggestedTimeHours: 4
      },
      {
        id: 'jsm-3',
        name: 'Patwon Ki Haveli',
        destinationId: 'jaisalmer',
        latitude: 26.9160,
        longitude: 70.9140,
        description: 'Cluster of five opulent havelis built by wealthy merchant Ghuman Chand Patwa with fine jharokha stonework.',
        category: 'Heritage Architecture',
        entryFee: 100,
        suggestedTimeHours: 2
      }
    ],
    estimatedBudgetRange: {
      min: 7500,
      max: 20000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Desert', 'Living Fort', 'Heritage', 'Culture'],
    bestSeasonGuidance: 'October to March offers cool desert days and crisp nights (8°C-25°C). The Desert Festival takes place in February. Summers exceed 45°C.',
    practicalTips: [
      'Pack warm winter layers for desert glamping as desert nights turn near-freezing.',
      'Check Gadisar Lake early in the morning for serene views and migratory waterbirds.',
      'Support local handicraft cooperatives for leatherwork and mirror-work tapestries.'
    ],
    sourceUrls: [
      { title: 'Rajasthan Tourism - Jaisalmer', url: 'https://www.tourism.rajasthan.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'jsm-s1', name: 'Jawahir District Hospital Jaisalmer', type: 'hospital', latitude: 26.9180, longitude: 70.9100, address: 'Near Fort Gate, Jaisalmer', contact: '+91 2992 252343', distanceKm: 0.6 },
      { id: 'jsm-s2', name: 'Kotwali Police Station Jaisalmer', type: 'police', latitude: 26.9150, longitude: 70.9110, address: 'Near Gopa Chowk', contact: '+91 2992 252233', distanceKm: 0.3 },
      { id: 'jsm-s3', name: 'Jaisalmer Railway Station (JSM)', type: 'railway', latitude: 26.9060, longitude: 70.9230, address: 'Station Road, Jaisalmer', distanceKm: 1.8 }
    ],
    lastVerified: '2026-03-05'
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    latitude: 27.1767,
    longitude: 78.0081,
    description: 'City of the iconic Taj Mahal on the Yamuna riverbank, featuring immense Mughal architectural achievements including Agra Fort and the nearby ghost city of Fatehpur Sikri.',
    travelHighlights: [
      'The Taj Mahal at sunrise — UNESCO World Heritage wonder of the world',
      'The massive red sandstone Agra Fort and Shah Jahan\'s marble quarters',
      'The deserted red sandstone Mughal capital of Fatehpur Sikri',
      'Mehtab Bagh moonlit garden across the Yamuna River'
    ],
    popularAttractions: [
      {
        id: 'agr-1',
        name: 'Taj Mahal',
        destinationId: 'agra',
        latitude: 27.1751,
        longitude: 78.0421,
        description: 'White marble mausoleum built by Mughal Emperor Shah Jahan for Mumtaz Mahal, acclaimed as the jewel of Muslim art in India.',
        category: 'World Wonder & UNESCO',
        entryFee: 50,
        suggestedTimeHours: 3.5
      },
      {
        id: 'agr-2',
        name: 'Agra Fort',
        destinationId: 'agra',
        latitude: 27.1795,
        longitude: 78.0211,
        description: 'Massive 16th-century Mughal fortress in red sandstone, home to Diwan-i-Am, Diwan-i-Khas, and Jahangir’s Palace.',
        category: 'UNESCO Fort',
        entryFee: 50,
        suggestedTimeHours: 2.5
      },
      {
        id: 'agr-3',
        name: 'Fatehpur Sikri',
        destinationId: 'agra',
        latitude: 27.0910,
        longitude: 77.6620,
        description: 'Imperial fortified city founded by Akbar the Great in 1571 with Buland Darwaza and Salim Chishti Dargah.',
        category: 'UNESCO Imperial City',
        entryFee: 50,
        suggestedTimeHours: 3.5
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 14000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['World Wonder', 'UNESCO Heritage', 'Mughal Architecture', 'History'],
    bestSeasonGuidance: 'October to March offers cool dry days (10°C-25°C). Taj Mahal is CLOSED on Fridays.',
    practicalTips: [
      'Taj Mahal is closed every Friday for prayers.',
      'Purchase tickets online via the ASI portal to skip long physical queues.',
      'Arrive at the East Gate by 5:45 AM for golden morning light and minimal crowds.'
    ],
    sourceUrls: [
      { title: 'Archaeological Survey of India - Taj Mahal', url: 'https://asi.nic.in' },
      { title: 'Incredible India - Agra', url: 'https://www.incredibleindia.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'agr-s1', name: 'SN Medical College & Hospital Agra', type: 'hospital', latitude: 27.1850, longitude: 78.0050, address: 'Moti Katra, Agra', contact: '+91 562 2260353', distanceKm: 2.0 },
      { id: 'agr-s2', name: 'Taj Ganj Police Station', type: 'police', latitude: 27.1690, longitude: 78.0410, address: 'Near South Gate Taj Mahal, Agra', contact: '+91 562 2226222', distanceKm: 0.5 },
      { id: 'agr-s3', name: 'Agra Cantt Railway Station (AGC)', type: 'railway', latitude: 27.1580, longitude: 77.9900, address: 'Cantt, Agra', distanceKm: 4.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'gangtok',
    name: 'Gangtok',
    state: 'Sikkim',
    country: 'India',
    latitude: 27.3389,
    longitude: 88.6065,
    description: 'The clean and serene capital of Sikkim, perched on a ridge at 1,650m overlooking the Kanchenjunga range, renowned for Buddhist monasteries, cable cars, and alpine flora.',
    travelHighlights: [
      'Rumtek Monastery — seat of the Karma Kagyu lineage',
      'The pedestrian promenade of MG Marg (India’s first litter-free zone)',
      'Excursion to high-altitude glacial Tsomgo (Changu) Lake (3,753m) and Baba Mandir',
      'Panoramic Gangtok Ropeway ride over the valley'
    ],
    popularAttractions: [
      {
        id: 'gtk-1',
        name: 'Rumtek Monastery',
        destinationId: 'gangtok',
        latitude: 27.3015,
        longitude: 88.5422,
        description: 'Historic Tibetan Buddhist monastery with golden stupas, rare thangkas, and monastic chanting halls.',
        category: 'Monastery & Heritage',
        entryFee: 10,
        suggestedTimeHours: 2.5
      },
      {
        id: 'gtk-2',
        name: 'Tsomgo (Changu) Lake',
        destinationId: 'gangtok',
        latitude: 27.3742,
        longitude: 88.7619,
        description: 'Glacial alpine lake sacred to locals, surrounded by snow peaks and decorated yak rides.',
        category: 'Glacial Alpine Lake',
        entryFee: 0,
        suggestedTimeHours: 4
      },
      {
        id: 'gtk-3',
        name: 'MG Marg Promenade',
        destinationId: 'gangtok',
        latitude: 27.3310,
        longitude: 88.6130,
        description: 'Cobblestone pedestrian mall free of vehicles, smoking, and trash, with vibrant cafes and souvenir shops.',
        category: 'Promenade & Dining',
        entryFee: 0,
        suggestedTimeHours: 2
      }
    ],
    estimatedBudgetRange: {
      min: 8000,
      max: 21000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Himalayas', 'Eco-Tourism', 'Monasteries', 'Northeast India'],
    bestSeasonGuidance: 'March to May brings blooming rhododendrons (12°C-22°C); October to December offers crisp snow mountain vistas. Monsoons (July-August) cause road blocks along Teesta Highway.',
    practicalTips: [
      'Permits for Tsomgo Lake and Nathu La Pass must be processed through registered Sikkim travel agents with passport photos and ID proof.',
      'Gangtok strictly enforces no-plastic and no-smoking laws on MG Marg with fines.',
      'Savor authentic Sikkimese Thukpa, Gundruk, and churpi soup.'
    ],
    sourceUrls: [
      { title: 'Sikkim Tourism Official Portal', url: 'https://www.sikkimtourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'gtk-s1', name: 'STNM Multi Specialty Hospital Sochakgang', type: 'hospital', latitude: 27.3200, longitude: 88.5950, address: 'Sochakgang, Gangtok', contact: '+91 3592 202944', distanceKm: 2.8 },
      { id: 'gtk-s2', name: 'Sadar Police Station Gangtok', type: 'police', latitude: 27.3320, longitude: 88.6110, address: 'Near MG Marg, Gangtok', contact: '+91 3592 202022', distanceKm: 0.3 },
      { id: 'gtk-s3', name: 'Pakyong Airport (PYG)', type: 'airport', latitude: 27.2280, longitude: 88.5870, address: 'Pakyong, Sikkim', distanceKm: 28.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'varkala',
    name: 'Varkala',
    state: 'Kerala',
    country: 'India',
    latitude: 8.7379,
    longitude: 76.7163,
    description: 'A striking coastal haven famous for dramatic red laterite cliffs jutting directly over the Arabian Sea, Papanasam Beach holy springs, yoga shalas, and coastal cafes.',
    travelHighlights: [
      'Sunset walks along the scenic Varkala North Cliff path lined with cafes',
      'The sacred waters of Papanasam Beach believed to wash away sins',
      'The 2,000-year-old Janardhana Swamy Temple',
      'Kayaking in the mangrove backwaters of Kappil Lake'
    ],
    popularAttractions: [
      {
        id: 'vrk-1',
        name: 'Varkala Cliff & Papanasam Beach',
        destinationId: 'varkala',
        latitude: 8.7340,
        longitude: 76.7030,
        description: 'Geological monument red cliff overlooking sandy beach and turquoise waters with bohemian open-air cafes.',
        category: 'Geological Cliff & Beach',
        entryFee: 0,
        suggestedTimeHours: 3.5
      },
      {
        id: 'vrk-2',
        name: 'Kappil Lake & Beach',
        destinationId: 'varkala',
        latitude: 8.7820,
        longitude: 76.6780,
        description: 'Scenic point where the backwater lake and Arabian sea are separated only by a narrow coastal road.',
        category: 'Backwater & Sea',
        entryFee: 0,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 5500,
      max: 15000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Coastal', 'Cliffs', 'Yoga & Wellness', 'Beaches'],
    bestSeasonGuidance: 'November to March is the best cliffside season (22°C-31°C).',
    practicalTips: [
      'Take care when walking down the cliff steps to the beach after sunset.',
      'Rent a bicycle to ride north along the coastal road toward Kappil Lake.',
      'Enjoy fresh local seafood cooked to order with Kerala coconut spices.'
    ],
    sourceUrls: [
      { title: 'Kerala Tourism - Varkala', url: 'https://www.keralatourism.org/destination/varkala-beach/326' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'vrk-s1', name: 'Taluk Hospital Varkala', type: 'hospital', latitude: 8.7350, longitude: 76.7190, address: 'Hospital Road, Varkala', contact: '+91 470 2602244', distanceKm: 1.0 },
      { id: 'vrk-s2', name: 'Varkala Police Station', type: 'police', latitude: 8.7360, longitude: 76.7180, address: 'Near Railway Station, Varkala', contact: '+91 470 2602333', distanceKm: 0.9 },
      { id: 'vrk-s3', name: 'Varkala Sivagiri Railway Station (VAK)', type: 'railway', latitude: 8.7330, longitude: 76.7210, address: 'Station Road, Varkala', distanceKm: 1.2 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'mount-abu',
    name: 'Mount Abu',
    state: 'Rajasthan',
    country: 'India',
    latitude: 24.5926,
    longitude: 72.7156,
    description: 'The sole hill station of Rajasthan in the Aravalli Range, celebrated for the extraordinarily intricate marble carvings of the Dilwara Jain Temples, Nakki Lake boating, and Guru Shikhar peak.',
    travelHighlights: [
      'The Dilwara Temples — supreme masterpiece of pure white marble carving (11th-13th century)',
      'Rowing and pedal boating on Nakki Lake with Toad Rock viewpoint',
      'Sunset Point overlooking the lush green Aravalli hills',
      'Guru Shikhar (1,722m) — the highest point in Rajasthan and Aravalli range'
    ],
    popularAttractions: [
      {
        id: 'mab-1',
        name: 'Dilwara Jain Temples',
        destinationId: 'mount-abu',
        latitude: 24.6060,
        longitude: 72.7230,
        description: 'Five world-famous marble temples renowned for astonishingly intricate ceilings, pillars, and doorways.',
        category: 'Marble Architecture',
        entryFee: 0,
        suggestedTimeHours: 2.5
      },
      {
        id: 'mab-2',
        name: 'Nakki Lake',
        destinationId: 'mount-abu',
        latitude: 24.5940,
        longitude: 72.7090,
        description: 'Picturesque sacred mountain lake surrounded by hillocks and gardens, with Toad Rock towering nearby.',
        category: 'Lake Boating',
        entryFee: 50,
        suggestedTimeHours: 2
      },
      {
        id: 'mab-3',
        name: 'Guru Shikhar',
        destinationId: 'mount-abu',
        latitude: 24.6500,
        longitude: 72.7780,
        description: 'Highest peak of the Aravalli Range housing the Dattatreya Temple and astronomical observatory.',
        category: 'Highest Peak',
        entryFee: 0,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 6000,
      max: 15500,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Hill Station', 'Marble Architecture', 'Spiritual', 'Lakes'],
    bestSeasonGuidance: 'October to March offers cool mountain days (12°C-26°C). Monsoons bring misty waterfalls to the arid region.',
    practicalTips: [
      'Photography and mobile phones are strictly prohibited inside the Dilwara Temples to preserve sanctity.',
      'Dress modestly for Dilwara; leather belts and shoes must be deposited outside.',
      'Take an evening stroll around the Nakki Lake market for Rajasthani handicrafts and rabdi sweets.'
    ],
    sourceUrls: [
      { title: 'Rajasthan Tourism - Mount Abu', url: 'https://www.tourism.rajasthan.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'mab-s1', name: 'Global Hospital & Research Centre', type: 'hospital', latitude: 24.5980, longitude: 72.7120, address: 'Delwara Road, Mount Abu', contact: '+91 2974 238347', distanceKm: 1.0 },
      { id: 'mab-s2', name: 'Mount Abu Police Station', type: 'police', latitude: 24.5930, longitude: 72.7080, address: 'Near Nakki Lake, Mount Abu', contact: '+91 2974 238233', distanceKm: 0.4 },
      { id: 'mab-s3', name: 'Abu Road Railway Station (ABR)', type: 'railway', latitude: 24.4820, longitude: 72.7830, address: 'Abu Road (Downhill)', distanceKm: 27.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    country: 'India',
    latitude: 31.6340,
    longitude: 74.8723,
    description: 'Spiritual and cultural capital of the Sikh faith, home to the glorious Golden Temple (Harmandir Sahib), the sacred Amrit Sarovar, Jallianwala Bagh, and the Wagah Border retreat ceremony.',
    travelHighlights: [
      'The Golden Temple illuminated at night reflecting in the sacred pool',
      'Experiencing the world\'s largest community free kitchen (Langar) feeding 100,000 daily',
      'The Beating Retreat ceremony at the Wagah-Attari India-Pakistan border',
      'Historic Jallianwala Bagh memorial and Partition Museum'
    ],
    popularAttractions: [
      {
        id: 'amr-1',
        name: 'Golden Temple (Harmandir Sahib)',
        destinationId: 'amritsar',
        latitude: 31.6200,
        longitude: 74.8765,
        description: 'Holiest Gurdwara of Sikhism covered with pure gold foil, surrounded by the sacred nectar tank.',
        category: 'Spiritual Center',
        entryFee: 0,
        suggestedTimeHours: 3.5
      },
      {
        id: 'amr-2',
        name: 'Wagah Border Beating Retreat',
        destinationId: 'amritsar',
        latitude: 31.6040,
        longitude: 74.5730,
        description: 'Daily military flag-lowering ceremonial parade conducted jointly by the Indian BSF and Pakistan Rangers.',
        category: 'Patriotic Ceremony',
        entryFee: 0,
        suggestedTimeHours: 3
      },
      {
        id: 'amr-3',
        name: 'Jallianwala Bagh',
        destinationId: 'amritsar',
        latitude: 31.6208,
        longitude: 74.8795,
        description: 'Historic public garden and national memorial commemorating victims of the 1919 massacre.',
        category: 'National Memorial',
        entryFee: 0,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 14000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Spiritual', 'History', 'Culinary', 'National Memorial'],
    bestSeasonGuidance: 'October to March offers crisp pleasant weather (6°C-24°C). Summers (May-June) are very hot.',
    practicalTips: [
      'Head coverings and removing shoes are mandatory inside the Golden Temple complex; scarves are provided free at the entrance.',
      'Arrive at Wagah Border by 3:00 PM to secure good stadium seats for the 4:30 PM parade.',
      'Do not leave Amritsar without trying authentic Amritsari Kulcha with Chole and thick sweet Lassi.'
    ],
    sourceUrls: [
      { title: 'Punjab Tourism - Amritsar', url: 'https://punjabtourism.punjab.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'amr-s1', name: 'Guru Nanak Dev Hospital Amritsar', type: 'hospital', latitude: 31.6420, longitude: 74.8620, address: 'Majitha Road, Amritsar', contact: '+91 183 2572111', distanceKm: 2.0 },
      { id: 'amr-s2', name: 'Kotwali Police Station Amritsar', type: 'police', latitude: 31.6220, longitude: 74.8740, address: 'Near Golden Temple, Amritsar', contact: '+91 183 2548222', distanceKm: 0.3 },
      { id: 'amr-s3', name: 'Amritsar Junction Railway Station (ASR)', type: 'railway', latitude: 31.6340, longitude: 74.8650, address: 'Station Road, Amritsar', distanceKm: 1.5 },
      { id: 'amr-s4', name: 'Sri Guru Ram Dass Jee International Airport (ATQ)', type: 'airport', latitude: 31.7096, longitude: 74.7973, address: 'Raja Sansi, Amritsar', distanceKm: 11.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore & Isha Yoga',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 11.0168,
    longitude: 76.9558,
    description: 'The Manchester of South India situated on the banks of Noyyal River, gateway to the Nilgiris and Anamalai Hills, home to the 112-foot Adiyogi Shiva statue and Dhyanalinga.',
    travelHighlights: [
      'Adiyogi Shiva 112-foot steel statue and Dhyanalinga Yogic Temple in the Velliangiri foothills',
      'Marudhamalai Murugan hilltop temple overlooking western ghats',
      'Siruvani Waterfalls known for the second tastiest sweet water in the world',
      'Gass Forest Museum and rich textile heritage'
    ],
    popularAttractions: [
      {
        id: 'cbe-1',
        name: 'Adiyogi & Isha Yoga Center',
        destinationId: 'coimbatore',
        latitude: 10.9730,
        longitude: 76.7404,
        description: 'Guinness World Record 112-foot bust of Lord Shiva and consecrated multi-religious Dhyanalinga meditation dome.',
        category: 'Yoga & Spiritual',
        entryFee: 0,
        suggestedTimeHours: 3.5
      },
      {
        id: 'cbe-2',
        name: 'Marudhamalai Temple',
        destinationId: 'coimbatore',
        latitude: 11.0450,
        longitude: 76.8520,
        description: 'Scenic 12th-century hill temple dedicated to Lord Murugan surrounded by medicinal herbs.',
        category: 'Hill Temple',
        entryFee: 0,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 4500,
      max: 13000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Spiritual', 'Yoga & Wellness', 'Western Ghats', 'Textiles'],
    bestSeasonGuidance: 'October to March offers pleasant tropical weather (18°C-30°C).',
    practicalTips: [
      'The Divya Darshanam laser and light sound show at Adiyogi runs every evening at 7:00 PM.',
      'City buses (14D) ply directly from Gandhipuram bus stand to Isha Yoga Center.'
    ],
    sourceUrls: [
      { title: 'Tamil Nadu Tourism - Coimbatore', url: 'https://www.tamilnadutourism.tn.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'cbe-s1', name: 'Coimbatore Medical College Hospital (CMCH)', type: 'hospital', latitude: 11.0020, longitude: 76.9660, address: 'Trichy Road, Coimbatore', contact: '+91 422 2301393', distanceKm: 1.5 },
      { id: 'cbe-s2', name: 'Coimbatore Junction Railway Station (CBE)', type: 'railway', latitude: 10.9980, longitude: 76.9630, address: 'Station Feeder Road', distanceKm: 1.2 },
      { id: 'cbe-s3', name: 'Coimbatore International Airport (CJB)', type: 'airport', latitude: 11.0298, longitude: 77.0434, address: 'Civil Aerodrome Post, Peelamedu', distanceKm: 9.5 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'kollam',
    name: 'Kollam (Quilon)',
    state: 'Kerala',
    country: 'India',
    latitude: 8.8932,
    longitude: 76.6141,
    description: 'The cashew capital of India on the shores of Ashtamudi Lake, southern gateway to Kerala’s backwaters, home to the historic Thangassery Lighthouse, and Munroe Island.',
    travelHighlights: [
      'Canoe cruise through the canals and coconut groves of Munroe Island',
      'Ashtamudi Lake — palm-shaped lake with 8 branches offering backwater cruises',
      'The 144-foot Thangassery Lighthouse built by the British in 1902',
      'Jatayu Earth\'s Center — world\'s largest bird sculpture (61m long)'
    ],
    popularAttractions: [
      {
        id: 'klm-1',
        name: 'Jatayu Earth\'s Center',
        destinationId: 'kollam',
        latitude: 8.8670,
        longitude: 76.8660,
        description: 'World\'s largest bird sculpture perched atop Chadayamangalam hill with cable car and adventure park.',
        category: 'Sculpture & Theme Park',
        entryFee: 450,
        suggestedTimeHours: 3.5
      },
      {
        id: 'klm-2',
        name: 'Munroe Island Backwater Canal',
        destinationId: 'kollam',
        latitude: 8.9880,
        longitude: 76.6120,
        description: 'Pristine island cluster at the confluence of Ashtamudi Lake and Kallada River, ideal for country craft canoe rides.',
        category: 'Canoe & Village Tourism',
        entryFee: 500,
        suggestedTimeHours: 3
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 13500,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Backwaters', 'Coastal', 'Eco-Tourism', 'Heritage'],
    bestSeasonGuidance: 'October to March offers cool coastal breezes (22°C-31°C).',
    practicalTips: [
      'Take the morning 6:30 AM sunrise canoe tour in Munroe Island to spot kingfishers and egrets.',
      'Book Jatayu Earth\'s Center cable car entry online in advance to avoid weekend queues.'
    ],
    sourceUrls: [
      { title: 'Kerala Tourism - Kollam', url: 'https://www.keralatourism.org/destination/kollam/262' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'klm-s1', name: 'District Hospital Kollam', type: 'hospital', latitude: 8.8920, longitude: 76.5980, address: 'Hospital Road, Kollam', contact: '+91 474 2793214', distanceKm: 1.2 },
      { id: 'klm-s2', name: 'Kollam East Police Station', type: 'police', latitude: 8.8910, longitude: 76.6020, address: 'Chinnakkada, Kollam', contact: '+91 474 2742055', distanceKm: 0.8 },
      { id: 'klm-s3', name: 'Kollam Junction Railway Station (QLN)', type: 'railway', latitude: 8.8870, longitude: 76.6050, address: 'Chinnakkada, Kollam', distanceKm: 1.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    state: 'Andhra Pradesh',
    country: 'India',
    latitude: 13.6288,
    longitude: 79.4192,
    description: 'Spiritual destination in the Seshachalam Hills, home to the sacred Sri Venkateswara Swamy Temple atop Tirumala, one of the most visited pilgrimage centers on earth.',
    travelHighlights: [
      'Sri Venkateswara Swamy Temple on the Seventh Peak (Venkatadri) of Tirumala',
      'The sacred Laddu Prasadam of Tirupati (GI Tagged)',
      'Silathoranam — natural arch geological monument',
      'Kapila Theertham sacred waterfall and Sri Padmavathi Ammavari Temple'
    ],
    popularAttractions: [
      {
        id: 'tpt-1',
        name: 'Tirumala Venkateswara Temple',
        destinationId: 'tirupati',
        latitude: 13.6833,
        longitude: 79.3472,
        description: 'Ancient Dravidian temple dedicated to Lord Venkateswara, famed for golden gopuram and sacred theerthams.',
        category: 'Spiritual Shrine',
        entryFee: 300,
        suggestedTimeHours: 4.5
      },
      {
        id: 'tpt-2',
        name: 'Silathoranam (Natural Arch)',
        destinationId: 'tirupati',
        latitude: 13.6910,
        longitude: 79.3520,
        description: 'Rare natural stone arch formed by weathering, dated to 2.5 billion years ago.',
        category: 'Geological Monument',
        entryFee: 0,
        suggestedTimeHours: 1.5
      }
    ],
    estimatedBudgetRange: {
      min: 4000,
      max: 12000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Spiritual', 'Hills', 'Heritage', 'Geology'],
    bestSeasonGuidance: 'September to March offers cool mountain climate (15°C-28°C). April-June is warm.',
    practicalTips: [
      'Book Special Entry Darshan (SED ₹300) tickets 2-3 months in advance via the official TTD portal (tirupatibalaji.ap.gov.in).',
      'Traditional dress code is strictly enforced: Dhoti/Kurta for men and Saree/Churidar with Dupatta for women.',
      'Electric buses operate regularly from Tirupati up the ghat roads to Tirumala.'
    ],
    sourceUrls: [
      { title: 'Tirumala Tirupati Devasthanams Official', url: 'https://www.tirupatibalaji.ap.gov.in' },
      { title: 'Andhra Pradesh Tourism - Tirupati', url: 'https://tourism.ap.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'tpt-s1', name: 'SVIMS Hospital (Sri Venkateswara Institute of Medical Sciences)', type: 'hospital', latitude: 13.6350, longitude: 79.4080, address: 'Alipiri Road, Tirupati', contact: '+91 877 2287777', distanceKm: 1.8 },
      { id: 'tpt-s2', name: 'Tirupati East Police Station', type: 'police', latitude: 13.6300, longitude: 79.4220, address: 'Bhavani Nagar, Tirupati', contact: '+91 877 2220100', distanceKm: 0.6 },
      { id: 'tpt-s3', name: 'Tirupati Main Railway Station (TPTY)', type: 'railway', latitude: 13.6260, longitude: 79.4200, address: 'Station Road, Tirupati', distanceKm: 0.5 },
      { id: 'tpt-s4', name: 'Tirupati International Airport (TIR)', type: 'airport', latitude: 13.6325, longitude: 79.5433, address: 'Renigunta, Tirupati', distanceKm: 14.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram (City of Thousand Temples)',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 12.8342,
    longitude: 79.7036,
    description: 'Ancient temple town and handloom weaving capital celebrated for UNESCO-listed Pallava architectural treasures, Kailasanathar temple, Ekambareswarar temple, and rich mulberry silk sarees.',
    travelHighlights: [
      'Kailasanathar Temple — oldest stone structure in Kanchipuram (685-705 CE)',
      'Ekambareswarar Temple representing the Earth element with a 3,500-year-old mango tree',
      'Varadharaja Perumal Temple with 100-pillared hall carved from single stones',
      'Visiting traditional handloom silk weaver co-operatives'
    ],
    popularAttractions: [
      {
        id: 'kch-1',
        name: 'Kailasanathar Temple',
        destinationId: 'kanchipuram',
        latitude: 12.8420,
        longitude: 79.6890,
        description: 'Pallava masterpiece dedicated to Shiva with fifty-eight small shrines enclosing the central sanctum.',
        category: 'Pallava Architecture',
        entryFee: 0,
        suggestedTimeHours: 2.5
      },
      {
        id: 'kch-2',
        name: 'Ekambareswarar Temple',
        destinationId: 'kanchipuram',
        latitude: 12.8470,
        longitude: 79.6990,
        description: 'Pancha Bhoota Sthalam representing the element Earth (Prithvi) with a 59-meter gopuram.',
        category: 'Spiritual Heritage',
        entryFee: 0,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 4000,
      max: 11000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Heritage', 'Spiritual', 'Handloom & Silk', 'Architecture'],
    bestSeasonGuidance: 'November to February is the most comfortable season (20°C-29°C).',
    practicalTips: [
      'Buy authentic Kanchipuram silk sarees directly from certified weaver cooperative societies (such as Co-optex or Kamakshi Society).',
      'Temples generally close between 12:30 PM and 4:00 PM; plan your visits during morning and late afternoon hours.'
    ],
    sourceUrls: [
      { title: 'Tamil Nadu Tourism - Kanchipuram', url: 'https://www.tamilnadutourism.tn.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'kch-s1', name: 'Government District Headquarters Hospital Kanchipuram', type: 'hospital', latitude: 12.8360, longitude: 79.7010, address: 'Railway Road, Kanchipuram', contact: '+91 44 27222224', distanceKm: 0.8 },
      { id: 'kch-s2', name: 'Kanchipuram Town Police Station', type: 'police', latitude: 12.8330, longitude: 79.7040, address: 'Near Bus Stand, Kanchipuram', contact: '+91 44 27222333', distanceKm: 0.3 },
      { id: 'kch-s3', name: 'Kanchipuram Railway Station (CJ)', type: 'railway', latitude: 12.8380, longitude: 79.7110, address: 'Station Road', distanceKm: 1.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'chattisgarh-bastar',
    name: 'Bastar & Chitrakote',
    state: 'Chhattisgarh',
    country: 'India',
    latitude: 19.2064,
    longitude: 81.7056,
    description: 'The tribal heartland of India, famed for the dramatic horseshoe-shaped Chitrakote Falls (the Niagara of India) on the Indravati River, dense sal forests, and ancient bell-metal Dhokra crafts.',
    travelHighlights: [
      'Chitrakote Falls — 300-meter-wide horseshoe waterfall on the Indravati River',
      'Tirathgarh Falls cascading inside Kanger Valley National Park',
      'The limestone stalactite formations of Kutumsar Caves',
      'Tribal weekly haats (markets) and bell-metal Dhokra metalcraft'
    ],
    popularAttractions: [
      {
        id: 'bst-1',
        name: 'Chitrakote Waterfalls',
        destinationId: 'chattisgarh-bastar',
        latitude: 19.2040,
        longitude: 81.7060,
        description: 'Widest waterfall in India dropping 29m across a curved cliff, illuminated with colorful lights at night.',
        category: 'Waterfall Wonder',
        entryFee: 0,
        suggestedTimeHours: 3.5
      },
      {
        id: 'bst-2',
        name: 'Tirathgarh Falls & Kanger Valley',
        destinationId: 'chattisgarh-bastar',
        latitude: 18.9140,
        longitude: 81.8620,
        description: 'Tiered waterfall cascading over granite blocks into the Mugabahar river gorge.',
        category: 'National Park & Waterfall',
        entryFee: 50,
        suggestedTimeHours: 3
      }
    ],
    estimatedBudgetRange: {
      min: 6000,
      max: 15000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Waterfalls', 'Tribal Culture', 'Wildlife', 'Offbeat'],
    bestSeasonGuidance: 'October to March offers pleasant weather and clear water. August-October showcases the waterfall in full monstrous roaring flood volume.',
    practicalTips: [
      'Fly or take a train to Jagdalpur or Raipur and travel down to Bastar.',
      'Purchase certified GI-tagged Bastar Iron and Dhokra bronze artwork directly from tribal artisans.',
      'Hire a local forest guide for exploring Kutumsar limestone caves.'
    ],
    sourceUrls: [
      { title: 'Chhattisgarh Tourism Board', url: 'https://www.chhattisgarhtourism.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'bst-s1', name: 'Late Baliram Kashyap Memorial Govt Medical College Jagdalpur', type: 'hospital', latitude: 19.0850, longitude: 82.0250, address: 'Dimrapal, Jagdalpur', contact: '+91 7782 231403', distanceKm: 32.0 },
      { id: 'bst-s2', name: 'Lohandiguda Police Station', type: 'police', latitude: 19.1670, longitude: 81.7780, address: 'Near Chitrakote, Bastar', contact: '+91 7782 245222', distanceKm: 9.0 },
      { id: 'bst-s3', name: 'Jagdalpur Railway Station (JDB)', type: 'railway', latitude: 19.0680, longitude: 82.0280, address: 'Station Road, Jagdalpur', distanceKm: 36.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'andaman-havelock',
    name: 'Andaman (Havelock & Neil)',
    state: 'Andaman & Nicobar Islands',
    country: 'India',
    latitude: 11.9761,
    longitude: 92.9876,
    description: 'Exotic emerald archipelago in the Bay of Bengal, famous for Radhanagar Beach (voted best beach in Asia), bioluminescent night kayaking, coral reef scuba diving, and Cellular Jail history.',
    travelHighlights: [
      'Sunset at Radhanagar Beach (Beach No. 7) with powdery white sands and clear blue waters',
      'Scuba diving and snorkeling among vibrant coral reefs at Elephant Beach',
      'Bioluminescent night kayaking through mangroves on Havelock Island',
      'The poignant Sound & Light show at Cellular Jail in Port Blair'
    ],
    popularAttractions: [
      {
        id: 'and-1',
        name: 'Radhanagar Beach',
        destinationId: 'andaman-havelock',
        latitude: 11.9840,
        longitude: 92.9520,
        description: 'World-renowned pristine white-sand beach bordered by lush tropical mahua trees and calm turquoise surf.',
        category: 'Beach of Asia',
        entryFee: 0,
        suggestedTimeHours: 4
      },
      {
        id: 'and-2',
        name: 'Elephant Beach',
        destinationId: 'andaman-havelock',
        latitude: 12.0120,
        longitude: 92.9640,
        description: 'Prime hub for water sports including sea walking, jet skiing, and snorkeling around shallow fringing reefs.',
        category: 'Water Sports & Reefs',
        entryFee: 0,
        suggestedTimeHours: 3.5
      },
      {
        id: 'and-3',
        name: 'Cellular Jail National Memorial',
        destinationId: 'andaman-havelock',
        latitude: 11.6740,
        longitude: 92.7480,
        description: 'Historic colonial prison in Port Blair where Indian freedom fighters were held in solitary confinement.',
        category: 'National Memorial',
        entryFee: 30,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 16000,
      max: 42000,
      currency: 'INR'
    },
    recommendedDurationDays: 5,
    categories: ['Islands', 'Beaches', 'Scuba Diving', 'National Memorial'],
    bestSeasonGuidance: 'October to May provides calm seas, clear underwater visibility (up to 30m), and warm sun (23°C-31°C). Monsoons bring heavy swells.',
    practicalTips: [
      'Book inter-island high-speed catamarans (Makruzz/Nautika) in advance between Port Blair and Havelock.',
      'Indian citizens do not require permits for Havelock/Neil; foreigners receive stamps on arrival.',
      'Do not touch or collect corals or seashells — severe penalties apply under wildlife protection laws.'
    ],
    sourceUrls: [
      { title: 'Andaman & Nicobar Tourism Official', url: 'https://www.andamantourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'and-s1', name: 'Primary Health Centre Havelock (Swaraj Dweep)', type: 'hospital', latitude: 11.9790, longitude: 92.9860, address: 'Village No. 3, Havelock', contact: '+91 3192 282205', distanceKm: 0.8 },
      { id: 'and-s2', name: 'Havelock Police Station', type: 'police', latitude: 11.9770, longitude: 92.9850, address: 'Havelock Jetty Road', contact: '+91 3192 282405', distanceKm: 0.6 },
      { id: 'and-s3', name: 'Havelock Island Ferry Jetty', type: 'bus', latitude: 11.9810, longitude: 92.9890, address: 'Swaraj Dweep Jetty', distanceKm: 0.5 },
      { id: 'and-s4', name: 'Veer Savarkar International Airport (IXZ - Port Blair)', type: 'airport', latitude: 11.6410, longitude: 92.7297, address: 'Lamba Line, Port Blair', distanceKm: 55.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    country: 'India',
    latitude: 32.2461,
    longitude: 78.0349,
    description: 'The Middle Land between Tibet and India, an alpine cold desert valley celebrated for thousand-year-old Key Monastery, Chandratal Lake, and the world\'s highest post office at Hikkim.',
    travelHighlights: [
      'Key Monastery fortress perched on a hill cone at 4,166m',
      'The moon-shaped turquoise Chandratal Lake (4,300m)',
      'Sending a postcard from Hikkim (world\'s highest post office at 4,400m)',
      'Fossil hunting in Langza village beneath the Chau Chau Kang Nilda peak'
    ],
    popularAttractions: [
      {
        id: 'spt-1',
        name: 'Key Monastery (Kye Gompa)',
        destinationId: 'spiti-valley',
        latitude: 32.2980,
        longitude: 78.0120,
        description: 'Spectacular Tibetan Buddhist monastery dating to the 11th century with historic murals and sacred texts.',
        category: 'Ancient Monastery',
        entryFee: 0,
        suggestedTimeHours: 3
      },
      {
        id: 'spt-2',
        name: 'Chandratal (Moon Lake)',
        destinationId: 'spiti-valley',
        latitude: 32.4820,
        longitude: 77.6180,
        description: 'Crescent-shaped high-altitude lake surrounded by scree peaks and alpine meadows.',
        category: 'Alpine Lake',
        entryFee: 0,
        suggestedTimeHours: 4
      }
    ],
    estimatedBudgetRange: {
      min: 14000,
      max: 32000,
      currency: 'INR'
    },
    recommendedDurationDays: 6,
    categories: ['Himalayas', 'High Altitude', 'Adventure', 'Offbeat'],
    bestSeasonGuidance: 'June to September when Kunzum Pass and Rohtang/Atal Tunnel routes are open. Winter temperatures plunge to -30°C.',
    practicalTips: [
      'Carry sufficient cash; the nearest reliable ATMs are in Kaza or Reckong Peo and power cuts are frequent.',
      'Allow gradual acclimatization to avoid AMS symptoms.',
      'Only BSNL postpaid connectivity works reliably throughout the valley.'
    ],
    sourceUrls: [
      { title: 'Himachal Tourism Spiti Guide', url: 'https://himachaltourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'spt-s1', name: 'Community Health Centre Kaza', type: 'hospital', latitude: 32.2270, longitude: 78.0720, address: 'Main Bazaar, Kaza', contact: '+91 1906 222215', distanceKm: 0.5 },
      { id: 'spt-s2', name: 'Police Station Kaza', type: 'police', latitude: 32.2280, longitude: 78.0730, address: 'Kaza, Spiti', contact: '+91 1906 222222', distanceKm: 0.4 },
      { id: 'spt-s3', name: 'Indian Oil Petrol Pump Kaza (World\'s Highest Retail Outlet)', type: 'fuel', latitude: 32.2290, longitude: 78.0750, address: 'Kaza Town', distanceKm: 0.6 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'kaziranga',
    name: 'Kaziranga National Park',
    state: 'Assam',
    country: 'India',
    latitude: 26.5775,
    longitude: 93.1711,
    description: 'UNESCO World Heritage wildlife sanctuary on the floodplains of the Brahmaputra River, harboring two-thirds of the world\'s great one-horned rhinoceroses, wild water buffalo, and royal Bengal tigers.',
    travelHighlights: [
      'Dawn elephant safari to view the Great Indian One-horned Rhinoceros up close',
      'Jeep safari through Bagori (Western) and Kohora (Central) wildlife ranges',
      'Spotting rare swamp deer (barasingha), wild elephants, and migratory waterbirds',
      'Kaziranga National Orchid and Biodiversity Park featuring 600 orchid varieties'
    ],
    popularAttractions: [
      {
        id: 'kzr-1',
        name: 'Kaziranga Western Range (Bagori)',
        destinationId: 'kaziranga',
        latitude: 26.5810,
        longitude: 93.1620,
        description: 'Prime wildlife safari sector offering highest density sightings of one-horned rhinos and wild elephants.',
        category: 'Wildlife Safari',
        entryFee: 350,
        suggestedTimeHours: 3.5
      },
      {
        id: 'kzr-2',
        name: 'Kaziranga National Orchid Park',
        destinationId: 'kaziranga',
        latitude: 26.5920,
        longitude: 93.3850,
        description: 'Vibrant biodiversity complex exhibiting wild orchids, indigenous medicinal plants, and traditional Assamese Bihu dance.',
        category: 'Flora & Culture',
        entryFee: 120,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 8000,
      max: 20000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Wildlife', 'UNESCO Heritage', 'Nature', 'Safari'],
    bestSeasonGuidance: 'November to April when the park is open for safaris (12°C-26°C). Park closes during monsoon flooding (May-October).',
    practicalTips: [
      'Book morning 5:30 AM elephant safaris one day in advance through the official forest counters in Kohora.',
      'Wear neutral muted clothing (olive, khaki) on safaris and avoid bright synthetic colors.',
      'Taste traditional Assamese Thali with Joha rice and pitika at local highway dhabas.'
    ],
    sourceUrls: [
      { title: 'Kaziranga National Park Official', url: 'https://kaziranga.assam.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'kzr-s1', name: 'First Referral Unit (FRU) Hospital Bokakhat', type: 'hospital', latitude: 26.6210, longitude: 93.5930, address: 'Bokakhat, Golaghat', contact: '+91 3776 268222', distanceKm: 22.0 },
      { id: 'kzr-s2', name: 'Kohora Police Outpost', type: 'police', latitude: 26.5860, longitude: 93.4110, address: 'Kohora, Kaziranga', contact: '+91 3776 262428', distanceKm: 0.5 },
      { id: 'kzr-s3', name: 'Jorhat Airport (JRH)', type: 'airport', latitude: 26.7319, longitude: 94.1755, address: 'Rowriah, Jorhat', distanceKm: 96.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho',
    state: 'Madhya Pradesh',
    country: 'India',
    latitude: 24.8318,
    longitude: 79.9199,
    description: 'UNESCO World Heritage monument group celebrated for extraordinary 10th-century Chandela dynasty sandstone temples adorned with sublime erotic sculptures and Nagara architectural craftsmanship.',
    travelHighlights: [
      'Kandariya Mahadeva Temple — pinnacle of medieval North Indian temple architecture',
      'The Western Group of Temples illuminated during the Khajuraho Dance Festival',
      'Lakshmana Temple with exquisite friezes depicting daily life, warfare, and devotion',
      'Panna National Park tiger safari and Raneh Falls canyon nearby'
    ],
    popularAttractions: [
      {
        id: 'khj-1',
        name: 'Western Group of Temples',
        destinationId: 'khajuraho',
        latitude: 24.8530,
        longitude: 79.9190,
        description: 'Fenced monument enclave containing the grandest Chandela temples including Kandariya Mahadeva, Jagadambi, and Chitragupta.',
        category: 'UNESCO Architecture',
        entryFee: 40,
        suggestedTimeHours: 3.5
      },
      {
        id: 'khj-2',
        name: 'Raneh Falls & Ken River Canyon',
        destinationId: 'khajuraho',
        latitude: 24.9350,
        longitude: 79.9920,
        description: 'Striking volcanic crystalline granite canyon with multi-hued rock walls along the Ken River.',
        category: 'Geological Wonder',
        entryFee: 65,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 5500,
      max: 14500,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['UNESCO Heritage', 'Architecture', 'Sculpture', 'History'],
    bestSeasonGuidance: 'October to March offers pleasant temperatures (10°C-27°C). The Khajuraho Dance Festival takes place in February.',
    practicalTips: [
      'Hire an ASI-certified government guide or utilize the official ASI audio guide at the Western Group ticket counter.',
      'Take a rented bicycle through the Eastern and Southern Jain temple groups.',
      'Combine your visit with an afternoon safari to nearby Panna Tiger Reserve (25 km away).'
    ],
    sourceUrls: [
      { title: 'Madhya Pradesh Tourism - Khajuraho', url: 'https://www.mptourism.com' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'khj-s1', name: 'Community Health Centre Khajuraho', type: 'hospital', latitude: 24.8510, longitude: 79.9240, address: 'Near Bus Stand, Khajuraho', contact: '+91 7686 274025', distanceKm: 0.6 },
      { id: 'khj-s2', name: 'Khajuraho Police Station', type: 'police', latitude: 24.8520, longitude: 79.9260, address: 'Main Road, Khajuraho', contact: '+91 7686 274022', distanceKm: 0.7 },
      { id: 'khj-s3', name: 'Khajuraho Railway Station (KURJ)', type: 'railway', latitude: 24.8180, longitude: 79.9220, address: 'Station Road, Khajuraho', distanceKm: 4.5 },
      { id: 'khj-s4', name: 'Khajuraho Airport (HJR)', type: 'airport', latitude: 24.8172, longitude: 79.9189, address: 'Airport Road', distanceKm: 3.5 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'ajanta-ellora',
    name: 'Ajanta & Ellora Caves',
    state: 'Maharashtra',
    country: 'India',
    latitude: 20.5519,
    longitude: 75.7033,
    description: 'Ancient rock-cut cave sanctuaries spanning Buddhist, Hindu, and Jain traditions. Ellora is home to the monolithic Kailasa Temple (Cave 16) carved top-down from a single volcanic cliff.',
    travelHighlights: [
      'Kailasa Temple (Cave 16, Ellora) — world\'s largest monolithic rock-cut monument',
      'The 30 Buddhist horse-shoe horseshoe gorge caves of Ajanta with 2nd-century BCE fresco murals',
      'Ellora\'s harmonious confluence of 34 Buddhist, Hindu, and Jain caves',
      'Nearby Bibi Ka Maqbara (Taj of the Deccan) in Chhatrapati Sambhajinagar'
    ],
    popularAttractions: [
      {
        id: 'ell-1',
        name: 'Kailasa Temple (Ellora Cave 16)',
        destinationId: 'ajanta-ellora',
        latitude: 20.0238,
        longitude: 75.1792,
        description: 'Engineering marvel carved out of 200,000 tonnes of basalt rock vertically from the top down.',
        category: 'Rock-Cut Marvel',
        entryFee: 40,
        suggestedTimeHours: 3.5
      },
      {
        id: 'ajn-1',
        name: 'Ajanta Caves Panorama & Paintings',
        destinationId: 'ajanta-ellora',
        latitude: 20.5519,
        longitude: 75.7033,
        description: 'Thirty rock-cut Buddhist cave monuments overlooking the Waghur river gorge, containing masterwork Jataka murals.',
        category: 'Ancient Frescoes',
        entryFee: 40,
        suggestedTimeHours: 4
      }
    ],
    estimatedBudgetRange: {
      min: 6500,
      max: 16000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['UNESCO Heritage', 'Ancient Rock Caves', 'Art & Murals', 'Monolithic'],
    bestSeasonGuidance: 'October to March offers cool dry weather (14°C-29°C). Note: Ajanta is CLOSED on Mondays, and Ellora is CLOSED on Tuesdays.',
    practicalTips: [
      'IMPORTANT: Ajanta Caves is closed on Mondays; Ellora Caves is closed on Tuesdays. Plan your itinerary accordingly.',
      'Carry a small pocket torch to examine the delicate murals in dimly lit Ajanta caves.',
      'Stay in Chhatrapati Sambhajinagar (Aurangabad) and take day excursions to each cave complex.'
    ],
    sourceUrls: [
      { title: 'Archaeological Survey of India - Ajanta & Ellora', url: 'https://asi.nic.in' },
      { title: 'Maharashtra Tourism - Ellora', url: 'https://www.maharashtratourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'ell-s1', name: 'Government Medical College & Hospital Aurangabad', type: 'hospital', latitude: 19.8820, longitude: 75.3190, address: 'Panchakki Road, Sambhajinagar', contact: '+91 240 2402412', distanceKm: 28.0 },
      { id: 'ell-s2', name: 'Ellora Police Station', type: 'police', latitude: 20.0210, longitude: 75.1760, address: 'Near Ellora Bus Stand', contact: '+91 2437 244133', distanceKm: 0.5 },
      { id: 'ell-s3', name: 'Chhatrapati Sambhajinagar Railway Station', type: 'railway', latitude: 19.8660, longitude: 75.3220, address: 'Station Road', distanceKm: 29.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'kumarakom',
    name: 'Kumarakom',
    state: 'Kerala',
    country: 'India',
    latitude: 9.6175,
    longitude: 76.4301,
    description: 'A cluster of islands on Vembanad Lake in God’s Own Country, famed for its sprawling migratory bird sanctuary, luxury Ayurvedic backwater resorts, and calm fishing lagoons.',
    travelHighlights: [
      'Kumarakom Bird Sanctuary home to migratory Siberian storks, egrets, and darters',
      'Vembanad Lake sunset Shikara boat cruise',
      'Authentic Ayurvedic panchakarma wellness treatments',
      'Traditional village canoe fishing and duck farming trails'
    ],
    popularAttractions: [
      {
        id: 'kmk-1',
        name: 'Kumarakom Bird Sanctuary',
        destinationId: 'kumarakom',
        latitude: 9.6260,
        longitude: 76.4310,
        description: '14-acre bird haven on the banks of Vembanad Lake featuring wooden watchtowers and walking paths.',
        category: 'Bird Sanctuary',
        entryFee: 50,
        suggestedTimeHours: 3
      },
      {
        id: 'kmk-2',
        name: 'Vembanad Lake Shikara Cruise',
        destinationId: 'kumarakom',
        latitude: 9.6110,
        longitude: 76.4250,
        description: 'Covered wooden traditional Shikara boat ride exploring narrow lotus-covered village canals.',
        category: 'Boating & Nature',
        entryFee: 600,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 7500,
      max: 19500,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Backwaters', 'Bird Watching', 'Wellness', 'Quiet Getaway'],
    bestSeasonGuidance: 'November to February for migratory bird sightings and breezy lake weather (21°C-30°C).',
    practicalTips: [
      'Visit the Bird Sanctuary early at 6:00 AM with binoculars for peak avian activity.',
      'Opt for open-top motorized Shikaras to reach shallower village canals that houseboats cannot enter.'
    ],
    sourceUrls: [
      { title: 'Kerala Tourism - Kumarakom', url: 'https://www.keralatourism.org/destination/kumarakom/207' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'kmk-s1', name: 'Government Hospital Kumarakom', type: 'hospital', latitude: 9.6150, longitude: 76.4320, address: 'Main Road, Kumarakom', contact: '+91 481 2524233', distanceKm: 0.5 },
      { id: 'kmk-s2', name: 'Kumarakom Police Station', type: 'police', latitude: 9.6160, longitude: 76.4340, address: 'Kottayam Road', contact: '+91 481 2524333', distanceKm: 0.6 },
      { id: 'kmk-s3', name: 'Kottayam Railway Station (KTYM)', type: 'railway', latitude: 9.5890, longitude: 76.5290, address: 'Railway Station Road, Kottayam', distanceKm: 14.0 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'pushkar',
    name: 'Pushkar',
    state: 'Rajasthan',
    country: 'India',
    latitude: 26.4897,
    longitude: 74.5511,
    description: 'Ancient holy lake town nestled in the Aravalli hills, home to one of the world\'s few dedicated Brahma Temples, 52 sacred bathing ghats, and the world-famous annual Pushkar Camel Fair.',
    travelHighlights: [
      'Jagatpita Brahma Mandir — the 14th-century temple dedicated to the creator god Lord Brahma',
      'Spiritual serenity and evening bells around sacred Pushkar Lake\'s 52 ghats',
      'The vibrant spectacle of the annual Pushkar Camel and Livestock Fair',
      'Sunset hike to Savitri Temple on Ratnagiri Hill for panoramic valley views'
    ],
    popularAttractions: [
      {
        id: 'psh-1',
        name: 'Brahma Temple (Jagatpita Brahma Mandir)',
        destinationId: 'pushkar',
        latitude: 26.4880,
        longitude: 74.5510,
        description: 'Distinctive red-spire 14th-century temple with silver coin-inlaid marble floors.',
        category: 'Spiritual Center',
        entryFee: 0,
        suggestedTimeHours: 1.5
      },
      {
        id: 'psh-2',
        name: 'Pushkar Lake & Varaha Ghat',
        destinationId: 'pushkar',
        latitude: 26.4890,
        longitude: 74.5530,
        description: 'Sacred elliptical lake encircled by whitewashed temples, pavilions, and ghats where pilgrims take holy dips.',
        category: 'Sacred Lake',
        entryFee: 0,
        suggestedTimeHours: 2
      },
      {
        id: 'psh-3',
        name: 'Savitri Temple (Ratnagiri Hill)',
        destinationId: 'pushkar',
        latitude: 26.4850,
        longitude: 74.5410,
        description: 'Hilltop shrine reachable by ropeway or 650 stone steps offering panoramic 360-degree desert lake vistas.',
        category: 'Ropeway & Viewpoint',
        entryFee: 120,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 4500,
      max: 13000,
      currency: 'INR'
    },
    recommendedDurationDays: 2,
    categories: ['Spiritual', 'Culture', 'Desert Edge', 'Festivals'],
    bestSeasonGuidance: 'October to March offers pleasant desert days (11°C-27°C). The Pushkar Fair takes place in Kartik Purnima (October/November).',
    practicalTips: [
      'Take the modern passenger ropeway up to Savitri Temple to view the sunset without strenuous hiking.',
      'Pushkar is a sacred vegetarian town; alcohol, meat, and eggs are strictly prohibited within city limits.',
      'Beware of unauthorized lake-side priests offering aggressive flower blessings (pooja scams) for money.'
    ],
    sourceUrls: [
      { title: 'Rajasthan Tourism - Pushkar', url: 'https://www.tourism.rajasthan.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'psh-s1', name: 'Government Hospital Pushkar', type: 'hospital', latitude: 26.4910, longitude: 74.5540, address: 'Hospital Road, Pushkar', contact: '+91 145 2772023', distanceKm: 0.4 },
      { id: 'psh-s2', name: 'Pushkar Police Station', type: 'police', latitude: 26.4920, longitude: 74.5550, address: 'Ajmer Road, Pushkar', contact: '+91 145 2772024', distanceKm: 0.5 },
      { id: 'psh-s3', name: 'Ajmer Junction Railway Station (AII)', type: 'railway', latitude: 26.4560, longitude: 74.6390, address: 'Station Road, Ajmer', distanceKm: 14.5 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'puri-konark',
    name: 'Puri & Konark',
    state: 'Odisha',
    country: 'India',
    latitude: 19.8135,
    longitude: 85.8312,
    description: 'Coastal spiritual and architectural wonders of Odisha, celebrated for the Jagannath Temple, the UNESCO World Heritage Konark Sun Temple chariot, Golden Beach, and the world\'s largest Rath Yatra.',
    travelHighlights: [
      'Konark Sun Temple — colossal 13th-century stone chariot with 24 carved wheels and 7 horses',
      'The 12th-century Jagannath Temple and Mahaprasad cooked in earthen pots',
      'Blue Flag certified Golden Beach of Puri with gentle sunrise waves',
      'Raghurajpur heritage crafts village famous for Pattachitra scroll paintings'
    ],
    popularAttractions: [
      {
        id: 'pur-1',
        name: 'Konark Sun Temple',
        destinationId: 'puri-konark',
        latitude: 19.8876,
        longitude: 86.0945,
        description: 'UNESCO World Heritage monument conceived as a giant sun chariot with intricately sculpted sundials.',
        category: 'UNESCO Monument',
        entryFee: 40,
        suggestedTimeHours: 3
      },
      {
        id: 'pur-2',
        name: 'Puri Jagannath Temple',
        destinationId: 'puri-konark',
        latitude: 19.8048,
        longitude: 85.8179,
        description: 'Major Char Dham pilgrimage center dedicated to Lord Jagannath, Balabhadra, and Subhadra.',
        category: 'Char Dham Pilgrimage',
        entryFee: 0,
        suggestedTimeHours: 3.5
      },
      {
        id: 'pur-3',
        name: 'Golden Beach (Blue Flag Beach)',
        destinationId: 'puri-konark',
        latitude: 19.7980,
        longitude: 85.8280,
        description: 'Eco-certified pristine beach with clean bathing areas, lifeguards, and sand art exhibitions.',
        category: 'Blue Flag Beach',
        entryFee: 20,
        suggestedTimeHours: 2.5
      }
    ],
    estimatedBudgetRange: {
      min: 5000,
      max: 14000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['UNESCO Heritage', 'Spiritual', 'Coastal', 'Artisan Crafts'],
    bestSeasonGuidance: 'October to March offers cool sea breezes and mild temperatures (18°C-29°C).',
    practicalTips: [
      'Only Hindus are permitted inside the inner precincts of the Jagannath Temple; visitors of other faiths can view the temple from the roof of the Raghunandan Library.',
      'Savor the sacred Anandabazar Mahaprasad (Khaja and Dalma) inside the temple complex.',
      'Drive along the scenic Marine Drive highway connecting Puri and Konark along the ocean.'
    ],
    sourceUrls: [
      { title: 'Odisha Tourism - Puri & Konark', url: 'https://odishatourism.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'pur-s1', name: 'District Headquarters Hospital Puri', type: 'hospital', latitude: 19.8080, longitude: 85.8210, address: 'Hospital Square, Puri', contact: '+91 6752 222033', distanceKm: 1.0 },
      { id: 'pur-s2', name: 'Sea Beach Police Station Puri', type: 'police', latitude: 19.7990, longitude: 85.8270, address: 'Chakratirtha Road, Puri', contact: '+91 6752 222045', distanceKm: 0.5 },
      { id: 'pur-s3', name: 'Puri Railway Station (PURI)', type: 'railway', latitude: 19.8140, longitude: 75.8340, address: 'Station Road, Puri', distanceKm: 1.2 }
    ],
    lastVerified: '2026-03-01'
  },
  {
    id: 'ranthambore',
    name: 'Ranthambore National Park',
    state: 'Rajasthan',
    country: 'India',
    latitude: 25.9899,
    longitude: 76.5026,
    description: 'One of northern India\'s premier Project Tiger reserves, celebrated for wild Bengal tiger sightings against the atmospheric backdrop of the 10th-century Ranthambore Fort and Padam Talao lake.',
    travelHighlights: [
      'Tracking wild Bengal tigers on open gypsy safaris through ancient ruins and dhok forests',
      'The 10th-century UNESCO World Heritage Ranthambore Fort inside the forest',
      'Trinetra Ganesha Temple at the summit of the fort',
      'Marsh crocodile and leopard spotting around Padam Talao and Rajbagh lakes'
    ],
    popularAttractions: [
      {
        id: 'rtb-1',
        name: 'Ranthambore Tiger Safari (Zones 1-5)',
        destinationId: 'ranthambore',
        latitude: 26.0173,
        longitude: 76.5026,
        description: 'Prime core tiger habitat sectors featuring scenic lake shores and high probability of predator sightings.',
        category: 'Tiger Safari',
        entryFee: 1200,
        suggestedTimeHours: 3.5
      },
      {
        id: 'rtb-2',
        name: 'Ranthambore Fort & Trinetra Ganesha',
        destinationId: 'ranthambore',
        latitude: 26.0200,
        longitude: 76.4530,
        description: 'Monumental 10th-century fort atop a 700-foot cliff containing the famed three-eyed Ganesha temple.',
        category: 'UNESCO Fort',
        entryFee: 0,
        suggestedTimeHours: 3
      }
    ],
    estimatedBudgetRange: {
      min: 9000,
      max: 26000,
      currency: 'INR'
    },
    recommendedDurationDays: 3,
    categories: ['Wildlife', 'Tiger Reserve', 'UNESCO Heritage', 'Safari'],
    bestSeasonGuidance: 'October to June. Core zones are CLOSED from July to September during monsoon breeding season.',
    practicalTips: [
      'Book safari slots 90-120 days in advance on the Rajasthan Forest Department portal as gypsy seats in Zones 1-5 sell out quickly.',
      'Wear earth-toned clothing and carry dust masks/scarves for open-vehicle jungle tracks.',
      'Sawai Madhopur railway station is just 11 km from the park gate and connects directly to Delhi and Mumbai.'
    ],
    sourceUrls: [
      { title: 'Rajasthan Forest Department - Ranthambore', url: 'https://forest.rajasthan.gov.in' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    nearbyServices: [
      { id: 'rtb-s1', name: 'General Hospital Sawai Madhopur', type: 'hospital', latitude: 25.9980, longitude: 76.3680, address: 'Bajaria, Sawai Madhopur', contact: '+91 7462 220222', distanceKm: 12.0 },
      { id: 'rtb-s2', name: 'Sawai Madhopur Police Station', type: 'police', latitude: 26.0020, longitude: 76.3650, address: 'Near Railway Station', contact: '+91 7462 220233', distanceKm: 11.0 },
      { id: 'rtb-s3', name: 'Sawai Madhopur Junction Railway Station (SWM)', type: 'railway', latitude: 26.0050, longitude: 76.3620, address: 'Station Road, Sawai Madhopur', distanceKm: 11.5 }
    ],
    lastVerified: '2026-03-01'
  }
];

export const ALL_CATEGORIES = [
  'All',
  'Hill Station',
  'Heritage',
  'Beach',
  'Wildlife',
  'Nature',
  'Spiritual',
  'Himalayas',
  'Adventure',
  'Backwaters',
  'Desert',
  'UNESCO Heritage'
];
