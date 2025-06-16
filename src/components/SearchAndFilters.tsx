
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

const themes = ["ALL VIBES", "Cyberpunk", "Nature", "Retro 80s", "Minimalist", "Sci-Fi", "Oceanic"];

const SearchAndFilters = ({ searchTerm, setSearchTerm, selectedTheme, setSelectedTheme }: SearchAndFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-12">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
        <Input
          placeholder="Search for creative magic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-14 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 text-lg focus:border-purple-400 focus:ring-purple-400/50"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {themes.map(theme => (
          <Button
            key={theme}
            variant={selectedTheme === theme ? "default" : "outline"}
            size="lg"
            onClick={() => setSelectedTheme(theme)}
            className={`font-bold transition-all transform hover:scale-105 ${
              selectedTheme === theme 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'border-white/30 text-white hover:bg-white/10 backdrop-blur-md'
            }`}
          >
            {theme}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilters;
