
import React from 'react';
import { CheckCircle, Clock, ChefHat, Utensils } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LiveOrderTrackerProps {
  currentStatus: 'placed' | 'preparing' | 'ready' | 'served';
  estimatedTime?: string;
}

const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({ currentStatus, estimatedTime }) => {
  const statuses = [
    { id: 'placed', label: 'Order Placed', icon: CheckCircle },
    { id: 'preparing', label: 'Preparing', icon: ChefHat },
    { id: 'ready', label: 'Ready', icon: Utensils },
    { id: 'served', label: 'Served', icon: CheckCircle },
  ];

  const currentIndex = statuses.findIndex(status => status.id === currentStatus);
  const progress = ((currentIndex + 1) / statuses.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-poppins font-semibold text-lg">Order Status</h3>
        {estimatedTime && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            {estimatedTime}
          </div>
        )}
      </div>

      <Progress value={progress} className="mb-4 h-2" />

      <div className="flex justify-between">
        {statuses.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = status.icon;

          return (
            <div key={status.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-secondary text-white' 
                  : 'bg-gray-200 text-gray-400'
              } ${isCurrent ? 'scale-110 shadow-lg' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs text-center font-medium ${
                isCompleted ? 'text-accent-foreground' : 'text-gray-400'
              }`}>
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveOrderTracker;
