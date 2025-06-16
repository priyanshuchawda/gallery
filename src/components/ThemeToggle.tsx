
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Moon, Sun, Zap } from "lucide-react";

const themes = [
  { 
    id: 'electric', 
    name: 'ELECTRIC', 
    icon: Zap,
    gradient: 'from-purple-600 via-pink-500 to-orange-500',
    bg: 'from-indigo-900 via-purple-900 to-pink-900'
  },
  { 
    id: 'cyber', 
    name: 'CYBER', 
    icon: Palette,
    gradient: 'from-green-400 via-cyan-500 to-blue-600',
    bg: 'from-gray-900 via-slate-800 to-black'
  },
  { 
    id: 'sunset', 
    name: 'SUNSET', 
    icon: Sun,
    gradient: 'from-orange-400 via-red-500 to-pink-600',
    bg: 'from-orange-900 via-red-900 to-pink-900'
  },
  { 
    id: 'ocean', 
    name: 'OCEAN', 
    icon: Moon,
    gradient: 'from-blue-400 via-cyan-500 to-teal-600',
    bg: 'from-blue-900 via-cyan-900 to-teal-900'
  }
];

interface ThemeToggleProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeToggle = ({ currentTheme, onThemeChange }: ThemeToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeTheme = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50">
      <div className="space-y-3">
        {/* Main Toggle Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-gradient-to-r ${activeTheme.gradient} hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-white/20`}
        >
          <activeTheme.icon className="w-6 h-6 text-white drop-shadow-lg" />
        </Button>

        {/* Theme Options */}
        {isOpen && (
          <div className="space-y-2 animate-fade-in">
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <div key={theme.id} className="flex items-center gap-3">
                  <Badge 
                    className={`text-xs px-2 py-1 bg-black/50 text-white border-white/20 transition-all duration-300 ${
                      currentTheme === theme.id ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    {theme.name}
                  </Badge>
                  <Button
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.gradient} hover:scale-110 transition-all duration-300 shadow-lg border border-white/20 ${
                      currentTheme === theme.id ? 'ring-2 ring-white/50' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
