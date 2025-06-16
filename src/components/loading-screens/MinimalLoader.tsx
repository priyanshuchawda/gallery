
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const MinimalLoader = () => {
  const [progress, setProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number; scale: number; delay: number }>>([]);
  const [geometryRotation, setGeometryRotation] = useState(0);
  const [fibonacci, setFibonacci] = useState([1, 1, 2, 3, 5, 8, 13, 21]);

  useEffect(() => {
    // Initialize particles in golden ratio spiral
    const particles = Array.from({ length: 21 }, (_, i) => {
      const angle = i * (Math.PI * 2 * 0.618034); // Golden ratio
      const radius = Math.sqrt(i) * 8;
      return {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        scale: 0.3 + (i / 21) * 0.7,
        delay: i * 0.1
      };
    });
    setParticlePositions(particles);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 2 + 0.5, 100));
    }, 200);

    const waveInterval = setInterval(() => {
      setWaveOffset(prev => (prev + 2) % 360);
    }, 50);

    const geometryInterval = setInterval(() => {
      setGeometryRotation(prev => (prev + 1) % 360);
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(waveInterval);
      clearInterval(geometryInterval);
    };
  }, []);

  const reset = () => {
    setProgress(0);
    setWaveOffset(0);
    setGeometryRotation(0);
  };

  // Generate sine wave points for mathematical visualization
  const generateWavePoints = () => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const x = i;
      const y = 50 + Math.sin((i + waveOffset) * 0.1) * 20;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-zinc-200 dark:from-gray-950 dark:via-slate-900 dark:to-black relative overflow-hidden flex items-center justify-center">
      {/* Mathematical Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400 dark:text-gray-600"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Controls */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-white/80 dark:bg-black/80 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Gallery
            </Button>
          </Link>
          <Button onClick={reset} variant="outline" size="sm" className="bg-white/80 dark:bg-black/80 backdrop-blur-sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-6 right-6 z-20 text-right">
        <h1 className="text-gray-900 dark:text-gray-100 font-light text-lg mb-1">ZEN.MATHEMATICS</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Golden Ratio Harmonics</p>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-16 relative z-10">
        {/* Fibonacci Spiral with Particles */}
        <div className="relative w-80 h-80 mx-auto">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Golden Ratio Spiral */}
            <path
              d="M 50 50 Q 65 35, 80 50 Q 65 65, 50 50 Q 35 35, 50 20 Q 85 35, 80 80 Q 15 65, 20 20 Q 85 -15, 120 80"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              opacity="0.6"
              className="animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            
            {/* Sine Wave */}
            <polyline
              points={generateWavePoints()}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-blue-500 dark:text-blue-400 opacity-40"
            />

            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Fibonacci Particles */}
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                transform: `scale(${particle.scale})`,
                animationDelay: `${particle.delay}s`,
                animationDuration: '2s'
              }}
            />
          ))}

          {/* Central Geometric Pattern */}
          <div 
            className="absolute inset-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${geometryRotation}deg)` }}
          >
            <div className="relative w-full h-full">
              {/* Hexagon */}
              <div className="absolute inset-0 border-2 border-gray-800 dark:border-gray-200" 
                   style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }} />
              {/* Inner Triangle */}
              <div className="absolute inset-4 border border-blue-500" 
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              {/* Center Dot */}
              <div className="absolute inset-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Mathematical Progress Visualization */}
        <div className="w-96 mx-auto space-y-6">
          {/* Fibonacci Sequence Visual */}
          <div className="flex justify-center items-end space-x-1 mb-4">
            {fibonacci.map((num, i) => (
              <div key={i} className="flex flex-col items-center space-y-1">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ 
                    width: '12px', 
                    height: `${(num / 21) * 40}px`,
                    opacity: progress > (i * 12.5) ? 1 : 0.3 
                  }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">{num}</span>
              </div>
            ))}
          </div>

          {/* Circular Progress with Mathematical Formulas */}
          <div className="relative w-40 h-40 mx-auto">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300 dark:text-gray-700"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
                className="transition-all duration-500"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-gray-900 dark:text-white">
                {Math.floor(progress)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">φ = 1.618</span>
            </div>
          </div>

          {/* Mathematical Status */}
          <div className="space-y-2 text-sm font-mono">
            <div className="text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Calculating: Fibonacci Sequence
            </div>
            <div className="text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              Processing: Golden Ratio
            </div>
            <div className="text-cyan-600 dark:text-cyan-400 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              Rendering: Sacred Geometry
            </div>
          </div>
        </div>

        {/* Mathematical Equation Display */}
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg p-4 w-80 mx-auto">
          <div className="text-gray-800 dark:text-gray-200 font-mono text-sm space-y-1">
            <div className="text-center text-blue-600 dark:text-blue-400 font-bold">Mathematical Harmony</div>
            <div>φ = (1 + √5) / 2 ≈ 1.618033988...</div>
            <div>F(n) = F(n-1) + F(n-2)</div>
            <div className="text-purple-600 dark:text-purple-400">sin(x) + cos(x) = √2 · sin(x + π/4)</div>
          </div>
        </div>
      </div>

      {/* Floating Mathematical Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['π', 'φ', '∞', '∑', '∆', '∫'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-4xl text-gray-400 dark:text-gray-600 opacity-20 animate-pulse"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animationDelay: `${i}s`,
              animationDuration: '3s'
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinimalLoader;
