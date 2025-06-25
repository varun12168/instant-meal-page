
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const smartCombos = [
  {
    id: 'combo-1',
    name: 'Garlic Naan',
    price: 80,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150&h=150&fit=crop&crop=center',
    category: 'sides',
    prompt: 'Perfect with curry dishes'
  },
  {
    id: 'combo-2',
    name: 'Mint Chutney',
    price: 30,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=center',
    category: 'sides',
    prompt: 'Customers also liked'
  },
  {
    id: 'combo-3',
    name: 'Raita',
    price: 60,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=150&h=150&fit=crop&crop=center',
    category: 'sides',
    prompt: 'Frequently ordered with this'
  }
];

interface SmartPromptsProps {
  currentItems: any[];
}

const SmartPrompts: React.FC<SmartPromptsProps> = ({ currentItems }) => {
  const { addItem } = useCart();

  // Show smart prompts only if there are items in cart
  if (currentItems.length === 0) return null;

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  return (
    <div className="py-4 border-t border-gray-100">
      <h3 className="text-lg font-poppins font-semibold text-accent-foreground mb-3">
        🧠 You might also like
      </h3>
      <div className="space-y-3">
        {smartCombos.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
                loading="lazy"
              />
              <div>
                <h4 className="font-poppins font-medium text-sm">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.prompt}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-poppins font-bold text-primary">₹{item.price}</span>
              <Button
                size="sm"
                onClick={() => handleAddToCart(item)}
                className="bg-secondary hover:bg-secondary/90 text-white px-3 py-1 rounded-full text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartPrompts;
