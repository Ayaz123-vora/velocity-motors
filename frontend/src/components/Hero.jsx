import React from 'react';
import { Search, Flame, Zap, Award, Gauge, ArrowRight } from 'lucide-react';

export default function Hero({ searchTerm, setSearchTerm, activeCategory, setActiveCategory, onExploreClick }) {
  const categories = ["All", "Supercar", "Electric", "Luxury", "SUV", "Sedan"];

  return (
    <div className="glass-panel glow-animation" style={{
      margin: '0 1rem 2.5rem 1rem',
      padding: '3.5rem 2rem 3rem 2rem',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid var(--border-glass-bright)',
      background: 'var(--bg-surface)'
    }}>
      
      {/* Background Graphic Accents */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, var(--accent-cyan-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        
        {/* Top Tagline */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
          <span className="badge-neon" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Flame size={14} color="var(--accent-cyan)" /> 2026 HYPERCAR INVENTORY LIVE
          </span>
          <span className="badge-gold">
            AUTHENTICATED CERTIFIED DEALERSHIP
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '1.2rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          color: 'var(--text-main)'
        }}>
          ENGINEERED FOR EXTREMES.<br />
          <span style={{
            background: 'linear-gradient(90deg, var(--accent-cyan) 0%, #0088FF 50%, var(--accent-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            DRIVEN BY PASSION.
          </span>
        </h1>

        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.1rem',
          maxWidth: '650px',
          margin: '0 auto 2rem auto',
          lineHeight: 1.6
        }}>
          Explore an elite collection of world-class supercars, hyper-electric sports sedans, and custom luxury vehicles with zero-friction home delivery and track test drives.
        </p>

        {/* Live Search Bar */}
        <div style={{
          background: 'var(--input-bg)',
          border: '1px solid var(--border-glass-bright)',
          borderRadius: '16px',
          padding: '0.5rem 0.6rem 0.5rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          maxWidth: '620px',
          margin: '0 auto 2rem auto',
          boxShadow: 'var(--shadow-card)'
        }}>
          <Search size={22} color="var(--accent-cyan)" />
          <input 
            type="text"
            placeholder="Search by model, brand (e.g. Porsche 911, Tesla, Audi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '1rem',
              fontFamily: 'var(--font-heading)'
            }}
          />
          <button 
            onClick={onExploreClick}
            className="btn-primary"
            style={{ padding: '0.7rem 1.2rem', fontSize: '0.9rem' }}
          >
            Explore <ArrowRight size={16} />
          </button>
        </div>

        {/* Category Toggles */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'var(--accent-cyan-glow)' : 'var(--input-bg)',
                color: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--text-muted)',
                border: activeCategory === cat ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                padding: '0.45rem 1.1rem',
                borderRadius: '30px',
                fontSize: '0.88rem',
                fontWeight: activeCategory === cat ? 700 : 500
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Performance Stats Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          padding: '1.2rem 1rem',
          background: 'var(--input-bg)',
          borderRadius: '16px',
          border: '1px solid var(--border-glass)'
        }}>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              1.99s
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              0-60 MPH RECURSION
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
              1,020 HP
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              MAX HYPER HORSEPOWER
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
              211 MPH
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              TOP SPEED TRACK RATED
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-rose)', fontFamily: 'var(--font-mono)' }}>
              100%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              INSPECTED & GUARANTEED
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
