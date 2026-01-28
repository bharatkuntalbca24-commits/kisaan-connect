import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'raj', name: 'Rajasthani', nativeName: 'राजस्थानी' },
  { code: 'bh', name: 'Bhojpuri', nativeName: 'भोजपुरी' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
];

export const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    // Future: Implement actual language switching logic
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1.5 text-primary-foreground hover:bg-primary/80"
        >
          <Globe className="h-5 w-5" />
          <span className="text-sm font-medium">{selectedLanguage.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 max-h-80 overflow-y-auto bg-background border border-border shadow-lg z-50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`flex justify-between items-center cursor-pointer hover:bg-accent ${
              selectedLanguage.code === language.code ? 'bg-accent' : ''
            }`}
          >
            <span className="font-medium">{language.nativeName}</span>
            <span className="text-xs text-muted-foreground">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
