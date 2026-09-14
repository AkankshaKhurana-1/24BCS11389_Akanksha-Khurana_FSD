import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { ShoppingBag, CreditCard, ShieldCheck, Tag } from 'lucide-react';

export const CheckoutCart = () => {
  const { formatPrice, currency } = useCurrency();

  const subtotalUSD = 150; // Explicit requirement: formatPrice(150)
  const shippingUSD = 15;
  const taxUSD = 10;
  const totalUSD = subtotalUSD + shippingUSD + taxUSD;

  return (
    <section className="checkout-cart-container">
      <div className="cart-card">
        <div className="cart-header">
          <ShoppingBag size={22} className="cart-icon" />
          <h2>Checkout Summary</h2>
        </div>

        <div className="cart-items-preview">
          <div className="cart-item">
            <span className="item-name">Order Items (Subtotal Base)</span>
            <span className="item-price-raw">$150.00 USD</span>
          </div>
        </div>

        <div className="cart-divider" />

        <div className="cart-summary-details">
          <div className="summary-row subtotal-row">
            <span className="row-label">Subtotal:</span>
            {/* Required output: formatPrice(150) */}
            <span className="row-value highlight-subtotal">{formatPrice(subtotalUSD)}</span>
          </div>

          <div className="summary-row">
            <span className="row-label">Estimated Shipping:</span>
            <span className="row-value">{formatPrice(shippingUSD)}</span>
          </div>

          <div className="summary-row">
            <span className="row-label">Estimated Tax:</span>
            <span className="row-value">{formatPrice(taxUSD)}</span>
          </div>

          <div className="cart-divider" />

          <div className="summary-row total-row">
            <span className="total-label">Total Amount ({currency}):</span>
            <span className="total-value">{formatPrice(totalUSD)}</span>
          </div>
        </div>

        <div className="cart-actions">
          <button className="checkout-btn" type="button">
            <CreditCard size={18} />
            Proceed to Checkout ({formatPrice(totalUSD)})
          </button>
          <div className="secure-badge">
            <ShieldCheck size={16} />
            Encrypted & Secure 256-bit Checkout
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutCart;
