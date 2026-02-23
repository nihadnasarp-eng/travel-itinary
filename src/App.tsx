import React, { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Itinerary from './pages/Itinerary'

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'itinerary'>('dashboard');

  return (
    <Layout>
      <div className="tab-switcher" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setCurrentPage('dashboard')}
          style={{
            color: currentPage === 'dashboard' ? '#2dd4bf' : '#94a3b8',
            fontWeight: 600,
            paddingBottom: '5px',
            borderBottom: currentPage === 'dashboard' ? '2px solid #2dd4bf' : 'none'
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentPage('itinerary')}
          style={{
            color: currentPage === 'itinerary' ? '#2dd4bf' : '#94a3b8',
            fontWeight: 600,
            paddingBottom: '5px',
            borderBottom: currentPage === 'itinerary' ? '2px solid #2dd4bf' : 'none'
          }}
        >
          Itinerary Example
        </button>
      </div>

      {currentPage === 'dashboard' ? <Dashboard /> : <Itinerary />}
    </Layout>
  )
}

export default App
