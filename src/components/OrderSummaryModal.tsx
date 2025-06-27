import React, { useState, useEffect } from 'react';
import { X, CreditCard, Clock, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import CostBreakdownModal from './CostBreakdownModal';

const OrderSummaryModal: React.FC = () => {
  const { 
    orderedItems,
    orderedTaxCalculation,
    timerState,
    isOrderSummaryOpen, 
    setIsOrderSummaryOpen,
    updateTimerElapsed,
    resetTimer,
    canPayNow,
    updateOrderedItemStatus,
    clearCart
  } = useCart();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [isTimerExpanded, setIsTimerExpanded] = useState(false);

  // Default prep time of 4 minutes per item
  const DEFAULT_PREP_TIME = 4;

  // Timer management with precise 4-minute intervals
  useEffect(() => {
    if (!timerState.isActive) return;
    
    const timer = setInterval(() => {
      const newElapsed = timerState.timeElapsed + 1;
      updateTimerElapsed(newElapsed);
      
      // Update item statuses based on 4-minute intervals
      orderedItems.forEach((item, index) => {
        const itemStartTime = index * 60; // Stagger items by 1 minute
        const itemReadyTime = itemStartTime + (DEFAULT_PREP_TIME * 60); // 4 minutes prep
        const itemReceivedTime = itemReadyTime + 30; // 30 seconds to mark as received
        
        if (newElapsed >= itemStartTime && newElapsed < itemReadyTime && item.status === 'preparing') {
          // Keep as preparing
        } else if (newElapsed >= itemReadyTime && newElapsed < itemReceivedTime && item.status !== 'ready') {
          updateOrderedItemStatus(item.id, 'ready');
        } else if (newElapsed >= itemReceivedTime && item.status !== 'received') {
          updateOrderedItemStatus(item.id, 'received');
        }
      });
      
      // Check if all items are received and reset timer
      const allReceived = orderedItems.length > 0 && orderedItems.every(item => item.status === 'received');
      if (allReceived && timerState.isActive) {
        toast({
          title: "All Orders Ready!",
          description: "All your items have been received.",
          duration: 5000,
        });
        resetTimer();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timerState.isActive, timerState.timeElapsed, orderedItems, updateTimerElapsed, resetTimer, updateOrderedItemStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-orange-500';
      case 'ready': return 'bg-blue-500';
      case 'received': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'received': return 'Received';
      default: return 'Unknown';
    }
  };

  const handlePayment = async (method: string) => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Successful!",
      description: "Thank you for your order!",
      duration: 3000,
    });

    clearCart();
    setIsProcessingPayment(false);
    setShowCostBreakdown(false);
    setIsOrderSummaryOpen(false);
  };

  // Calculate total prep time (4 minutes per item)
  const totalPrepTime = orderedItems.length * DEFAULT_PREP_TIME;

  if (!isOrderSummaryOpen) return null;

  return (
    <>
      {/* Fixed backdrop */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-hidden">
        {/* Scrollable modal container */}
        <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col animate-slide-up mx-auto overflow-hidden">
          {/* Fixed Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-xl font-poppins font-bold">Order Summary</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOrderSummaryOpen(false)}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderedItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No orders yet</p>
              </div>
            ) : (
              <>
                {/* Ordered Items */}
                <div className="space-y-4">
                  {orderedItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-accent rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <Badge 
                            className={`${getStatusColor(item.status)} text-white text-xs px-2 py-1`}
                          >
                            {getStatusText(item.status)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          ₹{item.price} x {item.quantity}
                        </p>
                        
                        {item.notes && (
                          <p className="text-xs text-primary mb-2">Note: {item.notes}</p>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-medium text-sm">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Timer Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">Preparation Time:</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsTimerExpanded(!isTimerExpanded)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Timer className="w-4 h-4 mr-1" />
                      {formatTime(timerState.timeElapsed)}
                    </Button>
                  </div>

                  {/* Expanded Timer Details */}
                  {isTimerExpanded && (
                    <div className="mt-4 pt-4 border-t border-orange-200 space-y-2">
                      <h4 className="font-medium text-orange-900 text-sm">Breakdown:</h4>
                      {orderedItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <span className="text-orange-700">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-orange-600">{DEFAULT_PREP_TIME} min</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-orange-300">
                        <div className="flex justify-between font-medium text-orange-900 text-xs">
                          <span>Total Estimated:</span>
                          <span>{totalPrepTime} minutes</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pay Now Section */}
                <div className="space-y-4">
                  <Button
                    onClick={() => setShowCostBreakdown(true)}
                    disabled={!canPayNow || isProcessingPayment}
                    className={`w-full py-3 rounded-xl font-medium ${
                      canPayNow 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {isProcessingPayment 
                      ? 'Processing...' 
                      : canPayNow 
                        ? `Pay Now - ₹${orderedTaxCalculation.total}`
                        : 'Waiting for Order Completion'
                    }
                  </Button>

                  {!canPayNow && (
                    <p className="text-xs text-gray-500 text-center">
                      Payment will be enabled once all items are received
                    </p>
                  )}

                  <p className="text-xs text-gray-500 text-center">
                    Includes CGST (2.5%) + SGST (2.5%)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cost Breakdown Modal */}
      <CostBreakdownModal
        isOpen={showCostBreakdown}
        onClose={() => setShowCostBreakdown(false)}
        items={orderedItems}
        subtotal={orderedTaxCalculation.subtotal}
        cgst={orderedTaxCalculation.cgst}
        sgst={orderedTaxCalculation.sgst}
        total={orderedTaxCalculation.total}
        onPayment={handlePayment}
      />
    </>
  );
};

export default OrderSummaryModal;
