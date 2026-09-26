import React from 'react';
import { User, Heart, Calendar, Clock, ShieldCheck, Car, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import CarCard from './CarCard';

export default function UserDashboard({ onViewCarDetails, onBookTestDrive }) {
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div style={{ padding: '0 1rem 3rem 1rem' }}>
      <div className="glass-panel" style={{
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        border: '1px solid var(--border-glass-bright)',
        background: 'var(--modal-bg)',
        color: 'var(--text-main)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-cyan), #0088FF)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.4rem',
            color: '#FFFFFF',
            boxShadow: '0 0 20px var(--accent-cyan-glow)'
          }}>
            {user ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)' }}>
                Welcome back, {user ? user.name : 'Guest'}
              </h2>
              <span className="badge-gold">{user ? user.role : 'Buyer'}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {user ? user.email : 'Log in to manage your saved vehicles and test drive appointments.'}
            </p>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={20} color="#FF2E63" fill="#FF2E63" /> Saved Supercars ({favorites.length})
            </h3>
          </div>

          {favorites.length === 0 ? (
            <div style={{
              padding: '3rem 1rem',
              textAlign: 'center',
              background: 'var(--input-bg)',
              borderRadius: '16px',
              border: '1px dashed var(--border-glass)'
            }}>
              <Car size={40} color="var(--text-muted)" style={{ marginBottom: '0.8rem' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>No vehicles saved to your wishlist yet.</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>Click the heart icon on any car to bookmark it here.</span>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {favorites.map(car => (
                <CarCard 
                  key={car.id}
                  car={car}
                  onViewDetails={onViewCarDetails}
                  onBookTestDrive={onBookTestDrive}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
