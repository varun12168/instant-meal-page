
import React, { useState, useEffect } from 'react';
import { Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const TodaysSpecial: React.FC = () => {
  const { addItem } = useCart();
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds

  const special = {
    id: 'special-1',
    name: 'Mango Lassi Special',
    price: 120,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1594736797933-d0d4fdf2f3d5?w=300&h=300&fit=crop&crop=center',
    category: 'beverages',
    description: 'Fresh mango blended with yogurt and cardamom'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <img
          src={special.image}
          alt={special.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
              TODAY ONLY
            </span>
            <div className="flex items-center text-xs text-gray-600">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <h3 className="font-poppins font-bold text-accent-foreground mb-1">
            {special.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{special.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">₹{special.price}</span>
              <span className="text-sm text-gray-400 line-through">₹{special.originalPrice}</span>
              <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                20% OFF
              </span>
            </div>
            
            <Button
              onClick={() => addItem(special)}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysSpecial;
