import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Globe, Star, Atom, Eye, Target, Rocket, BookOpen, Trophy, Medal } from "lucide-react";

const stats = [
  { icon: Users, label: "Students Registered", value: "10,000+", color: "from-blue-500 to-blue-600", description: "Young scientists across India" },
  { icon: Globe, label: "Cities Reached", value: "100+", color: "from-purple-500 to-purple-600", description: "Pan-India presence in major cities" },
  { icon: Trophy, label: "Prize Pool", value: "₹10L+", color: "from-amber-500 to-amber-600", description: "Scholarships and awards distributed" },
  { icon: Star, label: "Success Rate", value: "98%", color: "from-green-500 to-green-600", description: "Participants excel in advanced studies" },
];

const features = [
  {
    icon: Eye,
    title: "Vision",
    description: "To nurture universal vision among students to broaden their mindset and create young innovators, scientists in our country to overcome 21st century adaptive global challenges and lead our country on global platforms.",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconColor: "from-blue-600 to-indigo-600"
  },
  {
    icon: Target,
    title: "Mission", 
    description: "To foster strong foundation in space Science and Technology, encouraging young ones to pursue career in STEM fields and contribute to India's global innovation competition in Defence, Science and Research.",
    bgColor: "bg-gradient-to-br from-purple-50 to-blue-50",
    iconColor: "from-purple-600 to-blue-600"
  }
];

const examLevels = [
  {
    title: "KBE Mains",
    subtitle: "Taluka Level Competition",
    description: "Foundation level examination for Classes V-XII with basic scientific concepts and Einstein's theories",
    participants: "District-wide participation",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "KBE Advanced", 
    subtitle: "District Level Competition",
    description: "Advanced scientific problems and space technology concepts for qualified students",
    participants: "State-wide selection",
    icon: Rocket,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "KBE Super Advanced",
    subtitle: "State Level Competition", 
    description: "Elite level examination with complex physics, space science and research methodology",
    participants: "National recognition",
    icon: Medal,
    color: "from-amber-500 to-orange-500"
  }
];

const awards = [
  {
    title: "ISRO & NASA Tours",
    description: "Exclusive 7-day educational visits to world's premier space research centers",
    benefits: ["Zero-gravity simulators", "Meet astronauts", "Rocket launch viewing", "Research lab access"],
    icon: Rocket,
    color: "from-blue-600 to-purple-600"
  },
  {
    title: "Einstein Medals & Scholarships",
    description: "Prestigious recognition and financial support for continued education",
    benefits: ["Gold/Silver medals", "Educational scholarships", "International recognition", "University partnerships"],
    icon: Medal,
    color: "from-amber-600 to-orange-600"
  },
  {
    title: "Advanced Scientific Equipment",
    description: "State-of-the-art instruments and laboratory access for research",
    benefits: ["Professional telescopes", "Lab equipment", "Research mentorship", "Publication opportunities"],
    icon: Atom,
    color: "from-green-600 to-teal-600"
  }
];

export default function About() {
  useEffect(() => {
    document.title = "About Us - KBE Young Scientist Competition";
  }, []);

  return (
    <div className="pt-20" data-testid="page-about">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Atom className="h-12 w-12 text-blue-400 mr-4" />
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold border-0">
                <Globe className="h-4 w-4 mr-2" />
                India's Premier Young Scientist Competition
              </Badge>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent" data-testid="text-about-hero-title">
              About KBE
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-100">
              Kaun Banega Einstein
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-200" data-testid="text-about-hero-description">
              KBE is India's premier young scientist competition platform with international-level standards, empowering students from Classes V to XII+ across India to explore Einstein's revolutionary scientific legacy and pursue breakthrough research opportunities through world-class training and mentorship.
            </p>
          </div>
          
          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10,000+</div>
              <div className="text-sm text-gray-300">Students Registered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-sm text-gray-300">Cities in India</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">₹10L+</div>
              <div className="text-sm text-gray-300">Prize Pool</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-sm text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6" data-testid="text-mission-vision-title">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on Einstein's principles of curiosity, innovation, and scientific excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className={`${feature.bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                data-testid={`card-${feature.title.toLowerCase()}`}
              >
                <CardContent className="p-12">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.iconColor} rounded-full flex items-center justify-center mb-8 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Structure */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Three-Tier Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our scientifically designed competition structure ensures comprehensive evaluation and progressive learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {examLevels.map((level, index) => (
              <Card key={level.title} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${level.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <level.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.title}</h3>
                  <p className="text-lg font-semibold text-gray-600 mb-4">{level.subtitle}</p>
                  <p className="text-gray-700 mb-4">{level.description}</p>
                  <Badge className={`bg-gradient-to-r ${level.color} text-white px-3 py-1 text-sm border-0`}>
                    {level.participants}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Prestigious Awards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              World-class recognition and opportunities that launch scientific careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <Card key={award.title} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${award.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                    <award.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{award.title}</h3>
                  <p className="text-gray-700 mb-6">{award.description}</p>
                  <ul className="space-y-2">
                    {award.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6" data-testid="text-achievements-title">
              Global Impact & Recognition
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-achievements-description">
              Numbers that speak to our commitment to scientific excellence worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" data-testid={`card-stat-${index}`}>
                <CardContent className="p-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <stat.icon className="h-10 w-10 text-white" data-testid={`icon-stat-${index}`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2" data-testid={`text-stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 mb-2" data-testid={`text-stat-label-${index}`}>
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Einstein Legacy Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/10 backdrop-blur-md border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Atom className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Einstein's Legacy Lives On</h2>
              <blockquote className="text-2xl md:text-3xl font-medium mb-8 italic leading-relaxed text-gray-100">
                "Imagination is more important than knowledge. For knowledge is limited, 
                whereas imagination embraces the entire world, stimulating progress, giving birth to evolution."
              </blockquote>
              <div className="text-xl font-semibold mb-6 text-gray-200">— Albert Einstein</div>
              <p className="text-lg text-gray-100 max-w-3xl mx-auto">
                Join thousands of young scientists from around the world in following Einstein's footsteps. 
                Discover the universe's mysteries, unlock your potential, and become part of the next generation of scientific innovators.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8" data-testid="text-cta-title">
            Ready to Join Einstein's Legacy?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed" data-testid="text-cta-description">
            Be part of the world's most prestigious young scientist competition. Connect with brilliant minds, 
            win life-changing opportunities, and shape the future of science and space exploration.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Rocket className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">ISRO & NASA Tours</h3>
              <p className="text-orange-100">Exclusive space center visits</p>
            </div>
            <div className="text-center">
              <Medal className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Einstein Medals</h3>
              <p className="text-orange-100">Prestigious recognition</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">₹10L+ Scholarships</h3>
              <p className="text-orange-100">Educational support</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/einstein-quest/exams"
              className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
              data-testid="button-cta-register"
            >
              <BookOpen className="inline h-6 w-6 mr-2" />
              Register for KBE 2025
            </a>
            <a 
              href="/einstein-quest/gallery"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 inline-block"
              data-testid="button-cta-gallery"
            >
              <Star className="inline h-6 w-6 mr-2" />
              View Success Stories
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
