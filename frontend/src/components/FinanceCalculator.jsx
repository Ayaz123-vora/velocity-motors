import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, Shield, ArrowRight } from 'lucide-react';

export default function FinanceCalculator({ initialPrice = 150000 }) {
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termMonths, setTermMonths] = useState(60);

  const downPayment = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0 && loanAmount > 0) {
    monthlyPayment = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1)
    );
  } else if (loanAmount > 0) {
    monthlyPayment = Math.round(loanAmount / termMonths);
  }

  const totalPayment = monthlyPayment * termMonths + downPayment;
  const totalInterest = Math.max(0, totalPayment - vehiclePrice);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="glass-panel" style={{
      margin: '0 1rem 3rem 1rem',
      padding: '2.5rem 2rem',
      borderRadius: '24px',
      border: '1px solid var(--border-glass-bright)',
      background: 'var(--modal-bg)',
      color: 'var(--text-main)'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge-gold" style={{ display: 'inline-block', marginBottom: '0.6rem' }}>
            FLEXIBLE LUXURY FINANCING & LEASING
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-main)' }}>
            Supercar EMI & Finance Estimator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.4rem' }}>
            Customize your lease or loan parameters to instantly view estimated monthly installments.
          </p>
        </div>

        {/* Grid Calculator Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
          
          {/* Sliders Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            
            {/* Vehicle Price Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Vehicle Price</label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(vehiclePrice)}
                </span>
              </div>
              <input 
                type="range"
                min="50000"
                max="500000"
                step="5000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </div>

            {/* Down Payment Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(downPayment)}
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
              />
            </div>

            {/* Interest Rate & Term Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Interest Rate (APR %)
                </label>
                <input 
                  type="number"
                  step="0.1"
                  min="1"
                  max="20"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    padding: '0.6rem 0.8rem',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Loan Term (Months)
                </label>
                <select
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    padding: '0.6rem 0.8rem',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem'
                  }}
                >
                  <option value={36}>36 Months (3 Yrs)</option>
                  <option value={48}>48 Months (4 Yrs)</option>
                  <option value={60}>60 Months (5 Yrs)</option>
                  <option value={72}>72 Months (6 Yrs)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results Summary Box */}
          <div style={{
            background: 'var(--input-bg)',
            border: '1px solid var(--border-glass-bright)',
            padding: '2rem',
            borderRadius: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              ESTIMATED MONTHLY PAYMENT
            </div>
            
            <div style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
              marginBottom: '1.5rem'
            }}>
              {formatCurrency(monthlyPayment)}
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/mo</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Loan Amount</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{formatCurrency(loanAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Interest Payable</span>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{formatCurrency(totalInterest)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Out of Pocket</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{formatCurrency(totalPayment)}</span>
              </div>
            </div>

            <button 
              onClick={() => alert("Financial Application pre-approval initiated! A concierge agent will contact you.")}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Get Pre-Approved Online <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
