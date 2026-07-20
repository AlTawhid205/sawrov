import React from 'react';
import { useShop } from '../context/ShopContext';
import { TreePine, ShoppingBag, Heart, Search } from 'lucide-react';

export default function Header() {
  const {
    totalItemsCount,
    wishlist,
    setIsCartOpen,
    searchQuery,
    setSearchQuery
  } = useShop();

  return (
    <header className="site-header">
      <div className="container header-content">
        {/* Logo */}
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon">
            <TreePine size={24} />
          </div>
          <div className="logo-text">
            <span className="logo-title">GreenCanopy</span>
            <span className="logo-tagline">Tree Shop & Nursery</span>
          </div>
        </div>

        {/* Search */}
        <div className="header-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search trees (e.g. Apple, Maple, Cherry)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="header-actions">
          <button
            className="icon-action-btn"
            onClick={() => {
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            title="Favorites"
          >
            <Heart size={20} className={wishlist.length > 0 ? "fill-rose" : ""} />
            {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
          </button>

          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            <span className="cart-text">Cart</span>
            <span className="cart-badge">{totalItemsCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
