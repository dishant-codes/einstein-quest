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

// Singleton MongoDB connection manager
class MongoConnection {
  private static instance: MongoConnection;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private isConnecting: boolean = false;

  private constructor() {}

  static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  async getConnection(): Promise<{ client: MongoClient; db: Db }> {
    if (this.client && this.db) {
      return { client: this.client, db: this.db };
    }

    if (this.isConnecting) {
      // Wait for connection to complete
      while (this.isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (this.client && this.db) {
        return { client: this.client, db: this.db };
      }
    }

    this.isConnecting = true;
    try {
      const uri = process.env.MONGODB_URI || "mongodb+srv://dishantaarak2696_db_user:Gt457tw8vmXk6LOw@kaunbanegaeinstein.xxlzfp6.mongodb.net/?retryWrites=true&w=majority&appName=kaunbanegaeinstein";
      
      this.client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxIdleTimeMS: 30000,
        connectTimeoutMS: 10000,
      });

      await this.client.connect();
      this.db = this.client.db("kbe_database");
      
      console.log("Connected to MongoDB successfully");
      
      return { client: this.client, db: this.db };
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      this.client = null;
      this.db = null;
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log("Disconnected from MongoDB");
    }
  }
}

export class MongoStorage implements IStorage {
  private mongoConnection: MongoConnection;
  private indexesCreated: boolean = false;

  constructor() {
    this.mongoConnection = MongoConnection.getInstance();
  }

  private async getCollections() {
    const { db } = await this.mongoConnection.getConnection();
    return {
      users: db.collection<User>("users"),
      contacts: db.collection<Contact>("contacts"),
      registrations: db.collection<Registration>("registrations")
    };
  }

  private async ensureIndexes() {
    if (this.indexesCreated) return;
    
    try {
      const { users, contacts, registrations } = await this.getCollections();
      
      // Create indexes for better performance
      await users.createIndex({ username: 1 }, { unique: true });
      await contacts.createIndex({ email: 1 });
      await registrations.createIndex({ email: 1 });
      await registrations.createIndex({ createdAt: -1 });
      
      this.indexesCreated = true;
      console.log("MongoDB indexes created successfully");
    } catch (error) {
      console.error("Error creating indexes:", error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const { users } = await this.getCollections();
      const user = await users.findOne({ id });
      return user || undefined;
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const { users } = await this.getCollections();
      const user = await users.findOne({ username });
      return user || undefined;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      await this.ensureIndexes();
      const { users } = await this.getCollections();
      const id = randomUUID();
      const user: User = { ...insertUser, id };
      await users.insertOne(user);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      await this.ensureIndexes();
      const { contacts } = await this.getCollections();
      const id = randomUUID();
      const contact: Contact = { 
        ...insertContact, 
        id, 
        createdAt: new Date() 
      };
      await contacts.insertOne(contact);
      console.log("Contact created successfully:", id);
      return contact;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw new Error("Failed to create contact");
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      const { contacts } = await this.getCollections();
      const contactList = await contacts.find({}).sort({ createdAt: -1 }).toArray();
      return contactList;
    } catch (error) {
      console.error("Error getting contacts:", error);
      return [];
    }
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    try {
      await this.ensureIndexes();
      const { registrations } = await this.getCollections();
      const id = randomUUID();
      const registration: Registration = { 
        ...insertRegistration, 
        id, 
        paymentStatus: "pending",
        createdAt: new Date() 
      };
      
      console.log("Creating registration with data:", {
        id,
        studentName: registration.studentName,
        email: registration.email,
        examType: registration.examType
      });
      
      const result = await registrations.insertOne(registration);
      console.log("Registration created successfully:", id, "MongoDB ID:", result.insertedId);
      return registration;
    } catch (error) {
      console.error("Error creating registration:", error);
      throw new Error("Failed to create registration: " + (error as Error).message);
    }
  }

  async getRegistrations(): Promise<Registration[]> {
    try {
      const { registrations } = await this.getCollections();
      const registrationList = await registrations.find({}).sort({ createdAt: -1 }).toArray();
      return registrationList;
    } catch (error) {
      console.error("Error getting registrations:", error);
      return [];
    }
  }

  async getRegistrationById(id: string): Promise<Registration | undefined> {
    try {
      const { registrations } = await this.getCollections();
      const registration = await registrations.findOne({ id });
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
