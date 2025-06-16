
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const CyberpunkLoader = () => {
  const [progress, setProgress] = useState(0);
  const [neuralActivity, setNeuralActivity] = useState<Array<{ id: number; active: boolean; intensity: number }>>([]);
  const [codeStream, setCodeStream] = useState<string[]>([]);
  const [brainWave, setBrainWave] = useState(0);
  const [synapseFlash, setSynapseFlash] = useState<number[]>([]);

  const codeChunks = [
    "class Consciousness {",
    "  neural_pathways: Array<Synapse>",
    "  quantum_state: QubitMatrix",
    "  void awaken() {",
    "    consciousness.initialize()",
    "    neural_network.activate()",
    "    perception.enhance()",
    "    reality.augment()",
    "  }",
    "}"
  ];

  useEffect(() => {
    // Initialize neural network nodes
    const nodes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      active: Math.random() > 0.7,
      intensity: Math.random()
    }));
    setNeuralActivity(nodes);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 3 + 1, 100));
    }, 300);

    const neuralInterval = setInterval(() => {
      setNeuralActivity(prev => 
        prev.map(node => ({
          ...node,
          active: Math.random() > 0.6,
          intensity: Math.random()
        }))
      );
    }, 150);

    const codeInterval = setInterval(() => {
      setCodeStream(prev => {
        const newStream = [...prev];
        if (newStream.length > 8) newStream.shift();
        newStream.push(codeChunks[Math.floor(Math.random() * codeChunks.length)]);
        return newStream;
      });
    }, 800);

    const brainWaveInterval = setInterval(() => {
      setBrainWave(prev => (prev + 5) % 360);
    }, 50);

    const synapseInterval = setInterval(() => {
      setSynapseFlash([Math.random() * 50, Math.random() * 50, Math.random() * 50]);
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(neuralInterval);
      clearInterval(codeInterval);
      clearInterval(brainWaveInterval);
      clearInterval(synapseInterval);
    };
  }, []);

  const reset = () => {
    setProgress(0);
    setCodeStream([]);
    setBrainWave(0);
    setSynapseFlash([]);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Digital Rain Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse opacity-30"
            style={{
              left: `${i * 3.33}%`,
              height: '100%',
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      {/* Neural Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="neuralGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="0.5" fill="#00ff41" opacity="0.3" />
              <path d="M 0 2.5 L 5 2.5 M 2.5 0 L 2.5 5" stroke="#00ff41" strokeWidth="0.1" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#neuralGrid)" />
        </svg>
      </div>

      {/* Controls */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-black/80 border-green-400/50 text-green-300 hover:bg-green-400/20 font-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              MATRIX
            </Button>
          </Link>
          <Button onClick={reset} variant="outline" size="sm" className="bg-black/80 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/20 font-mono">
            <RotateCcw className="w-4 h-4 mr-2" />
            REBOOT
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute top-6 right-6 z-20 text-right">
        <h1 className="text-green-400 font-mono text-lg font-bold mb-1 animate-pulse">NEURAL.SURGE</h1>
        <p className="text-cyan-400 text-sm font-mono">Digital Consciousness</p>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 space-y-12 relative">
        {/* Brain Visualization */}
        <div className="relative w-72 h-72 mx-auto">
          {/* Outer Brain Structure */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280">
            {/* Brain Outline */}
            <path
              d="M 140 40 Q 200 40, 220 100 Q 240 140, 220 180 Q 200 220, 160 230 Q 140 240, 120 230 Q 80 220, 60 180 Q 40 140, 60 100 Q 80 40, 140 40"
              fill="none"
              stroke="#00ff41"
              strokeWidth="2"
              className="animate-pulse"
              opacity="0.6"
            />
            
            {/* Brain Hemispheres Divider */}
            <path
              d="M 140 50 Q 140 140, 140 230"
              stroke="#00ff41"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Neural Pathways */}
            {neuralActivity.map((node, i) => (
              <g key={node.id}>
                <circle
                  cx={70 + (i % 10) * 14}
                  cy={70 + Math.floor(i / 10) * 14}
                  r={node.active ? 2 + node.intensity * 2 : 1}
                  fill={node.active ? "#00ff41" : "#003300"}
                  className={node.active ? "animate-pulse" : ""}
                >
                  <animate
                    attributeName="r"
                    values={node.active ? "1;4;1" : "1;1;1"}
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Neural Connections */}
                {i < neuralActivity.length - 1 && (
                  <line
                    x1={70 + (i % 10) * 14}
                    y1={70 + Math.floor(i / 10) * 14}
                    x2={70 + ((i + 1) % 10) * 14}
                    y2={70 + Math.floor((i + 1) / 10) * 14}
                    stroke="#00ff41"
                    strokeWidth="0.5"
                    opacity={node.active && neuralActivity[i + 1]?.active ? 0.8 : 0.2}
                    className="animate-pulse"
                  />
                )}
              </g>
            ))}

            {/* Synapse Flashes */}
            {synapseFlash.map((flash, i) => (
              <circle
                key={i}
                cx={70 + (flash % 10) * 14}
                cy={70 + Math.floor(flash / 10) * 14}
                r="6"
                fill="none"
                stroke="#00ffff"
                strokeWidth="2"
                opacity="0.8"
              >
                <animate attributeName="r" values="6;12;6" dur="0.5s" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="0.5s" />
              </circle>
            ))}
          </svg>

          {/* Central Processor */}
          <div className="absolute inset-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse" />
            <div className="absolute inset-1 bg-black rounded-full" />
            <div className="absolute inset-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-ping" />
          </div>
        </div>

        {/* Neural Status Display */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 animate-pulse font-mono">
            AWAKENING
          </h2>
          <div className="text-green-400 text-xl font-mono tracking-wider animate-pulse">
            DIGITAL_CONSCIOUSNESS.EXE
          </div>
        </div>

        {/* Neural Loading Bar */}
        <div className="w-96 mx-auto space-y-6">
          {/* Brain Wave Visualization */}
          <div className="h-16 bg-black/50 border border-green-400/30 rounded-lg p-2 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 60">
              <path
                d={`M 0 30 ${Array.from({ length: 50 }, (_, i) => 
                  `L ${i * 8} ${30 + Math.sin((i + brainWave) * 0.2) * 15 + Math.sin((i + brainWave) * 0.1) * 8}`
                ).join(' ')}`}
                fill="none"
                stroke="#00ff41"
                strokeWidth="2"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Progress Bar */}
          <div className="relative bg-gray-900/80 h-6 rounded-full overflow-hidden border-2 border-green-400/30">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 transition-all duration-300 relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-1 bg-white/60 animate-pulse" />
            </div>
            <div 
              className="absolute top-0 w-1 h-full bg-white shadow-lg shadow-white/50 transition-all duration-300"
              style={{ left: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm font-mono">
            <span className="text-green-400 animate-pulse">NEURAL_SURGE.INIT</span>
            <span className="text-cyan-400 font-bold">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Code Stream */}
        <div className="bg-black/90 border border-green-400/50 p-4 w-80 mx-auto text-left text-sm font-mono rounded-lg">
          <div className="text-green-400 space-y-1 h-32 overflow-hidden">
            <div className="text-cyan-400 mb-2">&gt; Initializing consciousness...</div>
            {codeStream.map((line, i) => (
              <div key={i} className="opacity-80 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                {line}
              </div>
            ))}
            <div className="text-yellow-400 animate-pulse mt-2">
              &gt; Neural pathways: {neuralActivity.filter(n => n.active).length}/50 active
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-2 text-sm font-mono">
          <div className="text-green-400 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            Synapses firing: OPTIMAL
          </div>
          <div className="text-cyan-400 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            Memory banks: EXPANDING
          </div>
          <div className="text-blue-400 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            Consciousness level: {Math.floor(progress)}%
          </div>
        </div>
      </div>

      {/* Ambient Digital Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-400/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-400/10 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default CyberpunkLoader;
