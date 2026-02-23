import React from 'react';
import { User, Bell, Lock, Globe, Shield } from 'lucide-react';
import './Settings.css';

const Settings: React.FC = () => {
    return (
        <div className="settings-view animate-fade-in">
            <header className="page-header">
                <div>
                    <h2>Account Settings</h2>
                    <p className="subtitle">Manage your profile and travel preferences</p>
                </div>
            </header>

            <div className="settings-container">
                <nav className="settings-side-nav glass">
                    <a href="#" className="active"><User size={20} /> Profille</a>
                    <a href="#"><Bell size={20} /> Notifications</a>
                    <a href="#"><Lock size={20} /> Privacy & Security</a>
                    <a href="#"><Globe size={20} /> Language</a>
                    <a href="#"><Shield size={20} /> Billing</a>
                </nav>

                <main className="settings-content glass">
                    <section className="settings-section">
                        <h3>Profile Information</h3>
                        <div className="profile-edit">
                            <div className="avatar-large">
                                <span>U</span>
                                <button className="edit-avatar">Change</button>
                            </div>
                            <div className="form-grid">
                                <div className="field">
                                    <label>Full Name</label>
                                    <input type="text" defaultValue="Traveler User" />
                                </div>
                                <div className="field">
                                    <label>Email Address</label>
                                    <input type="email" defaultValue="user@example.com" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="settings-section">
                        <h3>App Preferences</h3>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <h4>Dark Mode</h4>
                                <p>Adjust the appearance to reduce eye strain</p>
                            </div>
                            <div className="toggle-switch active"></div>
                        </div>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <h4>Email Notifications</h4>
                                <p>Receive trip updates and reminders via email</p>
                            </div>
                            <div className="toggle-switch active"></div>
                        </div>
                    </section>

                    <div className="settings-actions">
                        <button className="primary-btn">Save Changes</button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
