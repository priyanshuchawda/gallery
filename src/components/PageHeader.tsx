
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Zap, Home } from "lucide-react";

const PageHeader = () => {
  const [animatedTitle, setAnimatedTitle] = useState("ANIMAZE");

  useEffect(() => {
    const titleAnimation = setInterval(() => {
      if (Math.random() > 0.7) {
        const titles = ["ANIMAZE", "CREATIVE", "ELECTRIC", "VIBRANT", "DYNAMIC"];
        setAnimatedTitle(titles[Math.floor(Math.random() * titles.length)]);
        setTimeout(() => setAnimatedTitle("ANIMAZE"), 800);
      }
    }, 3000);

    return () => clearInterval(titleAnimation);
  }, []);

  return (
    <header className="relative z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Palette className="w-10 h-10 text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                {animatedTitle}
              </h1>
              <p className="text-white/70 text-lg font-semibold tracking-wide">Where Loading Becomes Art ✨</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              asChild
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-bold shadow-lg transform hover:scale-105 transition-all"
            >
              <a href="https://priyanshutech.xyz" target="_blank" rel="noopener noreferrer">
                <Home className="w-4 h-4 mr-2" />
                HOME
              </a>
            </Button>
            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold animate-bounce">
              ⚡ LIVE GALLERY
            </Badge>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-bold shadow-lg transform hover:scale-105 transition-all">
              <Zap className="w-4 h-4 mr-2" />
              CREATE YOUR OWN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
