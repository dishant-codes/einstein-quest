import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Trophy, Zap, Clock, Users, Medal, Rocket, Globe } from "lucide-react";

const examStages = [
  {
    stage: 1,
    title: "KBE Mains",
    subtitle: "Taluka Level (Local Level)",
    icon: Brain,
    duration: "90 minutes",
    questions: "100 MCQs",
    topics: ["Basic Science Concepts", "Einstein's Life & Discoveries", "Mathematics & Logic", "Space Science Fundamentals"],
    description: "All applied students appear for KBE Exam-I in their respective authorized Einstein Centre as per 3 categories",
    color: "from-blue-500 to-blue-600",
    participants: "All Registered Students",
    mode: "Offline MCQ-OMR Pattern",
    level: "Foundation Level"
  },
  {
    stage: 2,
    title: "KBE Advanced",
    subtitle: "District Level (Regional Level)",
    icon: Target,
    duration: "120 minutes",
    questions: "150 MCQs",
    topics: ["Advanced Physics", "Relativity Theory", "Quantum Mechanics", "Space Technology", "Scientific Research Methods"],
    description: "Qualified students appear for KBE Exam-II with special code of conduct given by KBE control board",
    color: "from-purple-500 to-purple-600",
    participants: "Qualified from Mains Level",
    mode: "Offline MCQ-OMR Pattern",
    level: "Intermediate Level"
  },
  {
    stage: 3,
    title: "KBE Super Advanced",
    subtitle: "State Level (Elite Level)",
    icon: Trophy,
    duration: "150 minutes",
    questions: "200 MCQs",
    topics: ["Theoretical Physics", "Einstein's Philosophy", "Advanced Space Science", "Scientific Innovation", "Research Methodology"],
    description: "Elite candidates appear for KBE Exam-III with special supervised code of conduct by KBE control board",
    color: "from-amber-500 to-orange-600",
    participants: "Top Qualifiers from District Level",
    mode: "Offline MCQ-OMR Pattern",
    level: "Advanced Level"
  }
];

const examFeatures = [
  {
    icon: Clock,
    title: "Authorized Centers",
    description: "Exams conducted at authorized Einstein Centres across different levels"
  },
  {
    icon: Globe,
    title: "OMR Pattern",
    description: "Standardized Optical Mark Recognition (OMR) based MCQ examination format"
  },
  {
    icon: Zap,
    title: "Code of Conduct",
    description: "Special supervised examination protocols by KBE control board"
  },
  {
    icon: Users,
    title: "Progressive Levels",
    description: "Three-tier system from Taluka to District to State level competitions"
  }
];

export default function ExamStagesSection() {
  return (
    <section className="py-20 bg-white" data-testid="exam-stages-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Medal className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900" data-testid="text-exam-stages-title">
              KBE Competition Stages
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed" data-testid="text-exam-stages-description">
            Experience a comprehensive journey through three challenging stages, each designed to test different aspects 
            of scientific knowledge and Einstein's revolutionary thinking.
          </p>
        </div>
        
        {/* Exam Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {examStages.map((stage) => (
            <Card 
              key={stage.stage}
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 card-hover relative overflow-hidden"
              data-testid={`card-stage-${stage.stage}`}
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${stage.color}`} />
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stage.color} rounded-full flex items-center justify-center mr-4`}>
                    <stage.icon className="h-8 w-8 text-white" data-testid={`icon-stage-${stage.stage}`} />
                  </div>
                  <div>
                    <Badge className="bg-gray-100 text-gray-700 mb-2">Stage {stage.stage}</Badge>
                    <h3 className="text-xl font-bold text-gray-900" data-testid={`text-stage-${stage.stage}-title`}>
                      {stage.title}
                    </h3>
                    <p className="text-gray-600 font-medium">{stage.subtitle}</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration:</span>
                    <Badge className="bg-blue-100 text-blue-700">{stage.duration}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Questions:</span>
                    <Badge className="bg-green-100 text-green-700">{stage.questions}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mode:</span>
                    <Badge className="bg-orange-100 text-orange-700">{stage.mode}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Participants:</span>
                    <Badge className="bg-purple-100 text-purple-700">{stage.participants}</Badge>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4" data-testid={`text-stage-${stage.stage}-description`}>
                  {stage.description}
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.topics.map((topic, index) => (
                      <Badge 
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs"
                        data-testid={`badge-topic-${stage.stage}-${index}`}
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Exam Features */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">KBE Examination System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examFeatures.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                data-testid={`card-feature-${index}`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Additional Information */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Examination Structure</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-600">Taluka Level</div>
                <div className="text-gray-600">Local authorized centers</div>
                <div className="text-gray-500">All registered students</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-600">District Level</div>
                <div className="text-gray-600">Regional authorized centers</div>
                <div className="text-gray-500">Qualified candidates only</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-amber-600">State Level</div>
                <div className="text-gray-600">State authorized centers</div>
                <div className="text-gray-500">Elite performers</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-8">
              <Rocket className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">Ready for the Three-Level Challenge?</h3>
              <p className="text-xl mb-6">
                "The important thing is not to stop questioning. Curiosity has its own reason for existing." - Albert Einstein
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Badge className="bg-white text-indigo-600 text-lg px-4 py-2">Taluka → District → State</Badge>
                <Badge className="bg-white text-indigo-600 text-lg px-4 py-2">OMR Pattern</Badge>
                <Badge className="bg-white text-indigo-600 text-lg px-4 py-2">Authorized Centers</Badge>
              </div>
              <p className="text-blue-200">
                Progress through each level and prove your scientific excellence
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
