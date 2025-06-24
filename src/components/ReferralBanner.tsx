
import React, { useState } from 'react';
import { Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReferralBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleShare = () => {
    const message = "Check out this amazing restaurant! Order directly from your table: " + window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-secondary to-green-600 text-white p-3 rounded-lg mb-4 animate-fade-in relative">
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
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Refer a friend & get 10% off!</p>
            <p className="text-sm opacity-90">Share this experience via WhatsApp</p>
          </div>
        </div>

        <Button
          onClick={handleShare}
          variant="secondary"
          size="sm"
          className="text-secondary bg-white hover:bg-gray-100"
        >
          Share QR
        </Button>
      </div>
    </div>
  );
};

export default ReferralBanner;
