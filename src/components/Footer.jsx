import React from 'react';
import { TreePine, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="simple-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <TreePine size={22} className="text-emerald" />
          <span className="brand-name">GreenCanopy Tree Shop</span>
        </div>
        <p>© {new Date().getFullYear()} GreenCanopy Nursery. Built with care for tree lovers everywhere. 🌳</p>
      </div>
    </footer>
  );
}
