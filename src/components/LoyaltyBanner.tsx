
import React, { useState } from 'react';
import { Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface LoyaltyBannerProps {
  points: number;
}

const LoyaltyBanner: React.FC<LoyaltyBannerProps> = ({ points }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const rewards = [
    { points: 50, reward: 'Free Appetizer', description: 'Get any starter for free' },
    { points: 100, reward: '₹100 Off', description: 'Discount on your next order' },
    { points: 200, reward: 'Free Main Course', description: 'Choose any main dish' },
  ];

  return (
    <div className="bg-gradient-to-r from-primary to-orange-600 text-white p-3 rounded-lg mb-4 animate-fade-in relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 text-white hover:bg-white/20 p-1 h-auto"
      >
        <X className="w-4 h-4" />
      </Button>

      <div className="flex items-center justify-between pr-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">You have {points} loyalty points!</p>
            <p className="text-sm opacity-90">Redeem for exciting rewards</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="text-primary">
              Redeem Now
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Redeem Loyalty Points</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Your Points: {points}</p>
              
              {rewards.map((reward, index) => (
                <div key={index} className={`p-4 border rounded-lg ${
                  points >= reward.points 
                    ? 'border-secondary bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{reward.reward}</h4>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      <p className="text-sm font-medium text-primary">{reward.points} points</p>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={points < reward.points}
                      className={points >= reward.points ? 'bg-secondary' : ''}
                    >
                      {points >= reward.points ? 'Redeem' : 'Locked'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LoyaltyBanner;
