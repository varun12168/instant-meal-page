
import React, { useState, useEffect } from 'react';
import { Clock, ChefHat, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TimerItem {
  id: string;
  name: string;
  quantity: number;
  prepTime: number; // in minutes
}

interface LiveOrderTimerProps {
  items: TimerItem[];
  isActive: boolean;
  onComplete?: () => void;
}

const LiveOrderTimer: React.FC<LiveOrderTimerProps> = ({ items, isActive, onComplete }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate total prep time (longest item + 30% for parallel cooking)
  const totalPrepTime = Math.max(...items.map(item => item.prepTime)) + 
    Math.round(items.reduce((sum, item) => sum + item.prepTime, 0) * 0.1);
  
  const remainingTime = Math.max(0, totalPrepTime * 60 - timeElapsed); // in seconds
  
  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        if (newTime >= totalPrepTime * 60 && onComplete) {
          onComplete();
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive, totalPrepTime, onComplete]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!isActive) return null;
  
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
      <Button
        variant="ghost"
        className="w-full p-0 h-auto"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-orange-900">Order in Progress</p>
              <p className="text-sm text-orange-700">
                {formatTime(remainingTime)} remaining
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-orange-200 text-orange-800">
            <Timer className="w-3 h-3 mr-1" />
            {formatTime(timeElapsed)}
          </Badge>
        </div>
      </Button>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-orange-200 space-y-2">
          <h4 className="font-medium text-orange-900 mb-3">Preparation Breakdown:</h4>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span className="text-orange-700">
                {item.quantity}x {item.name}
              </span>
              <span className="text-orange-600">~{item.prepTime} min</span>
            </div>
          ))}
          <div className="pt-2 border-t border-orange-300">
            <div className="flex justify-between font-medium text-orange-900">
              <span>Total Estimated Time:</span>
              <span>{totalPrepTime} minutes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveOrderTimer;
