-- ============================================================
-- TRIVO-TRAVEL SEED DATA (REPEATABLE & IDEMPOTENT)
-- ============================================================

INSERT INTO public.destinations (
  id, name, state, country, latitude, longitude, description, 
  estimated_budget_min, estimated_budget_max, currency, recommended_duration_days,
  categories, best_season_guidance, practical_tips, source_urls, image_url
) VALUES 
(
  'munnar', 
  'Munnar', 
  'Kerala', 
  'India', 
  10.0889, 
  77.0595, 
  'Perched at 1,600m in the Western Ghats, Munnar is famous for rolling tea plantations, mist-covered valleys, cool mountain air, and endangered Nilgiri Tahr.',
  7500,
  18000,
  'INR',
  3,
  '["Hill Station", "Nature", "Wildlife", "Romantic"]'::jsonb,
  'September to March offers crisp, clear mountain weather. Monsoons (June-August) bring lush greenery but frequent ghat road landslides.',
  '["Ghat roads are winding; carry motion sickness remedies.", "Book Eravikulam National Park safari entry slots in advance.", "Evenings get cold; pack a light fleece."]'::jsonb,
  '[{"title": "Kerala Tourism Official Portal", "url": "https://www.keralatourism.org"}]'::jsonb,
  'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80'
),
(
  'ooty', 
  'Ooty (Udhagamandalam)', 
  'Tamil Nadu', 
  'India', 
  11.4102, 
  76.6950, 
  'The Queen of Hill Stations in the Nilgiri hills, featuring the UNESCO Nilgiri Mountain Railway, colonial botanical gardens, and the tranquil Ooty Lake.',
  6000,
  16000,
  'INR',
  3,
  '["Hill Station", "Heritage", "Nature", "Family"]'::jsonb,
  'October to June provides pleasant daytime temperatures (15°C-22°C). Peak flower shows occur during May.',
  '["Book Nilgiri Mountain Railway tickets at least 60-90 days early on IRCTC.", "Expect heavy weekend traffic at Doddabetta during summer."]'::jsonb,
  '[{"title": "Tamil Nadu Tourism - Ooty Hills", "url": "https://www.tamilnadutourism.tn.gov.in"}]'::jsonb,
  'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80'
),
(
  'goa', 
  'Goa (North & South)', 
  'Goa', 
  'India', 
  15.2993, 
  74.1240, 
  'India’s premier coastal paradise featuring golden sandy shores, Portuguese baroque architecture, vibrant beach shacks, Dudhsagar falls, and fresh seafood.',
  10000,
  25000,
  'INR',
  4,
  '["Beach", "Heritage", "Nightlife", "Culinary"]'::jsonb,
  'November to February offers dry, breezy beach weather (20°C-31°C). Monsoons (June-September) showcase verdant waterfalls and uncrowded charm.',
  '["Rent a two-wheeler with an authorized yellow number plate.", "Swim only in zones designated by lifeguards (Drishti Marine)."]'::jsonb,
  '[{"title": "Goa Tourism Official", "url": "https://goatourism.gov.in"}]'::jsonb,
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
),
(
  'jaipur', 
  'Jaipur (Pink City)', 
  'Rajasthan', 
  'India', 
  26.9124, 
  75.7873, 
  'Capital of Rajasthan and UNESCO World Heritage City, famous for terra-cotta pink palaces, monumental hilltop forts, astronomical observatories, and vibrant bazaars.',
  8000,
  22000,
  'INR',
  3,
  '["Heritage", "Forts & Palaces", "Culture", "Shopping"]'::jsonb,
  'October to March offers cool dry weather (10°C-26°C). Summers (April-June) reach 40°C+.',
  '["Buy composite tourism ticket from Rajasthan Tourism covering Amer, Hawa Mahal, and Jantar Mantar.", "Visit Amer Fort early at 8:00 AM."]'::jsonb,
  '[{"title": "Rajasthan Tourism - Jaipur", "url": "https://www.tourism.rajasthan.gov.in"}]'::jsonb,
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80'
),
(
  'manali', 
  'Manali', 
  'Himachal Pradesh', 
  'India', 
  32.2432, 
  77.1892, 
  'High-altitude Himalayan resort town on the Beas River, serving as the gateway to Solang Valley adventures, Atal Tunnel, Rohtang Pass, and ancient wooden cedar temples.',
  9000,
  24000,
  'INR',
  4,
  '["Himalayas", "Adventure", "Snow", "Nature"]'::jsonb,
  'October to June. December-February for heavy snow and skiing; March-June for pleasant summer weather. Monsoons (July-August) pose landslide risk.',
  '["Rohtang Pass entry requires an environmental permit from Kullu District website.", "Check Atal Tunnel winter weather advisories before traveling."]'::jsonb,
  '[{"title": "Himachal Tourism - Manali", "url": "https://himachaltourism.gov.in"}]'::jsonb,
  'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Attractions
INSERT INTO public.attractions (id, destination_id, name, latitude, longitude, description, category, entry_fee, suggested_time_hours)
VALUES
('munnar-1', 'munnar', 'Eravikulam National Park', 10.2014, 77.0850, 'Home to the endangered Nilgiri Tahr and blooming Neelakurinji flowers.', 'Wildlife & Nature', 200, 3.0),
('munnar-2', 'munnar', 'Mattupetty Dam & Lake', 10.1064, 77.1245, 'Storage gravity dam offering scenic speedboating and elephant sightings.', 'Boating & Scenic', 50, 2.0),
('ooty-1', 'ooty', 'Government Botanical Garden', 11.4180, 76.7118, 'Terraced garden housing over a thousand exotic flora species.', 'Gardens & Heritage', 40, 2.5),
('goa-1', 'goa', 'Basilica of Bom Jesus', 15.5009, 73.9116, 'UNESCO World Heritage church holding sacred relics of St. Francis Xavier.', 'Heritage & Architecture', 0, 2.0),
('jai-1', 'jaipur', 'Amer Fort', 26.9855, 75.8513, 'Imposing 16th-century fortress complex made of red sandstone and marble overlooking Maota Lake.', 'Fort & Heritage', 100, 3.5),
('manali-1', 'manali', 'Hadimba Devi Temple', 32.2483, 77.1706, '16th-century pagoda-style cedar temple dedicated to Hadimba Devi, set in Dhungri forest.', 'Heritage & Spiritual', 0, 1.5)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Verified Travel Alerts
INSERT INTO public.travel_alerts (
  id, destination_id, affected_location, state, category, severity,
  title, details, safety_guidance, source_name, source_url, issued_at, is_stale, is_demo
) VALUES
(
  'alt-1', 
  'munnar', 
  'Munnar & Devikulam Ghats, Idukki District', 
  'Kerala', 
  'landslide', 
  'warning',
  'Monsoon Ghat Road Precaution & Night Driving Advisory',
  'District Disaster Management Authority advisory regarding loose soil and minor debris flow risks along Gap Road (NH-85).',
  'Avoid non-essential nighttime travel along ghat corridors. Adhere to posted speed restrictions.',
  'Kerala State Disaster Management Authority (KSDMA)',
  'https://sdma.kerala.gov.in',
  NOW() - INTERVAL '2 days',
  false,
  false
),
(
  'alt-2', 
  'manali', 
  'Manali - Rohtang - Atal Tunnel North Portal', 
  'Himachal Pradesh', 
  'road_closure', 
  'advisory',
  'Snow Clearance & Regulated Traffic at Atal Tunnel',
  'Periodic ice formation and frost between South Portal and Dhundi. BRO maintains staggered movement.',
  'Carry anti-skid tire chains if heading into Lahaul valley. Verify daily pass clearance with traffic police.',
  'Himachal Pradesh State Disaster Management Authority (HPSDMA)',
  'https://hpsdma.nic.in',
  NOW() - INTERVAL '1 day',
  false,
  false
)
ON CONFLICT (id) DO NOTHING;
