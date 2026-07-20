import React from 'react';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

export default function App() {
  return (
    <ShopProvider>
      <div className="simple-app">
        <ToastContainer />
        <Header />
        <main>
          <Hero />
          <Catalog />
        </main>
        <Footer />

        {/* Modals & Drawer */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </ShopProvider>
  );
}
