import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Play, Globe, Atom, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import ParticleBackground from "@/components/ui/particle-background";
import { EINSTEIN_QUOTES } from "@/lib/constants";
import einsteinImage from "@assets/e15.jpg";
import einsteinImage2 from "@assets/e4.jpg";
import einsteinImage3 from "@assets/e11.webp";
import einsteinImage4 from "@assets/e2.jpg";
// Background space images
import spaceBg1 from "@assets/r1.webp";
import spaceBg2 from "@assets/r10.jpg";
import spaceBg3 from "@assets/r25.jpg";
import spaceBg4 from "@assets/r27.jpg";

const slides = [
  {
    title: "Kaun Banega Einstein?",
    subtitle: "International Young Scientist Competition",
    description: "Join thousands of brilliant minds from 50+ countries in the ultimate scientific challenge. Follow Einstein's legacy and discover the universe's greatest mysteries.",
    image: einsteinImage,
    backgroundImage: spaceBg1,
    quote: EINSTEIN_QUOTES[0],
    cta: "Begin Your Einstein Journey",
    theme: "einstein"
  },
  {
    title: "Explore Space & Science",
    subtitle: "ISRO & NASA Tour Winners",
    description: "Win exclusive opportunities to visit the world's most advanced space centers. Experience zero-gravity simulators, meet astronauts, and see rocket launches up close.",
    image: einsteinImage2,
    backgroundImage: spaceBg2,
    quote: EINSTEIN_QUOTES[1],
    cta: "Discover Space Missions",
    theme: "space"
  },
  {
    title: "International Recognition",
    subtitle: "Global Scientific Excellence",
    description: "Compete with the world's brightest young scientists. Win prestigious awards, international scholarships, and recognition from renowned scientific institutions.",
    image: einsteinImage3,
    backgroundImage: spaceBg3,
    quote: EINSTEIN_QUOTES[2],
    cta: "Join Global Competition",
    theme: "global"
  },
  {
    title: "Future Scientists & Innovators",
    subtitle: "Einstein's Legacy Continues",
    description: "Advanced scientific equipment, Einstein medals, and mentorship from leading researchers. Your future in science starts with one bold step today.",
    image: einsteinImage4,
    backgroundImage: spaceBg4,
    quote: "The important thing is not to stop questioning. Curiosity has its own reason for existence.",
    cta: "Start Your Journey",
    theme: "future"
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Increased to 6 seconds for better UX
    return () => clearInterval(timer);
  }, []);

  const changeSlide = (newIndex: number) => {
    if (newIndex !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(newIndex);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const nextSlide = () => {
    changeSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    changeSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative overflow-hidden pt-16 min-h-screen flex items-center" 
      data-testid="hero-slider"
    >
      {/* Background Images with Smooth Transition */}
      {slides.map((slideItem, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${slideItem.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}
      
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20" />
      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content with Slide Animation */}
          <div className={`text-white transform transition-all duration-1000 ease-out ${
            isTransitioning ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
          }`}>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg" data-testid="text-hero-title">
              {slide.title.split(' ').map((word, index) => (
                <span key={index} className={word === 'Einstein?' ? 'text-amber-300' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-slate-100 drop-shadow-md" data-testid="text-hero-subtitle">
              {slide.subtitle}
            </h2>
            <p className="text-xl mb-8 text-slate-200 drop-shadow-md" data-testid="text-hero-description">
              {slide.description}
            </p>
            
            {/* Einstein Quote */}
            <div className="bg-white/15 backdrop-blur-md rounded-lg p-6 mb-8 border border-white/20 shadow-xl">
              <blockquote className="text-lg italic text-slate-100 drop-shadow-sm" data-testid="text-hero-quote">
                "{typeof slide.quote === 'string' ? slide.quote : slide.quote.quote}"
              </blockquote>
              <cite className="text-sm text-slate-300 mt-3 block drop-shadow-sm" data-testid="text-hero-quote-author">
                - {typeof slide.quote === 'string' ? 'Albert Einstein' : slide.quote.author}
              </cite>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/einstein-quest/exams">
                <Button 
                  size="lg" 
                  className="bg-white text-slate-800 hover:bg-gray-100 font-semibold text-lg transform hover:scale-105 transition-all shadow-lg"
                  data-testid="button-start-journey"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  {slide.cta}
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-slate-800 font-semibold text-lg shadow-lg"
                data-testid="button-watch-demo"
              >
                <Play className="mr-2 h-5 w-5" />
                Explore Gallery
              </Button>
            </div>
          </div>
          
          {/* Image with Slide Animation */}
          <div className={`relative transform transition-all duration-1000 ease-out ${
            isTransitioning ? 'translate-x-8 opacity-0 scale-95' : 'translate-x-0 opacity-100 scale-100'
          }`}>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
              <img 
                src={slide.image}
                alt={`Slide ${currentSlide + 1} - ${slide.theme} theme`}
                className="w-full max-w-md mx-auto animate-float rounded-2xl shadow-xl transition-all duration-1000"
                data-testid={`img-hero-slide-${currentSlide}`}
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-300" />
            </div>
            <ThreeDElements />
          </div>
        </div>
        
        {/* Slider Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8"
            data-testid="button-slide-prev"
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex space-x-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125 shadow-sm' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                data-testid={`button-slide-indicator-${index}`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8"
            data-testid="button-slide-next"
            disabled={isTransitioning}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Slide Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-6000 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>
        
        {/* Slide Information */}
        <div className="absolute top-24 right-8 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
          <div className="text-white text-sm">
            <span className="font-semibold">Slide {currentSlide + 1}</span> of {slides.length}
          </div>
          <div className="text-white/70 text-xs capitalize">{slide.theme} Theme</div>
        </div>
      </div>
    </section>
  );
}
