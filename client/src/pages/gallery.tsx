import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Filter, X } from "lucide-react";

const categories = [
  { id: "all", label: "All Photos", count: 24 },
  { id: "competition", label: "Competitions", count: 8 },
  { id: "isro", label: "ISRO Visits", count: 6 },
  { id: "training", label: "Training", count: 5 },
  { id: "awards", label: "Awards", count: 5 },
];

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "KBE Competition 2024",
    category: "competition",
    description: "Students participating in the annual KBE Young Scientist Competition"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "ISRO Space Center Visit",
    category: "isro",
    description: "Winners visiting ISRO facilities and learning about space technology"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Science Training Session",
    category: "training",
    description: "Interactive training session with expert scientists and educators"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Award Ceremony 2024",
    category: "awards",
    description: "Annual award ceremony celebrating young scientific achievements"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Laboratory Experiments",
    category: "training",
    description: "Hands-on laboratory experiments during training programs"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Grade III Competition",
    category: "competition",
    description: "Advanced level competition for senior students"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Rocket Launch Viewing",
    category: "isro",
    description: "Students witnessing rocket launch at ISRO facility"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Winners with Telescopes",
    category: "awards",
    description: "First prize winners receiving their telescope awards"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Physics Workshop",
    category: "training",
    description: "Interactive physics workshop with live demonstrations"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1636819488537-a9b1ffb315cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Group Study Session",
    category: "competition",
    description: "Students preparing together for KBE competitions"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Satellite Control Room",
    category: "isro",
    description: "Behind-the-scenes tour of ISRO mission control"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Chemistry Lab Session",
    category: "training",
    description: "Advanced chemistry experiments and demonstrations"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Medal Ceremony",
    category: "awards",
    description: "Einstein medal presentation to outstanding students"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Grade II Finals",
    category: "competition",
    description: "Intense competition moments from Grade II finals"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Space Museum Tour",
    category: "isro",
    description: "Educational tour of space museum and exhibits"
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Biology Workshop",
    category: "training",
    description: "Microscopy and biological specimen examination"
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Scholarship Recipients",
    category: "awards",
    description: "Monthly scholarship awardees with their certificates"
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Grade I Competition",
    category: "competition",
    description: "Young minds showcasing their scientific knowledge"
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Astronaut Training Demo",
    category: "isro",
    description: "Students experiencing astronaut training simulators"
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1562724292-728c9b2c6ac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Expert Lecture Series",
    category: "training",
    description: "Renowned scientists sharing their knowledge and experience"
  },
  {
    id: 21,
    src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Trophy Presentation",
    category: "awards",
    description: "Second prize winners receiving their trophies"
  },
  {
    id: 22,
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h-600",
    title: "Team Competition",
    category: "competition",
    description: "Team-based scientific problem-solving challenges"
  },
  {
    id: 23,
    src: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Launch Pad Visit",
    category: "isro",
    description: "Up-close view of rocket launch infrastructure"
  },
  {
    id: 24,
    src: "https://images.unsplash.com/photo-1573159969999-5de0de18c0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Science Fair Winners",
    category: "awards",
    description: "Annual science fair winners with their innovative projects"
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
    <div className="pt-16" data-testid="page-gallery">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6" data-testid="text-gallery-hero-title">
            Event Gallery
          </h1>
          <p className="text-xl max-w-3xl mx-auto" data-testid="text-gallery-hero-description">
            Witness the journey of young scientists through competitions, training sessions, awards ceremonies, and unforgettable ISRO visits.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-kbe-blue text-white"
                    : "border-gray-300 text-gray-700 hover:border-kbe-blue hover:text-kbe-blue"
                }`}
                data-testid={`button-filter-${category.id}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-gallery-showing">
              Showing {filteredImages.length} photos
              {selectedCategory !== "all" && (
                <span className="text-kbe-blue">
                  {" "}in {categories.find(c => c.id === selectedCategory)?.label}
                </span>
              )}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="cursor-pointer card-hover overflow-hidden border-0 shadow-lg"
                    onClick={() => setSelectedImage(image)}
                    data-testid={`card-gallery-${image.id}`}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={image.src}
                          alt={image.title}
                          className="w-full h-64 object-cover"
                          data-testid={`img-gallery-${image.id}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-semibold text-sm mb-1" data-testid={`text-gallery-title-${image.id}`}>
                              {image.title}
                            </h3>
                            <Badge 
                              variant="secondary" 
                              className="text-xs bg-white/20 text-white"
                              data-testid={`badge-gallery-category-${image.id}`}
                            >
                              {categories.find(c => c.id === image.category)?.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0" data-testid={`dialog-gallery-${image.id}`}>
                  <div className="relative">
                    <img 
                      src={image.src}
                      alt={image.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                      data-testid={`img-gallery-modal-${image.id}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 text-white hover:bg-black/20"
                      onClick={() => setSelectedImage(null)}
                      data-testid={`button-close-modal-${image.id}`}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900" data-testid={`text-modal-title-${image.id}`}>
                        {image.title}
                      </h3>
                      <Badge 
                        className="bg-kbe-blue text-white"
                        data-testid={`badge-modal-category-${image.id}`}
                      >
                        {categories.find(c => c.id === image.category)?.label}
                      </Badge>
                    </div>
                    <p className="text-gray-600" data-testid={`text-modal-description-${image.id}`}>
                      {image.description}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-12" data-testid="empty-state-gallery">
              <p className="text-xl text-gray-600">No photos found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-kbe-purple to-kbe-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="text-gallery-cta-title">
            Be Part of Our Next Gallery
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-gallery-cta-description">
            Join KBE competitions and create your own success story. Your achievement photos could be featured here next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/exams"
              className="bg-kbe-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block"
              data-testid="button-gallery-cta-register"
            >
              Register for Competition
            </a>
            <a 
              href="/training"
              className="border-2 border-white text-white hover:bg-white hover:text-kbe-purple px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block"
              data-testid="button-gallery-cta-training"
            >
              Join Training Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
