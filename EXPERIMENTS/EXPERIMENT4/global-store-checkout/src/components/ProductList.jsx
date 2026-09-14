import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Headphones, Watch, Keyboard, ShoppingCart, Star } from 'lucide-react';

export const ProductList = () => {
  const { formatPrice } = useCurrency();

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      basePriceUSD: 100, // Explicit requirement: formatPrice(100)
      rating: 4.8,
      reviews: 124,
      imageIcon: Headphones,
      description: 'High-fidelity audio with active noise cancellation and 30hr battery life.',
      isFeatured: true
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      basePriceUSD: 150,
      rating: 4.6,
      reviews: 89,
      imageIcon: Watch,
      description: 'Track workouts, heart rate, and sleep metrics with built-in GPS.',
      isFeatured: false
    },
    {
      id: 3,
      name: 'RGB Mechanical Keyboard',
      basePriceUSD: 80,
      rating: 4.9,
      reviews: 210,
      imageIcon: Keyboard,
      description: 'Customizable mechanical switches with per-key RGB backlighting.',
      isFeatured: false
    }
  ];

  return (
    <section className="product-list-container">
      <div className="section-header">
        <h2>Product Catalog</h2>
        <p>Prices automatically convert based on global Context state</p>
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const Icon = product.imageIcon;
          const formattedPrice = formatPrice(product.basePriceUSD);

          return (
            <div key={product.id} className={`product-card ${product.isFeatured ? 'featured' : ''}`}>
              {product.isFeatured && <span className="featured-badge">Required Demo Item</span>}
              <div className="product-image-area">
                <Icon size={48} className="product-icon" />
              </div>
              <div className="product-info">
                <div className="product-meta">
                  <span className="rating-badge">
                    <Star size={14} className="star-icon" /> {product.rating} ({product.reviews})
                  </span>
                </div>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                  <div className="price-tag">
                    <span className="price-label">Price:</span>
                    <span className="price-value">{formattedPrice}</span>
                  </div>
                  <button className="add-to-cart-btn" type="button">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductList;
