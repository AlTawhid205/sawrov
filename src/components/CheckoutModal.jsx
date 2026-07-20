import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cartSubtotal, clearCart } = useShop();

  const [formData, setFormData] = useState({
    name: 'Garden Lover',
    email: 'hello@gardener.com',
    phone: '01700-000000',
    address: 'Road 12, Block B, Dhaka',
    payment: 'cash'
  });

  const [orderDone, setOrderDone] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'TREE-' + Math.floor(1000 + Math.random() * 9000);
    setOrderId(id);
    setOrderDone(true);
    clearCart();

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
      <div className="simple-checkout-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsCheckoutOpen(false)}>
          <X size={20} />
        </button>

        {!orderDone ? (
          <div>
            <div className="checkout-title-box">
              <ShieldCheck size={24} className="text-emerald" />
              <div>
                <h2>Easy Order Checkout</h2>
                <p>Enter your details for direct nursery delivery</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="simple-form">
              <div className="form-field">
                <label>Your Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label>Delivery Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label>Payment Method</label>
                <select
                  value={formData.payment}
                  onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                >
                  <option value="cash">Cash on Delivery / Nursery Pay</option>
                  <option value="bkash">bKash / Mobile Banking</option>
                  <option value="card">Credit / Debit Card</option>
                </select>
              </div>

              <div className="order-summary-box">
                <span>Total Payable Amount:</span>
                <strong className="text-emerald">${cartSubtotal}</strong>
              </div>

              <button type="submit" className="btn-confirm-order">
                Confirm Order Now 🌲
              </button>
            </form>
          </div>
        ) : (
          <div className="order-success-view">
            <CheckCircle2 size={56} className="text-emerald center-icon" />
            <h2>Order Placed Successfully!</h2>
            <p className="order-id">Order Number: <strong>#{orderId}</strong></p>

            <div className="success-info">
              <p>Thank you, <strong>{formData.name}</strong>!</p>
              <p>We will deliver your trees to <strong>{formData.address}</strong> with our plant care guarantee.</p>
            </div>

            <button
              className="btn-done"
              onClick={() => {
                setOrderDone(false);
                setIsCheckoutOpen(false);
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
