import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2 } from 'lucide-react';

export default function ToastContainer() {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="simple-toast">
      <CheckCircle2 size={18} className="text-emerald" />
      <span>{toastMessage}</span>
    </div>
  );
}
