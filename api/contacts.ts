import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { insertContactSchema } from '../shared/schema';
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
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Connect to MongoDB
      const db = await connectToMongoDB();
      const contactsCollection = db.collection('contacts');
      
      // Create contact with UUID
      const contactData = {
        id: randomUUID(),
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await contactsCollection.insertOne(contactData);
      console.log('Contact created successfully:', contactData.id, 'MongoDB ID:', result.insertedId);
      
      res.json({ message: "Contact form submitted successfully", contact: contactData });
    } catch (error) {
      console.error('Contact creation error:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const db = await connectToMongoDB();
      const contacts = await db.collection('contacts').find({}).toArray();
      res.json(contacts);
    } catch (error) {
      console.error('Get contacts error:', error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
