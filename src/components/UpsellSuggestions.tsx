
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface UpsellItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const UpsellSuggestions: React.FC = () => {
  const { addItem } = useCart();

  const suggestions: UpsellItem[] = [
    {
      id: 'upsell-1',
      name: 'Garlic Naan',
      price: 50,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center',
      category: 'sides',
      description: 'Perfect with curry'
    },
    {
      id: 'upsell-2',
      name: 'Fresh Lime Soda',
      price: 30,
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=300&h=300&fit=crop&crop=center',
      category: 'beverages',
      description: 'Refreshing drink'
    },
    {
      id: 'upsell-3',
      name: 'Gulab Jamun',
      price: 80,
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop&crop=center',
      category: 'desserts',
      description: 'Sweet ending'
    }
  ];

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-medium mb-3 text-sm">Add to your order</h3>
      <div className="flex space-x-3 overflow-x-auto custom-scrollbar pb-2">
        {suggestions.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-32 bg-gray-50 rounded-lg p-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-16 object-cover rounded-md mb-2"
            />
            <h4 className="font-medium text-xs mb-1">{item.name}</h4>
            <p className="text-xs text-gray-600 mb-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">₹{item.price}</span>
              <Button
                size="sm"
                onClick={() => addItem(item)}
                className="w-6 h-6 p-0 rounded-full bg-secondary hover:bg-secondary/90"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpsellSuggestions;
