
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import FloatingCart from '@/components/FloatingCart';
import CartModal from '@/components/CartModal';
import OrderConfirmation from '@/components/OrderConfirmation';
import Footer from '@/components/Footer';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleOrderComplete = (details: any) => {
    setOrderDetails(details);
    setShowOrderConfirmation(true);
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
        <Header />
        <HeroSection />
        <MenuSection />
        <FloatingCart />
        <CartModal onOrderComplete={handleOrderComplete} />
        <Footer />
        <Toaster />
      </div>
    </CartProvider>
  );
};

export default Index;
