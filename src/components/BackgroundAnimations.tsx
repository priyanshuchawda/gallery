
import { useState, useEffect } from "react";
import { Sparkles, Star } from "lucide-react";

const BackgroundAnimations = () => {
  const [floatingElements, setFloatingElements] = useState<number[]>([]);

  useEffect(() => {
    const floatingInterval = setInterval(() => {
      setFloatingElements(prev => [...prev.slice(-8), Date.now()]);
    }, 2000);

    return () => clearInterval(floatingInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse blur-3xl" />
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-pulse blur-3xl" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-15 animate-pulse blur-2xl" style={{ animationDelay: '2s' }} />
      
      {/* Floating Elements */}
      {floatingElements.map((element, i) => (
        <div
          key={element}
          className="absolute animate-bounce opacity-60"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          {Math.random() > 0.5 ? (
            <Sparkles className="w-6 h-6 text-yellow-300" />
          ) : (
            <Star className="w-4 h-4 text-pink-300" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimations;
