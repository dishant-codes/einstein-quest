import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { insertRegistrationSchema } from '../shared/schema';
import { z } from "zod";
import { randomUUID } from "crypto";

// Global MongoDB client to reuse connections
let cachedClient: MongoClient | null = null;

// Direct MongoDB connection for serverless function
async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  
  console.log('Environment check:', {
    hasMongoUri: !!uri,
    nodeEnv: process.env.NODE_ENV
  });
  
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  
  if (cachedClient) {
    try {
      // Test if the connection is still alive
      await cachedClient.db('admin').admin().ping();
      console.log('Using cached MongoDB connection');
      return cachedClient.db('einstein_quest');
    } catch (error) {
      console.log('Cached connection is stale, creating new one');
      cachedClient = null;
    }
  }
  
  console.log('Creating new MongoDB connection');
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  
  await client.connect();
  cachedClient = client;
  console.log('Connected to MongoDB successfully');
  return client.db('einstein_quest');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('API function called:', req.method, req.url);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      console.log('Processing POST request with body:', req.body);
      
      // Validate the request body
      const validatedData = insertRegistrationSchema.parse(req.body);
      console.log('Validation successful:', validatedData);
      
      // Connect to MongoDB
      const db = await connectToMongoDB();
      const registrationsCollection = db.collection('registrations');
      
      // Create registration with UUID
      const registrationData = {
        id: randomUUID(),
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      console.log('Creating registration with data:', registrationData);
      
      const result = await registrationsCollection.insertOne(registrationData);
      console.log('Registration created successfully:', registrationData.id, 'MongoDB ID:', result.insertedId);
      
      res.json({ 
        message: "Registration submitted successfully", 
        registration: registrationData
      });
    } else if (req.method === 'GET') {
      console.log('Processing GET request');
      const db = await connectToMongoDB();
      const registrations = await db.collection('registrations').find({}).toArray();
      console.log('Retrieved registrations count:', registrations.length);
      res.json(registrations);
    } else {
      console.log('Method not allowed:', req.method);
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Function error:', error);
    
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      res.status(400).json({ 
        message: "Invalid registration data", 
        errors: error.errors 
      });
    } else {
      console.error('Server error:', error.message, error.stack);
      res.status(500).json({ 
        message: "Internal server error", 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
}
