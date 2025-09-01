import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  Filter, 
  X, 
  Atom, 
  Trophy, 
  Rocket, 
  Medal, 
  Star, 
  Users, 
  Globe, 
  Camera,
  Award,
  BookOpen,
  Target,
  Zap
} from "lucide-react";

// Import images from Website Data folder
import kbeCompetition from "/Website Data/KBE-I.png";
import isroTour1 from "/Website Data/Nashik to ISRO 1.png";
import isroTour2 from "/Website Data/Nashik to ISRO 2.png";
import nasaTour1 from "/Website Data/Nashik to NASA 1.png";
import nasaTour2 from "/Website Data/Nashik to Nasa 2.png";

// Einstein & Space images from the folder
import einsteinImg1 from "/Website Data/einstein & space images/e2.jpg";
import einsteinImg2 from "/Website Data/einstein & space images/e4.jpg";
import einsteinImg3 from "/Website Data/einstein & space images/e6.jpg";
import einsteinImg4 from "/Website Data/einstein & space images/e7.jpg";
import einsteinImg5 from "/Website Data/einstein & space images/e9.jpg";
import einsteinImg6 from "/Website Data/einstein & space images/e10.jpg";
import einsteinImg7 from "/Website Data/einstein & space images/e11.webp";
import einsteinImg8 from "/Website Data/einstein & space images/e15.jpg";
import einsteinImg9 from "/Website Data/einstein & space images/e16.jpg";
import einsteinImg10 from "/Website Data/einstein & space images/e17.jpg";
import einsteinImg11 from "/Website Data/einstein & space images/e18.jpg";
import einsteinImg12 from "/Website Data/einstein & space images/e20.jpg";

import spaceImg1 from "/Website Data/einstein & space images/r1.webp";
import spaceImg2 from "/Website Data/einstein & space images/r2.jpeg.jpg";
import spaceImg3 from "/Website Data/einstein & space images/r3.jpg";
import spaceImg4 from "/Website Data/einstein & space images/r4.jpg";
import spaceImg5 from "/Website Data/einstein & space images/r5.jpg";
import spaceImg6 from "/Website Data/einstein & space images/r6.jpeg.jpg";
import spaceImg7 from "/Website Data/einstein & space images/r7.webp";
import spaceImg8 from "/Website Data/einstein & space images/r8.png";
import spaceImg9 from "/Website Data/einstein & space images/r9.jpg";
import spaceImg10 from "/Website Data/einstein & space images/r10.jpg";
import spaceImg11 from "/Website Data/einstein & space images/r11.jpg";
import spaceImg12 from "/Website Data/einstein & space images/r13.jpg";
import spaceImg13 from "/Website Data/einstein & space images/r15.jpg";
import spaceImg14 from "/Website Data/einstein & space images/r16.webp";
import spaceImg15 from "/Website Data/einstein & space images/r17.jpg";
import spaceImg16 from "/Website Data/einstein & space images/r18.jpg";
import spaceImg17 from "/Website Data/einstein & space images/r19.jpeg.jpg";
import spaceImg18 from "/Website Data/einstein & space images/r23.webp";
import spaceImg19 from "/Website Data/einstein & space images/r24.webp";
import spaceImg20 from "/Website Data/einstein & space images/r25.jpg";
import spaceImg21 from "/Website Data/einstein & space images/r26.jpg";
import spaceImg22 from "/Website Data/einstein & space images/r27.jpg";
import spaceImg23 from "/Website Data/einstein & space images/r28.webp";

import nasaImg1 from "/Website Data/einstein & space images/n1.jpg";
import nasaImg2 from "/Website Data/einstein & space images/n2.jpg";

const categories = [
  { id: "all", label: "All Gallery", count: 65, icon: Camera, color: "from-gray-500 to-gray-600" },
  { id: "competitions", label: "KBE Competitions", count: 8, icon: Trophy, color: "from-amber-500 to-amber-600" },
  { id: "space-tours", label: "ISRO & NASA Tours", count: 12, icon: Rocket, color: "from-blue-500 to-blue-600" },
  { id: "einstein-legacy", label: "Einstein Legacy", count: 25, icon: Atom, color: "from-purple-500 to-purple-600" },
  { id: "space-exploration", label: "Space & Universe", count: 20, icon: Globe, color: "from-indigo-500 to-indigo-600" },
];

const galleryStats = [
  { icon: Camera, label: "Total Photos", value: "65+", color: "from-blue-500 to-blue-600" },
  { icon: Trophy, label: "Success Stories", value: "1000+", color: "from-amber-500 to-amber-600" },
  { icon: Rocket, label: "Space Center Visits", value: "50+", color: "from-purple-500 to-purple-600" },
  { icon: Medal, label: "Award Ceremonies", value: "100+", color: "from-green-500 to-green-600" },
];




const galleryImages = [
  // KBE Competitions
  {
    id: 1,
    src: kbeCompetition,
    title: "KBE Competition - Official Event",
    category: "competitions",
    description: "Official KBE Young Scientist Competition showcasing India's brightest young minds in scientific excellence"
  },
  
  // ISRO & NASA Tours
  {
    id: 2,
    src: isroTour1,
    title: "ISRO Educational Tour - Group 1",
    category: "space-tours",
    description: "Students exploring ISRO's cutting-edge space technology and satellite systems during educational visit"
  },
  {
    id: 3,
    src: isroTour2,
    title: "ISRO Educational Tour - Group 2", 
    category: "space-tours",
    description: "KBE winners experiencing world-class space research facilities at ISRO centers"
  },
  {
    id: 4,
    src: nasaTour1,
    title: "NASA Space Center Visit - Team 1",
    category: "space-tours",
    description: "Exclusive NASA facility tour providing insights into international space exploration programs"
  },
  {
    id: 5,
    src: nasaTour2,
    title: "NASA Space Center Visit - Team 2",
    category: "space-tours",
    description: "Students experiencing NASA's advanced space technology and mission control operations"
  },
  {
    id: 6,
    src: nasaImg1,
    title: "NASA Technology Showcase",
    category: "space-tours",
    description: "Advanced space technology demonstrations and interactive learning experiences"
  },
  {
    id: 7,
    src: nasaImg2,
    title: "NASA Mission Control Experience",
    category: "space-tours",
    description: "Behind-the-scenes access to NASA's mission control and space operations"
  },

  // Einstein Legacy Collection
  {
    id: 8,
    src: einsteinImg1,
    title: "Einstein's Scientific Revolution",
    category: "einstein-legacy",
    description: "Celebrating Albert Einstein's groundbreaking contributions to modern physics and scientific thought"
  },
  {
    id: 9,
    src: einsteinImg2,
    title: "Theory of Relativity Visualization",
    category: "einstein-legacy", 
    description: "Visual representation of Einstein's revolutionary theory that changed our understanding of space and time"
  },
  {
    id: 10,
    src: einsteinImg3,
    title: "Einstein's Quantum Legacy",
    category: "einstein-legacy",
    description: "Exploring Einstein's pivotal role in quantum mechanics and photoelectric effect discoveries"
  },
  {
    id: 11,
    src: einsteinImg4,
    title: "Mathematical Genius Portrait",
    category: "einstein-legacy",
    description: "Iconic representation of Einstein's mathematical brilliance and scientific methodology"
  },
  {
    id: 12,
    src: einsteinImg5,
    title: "Einstein's Laboratory Work",
    category: "einstein-legacy",
    description: "Historical glimpse into Einstein's research methods and scientific experimentation"
  },
  {
    id: 13,
    src: einsteinImg6,
    title: "Physics Revolution Timeline",
    category: "einstein-legacy",
    description: "Chronological journey through Einstein's major scientific breakthroughs and discoveries"
  },
  {
    id: 14,
    src: einsteinImg7,
    title: "Einstein's Philosophical Insights",
    category: "einstein-legacy",
    description: "Exploring Einstein's profound philosophical contributions beyond pure scientific research"
  },
  {
    id: 15,
    src: einsteinImg8,
    title: "Nobel Prize Legacy",
    category: "einstein-legacy",
    description: "Commemorating Einstein's Nobel Prize achievement and its lasting impact on science education"
  },
  {
    id: 16,
    src: einsteinImg9,
    title: "Einstein's Educational Philosophy",
    category: "einstein-legacy",
    description: "Understanding Einstein's approach to learning and education that inspires KBE methodology"
  },
  {
    id: 17,
    src: einsteinImg10,
    title: "Scientific Inspiration",
    category: "einstein-legacy",
    description: "How Einstein's curiosity and imagination continue to inspire young scientists worldwide"
  },
  {
    id: 18,
    src: einsteinImg11,
    title: "Einstein's Global Impact",
    category: "einstein-legacy",
    description: "The worldwide influence of Einstein's theories on modern technology and space exploration"
  },
  {
    id: 19,
    src: einsteinImg12,
    title: "Legacy of Innovation",
    category: "einstein-legacy",
    description: "Einstein's enduring influence on contemporary scientific research and discovery"
  },

  // Space & Universe Collection
  {
    id: 20,
    src: spaceImg1,
    title: "Deep Space Exploration",
    category: "space-exploration",
    description: "Stunning deep space imagery showcasing the universe Einstein helped us understand"
  },
  {
    id: 21,
    src: spaceImg2,
    title: "Galactic Phenomena",
    category: "space-exploration",
    description: "Beautiful cosmic phenomena demonstrating principles of relativity and space-time"
  },
  {
    id: 22,
    src: spaceImg3,
    title: "Nebula and Star Formation",
    category: "space-exploration",
    description: "Spectacular nebulae showing stellar birth and cosmic evolution processes"
  },
  {
    id: 23,
    src: spaceImg4,
    title: "Planetary Systems",
    category: "space-exploration",
    description: "Exploring planetary systems and exoplanets in our expanding universe"
  },
  {
    id: 24,
    src: spaceImg5,
    title: "Cosmic Radiation Patterns",
    category: "space-exploration",
    description: "Advanced imaging of cosmic radiation and electromagnetic phenomena in space"
  },
  {
    id: 25,
    src: spaceImg6,
    title: "Satellite Technology",
    category: "space-exploration",
    description: "Modern satellite systems enabling global communication and space research"
  },
  {
    id: 26,
    src: spaceImg7,
    title: "Rocket Launch Dynamics",
    category: "space-exploration",
    description: "Powerful rocket launches demonstrating advanced propulsion technology"
  },
  {
    id: 27,
    src: spaceImg8,
    title: "Space Station Operations",
    category: "space-exploration",
    description: "International space station activities and microgravity research"
  },
  {
    id: 28,
    src: spaceImg9,
    title: "Astronaut Training",
    category: "space-exploration",
    description: "Comprehensive astronaut preparation and space mission training programs"
  },
  {
    id: 29,
    src: spaceImg10,
    title: "Mars Exploration",
    category: "space-exploration",
    description: "Cutting-edge Mars rover missions and planetary exploration technology"
  },
  {
    id: 30,
    src: spaceImg11,
    title: "Solar System Dynamics",
    category: "space-exploration",
    description: "Comprehensive view of our solar system and planetary orbital mechanics"
  },
  {
    id: 31,
    src: spaceImg12,
    title: "Space Telescope Imagery",
    category: "space-exploration",
    description: "Advanced space telescope observations revealing distant galaxies and cosmic structures"
  },
  {
    id: 32,
    src: spaceImg13,
    title: "Cosmic Microwave Background",
    category: "space-exploration",
    description: "Evidence of the Big Bang through cosmic microwave background radiation mapping"
  },
  {
    id: 33,
    src: spaceImg14,
    title: "Black Hole Phenomena",
    category: "space-exploration",
    description: "Visualization of black holes and their effects on surrounding space-time"
  },
  {
    id: 34,
    src: spaceImg15,
    title: "Gravitational Waves",
    category: "space-exploration",
    description: "Detection and visualization of gravitational waves confirming Einstein's predictions"
  },
  {
    id: 35,
    src: spaceImg16,
    title: "Quantum Cosmic Phenomena",
    category: "space-exploration",
    description: "Quantum effects observed in cosmic environments and space-time fabric"
  },
  {
    id: 36,
    src: spaceImg17,
    title: "Interstellar Medium",
    category: "space-exploration",
    description: "Study of matter and energy distribution between stars in galaxies"
  },
  {
    id: 37,
    src: spaceImg18,
    title: "Cosmic Evolution Timeline",
    category: "space-exploration",
    description: "Journey through cosmic history from Big Bang to present universe"
  },
  {
    id: 38,
    src: spaceImg19,
    title: "Advanced Space Propulsion",
    category: "space-exploration",
    description: "Next-generation propulsion systems for deep space exploration"
  },
  {
    id: 39,
    src: spaceImg20,
    title: "Exoplanet Discovery",
    category: "space-exploration",
    description: "Revolutionary discoveries of potentially habitable worlds beyond our solar system"
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  useEffect(() => {
    document.title = "Gallery - KBE Young Scientist Competition";
  }, []);

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="pt-20" data-testid="page-gallery">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Camera className="h-12 w-12 text-blue-400 mr-4" />
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold border-0">
                <Star className="h-4 w-4 mr-2" />
                Visual Journey of Scientific Excellence
              </Badge>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent" data-testid="text-gallery-hero-title">
              KBE Gallery
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-100">
              Inspiring Moments & Achievements
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-200" data-testid="text-gallery-hero-description">
              Explore the journey of young scientists through competitions, space center visits, Einstein's legacy, 
              and the cosmic wonders that inspire the next generation of scientific innovators.
            </p>
          </div>
          
          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {galleryStats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Explore by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive collection of inspiring moments from competitions, space tours, and Einstein's scientific legacy
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white border-0 shadow-lg`
                    : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 bg-white"
                } px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105`}
                data-testid={`button-filter-${category.id}`}
              >
                <category.icon className="h-5 w-5 mr-2" />
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-gallery-showing">
              {selectedCategory === "all" ? "Complete Gallery Collection" : 
               `${categories.find(c => c.id === selectedCategory)?.label} Collection`}
            </h2>
            <p className="text-xl text-gray-600">
              Showing {filteredImages.length} inspiring {filteredImages.length === 1 ? 'image' : 'images'}
              {selectedCategory !== "all" && (
                <span className="text-blue-600 font-semibold">
                  {" "}from {categories.find(c => c.id === selectedCategory)?.label}
                </span>
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                    onClick={() => setSelectedImage(image)}
                    data-testid={`card-gallery-${image.id}`}
                  >
                    <CardContent className="p-0 relative">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          data-testid={`img-gallery-${image.id}`}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-bold text-sm mb-2 line-clamp-2" data-testid={`text-gallery-title-${image.id}`}>
                            {image.title}
                          </h3>
                          <Badge 
                            className={`bg-gradient-to-r ${categories.find(c => c.id === image.category)?.color || 'from-gray-500 to-gray-600'} text-white text-xs border-0`}
                            data-testid={`badge-gallery-category-${image.id}`}
                          >
                            {categories.find(c => c.id === image.category)?.label}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden p-0" data-testid={`dialog-gallery-${image.id}`}>
                  <div className="relative">
                    <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
                      <img 
                        src={image.src}
                        alt={image.title}
                        className="w-full h-auto max-h-[75vh] object-contain"
                        data-testid={`img-gallery-modal-${image.id}`}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 text-white hover:bg-black/20 bg-black/50 rounded-full"
                      onClick={() => setSelectedImage(null)}
                      data-testid={`button-close-modal-${image.id}`}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1 mr-4">
                        <h3 className="text-3xl font-bold text-gray-900 mb-2" data-testid={`text-modal-title-${image.id}`}>
                          {image.title}
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed" data-testid={`text-modal-description-${image.id}`}>
                          {image.description}
                        </p>
                      </div>
                      <Badge 
                        className={`bg-gradient-to-r ${categories.find(c => c.id === image.category)?.color || 'from-gray-500 to-gray-600'} text-white px-4 py-2 text-sm font-semibold border-0 shrink-0`}
                        data-testid={`badge-modal-category-${image.id}`}
                      >
                        <div className="flex items-center">
                          {React.createElement(categories.find(c => c.id === image.category)?.icon || Camera, { className: "h-4 w-4 mr-2" })}
                          {categories.find(c => c.id === image.category)?.label}
                        </div>
                      </Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-16" data-testid="empty-state-gallery">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Images Found</h3>
              <p className="text-xl text-gray-500">No photos found in this category. Please try a different filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Einstein Legacy CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-white/10 backdrop-blur-md border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Atom className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white" data-testid="text-gallery-cta-title">
                Create Your Own Gallery Story
              </h2>
              <blockquote className="text-xl md:text-2xl font-medium mb-8 italic leading-relaxed text-gray-100">
                "A person who never made a mistake never tried anything new."
              </blockquote>
              <div className="text-lg font-semibold mb-8 text-gray-200">— Albert Einstein</div>
              
              <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-200" data-testid="text-gallery-cta-description">
                Join thousands of young scientists and become part of our inspiring gallery. Your achievement photos, 
                ISRO/NASA visits, and scientific journey could be featured here next!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Trophy className="h-10 w-10 mx-auto mb-3 text-amber-300" />
                  <h3 className="text-lg font-bold mb-2">Win Competitions</h3>
                  <p className="text-blue-200 text-sm">Showcase your scientific excellence</p>
                </div>
                <div className="text-center">
                  <Rocket className="h-10 w-10 mx-auto mb-3 text-blue-300" />
                  <h3 className="text-lg font-bold mb-2">Visit Space Centers</h3>
                  <p className="text-blue-200 text-sm">Exclusive ISRO & NASA tours</p>
                </div>
                <div className="text-center">
                  <Medal className="h-10 w-10 mx-auto mb-3 text-green-300" />
                  <h3 className="text-lg font-bold mb-2">Receive Recognition</h3>
                  <p className="text-blue-200 text-sm">Einstein medals & scholarships</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="/exams"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center"
                  data-testid="button-gallery-cta-register"
                >
                  <Zap className="h-6 w-6 mr-2" />
                  Start Your Journey
                </a>
                <a 
                  href="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                  data-testid="button-gallery-cta-learn"
                >
                  <BookOpen className="h-6 w-6 mr-2" />
                  Learn More
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
