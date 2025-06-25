
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const topSellerItems = [
  {
    id: 'top-1',
    name: 'Butter Chicken',
    price: 480,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=200&fit=crop&crop=center',
    category: 'mains',
    orderCount: 152
  },
  {
    id: 'top-2',
    name: 'Biryani Deluxe',
    price: 420,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop&crop=center',
    category: 'mains',
    orderCount: 134
  },
  {
    id: 'top-3',
    name: 'Paneer Tikka',
    price: 320,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=200&h=200&fit=crop&crop=center',
    category: 'starters',
    orderCount: 98
  },
  {
    id: 'top-4',
    name: 'Gulab Jamun',
    price: 180,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop&crop=center',
    category: 'desserts',
    orderCount: 87
  },
  {
    id: 'top-5',
    name: 'Masala Chai',
    price: 80,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=200&fit=crop&crop=center',
    category: 'beverages',
    orderCount: 201
  }
];

const TopSellersCarousel = () => {
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-poppins font-bold text-accent-foreground flex items-center">
          🔥 Top Sellers
        </h2>
        <span className="text-sm text-gray-500">Most Ordered</span>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {topSellerItems.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-auto">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3 w-48">
                <div className="relative mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    #{item.orderCount}
                  </div>
                </div>
                <h3 className="font-poppins font-semibold text-sm text-accent-foreground mb-1 truncate">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-bold text-primary">
                    ₹{item.price}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-full text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default TopSellersCarousel;
