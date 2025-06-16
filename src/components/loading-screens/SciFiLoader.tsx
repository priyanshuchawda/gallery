
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const SciFiLoader = () => {
  const [progress, setProgress] = useState(0);
  const [scanningText, setScanningText] = useState("INITIATING WARP DRIVE");
  const [starField, setStarField] = useState<Array<{ x: number; y: number; speed: number }>>([]);
  const [portalRotation, setPortalRotation] = useState(0);

  const scanTexts = [
    "INITIATING WARP DRIVE",
    "SCANNING STELLAR COORDINATES", 
    "OPENING QUANTUM GATEWAY",
    "SYNCHRONIZING HYPERSPACE",
    "PORTAL STABILIZATION",
    "READY FOR INTERSTELLAR JUMP"
  ];

  useEffect(() => {
    // Initialize star field
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 2 + 1
    }));
    setStarField(stars);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 4 + 1, 100));
    }, 250);

    const textInterval = setInterval(() => {
      setScanningText(scanTexts[Math.floor(Math.random() * scanTexts.length)]);
    }, 1000);

    const rotationInterval = setInterval(() => {
      setPortalRotation(prev => (prev + 2) % 360);
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearInterval(rotationInterval);
    };
  }, []);

  const reset = () => {
    setProgress(0);
    setScanningText("INITIATING WARP DRIVE");
    setPortalRotation(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black relative overflow-hidden flex items-center justify-center">
      {/* Animated Star Field */}
      <div className="absolute inset-0">
        {starField.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>

      {/* Nebula Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-400/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Controls */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-black/50 border-blue-400/50 text-blue-300 hover:bg-blue-500/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Galaxy
            </Button>
          </Link>
          <Button onClick={reset} variant="outline" size="sm" className="bg-black/50 border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/20">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-6 right-6 z-20 text-right">
        <h1 className="text-blue-300 font-mono text-lg font-bold mb-1">STELLAR.GATEWAY</h1>
        <p className="text-indigo-300 text-sm">Interstellar Portal System</p>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 space-y-12">
        {/* Rotating Portal */}
        <div className="relative w-48 h-48 mx-auto">
          {/* Outer Ring */}
          <div 
            className="absolute inset-0 border-4 border-blue-400/60 rounded-full animate-spin"
            style={{ animationDuration: '8s' }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-3 h-6 bg-blue-400 rounded-full" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-3 h-6 bg-cyan-400 rounded-full" />
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-6 h-3 bg-indigo-400 rounded-full" />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-6 h-3 bg-purple-400 rounded-full" />
          </div>
          
          {/* Middle Ring */}
          <div 
            className="absolute inset-8 border-2 border-purple-400/40 rounded-full animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '6s' }}
          />
          
          {/* Inner Core */}
          <div className="absolute inset-16 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-pulse">
            <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
          </div>

          {/* Energy Beams */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{ transform: `rotate(${portalRotation}deg)` }}
          >
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent" />
          </div>
        </div>

        {/* Scanning Text */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-pulse">
            {scanningText}
          </h2>
        </div>

        {/* Hyperspace Loading Bar */}
        <div className="w-96 mx-auto space-y-4">
          <div className="relative bg-gray-900/50 h-4 rounded-full overflow-hidden border border-blue-400/30">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 transition-all duration-300 relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-1 bg-white/50 animate-pulse" />
            </div>
            {/* Energy Surge */}
            <div 
              className="absolute top-0 w-2 h-full bg-white shadow-lg shadow-white/50 transition-all duration-300"
              style={{ left: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-blue-300 font-mono">
            <span>HYPERSPACE CALIBRATION</span>
            <span className="text-cyan-300 font-bold">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-2 text-sm font-mono">
          <div className="text-green-400 opacity-80 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Warp core: ONLINE
          </div>
          <div className="text-blue-400 opacity-60 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            Navigation: LOCKED
          </div>
          <div className="text-purple-400 opacity-40 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            Shields: ACTIVE
          </div>
        </div>
      </div>

      {/* Warp Speed Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent animate-pulse"
            style={{
              left: `${5 + i * 4.5}%`,
              top: '0%',
              height: '100%',
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SciFiLoader;
