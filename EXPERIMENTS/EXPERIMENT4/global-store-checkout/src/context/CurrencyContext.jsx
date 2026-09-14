import React, { createContext, useContext, useState } from 'react';

// Exchange rates lookup table as specified
export const EXCHANGE_RATES = {
  USD: { rate: 1.0, symbol: "$" },
  EUR: { rate: 0.85, symbol: "€" },
  GBP: { rate: 0.75, symbol: "£" },
  JPY: { rate: 110.0, symbol: "¥" }
};

// Initialize CurrencyContext
export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // Maintain currency state (default: "USD")
  const [currency, setCurrency] = useState("USD");

  // Function to update currency state
  const changeCurrency = (currencyCode) => {
    if (currencyCode && typeof currencyCode === 'string') {
      setCurrency(currencyCode.toUpperCase());
    }
  };

  /**
   * Formats a USD amount according to the currently active currency.
   * Standard match: Prepend symbol and round to 2 decimal places (e.g., "$100.00", "€85.00").
   * Fallback rule: Format as "{amount.toFixed(2)} {currencyCode}" (e.g., "100.00 CAD").
   */
  const formatPrice = (usdAmount) => {
    const numericAmount = Number(usdAmount) || 0;
    const rateData = EXCHANGE_RATES[currency];

    if (rateData) {
      const convertedAmount = (numericAmount * rateData.rate).toFixed(2);
      return `${rateData.symbol}${convertedAmount}`;
    }

    // Fallback for missing/custom currency codes
    return `${numericAmount.toFixed(2)} ${currency}`;
  };

  const contextValue = {
    currency,
    changeCurrency,
    formatPrice
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom Hook for consuming CurrencyContext
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
