-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  cover_image TEXT,
  budget DECIMAL(10, 2) DEFAULT 0.00,
  spent DECIMAL(10, 2) DEFAULT 0.00,
  collaborators TEXT[] DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  day INTEGER NOT NULL,
  time TEXT,
  title TEXT NOT NULL,
  location TEXT,
  type TEXT CHECK (type IN ('flight', 'hotel', 'activity', 'dining', 'transport')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Policies for trips
CREATE POLICY "Users can create their own trips" ON trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own trips" ON trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own trips" ON trips FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own trips" ON trips FOR DELETE USING (auth.uid() = user_id);

-- Policies for activities
CREATE POLICY "Users can manage activities for their trips" ON activities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM trips
      WHERE trips.id = activities.trip_id
      AND trips.user_id = auth.uid()
    )
  );
