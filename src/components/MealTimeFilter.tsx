
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const mealTimes = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
  { id: 'lunch', name: 'Lunch', icon: '☀️' },
  { id: 'dinner', name: 'Dinner', icon: '🌙' },
  { id: 'munch', name: 'Munch', icon: '🍿' },
  { id: 'chinese', name: 'Chinese', icon: '🥢' },
];

interface MealTimeFilterProps {
  onMealTimeChange: (mealTime: string) => void;
  activeMealTime: string;
}

const MealTimeFilter: React.FC<MealTimeFilterProps> = ({ onMealTimeChange, activeMealTime }) => {
  const getDefaultMealTime = () => {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 11) return 'breakfast';
    if (hour >= 12 && hour < 15) return 'lunch';
    if (hour >= 19 && hour < 22) return 'dinner';
    return 'all';
  };

  // Set default meal time on component mount
  React.useEffect(() => {
    if (activeMealTime === 'all') {
      const defaultMealTime = getDefaultMealTime();
      if (defaultMealTime !== 'all') {
        onMealTimeChange(defaultMealTime);
      }
    }
  }, []);

  return (
    <div className="py-4 px-4 max-w-7xl mx-auto">
      <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar">
        {mealTimes.map((mealTime) => (
          <Button
            key={mealTime.id}
            variant={activeMealTime === mealTime.id ? "default" : "outline"}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-opensans font-medium transition-all duration-300 ${
              activeMealTime === mealTime.id
                ? 'bg-secondary text-white shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-accent border-gray-200'
            }`}
            onClick={() => onMealTimeChange(mealTime.id)}
          >
            <span className="mr-2">{mealTime.icon}</span>
            {mealTime.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MealTimeFilter;
