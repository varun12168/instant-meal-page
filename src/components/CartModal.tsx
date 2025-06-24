
import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import UpsellSuggestions from './UpsellSuggestions';

interface CartModalProps {
  onOrderComplete: (orderDetails: any) => void;
}

const CartModal: React.FC<CartModalProps> = ({ onOrderComplete }) => {
  const { 
    items, 
    totalAmount, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeItem, 
    updateNotes,
    clearCart 
  } = useCart();

  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const gst = Math.round(totalAmount * 0.18);
  const finalTotal = totalAmount + gst;

  const handlePayment = async (method: string) => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderDetails = {
      items,
      subtotal: totalAmount,
      gst,
      total: finalTotal,
      specialInstructions,
      paymentMethod: method,
      orderId: `ORD${Date.now()}`,
      estimatedTime: '15-20 mins'
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

              {/* Upsell Suggestions */}
              <UpsellSuggestions />

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

        {/* Order Summary & Payment */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            {/* Bill Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <h3 className="font-medium">Choose Payment Method:</h3>
              
              <Button
                onClick={() => handlePayment('UPI')}
                disabled={isProcessingPayment}
                className="w-full bg-secondary text-white hover:bg-secondary/90 p-4 rounded-xl"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Pay with UPI - ₹{finalTotal}
              </Button>
              
              <Button
                onClick={() => handlePayment('Card')}
                disabled={isProcessingPayment}
                variant="outline"
                className="w-full p-4 rounded-xl"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay with Card - ₹{finalTotal}
              </Button>
            </div>

            {isProcessingPayment && (
              <div className="text-center py-4">
                <div className="animate-pulse text-primary">Processing payment...</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
