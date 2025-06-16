
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Play, Sparkles } from "lucide-react";
import HeroShowcase from "@/components/HeroShowcase";
import ThemeToggle from "@/components/ThemeToggle";
import IntroAnimation from "@/components/IntroAnimation";
import InteractiveLoader from "@/components/InteractiveLoader";
import PageHeader from "@/components/PageHeader";
import HeroSection from "@/components/HeroSection";
import SearchAndFilters from "@/components/SearchAndFilters";
import BackgroundAnimations from "@/components/BackgroundAnimations";

const loadingScreens = [
  {
    id: "cyberpunk",
    name: "NEURAL SURGE",
    description: "Digital Consciousness Awakening",
    theme: "Cyberpunk",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    views: 1247,
    likes: 89,
    color: "from-purple-600 via-pink-500 to-orange-400",
    bgColor: "bg-gray-900/95",
    textColor: "text-white",
    status: "⚡ ELECTRIC",
    story: "In the depths of cyberspace, neural networks pulse with electric life as digital consciousness emerges from quantum static."
  },
  {
    id: "nature",
    name: "FOREST SYMPHONY",
    description: "Living Ecosystem in Motion",
    theme: "Nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    views: 892,
    likes: 156,
    color: "from-emerald-400 via-green-500 to-lime-400",
    bgColor: "bg-green-900/90",
    textColor: "text-green-50",
    status: "🌿 ORGANIC",
    story: "Ancient trees whisper data through underground root networks, where nature's algorithms have been computing for millennia."
  },
  {
    id: "retro",
    name: "SYNTHWAVE HORIZON",
    description: "80s Future Nostalgia Trip",
    theme: "Retro 80s",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    views: 2103,
    likes: 234,
    color: "from-pink-400 via-purple-500 to-cyan-400",
    bgColor: "bg-purple-900/90",
    textColor: "text-pink-100",
    status: "🎵 NOSTALGIC",
    story: "Cruise through neon highways of memory where the future's past lives in eternal synthwave glory."
  },
  {
    id: "minimal",
    name: "ZEN MECHANICS",
    description: "Pure Mathematical Beauty",
    theme: "Minimalist",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
    views: 756,
    likes: 67,
    color: "from-slate-300 via-gray-400 to-zinc-500",
    bgColor: "bg-slate-800/95",
    textColor: "text-slate-100",
    status: "⚪ PURE",
    story: "Sacred geometry unfolds in perfect harmony, where simplicity becomes the ultimate expression of complexity."
  },
  {
    id: "scifi",
    name: "STELLAR GATEWAY",
    description: "Interstellar Data Portal",
    theme: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
    views: 1456,
    likes: 198,
    color: "from-blue-400 via-indigo-500 to-violet-500",
    bgColor: "bg-indigo-900/90",
    textColor: "text-blue-100",
    status: "🚀 COSMIC",
    story: "Traverse wormholes of data as stellar gateways open pathways to distant galaxies of information."
  },
  {
    id: "oceanic",
    name: "ABYSSAL DEPTHS",
    description: "Deep Sea Data Currents",
    theme: "Oceanic",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    views: 634,
    likes: 87,
    color: "from-teal-400 via-cyan-500 to-blue-500",
    bgColor: "bg-cyan-900/90",
    textColor: "text-cyan-50",
    status: "🌊 FLUID",
    story: "Dive into oceanic trenches where bioluminescent data streams flow through underwater fiber optic coral reefs."
  }
];

const themeBackgrounds = {
  electric: "from-indigo-900 via-purple-900 to-pink-900",
  cyber: "from-gray-900 via-slate-800 to-black",
  sunset: "from-orange-900 via-red-900 to-pink-900",
  ocean: "from-blue-900 via-cyan-900 to-teal-900"
};

const Index = () => {
  const [selectedTheme, setSelectedTheme] = useState("ALL VIBES");
  const [searchTerm, setSearchTerm] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [currentUITheme, setCurrentUITheme] = useState("electric");

  const filteredScreens = loadingScreens.filter(screen => {
    const matchesTheme = selectedTheme === "ALL VIBES" || screen.theme === selectedTheme;
    const matchesSearch = screen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         screen.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTheme && matchesSearch;
  });

  const handleSurpriseMe = () => {
    const randomScreen = loadingScreens[Math.floor(Math.random() * loadingScreens.length)];
    window.open(`/loading/${randomScreen.id}`, '_blank');
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  const currentBgTheme = themeBackgrounds[currentUITheme as keyof typeof themeBackgrounds];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentBgTheme} text-white relative overflow-hidden transition-all duration-1000`}>
      <ThemeToggle 
        currentTheme={currentUITheme} 
        onThemeChange={setCurrentUITheme} 
      />

      <BackgroundAnimations />

      <PageHeader />

      <main className="container mx-auto px-6 py-12 relative z-10">
        <HeroShowcase onSurpriseMe={handleSurpriseMe} />
        <HeroSection />
        
        <SearchAndFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScreens.map((screen, index) => (
            <InteractiveLoader 
              key={screen.id} 
              type={screen.id as 'cyberpunk' | 'oceanic' | 'retro'}
            >
              <Card className={`group ${screen.bgColor} backdrop-blur-lg border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={screen.image}
                    alt={screen.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${screen.color} opacity-70 group-hover:opacity-40 transition-opacity`} />
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <div className="text-white font-bold text-xl animate-pulse">
                        {screen.status}
                      </div>
                      <Link to={`/loading/${screen.id}`}>
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-bold shadow-lg">
                          <Play className="w-4 h-4 mr-2" />
                          EXPERIENCE NOW
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <Badge className={`absolute top-4 left-4 bg-gradient-to-r ${screen.color} text-black font-bold shadow-lg border-0`}>
                    {screen.theme}
                  </Badge>
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                </div>

                <CardContent className={`p-6 space-y-4 ${screen.textColor}`}>
                  <div className="space-y-3">
                    <h3 className={`font-black text-2xl bg-gradient-to-r ${screen.color} bg-clip-text text-transparent`}>
                      {screen.name}
                    </h3>
                    <p className={`${screen.textColor}/80 text-lg font-medium`}>{screen.description}</p>
                    
                    <p className={`${screen.textColor}/60 text-sm italic leading-relaxed`}>
                      "{screen.story}"
                    </p>
                    
                    <div className="flex items-center justify-between pt-3">
                      <div className={`flex items-center gap-6 ${screen.textColor}/70`}>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-cyan-400" />
                          <span className="font-bold">{screen.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-pink-400" />
                          <span className="font-bold">{screen.likes}</span>
                        </div>
                      </div>
                      <div className={`${screen.textColor}/50 font-mono text-sm`}>
                        #{String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <div className={`absolute -inset-0.5 bg-gradient-to-r ${screen.color} rounded-lg opacity-0 group-hover:opacity-40 transition-opacity blur-sm -z-10`} />
              </Card>
            </InteractiveLoader>
          ))}
        </div>

        {filteredScreens.length === 0 && (
          <div className="text-center py-20 space-y-8">
            <div className="relative inline-block">
              <Sparkles className="w-20 h-20 text-purple-400 mx-auto animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full animate-bounce" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                No Magic Found Here!
              </h3>
              <p className="text-white/70 text-lg">Try different search terms or explore all our creative vibes</p>
            </div>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedTheme("ALL VIBES");
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold text-lg px-8 py-3 shadow-lg transform hover:scale-105 transition-all"
            >
              ✨ RESET & EXPLORE ALL
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-md bg-white/5 border-t border-white/10 mt-20 py-12">
        <div className="container mx-auto px-6 text-center space-y-6">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" />
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
          </div>
          <h4 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            CREATIVE LOADING GALLERY
          </h4>
          <p className="text-white/70 text-lg font-medium">
            Where Every Second of Waiting Becomes a Moment of Wonder ✨
          </p>
          <div className="flex justify-center items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/60">CREATIVITY NEVER STOPS</span>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
