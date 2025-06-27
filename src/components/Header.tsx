
import React from 'react';
import { ShoppingCart, HelpCircle, Utensils, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const { totalItems, setIsCartOpen, orderedItems, setIsOrderSummaryOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-poppins font-bold text-accent-foreground">
            My Restaurant
          </h1>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-primary text-xs text-white"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => setIsOrderSummaryOpen(true)}
          >
            <Clipboard className="w-5 h-5" />
            {orderedItems.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-orange-500 text-xs text-white"
              >
                {orderedItems.length}
              </Badge>
            )}
          </Button>
          
          <Button variant="ghost" size="sm">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
