import React from 'react';
import { Heart, Zap, Gauge, Flame, Calendar, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getImagesForCar, FALLBACK_CAR_IMAGE } from '../utils/carImageMap';

export default function CarCard({ car, onViewDetails, onBookTestDrive }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(car.id);

  const images = getImagesForCar(car.title || car.make, car.images);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="glass-panel" style={{
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      position: 'relative'
    }}>
      
      {/* Featured Badge */}
      {car.featured && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 10,
          background: 'var(--accent-cyan)',
          color: '#FFFFFF',
          fontSize: '0.7rem',
          fontWeight: 800,
          padding: '0.2rem 0.6rem',
          borderRadius: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: '3px'
        }}>
          <Zap size={12} fill="#FFFFFF" /> FEATURED
        </div>
      )}

      {/* Favorite Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(car);
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'var(--input-bg)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-glass)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <Heart size={18} color={favorite ? '#FF2E63' : 'var(--text-main)'} fill={favorite ? '#FF2E63' : 'none'} />
      </button>

      {/* Image Container linked with Car Name + onError fallback */}
      <div 
        onClick={() => onViewDetails(car)}
        style={{
          height: '210px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          background: '#0B0F19'
        }}
      >
        <img 
          src={images[0]} 
          alt={car.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_CAR_IMAGE;
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(to top, var(--bg-surface), transparent)'
        }} />
      </div>

      {/* Content Info */}
      <div style={{ padding: '1.2rem 1.4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Make & Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {car.make} • {car.year}
          </span>
          <span className="badge-neon" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
            {car.category}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onViewDetails(car)}
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: '0.8rem',
            cursor: 'pointer',
            lineHeight: 1.2
          }}
        >
          {car.title}
        </h3>

        {/* Key Performance Specs Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          padding: '0.6rem 0.8rem',
          background: 'var(--input-bg)',
          borderRadius: '10px',
          marginBottom: '1rem',
          border: '1px solid var(--border-glass)'
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>0-60 MPH</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{car.zeroToSixty}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>POWER</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{car.horsepower} HP</div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>TOP SPEED</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{car.topSpeed}</div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div style={{ marginTop: 'auto', paddingTop: '0.8rem', borderTop: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MSRP / PRICE</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(car.price)}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <button 
              onClick={() => onViewDetails(car)}
              className="btn-secondary"
              style={{ justifyContent: 'center', padding: '0.55rem', fontSize: '0.8rem' }}
            >
              View Specs <ArrowUpRight size={14} />
            </button>
            <button 
              onClick={() => onBookTestDrive(car)}
              className="btn-primary"
              style={{ justifyContent: 'center', padding: '0.55rem', fontSize: '0.8rem' }}
            >
              <Calendar size={14} /> Test Drive
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
