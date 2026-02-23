export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  coverImage?: string;
  budget: number;
  spent: number;
  collaborators: string[];
}

export interface Activity {
  id: string;
  tripId: string;
  day: number;
  time: string;
  title: string;
  location: string;
  type: 'flight' | 'hotel' | 'activity' | 'dining' | 'transport';
  notes?: string;
}

export interface TravelDocument {
  id: string;
  tripId: string;
  name: string;
  url: string;
  type: string;
}
