
import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface TopSellerItem {
  id: string;
  name: string;
  price: number;
  image: string;
  orderCount: number;
  category: string;
}

const topSellersData: TopSellerItem[] = [
  {
    id: 'top-1',
    name: 'Butter Chicken',
    price: 480,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=center',
    orderCount: 156,
    category: 'mains'
  },
  {
    id: 'top-2',
    name: 'Paneer Tikka',
    price: 320,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
    orderCount: 134,
    category: 'starters'
  },
  {
    id: 'top-3',
    name: 'Biryani Deluxe',
    price: 420,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
    orderCount: 128,
    category: 'mains'
  },
  {
    id: 'top-4',
    name: 'Mango Lassi',
    price: 150,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
    orderCount: 112,
    category: 'beverages'
  },
  {
    id: 'top-5',
    name: 'Gulab Jamun',
    price: 180,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
    orderCount: 98,
    category: 'desserts'
  }
];

const TopSellers = () => {
  const { addItem } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        
        if (container.scrollLeft >= scrollWidth - clientWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (item: TopSellerItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      notes: ''
    });
  };

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-poppins font-bold text-accent-foreground flex items-center">
          🔥 Top Sellers
        </h2>
        <span className="text-sm text-gray-500">Auto-scrolling</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {topSellersData.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 rounded-lg object-cover mb-3"
              loading="lazy"
            />
            
            <div className="space-y-2">
              <h3 className="font-poppins font-semibold text-sm text-accent-foreground line-clamp-2">
                {item.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="font-poppins font-bold text-primary">
                  ₹{item.price}
                </span>
                <span className="text-xs text-gray-500">
                  {item.orderCount} orders
                </span>
              </div>
              
              <Button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-primary text-white hover:bg-primary/90 font-medium py-2 rounded-full text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellers;
