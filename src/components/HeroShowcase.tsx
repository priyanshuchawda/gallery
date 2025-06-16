
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Shuffle, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const featuredLoaders = [
  {
    id: "cyberpunk",
    name: "ELECTRIC PULSE",
    description: "Neural networks awakening in digital rain",
    story: "In Neo-Tokyo 2087, this loader simulates consciousness booting up in quantum servers floating above the neon skyline.",
    gradient: "from-purple-500 via-pink-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop"
  },
  {
    id: "oceanic",
    name: "WAVE RIDER", 
    description: "Fluid motion captured in digital waves",
    story: "Deep beneath the Pacific, ancient data flows through bioluminescent fiber networks, pulsing with the rhythm of tidal algorithms.",
    gradient: "from-blue-300 via-cyan-400 to-turquoise-500",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=400&fit=crop"
  },
  {
    id: "nature",
    name: "BLOOM BURST",
    description: "Organic algorithms growing in real-time", 
    story: "This loader represents life's code - DNA sequences blooming into consciousness as nature's own programming language executes.",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=400&fit=crop"
  }
];

interface HeroShowcaseProps {
  onSurpriseMe: () => void;
}

const HeroShowcase = ({ onSurpriseMe }: HeroShowcaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    if (isAutoplay) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % featuredLoaders.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoplay]);

  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev => [...prev.slice(-20), Date.now()]);
    }, 200);
    return () => clearInterval(particleInterval);
  }, []);

  const currentLoader = featuredLoaders[currentIndex];

  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl mb-16 border border-white/20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img 
          src={currentLoader.image} 
          alt={currentLoader.name}
          className="w-full h-full object-cover transition-all duration-1000"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${currentLoader.gradient} opacity-80 transition-all duration-1000`} />
        
        {/* Dynamic Particles */}
        {particles.map((particle, i) => (
          <div
            key={particle}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-bounce"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-8">
        <div className="max-w-4xl space-y-6">
          <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2 animate-pulse">
            🔥 FEATURED LOADER OF THE DAY
          </Badge>
          
          <h2 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl animate-pulse">
            {currentLoader.name}
          </h2>
          
          <p className="text-2xl text-white/90 font-medium max-w-2xl mx-auto">
            {currentLoader.description}
          </p>
          
          <p className="text-lg text-white/80 italic max-w-3xl mx-auto leading-relaxed">
            "{currentLoader.story}"
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Link to={`/loading/${currentLoader.id}`}>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-lg px-8 py-3 backdrop-blur-md">
                <Play className="w-5 h-5 mr-2" />
                EXPERIENCE NOW
              </Button>
            </Link>
            
            <Button 
              onClick={onSurpriseMe}
              className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-bold text-lg px-8 py-3 shadow-lg"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              SURPRISE ME!
            </Button>
            
            <Button
              onClick={() => setIsAutoplay(!isAutoplay)}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md"
            >
              <Zap className="w-4 h-4 mr-2" />
              {isAutoplay ? 'PAUSE' : 'AUTOPLAY'}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {featuredLoaders.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroShowcase;
