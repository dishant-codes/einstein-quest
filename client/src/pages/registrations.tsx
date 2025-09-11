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
import { Loader2, AlertCircle, CheckCircle, School, Users, GraduationCap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewRegistrationsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("school");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    details?: string[];
    code?: string;
  }>({ type: null, message: '' });

  // School Registration State
  const [schoolForm, setSchoolForm] = useState({
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
    schoolType: ""
  });

  // Mentor Registration State
  const [mentorForm, setMentorForm] = useState({
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
  const [candidateForm, setCandidateForm] = useState({
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
      photo: null as File | null,
      signature: null as File | null
    }
  });

  // Validation functions
  const validateContact = (contact: string) => /^\d{10}$/.test(contact);
  const validatePin = (pin: string) => /^\d{6}$/.test(pin);

  // School form handlers
  const handleSchoolInputChange = (field: string, value: string, nested?: string) => {
    setSchoolForm(prev => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...(prev[nested as keyof typeof prev] as any),
            [field]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  // Mentor form handlers
  const handleMentorInputChange = (field: string, value: string | number) => {
    setMentorForm(prev => ({ ...prev, [field]: value }));
  };

  // Candidate form handlers
  const handleCandidateInputChange = (section: string, field: string, value: any) => {
    setCandidateForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const handleFileUpload = (field: 'photo' | 'signature', file: File) => {
    console.log('File upload for:', field, file.name, file.size);
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setCandidateForm(prev => {
      const updated = {
        ...prev,
        documents: {
          ...prev.documents,
          [field]: file
        }
      };
      console.log('Updated candidate form documents:', updated.documents);
      return updated;
    });
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

      const result = await apiClient.registerSchool(schoolForm);

      // Extract the actual school code from the server response
      const actualSchoolCode = result.schoolCode || result.data?.schoolCode || result.code;
      
      setRegistrationStatus({
        type: 'success',
        message: `School registered successfully! Your school code is: ${actualSchoolCode}`,
        code: actualSchoolCode
      });

      // Clear the form after successful registration
      setSchoolForm({
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
        schoolType: ""
      });

      toast({
        title: "Success!",
        description: "School registration completed successfully",
      });
    } catch (error) {
      const { message, details } = handleApiError(error);
      setRegistrationStatus({
        type: 'error',
        message,
        details
      });
      toast({
        title: "School Registration Failed",
        description: message,
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
      if (!validateContact(mentorForm.contact)) {
        throw new Error("Contact number must be exactly 10 digits");
      }

      const result = await apiClient.registerMentor(mentorForm);

      // Extract the actual mentor code from the server response
      const actualMentorCode = result.mentorCode || result.data?.mentorCode || result.code;

      setRegistrationStatus({
        type: 'success',
        message: `Mentor registered successfully! Your mentor code is: ${actualMentorCode}`,
        code: actualMentorCode
      });

      // Clear the form after successful registration
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
      const { message, details } = handleApiError(error);
      setRegistrationStatus({
        type: 'error',
        message,
        details
      });
      toast({
        title: "Mentor Registration Failed",
        description: message,
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
      // Comprehensive validation
      const validationErrors = [];

      // Mentor Code validation
      if (!candidateForm.mentorCode.trim()) {
        validationErrors.push("Mentor code is required");
      }

      // Personal Details validation
      if (!candidateForm.personalDetails.fullName.trim()) {
        validationErrors.push("Full name is required");
      }
      if (!candidateForm.personalDetails.fatherName.trim()) {
        validationErrors.push("Father name is required");
      }
      if (!candidateForm.personalDetails.motherName.trim()) {
        validationErrors.push("Mother name is required");
      }
      if (!candidateForm.personalDetails.gender) {
        validationErrors.push("Valid gender is required");
      }
      if (!candidateForm.personalDetails.dateOfBirth) {
        validationErrors.push("Valid date of birth is required");
      }
      if (!candidateForm.personalDetails.religion.trim()) {
        validationErrors.push("Religion is required");
      }
      if (!candidateForm.personalDetails.region) {
        validationErrors.push("Valid region is required");
      }
      if (!candidateForm.personalDetails.motherTongue.trim()) {
        validationErrors.push("Mother tongue is required");
      }

      // Address validation
      if (!candidateForm.permanentAddress.addressLines.trim()) {
        validationErrors.push("Address is required");
      }
      if (!candidateForm.permanentAddress.village.trim()) {
        validationErrors.push("Village is required");
      }
      if (!candidateForm.permanentAddress.taluka.trim()) {
        validationErrors.push("Taluka is required");
      }
      if (!candidateForm.permanentAddress.district.trim()) {
        validationErrors.push("District is required");
      }
      if (!candidateForm.permanentAddress.state.trim()) {
        validationErrors.push("State is required");
      }
      if (!validatePin(candidateForm.permanentAddress.pin)) {
        validationErrors.push("PIN must be 6 digits");
      }

      // Educational Details validation
      if (!candidateForm.educationalDetails.schoolName.trim()) {
        validationErrors.push("School name is required");
      }
      if (!candidateForm.educationalDetails.standard) {
        validationErrors.push("Valid standard is required");
      }
      if (!candidateForm.educationalDetails.medium) {
        validationErrors.push("Valid medium is required");
      }
      if (!candidateForm.educationalDetails.board) {
        validationErrors.push("Board is required");
      }
      if (!candidateForm.educationalDetails.kbeCategory) {
        validationErrors.push("Valid KBE category is required");
      }
      if (!candidateForm.educationalDetails.kbeStageParticipated.trim()) {
        validationErrors.push("KBE stage is required");
      }
      if (!candidateForm.educationalDetails.fees || candidateForm.educationalDetails.fees <= 0) {
        validationErrors.push("Fees must be a number");
      }

      // Document validation
      console.log('Documents check:', {
        photo: candidateForm.documents.photo,
        signature: candidateForm.documents.signature,
        photoExists: !!candidateForm.documents.photo,
        signatureExists: !!candidateForm.documents.signature
      });
      
      if (!candidateForm.documents.photo || !candidateForm.documents.signature) {
        validationErrors.push("Both photo and signature documents are required");
      }

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
      }

      // Check enrollment deadline
      const deadline = new Date('2025-10-30');
      if (new Date() > deadline) {
        throw new Error("Registration deadline (30th October 2025) has passed");
      }

      // Generate a proper candidate ID for the request
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 5).toUpperCase();
      const candidateId = `KBE${timestamp}${random}`;
      
      console.log('Generated candidateId:', candidateId);

      // Create FormData to include files with the registration data
      const formData = new FormData();
      
      // Add candidate ID and mentor code
      formData.append('candidateId', candidateId);
      formData.append('mentorCode', candidateForm.mentorCode);
      
      console.log('FormData candidateId:', formData.get('candidateId'));
      console.log('FormData mentorCode:', formData.get('mentorCode'));
      
      // Add personal details as individual fields
      formData.append('personalDetails[fullName]', candidateForm.personalDetails.fullName);
      formData.append('personalDetails[fatherName]', candidateForm.personalDetails.fatherName);
      formData.append('personalDetails[motherName]', candidateForm.personalDetails.motherName);
      formData.append('personalDetails[gender]', candidateForm.personalDetails.gender);
      formData.append('personalDetails[dateOfBirth]', candidateForm.personalDetails.dateOfBirth);
      formData.append('personalDetails[religion]', candidateForm.personalDetails.religion);
      formData.append('personalDetails[region]', candidateForm.personalDetails.region);
      formData.append('personalDetails[motherTongue]', candidateForm.personalDetails.motherTongue);
      
      // Add orphan details
      formData.append('orphanDetails[isOrphan]', candidateForm.orphanDetails.isOrphan.toString());
      
      // Add permanent address as individual fields
      formData.append('permanentAddress[addressLines]', candidateForm.permanentAddress.addressLines);
      formData.append('permanentAddress[village]', candidateForm.permanentAddress.village);
      formData.append('permanentAddress[taluka]', candidateForm.permanentAddress.taluka);
      formData.append('permanentAddress[district]', candidateForm.permanentAddress.district);
      formData.append('permanentAddress[state]', candidateForm.permanentAddress.state);
      formData.append('permanentAddress[pin]', candidateForm.permanentAddress.pin);
      
      // Add educational details as individual fields
      formData.append('educationalDetails[schoolName]', candidateForm.educationalDetails.schoolName);
      formData.append('educationalDetails[standard]', candidateForm.educationalDetails.standard);
      formData.append('educationalDetails[medium]', candidateForm.educationalDetails.medium);
      formData.append('educationalDetails[board]', candidateForm.educationalDetails.board);
      formData.append('educationalDetails[kbeCategory]', candidateForm.educationalDetails.kbeCategory);
      formData.append('educationalDetails[kbeStageParticipated]', candidateForm.educationalDetails.kbeStageParticipated);
      formData.append('educationalDetails[fees]', candidateForm.educationalDetails.fees.toString());
      
      // Add files (with type guards)
      if (candidateForm.documents.photo) {
        formData.append('photo', candidateForm.documents.photo);
      }
      if (candidateForm.documents.signature) {
        formData.append('signature', candidateForm.documents.signature);
      }
      
      // Make API call with FormData
      const result = await apiClient.registerCandidateWithFiles(formData);
      
      console.log('Registration result:', result);

      // Use the candidateId returned from server, or fall back to generated ID
      const finalCandidateId = result.candidateId || result.candidateCode || result.data?.candidateId || result.data?.candidateCode || candidateId;

      setRegistrationStatus({
        type: 'success',
        message: `Candidate registered successfully! Candidate ID: ${finalCandidateId}`,
        code: finalCandidateId
      });

      // Clear the form after successful registration
      setCandidateForm({
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
          photo: null as File | null,
          signature: null as File | null
        }
      });

      toast({
        title: "Success!",
        description: "Candidate registration completed successfully",
      });
    } catch (error) {
      const { message, details } = handleApiError(error);
      setRegistrationStatus({
        type: 'error',
        message,
        details
      });
      toast({
        title: "Candidate Registration Failed",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 sm:pt-20 md:pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl mt-5 sm:text-4xl font-bold text-gray-900 mb-4">
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
          <Alert className={`mb-6 ${registrationStatus.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
            {registrationStatus.type === 'success' 
              ? <CheckCircle className="h-5 w-5 text-green-600" /> 
              : <AlertCircle className="h-5 w-5 text-red-600" />
            }
            <AlertDescription className="space-y-2">
              <p className={`font-semibold ${registrationStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {registrationStatus.message}
              </p>
              
              {/* Show detailed error messages if available */}
              {registrationStatus.type === 'error' && registrationStatus.details && (
                <ul className="list-disc pl-5 text-sm text-red-700 space-y-1 mt-2">
                  {registrationStatus.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
              
              {registrationStatus.code && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono border border-gray-300">
                  <span className="font-semibold">Your Code:</span> {registrationStatus.code}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 h-auto sm:h-12 p-1 bg-gray-100 rounded-lg">
            <TabsTrigger 
              value="school" 
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-2 px-4 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 hover:bg-gray-50"
            >
              <School className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-center">School Registration</span>
              {/* <Badge className="ml-1 bg-blue-100 text-blue-800 text-xs">Step 1</Badge> */}
            </TabsTrigger>
            <TabsTrigger 
              value="mentor" 
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-2 px-4 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600 hover:bg-gray-50"
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-center">Mentor Registration</span>
              {/* <Badge className="ml-1 bg-green-100 text-green-800 text-xs">Step 2</Badge> */}
            </TabsTrigger>
            <TabsTrigger 
              value="candidate" 
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-2 px-4 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600 hover:bg-gray-50"
            >
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-center">Candidate Registration</span>
              {/* <Badge className="ml-1 bg-purple-100 text-purple-800 text-xs">Step 3</Badge> */}
            </TabsTrigger>
          </TabsList>

          {/* School Registration Form */}
          <TabsContent value="school" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="flex items-center gap-2 text-lg sm:text-xl">
                    <School className="h-5 w-5 text-blue-600" />
                    School Registration
                  </span>
                  {/* <Badge className="bg-blue-100 text-blue-800 w-fit">Step 1</Badge> */}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Register your school to get a unique school code for mentor registrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSchoolRegistration} className="space-y-4 sm:space-y-6">
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

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <div>
                        <Label htmlFor="street">Street *</Label>
                        <Input
                          id="street"
                          value={schoolForm.address.street}
                          onChange={(e) => handleSchoolInputChange('street', e.target.value, 'address')}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="village">Village *</Label>
                        <Input
                          id="village"
                          value={schoolForm.address.village}
                          onChange={(e) => handleSchoolInputChange('village', e.target.value, 'address')}
                          required
                        />
                      </div>
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={schoolForm.address.state}
                          onChange={(e) => handleSchoolInputChange('state', e.target.value, 'address')}
                          required
                        />
                      </div>
                      <div>
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
                  </div>

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
          <TabsContent value="mentor" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="flex items-center gap-2 text-lg sm:text-xl">
                    <Users className="h-5 w-5 text-green-600" />
                    Mentor Registration
                  </span>
                  {/* <Badge className="bg-green-100 text-green-800 w-fit">Step 2</Badge> */}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Register as a mentor using your school code to guide candidates.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleMentorRegistration} className="space-y-4 sm:space-y-6">
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
                      <Label htmlFor="subjectTeaching">Subject Teaching *</Label>
                      <Input
                        id="subjectTeaching"
                        value={mentorForm.subjectTeaching}
                        onChange={(e) => handleMentorInputChange('subjectTeaching', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="activitiesParticipated">Activities Participated *</Label>
                    <Textarea
                      id="activitiesParticipated"
                      value={mentorForm.activitiesParticipated}
                      onChange={(e) => handleMentorInputChange('activitiesParticipated', e.target.value)}
                      rows={3}
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
                      placeholder="Share your thoughts about ISRO's contributions to space exploration and education..."
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

          {/* Candidate Registration Form */}
          <TabsContent value="candidate" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="flex items-center gap-2 text-lg sm:text-xl">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    Candidate Registration
                  </span>
                  {/* <Badge className="bg-purple-100 text-purple-800 w-fit">Step 3</Badge> */}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Register as a candidate using your mentor code to participate in KBE 2025.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleCandidateRegistration} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="candidateMentorCode">Mentor Code *</Label>
                    <Input
                      id="candidateMentorCode"
                      value={candidateForm.mentorCode}
                      onChange={(e) => setCandidateForm(prev => ({ ...prev, mentorCode: e.target.value }))}
                      placeholder="Enter your mentor code"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={candidateForm.personalDetails.fullName}
                          onChange={(e) => handleCandidateInputChange('personalDetails', 'fullName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="fatherName">Father's Name *</Label>
                        <Input
                          id="fatherName"
                          value={candidateForm.personalDetails.fatherName}
                          onChange={(e) => handleCandidateInputChange('personalDetails', 'fatherName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="motherName">Mother's Name *</Label>
                        <Input
                          id="motherName"
                          value={candidateForm.personalDetails.motherName}
                          onChange={(e) => handleCandidateInputChange('personalDetails', 'motherName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={candidateForm.personalDetails.gender} onValueChange={(value) => handleCandidateInputChange('personalDetails', 'gender', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={candidateForm.personalDetails.dateOfBirth}
                          onChange={(e) => handleCandidateInputChange('personalDetails', 'dateOfBirth', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="religion">Religion *</Label>
                        <Input
                          id="religion"
                          value={candidateForm.personalDetails.religion}
                          onChange={(e) => handleCandidateInputChange('personalDetails', 'religion', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="region">Region *</Label>
                        <Select value={candidateForm.personalDetails.region} onValueChange={(value) => handleCandidateInputChange('personalDetails', 'region', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Urban">Urban</SelectItem>
                            <SelectItem value="Rural">Rural</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="motherTongue">Mother Tongue *</Label>
                        <Input
                          id="motherTongue"
                          value={candidateForm.personalDetails.motherTongue}
                          onChange={(e) => handleCandidateInputChange('personalDetails', 'motherTongue', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Orphan Details</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isOrphan"
                        checked={candidateForm.orphanDetails.isOrphan}
                        onCheckedChange={(checked) => handleCandidateInputChange('orphanDetails', 'isOrphan', checked)}
                      />
                      <Label htmlFor="isOrphan">Is the candidate an orphan?</Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="addressLines">Address *</Label>
                        <Textarea
                          id="addressLines"
                          value={candidateForm.permanentAddress.addressLines}
                          onChange={(e) => handleCandidateInputChange('permanentAddress', 'addressLines', e.target.value)}
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="village">Village *</Label>
                        <Input
                          id="village"
                          value={candidateForm.permanentAddress.village}
                          onChange={(e) => handleCandidateInputChange('permanentAddress', 'village', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="taluka">Taluka *</Label>
                        <Input
                          id="taluka"
                          value={candidateForm.permanentAddress.taluka}
                          onChange={(e) => handleCandidateInputChange('permanentAddress', 'taluka', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="district">District *</Label>
                        <Input
                          id="district"
                          value={candidateForm.permanentAddress.district}
                          onChange={(e) => handleCandidateInputChange('permanentAddress', 'district', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={candidateForm.permanentAddress.state}
                          onChange={(e) => handleCandidateInputChange('permanentAddress', 'state', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="candidatePin">PIN Code *</Label>
                        <Input
                          id="candidatePin"
                          type="text"
                          maxLength={6}
                          value={candidateForm.permanentAddress.pin}
                          onChange={(e) => handleCandidateInputChange('permanentAddress', 'pin', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Educational Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="schoolName">School Name *</Label>
                        <Input
                          id="schoolName"
                          value={candidateForm.educationalDetails.schoolName}
                          onChange={(e) => handleCandidateInputChange('educationalDetails', 'schoolName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="standard">Standard/Class *</Label>
                        <Select value={candidateForm.educationalDetails.standard} onValueChange={(value) => handleCandidateInputChange('educationalDetails', 'standard', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select standard" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5th">5th Standard</SelectItem>
                            <SelectItem value="6th">6th Standard</SelectItem>
                            <SelectItem value="7th">7th Standard</SelectItem>
                            <SelectItem value="8th">8th Standard</SelectItem>
                            <SelectItem value="9th">9th Standard</SelectItem>
                            <SelectItem value="10th">10th Standard</SelectItem>
                            <SelectItem value="11th">11th Standard</SelectItem>
                            <SelectItem value="12th">12th Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="medium">Medium of Instruction *</Label>
                        <Select value={candidateForm.educationalDetails.medium} onValueChange={(value) => handleCandidateInputChange('educationalDetails', 'medium', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select medium" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Marathi">Marathi</SelectItem>
                            <SelectItem value="Semi-English">Semi-English</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="board">Board *</Label>
                        <Select value={candidateForm.educationalDetails.board} onValueChange={(value) => handleCandidateInputChange('educationalDetails', 'board', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select board" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)">Maharashtra State Board (MSBSHSE)</SelectItem>
                            <SelectItem value="Central Board of Secondary Education (CBSE)">CBSE</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="kbeCategory">KBE Category *</Label>
                        <Select value={candidateForm.educationalDetails.kbeCategory} onValueChange={(value) => handleCandidateInputChange('educationalDetails', 'kbeCategory', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select KBE category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Prime">Prime</SelectItem>
                            <SelectItem value="Sec">Sec</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="kbeStageParticipated">KBE Stage Participated *</Label>
                        <Input
                          id="kbeStageParticipated"
                          value={candidateForm.educationalDetails.kbeStageParticipated}
                          onChange={(e) => handleCandidateInputChange('educationalDetails', 'kbeStageParticipated', e.target.value)}
                          placeholder="e.g., School Level, District Level, State Level"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="fees">Registration Fees *</Label>
                        <Input
                          id="fees"
                          type="number"
                          min="0"
                          value={candidateForm.educationalDetails.fees}
                          onChange={(e) => handleCandidateInputChange('educationalDetails', 'fees', parseInt(e.target.value) || 0)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="photo">Photo * (Max 5MB)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('photo', file);
                            }}
                            required
                          />
                          {candidateForm.documents.photo && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="signature">Signature * (Max 5MB)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="signature"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('signature', file);
                            }}
                            required
                          />
                          {candidateForm.documents.signature && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering Candidate...
                      </>
                    ) : (
                      'Register Candidate'
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
