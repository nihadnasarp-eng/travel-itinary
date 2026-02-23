import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Itinerary from './pages/Itinerary'
import Budget from './pages/Budget'
import Documents from './pages/Documents'
import Settings from './pages/Settings'

type Page = 'dashboard' | 'itinerary' | 'budget' | 'documents' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'itinerary': return <Itinerary />;
      case 'budget': return <Budget />;
      case 'documents': return <Documents />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  }

  return (
    <Layout activeTab={currentPage} onTabChange={(tab) => setCurrentPage(tab as Page)}>
      {renderPage()}
    </Layout>
  )
}

export default App
