import { Card, CardContent } from "@/components/ui/card";
import { Eye, Target, Trophy, Globe, Atom, Rocket } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Vision",
    description: `To nurture universal vision among students to broaden their mindset and create young innovators, scientist in our country to overcome 21st century adaptive global challenges and lead our country over Global platforms.`,
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
    textColor: "text-gray-900"
  },
  {
    icon: Target,
    title: "Mission", 
    description: `To Foster strong foundation in space Science and Technology, encouraging young ones to pursue career in STEM fields and contribute to India's Global innovation competition in Defence, Science and Research. To create an innovative research and development mindset among students Studying in grade Vth to XIIth through National level competitive exams, training sessions and real space science experiences.`,
    bgColor: "bg-gradient-to-br from-purple-50 to-blue-50",
    iconColor: "bg-gradient-to-r from-purple-600 to-blue-600",
    textColor: "text-gray-900"
  }
];

const globalImpact = [
  {
    icon: Globe,
    title: "National Reach",
    stat: "20+ States",
    description: "Students from across the nation participate in our Einstein-inspired competition"
  },
  {
    icon: Atom,
    title: "Scientific Excellence",
    stat: "98% Success Rate",
    description: "Our participants excel in advanced science studies and research programs"
  },
  {
    icon: Rocket,
    title: "Space Missions",
    stat: "100+ Tours",
    description: "Exclusive visits to ISRO, NASA, and other prestigious space research centers"
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Atom className="h-10 w-10 text-blue-600 mr-4" />
            <h2 className="text-5xl font-bold text-gray-900" data-testid="text-about-title">
              About KBE - Kaun Banega Einstein
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed" data-testid="text-about-description">
            KBE (Kaun Banega Einstein) is the world's premier international young scientist competition platform, 
            empowering students from Classes V to XII+ across 50+ countries to explore Einstein's revolutionary 
            scientific legacy. Our mission transcends borders, uniting brilliant young minds in the pursuit of 
            scientific excellence, space exploration, and breakthrough research opportunities.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-sm text-gray-600">Global Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">₹10L+</div>
              <div className="text-sm text-gray-600">Prize Pool</div>
            </div>
          </div>
        </div>
        
        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`${feature.bgColor} ${feature.textColor} card-hover border-0 shadow-xl hover:shadow-2xl transition-all duration-300`}
              data-testid={`card-about-${feature.title.toLowerCase()}`}
            >
              <CardContent className="p-10">
                <div className={`w-20 h-20 ${feature.iconColor} rounded-full flex items-center justify-center mb-8 shadow-lg`}>
                  <feature.icon className="h-10 w-10 text-white" data-testid={`icon-${feature.title.toLowerCase()}`} />
                </div>
                <h3 className="text-3xl font-bold mb-6" data-testid={`text-${feature.title.toLowerCase()}-title`}>
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed" data-testid={`text-${feature.title.toLowerCase()}-description`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Impact Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Global Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {globalImpact.map((impact, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <impact.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{impact.stat}</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{impact.title}</h4>
                <p className="text-gray-600">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Einstein Quote Section */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white border-0 shadow-xl">
          <CardContent className="p-10 text-center">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Atom className="h-12 w-12 text-white" />
            </div>
            <blockquote className="text-2xl font-medium mb-6 italic">
              "Imagination is more important than knowledge. For knowledge is limited, 
              whereas imagination embraces the entire world, stimulating progress, giving birth to evolution."
            </blockquote>
            <div className="text-lg font-semibold">- Albert Einstein</div>
            <div className="mt-6 text-blue-200">
              Join the Einstein legacy and discover the scientist within you
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
