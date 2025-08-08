import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { EXAM_GRADES } from "@/lib/constants";

const gradeImages = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
];

export default function ExamPreview() {
  return (
    <section className="py-20 bg-gray-50" data-testid="exam-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-exam-structure-title">
            Exam Structure
          </h2>
          <p className="text-xl text-gray-600" data-testid="text-exam-structure-description">
            Three levels of exciting challenges to test your scientific knowledge
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXAM_GRADES.map((grade, index) => (
            <Card 
              key={grade.id} 
              className="bg-white shadow-lg card-hover border-0 overflow-hidden"
              data-testid={`card-exam-${grade.id}`}
            >
              <img 
                src={gradeImages[index]}
                alt={`${grade.title} Level Students`}
                className="w-full h-48 object-cover"
                data-testid={`img-exam-${grade.id}`}
              />
              <CardContent className="p-6">
                <Badge 
                  className={`bg-${grade.color} text-white mb-4`}
                  data-testid={`badge-${grade.id}`}
                >
                  {grade.title}
                </Badge>
                <h3 className="text-xl font-bold mb-2" data-testid={`text-${grade.id}-classes`}>
                  {grade.classes}
                </h3>
                <p className="text-gray-600 mb-4" data-testid={`text-${grade.id}-description`}>
                  {grade.description}
                </p>
                <div className="text-2xl font-bold text-kbe-orange mb-4" data-testid={`text-${grade.id}-price`}>
                  ₹{grade.price}/-
                </div>
                <Link href="/exams">
                  <Button 
                    className={`w-full bg-${grade.color} hover:opacity-90 text-white`}
                    data-testid={`button-register-${grade.id}`}
                  >
                    Register Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
