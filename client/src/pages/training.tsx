import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, Clock, Users, Calendar, BookOpen } from "lucide-react";

const trainingPrograms = [
  {
    title: "Foundation Science Training",
    level: "Grade I (Classes V-VII)",
    duration: "5 Days",
    sessions: "10 Sessions",
    price: "₹500",
    description: "Interactive sessions covering basic science concepts with fun experiments and activities.",
    features: [
      "Basic Physics, Chemistry & Biology",
      "Hands-on experiments",
      "Interactive quizzes",
      "Einstein's life stories",
      "Mock tests with analysis"
    ],
    color: "kbe-blue"
  },
  {
    title: "Intermediate Science Training",
    level: "Grade II (Classes VIII-X)",
    duration: "6 Days",
    sessions: "12 Sessions",
    price: "₹750",
    description: "Advanced concepts with practical applications and problem-solving techniques.",
    features: [
      "Advanced Physics & Chemistry",
      "Mathematical problem solving",
      "Scientific method training",
      "Research methodology basics",
      "Competitive exam strategies"
    ],
    color: "kbe-purple"
  },
  {
    title: "Advanced Science Training",
    level: "Grade III (Classes XI-XII+)",
    duration: "7 Days",
    sessions: "14 Sessions",
    price: "₹1000",
    description: "Comprehensive training for future scientists with real-world applications.",
    features: [
      "University-level concepts",
      "Research project guidance",
      "Scientific paper writing",
      "Career guidance in science",
      "Industry expert sessions"
    ],
    color: "kbe-orange"
  }
];

const schedule = [
  { time: "9:00 AM - 10:00 AM", topic: "Theoretical Concepts", type: "Live Session" },
  { time: "10:15 AM - 11:15 AM", topic: "Practical Experiments", type: "Interactive" },
  { time: "11:30 AM - 12:30 PM", topic: "Problem Solving", type: "Workshop" },
  { time: "2:00 PM - 3:00 PM", topic: "Mock Test & Analysis", type: "Assessment" },
  { time: "3:15 PM - 4:00 PM", topic: "Q&A Session", type: "Discussion" },
];

const instructors = [
  {
    name: "Dr. Priya Mehta",
    specialization: "Physics & Astronomy",
    experience: "15+ years",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b672?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    achievements: "Former NASA researcher, IIT graduate"
  },
  {
    name: "Prof. Ramesh Kumar",
    specialization: "Chemistry & Materials",
    experience: "12+ years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    achievements: "DRDO scientist, Published 50+ research papers"
  },
  {
    name: "Dr. Anita Sharma",
    specialization: "Biology & Biotechnology",
    experience: "10+ years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    achievements: "Biotech researcher, Patent holder"
  }
];

export default function Training() {
  useEffect(() => {
    document.title = "Training Programs - KBE Young Scientist Competition";
  }, []);

  return (
    <div className="pt-16" data-testid="page-training">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6" data-testid="text-training-hero-title">
            Expert Training Programs
          </h1>
          <p className="text-xl max-w-3xl mx-auto" data-testid="text-training-hero-description">
            Comprehensive training sessions designed by experts to help you excel in KBE competitions and develop deep scientific understanding.
          </p>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-programs-title">
              Training Programs
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-programs-description">
              Choose the right training program for your grade level
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <Card 
                key={program.title}
                className="border-2 border-gray-200 hover:border-kbe-blue transition-colors card-hover"
                data-testid={`card-training-${index}`}
              >
                <CardHeader>
                  <Badge className={`bg-${program.color} text-white w-fit mb-2`} data-testid={`badge-training-${index}`}>
                    {program.level}
                  </Badge>
                  <CardTitle className="text-xl" data-testid={`text-training-title-${index}`}>
                    {program.title}
                  </CardTitle>
                  <div className="text-3xl font-bold text-kbe-orange" data-testid={`text-training-price-${index}`}>
                    {program.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6" data-testid={`text-training-description-${index}`}>
                    {program.description}
                  </p>
                  
                  <div className="flex justify-between mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm" data-testid={`text-training-duration-${index}`}>{program.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm" data-testid={`text-training-sessions-${index}`}>{program.sessions}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start" data-testid={`feature-training-${index}-${featureIndex}`}>
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full bg-${program.color} hover:opacity-90 text-white`}
                    data-testid={`button-enroll-${index}`}
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-schedule-title">
              Daily Training Schedule
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-schedule-description">
              Structured learning with optimal time distribution
            </p>
          </div>
          
          <Card className="border-0 shadow-lg max-w-4xl mx-auto" data-testid="card-schedule">
            <CardContent className="p-8">
              <div className="space-y-4">
                {schedule.map((session, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    data-testid={`schedule-item-${index}`}
                  >
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-kbe-blue mr-3" />
                      <div>
                        <div className="font-semibold" data-testid={`schedule-time-${index}`}>{session.time}</div>
                        <div className="text-gray-600" data-testid={`schedule-topic-${index}`}>{session.topic}</div>
                      </div>
                    </div>
                    <Badge variant="outline" data-testid={`schedule-type-${index}`}>
                      {session.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Expert Instructors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-instructors-title">
              Expert Instructors
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-instructors-description">
              Learn from renowned scientists and educators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <Card key={instructor.name} className="text-center border-0 shadow-lg card-hover" data-testid={`card-instructor-${index}`}>
                <CardContent className="p-8">
                  <img 
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                    data-testid={`img-instructor-${index}`}
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid={`text-instructor-name-${index}`}>
                    {instructor.name}
                  </h3>
                  <p className="text-kbe-purple font-semibold mb-2" data-testid={`text-instructor-specialization-${index}`}>
                    {instructor.specialization}
                  </p>
                  <p className="text-gray-600 mb-4" data-testid={`text-instructor-experience-${index}`}>
                    Experience: {instructor.experience}
                  </p>
                  <p className="text-sm text-gray-500" data-testid={`text-instructor-achievements-${index}`}>
                    {instructor.achievements}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-20 bg-gradient-to-r from-kbe-blue to-kbe-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" data-testid="text-features-title">
                Why Choose Our Training?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start" data-testid="feature-interactive">
                  <CheckCircle className="h-6 w-6 mr-4 mt-1 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-lg">Interactive Online Sessions</h4>
                    <p className="text-blue-100">Live sessions with renowned scientists and educators</p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="feature-practical">
                  <CheckCircle className="h-6 w-6 mr-4 mt-1 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-lg">Practical Experiments</h4>
                    <p className="text-blue-100">Hands-on activities to understand scientific concepts</p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="feature-analysis">
                  <CheckCircle className="h-6 w-6 mr-4 mt-1 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-lg">Mock Tests & Analysis</h4>
                    <p className="text-blue-100">Regular assessments with detailed performance analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="feature-support">
                  <CheckCircle className="h-6 w-6 mr-4 mt-1 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-lg">24/7 Support</h4>
                    <p className="text-blue-100">Continuous support from our expert team</p>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="bg-kbe-orange hover:bg-orange-600 text-white mt-8"
                data-testid="button-start-training"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Training Today
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Science Training Session"
                className="w-full rounded-2xl shadow-lg"
                data-testid="img-training-session"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-bold text-xl" data-testid="text-training-overlay-title">Live Training Sessions</h4>
                <p data-testid="text-training-overlay-description">Interactive learning with expert guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
