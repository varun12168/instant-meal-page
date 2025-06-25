
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TopSellersCarousel from '@/components/TopSellersCarousel';
import MenuSection from '@/components/MenuSection';
import FloatingCart from '@/components/FloatingCart';
import CartModal from '@/components/CartModal';
import OrderConfirmation from '@/components/OrderConfirmation';
import Footer from '@/components/Footer';
import WelcomeAnimation from '@/components/WelcomeAnimation';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleOrderComplete = (details: any) => {
    setOrderDetails(details);
    setShowOrderConfirmation(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcomeAnimation(false);
  };

  if (showOrderConfirmation) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-white">
          <OrderConfirmation 
            orderDetails={orderDetails}
            onBack={() => setShowOrderConfirmation(false)}
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
          <TopSellersCarousel />
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
