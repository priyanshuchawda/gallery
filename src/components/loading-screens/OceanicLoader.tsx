
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const OceanicLoader = () => {
  const [progress, setProgress] = useState(0);
  const [wavePhase, setWavePhase] = useState(0);
  const [bubbles, setBubbles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([]);
  const [sonarPulse, setSonarPulse] = useState(0);
  const [deepText, setDeepText] = useState("DIVING TO OCEANIC DEPTHS");

  const depthTexts = [
    "DIVING TO OCEANIC DEPTHS",
    "SCANNING ABYSSAL PLAINS",
    "DETECTING THERMAL VENTS", 
    "MAPPING CORAL NETWORKS",
    "ANALYZING CURRENT FLOWS",
    "DEEP SEA EXPLORATION COMPLETE"
  ];

  useEffect(() => {
    // Initialize bubbles
    const initialBubbles = Array.from({ length: 25 }, () => ({
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 2 + 1
    }));
    setBubbles(initialBubbles);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 3 + 1, 100));
    }, 400);

    const waveInterval = setInterval(() => {
      setWavePhase(prev => (prev + 5) % 360);
    }, 100);

    const textInterval = setInterval(() => {
      setDeepText(depthTexts[Math.floor(Math.random() * depthTexts.length)]);
    }, 1500);

    const sonarInterval = setInterval(() => {
      setSonarPulse(prev => (prev + 1) % 100);
    }, 80);

    // Animate bubbles
    const bubbleInterval = setInterval(() => {
      setBubbles(prev => prev.map(bubble => ({
        ...bubble,
        y: bubble.y <= -10 ? 110 : bubble.y - bubble.speed * 0.5
      })));
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(waveInterval);
      clearInterval(textInterval);
      clearInterval(sonarInterval);
      clearInterval(bubbleInterval);
    };
  }, []);

  const reset = () => {
    setProgress(0);
    setWavePhase(0);
    setSonarPulse(0);
    setDeepText("DIVING TO OCEANIC DEPTHS");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-blue-900 to-indigo-950 relative overflow-hidden flex items-center justify-center">
      {/* Underwater Rays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cyan-300/30 via-blue-300/20 to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/3 w-2 h-full bg-gradient-to-b from-teal-300/40 via-cyan-300/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-blue-200/25 via-teal-300/15 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0">
        {bubbles.map((bubble, i) => (
          <div
            key={i}
            className="absolute bg-cyan-200/40 rounded-full animate-pulse"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-blue-900/50 border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Surface
            </Button>
          </Link>
          <Button onClick={reset} variant="outline" size="sm" className="bg-blue-900/50 border-teal-400/50 text-teal-300 hover:bg-teal-500/20">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-6 right-6 z-20 text-right">
        <h1 className="text-cyan-300 font-serif text-lg font-bold mb-1">ABYSSAL.DEPTHS</h1>
        <p className="text-teal-300 text-sm">Deep Ocean Explorer</p>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 space-y-12">
        {/* Sonar Visualization */}
        <div className="relative w-56 h-56 mx-auto">
          {/* Sonar Rings */}
          {[0, 1, 2, 3].map(ring => (
            <div
              key={ring}
              className="absolute border-2 border-cyan-400/30 rounded-full animate-ping"
              style={{
                inset: `${ring * 14}px`,
                animationDelay: `${ring * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
          
          {/* Central Sonar */}
          <div className="absolute inset-20 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 rounded-full animate-pulse">
            <div className="absolute inset-4 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
            
            {/* Sonar Sweep */}
            <div 
              className="absolute inset-0 overflow-hidden rounded-full"
              style={{ transform: `rotate(${sonarPulse * 3.6}deg)` }}
            >
              <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent transform -translate-y-1/2 origin-left" />
            </div>
          </div>

          {/* Ocean Floor Detection */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 bg-amber-600/60 animate-pulse"
                  style={{ 
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Deep Sea Text */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-300">
            {deepText}
          </h2>
        </div>

        {/* Pressure Bar */}
        <div className="w-96 mx-auto space-y-4">
          <div className="relative bg-blue-950/70 h-6 rounded-full overflow-hidden border border-cyan-400/30">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 transition-all duration-500 relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Water Flow Effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  transform: `translateX(${Math.sin(wavePhase * Math.PI / 180) * 20}px)`,
                  animation: 'flow 2s ease-in-out infinite'
                }}
              />
            </div>
            {/* Depth Marker */}
            <div 
              className="absolute top-0 w-1 h-full bg-yellow-300 shadow-lg transition-all duration-500"
              style={{ left: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-cyan-300 font-serif">
            <span>DEPTH PRESSURE</span>
            <span className="text-teal-300 font-bold">{Math.floor(progress)}% • {Math.floor(progress * 100)}m</span>
          </div>
        </div>

        {/* Bioluminescent Organisms */}
        <div className="flex justify-center gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-cyan-300/60 animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${1.5 + Math.random()}s`,
                boxShadow: '0 0 20px rgba(103, 232, 249, 0.5)'
              }}
            />
          ))}
        </div>

        {/* Marine Data */}
        <div className="space-y-2 text-sm text-cyan-300/80">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Water temperature: 2°C
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            Current velocity: {Math.floor(Math.random() * 3 + 1)} m/s
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            Marine life detected
          </div>
        </div>
      </div>

      {/* Wave Overlay */}
      <div className="absolute bottom-0 w-full h-32 pointer-events-none">
        <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path
            d={`M0,60 Q300,${20 + Math.sin(wavePhase * Math.PI / 180) * 15} 600,60 T1200,60 V120 H0 V60`}
            fill="rgba(6, 182, 212, 0.2)"
            className="animate-pulse"
          />
          <path
            d={`M0,80 Q300,${40 + Math.cos(wavePhase * Math.PI / 180) * 10} 600,80 T1200,80 V120 H0 V80`}
            fill="rgba(20, 184, 166, 0.1)"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </svg>
      </div>

      <style>
        {`
          @keyframes flow {
            0%, 100% { transform: translateX(-20px); }
            50% { transform: translateX(20px); }
          }
        `}
      </style>
    </div>
  );
};

export default OceanicLoader;
