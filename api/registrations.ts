import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { insertRegistrationSchema } from '../shared/schema';
import { z } from "zod";
import { randomUUID } from "crypto";

// Direct MongoDB connection for serverless function
async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  
  await client.connect();
  return client.db('einstein_quest');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    let client;
    try {
      const validatedData = insertRegistrationSchema.parse(req.body);
      
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
    } catch (error) {
      console.error('Registration creation error:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const db = await connectToMongoDB();
      const registrations = await db.collection('registrations').find({}).toArray();
      res.json(registrations);
    } catch (error) {
      console.error('Get registrations error:', error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
