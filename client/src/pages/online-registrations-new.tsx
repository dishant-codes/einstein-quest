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
import { apiClient, handleApiError, isDemoMode, generateDemoResponse } from "@/lib/api-client";
import { Loader2, Upload, AlertCircle, CheckCircle, School, Users, GraduationCap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Types based on the provided schemas
interface SchoolRegistration {
  schoolName: string;
  address: {
    area: string;
    locality: string;
    street: string;
    village: string;
    town: string;
    city: string;
    state: string;
    pin: string;
  };
  udiseCode: string;
  contact: string;
  principal: {
    name: string;
    contact: string;
  };
  schoolType: 'Primary' | 'Secondary' | 'Higher Secondary' | '';
  studentCount: {
    [key: string]: { boys: number; girls: number };
  };
}

interface MentorRegistration {
  schoolCode: string;
  name: string;
  address: string;
  contact: string;
  subjectTeaching: string;
  workExperience: number;
  activitiesParticipated: string;
  opinionOnISRO: string;
}

interface CandidateRegistration {
  mentorCode: string;
  personalDetails: {
    fullName: string;
    fatherName: string;
    motherName: string;
    gender: 'Male' | 'Female' | 'Other' | '';
    dateOfBirth: string;
    religion: string;
    region: 'Urban' | 'Rural' | '';
    motherTongue: string;
  };
  orphanDetails: {
    isOrphan: boolean;
  };
  permanentAddress: {
    addressLines: string;
    village: string;
    taluka: string;
    district: string;
    state: string;
    pin: string;
  };
  educationalDetails: {
    schoolName: string;
    standard: '5th' | '6th' | '7th' | '8th' | '9th' | '10th' | '11th' | '12th' | '';
    medium: 'Marathi' | 'Semi-English' | 'English' | 'Other' | '';
    board: 'Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)' | 'Central Board of Secondary Education (CBSE)' | 'Other' | '';
    kbeCategory: 'Prime' | 'Sec' | 'High' | '';
    kbeStageParticipated: string;
    fees: number;
  };
  documents: {
    photo: File | null;
    signature: File | null;
  };
}

export default function NewRegistrationsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("school");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    code?: string;
  }>({ type: null, message: '' });

  // School Registration State
  const [schoolForm, setSchoolForm] = useState<SchoolRegistration>({
    schoolName: "",
    address: {
      area: "",
      locality: "",
      street: "",
      village: "",
      town: "",
      city: "",
      state: "",
      pin: ""
    },
    udiseCode: "",
    contact: "",
    principal: {
      name: "",
      contact: ""
    },
    schoolType: "",
    studentCount: {}
  });

  // Mentor Registration State
  const [mentorForm, setMentorForm] = useState<MentorRegistration>({
    schoolCode: "",
    name: "",
    address: "",
    contact: "",
    subjectTeaching: "",
    workExperience: 0,
    activitiesParticipated: "",
    opinionOnISRO: ""
  });

  // Candidate Registration State
  const [candidateForm, setCandidateForm] = useState<CandidateRegistration>({
    mentorCode: "",
    personalDetails: {
      fullName: "",
      fatherName: "",
      motherName: "",
      gender: "",
      dateOfBirth: "",
      religion: "",
      region: "",
      motherTongue: ""
    },
    orphanDetails: {
      isOrphan: false
    },
    permanentAddress: {
      addressLines: "",
      village: "",
      taluka: "",
      district: "",
      state: "",
      pin: ""
    },
    educationalDetails: {
      schoolName: "",
      standard: "",
      medium: "",
      board: "",
      kbeCategory: "",
      kbeStageParticipated: "",
      fees: 0
    },
    documents: {
      photo: null,
      signature: null
    }
  });

  // Student count for different standards
  const standards = ['standard1', 'standard2', 'standard3', 'standard4', 'standard5', 'standard6', 'standard7', 'standard8', 'standard9', 'standard10', 'standard11', 'standard12'];

  // Validation functions
  const validateContact = (contact: string) => /^\d{10}$/.test(contact);
  const validatePin = (pin: string) => /^\d{6}$/.test(pin);
  const validateUdiseCode = (code: string) => code.length > 0;

  // School form handlers
  const handleSchoolInputChange = (field: string, value: string, nested?: string) => {
    setSchoolForm(prev => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...(prev[nested as keyof SchoolRegistration] as any),
            [field]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleStudentCountChange = (standard: string, gender: 'boys' | 'girls', value: string) => {
    const numValue = parseInt(value) || 0;
    setSchoolForm(prev => ({
      ...prev,
      studentCount: {
        ...prev.studentCount,
        [standard]: {
          boys: prev.studentCount[standard]?.boys || 0,
          girls: prev.studentCount[standard]?.girls || 0,
          [gender]: numValue
        }
      }
    }));
  };

  // Mentor form handlers
  const handleMentorInputChange = (field: keyof MentorRegistration, value: string | number) => {
    setMentorForm(prev => ({ ...prev, [field]: value }));
  };

  // Candidate form handlers
  const handleCandidateInputChange = (section: string, field: string, value: any) => {
    setCandidateForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof CandidateRegistration] as any,
        [field]: value
      }
    }));
  };

  const handleFileUpload = (field: 'photo' | 'signature', file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please select a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setCandidateForm(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  // Registration submission handlers
  const handleSchoolRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistrationStatus({ type: null, message: '' });

    try {
      // Validation
      if (!validateContact(schoolForm.contact)) {
        throw new Error("Contact number must be exactly 10 digits");
      }
      if (!validateContact(schoolForm.principal.contact)) {
        throw new Error("Principal contact number must be exactly 10 digits");
      }
      if (!validatePin(schoolForm.address.pin)) {
        throw new Error("PIN code must be exactly 6 digits");
      }
      if (!validateUdiseCode(schoolForm.udiseCode)) {
        throw new Error("UDISE code is required");
      }

      let result;
      if (isDemoMode()) {
        result = generateDemoResponse('school');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      } else {
        result = await apiClient.registerSchool(schoolForm);
      }

      setRegistrationStatus({
        type: 'success',
        message: `School registered successfully! Your school code is: ${result.schoolCode || 'SCH' + Date.now()}`,
        code: result.schoolCode || 'SCH' + Date.now()
      });

      // Reset form
      setSchoolForm({
        schoolName: "",
        address: { area: "", locality: "", street: "", village: "", town: "", city: "", state: "", pin: "" },
        udiseCode: "",
        contact: "",
        principal: { name: "", contact: "" },
        schoolType: "",
        studentCount: {}
      });

      toast({
        title: "Success!",
        description: "School registration completed successfully",
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      setRegistrationStatus({
        type: 'error',
        message: errorMessage
      });
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMentorRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistrationStatus({ type: null, message: '' });

    try {
      // Validation
      if (!validateContact(mentorForm.contact)) {
        throw new Error("Contact number must be exactly 10 digits");
      }
      if (!mentorForm.schoolCode) {
        throw new Error("School code is required");
      }

      let result;
      if (isDemoMode()) {
        result = generateDemoResponse('mentor');
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        result = await apiClient.registerMentor(mentorForm);
      }

      setRegistrationStatus({
        type: 'success',
        message: `Mentor registered successfully! Your mentor code is: ${result.mentorCode || 'MEN' + Date.now()}`,
        code: result.mentorCode || 'MEN' + Date.now()
      });

      // Reset form
      setMentorForm({
        schoolCode: "",
        name: "",
        address: "",
        contact: "",
        subjectTeaching: "",
        workExperience: 0,
        activitiesParticipated: "",
        opinionOnISRO: ""
      });

      toast({
        title: "Success!",
        description: "Mentor registration completed successfully",
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      setRegistrationStatus({
        type: 'error',
        message: errorMessage
      });
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCandidateRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistrationStatus({ type: null, message: '' });

    try {
      // Validation
      if (!validatePin(candidateForm.permanentAddress.pin)) {
        throw new Error("PIN code must be exactly 6 digits");
      }
      if (!candidateForm.mentorCode) {
        throw new Error("Mentor code is required");
      }
      if (!candidateForm.documents.photo || !candidateForm.documents.signature) {
        throw new Error("Both photo and signature documents are required");
      }

      // Check enrollment deadline (30th October 2025)
      const deadline = new Date('2025-10-30');
      if (new Date() > deadline) {
        throw new Error("Registration deadline (30th October 2025) has passed");
      }

      let result;
      if (isDemoMode()) {
        result = generateDemoResponse('candidate');
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        // Upload documents first
        const formData = new FormData();
        formData.append('photo', candidateForm.documents.photo);
        formData.append('signature', candidateForm.documents.signature);
        
        const uploadResult = await apiClient.uploadCandidateDocuments(formData);
        
        // Register candidate with document paths
        const candidateData = {
          ...candidateForm,
          documents: {
            photo: uploadResult.photoPath || '',
            signature: uploadResult.signaturePath || ''
          }
        };
        
        result = await apiClient.registerCandidate(candidateData);
      }

      setRegistrationStatus({
        type: 'success',
        message: `Candidate registered successfully! Candidate ID: ${result.candidateId || 'KBE' + Date.now()}, Seat Number: ${result.seatNumber || '2025' + Math.floor(Math.random() * 99999)}`,
        code: `${result.candidateId || 'KBE' + Date.now()} | ${result.seatNumber || '2025' + Math.floor(Math.random() * 99999)}`
      });

      // Reset form
      setCandidateForm({
        mentorCode: "",
        personalDetails: {
          fullName: "", fatherName: "", motherName: "", gender: "", dateOfBirth: "",
          religion: "", region: "", motherTongue: ""
        },
        orphanDetails: { isOrphan: false },
        permanentAddress: { addressLines: "", village: "", taluka: "", district: "", state: "", pin: "" },
        educationalDetails: {
          schoolName: "", standard: "", medium: "", board: "", kbeCategory: "",
          kbeStageParticipated: "", fees: 0
        },
        documents: { photo: null, signature: null }
      });

      toast({
        title: "Success!",
        description: "Candidate registration completed successfully",
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      setRegistrationStatus({
        type: 'error',
        message: errorMessage
      });
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            KBE 2025 - Registration Portal
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Kaun Banega Einstein Registration System
          </p>
          <Badge variant="outline" className="text-red-600 border-red-600">
            Registration Deadline: 30th October 2025
          </Badge>
        </div>

        {registrationStatus.type && (
          <Alert className={`mb-6 ${registrationStatus.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            {registrationStatus.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertDescription>
              {registrationStatus.message}
              {registrationStatus.code && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono">
                  Code: {registrationStatus.code}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="school" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              School Registration
            </TabsTrigger>
            <TabsTrigger value="mentor" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Mentor Registration
            </TabsTrigger>
            <TabsTrigger value="candidate" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Candidate Registration
            </TabsTrigger>
          </TabsList>

          {/* School Registration Form */}
          <TabsContent value="school">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  School Registration
                </CardTitle>
                <CardDescription>
                  Register your school to get a unique school code for mentor registrations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSchoolRegistration} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="schoolName">School Name *</Label>
                        <Input
                          id="schoolName"
                          value={schoolForm.schoolName}
                          onChange={(e) => handleSchoolInputChange('schoolName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="udiseCode">UDISE Code *</Label>
                        <Input
                          id="udiseCode"
                          value={schoolForm.udiseCode}
                          onChange={(e) => handleSchoolInputChange('udiseCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact">School Contact *</Label>
                        <Input
                          id="contact"
                          type="tel"
                          maxLength={10}
                          value={schoolForm.contact}
                          onChange={(e) => handleSchoolInputChange('contact', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="schoolType">School Type *</Label>
                        <Select value={schoolForm.schoolType} onValueChange={(value) => handleSchoolInputChange('schoolType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select school type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Primary">Primary</SelectItem>
                            <SelectItem value="Secondary">Secondary</SelectItem>
                            <SelectItem value="Higher Secondary">Higher Secondary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Address Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="area">Area *</Label>
                        <Input
                          id="area"
                          value={schoolForm.address.area}
                          onChange={(e) => handleSchoolInputChange('area', e.target.value, 'address')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="locality">Locality *</Label>
                        <Input
                          id="locality"
                          value={schoolForm.address.locality}
                          onChange={(e) => handleSchoolInputChange('locality', e.target.value, 'address')}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="street">Street *</Label>
                        <Input
                          id="street"
                          value={schoolForm.address.street}
                          onChange={(e) => handleSchoolInputChange('street', e.target.value, 'address')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="village">Village *</Label>
                        <Input
                          id="village"
                          value={schoolForm.address.village}
                          onChange={(e) => handleSchoolInputChange('village', e.target.value, 'address')}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="town">Town *</Label>
                        <Input
                          id="town"
                          value={schoolForm.address.town}
                          onChange={(e) => handleSchoolInputChange('town', e.target.value, 'address')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={schoolForm.address.city}
                          onChange={(e) => handleSchoolInputChange('city', e.target.value, 'address')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={schoolForm.address.state}
                          onChange={(e) => handleSchoolInputChange('state', e.target.value, 'address')}
                          required
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-1/3">
                      <Label htmlFor="pin">PIN Code *</Label>
                      <Input
                        id="pin"
                        type="text"
                        maxLength={6}
                        value={schoolForm.address.pin}
                        onChange={(e) => handleSchoolInputChange('pin', e.target.value, 'address')}
                        required
                      />
                    </div>
                  </div>

                  {/* Principal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Principal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="principalName">Principal Name *</Label>
                        <Input
                          id="principalName"
                          value={schoolForm.principal.name}
                          onChange={(e) => handleSchoolInputChange('name', e.target.value, 'principal')}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="principalContact">Principal Contact *</Label>
                        <Input
                          id="principalContact"
                          type="tel"
                          maxLength={10}
                          value={schoolForm.principal.contact}
                          onChange={(e) => handleSchoolInputChange('contact', e.target.value, 'principal')}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Student Count (Optional) */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Student Count (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {standards.map((standard) => (
                        <div key={standard} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">{standard.replace('standard', 'Standard ')}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor={`${standard}-boys`}>Boys</Label>
                              <Input
                                id={`${standard}-boys`}
                                type="number"
                                min="0"
                                value={schoolForm.studentCount[standard]?.boys || ''}
                                onChange={(e) => handleStudentCountChange(standard, 'boys', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`${standard}-girls`}>Girls</Label>
                              <Input
                                id={`${standard}-girls`}
                                type="number"
                                min="0"
                                value={schoolForm.studentCount[standard]?.girls || ''}
                                onChange={(e) => handleStudentCountChange(standard, 'girls', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering School...
                      </>
                    ) : (
                      'Register School'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mentor Registration Form */}
          <TabsContent value="mentor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Mentor Registration
                </CardTitle>
                <CardDescription>
                  Register as a mentor using your school code to guide candidates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMentorRegistration} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schoolCode">School Code *</Label>
                      <Input
                        id="schoolCode"
                        value={mentorForm.schoolCode}
                        onChange={(e) => handleMentorInputChange('schoolCode', e.target.value)}
                        placeholder="Enter your school code"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="mentorName">Mentor Name *</Label>
                      <Input
                        id="mentorName"
                        value={mentorForm.name}
                        onChange={(e) => handleMentorInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mentorAddress">Address *</Label>
                    <Textarea
                      id="mentorAddress"
                      value={mentorForm.address}
                      onChange={(e) => handleMentorInputChange('address', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mentorContact">Contact Number *</Label>
                      <Input
                        id="mentorContact"
                        type="tel"
                        maxLength={10}
                        value={mentorForm.contact}
                        onChange={(e) => handleMentorInputChange('contact', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="workExperience">Work Experience (Years) *</Label>
                      <Input
                        id="workExperience"
                        type="number"
                        min="0"
                        value={mentorForm.workExperience}
                        onChange={(e) => handleMentorInputChange('workExperience', parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subjectTeaching">Subject Teaching *</Label>
                    <Input
                      id="subjectTeaching"
                      value={mentorForm.subjectTeaching}
                      onChange={(e) => handleMentorInputChange('subjectTeaching', e.target.value)}
                      placeholder="e.g., Physics, Mathematics, Science"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="activitiesParticipated">Activities Participated *</Label>
                    <Textarea
                      id="activitiesParticipated"
                      value={mentorForm.activitiesParticipated}
                      onChange={(e) => handleMentorInputChange('activitiesParticipated', e.target.value)}
                      rows={3}
                      placeholder="Describe your participation in educational activities, competitions, etc."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="opinionOnISRO">Opinion on ISRO *</Label>
                    <Textarea
                      id="opinionOnISRO"
                      value={mentorForm.opinionOnISRO}
                      onChange={(e) => handleMentorInputChange('opinionOnISRO', e.target.value)}
                      rows={3}
                      placeholder="Share your thoughts about ISRO and space exploration"
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering Mentor...
                      </>
                    ) : (
                      'Register Mentor'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>