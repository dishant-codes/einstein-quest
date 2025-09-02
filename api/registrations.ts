import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertRegistrationSchema } from '../shared/schema';
import { z } from "zod";

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
      const validatedData = insertRegistrationSchema.parse(req.body);
      const registration = await storage.createRegistration(validatedData);
      res.json({ message: "Registration submitted successfully", registration });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      } else {
        console.error('Registration creation error:', error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const registrations = await storage.getRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error('Get registrations error:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
