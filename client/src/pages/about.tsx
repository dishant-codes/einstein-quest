import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe, Star } from "lucide-react";

const stats = [
  { icon: Users, label: "Students Registered", value: "10,000+", color: "kbe-blue" },
  { icon: Award, label: "Awards Given", value: "500+", color: "kbe-orange" },
  { icon: Globe, label: "Cities Reached", value: "100+", color: "kbe-purple" },
  { icon: Star, label: "Success Rate", value: "95%", color: "kbe-emerald" },
];

const team = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Chief Scientific Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Former ISRO scientist with 20+ years experience"
  },
  {
    name: "Prof. Meera Sharma",
    role: "Education Director",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b672?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "IIT graduate and education innovator"
  },
  {
    name: "Dr. Amit Verma",
    role: "Competition Head",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "PhD in Physics and competition design expert"
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us - KBE Young Scientist Competition";
  }, []);

  return (
    <div className="pt-16" data-testid="page-about">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6" data-testid="text-about-hero-title">
            About KBE - Kaun Banega Einstein
          </h1>
          <p className="text-xl max-w-3xl mx-auto" data-testid="text-about-hero-description">
            We are dedicated to nurturing the scientific minds of tomorrow through innovative competitions, expert guidance, and real-world experiences that inspire young students to pursue careers in science and research.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6" data-testid="text-our-story-title">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-testid="text-our-story-p1">
                Founded in 2020, KBE emerged from a simple yet powerful vision: to make science accessible, exciting, and rewarding for young minds across India. Inspired by Einstein's curiosity and innovative thinking, we created a platform that challenges students while celebrating their achievements.
              </p>
              <p className="text-lg text-gray-600 mb-6" data-testid="text-our-story-p2">
                What started as a small initiative in Nashik has now grown into a nationwide movement, connecting thousands of students with opportunities to explore science, win scholarships, and even visit prestigious institutions like ISRO.
              </p>
              <p className="text-lg text-gray-600" data-testid="text-our-story-p3">
                Our unique three-tier competition structure ensures that students of all levels can participate and excel, while our partnerships with leading scientific institutions provide real-world learning experiences.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Students learning science"
                className="w-full rounded-2xl shadow-lg"
                data-testid="img-our-story"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-achievements-title">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-achievements-description">
              Numbers that speak for our impact on young scientific minds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center border-0 shadow-lg card-hover" data-testid={`card-stat-${index}`}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="h-8 w-8 text-white" data-testid={`icon-stat-${index}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2" data-testid={`text-stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600" data-testid={`text-stat-label-${index}`}>
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-team-title">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-team-description">
              Dedicated professionals committed to nurturing young scientific talent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="text-center border-0 shadow-lg card-hover" data-testid={`card-team-${index}`}>
                <CardContent className="p-8">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                    data-testid={`img-team-${index}`}
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid={`text-team-name-${index}`}>
                    {member.name}
                  </h3>
                  <p className="text-kbe-purple font-semibold mb-4" data-testid={`text-team-role-${index}`}>
                    {member.role}
                  </p>
                  <p className="text-gray-600" data-testid={`text-team-description-${index}`}>
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-kbe-blue to-kbe-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Join Our Scientific Community?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
            Be part of a movement that's shaping the future of science education in India. Register now and start your journey toward becoming the next Einstein.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/exams"
              className="bg-kbe-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block"
              data-testid="button-cta-register"
            >
              Register for Competition
            </a>
            <a 
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-kbe-purple px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block"
              data-testid="button-cta-contact"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
