import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { CONTACT_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { z } from "zod";

const contactFormSchema = insertContactSchema.extend({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  gradeLevel: z.string().min(1, "Please select a grade level"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactOptions = [
  {
    icon: MapPin,
    title: "Address",
    content: CONTACT_INFO.address,
    color: "slate"
  },
  {
    icon: Phone,
    title: "Phone",
    content: CONTACT_INFO.phone,
    color: "gray"
  },
  {
    icon: Mail,
    title: "Email", 
    content: CONTACT_INFO.email,
    color: "zinc"
  },
  {
    icon: Clock,
    title: "Office Hours",
    content: CONTACT_INFO.hours,
    color: "neutral"
  }
];

const faqs = [
  {
    question: "What are the exam dates for KBE 2024?",
    answer: "KBE-Mains will be held on 19th March 2024, and KBE-Advance on 21st May 2024. Registration deadlines are mentioned on our exams page."
  },
  {
    question: "What subjects are covered in the competition?",
    answer: "The syllabus includes current year Math and Science (PCB) - 50%, Hot Questions from Olympiad base - 25%, and Einstein's Biography & Research - 25%."
  },
  {
    question: "What prizes do winners receive?",
    answer: "First prize winners get telescopes with Einstein's medal and monthly scholarship. Second and third prize winners receive microscopes and binoculars respectively, along with trophies and scholarships."
  },
  {
    question: "How can I prepare for KBE competitions?",
    answer: "We offer comprehensive training programs for all grade levels with expert instructors, interactive sessions, and mock tests. Visit our training page for more details."
  },
  {
    question: "Is there any age limit for participation?",
    answer: "Students from Classes V to XII+ can participate in appropriate grade levels. Grade I for Classes V-VII, Grade II for Classes VIII-X, and Grade III for Classes XI-XII+."
  }
];

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Contact Us - KBE Young Scientist Competition";
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gradeLevel: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="pt-16" data-testid="page-contact">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6" data-testid="text-contact-hero-title">
            Contact Us
          </h1>
          <p className="text-xl max-w-3xl mx-auto" data-testid="text-contact-hero-description">
            Have questions about KBE competitions? Need help with registration or training programs? We're here to help you on your scientific journey.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8" data-testid="text-get-in-touch-title">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8" data-testid="text-get-in-touch-description">
                We're always excited to hear from young scientists and their families. Reach out to us through any of the following channels:
              </p>
              
              <div className="space-y-6">
                {contactOptions.map((option, index) => {
                  // Define color classes based on option color to avoid dynamic class name issues
                  const getIconBackgroundClass = (color: string) => {
                    switch (color) {
                      case 'slate':
                        return 'bg-slate-600';
                      case 'gray':
                        return 'bg-gray-600';
                      case 'zinc':
                        return 'bg-zinc-600';
                      case 'neutral':
                        return 'bg-neutral-600';
                      default:
                        return 'bg-slate-600';
                    }
                  };
                  
                  return (
                    <div key={option.title} className="flex items-center" data-testid={`contact-info-${index}`}>
                      <div className={`${getIconBackgroundClass(option.color)} text-white w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                        <option.icon className="h-6 w-6" data-testid={`icon-${option.title.toLowerCase()}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg" data-testid={`text-${option.title.toLowerCase()}-title`}>
                          {option.title}
                        </h4>
                        <p className="text-gray-600" data-testid={`text-${option.title.toLowerCase()}-content`}>
                          {option.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Additional Contact Info */}
              <div className="mt-12 p-6 bg-gradient-to-r from-kbe-blue/10 to-kbe-purple/10 rounded-lg">
                <h4 className="font-semibold text-lg mb-4 flex items-center" data-testid="text-quick-response-title">
                  <MessageSquare className="h-5 w-5 mr-2 text-kbe-blue" />
                  Quick Response Promise
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li data-testid="text-response-general">• General inquiries: Within 24 hours</li>
                  <li data-testid="text-response-registration">• Registration support: Within 4 hours</li>
                  <li data-testid="text-response-technical">• Technical issues: Within 2 hours</li>
                  <li data-testid="text-response-urgent">• Urgent matters: Call us directly</li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg" data-testid="card-contact-form">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center" data-testid="text-contact-form-title">
                    <Send className="h-6 w-6 mr-2 text-kbe-blue" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter first name" {...field} data-testid="input-first-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter last name" {...field} data-testid="input-last-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter email address" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gradeLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Grade Level (if student)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-grade-level">
                                  <SelectValue placeholder="Select grade level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Grade I (Classes V-VII)">Grade I (Classes V-VII)</SelectItem>
                                <SelectItem value="Grade II (Classes VIII-X)">Grade II (Classes VIII-X)</SelectItem>
                                <SelectItem value="Grade III (Classes XI-XII+)">Grade III (Classes XI-XII+)</SelectItem>
                                <SelectItem value="Parent/Guardian">Parent/Guardian</SelectItem>
                                <SelectItem value="Teacher">Teacher</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={5}
                                placeholder="Tell us how we can help you..."
                                {...field}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-kbe-blue hover:bg-blue-700 text-white font-semibold py-3"
                        disabled={contactMutation.isPending}
                        data-testid="button-send-message"
                      >
                        {contactMutation.isPending ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-faq-description">
              Find quick answers to common questions about KBE competitions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg" data-testid={`card-faq-${index}`}>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-3 text-kbe-purple" data-testid={`text-faq-question-${index}`}>
                    {faq.question}
                  </h4>
                  <p className="text-gray-600" data-testid={`text-faq-answer-${index}`}>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4" data-testid="text-more-questions">
              Still have questions?
            </p>
            <Button 
              size="lg"
              className="bg-kbe-orange hover:bg-orange-600 text-white"
              data-testid="button-contact-directly"
            >
              Contact Us Directly
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-location-title">
              Our Location
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-location-description">
              Visit our office in Nashik for in-person consultations
            </p>
          </div>
          
          <Card className="border-0 shadow-lg overflow-hidden" data-testid="card-location-map">
            <CardContent className="p-0">
              <div className="bg-gray-200 h-96 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-kbe-blue mx-auto mb-4" data-testid="icon-map-placeholder" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid="text-map-title">
                    KBE Competition Center
                  </h3>
                  <p className="text-gray-600 max-w-md" data-testid="text-map-address">
                    {CONTACT_INFO.address}
                  </p>
                  <Button 
                    className="mt-4 bg-kbe-blue hover:bg-blue-700"
                    data-testid="button-get-directions"
                  >
                    Get Directions
                  </Button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-kbe-blue/10 to-kbe-purple/10"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
