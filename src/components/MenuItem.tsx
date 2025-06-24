
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { addItem, items } = useCart();

  const cartItem = items.find(cartItem => cartItem.id === item.id);
  const isInCart = !!cartItem;

  const handleAddClick = () => {
    if (isInCart) {
      setIsExpanded(!isExpanded);
    } else {
      setIsExpanded(true);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      notes: notes.trim(),
      category: item.category,
    });
    setIsExpanded(false);
    setQuantity(1);
    setNotes('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-poppins font-semibold text-lg text-accent-foreground truncate">
                {item.name}
              </h3>
              <span className="font-poppins font-bold text-primary ml-2 flex-shrink-0">
                ₹{item.price}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {item.description}
            </p>

            {/* Add Button */}
            <Button
              onClick={handleAddClick}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                isInCart
                  ? 'bg-secondary text-white hover:bg-secondary/90'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              <Plus className="w-4 h-4 mr-1" />
              {isInCart ? 'Modify' : 'Add'}
            </Button>
          </div>
        </div>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-scale-in">
            <div className="space-y-4">
              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Special Instructions (Optional):
                </label>
                <Input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Extra spicy, no onions"
                  className="text-sm"
                />
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-secondary text-white hover:bg-secondary/90 font-medium py-3 rounded-full"
              >
                Add {quantity} to Cart - ₹{item.price * quantity}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
