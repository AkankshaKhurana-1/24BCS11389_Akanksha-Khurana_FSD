import React from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { StoreHeader } from './components/StoreHeader';
import { ProductList } from './components/ProductList';
import { CheckoutCart } from './components/CheckoutCart';
import { Info, CheckCircle2 } from 'lucide-react';
import './index.css';

export function App() {
  return (
    <CurrencyProvider>
      <div className="app-container">
        <StoreHeader />

        <main className="main-content">
          <div className="rubric-banner">
            <div className="banner-header">
              <CheckCircle2 size={20} className="check-icon" />
              <span>Context API - Prop-Drilling Avoided</span>
            </div>
            <p>
              Components consume <code>currency</code> state and <code>formatPrice()</code> directly from <code>CurrencyContext</code> without passing currency props down the tree.
            </p>
          </div>

          <div className="store-layout">
            <div className="catalog-column">
              <ProductList />
            </div>
            <div className="checkout-column">
              <CheckoutCart />
            </div>
          </div>
        </main>

        <footer className="footer-container">
          <p>Experiment 4: Global Store Checkout (Context API) &bull; React & Vite</p>
        </footer>
      </div>
    </CurrencyProvider>
  );
}

export default App;
