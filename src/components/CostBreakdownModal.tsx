
import React from 'react';
import { X, Receipt, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItem } from '@/contexts/CartContext';

interface CostBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
  onPayment: (method: string) => void;
}

const CostBreakdownModal: React.FC<CostBreakdownModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  cgst,
  sgst,
  total,
  onPayment
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4 overflow-hidden">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col animate-slide-up overflow-hidden">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Receipt className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-poppins font-bold">Cost Breakdown</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {/* Items List */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Items Ordered:</h3>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CGST (2.5%)</span>
                <span>₹{cgst}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SGST (2.5%)</span>
                <span>₹{sgst}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 pt-4">
              <h3 className="font-medium text-gray-900">Choose Payment Method:</h3>
              
              <Button 
                onClick={() => onPayment('card')}
                className="w-full bg-primary text-white hover:bg-primary/90 py-3 rounded-xl"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with Card - ₹{total}
              </Button>
              
              <Button 
                onClick={() => onPayment('upi')}
                variant="outline" 
                className="w-full py-3 rounded-xl"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Pay with UPI - ₹{total}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CostBreakdownModal;
