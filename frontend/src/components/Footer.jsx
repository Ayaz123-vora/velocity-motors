import React from 'react';
import { Zap, ShieldCheck, MapPin, Phone, Mail, Globe, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel" style={{
      margin: '3rem 1rem 1.5rem 1rem',
      padding: '3rem 2rem 2rem 2rem',
      borderRadius: '24px',
      border: '1px solid var(--border-glass)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2.5rem',
        maxWidth: '1200px',
        margin: '0 auto 2.5rem auto'
      }}>
        
        {/* Brand Summary */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), #0088FF)',
              padding: '6px',
              borderRadius: '10px'
            }}>
              <Zap size={18} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)' }}>
              VELOCITY <span style={{ color: 'var(--accent-cyan)' }}>MOTORS</span>
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Premier global marketplace and dealership for luxury hypercars, performance sports sedans, and high-voltage electric vehicles.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '0.05em' }}>INVENTORY</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li><a href="#" style={{ transition: 'color 0.2s' }}>Supercars & Hypercars</a></li>
            <li><a href="#">Electric & Hybrid</a></li>
            <li><a href="#">Track-Focused Coupe</a></li>
            <li><a href="#">Luxury SUV & Sedans</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '0.05em' }}>CLIENT SERVICES</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <li><a href="#">VIP Test Drive Booking</a></li>
            <li><a href="#">Lease & EMI Calculator</a></li>
            <li><a href="#">Concierge Enclosed Transport</a></li>
            <li><a href="#">Certified 150-Point Inspection</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '0.05em' }}>HEADQUARTERS</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={15} color="var(--accent-cyan)" /> 100 Apex Boulevard, Beverly Hills, CA
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={15} color="var(--accent-cyan)" /> +1 (800) 555-VELOCITY
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={15} color="var(--accent-cyan)" /> concierge@velocitymotors.com
            </div>
          </div>
        </div>

      </div>

      <div style={{
        borderTop: '1px solid var(--border-glass)',
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div>© 2026 Velocity Motors LLC. Full-Stack MERN Architecture. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Concierge</a>
          <a href="#">Security Statement</a>
        </div>
      </div>
    </footer>
  );
}
