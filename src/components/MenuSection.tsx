
import React, { useState } from 'react';
import MenuCategory from './MenuCategory';
import MealTimeFilter from './MealTimeFilter';
import AllDishesSection from './AllDishesSection';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Mains', icon: '🍽️' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

const menuData = {
  starters: [
    {
      id: 'starter-1',
      name: 'Crispy Vegetable Spring Rolls',
      price: 280,
      description: 'Fresh vegetables wrapped in crispy golden pastry, served with sweet chili sauce',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'starters'
    },
    {
      id: 'starter-2',
      name: 'Tandoori Chicken Wings',
      price: 350,
      description: 'Juicy chicken wings marinated in tandoori spices and grilled to perfection',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'starters'
    },
    {
      id: 'starter-3',
      name: 'Paneer Tikka',
      price: 320,
      description: 'Cubes of cottage cheese marinated in spices and grilled with peppers',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'starters'
    }
  ],
  mains: [
    {
      id: 'main-1',
      name: 'Butter Chicken',
      price: 480,
      description: 'Tender chicken pieces in rich, creamy tomato-based curry',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=center',
      category: 'mains'
    },
    {
      id: 'main-2',
      name: 'Biryani Deluxe',
      price: 420,
      description: 'Fragrant basmati rice cooked with aromatic spices and your choice of protein',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'mains'
    },
    {
      id: 'main-3',
      name: 'Dal Makhani',
      price: 280,
      description: 'Slow-cooked black lentils in butter and cream with aromatic spices',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'mains'
    }
  ],
  beverages: [
    {
      id: 'bev-1',
      name: 'Fresh Lime Soda',
      price: 120,
      description: 'Refreshing lime juice with soda and a hint of mint',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'beverages'
    },
    {
      id: 'bev-2',
      name: 'Masala Chai',
      price: 80,
      description: 'Traditional Indian tea brewed with aromatic spices',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=center',
      category: 'beverages'
    },
    {
      id: 'bev-3',
      name: 'Mango Lassi',
      price: 150,
      description: 'Creamy yogurt drink blended with fresh mango',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'beverages'
    }
  ],
  desserts: [
    {
      id: 'dessert-1',
      name: 'Gulab Jamun',
      price: 180,
      description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'desserts'
    },
    {
      id: 'dessert-2',
      name: 'Kulfi Falooda',
      price: 220,
      description: 'Traditional Indian ice cream with vermicelli and rose syrup',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'desserts'
    }
  ]
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('starters');
  const [activeMealTime, setActiveMealTime] = useState('all');

  const getFilteredMenuData = () => {
    if (activeMealTime === 'all') {
      return menuData[activeCategory as keyof typeof menuData];
    }
    
    return menuData[activeCategory as keyof typeof menuData]?.filter((item: any) => {
      // Add meal time data to existing items
      const mealTimeMapping: { [key: string]: string[] } = {
        'starter-1': ['lunch', 'dinner'],
        'starter-2': ['lunch', 'dinner'],
        'starter-3': ['lunch', 'dinner'],
        'main-1': ['lunch', 'dinner'],
        'main-2': ['lunch', 'dinner'],
        'main-3': ['lunch', 'dinner'],
        'bev-1': ['lunch', 'dinner', 'munch'],
        'bev-2': ['breakfast', 'munch'],
        'bev-3': ['lunch', 'dinner'],
        'dessert-1': ['lunch', 'dinner'],
        'dessert-2': ['lunch', 'dinner'],
      };
      
      const itemMealTimes = mealTimeMapping[item.id] || ['lunch', 'dinner'];
      return itemMealTimes.includes(activeMealTime);
    }) || [];
  };

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto">
      {/* Meal Time Filter */}
      <MealTimeFilter 
        onMealTimeChange={setActiveMealTime}
        activeMealTime={activeMealTime}
      />

      {/* Category Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 custom-scrollbar">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`flex-shrink-0 px-6 py-3 rounded-full font-opensans font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-accent border-gray-200'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* Menu Items */}
      <MenuCategory 
        items={getFilteredMenuData()} 
        categoryName={categories.find(c => c.id === activeCategory)?.name || ''} 
      />

      {/* All Dishes Section */}
      <AllDishesSection mealTimeFilter={activeMealTime} />
    </section>
  );
};

export default MenuSection;
