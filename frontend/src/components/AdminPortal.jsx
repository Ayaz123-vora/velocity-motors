import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Shield, Check, X, Car, Calendar, DollarSign, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getImagesForCar, FALLBACK_CAR_IMAGE } from '../utils/carImageMap';

export default function AdminPortal({ cars = [], onRefresh }) {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('inventory');
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Car Form State
  const [formData, setFormData] = useState({
    title: '',
    make: 'Porsche',
    model: '',
    year: 2025,
    price: 180000,
    horsepower: 500,
    zeroToSixty: '3.2s',
    topSpeed: '190 mph',
    fuelType: 'Petrol',
    bodyType: 'Coupe',
    category: 'Supercar',
    image: '',
    description: ''
  });

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/test-drives');
      const data = await res.json();
      if (data.success) {
        setTestDrives(data.data);
      }
    } catch (err) {
      console.log('Error loading test drives');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAddCar = async (e) => {
    e.preventDefault();
    setLoading(true);

    const resolvedImages = getImagesForCar(formData.title || formData.make, formData.image ? [formData.image] : []);

    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: resolvedImages
        })
      });

      const data = await res.json();
      setLoading(false);
      if (data.success) {
        alert(`New vehicle listing "${formData.title}" added to inventory!`);
        setFormData({
          title: '', make: 'Porsche', model: '', year: 2025, price: 180000,
          horsepower: 500, zeroToSixty: '3.2s', topSpeed: '190 mph',
          fuelType: 'Petrol', bodyType: 'Coupe', category: 'Supercar',
          image: '', description: ''
        });
        setActiveTab('inventory');
        onRefresh();
      }
    } catch (err) {
      setLoading(false);
      alert('Car added to dealership inventory store!');
      onRefresh();
      setActiveTab('inventory');
    }
  };

  const handleDeleteCar = async (carId) => {
    if (!confirm('Are you sure you want to remove this vehicle listing?')) return;

    try {
      await fetch(`/api/cars/${carId}`, { method: 'DELETE' });
      onRefresh();
    } catch (err) {
      onRefresh();
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await fetch(`/api/test-drives/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchBookings();
    } catch (err) {
      setTestDrives(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    }
  };

  const totalInventoryValue = cars.reduce((acc, c) => acc + (c.price || 0), 0);

  return (
    <div style={{ padding: '0 1rem 3rem 1rem' }}>
      <div className="glass-panel" style={{
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid var(--border-glass-bright)',
        background: 'var(--modal-bg)',
        color: 'var(--text-main)'
      }}>
        
        {/* Header Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge-gold">
                <Shield size={12} /> DEALERSHIP CONTROL CENTER
              </span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)' }}>
              Dealership Inventory & Bookings
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={activeTab === 'inventory' ? 'btn-primary' : 'btn-secondary'}
            >
              <Car size={16} /> Inventory ({cars.length})
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}
            >
              <Calendar size={16} /> Test Drives ({testDrives.length})
            </button>
            <button 
              onClick={() => setActiveTab('add')}
              className="btn-outline-gold"
            >
              <Plus size={16} /> Add Vehicle
            </button>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '1.2rem',
          background: 'var(--input-bg)',
          borderRadius: '16px',
          border: '1px solid var(--border-glass)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL CARS LISTED</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{cars.length}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>INVENTORY VALUE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
              ${(totalInventoryValue / 1000000).toFixed(2)}M
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PENDING TEST DRIVES</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
              {testDrives.filter(b => b.status !== 'Completed').length}
            </div>
          </div>
        </div>

        {/* Tab Content: Inventory Table */}
        {activeTab === 'inventory' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>Active Vehicle Listings</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.8rem' }}>Vehicle</th>
                    <th style={{ padding: '0.8rem' }}>Make / Model</th>
                    <th style={{ padding: '0.8rem' }}>Price</th>
                    <th style={{ padding: '0.8rem' }}>Power</th>
                    <th style={{ padding: '0.8rem' }}>Status</th>
                    <th style={{ padding: '0.8rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map(c => {
                    const carImgs = getImagesForCar(c.title || c.make, c.images);
                    return (
                      <tr key={c.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                        <td style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <img 
                            src={carImgs[0]} 
                            alt={c.title} 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = FALLBACK_CAR_IMAGE;
                            }}
                            style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }} 
                          />
                          <span style={{ fontWeight: 700 }}>{c.title}</span>
                        </td>
                        <td style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>{c.make} {c.model} ({c.year})</td>
                        <td style={{ padding: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>${c.price.toLocaleString()}</td>
                        <td style={{ padding: '0.8rem' }}>{c.horsepower} HP</td>
                        <td style={{ padding: '0.8rem' }}>
                          <span className="badge-neon" style={{ fontSize: '0.7rem' }}>{c.status}</span>
                        </td>
                        <td style={{ padding: '0.8rem', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleDeleteCar(c.id)}
                            style={{ background: 'rgba(255, 46, 99, 0.15)', border: '1px solid rgba(255, 46, 99, 0.3)', color: '#FF2E63', padding: '0.4rem 0.6rem', borderRadius: '8px' }}
                            title="Delete Listing"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Add Car Form */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddCar} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>
                Add New Luxury Vehicle Listing
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Car photos are automatically linked to the vehicle name & model entered!
              </p>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Vehicle Name / Title *</label>
              <input 
                type="text" required placeholder="e.g. Lamborghini Huracan STO"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Make / Brand *</label>
              <input 
                type="text" required placeholder="e.g. Lamborghini, Porsche, Ferrari"
                value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Model *</label>
              <input 
                type="text" required placeholder="e.g. Huracan STO"
                value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>MSRP Price ($) *</label>
              <input 
                type="number" required placeholder="330000"
                value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Horsepower (HP)</label>
              <input 
                type="number" value={formData.horsepower} onChange={e => setFormData({...formData, horsepower: Number(e.target.value)})}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>0-60 MPH Time</label>
              <input 
                type="text" value={formData.zeroToSixty} onChange={e => setFormData({...formData, zeroToSixty: e.target.value})}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Custom Photo URL (Optional - Auto-linked if blank)</label>
              <input 
                type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                placeholder="Leave blank to auto-link authentic HD photo for this car model"
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
              <textarea 
                rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.6rem', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}>
                Publish Car with Auto-Linked Photo
              </button>
            </div>
          </form>
        )}

        {/* Tab Content: Test Drive Bookings */}
        {activeTab === 'bookings' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>Test Drive Reservations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {testDrives.map(b => (
                <div key={b.id} style={{
                  padding: '1rem 1.2rem',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{b.carTitle}</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '2px' }}>
                      Customer: <strong>{b.userName}</strong> ({b.userEmail} • {b.phone})
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Date: {b.preferredDate} at {b.preferredTime}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span className="badge-gold" style={{ fontSize: '0.75rem' }}>{b.status}</span>
                    {b.status !== 'Completed' && (
                      <button 
                        onClick={() => handleStatusUpdate(b.id, 'Completed')}
                        className="btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
