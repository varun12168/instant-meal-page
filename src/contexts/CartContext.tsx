
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes?: string;
  category: string;
}

export interface TimerState {
  isActive: boolean;
  timeElapsed: number;
  startTime?: number;
  totalPrepTime: number;
  itemPrepTimes: { [itemId: string]: number };
}

export interface TaxCalculation {
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  taxCalculation: TaxCalculation;
  timerState: TimerState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  startOrderTimer: () => void;
  updateTimerElapsed: (elapsed: number) => void;
  resetTimer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'restaurant-cart-data';

// Helper function to get item prep time based on category
const getItemPrepTime = (category: string): number => {
  const prepTimes: { [key: string]: number } = {
    'Starters': 12,
    'Mains': 18,
    'Drinks': 3,
    'Chinese': 15,
    'Sushi': 20,
    'Pizza': 14,
    'Biryani': 25
  };
  return prepTimes[category] || 15;
};

// Calculate total prep time (longest item + 30% for parallel cooking)
const calculateTotalPrepTime = (items: CartItem[]): number => {
  if (items.length === 0) return 0;
  const maxPrepTime = Math.max(...items.map(item => getItemPrepTime(item.category)));
  const totalIndividualTime = items.reduce((sum, item) => sum + getItemPrepTime(item.category), 0);
  return Math.round(maxPrepTime + (totalIndividualTime * 0.1));
};

// Comprehensive data structure for localStorage
interface CartStorageData {
  items: CartItem[];
  timerState: TimerState;
  lastUpdated: number;
}

const saveCartToStorage = (items: CartItem[], timerState: TimerState) => {
  try {
    const data: CartStorageData = {
      items,
      timerState,
      lastUpdated: Date.now()
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
    console.log('Cart data saved to localStorage:', { itemCount: items.length, timerActive: timerState.isActive });
  } catch (error) {
    console.warn('Failed to save cart to localStorage:', error);
  }
};

const loadCartFromStorage = (): { items: CartItem[]; timerState: TimerState } => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return { items: [], timerState: getInitialTimerState([]) };
    
    const data: CartStorageData = JSON.parse(stored);
    
    // If timer was active, calculate elapsed time since last update
    let adjustedTimerState = data.timerState;
    if (data.timerState.isActive && data.timerState.startTime) {
      const timeSinceLastUpdate = Math.floor((Date.now() - data.lastUpdated) / 1000);
      adjustedTimerState = {
        ...data.timerState,
        timeElapsed: data.timerState.timeElapsed + timeSinceLastUpdate
      };
    }
    
    console.log('Cart data loaded from localStorage:', { 
      itemCount: data.items.length, 
      timerActive: adjustedTimerState.isActive,
      timeElapsed: adjustedTimerState.timeElapsed 
    });
    
    return { items: data.items, timerState: adjustedTimerState };
  } catch (error) {
    console.warn('Failed to load cart from localStorage:', error);
    return { items: [], timerState: getInitialTimerState([]) };
  }
};

const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    console.log('Cart cleared from localStorage');
  } catch (error) {
    console.warn('Failed to clear cart from localStorage:', error);
  }
};

const getInitialTimerState = (items: CartItem[]): TimerState => {
  const itemPrepTimes: { [itemId: string]: number } = {};
  items.forEach(item => {
    itemPrepTimes[item.id] = getItemPrepTime(item.category);
  });
  
  return {
    isActive: false,
    timeElapsed: 0,
    totalPrepTime: calculateTotalPrepTime(items),
    itemPrepTimes
  };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [timerState, setTimerState] = useState<TimerState>(getInitialTimerState([]));
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const { items: savedItems, timerState: savedTimerState } = loadCartFromStorage();
    if (savedItems.length > 0) {
      setItems(savedItems);
      setTimerState(savedTimerState);
    }
  }, []);

  // Save cart to localStorage whenever items or timer state changes
  useEffect(() => {
    saveCartToStorage(items, timerState);
  }, [items, timerState]);

  // Calculate derived values
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const taxCalculation: TaxCalculation = {
    subtotal: totalAmount,
    cgst: Math.round(totalAmount * 0.025),
    sgst: Math.round(totalAmount * 0.025),
    total: totalAmount + Math.round(totalAmount * 0.025) + Math.round(totalAmount * 0.025)
  };

  const updateItemPrepTimes = (newItems: CartItem[]) => {
    const itemPrepTimes: { [itemId: string]: number } = {};
    newItems.forEach(item => {
      itemPrepTimes[item.id] = getItemPrepTime(item.category);
    });
    return itemPrepTimes;
  };

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      let updatedItems: CartItem[];
      
      if (existingItem) {
        toast({
          title: "Item Updated",
          description: `${newItem.name} quantity increased`,
          duration: 2000,
        });
        updatedItems = prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Added to Cart",
          description: `${newItem.name} added successfully`,
          duration: 2000,
        });
        updatedItems = [...prevItems, { ...newItem, quantity: 1 }];
      }

      // Update timer state with new prep times
      setTimerState(prevTimer => ({
        ...prevTimer,
        totalPrepTime: calculateTotalPrepTime(updatedItems),
        itemPrepTimes: updateItemPrepTimes(updatedItems)
      }));

      return updatedItems;
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast({
          title: "Item Removed",
          description: `${item.name} removed from cart`,
          duration: 2000,
        });
      }
      
      const updatedItems = prevItems.filter(item => item.id !== id);
      
      // Update timer state
      setTimerState(prevTimer => ({
        ...prevTimer,
        totalPrepTime: calculateTotalPrepTime(updatedItems),
        itemPrepTimes: updateItemPrepTimes(updatedItems)
      }));

      return updatedItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      // Update timer state
      setTimerState(prevTimer => ({
        ...prevTimer,
        totalPrepTime: calculateTotalPrepTime(updatedItems),
        itemPrepTimes: updateItemPrepTimes(updatedItems)
      }));

      return updatedItems;
    });
  };

  const updateNotes = (id: string, notes: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, notes } : item
      )
    );
  };

  const startOrderTimer = () => {
    setTimerState(prevTimer => ({
      ...prevTimer,
      isActive: true,
      startTime: Date.now(),
      timeElapsed: 0
    }));
  };

  const updateTimerElapsed = (elapsed: number) => {
    setTimerState(prevTimer => ({
      ...prevTimer,
      timeElapsed: elapsed
    }));
  };

  const resetTimer = () => {
    setTimerState(prevTimer => ({
      ...prevTimer,
      isActive: false,
      timeElapsed: 0,
      startTime: undefined
    }));
  };

  const clearCart = () => {
    setItems([]);
    setTimerState(getInitialTimerState([]));
    setIsCartOpen(false);
    clearCartFromStorage();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalAmount,
        taxCalculation,
        timerState,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        startOrderTimer,
        updateTimerElapsed,
        resetTimer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
