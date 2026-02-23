import React, { type ReactNode } from 'react';
import { LayoutDashboard, Plane, Map, Wallet, FileText, Settings, LogOut } from 'lucide-react';
import './Layout.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
                    <a href="#" className="nav-item active">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="nav-item">
                        <Map size={20} />
                        <span>My Trips</span>
                    </a>
                    <a href="#" className="nav-item">
                        <Wallet size={20} />
                        <span>Budget</span>
                    </a>
                    <a href="#" className="nav-item">
                        <FileText size={20} />
                        <span>Documents</span>
                    </a>
                </nav>

                <div className="nav-footer">
                    <a href="#" className="nav-item">
                        <Settings size={20} />
                        <span>Settings</span>
                    </a>
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
