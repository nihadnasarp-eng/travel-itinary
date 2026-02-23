import React, { useState } from 'react';
import { Clock, MapPin, Plane, Hotel, Coffee, MoreVertical, Plus } from 'lucide-react';
import './Itinerary.css';

const Itinerary: React.FC = () => {
    const [activeDay, setActiveDay] = useState(1);
    const [activities] = useState<any[]>([]);
    const [tripMeta] = useState({
        title: 'New Adventure',
        dates: 'Select Dates',
        travelers: 1,
        status: 'Planning'
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'flight': return <Plane size={18} />;
            case 'hotel': return <Hotel size={18} />;
            case 'dining': return <Coffee size={18} />;
            default: return <MapPin size={18} />;
        }
    };

    return (
        <div className="itinerary-view animate-fade-in">
            <header className="itinerary-header">
                <div className="trip-meta">
                    <span className="badge-small">{tripMeta.status}</span>
                    <h2>{tripMeta.title}</h2>
                    <p className="subtitle">{tripMeta.dates} • {tripMeta.travelers} traveler{tripMeta.travelers > 1 ? 's' : ''}</p>
                </div>
                <div className="itinerary-actions">
                    <button className="secondary-btn glass">Share Trip</button>
                    <button className="primary-btn">Edit Itinerary</button>
                </div>
            </header>

            <div className="itinerary-container">
                <aside className="day-selector">
                    {[1].map(day => (
                        <button
                            key={day}
                            className={`day-btn ${activeDay === day ? 'active' : ''}`}
                            onClick={() => setActiveDay(day)}
                        >
                            <span className="day-label">Day</span>
                            <span className="day-num">{day}</span>
                        </button>
                    ))}
                    <button className="day-btn add-day">
                        <Plus size={20} />
                    </button>
                </aside>

                <main className="timeline-view">
                    <div className="timeline-header">
                        <h3>Day {activeDay} Schedule</h3>
                        <span>Plan your activities</span>
                    </div>

                    <div className="timeline">
                        {activities.length > 0 ? (
                            activities.map((activity, index) => (
                                <div key={activity.id} className="timeline-item">
                                    <div className="time-col">
                                        <Clock size={16} />
                                        <span>{activity.time}</span>
                                    </div>
                                    <div className="marker-col">
                                        <div className={`marker ${activity.status}`}></div>
                                        {index !== activities.length - 1 && <div className="line"></div>}
                                    </div>
                                    <div className="content-col glass">
                                        <div className="activity-icon">
                                            {getTypeIcon(activity.type)}
                                        </div>
                                        <div className="activity-info">
                                            <h4>{activity.title}</h4>
                                            <div className="activity-loc">
                                                <MapPin size={14} />
                                                <span>{activity.location}</span>
                                            </div>
                                        </div>
                                        <button className="more-btn">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-timeline" style={{ padding: '20px', color: 'var(--text-muted)' }}>
                                <p>No activities scheduled for this day.</p>
                            </div>
                        )}

                        <button className="add-activity-btn glass">
                            <Plus size={20} />
                            <span>Add Activity</span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Itinerary;
