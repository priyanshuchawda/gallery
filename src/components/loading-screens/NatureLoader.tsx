
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const NatureLoader = () => {
  const [progress, setProgress] = useState(0);
  const [leafCount, setLeafCount] = useState(0);
  const [ripples, setRipples] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 8 + 2;
      });
    }, 300);

    const leafInterval = setInterval(() => {
      setLeafCount(prev => (prev + 1) % 20);
    }, 400);

    const rippleInterval = setInterval(() => {
      setRipples(prev => [...prev.slice(-3), Date.now()]);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(leafInterval);
      clearInterval(rippleInterval);
    };
  }, []);

  const reset = () => {
    setProgress(0);
    setLeafCount(0);
    setRipples([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 relative overflow-hidden flex items-center justify-center">
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-300 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-green-900/50 border-green-400/50 text-green-300 hover:bg-green-800/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Gallery
            </Button>
          </Link>
          <Button onClick={reset} variant="outline" size="sm" className="bg-green-900/50 border-emerald-400/50 text-emerald-300 hover:bg-emerald-800/50">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-6 right-6 z-20 text-right">
        <h1 className="text-green-300 font-serif text-lg font-bold mb-1">FOREST.BLOOM</h1>
        <p className="text-emerald-400 text-sm">Organic Growth Animation</p>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 space-y-12">
        {/* Growing Tree Animation */}
        <div className="relative w-48 h-48 mx-auto">
          {/* Tree Trunk */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 bg-amber-800 transition-all duration-1000 ease-out"
               style={{ height: `${(progress / 100) * 60}px` }} />
          
          {/* Branches */}
          {progress > 20 && (
            <>
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-amber-700 rotate-45 origin-bottom transition-opacity duration-500"
                   style={{ opacity: Math.min((progress - 20) / 20, 1) }} />
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-amber-700 -rotate-45 origin-bottom transition-opacity duration-500"
                   style={{ opacity: Math.min((progress - 20) / 20, 1) }} />
            </>
          )}
          
          {/* Leaves */}
          {Array.from({ length: leafCount }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-green-400 rounded-full animate-pulse"
              style={{
                left: `${40 + Math.random() * 20}%`,
                top: `${10 + Math.random() * 40}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}

          {/* Ripple Effects */}
          {ripples.map((ripple, i) => (
            <div
              key={ripple}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-emerald-300 rounded-full animate-ping opacity-30"
              style={{
                width: `${(i + 1) * 40}px`,
                height: `${(i + 1) * 40}px`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-green-200 mb-2">
            Growing
          </h2>
          <div className="text-emerald-300 text-lg tracking-wider">
            {Array.from("Nature's Harmony").map((char, i) => (
              <span
                key={i}
                className="inline-block animate-bounce"
                style={{ animationDelay: `${i * 0.1}s`, animationDuration: '2s' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        {/* Water Loading Bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="relative bg-green-900/50 h-6 rounded-full overflow-hidden border-2 border-emerald-400/30">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-emerald-400 to-green-400 transition-all duration-500 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Water Wave Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-1 bg-white/40 animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-green-300">
            <span className="font-serif">Bloom Progress</span>
            <span className="text-emerald-300 font-bold">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-2 text-emerald-300 text-sm">
          <div className="opacity-80 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Roots spreading...
          </div>
          <div className="opacity-60 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            Photosynthesis active
          </div>
          <div className="opacity-40 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            Ecosystem harmonizing
          </div>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full animate-pulse blur-xl" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-400/10 rounded-full animate-pulse blur-xl" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default NatureLoader;
