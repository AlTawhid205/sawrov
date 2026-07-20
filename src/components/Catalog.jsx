import React from 'react';
import { useShop } from '../context/ShopContext';
import { TREES_DATA } from '../data/treesData';
import ProductCard from './ProductCard';

export default function Catalog() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const categories = [
    { id: 'all', name: 'All Trees' },
    { id: 'fruit', name: 'Fruit & Citrus' },
    { id: 'flowering', name: 'Flowering & Maple' },
    { id: 'shade', name: 'Shade & Canopy' },
    { id: 'evergreen', name: 'Evergreen' }
  ];

  const filteredTrees = TREES_DATA.filter(tree => {
    if (selectedCategory !== 'all' && tree.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tree.name.toLowerCase().includes(q);
      const matchBot = tree.botanicalName.toLowerCase().includes(q);
      const matchDesc = tree.description.toLowerCase().includes(q);
      if (!matchName && !matchBot && !matchDesc) return false;
    }
    return true;
  });

  return (
    <section className="catalog-section" id="catalog-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-box">
          <h2>Browse Our Tree Shop</h2>
          <p>Choose from healthiest saplings, fruit trees, and ornamental shade canopies.</p>
        </div>

        {/* Clean Category Pills */}
        <div className="category-pills-bar">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredTrees.length > 0 ? (
          <div className="trees-grid">
            {filteredTrees.map(tree => (
              <ProductCard key={tree.id} tree={tree} />
            ))}
          </div>
        ) : (
          <div className="empty-catalog">
            <p>No trees found for "{searchQuery}". Try selecting another category.</p>
            <button
              className="btn-reset"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Show All Trees
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
