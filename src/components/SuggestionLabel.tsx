
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface SuggestionLabelProps {
  mainItemId: string;
  suggestedItem: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

const SuggestionLabel: React.FC<SuggestionLabelProps> = ({ suggestedItem }) => {
  const { addItem } = useCart();

  const handleAddSuggestion = () => {
    addItem({
      id: suggestedItem.id,
      name: suggestedItem.name,
      price: suggestedItem.price,
      image: suggestedItem.image,
      category: suggestedItem.category,
      notes: ''
    });
  };

  return (
    <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-medium">💡 Customers who ordered this also liked:</span>
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={suggestedItem.image}
            alt={suggestedItem.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-sm text-accent-foreground">
              {suggestedItem.name}
            </p>
            <p className="text-sm font-bold text-primary">
              ₹{suggestedItem.price}
            </p>
          </div>
        </div>
        
        <Button
          onClick={handleAddSuggestion}
          size="sm"
          className="bg-secondary text-white hover:bg-secondary/90 rounded-full px-4 py-2"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default SuggestionLabel;
