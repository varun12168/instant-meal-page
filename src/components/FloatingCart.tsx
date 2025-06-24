
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const FloatingCart = () => {
  const { totalItems, totalAmount, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto">
      <Button
        onClick={() => setIsCartOpen(true)}
        className="w-full bg-primary text-white hover:bg-primary/90 shadow-lg rounded-full py-4 px-6 font-medium transition-all duration-300 hover:scale-105 animate-slide-up"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>₹{totalAmount}</span>
            <span>•</span>
            <span>View Cart</span>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default FloatingCart;
