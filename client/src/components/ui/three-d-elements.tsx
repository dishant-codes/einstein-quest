interface ThreeDElementsProps {
  className?: string;
}

export default function ThreeDElements({ className = "" }: ThreeDElementsProps) {
  return (
    <div className={`absolute inset-0 ${className}`} data-testid="three-d-elements">
      {/* Floating 3D geometric shapes */}
      <div 
        className="absolute w-20 h-20 bg-kbe-amber rounded-full opacity-80 animate-bounce-slow"
        style={{ top: '10%', right: '10%' }}
        data-testid="shape-amber-circle"
      />
      <div 
        className="absolute w-16 h-16 bg-kbe-emerald rounded-full opacity-70 animate-pulse-slow"
        style={{ bottom: '20%', left: '5%' }}
        data-testid="shape-emerald-circle"
      />
      <div 
        className="absolute w-12 h-12 bg-kbe-orange rounded-full opacity-60 animate-float"
        style={{ top: '50%', right: '8%' }}
        data-testid="shape-orange-circle"
      />
      <div 
        className="absolute w-14 h-14 bg-kbe-purple/30 rounded-lg rotate-45 animate-pulse-slow"
        style={{ top: '30%', left: '15%' }}
        data-testid="shape-purple-square"
      />
      <div 
        className="absolute w-10 h-10 bg-kbe-blue/40 rounded-full animate-bounce-slow"
        style={{ bottom: '40%', right: '25%' }}
        data-testid="shape-blue-circle"
      />
    </div>
  );
}
