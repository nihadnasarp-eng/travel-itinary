import React from 'react';
import { FileText, Upload, Download, Trash2, Search, FileImage } from 'lucide-react';
import './Documents.css';

const Documents: React.FC = () => {
    const docs = [
        { id: '1', name: 'Passport Scan.pdf', type: 'PDF', size: '1.2 MB', date: 'Feb 10, 2024' },
        { id: '2', name: 'Hotel Booking - Kyoto.pdf', type: 'PDF', size: '450 KB', date: 'Feb 15, 2024' },
        { id: '3', name: 'Travel Insurance.png', type: 'PNG', size: '2.1 MB', date: 'Jan 28, 2024' },
    ];

    return (
        <div className="documents-view animate-fade-in">
            <header className="page-header">
                <div>
                    <h2>Travel Documents</h2>
                    <p className="subtitle">Securely store your tickets, IDs, and bookings</p>
                </div>
                <button className="primary-btn">
                    <Upload size={20} />
                    <span>Upload New File</span>
                </button>
            </header>

            <div className="search-filter-row">
                <div className="search-box glass">
                    <Search size={18} />
                    <input type="text" placeholder="Search documents..." />
                </div>
            </div>

            <div className="docs-grid">
                {docs.map(doc => (
                    <div key={doc.id} className="doc-card glass">
                        <div className="doc-icon">
                            {doc.type === 'PDF' ? <FileText size={32} /> : <FileImage size={32} />}
                        </div>
                        <div className="doc-info">
                            <h4>{doc.name}</h4>
                            <p>{doc.size} • {doc.date}</p>
                        </div>
                        <div className="doc-actions">
                            <button className="icon-btn"><Download size={18} /></button>
                            <button className="icon-btn danger"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}

                <div className="upload-placeholder glass">
                    <Upload size={40} strokeWidth={1} />
                    <p>Drag and drop files here</p>
                    <span>Supports PDF, JPG, PNG up to 10MB</span>
                </div>
            </div>
        </div>
    );
};

export default Documents;
