import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  LogOut, 
  Users, 
  UserCheck, 
  GraduationCap, 
  Activity,
  AlertCircle,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  Download,
  Check,
  X,
  Search,
  Filter,
  FileText,
  MessageSquare,
  Send,
  Phone,
  Edit,
  Trash2,
  Eye,
  Plus,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface DashboardStats {
  totalCandidates: number;
  totalMentors: number;
  totalSchools: number;
  activeCandidates: number;
}

interface DashboardData {
  stats: DashboardStats;
}

interface Candidate {
  id: string;
  candidateId: string;
  name: string;
  category: string;
  stage: string;
  center: string;
  contact: string;
  photo?: string;
  signature?: string;
  feesPaid: boolean;
  hallTicketReleased: boolean;
  certificateReleased: boolean;
  seatNumber?: string;
  examTime?: string;
}

// Candidate Management Component
function CandidateManager() {
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch candidates from API
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`/api/admin/candidates?filter=${filterStatus}&search=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch candidates');
      }

      setCandidates(data.data.candidates || []);
      setFilteredCandidates(data.data.candidates || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load candidates",
        variant: "destructive",
      });
      // Set empty array on error
      setCandidates([]);
      setFilteredCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Refetch data when search or filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCandidates();
    }, 300); // Debounce API calls

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterStatus]);

  const updateCandidateStatus = (id: string, updates: Partial<Candidate>) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    toast({
      title: "Candidate Updated",
      description: "Candidate information has been updated successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Candidate Management</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <Input
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Candidates</SelectItem>
            <SelectItem value="paid">Fees Paid</SelectItem>
            <SelectItem value="unpaid">Fees Unpaid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Candidates Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Center</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.candidateId}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{candidate.category}</Badge>
                </TableCell>
                <TableCell>{candidate.center}</TableCell>
                <TableCell>{candidate.contact}</TableCell>
                <TableCell>
                  {candidate.feesPaid ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">Paid</Badge>
                  ) : (
                    <Badge variant="destructive">Unpaid</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Mentor Management Component
function MentorManager() {
  const { toast } = useToast();
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch mentors from API
  const fetchMentors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/admin/mentors', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch mentors');
      }

      setMentors(data.data.mentors || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load mentors",
        variant: "destructive",
      });
      // Set empty array on error
      setMentors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Mentor Management</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Mentor
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading mentors...</p>
                </TableCell>
              </TableRow>
            ) : mentors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No mentors found
                </TableCell>
              </TableRow>
            ) : (
              mentors.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell className="font-medium">{mentor.mentorCode}</TableCell>
                  <TableCell>{mentor.name}</TableCell>
                  <TableCell>{mentor.email}</TableCell>
                  <TableCell>{mentor.mobile}</TableCell>
                  <TableCell className="text-sm">{mentor.location}</TableCell>
                  <TableCell>
                    <Badge variant={mentor.isActive ? "default" : "secondary"}>
                      {mentor.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// SMS Manager Component
function SMSManager() {
  const { toast } = useToast();
  const [recipients, setRecipients] = useState<'all' | 'paid' | 'unpaid' | 'hall-ticket'>('all');
  const [messageType, setMessageType] = useState<'status' | 'hall-ticket' | 'certificate' | 'custom'>('status');
  const [customMessage, setCustomMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [smsHistory, setSmsHistory] = useState<any[]>([]);
  const [singlePhoneNumber, setSinglePhoneNumber] = useState("");
  const [sendMode, setSendMode] = useState<'bulk' | 'single'>('bulk');

  const messageTemplates = {
    status: "Dear Candidate, your KBE-2025 application status has been updated. Please visit our portal and enter your Candidate ID and OTP to check your updated status. - KBE Team",
    'hall-ticket': "Dear Candidate, your KBE-2025 Hall Ticket is now available! Please visit our portal and enter your Candidate ID and OTP to download your hall ticket. - KBE Team",
    certificate: "Congratulations! Your KBE-2025 certificate is now ready for download. Please visit our portal and enter your Candidate ID and OTP to download your certificate. - KBE Team"
  };

  const sendSMS = async () => {
    if (messageType === 'custom' && !customMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a custom message.",
        variant: "destructive",
      });
      return;
    }

    if (sendMode === 'single' && !singlePhoneNumber.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const message = messageType === 'custom' ? customMessage : messageTemplates[messageType];
      
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Admin authentication required');
      }

      let response;
      if (sendMode === 'single') {
        // Send single SMS
        response = await fetch(`/api/sms/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            phoneNumber: singlePhoneNumber,
            message: message
          })
        });
      } else {
        // Send bulk SMS using template if not custom
        if (messageType === 'custom') {
          response = await fetch(`/api/sms/send-bulk`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              recipients: recipients,
              message: message,
              messageType: messageType
            })
          });
        } else {
          response = await fetch(`http://localhost:5001/api/sms/send-template`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              recipients: recipients,
              template: messageType,
              data: {}
            })
          });
        }
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "SMS Sent Successfully",
          description: result.message,
        });

        // Add to SMS history
        const historyItem = {
          id: Date.now(),
          type: messageType === 'custom' ? 'Custom Message' : messageTemplates[messageType].split('.')[0] + '...',
          recipients: sendMode === 'single' ? `1 recipient (${singlePhoneNumber})` : `${result.data.successCount || 'Multiple'} recipients`,
          timestamp: new Date().toLocaleString(),
          success: result.data.successCount || 1,
          failed: result.data.failureCount || 0
        };
        setSmsHistory(prev => [historyItem, ...prev.slice(0, 4)]);

        // Reset form
        if (messageType === 'custom') {
          setCustomMessage("");
        }
        if (sendMode === 'single') {
          setSinglePhoneNumber("");
        }
      } else {
        throw new Error(result.message || 'Failed to send SMS');
      }
    } catch (error: any) {
      console.error('SMS send error:', error);
      toast({
        title: "SMS Failed",
        description: error.message || "Failed to send messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">SMS Notifications</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Compose Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Send Mode Toggle */}
            <div>
              <label className="text-sm font-medium">Send Mode</label>
              <div className="flex space-x-2 mt-2">
                <Button
                  variant={sendMode === 'bulk' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSendMode('bulk')}
                  className="flex-1"
                >
                  Bulk SMS
                </Button>
                <Button
                  variant={sendMode === 'single' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSendMode('single')}
                  className="flex-1"
                >
                  Single SMS
                </Button>
              </div>
            </div>

            {sendMode === 'single' ? (
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter phone number (e.g., 9876543210)"
                  value={singlePhoneNumber}
                  onChange={(e) => setSinglePhoneNumber(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Enter 10-digit Indian mobile number</p>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium">Recipients</label>
                <Select value={recipients} onValueChange={(value: any) => setRecipients(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Candidates</SelectItem>
                    <SelectItem value="paid">Paid Candidates</SelectItem>
                    <SelectItem value="unpaid">Unpaid Candidates</SelectItem>
                    <SelectItem value="hall-ticket">Hall Ticket Released</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Message Type</label>
              <Select value={messageType} onValueChange={(value: any) => setMessageType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="status">Application Status Update</SelectItem>
                  <SelectItem value="hall-ticket">Hall Ticket Available</SelectItem>
                  <SelectItem value="certificate">Certificate Available</SelectItem>
                  <SelectItem value="custom">Custom Message</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {messageType === 'custom' ? (
              <div>
                <label className="text-sm font-medium">Custom Message</label>
                <Textarea
                  placeholder="Enter your custom message..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  maxLength={160}
                  rows={4}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">{customMessage.length}/160 characters</p>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium">Message Preview</label>
                <div className="mt-1 p-3 bg-gray-50 border rounded-md text-sm">
                  {messageTemplates[messageType]}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {messageTemplates[messageType].length}/160 characters
                </p>
              </div>
            )}

            {/* SMS Service Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Twilio SMS Service</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Powered by Twilio • Account: ACd0...158 • Service: MG0b...110
              </p>
            </div>

            <Button onClick={sendSMS} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending SMS...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send SMS
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              SMS History & Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {smsHistory.length > 0 ? (
              <div className="space-y-3">
                {smsHistory.map((item) => (
                  <div key={item.id} className="border-l-4 border-blue-500 pl-3">
                    <p className="text-sm font-medium">{item.type}</p>
                    <p className="text-xs text-gray-500">
                      {item.recipients} • {item.timestamp}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        {item.success} sent
                      </span>
                      {item.failed > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          <X className="w-3 h-3 mr-1" />
                          {item.failed} failed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-500">No SMS history yet</p>
                <p className="text-xs text-gray-400">Messages you send will appear here</p>
              </div>
            )}

            {/* SMS Service Status */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Service Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Twilio SMS service is operational
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Hall Ticket Manager Component
function HallTicketManager() {
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch candidates from API (focusing on paid candidates for hall tickets)
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Fetch all candidates and filter on client side for hall ticket management
      const response = await fetch(`/api/admin/candidates?filter=all&search=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch candidates');
      }

      const candidatesData = data.data.candidates || [];
      console.log('Hall Ticket Manager - Total candidates fetched:', candidatesData.length);
      
      // Filter to show only paid candidates for hall ticket management
      const paidCandidates = candidatesData.filter((candidate: Candidate) => candidate.feesPaid);
      console.log('Hall Ticket Manager - Paid candidates:', paidCandidates.length);
      console.log('Hall Ticket Manager - Sample candidate data:', candidatesData.length > 0 ? candidatesData[0] : 'No candidates');
      
      setCandidates(paidCandidates);
      setFilteredCandidates(paidCandidates);
    } catch (error) {
      console.error('Error fetching candidates for hall tickets:', error);
      
      // More detailed error handling
      let errorMessage = "Failed to load candidates";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Hall Ticket Manager Error",
        description: `${errorMessage}. Please check if the server is running and try again.`,
        variant: "destructive",
      });
      setCandidates([]);
      setFilteredCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Refetch when search term changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCandidates();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Filter candidates based on search and status
  useEffect(() => {
    let filtered = candidates;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.candidateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.contact.includes(searchTerm)
      );
    }

    // Status filter for hall ticket management
    if (filterStatus === "released") {
      filtered = filtered.filter(candidate => candidate.hallTicketReleased);
    } else if (filterStatus === "not-released") {
      filtered = filtered.filter(candidate => !candidate.hallTicketReleased);
    }
    // Note: We don't need paid/unpaid filter here since we already filter for paid candidates

    setFilteredCandidates(filtered);
  }, [candidates, searchTerm, filterStatus]);

  const generateHallTicketPDF = async (candidate: Candidate) => {
    setLoading(true);
    try {
      // Generate HTML content for the hall ticket
      const hallTicketHTML = generateHallTicketHTML(candidate);
      
      // Open in new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(hallTicketHTML);
        printWindow.document.close();
        
        // Auto-print after loading
        printWindow.onload = () => {
          printWindow.print();
        };
      }

      // Update candidate status in database
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const response = await fetch(`/api/admin/candidates/${candidate.id}/hall-ticket`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hallTicketReleased: true }),
          });

          const result = await response.json();
          
          if (result.success) {
            console.log('Hall ticket status updated in database:', result.data);
            
            // Update local state only after successful database update
            setCandidates(prev => prev.map(c => 
              c.id === candidate.id 
                ? { ...c, hallTicketReleased: true }
                : c
            ));

            toast({
              title: "Hall Ticket Generated",
              description: `Hall ticket for ${candidate.name} opened for printing and status updated in database.`,
            });
          } else {
            throw new Error(result.message || 'Failed to update database');
          }
        } catch (dbError) {
          console.error('Failed to update hall ticket status in database:', dbError);
          
          // Still update local state for immediate UI feedback, but show warning
          setCandidates(prev => prev.map(c => 
            c.id === candidate.id 
              ? { ...c, hallTicketReleased: true }
              : c
          ));

          toast({
            title: "Hall Ticket Generated",
            description: `Hall ticket generated, but database update failed. Please refresh the page.`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Authentication Error",
          description: "Please login again to update hall ticket status.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hall ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateHallTicketHTML = (candidate: Candidate) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Hall Ticket - ${candidate.candidateId}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
        }
        .hall-ticket {
            max-width: 800px;
            margin: 0 auto;
            border: 3px solid #000;
            padding: 20px;
            background: white;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
        }
        .subtitle {
            font-size: 16px;
            color: #666;
        }
        .content {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        .photo-section {
            width: 120px;
            text-align: center;
        }
        .photo-box {
            width: 100px;
            height: 120px;
            border: 2px solid #000;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            background: #f5f5f5;
        }
        .signature-box {
            width: 100px;
            height: 60px;
            border: 2px solid #000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f5f5;
        }
        .details {
            flex: 1;
        }
        .detail-row {
            display: flex;
            margin-bottom: 12px;
        }
        .detail-label {
            font-weight: bold;
            min-width: 140px;
        }
        .detail-value {
            flex: 1;
        }
        .rules {
            margin-top: 30px;
            border-top: 2px solid #000;
            padding-top: 20px;
        }
        .rules-title {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
        }
        .rule {
            margin-bottom: 8px;
            font-size: 12px;
            line-height: 1.4;
        }
        .footer {
            margin-top: 30px;
            text-align: left;
            border-top: 1px solid #ccc;
            padding-top: 15px;
        }
        .footer-text {
            font-weight: bold;
            font-size: 14px;
        }
        @media print {
            body { margin: 0; }
            .hall-ticket { border: 2px solid #000; }
        }
    </style>
</head>
<body>
    <div class="hall-ticket">
        <div class="header">
            <div class="title">KBE - 2025 HALL TICKET</div>
            <div class="subtitle">Knowledge Based Evaluation</div>
        </div>
        
        <div class="content">
            <div class="photo-section">
                <div class="photo-box">
                    ${candidate.photo ? `<img src="${candidate.photo}" style="max-width: 96px; max-height: 116px;">` : 'PHOTO'}
                </div>
                <div class="signature-box">
                    ${candidate.signature ? `<img src="${candidate.signature}" style="max-width: 96px; max-height: 56px;">` : 'SIGNATURE'}
                </div>
            </div>
            
            <div class="details">
                <div class="detail-row">
                    <div class="detail-label">Candidate's Name:</div>
                    <div class="detail-value">${candidate.name}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Candidate ID:</div>
                    <div class="detail-value">${candidate.candidateId}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Einstein's Centre:</div>
                    <div class="detail-value">${candidate.center}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Seat Number:</div>
                    <div class="detail-value">${candidate.seatNumber || 'TBA'}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">KBE Category:</div>
                    <div class="detail-value">${candidate.category}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">KBE Stage:</div>
                    <div class="detail-value">${candidate.stage}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Contact:</div>
                    <div class="detail-value">${candidate.contact}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Exam Time:</div>
                    <div class="detail-value">${candidate.examTime || 'TBA'}</div>
                </div>
            </div>
        </div>
        
        <div class="rules">
            <div class="rules-title">KBE Exam Hall Rules</div>
            <div class="rule">• KBE Enrolment form should be submitted before 30th October, 2025.</div>
            <div class="rule">• KBE Hall Entry Card will be distributed on 5th November, 2025 (Time: 8 am to 1 pm / 3 pm to 6 pm)</div>
            <div class="rule">• Exam time and Place will be mentioned on Candidates Hall Entry Card.</div>
            <div class="rule">• Candidates are required to bring their own writing material. No borrowing, lending or exchange of any material is allowed during exam.</div>
            <div class="rule">• No mobile phones or electrical gadgets are allowed.</div>
            <div class="rule">• Candidate must be seated at their assigned desks as seat number given on Hall Entry Card. (Hall Entry Card is necessary while entering Exam Hall)</div>
            <div class="rule">• Candidate who are late will not be given Extra Time.</div>
            <div class="rule">• Only Essential materials are allowed on the student's desk.</div>
            <div class="rule">• Exam Pattern:</div>
            <div class="rule" style="margin-left: 20px;">1. Only Multiple Choice Type questions will ask in the exam having four answer options. Candidate must be select only one answer option out of given options.</div>
            <div class="rule" style="margin-left: 20px;">2. Candidate should use OMR sheet only for answering the questions.</div>
            <div class="rule">• All questions will be on the basis of Syllabi pattern given by KBE Control board</div>
            <div class="rule">• Separate question papers will be provided for each category as Prime, Sec & High.</div>
            <div class="rule">• Result of the exam will be published on Website.</div>
            <div class="rule">• Prizes and Awards, qualifying e-certification will be announced on the Result day.</div>
        </div>
        
        <div class="footer" style="text-align:right;">
            <div class="footer-text">KBE -2025</div>
            <div class="footer-text">Chief Secretary</div>
            <div class="footer-text">Maharashtra</div>
        </div>
    </div>
</body>
</html>`;
  };

  const releaseHallTicket = async (candidate: Candidate) => {
    if (!candidate.feesPaid) {
      toast({
        title: "Payment Required",
        description: "Candidate must pay fees before hall ticket can be released.",
        variant: "destructive",
      });
      return;
    }

    await generateHallTicketPDF(candidate);
  };

  const bulkReleaseHallTickets = async () => {
    const paidCandidates = filteredCandidates.filter(c => c.feesPaid && !c.hallTicketReleased);
    
    if (paidCandidates.length === 0) {
      toast({
        title: "No Candidates",
        description: "No eligible candidates found for hall ticket release.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Update database status for all candidates
      const updatePromises = paidCandidates.map(candidate =>
        fetch(`/api/admin/candidates/${candidate.id}/hall-ticket`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hallTicketReleased: true }),
        }).then(response => response.json())
      );

      const updateResults = await Promise.allSettled(updatePromises);
      
      // Check for any failures
      const failures = updateResults.filter(result => 
        result.status === 'rejected' || !result.value?.success
      );

      if (failures.length > 0) {
        console.warn(`${failures.length} database updates failed out of ${paidCandidates.length}`);
      }

      // Update local state for successful updates
      const successfulUpdates = updateResults
        .map((result, index) => ({ result, candidate: paidCandidates[index] }))
        .filter(({ result }) => result.status === 'fulfilled' && result.value?.success)
        .map(({ candidate }) => candidate.id);

      setCandidates(prev => prev.map(c => 
        successfulUpdates.includes(c.id)
          ? { ...c, hallTicketReleased: true }
          : c
      ));

      // Generate combined HTML for all hall tickets
      const combinedHTML = generateBulkHallTicketsHTML(paidCandidates);
      
      // Open in new window for bulk printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(combinedHTML);
        printWindow.document.close();
        
        printWindow.onload = () => {
          printWindow.print();
        };
      }

      const successCount = successfulUpdates.length;
      const totalCount = paidCandidates.length;

      if (successCount === totalCount) {
        toast({
          title: "Bulk Release Complete",
          description: `Hall tickets released for ${successCount} candidates. Database updated successfully.`,
        });
      } else {
        toast({
          title: "Partial Success",
          description: `Hall tickets generated for ${totalCount} candidates. Database updated for ${successCount}. Please refresh and retry for failed updates.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Some hall tickets could not be generated. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateBulkHallTicketsHTML = (candidates: Candidate[]) => {
    const ticketsHTML = candidates.map(candidate => 
      generateHallTicketHTML(candidate).replace('<!DOCTYPE html><html><head>', '').replace('</head><body>', '').replace('</body></html>', '')
    ).join('<div style="page-break-after: always;"></div>');

    return `
<!DOCTYPE html>
<html>
<head>
    <title>Hall Tickets - Bulk Download</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: white; }
        .hall-ticket { max-width: 800px; margin: 0 auto; border: 3px solid #000; padding: 20px; background: white; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; color: #000; margin-bottom: 5px; }
        .subtitle { font-size: 16px; color: #666; }
        .content { display: flex; gap: 20px; margin-bottom: 20px; }
        .photo-section { width: 120px; text-align: center; }
        .photo-box { width: 100px; height: 120px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; background: #f5f5f5; }
        .signature-box { width: 100px; height: 60px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; background: #f5f5f5; }
        .details { flex: 1; }
        .detail-row { display: flex; margin-bottom: 12px; }
        .detail-label { font-weight: bold; min-width: 140px; }
        .detail-value { flex: 1; }
        .rules { margin-top: 30px; border-top: 2px solid #000; padding-top: 20px; }
        .rules-title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 15px; }
        .rule { margin-bottom: 8px; font-size: 12px; line-height: 1.4; }
        .footer { margin-top: 30px; text-align: left; border-top: 1px solid #ccc; padding-top: 15px; }
        .footer-text { font-weight: bold; font-size: 14px; }
        @media print { body { margin: 0; } .hall-ticket { border: 2px solid #000; } }
    </style>
</head>
<body>
${ticketsHTML}
</body>
</html>`;
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, candidate ID, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-48">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Candidates</SelectItem>
              <SelectItem value="released">Hall Ticket Released</SelectItem>
              <SelectItem value="not-released">Hall Ticket Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={bulkReleaseHallTickets}
          disabled={loading}
          className="whitespace-nowrap"
        >
          <Download className="w-4 h-4 mr-2" />
          Bulk Release
        </Button>
      </div>

      {/* Candidates Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Center</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Fees Paid</TableHead>
              <TableHead>Hall Ticket</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.candidateId}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{candidate.category}</Badge>
                </TableCell>
                <TableCell className="text-sm">{candidate.center}</TableCell>
                <TableCell>{candidate.contact}</TableCell>
                <TableCell>
                  {candidate.feesPaid ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <Check className="w-3 h-3 mr-1" />
                      Paid
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <X className="w-3 h-3 mr-1" />
                      Unpaid
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {candidate.hallTicketReleased ? (
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      <FileText className="w-3 h-3 mr-1" />
                      Released
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={candidate.feesPaid ? "default" : "outline"}
                    disabled={!candidate.feesPaid || candidate.hallTicketReleased || loading}
                    onClick={() => releaseHallTicket(candidate)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {candidate.hallTicketReleased ? "Downloaded" : "Release"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredCandidates.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium">No candidates found for hall ticket generation.</p>
          <div className="text-sm mt-3 space-y-1">
            <p>Possible reasons:</p>
            <ul className="list-disc list-inside text-left max-w-md mx-auto">
              <li>No candidates have registered yet</li>
              <li>No candidates have paid their fees</li>
              <li>Server connection issue</li>
            </ul>
            <p className="mt-3 text-blue-600">
              Check the browser console (F12) for more details.
            </p>
          </div>
        </div>
      )}
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'candidates' | 'mentors' | 'sms'>('dashboard');

  useEffect(() => {
    // Get user info from localStorage (no need to check token since ProtectedAdminRoute handles it)
    const user = localStorage.getItem('adminUser');
    if (user) {
      setAdminUser(JSON.parse(user));
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data...');
      
      // Fetch real data from API
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/admin/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP ${response.status}: Failed to fetch dashboard data`);
      }

      setDashboardData(data.data || data);
      setError("");
      console.log('Dashboard data loaded successfully:', data);

    } catch (error) {
      console.error('Dashboard fetch error:', error);
      
      // Fallback in case of any error
      const fallbackData: DashboardData = {
        stats: {
          totalCandidates: 0,
          totalMentors: 0,
          totalSchools: 0,
          activeCandidates: 0
        }
      };
      
      setDashboardData(fallbackData);
      setError(`Error: ${error instanceof Error ? error.message : 'Failed to load dashboard data'}`);
      
      console.log('Using emergency fallback data due to error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation('/');
  };



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{adminUser?.username || 'Admin'}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection('candidates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'candidates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Candidates
            </button>
            <button
              onClick={() => setActiveSection('mentors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'mentors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mentors
            </button>
            <button
              onClick={() => setActiveSection('sms')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'sms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              SMS Notifications
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Render different sections based on activeSection */}
        {activeSection === 'dashboard' && (
          <>
            {/* Stats Cards */}
            {dashboardData?.stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.stats.totalCandidates}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.stats.activeCandidates}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.stats.totalMentors}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                    <BarChart3 className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.stats.totalSchools}</div>
                  </CardContent>
                </Card>
              </div>
            )}



            {/* Hall Ticket Management */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Hall Ticket Management
                </CardTitle>
                <CardDescription>Release hall tickets to candidates who have paid fees</CardDescription>
              </CardHeader>
              <CardContent>
                <HallTicketManager />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => setActiveSection('candidates')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Candidates
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => setActiveSection('mentors')}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Manage Mentors
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeSection === 'candidates' && <CandidateManager />}
        {activeSection === 'mentors' && <MentorManager />}
        {activeSection === 'sms' && <SMSManager />}
      </div>
    </div>
  );
}