import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarCard from './components/CarCard';
import CarDetailModal from './components/CarDetailModal';
import FinanceCalculator from './components/FinanceCalculator';
import TestDriveModal from './components/TestDriveModal';
import AdminPortal from './components/AdminPortal';
import UserDashboard from './components/UserDashboard';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

import { useFavorites } from './context/FavoritesContext';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Car as CarIcon, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'finance' | 'dashboard' | 'favorites' | 'admin'
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [maxPrice, setMaxPrice] = useState(400000);
  const [sortBy, setSortBy] = useState('default');

  // Modals
  const [selectedCarForModal, setSelectedCarForModal] = useState(null);
  const [testDriveCar, setTestDriveCar] = useState(null);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { favorites } = useFavorites();

  // Fetch cars API
  const fetchCars = async () => {
    setLoading(true);
    try {
      let url = '/api/cars?';
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
      if (activeCategory !== 'All') url += `category=${encodeURIComponent(activeCategory)}&`;
      if (selectedMake !== 'All') url += `make=${encodeURIComponent(selectedMake)}&`;
      if (selectedFuel !== 'All') url += `fuelType=${encodeURIComponent(selectedFuel)}&`;
      if (maxPrice) url += `maxPrice=${maxPrice}&`;
      if (sortBy !== 'default') url += `sort=${sortBy}&`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setCars(data.data);
      }
    } catch (err) {
      console.log('Using initial client fallback data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [searchTerm, activeCategory, selectedMake, selectedFuel, maxPrice, sortBy]);

  const makes = ["All", "Porsche", "Tesla", "Audi", "BMW", "Mercedes-Benz", "Ferrari", "Land Rover"];
  const fuels = ["All", "Petrol", "Electric", "Hybrid"];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Sticky Navigation */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onOpenTestDrive={(car) => {
          setTestDriveCar(car);
          setIsTestDriveOpen(true);
        }}
      />

      {/* View Routing */}
      {activeTab === 'inventory' && (
        <main style={{ flex: 1 }}>
          
          {/* Futuristic Hero Section */}
          <Hero 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onExploreClick={() => {
              const el = document.getElementById('inventory-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Multi-Facet Filter Bar */}
          <section id="inventory-grid" style={{ padding: '0 1rem', marginBottom: '2rem' }}>
            <div className="glass-panel" style={{
              borderRadius: '20px',
              padding: '1.2rem 1.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              border: '1px solid var(--border-glass)'
            }}>
              
              {/* Left Filters Group */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <SlidersHorizontal size={18} /> Filters:
                </div>

                {/* Make Select */}
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-glass)',
                    color: '#FFF',
                    padding: '0.45rem 0.8rem',
                    borderRadius: '10px',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="All">All Makes</option>
                  {makes.filter(m => m !== 'All').map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                {/* Fuel Select */}
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-glass)',
                    color: '#FFF',
                    padding: '0.45rem 0.8rem',
                    borderRadius: '10px',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="All">All Fuel Types</option>
                  {fuels.filter(f => f !== 'All').map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>

                {/* Price Range Slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Max Price:</span>
                  <input 
                    type="range"
                    min="100000"
                    max="500000"
                    step="10000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    style={{ accentColor: '#00F0FF', width: '110px' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                    ${(maxPrice / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>

              {/* Right Sort Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-glass)',
                    color: '#FFF',
                    padding: '0.45rem 0.8rem',
                    borderRadius: '10px',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="default">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Newest Year</option>
                  <option value="hp-desc">Most Powerful (HP)</option>
                </select>
              </div>

            </div>
          </section>

          {/* Cars Grid */}
          <section style={{ padding: '0 1rem 4rem 1rem' }}>
            {cars.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '24px',
                border: '1px dashed var(--border-glass)'
              }}>
                <CarIcon size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFF' }}>No Vehicles Match Your Criteria</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>Try clearing filters or searching for a different brand.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                    setSelectedMake('All');
                    setSelectedFuel('All');
                    setMaxPrice(500000);
                  }}
                  className="btn-secondary"
                  style={{ marginTop: '1.2rem' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.8rem'
              }}>
                {cars.map(car => (
                  <CarCard 
                    key={car.id}
                    car={car}
                    onViewDetails={(c) => setSelectedCarForModal(c)}
                    onBookTestDrive={(c) => {
                      setTestDriveCar(c);
                      setIsTestDriveOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </section>

        </main>
      )}

      {activeTab === 'finance' && (
        <FinanceCalculator initialPrice={cars[0] ? cars[0].price : 180000} />
      )}

      {activeTab === 'dashboard' && (
        <UserDashboard 
          onViewCarDetails={(c) => setSelectedCarForModal(c)}
          onBookTestDrive={(c) => {
            setTestDriveCar(c);
            setIsTestDriveOpen(true);
          }}
        />
      )}

      {activeTab === 'favorites' && (
        <UserDashboard 
          onViewCarDetails={(c) => setSelectedCarForModal(c)}
          onBookTestDrive={(c) => {
            setTestDriveCar(c);
            setIsTestDriveOpen(true);
          }}
        />
      )}

      {activeTab === 'admin' && (
        <AdminPortal cars={cars} onRefresh={fetchCars} />
      )}

      {/* Footer */}
      <Footer />

      {/* Popups & Modals */}
      {selectedCarForModal && (
        <CarDetailModal 
          car={selectedCarForModal}
          onClose={() => setSelectedCarForModal(null)}
          onBookTestDrive={(c) => {
            setTestDriveCar(c);
            setIsTestDriveOpen(true);
          }}
        />
      )}

      {isTestDriveOpen && (
        <TestDriveModal 
          car={testDriveCar}
          carsList={cars}
          onClose={() => setIsTestDriveOpen(false)}
        />
      )}

      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)}
        />
      )}

    </div>
  );
}
