import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import StopwatchDisplay from './components/StopwatchDisplay';
import Controls from './components/Controls';
import LapList from './components/LapList';
import StatsSummary from './components/StatsSummary';
import { playSound } from './utils/audio';
import { Sun, Moon, Volume2, VolumeX, Timer, Keyboard } from 'lucide-react';

export default function App() {
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('chrono_theme') || 'dark');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // References for precise timing
  const startTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // Sync theme to document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chrono_theme', theme);
  }, [theme]);

  // Update time using requestAnimationFrame for smooth 60fps millisecond precision
  const updateTimer = useCallback(() => {
    const now = performance.now();
    const elapsed = now - startTimeRef.current + accumulatedTimeRef.current;
    setTimeMs(elapsed);
    animFrameIdRef.current = requestAnimationFrame(updateTimer);
  }, []);

  // Handle Start / Pause
  const handleStart = useCallback(() => {
    if (isRunning) return;
    if (soundEnabled) playSound('start');
    startTimeRef.current = performance.now();
    setIsRunning(true);
    animFrameIdRef.current = requestAnimationFrame(updateTimer);
  }, [isRunning, soundEnabled, updateTimer]);

  const handlePause = useCallback(() => {
    if (!isRunning) return;
    if (soundEnabled) playSound('pause');
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    accumulatedTimeRef.current += performance.now() - startTimeRef.current;
    setIsRunning(false);
  }, [isRunning, soundEnabled]);

  // Handle Lap Recording
  const handleLap = useCallback(() => {
    if (!isRunning) return;
    if (soundEnabled) playSound('lap');

    const currentTotalMs = timeMs;
    const lastOverallMs = laps.length > 0 ? laps[laps.length - 1].overallTimeMs : 0;
    const lapTimeMs = currentTotalMs - lastOverallMs;

    const newLap = {
      id: laps.length + 1,
      lapTimeMs,
      overallTimeMs: currentTotalMs,
      timestamp: Date.now()
    };

    setLaps(prevLaps => [...prevLaps, newLap]);
  }, [isRunning, soundEnabled, timeMs, laps]);

  // Handle Reset
  const handleReset = useCallback(() => {
    if (soundEnabled) playSound('reset');
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    setIsRunning(false);
    setTimeMs(0);
    accumulatedTimeRef.current = 0;
    setLaps([]);
  }, [soundEnabled]);

  // Handle Clear Laps only
  const handleClearLaps = useCallback(() => {
    if (soundEnabled) playSound('reset');
    setLaps([]);
  }, [soundEnabled]);

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore shortcut keys if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) handlePause();
        else handleStart();
      } else if (e.code === 'KeyL') {
        e.preventDefault();
        handleLap();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, handleStart, handlePause, handleLap, handleReset]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Compute Lap Statistics (Fastest, Slowest, Average)
  const { fastestLapId, slowestLapId, fastestLapTime, slowestLapTime, averageLapTime } = useMemo(() => {
    if (laps.length === 0) {
      return { fastestLapId: null, slowestLapId: null, fastestLapTime: 0, slowestLapTime: 0, averageLapTime: 0 };
    }

    let minMs = Infinity;
    let maxMs = -1;
    let fastId = null;
    let slowId = null;
    let totalMsSum = 0;

    laps.forEach(lap => {
      totalMsSum += lap.lapTimeMs;
      if (lap.lapTimeMs < minMs) {
        minMs = lap.lapTimeMs;
        fastId = lap.id;
      }
      if (lap.lapTimeMs > maxMs) {
        maxMs = lap.lapTimeMs;
        slowId = lap.id;
      }
    });

    return {
      fastestLapId: fastId,
      slowestLapId: slowId,
      fastestLapTime: minMs,
      slowestLapTime: maxMs,
      averageLapTime: totalMsSum / laps.length
    };
  }, [laps]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="logo-brand">
          <Timer className="brand-icon" size={28} />
          <h1>ChronoCraft</h1>
          <span className="version-pill">v1.0</span>
        </div>
        <div className="nav-controls">
          <button
            className="icon-btn"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Stopwatch Area */}
      <main className="main-content">
        <section className="stopwatch-section card">
          <StopwatchDisplay timeMs={timeMs} isRunning={isRunning} />
          
          <Controls
            isRunning={isRunning}
            timeMs={timeMs}
            onStart={handleStart}
            onPause={handlePause}
            onLap={handleLap}
            onReset={handleReset}
          />

          <div className="keyboard-hints">
            <span><kbd>Space</kbd> Start/Pause</span>
            <span><kbd>L</kbd> Lap</span>
            <span><kbd>R</kbd> Reset</span>
          </div>
        </section>

        {/* Lap Statistics & Records */}
        <section className="analytics-section">
          <StatsSummary
            laps={laps}
            fastestLapTime={fastestLapTime}
            slowestLapTime={slowestLapTime}
            averageLapTime={averageLapTime}
          />

          <LapList
            laps={laps}
            fastestLapId={fastestLapId}
            slowestLapId={slowestLapId}
            onClearLaps={handleClearLaps}
          />
        </section>
      </main>

      <footer className="footer">
        <p>Built with React & Vite | Precision Millisecond Timer</p>
      </footer>
    </div>
  );
}
