import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface ParticleBackgroundProps {
  count?: number;
  className?: string;
}

export default function ParticleBackground({ count = 20, className = "" }: ParticleBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6,
      });
    }
    setParticles(newParticles);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} data-testid="particle-background">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size * 4}px`,
            height: `${particle.size * 4}px`,
            animationDelay: `${particle.delay}s`,
          }}
          data-testid={`particle-${particle.id}`}
        />
      ))}
    </div>
  );
}
