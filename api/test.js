export default async function handler(req, res) {
  console.log('Test API called:', req.method);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const testData = {
      message: "Test API endpoint working!",
      timestamp: new Date().toISOString(),
      method: req.method,
      environment: process.env.NODE_ENV || 'production',
      hasMongoUri: !!process.env.MONGODB_URI,
      userAgent: req.headers['user-agent'],
      requestBody: req.body
    };
    
    console.log('Test endpoint response:', testData);
    res.json(testData);
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
}
