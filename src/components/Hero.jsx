import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { setSelectedCategory } = useShop();

  const categories = [
    { id: 'fruit', name: '🍎 Fruit Trees', label: 'Apples, Lemons, Cherries' },
    { id: 'flowering', name: '🌸 Blossom Trees', label: 'Maples, Cherries & Redbuds' },
    { id: 'shade', name: '🌳 Shade Trees', label: 'Oak & Forest Canopies' },
    { id: 'evergreen', name: '🌲 Evergreen Trees', label: 'Year-round Spruces' }
  ];

  return (
    <section className="simple-hero">
      <div className="container hero-inner">
        <div className="hero-badge">
          <Sparkles size={14} className="text-emerald" />
          <span>Direct From Local Eco Nursery</span>
        </div>

        <h1 className="hero-heading">
          Bring Nature Home with <span className="highlight-text">Healthy Trees</span>
        </h1>

        <p className="hero-subheading">
          Hand-picked, healthy young trees and saplings delivered safely to your garden. Includes 100% growth guarantee & easy planting guide.
        </p>

        {/* Value badges */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <Truck size={18} className="text-emerald" />
            <span>Safe Home Delivery</span>
          </div>
          <div className="trust-item">
            <ShieldCheck size={18} className="text-emerald" />
            <span>1-Year Plant Health Guarantee</span>
          </div>
        </div>

        {/* Quick Category Buttons */}
        <div className="category-quick-grid">
          {categories.map(cat => (
            <button
              key={cat.id}
              className="quick-cat-btn"
              onClick={() => {
                setSelectedCategory(cat.id);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="cat-btn-name">{cat.name}</span>
              <span className="cat-btn-sub">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
