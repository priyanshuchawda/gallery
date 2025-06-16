
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const RetroLoader = () => {
  const [progress, setProgress] = useState(0);
  const [gridOffset, setGridOffset] = useState(0);
  const [neonPulse, setNeonPulse] = useState(0);
  const [synthBars, setSynthBars] = useState<number[]>([]);
  const [retroText, setRetroText] = useState("SYNTHWAVE");
  const [mountains, setMountains] = useState<Array<{ height: number; glow: number }>>([]);

  const textVariations = ["SYNTHWAVE", "NEON DRIVE", "RETRO WAVE", "CYBER PUNK", "80S VIBES"];

  useEffect(() => {
    // Initialize mountain range
    const mountainRange = Array.from({ length: 20 }, () => ({
      height: 20 + Math.random() * 40,
      glow: Math.random()
    }));
    setMountains(mountainRange);

    // Initialize synth bars
    setSynthBars(Array.from({ length: 12 }, () => Math.random() * 100));

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 4 + 1, 100));
    }, 200);

    const gridInterval = setInterval(() => {
      setGridOffset(prev => (prev + 2) % 50);
    }, 80);

    const pulseInterval = setInterval(() => {
      setNeonPulse(prev => (prev + 5) % 360);
    }, 50);

    const barsInterval = setInterval(() => {
      setSynthBars(prev => prev.map(() => Math.random() * 100));
    }, 150);

    const textInterval = setInterval(() => {
      setRetroText(textVariations[Math.floor(Math.random() * textVariations.length)]);
    }, 2000);

    const mountainInterval = setInterval(() => {
      setMountains(prev => prev.map(m => ({ ...m, glow: Math.random() })));
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(gridInterval);
      clearInterval(pulseInterval);
      clearInterval(barsInterval);
      clearInterval(textInterval);
      clearInterval(mountainInterval);
    };
  }, []);

  const reset = () => {
    setProgress(0);
    setGridOffset(0);
    setNeonPulse(0);
    setRetroText("SYNTHWAVE");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-black relative overflow-hidden flex items-center justify-center">
      {/* Retro Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 100 50" 
          preserveAspectRatio="none"
          style={{ transform: `translateY(${gridOffset}px)` }}
        >
          <defs>
            <pattern id="retroGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#ff00ff" strokeWidth="0.2" opacity="0.8"/>
            </pattern>
            <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="100" height="50" fill="url(#retroGrid)" />
          <rect width="100" height="50" fill="url(#gridFade)" />
          
          {/* Perspective lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="0"
              x2={i * 10}
              y2="50"
              stroke="#00ffff"
              strokeWidth="0.1"
              opacity="0.6"
            />
          ))}
        </svg>
      </div>

      {/* Mountain Silhouette */}
      <div className="absolute bottom-1/2 left-0 right-0 h-1/4">
        <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,25 ${mountains.map((m, i) => `${i * 5},${25 - m.height}`).join(' ')} 100,25`}
            fill="url(#mountainGrad)"
            className="animate-pulse"
          />
          
          {/* Mountain glow effects */}
          {mountains.map((mountain, i) => (
            <circle
              key={i}
              cx={i * 5}
              cy={25 - mountain.height}
              r="2"
              fill="#00ffff"
              opacity={mountain.glow * 0.8}
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>

      {/* Neon Sun */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
        <div className="relative w-32 h-32">
          {/* Sun rings */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 animate-pulse"
              style={{
                width: `${100 + i * 20}%`,
                height: `${100 + i * 20}%`,
                top: `${-i * 10}%`,
                left: `${-i * 10}%`,
                borderColor: i % 2 ? '#ff00ff' : '#00ffff',
                opacity: 0.8 - i * 0.1,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
          
          {/* Central sun */}
          <div 
            className="absolute inset-4 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
            style={{ 
              boxShadow: `0 0 ${20 + Math.sin(neonPulse * Math.PI / 180) * 10}px #ff00ff`,
              filter: `hue-rotate(${neonPulse}deg)`
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-black/70 border-pink-500/50 text-pink-400 hover:bg-pink-500/20 font-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              MENU
            </Button>
          </Link>
          <Button onClick={reset} variant="outline" size="sm" className="bg-black/70 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 font-mono">
            <RotateCcw className="w-4 h-4 mr-2" />
            RESET
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-6 right-6 z-20 text-right">
        <h1 className="text-pink-400 font-mono text-lg font-bold mb-1 animate-pulse">SYNTHWAVE.HORIZON</h1>
        <p className="text-cyan-400 text-sm font-mono">Retro Future Drive</p>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 space-y-8 relative">
        {/* Retro Title with Chromatic Aberration Effect */}
        <div className="relative space-y-4">
          <div className="relative inline-block">
            {/* Chromatic aberration layers */}
            <h1 className="absolute text-6xl md:text-8xl font-bold font-mono text-red-500 opacity-80"
                style={{ transform: 'translate(-2px, -2px)' }}>
              {retroText}
            </h1>
            <h1 className="absolute text-6xl md:text-8xl font-bold font-mono text-blue-500 opacity-80"
                style={{ transform: 'translate(2px, 2px)' }}>
              {retroText}
            </h1>
            <h1 className="relative text-6xl md:text-8xl font-bold font-mono text-white animate-pulse">
              {retroText}
            </h1>
          </div>
          
          <div className="text-pink-400 text-xl font-mono tracking-[0.5em] animate-pulse">
            NEON.DREAMS.1985
          </div>
        </div>

        {/* Synthesizer Visualizer */}
        <div className="w-96 mx-auto space-y-6">
          {/* Audio Bars */}
          <div className="flex items-end justify-center space-x-1 h-20 bg-black/50 border-2 border-pink-500/30 rounded-lg p-2">
            {synthBars.map((height, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-pink-500 via-purple-500 to-cyan-500 transition-all duration-150 rounded-sm"
                style={{
                  width: '16px',
                  height: `${height}%`,
                  filter: `hue-rotate(${i * 30}deg)`,
                  boxShadow: `0 0 10px ${i % 2 ? '#ff00ff' : '#00ffff'}`
                }}
              />
            ))}
          </div>

          {/* VHS-style Loading Bar */}
          <div className="relative bg-gray-900 h-8 border-2 border-pink-500 overflow-hidden rounded-none">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-100 relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* VHS static lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 1px,
                  rgba(255,255,255,0.1) 1px,
                  rgba(255,255,255,0.1) 2px
                )`
              }} />
              {/* Scan line */}
              <div className="absolute top-0 right-0 w-1 h-full bg-white animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-between text-sm font-mono text-green-400">
            <span className="animate-pulse">LOADING_RETRO.DAT</span>
            <span className="text-pink-400 animate-pulse">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Retro Car Dashboard */}
        <div className="bg-black/80 border-2 border-cyan-400 p-4 w-80 mx-auto text-left text-sm font-mono rounded-none">
          <div className="text-cyan-400 space-y-1">
            <div className="flex justify-between">
              <span>SPEED:</span>
              <span className="text-pink-400">{Math.floor(progress * 1.2)} MPH</span>
            </div>
            <div className="flex justify-between">
              <span>FUEL:</span>
              <span className="text-yellow-400">∞ NEON</span>
            </div>
            <div className="flex justify-between">
              <span>RADIO:</span>
              <span className="text-purple-400 animate-pulse">SYNTHWAVE FM</span>
            </div>
            <div className="text-pink-400 animate-pulse mt-2 text-center">
              ♪ CRUISING THE DIGITAL HIGHWAY ♪
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-2 text-sm font-mono">
          <div className="text-pink-400 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping" />
            Neon core: PULSING
          </div>
          <div className="text-cyan-400 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            Synth engine: ACTIVE
          </div>
          <div className="text-purple-400 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            Time warp: 1985 LOCKED
          </div>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute border-2 animate-pulse"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              borderColor: i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#ffff00',
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      {/* Ambient Neon Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default RetroLoader;
