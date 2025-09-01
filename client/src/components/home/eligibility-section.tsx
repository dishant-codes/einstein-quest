import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Calendar, Globe, Rocket } from "lucide-react";

const eligibilityData = [
  {
    category: "Age Groups",
    icon: Users,
    items: [
      "Grade I: Classes V, VI & VII (Age 10-13)",
      "Grade II: Classes VIII, IX & X (Age 13-16)", 
      "Grade III: Classes XI & XII+ (Age 16-18+)"
    ],
    color: "bg-blue-500"
  },
  {
    category: "Global Participation",
    icon: Globe,
    items: [
      "Open to all international students",
      "English language proficiency required",
      "Valid school enrollment certificate needed",
      "Online participation available worldwide"
    ],
    color: "bg-green-500"
  },
  {
    category: "Requirements",
    icon: CheckCircle,
    items: [
      "Strong foundation in Science & Mathematics",
      "Passion for scientific discovery",
      "Critical thinking and problem-solving skills",
      "Commitment to Einstein's scientific legacy"
    ],
    color: "bg-purple-500"
  },
  {
    category: "Competition Timeline",
    icon: Calendar,
    items: [
      "Registration: January - March",
      "Preliminary Round: April",
      "Semi-Finals: May",
      "Grand Finale: June"
    ],
    color: "bg-orange-500"
  }
];

export default function EligibilitySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" data-testid="eligibility-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900" data-testid="text-eligibility-title">
              KBE Eligibility Criteria
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed" data-testid="text-eligibility-description">
            Join the global community of young Einsteins! Our competition welcomes brilliant minds from around the world 
            who share Einstein's passion for scientific discovery and innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {eligibilityData.map((section, index) => (
            <Card 
              key={section.category}
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
              data-testid={`card-eligibility-${section.category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${section.color} rounded-full flex items-center justify-center mr-4`}>
                    <section.icon className="h-6 w-6 text-white" data-testid={`icon-${section.category.toLowerCase()}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900" data-testid={`text-${section.category.toLowerCase()}-title`}>
                    {section.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-lg" data-testid={`text-${section.category.toLowerCase()}-item-${itemIndex}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4">Ready to Begin Your Einstein Journey?</h3>
              <p className="text-xl mb-6">
                "The important thing is not to stop questioning" - Albert Einstein
              </p>
              <Badge className="bg-white text-blue-600 text-lg px-6 py-2">
                International Competition • Global Recognition • Scientific Excellence
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
