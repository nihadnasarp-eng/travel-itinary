import React, { useState, useEffect } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react';
import { tripService } from '../services/tripService';
import './Budget.css';

const Budget: React.FC = () => {
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await tripService.getTrips();
                setTrips(data || []);
            } catch (error) {
                console.error("Error fetching budget data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const totalBudget = trips.reduce((acc, trip) => acc + (trip.budget || 0), 0);
    const totalSpent = trips.reduce((acc, trip) => acc + (trip.spent || 0), 0);
    const remaining = totalBudget - totalSpent;

    if (loading) return <div className="loading">Loading Finances...</div>;

    return (
        <div className="budget-view animate-fade-in">
            <header className="page-header">
                <div>
                    <h2>Budget & Expenses</h2>
                    <p className="subtitle">Track your spending across all journeys</p>
                </div>
                <button className="primary-btn">
                    <Plus size={20} />
                    <span>Add Expense</span>
                </button>
            </header>

            <div className="budget-summary-grid">
                <div className="budget-card total glass">
                    <div className="card-icon"><Wallet size={24} /></div>
                    <div className="card-info">
                        <span className="label">Total Budget</span>
                        <span className="value">${totalBudget.toLocaleString()}</span>
                    </div>
                </div>
                <div className="budget-card spent glass">
                    <div className="card-icon"><ArrowDownRight size={24} /></div>
                    <div className="card-info">
                        <span className="label">Total Spent</span>
                        <span className="value">${totalSpent.toLocaleString()}</span>
                    </div>
                </div>
                <div className="budget-card remaining glass">
                    <div className="card-icon"><ArrowUpRight size={24} /></div>
                    <div className="card-info">
                        <span className="label">Remaining</span>
                        <span className="value">${remaining.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <section className="trips-budget-list">
                <h3>Trip Breakdown</h3>
                <div className="budget-table glass">
                    <div className="table-header">
                        <span>Destination</span>
                        <span>Budget</span>
                        <span>Spent</span>
                        <span>Status</span>
                    </div>
                    {trips.map(trip => (
                        <div key={trip.id} className="table-row">
                            <span className="destination">{trip.destination}</span>
                            <span>${trip.budget?.toLocaleString()}</span>
                            <span>${trip.spent?.toLocaleString()}</span>
                            <span className={`status-badge ${trip.spent > trip.budget ? 'over' : 'under'}`}>
                                {trip.spent > trip.budget ? 'Over Budget' : 'On Track'}
                            </span>
                        </div>
                    ))}
                    {trips.length === 0 && (
                        <div className="empty-table">No data available. Plan a trip to start tracking.</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Budget;
