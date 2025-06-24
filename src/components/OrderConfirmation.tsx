
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, ChefHat, Utensils, ArrowLeft, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderConfirmationProps {
  orderDetails: any;
  onBack: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderDetails, onBack }) => {
  const [orderStatus, setOrderStatus] = useState('pending');
  const [timeElapsed, setTimeElapsed] = useState(0);

  const statusSteps = [
    { id: 'pending', label: 'Order Received', icon: CheckCircle, completed: true },
    { id: 'preparing', label: 'In Kitchen', icon: ChefHat, completed: orderStatus !== 'pending' },
    { id: 'ready', label: 'Ready to Serve', icon: Utensils, completed: orderStatus === 'ready' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Simulate order progress
    const statusTimer = setTimeout(() => {
      setOrderStatus('preparing');
      setTimeout(() => {
        setOrderStatus('ready');
      }, 10000);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(statusTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-white p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-poppins font-bold text-accent-foreground mb-2 animate-fade-in">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Thank you for your order
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Order ID</span>
            <span className="font-mono font-bold">{orderDetails.orderId}</span>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Order Summary</h3>
            {orderDetails.items.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-3">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{orderDetails.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Order Status</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeElapsed)}
            </div>
          </div>

          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  step.completed ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <span className={`font-medium ${
                  step.completed ? 'text-accent-foreground' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
                {step.id === orderStatus && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-accent rounded-lg">
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span>Estimated time: {orderDetails.estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button 
            className="w-full bg-primary text-white hover:bg-primary/90 py-3 rounded-full"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Waiter
          </Button>
          
          <Button 
            variant="outline"
            className="w-full py-3 rounded-full"
            onClick={onBack}
          >
            Order More Items
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
