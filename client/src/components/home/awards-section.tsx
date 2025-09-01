import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Gift, Star, Rocket, Globe, Plane, MapPin } from "lucide-react";
import { LEVEL_AWARDS, SPECIAL_AWARDS } from "@/lib/constants";
import isroTour1 from "@assets/Nashik to ISRO 1.png";
import nasaTour1 from "@assets/Nashik to NASA 1.png";

export default function AwardsSection() {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'medal': return Medal;
      case 'rocket': return Rocket;
      case 'globe': return Globe;
      default: return Trophy;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" data-testid="awards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-amber-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-awards-title">
              Prizes & Awards
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto" data-testid="text-awards-description">
            Progressive rewards system with life-changing opportunities including ISRO and NASA visits for winners 
            at each level of the competition.
          </p>
        </div>
        
        {/* Level-wise Awards */}
        <div className="space-y-12 mb-16">
          {LEVEL_AWARDS.map((levelAward, index) => {
            const IconComponent = getIconComponent(levelAward.icon);
            
            return (
              <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${levelAward.color}`} />
                <CardContent className="p-10">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${levelAward.color} rounded-full flex items-center justify-center mr-6`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{levelAward.level}</h3>
                      <p className="text-xl text-gray-600">{levelAward.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Prizes */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">🏆 Prizes for Top 3 Winners:</h4>
                      <ul className="space-y-3">
                        {levelAward.prizes.map((prize, prizeIndex) => (
                          <li key={prizeIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{prize}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-semibold text-blue-900 mb-2">📜 Qualification Benefits:</h5>
                        <p className="text-blue-800 text-sm">{levelAward.qualification}</p>
                      </div>
                    </div>
                    
                    {/* Details */}
                    {levelAward.details && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">
                          {index === 1 ? "🚀 ISRO Visit Details:" : "✈️ NASA Visit Details:"}
                        </h4>
                        
                        {levelAward.details.participants && (
                          <div className="mb-4">
                            <Badge className="bg-green-100 text-green-700 mb-2">
                              {levelAward.details.participants}
                            </Badge>
                          </div>
                        )}
                        
                        <ul className="space-y-2 mb-4">
                          {levelAward.details.itinerary.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start">
                              <MapPin className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {levelAward.details.note && (
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-yellow-800 text-sm">
                              <strong>Note:</strong> {levelAward.details.note}
                            </p>
                          </div>
                        )}
                        
                        {/* Tour Images */}
                        <div className="mt-4">
                          <img 
                            src={index === 1 ? isroTour1 : nasaTour1}
                            alt={`${index === 1 ? 'ISRO' : 'NASA'} Tour Experience`}
                            className="w-full h-40 object-cover rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Special Awards */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Special Recognition Awards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPECIAL_AWARDS.map((award, index) => (
              <Card key={index} className="bg-white border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{award.title}</h4>
                  <p className="text-gray-600 mb-3 text-sm">{award.description}</p>
                  <Badge className="bg-blue-100 text-blue-700 mb-3">{award.prize}</Badge>
                  <p className="text-xs text-gray-500">{award.criteria}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Summary Section */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white border-0 shadow-xl">
          <CardContent className="p-10 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <Medal className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h4 className="text-2xl font-bold mb-2">Einstein Medals</h4>
                <p className="text-blue-200">Gold, Silver & Bronze medals with rank certificates</p>
              </div>
              <div>
                <Rocket className="h-12 w-12 mx-auto mb-4 text-blue-300" />
                <h4 className="text-2xl font-bold mb-2">ISRO Experience</h4>
                <p className="text-blue-200">Space training with flight to Bengaluru & official felicitation</p>
              </div>
              <div>
                <Plane className="h-12 w-12 mx-auto mb-4 text-green-300" />
                <h4 className="text-2xl font-bold mb-2">NASA Adventure</h4>
                <p className="text-blue-200">7 days USA visit with NASA centre tour & space exploration</p>
              </div>
            </div>
            
            <h3 className="text-4xl font-bold mb-4">Progressive Achievement System</h3>
            <p className="text-xl mb-6">
              "Try not to become a person of success, but rather try to become a person of value" - Albert Einstein
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white text-indigo-600 text-lg px-4 py-2">Taluka → District → State</Badge>
              <Badge className="bg-white text-indigo-600 text-lg px-4 py-2">Medals & Certificates</Badge>
              <Badge className="bg-white text-indigo-600 text-lg px-4 py-2">ISRO & NASA Visits</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
