import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye, Sun, Droplets, Star } from 'lucide-react';

export default function ProductCard({ tree }) {
  const { addToCart, wishlist, toggleWishlist, setSelectedTreeForModal } = useShop();

  const [selectedSizeId, setSelectedSizeId] = useState('medium');
  const isWishlisted = wishlist.includes(tree.id);

  const currentSizeObj = tree.sizes.find(s => s.id === selectedSizeId) || tree.sizes[0];

  return (
    <div className="simple-product-card">
      {/* Image container */}
      <div className="card-img-box">
        <img src={tree.image} alt={tree.name} className="card-img" />
        <span className="card-tag">{tree.tag}</span>

        <button
          className={`wishlist-icon-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(tree.id);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} className={isWishlisted ? "fill-rose text-rose" : ""} />
        </button>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="card-rating">
          <Star size={14} className="fill-gold text-gold" />
          <span>{tree.rating}</span>
          <span className="botanical-text">({tree.botanicalName})</span>
        </div>

        <h3 className="card-title" onClick={() => setSelectedTreeForModal(tree)}>
          {tree.name}
        </h3>

        <div className="card-quick-specs">
          <span><Sun size={13} className="text-gold" /> {tree.sunlight}</span>
          <span><Droplets size={13} className="text-blue" /> {tree.water}</span>
        </div>

        {/* Size Selection */}
        <div className="size-selector-row">
          {tree.sizes.map(s => (
            <button
              key={s.id}
              className={`size-chip ${s.id === selectedSizeId ? 'selected' : ''}`}
              onClick={() => setSelectedSizeId(s.id)}
            >
              {s.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Price & Action */}
        <div className="card-bottom-row">
          <div className="price-tag">
            <span className="dollar">$</span>
            <span className="price-num">{currentSizeObj.price}</span>
          </div>

          <div className="card-btn-group">
            <button
              className="btn-details-link"
              onClick={() => setSelectedTreeForModal(tree)}
            >
              Details
            </button>

            <button
              className="btn-add-to-cart"
              onClick={() => addToCart(tree, selectedSizeId, 1)}
            >
              <ShoppingBag size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
