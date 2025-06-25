
import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
    // In a real app, this would trigger translation logic
    console.log(`Language changed to: ${langCode}`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Globe className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-auto">
        <SheetHeader className="text-center">
          <SheetTitle className="font-poppins">Select Language</SheetTitle>
        </SheetHeader>
        
        <div className="grid gap-3 mt-6 mb-4">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={selectedLanguage === lang.code ? "default" : "outline"}
              className="flex items-center justify-start space-x-3 p-4 h-auto"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {selectedLanguage === lang.code && (
                <span className="ml-auto text-sm">✓</span>
              )}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LanguageSelector;
