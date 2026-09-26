import React, { useState } from 'react';
import { X, Zap, Shield, Check, Calendar, Calculator, Flame, Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getImagesForCar, FALLBACK_CAR_IMAGE } from '../utils/carImageMap';

export default function CarDetailModal({ car, onClose, onBookTestDrive }) {
  if (!car) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(car.id);

  const images = getImagesForCar(car.title || car.make, car.images);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const monthlyEst = Math.round((car.price * 0.8 * (0.065 / 12)) / (1 - Math.pow(1 + 0.065 / 12, -60)));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 7, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '950px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '24px',
        border: '1px solid var(--border-glass-bright)',
        background: 'var(--modal-bg)',
        color: 'var(--text-main)',
        position: 'relative'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'var(--input-bg)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-main)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header Gallery */}
        <div style={{ position: 'relative', width: '100%', height: '360px', background: '#07090E' }}>
          <img 
            src={images[activeImgIndex] || images[0]} 
            alt={car.title} 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_CAR_IMAGE;
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to top, var(--modal-bg) 20%, transparent)'
          }} />

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '20px',
              display: 'flex',
              gap: '8px',
              zIndex: 5
            }}>
              {images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt="thumb"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_CAR_IMAGE;
                  }}
                  onClick={() => setActiveImgIndex(idx)}
                  style={{
                    width: '60px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: activeImgIndex === idx ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                    cursor: 'pointer',
                    opacity: activeImgIndex === idx ? 1 : 0.6
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem' }}>
          
          {/* Header Specs & Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span className="badge-gold">{car.make} OFFICIAL</span>
                <span className="badge-neon">{car.fuelType}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Year {car.year}</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)' }}>{car.title}</h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>LIST PRICE</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(car.price)}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                Est. ${monthlyEst.toLocaleString()}/mo with financing
              </div>
            </div>
          </div>

          {/* Core Performance Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            padding: '1.2rem',
            background: 'var(--input-bg)',
            borderRadius: '16px',
            border: '1px solid var(--border-glass)',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>HORSEPOWER</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{car.horsepower} HP</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>0-60 MPH</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{car.zeroToSixty}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TOP SPEED</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{car.topSpeed}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DRIVETRAIN</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{car.drivetrain}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TRANSMISSION</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{car.transmission}</div>
            </div>
          </div>

          {/* Overview & Detailed Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.8rem' }}>Vehicle Overview</h4>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {car.description}
              </p>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.8rem' }}>Key Features & Options</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {car.features && car.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <div style={{ background: 'var(--accent-cyan-glow)', padding: '3px', borderRadius: '50%' }}>
                      <Check size={12} color="var(--accent-cyan)" />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Spec Box */}
            <div style={{
              background: 'var(--input-bg)',
              padding: '1.2rem',
              borderRadius: '16px',
              border: '1px solid var(--border-glass)'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>Build Specifications</h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Engine</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{car.engine}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Exterior</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{car.exteriorColor}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Interior</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{car.interiorColor}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Odometer</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{car.mileage.toLocaleString()} mi</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{car.status}</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingTop: '1.2rem',
            borderTop: '1px solid var(--border-glass)'
          }}>
            <button 
              onClick={() => toggleFavorite(car)}
              className="btn-secondary"
            >
              <Heart size={18} color={favorite ? '#FF2E63' : 'currentColor'} fill={favorite ? '#FF2E63' : 'none'} />
              {favorite ? 'Saved in Wishlist' : 'Add to Wishlist'}
            </button>

            <button 
              onClick={() => {
                onClose();
                onBookTestDrive(car);
              }}
              className="btn-primary"
              style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}
            >
              <Calendar size={18} /> Schedule VIP Test Drive
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
