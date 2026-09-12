import React, { useState, useEffect, useCallback } from 'react';
import Counter from './components/Counter';
import StepControl from './components/StepControl';
import HistoryLog from './components/HistoryLog';
import { Sun, Moon, Hash, RotateCcw, Award } from 'lucide-react';

export default function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('omnicount_val');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('omnicount_theme') || 'dark');
  const [highestCount, setHighestCount] = useState(count);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('omnicount_theme', theme);
  }, [theme]);

  // Persist count & track peak highest count
  useEffect(() => {
    localStorage.setItem('omnicount_val', count);
    if (count > highestCount) {
      setHighestCount(count);
    }
  }, [count, highestCount]);

  const addHistoryItem = (type, currentStep, newCount) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newItem = {
      id: Date.now(),
      type,
      step: currentStep,
      newCount,
      timestamp: timeStr,
    };
    setHistory((prev) => [newItem, ...prev.slice(0, 49)]); // keep max 50 items
  };

  const handleIncrement = useCallback(() => {
    setCount((prev) => {
      const next = prev + step;
      addHistoryItem('increment', step, next);
      return next;
    });
  }, [step]);

  const handleDecrement = useCallback(() => {
    setCount((prev) => {
      const next = prev - step;
      addHistoryItem('decrement', step, next);
      return next;
    });
  }, [step]);

  const handleReset = useCallback(() => {
    setCount(0);
    addHistoryItem('reset', step, 0);
  }, [step]);

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === '+' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleIncrement();
      } else if (e.key === '-' || e.code === 'ArrowDown') {
        e.preventDefault();
        handleDecrement();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleIncrement, handleDecrement, handleReset]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-container">
      {/* Top Navbar Header */}
      <header className="navbar">
        <div className="logo-brand">
          <Hash className="brand-icon" size={28} />
          <h1>OmniCount</h1>
          <span className="version-pill">v1.0</span>
        </div>
        <div className="nav-controls">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <section className="counter-section">
          {/* Main Counter Card */}
          <Counter
            count={count}
            step={step}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleReset}
          />

          {/* Quick Stats Bar */}
          <div className="quick-stats">
            <div className="stat-pill">
              <Award size={16} />
              <span>Highest Peak: <strong>{highestCount}</strong></span>
            </div>
            <div className="stat-pill">
              <RotateCcw size={16} />
              <span>Current Step: <strong>{step}</strong></span>
            </div>
          </div>

          {/* Step Control */}
          <StepControl step={step} onStepChange={setStep} />

          {/* Keyboard Shortcuts Hint */}
          <div className="keyboard-hints">
            <span><kbd>+</kbd> / <kbd>↑</kbd> Increment</span>
            <span><kbd>-</kbd> / <kbd>↓</kbd> Decrement</span>
            <span><kbd>R</kbd> Reset</span>
          </div>
        </section>

        {/* Activity History Log */}
        <section className="history-section">
          <HistoryLog history={history} onClearHistory={handleClearHistory} />
        </section>
      </main>

      <footer className="footer">
        <p>Built with React & Vite | Experiment 1 Counter Application</p>
      </footer>
    </div>
  );
}
