import React, { useState } from 'react';
import { Zap, Heart, User, Shield, Compass, Calculator, Calendar, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeTab, setActiveTab, onOpenAuthModal, onOpenTestDrive }) {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: '12px',
      zIndex: 100,
      margin: '0 1rem 2rem 1rem',
      padding: '0.85rem 1.5rem',
      borderRadius: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('inventory')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-cyan), #0088FF)',
            padding: '8px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px var(--accent-cyan-glow)'
          }}>
            <Zap size={22} color="#FFFFFF" />
          </div>
          <div>
            <span style={{
              fontSize: '1.4rem',
              fontWeight: 900,
              letterSpacing: '0.05em',
              background: 'linear-gradient(90deg, var(--text-main) 30%, var(--accent-cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              VELOCITY
            </span>
            <span style={{
              fontSize: '0.65rem',
              display: 'block',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              marginTop: '-3px'
            }}>
              MOTORS LUXURY
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }} className="desktop-nav">
          <button 
            onClick={() => setActiveTab('inventory')}
            style={{
              background: 'transparent',
              color: activeTab === 'inventory' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontWeight: activeTab === 'inventory' ? 700 : 500,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Compass size={16} /> Inventory
          </button>

          <button 
            onClick={() => setActiveTab('finance')}
            style={{
              background: 'transparent',
              color: activeTab === 'finance' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontWeight: activeTab === 'finance' ? 700 : 500,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Calculator size={16} /> EMI Calculator
          </button>

          {user && (
            <button 
              onClick={() => setActiveTab('dashboard')}
              style={{
                background: 'transparent',
                color: activeTab === 'dashboard' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: activeTab === 'dashboard' ? 700 : 500,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Calendar size={16} /> My Bookings
            </button>
          )}

          {user && user.role === 'Admin' && (
            <button 
              onClick={() => setActiveTab('admin')}
              style={{
                background: 'rgba(255, 199, 44, 0.1)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(255, 199, 44, 0.3)',
                padding: '0.35rem 0.8rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Shield size={14} /> Dealer Portal
            </button>
          )}
        </div>

        {/* User & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          
          {/* Day / Night Theme Toggle */}
          <button 
            onClick={toggleTheme}
            title={theme === 'dark' ? "Switch to Day Mode" : "Switch to Night Mode"}
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border-glass)',
              color: theme === 'dark' ? 'var(--accent-gold)' : 'var(--accent-cyan)',
              padding: '0.5rem 0.8rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 700
            }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            <span style={{ fontSize: '0.8rem' }}>{theme === 'dark' ? 'Day' : 'Night'}</span>
          </button>

          {/* Wishlist Button */}
          <button 
            onClick={() => setActiveTab('favorites')}
            style={{
              position: 'relative',
              background: 'var(--input-bg)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-main)',
              padding: '0.5rem 0.8rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Heart size={18} color={favorites.length > 0 ? '#FF2E63' : 'currentColor'} fill={favorites.length > 0 ? '#FF2E63' : 'none'} />
            {favorites.length > 0 && (
              <span style={{
                background: '#FF2E63',
                color: '#FFF',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                {favorites.length}
              </span>
            )}
          </button>

          {/* Book Test Drive Call to Action */}
          <button 
            onClick={() => onOpenTestDrive(null)}
            className="btn-primary"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
          >
            <Calendar size={15} /> Book Test Drive
          </button>

          {/* Auth Profile */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div 
                onClick={() => setActiveTab('dashboard')}
                style={{
                  background: 'var(--accent-cyan-glow)',
                  border: '1px solid var(--border-glass-bright)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                <User size={16} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</span>
              </div>
              <button 
                onClick={logout}
                title="Logout"
                style={{ background: 'transparent', color: 'var(--text-muted)', padding: '4px' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuthModal}
              className="btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            >
              <User size={15} /> Sign In
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
