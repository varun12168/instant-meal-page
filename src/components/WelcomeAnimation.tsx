
import React, { useState, useEffect } from 'react';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'enter' | 'stay' | 'shrink'>('enter');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('stay'), 500);
    const timer2 = setTimeout(() => setPhase('shrink'), 2000);
    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-all duration-800 ${
      phase === 'shrink' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      <div className={`text-center transition-all duration-500 ${
        phase === 'enter' ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      } ${
        phase === 'shrink' ? 'scale-75 opacity-0' : 'scale-100'
      }`}>
        {/* Animated Waiter Illustration */}
        <div className="relative mb-6">
          <div className={`w-32 h-32 mx-auto bg-gradient-to-b from-orange-100 to-orange-50 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
            phase === 'stay' ? 'animate-bounce' : ''
          }`}>
            {/* Waiter SVG Illustration */}
            <svg width="80" height="80" viewBox="0 0 100 100" className="text-primary">
              {/* Head */}
              <circle cx="50" cy="25" r="12" fill="#FFB380" />
              {/* Hat */}
              <ellipse cx="50" cy="18" rx="14" ry="6" fill="#FF6F00" />
              <ellipse cx="50" cy="16" rx="12" ry="4" fill="#FF8F20" />
              
              {/* Body */}
              <rect x="42" y="35" width="16" height="25" rx="8" fill="#FF6F00" />
              
              {/* Arms */}
              <circle cx="35" cy="42" r="4" fill="#FFB380" />
              <circle cx="65" cy="42" r="4" fill="#FFB380" />
              <line x1="38" y1="42" x2="42" y2="42" stroke="#FF6F00" strokeWidth="3" />
              <line x1="58" y1="42" x2="62" y2="42" stroke="#FF6F00" strokeWidth="3" />
              
              {/* Tray */}
              <ellipse cx="65" cy="40" rx="12" ry="6" fill="#E0E0E0" className="animate-pulse" />
              <ellipse cx="65" cy="38" rx="10" ry="4" fill="#F5F5F5" />
              
              {/* Food items on tray */}
              <circle cx="60" cy="38" r="2" fill="#FF6F00" />
              <circle cx="68" cy="38" r="2" fill="#00C853" />
              <circle cx="64" cy="35" r="1.5" fill="#FFC107" />
              
              {/* Legs */}
              <rect x="46" y="60" width="3" height="15" fill="#FF6F00" />
              <rect x="51" y="60" width="3" height="15" fill="#FF6F00" />
              
              {/* Shoes */}
              <ellipse cx="47.5" cy="77" rx="4" ry="2" fill="#333" />
              <ellipse cx="52.5" cy="77" rx="4" ry="2" fill="#333" />
            </svg>
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-ping">
            ✨
          </div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 text-yellow-400 animate-ping" style={{ animationDelay: '0.5s' }}>
            ✨
          </div>
        </div>
        
        {/* Welcome Text */}
        <h2 className="text-2xl font-poppins font-bold text-primary mb-2">
          Welcome!
        </h2>
        <p className="text-gray-600 font-opensans">
          Your waiter is ready to serve you
        </p>
        
        {/* Loading indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
