
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, CreditCard, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import LiveOrderTimer from './LiveOrderTimer';
import CostBreakdownModal from './CostBreakdownModal';

interface CartModalProps {
  onOrderComplete: (orderDetails: any) => void;
}

const CartModal: React.FC<CartModalProps> = ({ onOrderComplete }) => {
  const { 
    items, 
    totalAmount,
    taxCalculation,
    timerState,
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeItem, 
    updateNotes,
    clearCart,
    startOrderTimer,
    updateTimerElapsed,
    resetTimer
  } = useCart();

  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  // Timer management with localStorage persistence
  useEffect(() => {
    if (!timerState.isActive) return;
    
    const timer = setInterval(() => {
      const newElapsed = timerState.timeElapsed + 1;
      updateTimerElapsed(newElapsed);
      
      // Check if timer is complete
      if (newElapsed >= timerState.totalPrepTime * 60) {
        toast({
          title: "Order Ready!",
          description: "Your order is ready to be served.",
          duration: 5000,
        });
        resetTimer();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timerState.isActive, timerState.timeElapsed, timerState.totalPrepTime, updateTimerElapsed, resetTimer]);

  // Convert cart items to timer items format
  const timerItems = items.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    prepTime: timerState.itemPrepTimes[item.id] || 15
  }));

  const handleOrderNow = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart first.",
        duration: 3000,
      });
      return;
    }
    
    startOrderTimer();
    toast({
      title: "Order Started!",
      description: "Your order is now being prepared.",
      duration: 3000,
    });
  };

  const handlePayment = async (method: string) => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderDetails = {
      items,
      subtotal: taxCalculation.subtotal,
      cgst: taxCalculation.cgst,
      sgst: taxCalculation.sgst,
      total: taxCalculation.total,
      specialInstructions,
      paymentMethod: method,
      orderId: `ORD${Date.now()}`,
      estimatedTime: `${timerState.totalPrepTime} mins`,
      timerState
    };

    toast({
      title: "Payment Successful!",
      description: "Your order has been confirmed.",
      duration: 3000,
    });

    clearCart();
    setIsProcessingPayment(false);
    onOrderComplete(orderDetails);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4">
        <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-poppins font-bold">Your Order</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(false)}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                {/* Live Order Timer */}
                <LiveOrderTimer 
                  items={timerItems}
                  isActive={timerState.isActive}
                  timeElapsed={timerState.timeElapsed}
                  totalPrepTime={timerState.totalPrepTime}
                  onComplete={() => {
                    toast({
                      title: "Order Ready!",
                      description: "Your order is ready to be served.",
                      duration: 5000,
                    });
                    resetTimer();
                  }}
                />

                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-accent rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">₹{item.price} each</p>
                      
                      {item.notes && (
                        <p className="text-xs text-primary mb-2">Note: {item.notes}</p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            ₹{item.price * item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Special Instructions */}
                <div className="pt-4">
                  <label className="block text-sm font-medium mb-2">
                    Special Instructions for Kitchen:
                  </label>
                  <Textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests..."
                    className="text-sm"
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          {/* Order Actions & Payment */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-6 space-y-4">
              {/* Order Now Button */}
              {!timerState.isActive && (
                <Button
                  onClick={handleOrderNow}
                  className="w-full bg-orange-500 text-white hover:bg-orange-600 py-3 rounded-xl font-medium"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Order Now - Start Preparation
                </Button>
              )}

              {/* Pay Now Button */}
              <Button
                onClick={() => setShowCostBreakdown(true)}
                className="w-full bg-primary text-white hover:bg-primary/90 py-3 rounded-xl font-medium"
                disabled={isProcessingPayment}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isProcessingPayment ? 'Processing...' : `Pay Now - ₹${taxCalculation.total}`}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Includes CGST (2.5%) + SGST (2.5%)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cost Breakdown Modal */}
      <CostBreakdownModal
        isOpen={showCostBreakdown}
        onClose={() => setShowCostBreakdown(false)}
        items={items}
        subtotal={taxCalculation.subtotal}
        cgst={taxCalculation.cgst}
        sgst={taxCalculation.sgst}
        total={taxCalculation.total}
        onPayment={handlePayment}
      />
    </>
  );
};

export default CartModal;
