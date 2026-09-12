// Currency conversion rates dataset with live fallback fetching logic
export const CURRENCIES = {
  USD: { name: 'United States Dollar', symbol: '$', rate: 1.0 },
  EUR: { name: 'Euro', symbol: '€', rate: 0.92 },
  GBP: { name: 'British Pound Sterling', symbol: '£', rate: 0.79 },
  INR: { name: 'Indian Rupee', symbol: '₹', rate: 86.5 },
  JPY: { name: 'Japanese Yen', symbol: '¥', rate: 152.4 },
  CAD: { name: 'Canadian Dollar', symbol: 'CA$', rate: 1.38 },
  AUD: { name: 'Australian Dollar', symbol: 'A$', rate: 1.54 },
  CHF: { name: 'Swiss Franc', symbol: 'CHF', rate: 0.88 },
  CNY: { name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
  AED: { name: 'United Arab Emirates Dirham', symbol: 'AED', rate: 3.67 }
};

export async function fetchExchangeRate(from, to) {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates[to]) {
        return data.rates[to];
      }
    }
  } catch (err) {
    console.warn('Live API fetch failed, falling back to static rate table.', err);
  }

  // Fallback calculation using static rates table
  const fromRate = CURRENCIES[from]?.rate || 1.0;
  const toRate = CURRENCIES[to]?.rate || 1.0;
  return toRate / fromRate;
}
