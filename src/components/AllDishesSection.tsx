
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MenuItem from './MenuItem';

const allMenuData = {
  starters: [
    {
      id: 'starter-1',
      name: 'Crispy Vegetable Spring Rolls',
      price: 280,
      description: 'Fresh vegetables wrapped in crispy golden pastry, served with sweet chili sauce',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'starters',
      mealTime: ['lunch', 'dinner']
    },
    {
      id: 'starter-2',
      name: 'Tandoori Chicken Wings',
      price: 350,
      description: 'Juicy chicken wings marinated in tandoori spices and grilled to perfection',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'starters',
      mealTime: ['lunch', 'dinner']
    },
    {
      id: 'starter-3',
      name: 'Paneer Tikka',
      price: 320,
      description: 'Cubes of cottage cheese marinated in spices and grilled with peppers',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'starters',
      mealTime: ['lunch', 'dinner']
    }
  ],
  mains: [
    {
      id: 'main-1',
      name: 'Butter Chicken',
      price: 480,
      description: 'Tender chicken pieces in rich, creamy tomato-based curry',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=center',
      category: 'mains',
      mealTime: ['lunch', 'dinner']
    },
    {
      id: 'main-2',
      name: 'Biryani Deluxe',
      price: 420,
      description: 'Fragrant basmati rice cooked with aromatic spices and your choice of protein',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'mains',
      mealTime: ['lunch', 'dinner']
    },
    {
      id: 'main-3',
      name: 'Dal Makhani',
      price: 280,
      description: 'Slow-cooked black lentils in butter and cream with aromatic spices',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'mains',
      mealTime: ['lunch', 'dinner']
    },
    {
      id: 'breakfast-1',
      name: 'Masala Dosa',
      price: 180,
      description: 'Crispy rice crepe filled with spiced potato mixture',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',  
      category: 'mains',
      mealTime: ['breakfast']
    }
  ],
  beverages: [
    {
      id: 'bev-1',
      name: 'Fresh Lime Soda',
      price: 120,
      description: 'Refreshing lime juice with soda and a hint of mint',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'beverages',
      mealTime: ['lunch', 'dinner', 'munch']
    },
    {
      id: 'bev-2',
      name: 'Masala Chai',
      price: 80,
      description: 'Traditional Indian tea brewed with aromatic spices',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=center',
      category: 'beverages',
      mealTime: ['breakfast', 'munch']
    },
    {
      id: 'bev-3',
      name: 'Mango Lassi',
      price: 150,
      description: 'Creamy yogurt drink blended with fresh mango',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'beverages',
      mealTime: ['lunch', 'dinner']
    }
  ],
  desserts: [
    {
      id: 'dessert-1',
      name: 'Gulab Jamun',
      price: 180,
      description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'desserts',
      mealTime: ['lunch', 'dinner']
    },
    {
      id: 'dessert-2',
      name: 'Kulfi Falooda',
      price: 220,
      description: 'Traditional Indian ice cream with vermicelli and rose syrup',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'desserts',
      mealTime: ['lunch', 'dinner']
    }
  ]
};

interface AllDishesSectionProps {
  mealTimeFilter: string;
}

const AllDishesSection: React.FC<AllDishesSectionProps> = ({ mealTimeFilter }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', 'starters', 'mains', 'beverages', 'desserts'];

  const getFilteredItems = () => {
    let allItems: any[] = [];
    
    // Collect all items
    Object.entries(allMenuData).forEach(([category, items]) => {
      allItems = [...allItems, ...items];
    });

    // Filter by meal time
    if (mealTimeFilter !== 'all') {
      allItems = allItems.filter(item => 
        item.mealTime && item.mealTime.includes(mealTimeFilter)
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      allItems = allItems.filter(item => item.category === categoryFilter);
    }

    return allItems;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-poppins font-bold text-accent-foreground">
          📋 Explore Full Menu
        </h2>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2"
        >
          <span>{isExpanded ? 'Show Less' : 'Show All'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="animate-fade-in">
          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 custom-scrollbar">
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-opensans font-medium transition-all duration-300 capitalize ${
                  categoryFilter === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-accent border-gray-200'
                }`}
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid gap-4 md:gap-6 max-h-96 overflow-y-auto custom-scrollbar">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No items found for the selected filters.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDishesSection;
