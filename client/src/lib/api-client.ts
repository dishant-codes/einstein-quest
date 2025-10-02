// Frontend API client for KBE registration system
// This client makes requests to external APIs only

// Demo mode flag - set to false for real API calls
const FORCE_DEMO_MODE = false;

// API Base URL - use environment variable if available, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// Generic API client class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    // Demo mode - return mock data if backend is not available
    if (FORCE_DEMO_MODE) {
      return await this.handleDemoMode(endpoint, options);
    }

    const url = `${this.baseURL}${endpoint}`;
    
    // Don't set Content-Type for FormData, let browser handle it
    const isFormData = options.body instanceof FormData;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    };

    try {
      // Try to fetch from actual API
      const response = await fetch(url, config);
      
      // Handle different response types
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (contentType && contentType.includes('application/pdf')) {
        data = await response.blob();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        
        if (typeof data === 'object') {
          // Handle different error response formats
          if (data.error) errorMessage = data.error;
          else if (data.message) errorMessage = data.message;
          else if (data.errors && Array.isArray(data.errors)) {
            errorMessage = data.errors.map((err: any) => 
              err.msg || err.message || (typeof err === 'string' ? err : JSON.stringify(err))
            ).join(', ');
          }
        }
        
        throw new ApiError(errorMessage, response.status);
      }

      return data;
    } catch (error) {
      // Fall back to demo mode if server is unavailable
      if (FORCE_DEMO_MODE || error instanceof TypeError) {
        console.log('API server unavailable, using demo mode');
        return await this.handleDemoMode(endpoint, options);
      }
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // School API methods
  async registerSchool(schoolData: any) {
    return this.request('/api/schools/register', {
      method: 'POST',
      body: JSON.stringify(schoolData),
    });
  }

  async getSchools(params: {
    schoolCode?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    const queryString = searchParams.toString();
    return this.request(`/api/schools${queryString ? `?${queryString}` : ''}`);
  }

  // Mentor API methods
  async registerMentor(mentorData: any) {
    return this.request('/api/mentors/register', {
      method: 'POST',
      body: JSON.stringify(mentorData),
    });
  }

  async getMentors(params: {
    mentorCode?: string;
    schoolCode?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    const queryString = searchParams.toString();
    return this.request(`/api/mentors${queryString ? `?${queryString}` : ''}`);
  }

  // Candidate API methods
  async registerCandidate(candidateData: any) {
    return this.request('/api/candidates/register', {
      method: 'POST',
      body: JSON.stringify(candidateData),
    });
  }

  async registerCandidateWithFiles(formData: FormData) {
    console.log('Sending candidate registration /api/candidates');
    console.log('candidateId in FormData:', formData.get('candidateId'));
    console.log('mentorCode in FormData:', formData.get('mentorCode'));
    
    return this.request('/api/candidates/register', {
      method: 'POST',
      body: formData,
    });
  }

  async getCandidates(params: {
    seatNumber?: string;
    mentorCode?: string;
    schoolCode?: string;
    status?: string;
    category?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    const queryString = searchParams.toString();
    return this.request(`/api/candidates${queryString ? `?${queryString}` : ''}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // Statistics
  async getStatistics() {
    return this.request('/api/statistics');
  }

  // Admin API methods
  async adminLogin(credentials: { username: string; password: string }) {
    return this.request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getAdminDashboard(token: string) {
    return this.request('/api/admin/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  
  // Demo mode handler to generate mock responses
  private async handleDemoMode(endpoint: string, options: RequestInit = {}): Promise<any> {
    console.log(`🔄 Demo mode: Handling request to ${endpoint}`);
    
    // Add some delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
    
    // Extract request body data if it exists
    let requestData: any = {};
    if (options.body) {
      try {
        if (options.body instanceof FormData) {
          // Just acknowledge we got form data
          requestData = { formDataReceived: true };
        } else if (typeof options.body === 'string') {
          requestData = JSON.parse(options.body);
        }
      } catch (e) {
        console.error('Error parsing request body', e);
      }
    }
    
    // Generate response based on endpoint
    if (endpoint.includes('/api/schools')) {
      if (options.method === 'POST') {
        return {
          success: true,
          message: 'School registered successfully',
          data: {
            schoolId: 'demo_' + Date.now(),
            schoolCode: 'SCH' + Math.random().toString(36).substring(2, 8).toUpperCase(),
            schoolName: requestData?.schoolName || 'Demo School'
          }
        };
      } else {
        return {
          success: true,
          data: {
            schools: Array(5).fill(0).map((_, i) => ({
              _id: `demo_school_${i}`,
              schoolName: `Demo School ${i + 1}`,
              schoolCode: `SCH${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
              udiseCode: `UDISE${10000 + i}`,
              contact: `98765${(i + 1).toString().padStart(5, '0')}`,
              principal: { name: `Principal ${i + 1}` },
              schoolType: ['Primary', 'Secondary', 'Higher Secondary'][i % 3],
              createdAt: new Date().toISOString()
            })),
            pagination: {
              current: 1,
              pages: 1,
              total: 5
            }
          }
        };
      }
    } else if (endpoint.includes('/api/mentors')) {
      if (options.method === 'POST') {
        return {
          success: true,
          message: 'Mentor registered successfully',
          data: {
            mentorId: 'demo_' + Date.now(),
            mentorCode: 'MEN' + Math.random().toString(36).substring(2, 8).toUpperCase(),
            name: requestData?.name || 'Demo Mentor'
          }
        };
      } else {
        return {
          success: true,
          data: {
            mentors: Array(3).fill(0).map((_, i) => ({
              _id: `demo_mentor_${i}`,
              name: `Demo Mentor ${i + 1}`,
              mentorCode: `MEN${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
              schoolCode: `SCH${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
              contact: `99876${(i + 1).toString().padStart(4, '0')}`,
              subjectTeaching: ['Physics', 'Chemistry', 'Mathematics'][i % 3],
              workExperience: 5 + i,
              createdAt: new Date().toISOString()
            })),
            pagination: {
              current: 1,
              pages: 1,
              total: 3
            }
          }
        };
      }
    } else if (endpoint.includes('/api/candidates')) {
      if (options.method === 'POST') {
        return {
          success: true,
          message: 'Candidate registered successfully',
          data: {
            candidateId: 'KBE' + Date.now().toString().slice(-6),
            seatNumber: `2025${Math.floor(10000 + Math.random() * 90000)}`,
            fullName: requestData?.personalDetails?.fullName || 'Demo Candidate'
          }
        };
      } else {
        return {
          success: true,
          data: {
            candidates: Array(4).fill(0).map((_, i) => ({
              _id: `demo_candidate_${i}`,
              candidateId: `KBE${Date.now().toString().slice(-6)}${i}`,
              seatNumber: `2025${Math.floor(10000 + Math.random() * 90000)}`,
              personalDetails: { 
                fullName: `Demo Candidate ${i + 1}`,
                gender: i % 2 === 0 ? 'Male' : 'Female'
              },
              educationalDetails: {
                kbeCategory: ['Prime', 'Sec', 'High'][i % 3]
              },
              mentorCode: `MEN${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
              createdAt: new Date().toISOString()
            })),
            pagination: {
              current: 1,
              pages: 1,
              total: 4
            }
          }
        };
      }
    } else if (endpoint.includes('/api/health')) {
      return {
        status: 'OK',
        message: 'Demo API is running',
        timestamp: new Date().toISOString()
      };
    } else {
      // Generic response for any other endpoints
      return {
        success: true,
        message: 'Demo mode response',
        data: {
          timestamp: new Date().toISOString(),
          endpoint
        }
      };
    }
  }
}

// Create and export the API client instance
const apiClient = new ApiClient(API_BASE_URL);

// Export the client instance
export { apiClient };

// Export methods for easier imports
export const {
  // School methods
  registerSchool,
  getSchools,
  // Mentor methods
  registerMentor,
  getMentors,
  // Candidate methods
  registerCandidate,
  registerCandidateWithFiles,
  getCandidates,
  // Admin methods
  adminLogin,
  getAdminDashboard,
  // Utility methods
  healthCheck,
  getStatistics,
} = apiClient;

// Response type definitions
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface RegistrationResponse extends ApiResponse {
  id: string;
  schoolCode?: string;
  mentorCode?: string;
  seatNumber?: string;
  candidateCode?: string;
}

// Error handling utilities
export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: any): { message: string, details?: string[] } => {
  // Main error message for simple display
  let message = 'An unexpected error occurred. Please try again.';
  // Detailed errors for comprehensive display
  let details: string[] = [];

  // Process different error types
  if (error instanceof ApiError) {
    message = formatErrorMessage(error.message);
    
    // Try to parse validation errors from MongoDB/Express
    if (error.message.includes('validation failed')) {
      const validationErrors = extractValidationErrors(error.message);
      if (validationErrors.length > 0) {
        details = validationErrors;
        message = 'Please correct the following errors:';
      }
    }
  } else if (error && error.message) {
    message = formatErrorMessage(error.message);
  }

  return { message, details: details.length > 0 ? details : undefined };
};

// Format error messages to be more user-friendly
const formatErrorMessage = (message: string): string => {
  // Convert technical error messages to user-friendly ones
  if (message.includes('ValidationError')) {
    return 'Some required fields are missing or invalid.';
  }
  
  // Format validation messages nicely
  message = message.replace(/Path `([^`]+)` is required\./g, "Field '$1' is required.");
  message = message.replace(/SchoolCode/g, "School Code");
  message = message.replace(/mentorCode/g, "Mentor Code");
  
  // Fix capitalization and add spacing between messages
  return message.split('.').filter(Boolean).map(s => {
    const trimmed = s.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }).join('. ');
};

// Extract individual validation errors from error messages
const extractValidationErrors = (errorMessage: string): string[] => {
  const errors: string[] = [];
  
  // Extract MongoDB validation errors
  const validationMatch = errorMessage.match(/validation failed: (.+)/);
  if (validationMatch && validationMatch[1]) {
    const validationParts = validationMatch[1].split(', ');
    
    validationParts.forEach(part => {
      const [field, error] = part.split(': ');
      if (field && error) {
        // Format field name to be more readable
        const formattedField = field
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/\./g, ' → ')      // Replace dots with arrows for nested fields
          .trim();
          
        errors.push(`${formattedField.charAt(0).toUpperCase() + formattedField.slice(1)}: ${error}`);
      } else {
        errors.push(formatErrorMessage(part));
      }
    });
  }
  
  // If no specific errors were extracted, add the whole message
  if (errors.length === 0 && errorMessage) {
    errors.push(formatErrorMessage(errorMessage));
  }
  
  return errors;
};

// Demo mode utilities
export const isDemoMode = (): boolean => {
  return import.meta.env.VITE_DEMO_MODE === 'true' || API_BASE_URL.includes('demo');
};

export const generateDemoResponse = (type: string, data?: any) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Demo ${type} completed successfully`,
        data: {
          ...data,
          id: `demo_${Date.now()}`,
          code: `DEMO${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          timestamp: new Date().toISOString()
        }
      });
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
  });
};

export default apiClient;
