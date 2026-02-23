import { supabase } from './supabase';

export interface TripData {
    destination: string;
    start_date: string;
    end_date: string;
    budget: number;
    cover_image?: string;
}

export const tripService = {
    async getTrips() {
        const { data, error } = await supabase
            .from('trips')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async createTrip(trip: TripData) {
        const { data, error } = await supabase
            .from('trips')
            .insert([trip])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteTrip(id: string) {
        const { error } = await supabase
            .from('trips')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
