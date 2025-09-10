import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Atom, 
  Rocket, 
  BookOpen, 
  Trophy, 
  Medal, 
  Star,
  Globe,
  Target,
  Zap,
  Brain,
  Telescope,
  GraduationCap,
  Shield,
  Gift
} from "lucide-react";


const examLevels = [
  {
    title: "KBE Mains (Level I)",
    subtitle: "Taluka Level Competition",
    description: "Foundation level examination for Classes V-XII with basic scientific concepts and Einstein's theories",
    participants: "District-wide participation",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    timeline: "19th March, 2025",
    registration: "15th Feb - 15th March, 2025",
    fee: "₹270 - ₹360",
    eligibility: "Classes V to XII+",
    totalMarks: "100 Marks",
    sections: "All 6 syllabus sections"
  },
  {
    title: "KBE Advanced (Level II)", 
    subtitle: "District Level Competition",
    description: "Advanced scientific problems and space technology concepts for qualified students",
    participants: "State-wide selection",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    timeline: "21st May, 2025",
    registration: "15th March - 15th May, 2025",
    fee: "Qualified students only",
    eligibility: "KBE Mains qualifiers",
    totalMarks: "150 Marks",
    sections: "Advanced level questions"
  },
  {
    title: "KBE Super Advanced (Level III)",
    subtitle: "State Level Competition", 
    description: "Elite level examination with complex physics, space science and research methodology",
    participants: "National recognition",
    icon: Medal,
    color: "from-amber-500 to-orange-500",
    timeline: "July 2025",
    registration: "Merit-based selection",
    fee: "Scholarship provided",
    eligibility: "KBE Advanced winners",
    totalMarks: "200 Marks",
    sections: "Expert level evaluation"
  }
];

const syllabusStructure = [
  { 
    category: "Einstein's Biography", 
    weightage: "10%", 
    questions: 10, 
    marks: 10,
    icon: Atom,
    color: "from-amber-500 to-amber-600",
    description: "Life and discoveries of Albert Einstein"
  },
  { 
    category: "Current Year Environment Science", 
    weightage: "20%", 
    questions: 20, 
    marks: 20,
    icon: BookOpen,
    color: "from-green-500 to-green-600",
    description: "Topics from current year Environment Science Textbook"
  },
  { 
    category: "Einstein's Quantum Theory", 
    weightage: "20%", 
    questions: 20, 
    marks: 20,
    icon: Brain,
    color: "from-purple-500 to-purple-600",
    description: "Quantum Mechanics, Relativity and Photoelectric effect"
  },
  { 
    category: "Mathematics & Logical Reasoning", 
    weightage: "20%", 
    questions: 20, 
    marks: 20,
    icon: Target,
    color: "from-blue-500 to-blue-600",
    description: "Mathematical concepts and logical problem solving"
  },
  { 
    category: "Space Technology - ISRO & NASA", 
    weightage: "20%", 
    questions: 20, 
    marks: 20,
    icon: Rocket,
    color: "from-indigo-500 to-indigo-600",
    description: "Space exploration, satellites and space missions"
  },
  { 
    category: "World Peace and Science - Weapons", 
    weightage: "10%", 
    questions: 10, 
    marks: 10,
    icon: Shield,
    color: "from-red-500 to-red-600",
    description: "Science for peace and understanding weapons technology"
  },
];

const awardsData = [
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
    icon: Telescope,
    color: "from-green-600 to-teal-600"
  }
];

const examStats = [
  { icon: Users, label: "Students Registered", value: "10,000+", color: "from-blue-500 to-blue-600", description: "Young scientists across India" },
  { icon: Globe, label: "Cities Reached", value: "100+", color: "from-purple-500 to-purple-600", description: "Pan-India competition coverage" },
  { icon: Trophy, label: "Total Prize Pool", value: "₹10L+", color: "from-amber-500 to-amber-600", description: "Scholarships and awards" },
  { icon: Star, label: "Success Rate", value: "98%", color: "from-green-500 to-green-600", description: "Students advance to higher studies" },
];

export default function Exams() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = "Exam Registration - KBE Young Scientist Competition";
  }, []);

  return (
    <div className="pt-20" data-testid="page-exams">
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
              <Atom className="h-12 w-12 text-blue-400 mr-4" />
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold border-0">
                <Trophy className="h-4 w-4 mr-2" />
                India's Premier Young Scientist Competition
              </Badge>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent" data-testid="text-exams-hero-title">
              KBE Examinations
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-blue-100">
              Three-Tier Scientific Excellence
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-200" data-testid="text-exams-hero-description">
              Join India's most prestigious young scientist competition with international-level standards. 
              Challenge yourself across three progressive levels and win life-changing opportunities including ISRO and NASA tours.
            </p>
          </div>
          
          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {examStats.map((stat, index) => (
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

      {/* Competition Structure */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6" data-testid="text-competition-structure-title">
              Three-Tier Excellence System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our scientifically designed progressive structure ensures comprehensive evaluation and continuous learning
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
                  <p className="text-gray-700 mb-6">{level.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Exam Date:</span>
                      <span className="font-semibold">{level.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Registration:</span>
                      <span className="font-semibold">{level.registration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Fee:</span>
                      <span className="font-semibold">{level.fee}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Eligibility:</span>
                      <span className="font-semibold">{level.eligibility}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Total Marks:</span>
                      <span className="font-semibold text-amber-600">{level.totalMarks}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Coverage:</span>
                      <span className="font-semibold">{level.sections}</span>
                    </div>
                  </div>
                  
                  <Badge className={`bg-gradient-to-r ${level.color} text-white px-3 py-1 text-sm border-0 mb-4`}>
                    {level.participants}
                  </Badge>
                  
                  {index === 0 && (
                    <Button 
                      className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 text-white`}
                      onClick={() => setLocation("/einstein-quest/online-registrations")}
                      data-testid="button-register-mains"
                    >
                      Register Now
                    </Button>
                  )}
                  
                  {index > 0 && (
                    <Button 
                      className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 text-white opacity-75`}
                      disabled
                    >
                      Merit-Based Selection
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus & Exam Pattern */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6" data-testid="text-syllabus-title">
              Exam Pattern & Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-syllabus-description">
              Comprehensive scientific evaluation based on Einstein's approach to learning and discovery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {syllabusStructure.map((item, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.category}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Weightage:</span>
                      <span className={`font-bold text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.weightage}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Questions:</span>
                      <span className="font-semibold text-gray-900">{item.questions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Marks:</span>
                      <span className="font-semibold text-gray-900">{item.marks}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border-0 shadow-xl" data-testid="card-exam-summary">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100</div>
                  <div className="text-gray-600">Total Marks (Level I)</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">100</div>
                  <div className="text-gray-600">Total Questions</div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">3 Hours</div>
                  <div className="text-gray-600">Duration</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">Offline</div>
                  <div className="text-gray-600">Mode</div>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-4 flex items-center text-blue-800" data-testid="text-exam-benefits-title">
                  <Gift className="h-5 w-5 text-blue-600 mr-2" />
                  What You Get
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Participation certificate & Space Research Book
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Einstein's Medal & Trophy for top performers
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ISRO & NASA tour opportunities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Educational scholarships up to ₹10L+
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Professional telescopes & scientific equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Direct admission opportunities in premier institutions
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Prestigious Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              World-class recognition and life-changing opportunities that launch scientific careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {awardsData.map((award, index) => (
              <Card key={award.title} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Follow Einstein's Path?</h2>
              <blockquote className="text-xl md:text-2xl font-medium mb-8 italic leading-relaxed text-gray-100">
                "Try not to become a person of success, but rather try to become a person of value."
              </blockquote>
              <div className="text-lg font-semibold mb-8 text-gray-200">— Albert Einstein</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Rocket className="h-10 w-10 mx-auto mb-3 text-blue-300" />
                  <h3 className="text-lg font-bold mb-2">Space Exploration</h3>
                  <p className="text-blue-200 text-sm">ISRO & NASA facility tours</p>
                </div>
                <div className="text-center">
                  <Medal className="h-10 w-10 mx-auto mb-3 text-amber-300" />
                  <h3 className="text-lg font-bold mb-2">Einstein Medals</h3>
                  <p className="text-blue-200 text-sm">Prestigious scientific recognition</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-10 w-10 mx-auto mb-3 text-green-300" />
                  <h3 className="text-lg font-bold mb-2">₹10L+ Scholarships</h3>
                  <p className="text-blue-200 text-sm">Support for future education</p>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => setLocation("/einstein-quest/online-registrations")}
              >
                <Zap className="h-6 w-6 mr-2" />
                Start Your Scientific Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
