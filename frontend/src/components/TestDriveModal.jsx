import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TestDriveModal({ car, onClose, carsList = [] }) {
  const { user } = useAuth();
  
  const [selectedCar, setSelectedCar] = useState(car ? car : (carsList[0] || null));
  const [userName, setUserName] = useState(user ? user.name : '');
  const [userEmail, setUserEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-07-30');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/test-drives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: selectedCar ? selectedCar.id : 'car-001',
          carTitle: selectedCar ? selectedCar.title : 'Luxury Vehicle',
          userName,
          userEmail,
          phone,
          preferredDate,
          preferredTime,
          notes
        })
      });

      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(5, 7, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 250,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '580px',
        borderRadius: '24px',
        border: '1px solid var(--border-glass-bright)',
        background: 'var(--modal-bg)',
        color: 'var(--text-main)',
        position: 'relative',
        padding: '2.5rem 2rem'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--input-bg)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-main)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              background: 'var(--accent-cyan-glow)',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem auto',
              border: '1px solid var(--accent-cyan)'
            }}>
              <CheckCircle size={40} color="var(--accent-cyan)" />
            </div>
            
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Test Drive Reserved!
            </h3>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Your VIP test drive appointment for <strong style={{ color: 'var(--accent-cyan)' }}>{selectedCar ? selectedCar.title : 'Selected Vehicle'}</strong> has been locked in for <strong>{preferredDate} at {preferredTime}</strong>.
            </p>

            <button 
              onClick={onClose}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="badge-neon" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
                VIP TRACK & STREET DRIVE
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)' }}>
                Schedule a Test Drive
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Experience raw performance first-hand with our private concierge team.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Select Car */}
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Target Vehicle
                </label>
                <select
                  value={selectedCar ? selectedCar.id : ''}
                  onChange={(e) => {
                    const found = carsList.find(c => c.id === e.target.value);
                    if (found) setSelectedCar(found);
                  }}
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.8rem',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem'
                  }}
                >
                  {carsList.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title} (${c.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.8rem',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Phone Number *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.8rem',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Email Address *
                </label>
                <input 
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.8rem',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Preferred Date
                  </label>
                  <input 
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.8rem',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.8rem',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem'
                    }}
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.8rem', padding: '0.8rem' }}
              >
                {loading ? 'Confirming Appointment...' : 'Confirm Appointment'}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
