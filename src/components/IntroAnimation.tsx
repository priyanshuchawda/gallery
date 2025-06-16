
import { useState, useEffect } from "react";
import { Palette, Sparkles } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [stage, setStage] = useState(0);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Reduced timing for faster loading
    const timer1 = setTimeout(() => setStage(1), 200);
    const timer2 = setTimeout(() => setStage(2), 600);
    const timer3 = setTimeout(() => setStage(3), 1000);
    const timer4 = setTimeout(() => onComplete(), 1500); // Much faster completion

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  useEffect(() => {
    if (stage >= 2) {
      const interval = setInterval(() => {
        setParticles(prev => [...prev.slice(-15), Date.now()]);
      }, 150);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      {/* Particles */}
      {particles.map((particle, i) => (
        <div
          key={particle}
          className="absolute animate-ping"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random()}s`,
            animationDuration: '1s'
          }}
        >
          {Math.random() > 0.5 ? (
            <Sparkles className="w-3 h-3 text-yellow-300" />
          ) : (
            <div className="w-1 h-1 bg-pink-400 rounded-full" />
          )}
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center space-y-6">
        {/* Logo Animation */}
        <div className={`transition-all duration-500 ${stage >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative">
            <Palette className="w-16 h-16 text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mx-auto animate-spin" style={{ animationDuration: '2s' }} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Title Animation */}
        <div className={`transition-all duration-500 ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            ANIMAZE
          </h1>
          <p className="text-white/70 text-xl font-semibold tracking-wide mt-2">
            Where Loading Becomes Art ✨
          </p>
        </div>

        {/* Loading Bar */}
        <div className={`transition-all duration-500 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-60 mx-auto">
            <div className="bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse transition-all duration-500"
                   style={{ width: stage >= 3 ? '100%' : '0%' }} />
            </div>
            <p className="text-white/60 text-xs mt-1 animate-pulse">
              Loading Creative Magic...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
