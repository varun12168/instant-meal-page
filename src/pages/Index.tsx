
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import FloatingCart from '@/components/FloatingCart';
import CartModal from '@/components/CartModal';
import OrderConfirmation from '@/components/OrderConfirmation';
import Footer from '@/components/Footer';
import WelcomeAnimation from '@/components/WelcomeAnimation';
import LoyaltyBanner from '@/components/LoyaltyBanner';
import QuickReorder from '@/components/QuickReorder';
import ReferralBanner from '@/components/ReferralBanner';
import FeedbackModal from '@/components/FeedbackModal';
import LiveOrderTracker from '@/components/LiveOrderTracker';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'placed' | 'preparing' | 'ready' | 'served'>('placed');

  // Mock data for demonstration
  const loyaltyPoints = 85;
  const lastOrder = {
    id: 'last-order-1',
    items: [
      { id: 'main-1', name: 'Butter Chicken', price: 480, quantity: 1, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=center', category: 'mains' },
      { id: 'starter-1', name: 'Spring Rolls', price: 280, quantity: 2, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center', category: 'starters' }
    ],
    total: 1040,
    date: '2 days ago'
  };

  const handleOrderComplete = (details: any) => {
    setOrderDetails(details);
    setShowOrderConfirmation(true);
    
    // Simulate order status progression
    setTimeout(() => setOrderStatus('preparing'), 5000);
    setTimeout(() => setOrderStatus('ready'), 15000);
    setTimeout(() => {
      setOrderStatus('served');
      setShowFeedback(true);
    }, 25000);
  };

  const handleWelcomeComplete = () => {
    setShowWelcomeAnimation(false);
  };

  if (showOrderConfirmation) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-white">
          <div className="max-w-md mx-auto pt-8 px-4">
            <LiveOrderTracker 
              currentStatus={orderStatus}
              estimatedTime="15-20 mins"
            />
            <OrderConfirmation 
              orderDetails={orderDetails}
              onBack={() => setShowOrderConfirmation(false)}
            />
          </div>
          <FeedbackModal 
            isOpen={showFeedback}
            onClose={() => setShowFeedback(false)}
          />
          <Toaster />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {showWelcomeAnimation && (
          <WelcomeAnimation onComplete={handleWelcomeComplete} />
        )}
        
        <div className={`transition-all duration-500 ${
          showWelcomeAnimation ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          <Header />
          <HeroSection />
          
          <div className="max-w-7xl mx-auto px-4">
            <ReferralBanner />
            <LoyaltyBanner points={loyaltyPoints} />
            <QuickReorder lastOrder={lastOrder} />
          </div>
          
          <MenuSection />
          <FloatingCart />
          <CartModal onOrderComplete={handleOrderComplete} />
          <Footer />
        </div>
        <Toaster />
      </div>
    </CartProvider>
  );
};

export default Index;
