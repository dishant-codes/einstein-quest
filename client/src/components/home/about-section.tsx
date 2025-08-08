import { Card, CardContent } from "@/components/ui/card";
import { Eye, Target, Trophy } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Vision",
    description: "To ignite curiosity and inspire a global generation of young minds to explore science, innovate boldly, and shape the future of research.",
    gradient: "from-kbe-blue to-blue-600"
  },
  {
    icon: Target,
    title: "Mission", 
    description: "To create an engaging, world-class platform for students through quizzes, expert sessions, and real-world experiences in science and research.",
    gradient: "from-kbe-purple to-purple-600"
  },
  {
    icon: Trophy,
    title: "Goals",
    description: "To discover young talent and provide life-changing opportunities including ISRO visits, scholarships, and scientific equipment.",
    gradient: "from-kbe-orange to-orange-600"
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-about-title">
            About KBE
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-about-description">
            Empowering young minds to become the next generation of scientists and researchers through innovative competitions and learning experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`bg-gradient-to-br ${feature.gradient} text-white card-hover border-0`}
              data-testid={`card-about-${feature.title.toLowerCase()}`}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8" data-testid={`icon-${feature.title.toLowerCase()}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4" data-testid={`text-${feature.title.toLowerCase()}-title`}>
                  {feature.title}
                </h3>
                <p data-testid={`text-${feature.title.toLowerCase()}-description`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
