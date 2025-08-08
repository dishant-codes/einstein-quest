import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Rocket, Play } from "lucide-react";
import { Link } from "wouter";
import ParticleBackground from "@/components/ui/particle-background";
import ThreeDElements from "@/components/ui/three-d-elements";
import { EINSTEIN_QUOTES } from "@/lib/constants";

const slides = [
  {
    title: "Kaun Banega Einstein?",
    subtitle: "Young Scientist Competition",
    description: "Inspire young minds to explore the wonders of science and research through our exciting competition platform.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    quote: EINSTEIN_QUOTES[0],
  },
  {
    title: "Discover Your Scientific Potential",
    subtitle: "Three Levels of Excellence",
    description: "From Grade I to Grade III, challenge yourself and win amazing prizes including ISRO tours and scientific equipment.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    quote: EINSTEIN_QUOTES[1],
  },
  {
    title: "Join the Future Scientists",
    subtitle: "Be Part of Something Greater",
    description: "Connect with like-minded young scientists and researchers. Your journey to becoming the next Einstein starts here.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    quote: EINSTEIN_QUOTES[2],
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="hero-bg relative overflow-hidden pt-16 min-h-screen flex items-center" data-testid="hero-slider">
      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
              {slide.title.split(' ').map((word, index) => (
                <span key={index} className={word === 'Einstein?' ? 'text-kbe-orange' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-blue-100" data-testid="text-hero-subtitle">
              {slide.subtitle}
            </h2>
            <p className="text-xl mb-8 text-blue-100" data-testid="text-hero-description">
              {slide.description}
            </p>
            
            {/* Einstein Quote */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8">
              <blockquote className="text-lg italic text-blue-50" data-testid="text-hero-quote">
                "{slide.quote.quote}"
              </blockquote>
              <cite className="text-sm text-blue-200 mt-2 block" data-testid="text-hero-quote-author">
                - {slide.quote.author}
              </cite>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/exams">
                <Button 
                  size="lg" 
                  className="bg-kbe-orange text-white hover:bg-orange-600 font-semibold text-lg transform hover:scale-105 transition-all"
                  data-testid="button-start-journey"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-kbe-purple font-semibold text-lg"
                data-testid="button-watch-demo"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={slide.image}
              alt={`Slide ${currentSlide + 1} - Einstein inspired character`}
              className="w-full max-w-md mx-auto animate-float rounded-3xl shadow-2xl"
              data-testid={`img-hero-slide-${currentSlide}`}
            />
            <ThreeDElements />
          </div>
        </div>
        
        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="text-white hover:bg-white/20"
            data-testid="button-slide-prev"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                data-testid={`button-slide-indicator-${index}`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="text-white hover:bg-white/20"
            data-testid="button-slide-next"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
