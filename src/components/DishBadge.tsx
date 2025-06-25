
import React from 'react';

interface DishBadgeProps {
  tags: string[];
}

const DishBadge: React.FC<DishBadgeProps> = ({ tags }) => {
  const getBadgeContent = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'spicy':
        return { emoji: '🌶️', text: 'Spicy', color: 'bg-red-100 text-red-600' };
      case 'new':
        return { emoji: '🆕', text: 'New', color: 'bg-green-100 text-green-600' };
      case 'chef':
        return { emoji: '🧑‍🍳', text: "Chef's Choice", color: 'bg-orange-100 text-orange-600' };
      case 'popular':
        return { emoji: '⭐', text: 'Popular', color: 'bg-yellow-100 text-yellow-600' };
      case 'veg':
        return { emoji: '🥬', text: 'Veg', color: 'bg-green-100 text-green-600' };
      case 'nonveg':
        return { emoji: '🍖', text: 'Non-Veg', color: 'bg-red-100 text-red-600' };
      default:
        return { emoji: '', text: tag, color: 'bg-gray-100 text-gray-600' };
    }
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {tags.slice(0, 2).map((tag, index) => {
        const badge = getBadgeContent(tag);
        return (
          <span
            key={index}
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}
          >
            {badge.emoji && <span className="mr-1">{badge.emoji}</span>}
            {badge.text}
          </span>
        );
      })}
    </div>
  );
};

export default DishBadge;
