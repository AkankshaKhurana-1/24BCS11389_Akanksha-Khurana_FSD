import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeftRight, RefreshCw, Sun, Moon, DollarSign, History, TrendingUp } from 'lucide-react';
import { CURRENCIES, fetchExchangeRate } from './services/currencyApi';

export default function App() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(86.5);
  const [convertedAmount, setConvertedAmount] = useState(8650);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('apex_theme') || 'dark');

  // Sync theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('apex_theme', theme);
  }, [theme]);

  // Fetch exchange rate on currency pair change
  const convertCurrency = useCallback(async () => {
    setIsLoading(true);
    const rate = await fetchExchangeRate(fromCurrency, toCurrency);
    setExchangeRate(rate);
    const result = amount * rate;
    setConvertedAmount(result);
    setIsLoading(false);

    // Save to conversion history log
    setHistory((prev) => [
      {
        id: Date.now(),
        from: fromCurrency,
        to: toCurrency,
        amount,
        result: result.toFixed(2),
        rate: rate.toFixed(4),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev.slice(0, 9),
    ]);
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      {/* Header Navbar */}
      <header className="navbar">
        <div className="logo-brand">
          <DollarSign className="brand-icon" size={28} />
          <h1>ApexConvert</h1>
          <span className="version-pill">v1.0</span>
        </div>
        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main className="main-content">
        <div className="converter-card">
          <h2 className="card-heading">
            Currency Converter <TrendingUp size={20} className="heading-icon" />
          </h2>

          <div className="input-group">
            <label htmlFor="amount-input">Amount</label>
            <input
              id="amount-input"
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="amount-input"
            />
          </div>

          <div className="selectors-row">
            <div className="currency-selector">
              <label>From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {Object.keys(CURRENCIES).map((code) => (
                  <option key={code} value={code}>
                    {code} - {CURRENCIES[code].name}
                  </option>
                ))}
              </select>
            </div>

            <button className="swap-btn" onClick={handleSwap} title="Swap Currencies">
              <ArrowLeftRight size={20} />
            </button>

            <div className="currency-selector">
              <label>To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {Object.keys(CURRENCIES).map((code) => (
                  <option key={code} value={code}>
                    {code} - {CURRENCIES[code].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="convert-btn" onClick={convertCurrency} disabled={isLoading}>
            {isLoading ? <RefreshCw size={20} className="spin" /> : 'Convert'}
          </button>

          <div className="result-box">
            <span className="result-label">Converted Amount</span>
            <div className="result-value">
              {CURRENCIES[toCurrency]?.symbol} {(amount * exchangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
            </div>
            <span className="rate-info">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </span>
          </div>
        </div>

        {/* History Log Card */}
        {history.length > 0 && (
          <div className="history-card">
            <h3><History size={18} /> Recent Conversions</h3>
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id} className="history-item">
                  <span>{item.amount} {item.from} → <strong>{item.result} {item.to}</strong></span>
                  <span className="history-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>ApexConvert | Real-Time Forex Exchange Rates</p>
      </footer>
    </div>
  );
}
