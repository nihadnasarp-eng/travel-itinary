import React, { useState } from 'react';
import { X, Calendar, MapPin, DollarSign } from 'lucide-react';
import './NewTripModal.css';

interface NewTripModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (trip: any) => void;
}

const NewTripModal: React.FC<NewTripModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        destination: '',
        start_date: '',
        end_date: '',
        budget: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            budget: parseFloat(formData.budget) || 0,
        });
        onClose();
    };

    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-content glass animate-scale-up">
                <header className="modal-header">
                    <h3>Plan New Journey</h3>
                    <button onClick={onClose} className="close-btn"><X size={20} /></button>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label><MapPin size={16} /> Destination</label>
                        <input
                            type="text"
                            placeholder="Where to?"
                            value={formData.destination}
                            onChange={e => setFormData({ ...formData, destination: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid-2">
                        <div className="input-group">
                            <label><Calendar size={16} /> Start Date</label>
                            <input
                                type="date"
                                value={formData.start_date}
                                onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label><Calendar size={16} /> End Date</label>
                            <input
                                type="date"
                                value={formData.end_date}
                                onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label><DollarSign size={16} /> Budget (USD)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={formData.budget}
                            onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="secondary-btn glass">Cancel</button>
                        <button type="submit" className="primary-btn">
                            Create Trip
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTripModal;
