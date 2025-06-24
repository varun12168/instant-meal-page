
import React from 'react';
import { RotateCcw, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface LastOrder {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
  }>;
  total: number;
  date: string;
}

interface QuickReorderProps {
  lastOrder?: LastOrder;
}

const QuickReorder: React.FC<QuickReorderProps> = ({ lastOrder }) => {
  const { addItem } = useCart();

  if (!lastOrder) return null;

  const handleReorder = () => {
    lastOrder.items.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category
        });
      }
    });
  };

  return (
    <div className="bg-accent rounded-xl p-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-accent-foreground">Quick Reorder</h3>
            <p className="text-sm text-gray-600">Last order: {lastOrder.date}</p>
          </div>
        </div>
        
        <Button 
          onClick={handleReorder}
          className="bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Reorder ₹{lastOrder.total}
        </Button>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {lastOrder.items.slice(0, 3).map((item, index) => (
            <span key={index} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
              {item.quantity}x {item.name}
            </span>
          ))}
          {lastOrder.items.length > 3 && (
            <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
              +{lastOrder.items.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickReorder;
