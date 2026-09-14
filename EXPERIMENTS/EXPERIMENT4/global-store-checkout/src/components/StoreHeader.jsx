import React, { useState } from 'react';
import { useCurrency, EXCHANGE_RATES } from '../context/CurrencyContext';
import { Globe, DollarSign, Euro, PoundSterling, JapaneseYen, PlusCircle } from 'lucide-react';

export const StoreHeader = () => {
  const { currency, changeCurrency } = useCurrency();
  const [customCurrencyInput, setCustomCurrencyInput] = useState('');

  const currencies = [
    { code: 'USD', label: 'USD ($)', icon: DollarSign },
    { code: 'EUR', label: 'EUR (€)', icon: Euro },
    { code: 'GBP', label: 'GBP (£)', icon: PoundSterling },
    { code: 'JPY', label: 'JPY (¥)', icon: JapaneseYen },
  ];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customCurrencyInput.trim()) {
      changeCurrency(customCurrencyInput.trim().toUpperCase());
      setCustomCurrencyInput('');
    }
  };

  return (
    <header className="header-container">
      <div className="header-brand">
        <div className="logo-badge">
          <Globe className="logo-icon" size={24} />
        </div>
        <div>
          <h1 className="brand-title">Global Tech Store</h1>
          <p className="brand-subtitle">Context API Currency State Demo</p>
        </div>
      </div>

      <div className="currency-selector-section">
        <span className="selector-label">Select Currency:</span>
        <div className="button-group">
          {currencies.map(({ code, label }) => {
            const isActive = currency === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => changeCurrency(code)}
                className={`currency-btn ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                {code}
              </button>
            );
          })}
        </div>

        {/* Fallback / Custom Currency Test Tool */}
        <div className="custom-currency-form-wrapper">
          <form onSubmit={handleCustomSubmit} className="custom-currency-form">
            <input
              type="text"
              placeholder="Test Custom (e.g. CAD)"
              value={customCurrencyInput}
              onChange={(e) => setCustomCurrencyInput(e.target.value)}
              className="custom-input"
              maxLength={5}
            />
            <button type="submit" className="custom-btn" title="Test Fallback Rule">
              <PlusCircle size={16} />
              Set Code
            </button>
          </form>
        </div>
      </div>

      <div className="active-currency-badge">
        <span className="badge-title">Active Currency:</span>
        <span className="badge-code">{currency}</span>
        {!EXCHANGE_RATES[currency] && (
          <span className="fallback-tag" title="Missing rate lookup fallback mode">
            Fallback Format Mode
          </span>
        )}
      </div>
    </header>
  );
};

export default StoreHeader;
