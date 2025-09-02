import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Registration API called:', req.method);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // For now, let's just return a simple success response to test
    if (req.method === 'POST') {
      console.log('POST request body:', req.body);
      
      // Simple validation
      const { studentName, email, examType } = req.body;
      
      if (!studentName || !email || !examType) {
        return res.status(400).json({ 
          message: "Missing required fields",
          required: ["studentName", "email", "examType"]
        });
      }
      
      // For testing - return success without database
      const mockRegistration = {
        id: Date.now().toString(),
        studentName,
        email,
        examType,
        status: "pending",
        createdAt: new Date().toISOString()
      };
      
      console.log('Mock registration created:', mockRegistration);
      
      res.json({ 
        message: "Registration submitted successfully (test mode)", 
        registration: mockRegistration
      });
      
    } else if (req.method === 'GET') {
      res.json({ 
        message: "Registration API is working",
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
    
  } catch (error) {
    console.error('Registration API error:', error);
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
}
