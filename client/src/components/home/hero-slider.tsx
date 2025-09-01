import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Play, Globe, Atom, ArrowRight, Star, Award } from "lucide-react";
import { Link } from "wouter";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
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
    id: 1,
    title: "Kaun Banega Einstein?",
    subtitle: "International Young Scientist Competition",
    description: "Join thousands of brilliant minds from 50+ countries in the ultimate scientific challenge. Follow Einstein's legacy and discover the universe's greatest mysteries.",
    image: einsteinImage,
    backgroundImage: spaceBg1,
    quote: EINSTEIN_QUOTES[0],
    cta: "Begin Your Einstein Journey",
    theme: "einstein",
    color: "from-blue-600 to-purple-600",
    icon: Atom,
    stats: [
      { label: "Countries", value: "50+" },
      { label: "Participants", value: "10,000+" },
      { label: "Winners", value: "300+" }
    ]
  },
  {
    id: 2,
    title: "Explore Space & Science",
    subtitle: "ISRO & NASA Tour Winners",
    description: "Win exclusive opportunities to visit the world's most advanced space centers. Experience zero-gravity simulators, meet astronauts, and see rocket launches up close.",
    image: einsteinImage2,
    backgroundImage: spaceBg2,
    quote: EINSTEIN_QUOTES[1],
    cta: "Discover Space Missions",
    theme: "space",
    color: "from-indigo-600 to-blue-600",
    icon: Rocket,
    stats: [
      { label: "ISRO Tours", value: "18" },
      { label: "NASA Tours", value: "9" },
      { label: "Days", value: "7" }
    ]
  },
  {
    id: 3,
    title: "International Recognition",
    subtitle: "Global Scientific Excellence",
    description: "Compete with the world's brightest young scientists. Win prestigious awards, international scholarships, and recognition from renowned scientific institutions.",
    image: einsteinImage3,
    backgroundImage: spaceBg3,
    quote: EINSTEIN_QUOTES[2],
    cta: "Join Global Competition",
    theme: "global",
    color: "from-purple-600 to-pink-600",
    icon: Globe,
    stats: [
      { label: "Awards", value: "₹10L+" },
      { label: "Medals", value: "Gold" },
      { label: "Recognition", value: "Global" }
    ]
  },
  {
    id: 4,
    title: "Future Scientists & Innovators",
    subtitle: "Einstein's Legacy Continues",
    description: "Advanced scientific equipment, Einstein medals, and mentorship from leading researchers. Your future in science starts with one bold step today.",
    image: einsteinImage4,
    backgroundImage: spaceBg4,
    quote: "The important thing is not to stop questioning. Curiosity has its own reason for existence.",
    cta: "Start Your Journey",
    theme: "future",
    color: "from-amber-600 to-orange-600",
    icon: Star,
    stats: [
      { label: "Levels", value: "3" },
      { label: "Centers", value: "100+" },
      { label: "Success", value: "98%" }
    ]
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType>();

  return (
    <section className="relative overflow-hidden min-h-screen pt-14 md:pt-14 md:pb-28" data-testid="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        parallax={true}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          el: '.swiper-pagination-custom',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet" data-index="${index}"></span>`;
          },
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1200}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.realIndex);
        }}
        className="h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            {/* Background with Parallax */}
            <div
              className="absolute inset-0  swiper-parallax-bg"
              data-swiper-parallax="-23%"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%), url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-20`} />
            
            {/* Animated Particles */}
            <div className="absolute  inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-60" />
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-400 rounded-full animate-ping opacity-80" />
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-70" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center pt-16 sm:pt-16 pb-20 sm:pb-24">
              <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
                  {/* Left Content */}
                  <div className="lg:col-span-7 space-y-3 sm:space-y-6 lg:space-y-8 text-center lg:text-left" data-swiper-parallax="-400">
                    {/* Theme Badge */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                      <Badge className={`bg-gradient-to-r ${slide.color} text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold`}>
                        <slide.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        {slide.theme.charAt(0).toUpperCase() + slide.theme.slice(1)} Theme
                      </Badge>
                      <div className="flex items-center space-x-2 text-white/80">
                        <span className="w-6 sm:w-8 h-px bg-white/60"></span>
                        <span className="text-xs sm:text-sm font-medium">Slide {index + 1} of {slides.length}</span>
                      </div>
                    </div>

                    {/* Main Title */}
                    <div className="space-y-1 sm:space-y-3 lg:space-y-4">
                      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
                        {slide.title.split(' ').map((word, wordIndex) => (
                          <span
                            key={wordIndex}
                            className={`inline-block ${
                              word === 'Einstein?' ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300' : ''
                            }`}
                            style={{
                              animationDelay: `${wordIndex * 0.1}s`
                            }}
                          >
                            {word}{' '}
                          </span>
                        ))}
                      </h1>
                      <h2 className="text-xs sm:text-xl md:text-2xl lg:text-3xl font-semibold text-blue-100">
                        {slide.subtitle}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-base lg:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      {slide.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-xs sm:max-w-md mx-auto lg:mx-0">
                      {slide.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className="text-base sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-300">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Einstein Quote */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20 max-w-2xl mx-auto lg:mx-0">
                      <blockquote className="text-xs sm:text-base lg:text-lg italic text-white mb-1 sm:mb-3">
                        "{typeof slide.quote === 'string' ? slide.quote : slide.quote.quote}"
                      </blockquote>
                      <cite className="text-xs sm:text-sm text-gray-300 font-medium">
                        — {typeof slide.quote === 'string' ? 'Albert Einstein' : slide.quote.author}
                      </cite>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-1 sm:pt-4 justify-center lg:justify-start">
                      <Link href="/exams">
                        <Button 
                          size="lg" 
                          className={`bg-gradient-to-r ${slide.color} hover:scale-105 text-white font-semibold text-xs sm:text-base lg:text-lg px-4 py-2 sm:px-8 sm:py-4 rounded-full shadow-xl transition-all duration-300 w-full sm:w-auto`}
                        >
                          <Rocket className="mr-1 sm:mr-2 h-3 w-3 sm:h-5 sm:w-5" />
                          {slide.cta}
                        </Button>
                      </Link>
                      <Link href="/gallery">
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-semibold text-xs sm:text-base lg:text-lg px-4 py-2 sm:px-8 sm:py-4 rounded-full transition-all duration-300 w-full sm:w-auto"
                        >
                          <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-5 sm:w-5" />
                          Explore Gallery
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="lg:col-span-5 order-first lg:order-last mt-2 mb-3 sm:mt-0 sm:mb-0" data-swiper-parallax="-200">
                    <div className="relative max-w-48 sm:max-w-sm mx-auto lg:max-w-none">
                      {/* Main Image Container */}
                      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 border border-white/20 shadow-2xl">
                        {/* Decorative Elements */}
                        <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse" />
                        
                        {/* Einstein Image */}
                        <img 
                          src={slide.image}
                          alt={`${slide.theme} - Einstein Legacy`}
                          className="w-full rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Floating Badge */}
                        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/30 backdrop-blur-md rounded-full px-2 py-1 sm:px-4 sm:py-2">
                          <span className="text-white text-xs sm:text-sm font-medium">Einstein Legacy</span>
                        </div>
                      </div>

                      {/* Orbit Elements - Hide on small screens */}
                      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 lg:w-96 h-72 lg:h-96 pointer-events-none">
                        <div className="absolute top-0 left-1/2 w-3 h-3 lg:w-4 lg:h-4 bg-amber-400 rounded-full animate-spin origin-bottom" style={{ animationDuration: '20s' }} />
                        <div className="absolute bottom-0 right-1/2 w-2 h-2 lg:w-3 lg:h-3 bg-blue-400 rounded-full animate-spin origin-top" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-4 sm:space-x-6" >
          <button className="swiper-button-prev-custom w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
          </button>
          
          <div className="swiper-pagination-custom flex space-x-1.5 sm:space-x-2"></div>
          
          <button className="swiper-button-next-custom w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-black/20 z-10">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 transition-all duration-1000 shadow-lg"
            style={{
              width: `${((activeSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>
      </Swiper>

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-bullet {
          width: 10px !important;
          height: 10px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          border-radius: 50% !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        .custom-bullet.swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.3) !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
        }
        @media (min-width: 640px) {
          .custom-bullet {
            width: 12px !important;
            height: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
