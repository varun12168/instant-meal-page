
import React, { useState } from 'react';
import MenuCategory from './MenuCategory';
import TopSellers from './TopSellers';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Mains', icon: '🍽️' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'chinese', name: 'Chinese', icon: '🥢' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'biryani', name: 'Biryani', icon: '🍛' },
];

const menuData = {
  starters: [
    {
      id: 'starter-1',
      name: 'Crispy Vegetable Spring Rolls',
      price: 280,
      description: 'Fresh vegetables wrapped in crispy golden pastry, served with sweet chili sauce',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'starters',
      tags: ['veg', 'popular']
    },
    {
      id: 'starter-2',
      name: 'Tandoori Chicken Wings',
      price: 350,
      description: 'Juicy chicken wings marinated in tandoori spices and grilled to perfection',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'starters',
      tags: ['nonveg', 'spicy']
    },
    {
      id: 'starter-3',
      name: 'Paneer Tikka',
      price: 320,
      description: 'Cubes of cottage cheese marinated in spices and grilled with peppers',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'starters',
      tags: ['veg', 'chef']
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
      tags: ['nonveg', 'popular']
    },
    {
      id: 'main-2',
      name: 'Biryani Deluxe',
      price: 420,
      description: 'Fragrant basmati rice cooked with aromatic spices and your choice of protein',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'mains',
      tags: ['nonveg', 'spicy']
    },
    {
      id: 'main-3',
      name: 'Dal Makhani',
      price: 280,
      description: 'Slow-cooked black lentils in butter and cream with aromatic spices',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'mains',
      tags: ['veg', 'chef']
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
      tags: ['veg', 'new']
    },
    {
      id: 'bev-2',
      name: 'Masala Chai',
      price: 80,
      description: 'Traditional Indian tea brewed with aromatic spices',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=center',
      category: 'beverages',
      tags: ['veg', 'popular']
    },
    {
      id: 'bev-3',
      name: 'Mango Lassi',
      price: 150,
      description: 'Creamy yogurt drink blended with fresh mango',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'beverages',
      tags: ['veg', 'chef']
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
      tags: ['veg', 'popular']
    },
    {
      id: 'dessert-2',
      name: 'Kulfi Falooda',
      price: 220,
      description: 'Traditional Indian ice cream with vermicelli and rose syrup',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'desserts',
      tags: ['veg', 'new']
    }
  ],
  chinese: [
    {
      id: 'chinese-1',
      name: 'Hakka Noodles',
      price: 250,
      description: 'Stir-fried noodles with vegetables and soy sauce',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'chinese',
      tags: ['veg', 'popular']
    },
    {
      id: 'chinese-2',
      name: 'Chilli Chicken',
      price: 320,
      description: 'Crispy chicken tossed in spicy Indo-Chinese sauce',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      category: 'chinese',
      tags: ['nonveg', 'spicy']
    }
  ],
  sushi: [
    {
      id: 'sushi-1',
      name: 'California Roll',
      price: 450,
      description: 'Fresh crab, avocado, and cucumber wrapped in seaweed',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop&crop=center',
      category: 'sushi',
      tags: ['nonveg', 'new']
    }
  ],
  pizza: [
    {
      id: 'pizza-1',
      name: 'Margherita Pizza',
      price: 380,
      description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=center',
      category: 'pizza',
      tags: ['veg', 'popular']
    }
  ],
  biryani: [
    {
      id: 'biryani-1',
      name: 'Hyderabadi Biryani',
      price: 480,
      description: 'Fragrant basmati rice layered with spiced mutton and herbs',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center',
      category: 'biryani',
      tags: ['nonveg', 'chef']
    }
  ]
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('starters');

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto">
      {/* Top Sellers Section */}
      <TopSellers />
      
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
        items={menuData[activeCategory as keyof typeof menuData] || []} 
        categoryName={categories.find(c => c.id === activeCategory)?.name || ''} 
      />
    </section>
  );
};

export default MenuSection;
