import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { AWARDS } from "@/lib/constants";

export default function AwardsSection() {
  return (
    <section className="py-20 bg-white" data-testid="awards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-awards-title">
            Awards & Scholarships
          </h2>
          <p className="text-xl text-gray-600" data-testid="text-awards-description">
            Special prizes for the first 3 winners of each grade level
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {AWARDS.map((award, index) => {
            // Define color classes based on position to avoid dynamic class name issues
            const getColorClasses = (color: string) => {
              switch (color) {
                case 'yellow':
                  return {
                    gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
                    badge: 'bg-yellow-500'
                  };
                case 'gray':
                  return {
                    gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
                    badge: 'bg-gray-500'
                  };
                case 'orange':
                  return {
                    gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
                    badge: 'bg-orange-500'
                  };
                default:
                  return {
                    gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
                    badge: 'bg-blue-500'
                  };
              }
            };
            
            const colorClasses = getColorClasses(award.color);
            
            return (
              <div key={award.position} className="text-center card-hover" data-testid={`card-award-${award.position}`}>
                <div className={`${colorClasses.gradient} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Trophy className="h-12 w-12 text-white" data-testid={`icon-trophy-${award.position}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid={`text-${award.position}-prize-title`}>
                  {award.position} Prize
                </h3>
                <Badge 
                  className={`${colorClasses.badge} text-white mb-4`}
                  data-testid={`badge-${award.position}-prize`}
                >
                  {award.prize}
                </Badge>
                <p className="text-gray-600" data-testid={`text-${award.position}-prize-description`}>
                  {award.scholarship} + {award.badge}
                </p>
              </div>
            );
          })}
        </div>
        
        <Card className="bg-gradient-to-r from-kbe-blue to-kbe-purple text-white border-0" data-testid="card-isro-tour">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4" data-testid="text-isro-tour-title">
              ISRO Tour Experience
            </h3>
            <p className="text-xl mb-6" data-testid="text-isro-tour-description">
              Winner gets an exclusive opportunity to visit ISRO Space Center
            </p>
            <img 
              src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
              alt="ISRO Space Center"
              className="w-full h-48 object-cover rounded-xl mb-4"
              data-testid="img-isro-space-center"
            />
            <Button 
              size="lg"
              className="bg-kbe-orange hover:bg-orange-600 text-white font-semibold"
              data-testid="button-learn-more-isro"
            >
              Learn More About ISRO Tour
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
