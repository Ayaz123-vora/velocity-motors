import React, { useState } from 'react';
import { X, User, Lock, Mail, Shield, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let res;
    if (isRegister) {
      res = await register(name, email, password, role);
    } else {
      res = await login(email, password);
    }

    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(5, 7, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '440px',
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

        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-cyan), #0088FF)',
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.8rem auto',
            boxShadow: '0 0 20px var(--accent-cyan-glow)'
          }}>
            <Zap size={26} color="#FFFFFF" />
          </div>

          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)' }}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {isRegister ? 'Join Velocity Motors luxury network' : 'Sign in to access saved inventory & bookings'}
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 46, 99, 0.15)',
            border: '1px solid #FF2E63',
            color: '#FF2E63',
            padding: '0.6rem 0.8rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                Full Name
              </label>
              <input 
                type="text"
                required
                placeholder="e.g. Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
          )}

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              Email Address
            </label>
            <input 
              type="email"
              required
              placeholder="admin@velocity.com or user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              Password
            </label>
            <input 
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {isRegister && (
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
                <option value="Buyer">Buyer / Client</option>
                <option value="Admin">Dealer Administrator</option>
              </select>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Authenticating...' : (isRegister ? 'Register Account' : 'Sign In')}
          </button>

          <div style={{ textAlign: 'center', marginTop: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
            </span>
            {' '}
            <button 
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              style={{ background: 'transparent', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700 }}
            >
              {isRegister ? 'Sign In' : 'Create One'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
