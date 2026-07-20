import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    setIsCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="simple-cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-head">
          <div className="head-title">
            <ShoppingBag size={20} className="text-emerald" />
            <h3>Your Shopping Cart</h3>
          </div>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} className="text-muted" />
              <p>Your cart is empty.</p>
              <button
                className="btn-browse"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.cartItemId} className="cart-item">
                  <img src={item.image} alt={item.treeName} className="item-thumb" />
                  <div className="item-info">
                    <h4>{item.treeName}</h4>
                    <span className="item-size">{item.sizeLabel}</span>
                    <span className="item-unit-price">${item.price} each</span>
                  </div>

                  <div className="item-controls">
                    <div className="qty-box">
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="item-total">${item.price * item.quantity}</span>

                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="summary-line">
              <span>Subtotal</span>
              <span className="subtotal-num">${cartSubtotal}</span>
            </div>
            <div className="summary-line">
              <span>Delivery</span>
              <span className="free-shipping">FREE</span>
            </div>
            <div className="summary-line grand">
              <span>Total</span>
              <span className="total-num">${cartSubtotal}</span>
            </div>

            <button
              className="btn-checkout-now"
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
