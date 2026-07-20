import React, { createContext, useContext, useState, useEffect } from 'react';
import { TREES_DATA } from '../data/treesData';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('simple_tree_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('simple_tree_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTreeForModal, setSelectedTreeForModal] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('simple_tree_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('simple_tree_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (tree, sizeId = 'medium', quantity = 1) => {
    const sizeObj = tree.sizes.find(s => s.id === sizeId) || tree.sizes[0];
    const cartItemId = `${tree.id}-${sizeId}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          treeId: tree.id,
          treeName: tree.name,
          image: tree.image,
          sizeLabel: sizeObj.label,
          price: sizeObj.price,
          quantity
        }
      ];
    });

    showNotification(`Added ${tree.name} (${sizeObj.label}) to cart! 🛒`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showNotification('Item removed from cart');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (treeId) => {
    setWishlist(prev => {
      const exists = prev.includes(treeId);
      if (exists) {
        showNotification('Removed from favorites');
        return prev.filter(id => id !== treeId);
      } else {
        showNotification('Added to favorites ❤️');
        return [...prev, treeId];
      }
    });
  };

  const totalItemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        selectedTreeForModal,
        setSelectedTreeForModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toastMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        totalItemsCount,
        cartSubtotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
