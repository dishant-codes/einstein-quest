import { useState, useEffect } from "react";
import { EINSTEIN_QUOTES } from "@/lib/constants";

export default function QuoteSection() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % EINSTEIN_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const quote = EINSTEIN_QUOTES[currentQuote];

  return (
    <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden" data-testid="quote-section">
      <div className="absolute inset-0 opacity-10">
        <div className="text-6xl font-light transform rotate-12 absolute top-10 left-10">E=mc²</div>
        <div className="text-4xl font-light transform -rotate-12 absolute bottom-20 right-20">∞</div>
        <div className="text-5xl font-light transform rotate-45 absolute top-1/2 left-1/3">π</div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/1/14/Albert_Einstein_1947.jpg"
          alt="Einstein Portrait"
          className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white shadow-lg object-cover"
          data-testid="img-einstein-portrait"
        />
        
        <blockquote className="text-3xl md:text-4xl font-light mb-8 leading-relaxed transition-all duration-500" data-testid="text-einstein-quote">
          "{quote.quote}"
        </blockquote>
        
        <cite className="text-xl font-medium" data-testid="text-einstein-quote-author">
          - {quote.author}
        </cite>
        
        {/* Quote indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {EINSTEIN_QUOTES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentQuote ? 'bg-white' : 'bg-white/50'
              }`}
              data-testid={`button-quote-indicator-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
