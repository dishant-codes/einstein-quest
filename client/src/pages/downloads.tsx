import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  FileText, 
  Award, 
  Search, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  User,
  Calendar,
  Phone
} from "lucide-react";

interface CandidateData {
  candidateCode: string;
  personalDetails: {
    fullName: string;
    fatherName: string;
    motherName: string;
    dateOfBirth: string;
  };
  contactDetails: {
    phoneNumber: string;
  };
  hallTicketReleased: boolean;
  certificateReleased?: boolean;
  examDate?: string;
  centerName?: string;
}

export default function Downloads() {
  const [step, setStep] = useState<'search' | 'verify' | 'download'>('search');
  const [loading, setLoading] = useState(false);
  const [candidateCode, setCandidateCode] = useState('');
  const [motherName, setMotherName] = useState('');
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
  const [downloadType, setDownloadType] = useState<'hallticket' | 'certificate'>('hallticket');
  const { toast } = useToast();

  const searchCandidate = async () => {
    if (!candidateCode.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your candidate registration number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/candidates/search/${candidateCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Candidate not found');
      }

      setCandidateData(data.data);
      setStep('verify');
    } catch (error) {
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Failed to find candidate",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyAndDownload = async () => {
    if (!motherName.trim()) {
      toast({
        title: "Verification Required",
        description: "Please enter your mother's name for verification",
        variant: "destructive",
      });
      return;
    }

    if (!candidateData) return;

    // Verify mother's name (case-insensitive)
    const enteredName = motherName.trim().toLowerCase();
    const actualName = candidateData.personalDetails.motherName.toLowerCase();

    if (enteredName !== actualName) {
      toast({
        title: "Verification Failed",
        description: "Mother's name does not match our records. Please check and try again.",
        variant: "destructive",
      });
      return;
    }

    // Check if requested document is available
    if (downloadType === 'hallticket' && !candidateData.hallTicketReleased) {
      toast({
        title: "Hall Ticket Not Available",
        description: "Your hall ticket has not been released yet. Please check back later.",
        variant: "destructive",
      });
      return;
    }

    if (downloadType === 'certificate' && !candidateData.certificateReleased) {
      toast({
        title: "Certificate Not Available",
        description: "Your certificate has not been released yet. Please check back later.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const endpoint = downloadType === 'hallticket' ? 'hall-ticket' : 'certificate';
      const response = await fetch(`/api/candidates/${candidateData.candidateCode}/download/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ motherName: motherName.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Download failed');
      }

      // Create blob and download file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${candidateData.candidateCode}_${downloadType}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Successful",
        description: `Your ${downloadType === 'hallticket' ? 'hall ticket' : 'certificate'} has been downloaded successfully.`,
      });

      setStep('download');
    } catch (error) {
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download document",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('search');
    setCandidateCode('');
    setMotherName('');
    setCandidateData(null);
    setDownloadType('hallticket');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Einstein Quest Downloads
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download your hall ticket and certificate securely with mother's name verification
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="w-6 h-6" />
              Secure Document Download Portal
            </CardTitle>
            <CardDescription className="text-blue-100">
              Enter your details to download your documents safely
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {/* Step 1: Search Candidate */}
            {step === 'search' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <Search className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Step 1: Enter Registration Details</h3>
                    <p className="text-sm text-gray-600">Enter your candidate registration number to proceed</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="candidateCode" className="text-base font-medium">
                      Candidate Registration Number *
                    </Label>
                    <Input
                      id="candidateCode"
                      value={candidateCode}
                      onChange={(e) => setCandidateCode(e.target.value.toUpperCase())}
                      placeholder="Enter your registration number (e.g., KBE1234567890)"
                      className="text-lg p-3"
                      maxLength={20}
                    />
                    <p className="text-sm text-gray-500">
                      Registration number as mentioned in your registration confirmation
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="downloadType" className="text-base font-medium">
                      Download Type *
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setDownloadType('hallticket')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          downloadType === 'hallticket'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <FileText className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-semibold">Hall Ticket</div>
                        <div className="text-sm opacity-75">Download exam hall ticket</div>
                      </button>
                      <button
                        onClick={() => setDownloadType('certificate')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          downloadType === 'certificate'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Award className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-semibold">Certificate</div>
                        <div className="text-sm opacity-75">Download achievement certificate</div>
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={searchCandidate} 
                  disabled={loading}
                  className="w-full py-3 text-lg"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Search Candidate
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Step 2: Verify Identity */}
            {step === 'verify' && candidateData && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Step 2: Verify Your Identity</h3>
                    <p className="text-sm text-gray-600">Confirm your mother's name to download the document</p>
                  </div>
                </div>

                {/* Candidate Info Card */}
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Candidate Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {candidateData.personalDetails.fullName}
                      </div>
                      <div>
                        <span className="font-medium">Father's Name:</span> {candidateData.personalDetails.fatherName}
                      </div>
                      <div>
                        <span className="font-medium">Registration No.:</span> {candidateData.candidateCode}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">Mobile:</span> {candidateData.contactDetails.phoneNumber}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Document Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className={`border-2 ${candidateData.hallTicketReleased ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                    <CardContent className="p-4 text-center">
                      <FileText className={`w-8 h-8 mx-auto mb-2 ${candidateData.hallTicketReleased ? 'text-green-600' : 'text-gray-400'}`} />
                      <div className="font-semibold">Hall Ticket</div>
                      <div className={`text-sm ${candidateData.hallTicketReleased ? 'text-green-600' : 'text-gray-500'}`}>
                        {candidateData.hallTicketReleased ? 'Available' : 'Not Released'}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className={`border-2 ${candidateData.certificateReleased ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                    <CardContent className="p-4 text-center">
                      <Award className={`w-8 h-8 mx-auto mb-2 ${candidateData.certificateReleased ? 'text-green-600' : 'text-gray-400'}`} />
                      <div className="font-semibold">Certificate</div>
                      <div className={`text-sm ${candidateData.certificateReleased ? 'text-green-600' : 'text-gray-500'}`}>
                        {candidateData.certificateReleased ? 'Available' : 'Not Released'}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="motherName" className="text-base font-medium">
                      Mother's Name (For Verification) *
                    </Label>
                    <Input
                      id="motherName"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      placeholder="Enter your mother's full name as registered"
                      className="text-lg p-3"
                    />
                    <p className="text-sm text-gray-500">
                      Enter the exact name as provided during registration
                    </p>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your mother's name will be verified against our records for security purposes.
                      Make sure to enter the exact name as provided during registration.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={resetForm} 
                    variant="outline"
                    className="flex-1"
                  >
                    Back to Search
                  </Button>
                  <Button 
                    onClick={verifyAndDownload} 
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Verify & Download
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Download Success */}
            {step === 'download' && candidateData && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Successful!</h3>
                  <p className="text-gray-600">
                    Your {downloadType === 'hallticket' ? 'hall ticket' : 'certificate'} has been downloaded successfully.
                  </p>
                </div>
                <Card className="bg-blue-50 border border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Downloaded Document:</h4>
                    <p className="text-sm text-gray-600">
                      File: {candidateData.candidateCode}_{downloadType}.pdf
                    </p>
                    <p className="text-sm text-gray-600">
                      Please check your downloads folder
                    </p>
                  </CardContent>
                </Card>
                <Button onClick={resetForm} className="w-full" variant="outline">
                  Download Another Document
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Need Help?
            </h3>
            <div className="text-sm text-orange-700 space-y-2">
              <p>• Make sure your registration number is correct and complete</p>
              <p>• Mother's name must match exactly as provided during registration</p>
              <p>• Documents are available only after official release by the administration</p>
              <p>• If you face any issues, please contact the examination authority</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}