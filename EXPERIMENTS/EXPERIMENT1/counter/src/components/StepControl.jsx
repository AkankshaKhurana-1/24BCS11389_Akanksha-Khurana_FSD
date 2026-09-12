import React from 'react';
import { Sliders } from 'lucide-react';

export default function StepControl({ step, onStepChange }) {
  const quickSteps = [1, 5, 10, 25, 50, 100];

  return (
    <div className="step-card">
      <div className="step-header">
        <Sliders size={18} />
        <span>Step Size</span>
      </div>

      <div className="step-buttons">
        {quickSteps.map((val) => (
          <button
            key={val}
            className={`step-btn ${step === val ? 'active' : ''}`}
            onClick={() => onStepChange(val)}
          >
            {val}
          </button>
        ))}
      </div>

      <div className="custom-step-input">
        <label htmlFor="custom-step">Custom Step:</label>
        <input
          id="custom-step"
          type="number"
          min="1"
          max="1000"
          value={step}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val > 0) {
              onStepChange(val);
            }
          }}
        />
      </div>
    </div>
  );
}
