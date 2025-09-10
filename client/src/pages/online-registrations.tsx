import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiClient, handleApiError } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

export default function RegistrationsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("candidate");
  const [isLoading, setIsLoading] = useState(false);

  // School Registration State
  const [schoolForm, setSchoolForm] = useState({
    schoolName: "",
    schoolAddress: "",
    area: "",
    locality: "",
    street: "",
    village: "",
    town: "",
    city: "",
    state: "",
    pinCode: "",
    udiseCode: "",
    contactNumber: "",
    principalName: "",
    principalContact: "",
    schoolType: "",
    totalStudents: "",
    studentsByGrade: {}
  });

  // Mentor Registration State
  const [mentorForm, setMentorForm] = useState({
    schoolCode: "",
    mentorName: "",
    address: "",
    contact: "",
    subjectTeaching: "",
    workExperience: "",
    activitiesParticipated: "",
    opinionOnISRO: ""
  });

  // Candidate Registration State
  const [candidateForm, setCandidateForm] = useState({
    mentorCode: "",
    fullName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    dateOfBirth: "",
    religion: "",
    region: "",
    motherTongue: "",
    isOrphan: false,
    addressLine1: "",
    addressLine2: "",
    village: "",
    taluka: "",
    district: "",
    state: "",
    pinCode: "",
    schoolName: "",
    standard: "",
    medium: "",
    board: "",
    kbeCategory: "",
    kbeStage: "",
    fees: "",
    photoUrl: "",
    signatureUrl: ""
  });

  const [isSubmitting, setIsSubmitting] = useState({
    school: false,
    mentor: false,
    candidate: false
  });

  // Form submission handlers
  const handleSchoolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(prev => ({ ...prev, school: true }));
    
    try {
      // Prepare school data for API
        const schoolData = {
          schoolName: schoolForm.schoolName,
          schoolAddress: {
            addressLine1: schoolForm.schoolAddress,
            area: schoolForm.area,
            locality: schoolForm.locality,
            street: schoolForm.street,
            village: schoolForm.village,
            town: schoolForm.town,
            city: schoolForm.city || schoolForm.town || schoolForm.area,
            district: "Unknown",
            state: schoolForm.state,
            pinCode: schoolForm.pinCode,
            country: "India",
          },
          udiseCode: schoolForm.udiseCode,
          contact: {
            phone: schoolForm.contactNumber,
          },
          principal: {
            name: schoolForm.principalName,
            contact: {
              phone: schoolForm.principalContact,
            },
          },
          schoolType: schoolForm.schoolType,
          medium: ["English"], // Default for now
          board: "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)", // Default
          establishedYear: 2000, // Default
          totalStudents: parseInt(schoolForm.totalStudents) || 0,
          facilities: [],
          previousParticipation: false,
        };

        // Call API
        const response = await apiClient.registerSchool(schoolData);

        toast({
          title: "School Registration Completed!",
          description: `School Code: ${response.schoolCode}`,
        });

      // Reset form
      setSchoolForm({
        schoolName: "",
        schoolAddress: "",
        area: "",
        locality: "",
        street: "",
        village: "",
        town: "",
        city: "",
        state: "",
        pinCode: "",
        udiseCode: "",
        contactNumber: "",
        principalName: "",
        principalContact: "",
        schoolType: "",
        totalStudents: "",
        studentsByGrade: {}
      });

    } catch (error) {
      toast({
        title: "❌ Registration Failed",
        description: handleApiError(error).message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(prev => ({ ...prev, school: false }));
    }
  };

  const handleMentorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(prev => ({ ...prev, mentor: true }));
    
    try {
      // Prepare mentor data for API
        const mentorData = {
          schoolCode: mentorForm.schoolCode,
          personalInfo: {
            fullName: mentorForm.mentorName,
            fatherName: "Unknown", // Would need to add to form
            motherName: "Unknown", // Would need to add to form
            dateOfBirth: new Date("1990-01-01"), // Default
            gender: "Male", // Default
            religion: "Hindu", // Default
            motherTongue: "Marathi", // Default
          },
          contact: {
            phone: mentorForm.contact,
          },
          address: {
            addressLine1: mentorForm.address,
            city: "Unknown",
            district: "Unknown",
            state: "Maharashtra",
            pinCode: "000000",
            country: "India",
          },
          professionalInfo: {
            designation: "Teacher",
            subjectTeaching: [mentorForm.subjectTeaching],
            qualification: "Graduate",
            workExperience: parseInt(mentorForm.workExperience) || 0,
            totalExperience: parseInt(mentorForm.workExperience) || 0,
            currentSchoolExperience: parseInt(mentorForm.workExperience) || 0,
          },
          kbeInfo: {
            activitiesParticipated: mentorForm.activitiesParticipated,
            opinionOnISRO: mentorForm.opinionOnISRO,
            previousMentoring: false,
            studentsGuided: 0,
          },
        };

        // Call API
        const response = await apiClient.registerMentor(mentorData);

        toast({
          title: "Mentor Registration Completed!",
          description: `Mentor Code: ${response.mentorCode}`,
        });

      // Reset form
      setMentorForm({
        schoolCode: "",
        mentorName: "",
        address: "",
        contact: "",
        subjectTeaching: "",
        workExperience: "",
        activitiesParticipated: "",
        opinionOnISRO: ""
      });

    } catch (error) {
      toast({
        title: "❌ Registration Failed",
        description: handleApiError(error),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(prev => ({ ...prev, mentor: false }));
    }
  };

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(prev => ({ ...prev, candidate: true }));
    
    try {
      // Prepare candidate data for API
        const candidateData = {
          schoolCode: "SCH0001", // Would need to get from mentor
          mentorCode: candidateForm.mentorCode,
          personalInfo: {
            fullName: candidateForm.fullName,
            fatherName: candidateForm.fatherName,
            motherName: candidateForm.motherName,
            dateOfBirth: new Date(candidateForm.dateOfBirth),
            gender: candidateForm.gender,
            religion: candidateForm.religion,
            region: candidateForm.region,
            motherTongue: candidateForm.motherTongue,
          },
          orphanDetails: {
            isOrphan: candidateForm.isOrphan,
          },
          contact: {
            phone: "0000000000", // Would need to add to form
          },
          permanentAddress: {
            addressLine1: candidateForm.addressLine1,
            addressLine2: candidateForm.addressLine2,
            village: candidateForm.village,
            taluka: candidateForm.taluka,
            city: candidateForm.village || "Unknown",
            district: candidateForm.district,
            state: candidateForm.state,
            pinCode: candidateForm.pinCode,
            country: "India",
          },
          educationalInfo: {
            schoolName: candidateForm.schoolName,
            currentStandard: parseInt(candidateForm.standard),
            medium: candidateForm.medium,
            board: candidateForm.board,
          },
          kbeDetails: {
            category: candidateForm.kbeCategory,
            stage: candidateForm.kbeStage || "Mains",
          },
          documents: {
            photo: candidateForm.photoUrl || "https://example.com/photo.jpg",
            signature: candidateForm.signatureUrl || "https://example.com/signature.jpg",
          },
        };

        // Call API
        const response = await apiClient.registerCandidate(candidateData);

        toast({
          title: "Candidate Registration Completed!",
          description: `Seat Number: ${response.seatNumber}. Fee Amount: ₹${response.feeAmount}`,
        });

      // Reset form
      setCandidateForm({
        mentorCode: "",
        fullName: "",
        fatherName: "",
        motherName: "",
        gender: "",
        dateOfBirth: "",
        religion: "",
        region: "",
        motherTongue: "",
        isOrphan: false,
        addressLine1: "",
        addressLine2: "",
        village: "",
        taluka: "",
        district: "",
        state: "",
        pinCode: "",
        schoolName: "",
        standard: "",
        medium: "",
        board: "",
        kbeCategory: "",
        kbeStage: "",
        fees: "",
        photoUrl: "",
        signatureUrl: ""
      });

    } catch (error) {
      toast({
        title: "❌ Registration Failed",
        description: handleApiError(error),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(prev => ({ ...prev, candidate: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 sm:pt-20 md:pt-24 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            KBE 2025 - Online Registration
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4">
            Kaun Banega Einstein Registration System - Choose your registration type below
          </p>
          <div className="inline-flex items-center px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-xs sm:text-sm text-red-800 font-medium">
              📅 Registration Deadline: 30th October 2025
            </span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 h-auto sm:h-10 p-1">
            <TabsTrigger 
              value="candidate" 
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-1.5 text-xs sm:text-sm font-medium"
            >
              <span className="text-lg sm:text-base">🎓</span>
              <span>Candidate Registration</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mentor" 
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-1.5 text-xs sm:text-sm font-medium"
            >
              <span className="text-lg sm:text-base">👨‍🏫</span>
              <span>Mentor Registration</span>
            </TabsTrigger>
            <TabsTrigger 
              value="school" 
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-1.5 text-xs sm:text-sm font-medium"
            >
              <span className="text-lg sm:text-base">🏫</span>
              <span>School Registration</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Candidate Registration - Now First */}
          <TabsContent value="candidate" className="space-y-4 mt-4 sm:mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-lg sm:text-xl">🎓 Candidate Registration</span>
                  <Badge className="bg-purple-100 text-purple-800 w-fit">Most Popular</Badge>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Students register using the mentor code. You'll receive your hall ticket and seat number.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleCandidateSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="mentorCode" className="text-sm font-medium">Mentor Code *</Label>
                    <Input
                      id="mentorCode"
                      placeholder="Enter mentor code received from your teacher"
                      value={candidateForm.mentorCode}
                      onChange={(e) => setCandidateForm({...candidateForm, mentorCode: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={candidateForm.fullName}
                        onChange={(e) => setCandidateForm({...candidateForm, fullName: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fatherName" className="text-sm font-medium">Father's Name *</Label>
                      <Input
                        id="fatherName"
                        value={candidateForm.fatherName}
                        onChange={(e) => setCandidateForm({...candidateForm, fatherName: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="motherName" className="text-sm font-medium">Mother's Name *</Label>
                      <Input
                        id="motherName"
                        value={candidateForm.motherName}
                        onChange={(e) => setCandidateForm({...candidateForm, motherName: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender" className="text-sm font-medium">Gender *</Label>
                      <Select onValueChange={(value) => setCandidateForm({...candidateForm, gender: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={candidateForm.dateOfBirth}
                        onChange={(e) => setCandidateForm({...candidateForm, dateOfBirth: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="standard" className="text-sm font-medium">Class/Standard *</Label>
                      <Select onValueChange={(value) => setCandidateForm({...candidateForm, standard: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">Class V</SelectItem>
                          <SelectItem value="6">Class VI</SelectItem>
                          <SelectItem value="7">Class VII</SelectItem>
                          <SelectItem value="8">Class VIII</SelectItem>
                          <SelectItem value="9">Class IX</SelectItem>
                          <SelectItem value="10">Class X</SelectItem>
                          <SelectItem value="11">Class XI</SelectItem>
                          <SelectItem value="12">Class XII</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="board" className="text-sm font-medium">Board *</Label>
                      <Select onValueChange={(value) => setCandidateForm({...candidateForm, board: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)">Maharashtra State Board (MSBSHSE)</SelectItem>
                          <SelectItem value="Central Board of Secondary Education (CBSE)">CBSE</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    disabled={isSubmitting.candidate}
                  >
                    {isSubmitting.candidate ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Registration...
                      </>
                    ) : (
                      "🎯 Complete Candidate Registration"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* School Registration */}
          <TabsContent value="school" className="space-y-4 mt-4 sm:mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-lg sm:text-xl">🏫 School Registration</span>
                  <Badge className="bg-blue-100 text-blue-800 w-fit">Step 1</Badge>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Register your school to participate in KBE 2025. You'll receive a unique school code for mentor registrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSchoolSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schoolName" className="text-sm font-medium">School Name *</Label>
                      <Input
                        id="schoolName"
                        value={schoolForm.schoolName}
                        onChange={(e) => setSchoolForm({...schoolForm, schoolName: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="udiseCode" className="text-sm font-medium">UDISE Code</Label>
                      <Input
                        id="udiseCode"
                        value={schoolForm.udiseCode}
                        onChange={(e) => setSchoolForm({...schoolForm, udiseCode: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="schoolAddress" className="text-sm font-medium">School Address *</Label>
                    <Textarea
                      id="schoolAddress"
                      value={schoolForm.schoolAddress}
                      onChange={(e) => setSchoolForm({...schoolForm, schoolAddress: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                      <Input
                        id="city"
                        value={schoolForm.city}
                        onChange={(e) => setSchoolForm({...schoolForm, city: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                      <Input
                        id="state"
                        value={schoolForm.state}
                        onChange={(e) => setSchoolForm({...schoolForm, state: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pinCode" className="text-sm font-medium">PIN Code *</Label>
                      <Input
                        id="pinCode"
                        value={schoolForm.pinCode}
                        onChange={(e) => setSchoolForm({...schoolForm, pinCode: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="principalName" className="text-sm font-medium">Principal Name *</Label>
                      <Input
                        id="principalName"
                        value={schoolForm.principalName}
                        onChange={(e) => setSchoolForm({...schoolForm, principalName: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactNumber" className="text-sm font-medium">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        value={schoolForm.contactNumber}
                        onChange={(e) => setSchoolForm({...schoolForm, contactNumber: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={isSubmitting.school}
                  >
                    {isSubmitting.school ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Registration...
                      </>
                    ) : (
                      "🏫 Complete School Registration"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mentor Registration */}
          <TabsContent value="mentor" className="space-y-4 mt-4 sm:mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-lg sm:text-xl">👨‍🏫 Mentor Registration</span>
                  <Badge className="bg-green-100 text-green-800 w-fit">Step 2</Badge>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Teachers/mentors register using the school code. You'll receive a mentor code for candidate registrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleMentorSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="schoolCode" className="text-sm font-medium">School Code *</Label>
                    <Input
                      id="schoolCode"
                      placeholder="Enter school code received after school registration"
                      value={mentorForm.schoolCode}
                      onChange={(e) => setMentorForm({...mentorForm, schoolCode: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mentorName" className="text-sm font-medium">Mentor Name *</Label>
                      <Input
                        id="mentorName"
                        value={mentorForm.mentorName}
                        onChange={(e) => setMentorForm({...mentorForm, mentorName: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact" className="text-sm font-medium">Contact Number *</Label>
                      <Input
                        id="contact"
                        value={mentorForm.contact}
                        onChange={(e) => setMentorForm({...mentorForm, contact: e.target.value})}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">Address *</Label>
                    <Textarea
                      id="address"
                      value={mentorForm.address}
                      onChange={(e) => setMentorForm({...mentorForm, address: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subjectTeaching" className="text-sm font-medium">Subject Teaching *</Label>
                    <Input
                      id="subjectTeaching"
                      value={mentorForm.subjectTeaching}
                      onChange={(e) => setMentorForm({...mentorForm, subjectTeaching: e.target.value})}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 text-base font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    disabled={isSubmitting.mentor}
                  >
                    {isSubmitting.mentor ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Registration...
                      </>
                    ) : (
                      "👨‍🏫 Complete Mentor Registration"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  );
}
