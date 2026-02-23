import React, { type ReactNode } from 'react';
import { LayoutDashboard, Plane, Map, Wallet, FileText, Settings, LogOut } from 'lucide-react';
import './Layout.css';

interface LayoutProps {
    children: ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
    return (
        <div className="layout-container">
            <aside className="sidebar glass">
                <div className="logo">
                    <div className="logo-icon">
                        <Plane size={24} color="#2dd4bf" />
                    </div>
                    <h1>WanderQuest</h1>
                </div>

                <nav className="nav-menu">
                    <button
                        onClick={() => onTabChange('dashboard')}
                        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => onTabChange('itinerary')}
                        className={`nav-item ${activeTab === 'itinerary' ? 'active' : ''}`}
                    >
                        <Map size={20} />
                        <span>My Trips</span>
                    </button>
                    <button
                        onClick={() => onTabChange('budget')}
                        className={`nav-item ${activeTab === 'budget' ? 'active' : ''}`}
                    >
                        <Wallet size={20} />
                        <span>Budget</span>
                    </button>
                    <button
                        onClick={() => onTabChange('documents')}
                        className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}
                    >
                        <FileText size={20} />
                        <span>Documents</span>
                    </button>
                </nav>

                <div className="nav-footer">
                    <button
                        onClick={() => onTabChange('settings')}
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                    <button className="nav-item logout">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>


            <main className="main-content">
                <header className="topbar glass">
                    <div className="search-bar">
                        {/* Search Placeholder */}
                        <input type="text" placeholder="Search trips, destinations..." />
                    </div>
                    <div className="user-profile">
                        <div className="notifications">
                            <div className="badge"></div>
                            {/* Notification icon placeholder */}
                        </div>
                        <div className="avatar">
                            <span>U</span>
                        </div>
                    </div>
                </header>
                <section className="content-area">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default Layout;
