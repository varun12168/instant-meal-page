
import React from 'react';
import MenuItem from './MenuItem';

interface MenuCategoryProps {
  items: any[];
  categoryName: string;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ items, categoryName }) => {
  return (
    <div className="animate-fade-in">
      <div className="grid gap-4 md:gap-6">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
