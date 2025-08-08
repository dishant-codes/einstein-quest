import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertRegistrationSchema } from "@shared/schema";
import { EXAM_GRADES } from "@/lib/constants";
import { Calendar, Clock, Users, Award, CheckCircle } from "lucide-react";
import { z } from "zod";

const registrationFormSchema = insertRegistrationSchema.extend({
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gradeLevel: z.string().min(1, "Please select a grade level"),
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  parentPhone: z.string().min(10, "Parent phone must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  examType: z.string().min(1, "Please select an exam type"),
});

type RegistrationFormData = z.infer<typeof registrationFormSchema>;

const examSchedule = [
  { type: "KBE-Mains", date: "19th March, 2024", registration: "15th Feb - 15th March, 2023" },
  { type: "KBE-Advance", date: "21st May, 2024", registration: "15th March - 15th May, 2023" },
];

const syllabusStructure = [
  { category: "Current Year (Math + Science PCB)", weightage: "50%", questions: 50, marks: 100 },
  { category: "Hot Questions (Olympiad base)", weightage: "25%", questions: 25, marks: 50 },
  { category: "Einstein's (Biography & Research)", weightage: "25%", questions: 25, marks: 50 },
];

export default function Exams() {
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Exam Registration - KBE Young Scientist Competition";
  }, []);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      studentName: "",
      email: "",
      phone: "",
      gradeLevel: "",
      schoolName: "",
      parentName: "",
      parentPhone: "",
      address: "",
      examType: "",
    },
  });

  const registrationMutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      return await apiRequest("POST", "/api/registrations", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Your exam registration has been submitted successfully. You will receive a confirmation email shortly.",
      });
      form.reset();
      setIsRegistrationOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/registrations"] });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    registrationMutation.mutate(data);
  };

  return (
    <div className="pt-16" data-testid="page-exams">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6" data-testid="text-exams-hero-title">
            KBE Examination System
          </h1>
          <p className="text-xl max-w-3xl mx-auto" data-testid="text-exams-hero-description">
            Challenge yourself across three grade levels and compete with young scientists nationwide. Win amazing prizes and scholarships!
          </p>
        </div>
      </section>

      {/* Exam Grades */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-grade-levels-title">
              Grade Levels & Fees
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-grade-levels-description">
              Choose your competition level and register today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXAM_GRADES.map((grade, index) => (
              <Card 
                key={grade.id}
                className="border-2 border-gray-200 hover:border-kbe-blue transition-colors card-hover"
                data-testid={`card-grade-${grade.id}`}
              >
                <CardHeader>
                  <Badge className={`bg-${grade.color} text-white w-fit`} data-testid={`badge-${grade.id}`}>
                    {grade.title}
                  </Badge>
                  <CardTitle className="text-2xl" data-testid={`text-${grade.id}-classes`}>
                    {grade.classes}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6" data-testid={`text-${grade.id}-description`}>
                    {grade.description}
                  </p>
                  <div className="text-3xl font-bold text-kbe-orange mb-6" data-testid={`text-${grade.id}-price`}>
                    ₹{grade.price}/-
                  </div>
                  <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className={`w-full bg-${grade.color} hover:opacity-90 text-white`}
                        onClick={() => {
                          setSelectedGrade(grade.id);
                          form.setValue("gradeLevel", grade.title);
                        }}
                        data-testid={`button-register-${grade.id}`}
                      >
                        Register Now
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Schedule */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-exam-schedule-title">
              Exam Schedule
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-exam-schedule-description">
              Important dates for KBE examinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {examSchedule.map((exam, index) => (
              <Card key={exam.type} className="border-0 shadow-lg" data-testid={`card-exam-${index}`}>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-8 w-8 text-kbe-blue mr-3" />
                    <h3 className="text-2xl font-bold" data-testid={`text-exam-type-${index}`}>{exam.type}</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-lg" data-testid={`text-exam-date-${index}`}>
                        Exam Date: <strong>{exam.date}</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-lg" data-testid={`text-registration-period-${index}`}>
                        Registration: <strong>{exam.registration}</strong>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus & Exam Pattern */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-syllabus-title">
              Syllabus & Exam Pattern
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-syllabus-description">
              Comprehensive breakdown of exam structure and weightage
            </p>
          </div>
          
          <Card className="border-0 shadow-lg" data-testid="card-syllabus">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left font-semibold" data-testid="text-syllabus-header-category">Syllabus</th>
                      <th className="px-6 py-4 text-left font-semibold" data-testid="text-syllabus-header-weightage">Weightage</th>
                      <th className="px-6 py-4 text-left font-semibold" data-testid="text-syllabus-header-questions">No. Qs</th>
                      <th className="px-6 py-4 text-left font-semibold" data-testid="text-syllabus-header-marks">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syllabusStructure.map((item, index) => (
                      <tr key={index} className="border-t" data-testid={`row-syllabus-${index}`}>
                        <td className="px-6 py-4" data-testid={`text-syllabus-category-${index}`}>{item.category}</td>
                        <td className="px-6 py-4 font-semibold text-kbe-blue" data-testid={`text-syllabus-weightage-${index}`}>{item.weightage}</td>
                        <td className="px-6 py-4" data-testid={`text-syllabus-questions-${index}`}>{item.questions}</td>
                        <td className="px-6 py-4" data-testid={`text-syllabus-marks-${index}`}>{item.marks}</td>
                      </tr>
                    ))}
                    <tr className="border-t bg-gray-50 font-semibold" data-testid="row-syllabus-total">
                      <td className="px-6 py-4" data-testid="text-syllabus-total-label">Total</td>
                      <td className="px-6 py-4 text-kbe-orange" data-testid="text-syllabus-total-weightage">100%</td>
                      <td className="px-6 py-4" data-testid="text-syllabus-total-questions">100</td>
                      <td className="px-6 py-4" data-testid="text-syllabus-total-marks">200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-4 flex items-center" data-testid="text-additional-benefits-title">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Additional Benefits
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li data-testid="text-benefit-certificate">• Participation certificate & Space Research Book for each participant</li>
                  <li data-testid="text-benefit-prizes">• Special prizes for first 3 winners with Einstein's Medal, Trophy & Scholarships</li>
                  <li data-testid="text-benefit-isro">• ISRO tour opportunity for winners</li>
                  <li data-testid="text-benefit-equipment">• Scientific equipment prizes (Telescope, Microscope, Binoculars)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-registration">
          <DialogHeader>
            <DialogTitle data-testid="text-registration-dialog-title">
              KBE Exam Registration
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-registration">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student name" {...field} data-testid="input-student-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email address" {...field} data-testid="input-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} data-testid="input-phone" />
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
                      <FormLabel>Grade Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-grade-level">
                            <SelectValue placeholder="Select grade level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Grade I">Grade I (Classes V-VII)</SelectItem>
                          <SelectItem value="Grade II">Grade II (Classes VIII-X)</SelectItem>
                          <SelectItem value="Grade III">Grade III (Classes XI-XII+)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter school name" {...field} data-testid="input-school-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter parent name" {...field} data-testid="input-parent-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="parentPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter parent phone" {...field} data-testid="input-parent-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter complete address" {...field} data-testid="textarea-address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="examType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-exam-type">
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mains">KBE-Mains</SelectItem>
                        <SelectItem value="advance">KBE-Advance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRegistrationOpen(false)}
                  className="flex-1"
                  data-testid="button-cancel-registration"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-kbe-blue hover:bg-blue-700"
                  disabled={registrationMutation.isPending}
                  data-testid="button-submit-registration"
                >
                  {registrationMutation.isPending ? "Submitting..." : "Register Now"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
