import React, { useEffect, useState } from 'react';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import { tripService } from '../services/tripService';
import NewTripModal from '../components/NewTripModal';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const data = await tripService.getTrips();
            setTrips(data || []);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTrip = async (tripData: any) => {
        try {
            await tripService.createTrip(tripData);
            fetchTrips(); // Refresh list
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    const totalBudget = trips.reduce((acc, trip) => acc + (trip.budget || 0), 0);
    const totalTrips = trips.length;

    if (loading) return <div className="loading" style={{ textAlign: 'center', padding: '100px', fontSize: '1.2rem', color: 'var(--accent-primary)' }}>Initializing WanderQuest...</div>;

    return (
        <div className="dashboard-view animate-fade-in">
            <header className="dashboard-header">
                <div>
                    <h2>Welcome back, Traveler!</h2>
                    <p className="subtitle">
                        {trips.length > 0
                            ? `You have ${trips.length} upcoming adventures planned.`
                            : "Your journey starts here. Plan your first trip today."}
                    </p>
                </div>
                <button className="create-btn" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} />
                    <span>Plan New Trip</span>
                </button>
            </header>

            <div className="stats-grid">
                <div className="stat-card glass">
                    <TrendingUp className="stat-icon" size={24} />
                    <div className="stat-info">
                        <span className="stat-label">Total Allocated Budget</span>
                        <span className="stat-value">${totalBudget.toLocaleString()}</span>
                    </div>
                </div>
                <div className="stat-card glass">
                    <Calendar className="stat-icon" size={24} />
                    <div className="stat-info">
                        <span className="stat-label">Total Trips</span>
                        <span className="stat-value">{totalTrips}</span>
                    </div>
                </div>
            </div>

            <section className="trips-section">
                <div className="section-title">
                    <h3>Upcoming Adventures</h3>
                    {trips.length > 0 && <a href="#">View All</a>}
                </div>
                <div className="trips-grid">
                    {trips.map(trip => (
                        <div key={trip.id} className="trip-card glass">
                            <div
                                className="trip-image"
                                style={{ backgroundImage: `url(${trip.cover_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop'})` }}
                            >
                                <div className="trip-badge">{trip.status}</div>
                            </div>
                            <div className="trip-details">
                                <h4>{trip.destination}</h4>
                                <div className="trip-info">
                                    <Calendar size={14} />
                                    <span>{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</span>
                                </div>
                                <div className="trip-footer">
                                    <div className="budget-mini">
                                        <div className="progress-bar">
                                            <div
                                                className="progress"
                                                style={{ width: `${(trip.spent / (trip.budget || 1)) * 100 || 0}%` }}
                                            ></div>
                                        </div>
                                        <span>${trip.spent || 0} / ${trip.budget || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="add-trip-card glass" onClick={() => setIsModalOpen(true)}>
                        <Plus size={40} strokeWidth={1} />
                        <span>Add Destination</span>
                    </button>
                </div>
                {trips.length === 0 && (
                    <div className="empty-state" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        <p>No upcoming trips. Start planning your next journey!</p>
                    </div>
                )}
            </section>

            <NewTripModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateTrip}
            />
        </div>
    );
};

export default Dashboard;
