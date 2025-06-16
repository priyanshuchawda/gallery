
import { useState, useEffect, useRef } from "react";

interface InteractiveLoaderProps {
  type: 'cyberpunk' | 'oceanic' | 'retro';
  children: React.ReactNode;
}

const InteractiveLoader = ({ type, children }: InteractiveLoaderProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });

      // Add ripples for oceanic theme
      if (type === 'oceanic' && Math.random() > 0.8) {
        setRipples(prev => [...prev.slice(-5), { 
          id: Date.now(), 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        }]);
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (type === 'oceanic' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setRipples(prev => [...prev.slice(-10), { 
        id: Date.now(), 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      }]);
    }
  };

  // Clean up old ripples
  useEffect(() => {
    const cleanup = setInterval(() => {
      setRipples(prev => prev.slice(-5));
    }, 2000);
    return () => clearInterval(cleanup);
  }, []);

  const getInteractiveStyles = () => {
    switch (type) {
      case 'cyberpunk':
        return {
          filter: isHovered ? 'hue-rotate(30deg) saturate(1.5)' : 'none',
          transition: 'filter 0.3s ease'
        };
      case 'retro':
        return {
          filter: isHovered ? 'contrast(1.2) brightness(1.1)' : 'none',
          transition: 'filter 0.3s ease'
        };
      case 'oceanic':
        return {
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        };
      default:
        return {};
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={getInteractiveStyles()}
    >
      {children}

      {/* Cyberpunk glitch effect */}
      {type === 'cyberpunk' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-1 h-full bg-pink-500 opacity-50 animate-pulse"
            style={{ left: `${mousePos.x}%` }}
          />
          <div 
            className="absolute w-full h-1 bg-cyan-400 opacity-50 animate-pulse"
            style={{ top: `${mousePos.y}%` }}
          />
        </div>
      )}

      {/* Oceanic ripples */}
      {type === 'oceanic' && ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{ left: ripple.x, top: ripple.y }}
        >
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-0 h-0 border-2 border-cyan-400 rounded-full animate-ping opacity-60"
                 style={{ 
                   animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                   animationFillMode: 'forwards'
                 }} />
          </div>
        </div>
      ))}

      {/* Retro scan lines */}
      {type === 'retro' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-full h-2 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent animate-pulse"
            style={{ 
              top: `${mousePos.y}%`,
              transform: 'translateY(-50%)'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveLoader;
