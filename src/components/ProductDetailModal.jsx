import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sun, Droplets, ShoppingBag, Star, CheckCircle } from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedTreeForModal, setSelectedTreeForModal, addToCart } = useShop();

  if (!selectedTreeForModal) return null;
  const tree = selectedTreeForModal;

  const [selectedSizeId, setSelectedSizeId] = useState(tree.sizes[1]?.id || tree.sizes[0].id);
  const [quantity, setQuantity] = useState(1);

  const selectedSizeObj = tree.sizes.find(s => s.id === selectedSizeId) || tree.sizes[0];
  const totalPrice = selectedSizeObj.price * quantity;

  return (
    <div className="modal-backdrop" onClick={() => setSelectedTreeForModal(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelectedTreeForModal(null)}>
          <X size={20} />
        </button>

        <div className="modal-body-layout">
          {/* Image */}
          <div className="modal-img-container">
            <img src={tree.image} alt={tree.name} className="modal-img" />
          </div>

          {/* Details */}
          <div className="modal-info">
            <span className="botanical-tag">{tree.botanicalName}</span>
            <h2>{tree.name}</h2>

            <div className="rating-badge">
              <Star size={14} className="fill-gold text-gold" />
              <span>{tree.rating} Customer Rating</span>
            </div>

            <p className="tree-desc">{tree.description}</p>

            <div className="care-box">
              <h4>Planting & Care Guide:</h4>
              <div className="care-item">
                <Sun size={16} className="text-gold" />
                <span><strong>Sunlight:</strong> {tree.sunlight}</span>
              </div>
              <div className="care-item">
                <Droplets size={16} className="text-blue" />
                <span><strong>Watering:</strong> {tree.water}</span>
              </div>
              <div className="care-item">
                <CheckCircle size={16} className="text-emerald" />
                <span><strong>Quick Tip:</strong> {tree.careTips}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="size-select-section">
              <label>Select Tree Size:</label>
              <div className="sizes-grid">
                {tree.sizes.map(s => (
                  <button
                    key={s.id}
                    className={`size-option-btn ${s.id === selectedSizeId ? 'selected' : ''}`}
                    onClick={() => setSelectedSizeId(s.id)}
                  >
                    <span className="s-label">{s.label}</span>
                    <span className="s-price">${s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="modal-action-bar">
              <div className="qty-picker">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <div className="price-display">
                <span className="price-total-label">Total:</span>
                <span className="price-total-num">${totalPrice}</span>
              </div>

              <button
                className="btn-add-modal"
                onClick={() => {
                  addToCart(tree, selectedSizeId, quantity);
                  setSelectedTreeForModal(null);
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
