import { type User, type InsertUser, type Contact, type InsertContact, type Registration, type InsertRegistration } from "@shared/schema";
import { randomUUID } from "crypto";
import { MongoClient, Db, Collection } from "mongodb";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  getRegistrationById(id: string): Promise<Registration | undefined>;
}

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private db: Db;
  private users: Collection<User>;
  private contacts: Collection<Contact>;
  private registrations: Collection<Registration>;

  constructor() {
    const uri = process.env.MONGODB_URI || "mongodb+srv://dishantaarak2696_db_user:Gt457tw8vmXk6LOw@kaunbanegaeinstein.xxlzfp6.mongodb.net/?retryWrites=true&w=majority&appName=kaunbanegaeinstein";
    this.client = new MongoClient(uri);
    this.db = this.client.db("kbe_database");
    this.users = this.db.collection<User>("users");
    this.contacts = this.db.collection<Contact>("contacts");
    this.registrations = this.db.collection<Registration>("registrations");
    
    // Connect to MongoDB
    this.connect();
  }

  private async connect() {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB successfully");
      
      // Create indexes for better performance
      await this.users.createIndex({ username: 1 }, { unique: true });
      await this.contacts.createIndex({ email: 1 });
      await this.registrations.createIndex({ email: 1 });
      await this.registrations.createIndex({ createdAt: -1 });
      
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await this.users.findOne({ id });
      return user || undefined;
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await this.users.findOne({ username });
      return user || undefined;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const id = randomUUID();
      const user: User = { ...insertUser, id };
      await this.users.insertOne(user);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      const id = randomUUID();
      const contact: Contact = { 
        ...insertContact, 
        id, 
        createdAt: new Date() 
      };
      await this.contacts.insertOne(contact);
      return contact;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw new Error("Failed to create contact");
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      const contacts = await this.contacts.find({}).sort({ createdAt: -1 }).toArray();
      return contacts;
    } catch (error) {
      console.error("Error getting contacts:", error);
      return [];
    }
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    try {
      const id = randomUUID();
      const registration: Registration = { 
        ...insertRegistration, 
        id, 
        paymentStatus: "pending",
        createdAt: new Date() 
      };
      await this.registrations.insertOne(registration);
      console.log("Registration created successfully:", registration.id);
      return registration;
    } catch (error) {
      console.error("Error creating registration:", error);
      throw new Error("Failed to create registration");
    }
  }

  async getRegistrations(): Promise<Registration[]> {
    try {
      const registrations = await this.registrations.find({}).sort({ createdAt: -1 }).toArray();
      return registrations;
    } catch (error) {
      console.error("Error getting registrations:", error);
      return [];
    }
  }

  async getRegistrationById(id: string): Promise<Registration | undefined> {
    try {
      const registration = await this.registrations.findOne({ id });
      return registration || undefined;
    } catch (error) {
      console.error("Error getting registration by id:", error);
      return undefined;
    }
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private registrations: Map<string, Registration>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.registrations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const registration: Registration = { 
      ...insertRegistration, 
      id, 
      paymentStatus: "pending",
      createdAt: new Date() 
    };
    this.registrations.set(id, registration);
    return registration;
  }

  async getRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrations.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getRegistrationById(id: string): Promise<Registration | undefined> {
    return this.registrations.get(id);
  }
}

// Use MongoDB in production, memory storage for development/testing
export const storage = process.env.NODE_ENV === "production" || process.env.USE_MONGODB === "true" 
  ? new MongoStorage() 
  : new MemStorage();
