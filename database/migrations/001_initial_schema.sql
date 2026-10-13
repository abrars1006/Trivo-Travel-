-- ============================================================
-- TRIVO-TRAVEL SUPABASE POSTGRESQL INITIAL SCHEMA MIGRATION
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Destinations Table
CREATE TABLE IF NOT EXISTS public.destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  description TEXT NOT NULL,
  travel_highlights JSONB DEFAULT '[]'::jsonb,
  estimated_budget_min INTEGER NOT NULL,
  estimated_budget_max INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  recommended_duration_days INTEGER NOT NULL,
  categories JSONB DEFAULT '[]'::jsonb,
  best_season_guidance TEXT NOT NULL,
  practical_tips JSONB DEFAULT '[]'::jsonb,
  source_urls JSONB DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  nearby_services JSONB DEFAULT '[]'::jsonb,
  last_verified DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_destinations_state ON public.destinations(state);
CREATE INDEX IF NOT EXISTS idx_destinations_lat_lng ON public.destinations(latitude, longitude);

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Destinations are viewable by everyone" 
  ON public.destinations FOR SELECT USING (true);

-- 3. Attractions Table
CREATE TABLE IF NOT EXISTS public.attractions (
  id TEXT PRIMARY KEY,
  destination_id TEXT REFERENCES public.destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  entry_fee INTEGER DEFAULT 0,
  suggested_time_hours NUMERIC(3, 1) DEFAULT 2.0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_attractions_destination ON public.attractions(destination_id);

ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Attractions are viewable by everyone" 
  ON public.attractions FOR SELECT USING (true);

-- 4. Trips Table
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  destination_id TEXT REFERENCES public.destinations(id),
  destination_name TEXT NOT NULL,
  destination_lat DOUBLE PRECISION NOT NULL,
  destination_lng DOUBLE PRECISION NOT NULL,
  starting_location TEXT NOT NULL,
  start_date DATE NOT NULL,
  duration_days INTEGER NOT NULL CHECK (duration_days >= 1 AND duration_days <= 30),
  travelers_count INTEGER NOT NULL DEFAULT 1 CHECK (travelers_count >= 1),
  budget NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR',
  interests JSONB DEFAULT '[]'::jsonb,
  pace TEXT DEFAULT 'moderate',
  transport_pref TEXT DEFAULT 'car',
  accommodation_pref TEXT DEFAULT 'mid_range',
  notes TEXT,
  group_members JSONB DEFAULT '["You"]'::jsonb,
  checklist JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trips_user ON public.trips(user_id);

ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own trips or trips where they are members" 
  ON public.trips FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can create their own trips" 
  ON public.trips FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can update their own trips" 
  ON public.trips FOR UPDATE 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can delete their own trips" 
  ON public.trips FOR DELETE 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- 5. Itinerary Items Table
CREATE TABLE IF NOT EXISTS public.itinerary_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  time_slot TEXT NOT NULL CHECK (time_slot IN ('morning', 'afternoon', 'evening')),
  time_string TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location_name TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  estimated_cost NUMERIC(10, 2) DEFAULT 0,
  duration_hours NUMERIC(3, 1) DEFAULT 2.0,
  category TEXT DEFAULT 'sightseeing',
  meal_break BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_itinerary_trip_day ON public.itinerary_items(trip_id, day_number);

ALTER TABLE public.itinerary_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access itinerary items for their trips" 
  ON public.itinerary_items FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.trips 
      WHERE trips.id = itinerary_items.trip_id 
      AND (trips.user_id = auth.uid() OR auth.uid() IS NULL)
    )
  );

-- 6. Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  category TEXT NOT NULL CHECK (category IN ('transport', 'accommodation', 'food', 'activities', 'local_transit', 'miscellaneous')),
  paid_by TEXT NOT NULL,
  split_between JSONB NOT NULL DEFAULT '[]'::jsonb,
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_expenses_trip ON public.expenses(trip_id);

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access expenses for their trips" 
  ON public.expenses FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.trips 
      WHERE trips.id = expenses.trip_id 
      AND (trips.user_id = auth.uid() OR auth.uid() IS NULL)
    )
  );

-- 7. Saved Destinations (Wishlist) Table
CREATE TABLE IF NOT EXISTS public.saved_destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  destination_id TEXT REFERENCES public.destinations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, destination_id)
);

ALTER TABLE public.saved_destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their wishlist" 
  ON public.saved_destinations FOR ALL 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- 8. Travel Alerts Table
CREATE TABLE IF NOT EXISTS public.travel_alerts (
  id TEXT PRIMARY KEY,
  destination_id TEXT REFERENCES public.destinations(id) ON DELETE SET NULL,
  affected_location TEXT NOT NULL,
  state TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'warning', 'advisory', 'info')),
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  safety_guidance TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ,
  last_checked_at TIMESTAMPTZ DEFAULT NOW(),
  is_stale BOOLEAN DEFAULT FALSE,
  is_demo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.travel_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Alerts are viewable by everyone" 
  ON public.travel_alerts FOR SELECT USING (true);
