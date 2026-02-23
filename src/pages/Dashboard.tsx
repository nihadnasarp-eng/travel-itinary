import React from 'react';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [trips] = React.useState<any[]>([]);

    return (
        <div className="dashboard-view animate-fade-in">
            <header className="dashboard-header">
                <div>
                    <h2>Welcome back, Traveler!</h2>
                    <p className="subtitle">
                        {trips.length > 0
                            ? `You have ${trips.length} upcoming trips.`
                            : "Ready for your next adventure?"}
                    </p>
                </div>
                <button className="create-btn">
                    <Plus size={20} />
                    <span>Plan New Trip</span>
                </button>
            </header>

            <div className="stats-grid">
                <div className="stat-card glass">
                    <TrendingUp className="stat-icon" size={24} />
                    <div className="stat-info">
                        <span className="stat-label">Total Budget</span>
                        <span className="stat-value">$0.00</span>
                    </div>
                </div>
                <div className="stat-card glass">
                    <Calendar className="stat-icon" size={24} />
                    <div className="stat-info">
                        <span className="stat-label">Days Traveled</span>
                        <span className="stat-value">0 Days</span>
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
                            {/* Trip card content */}
                        </div>
                    ))}
                    <button className="add-trip-card glass">
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
        </div>
    );
};

export default Dashboard;
