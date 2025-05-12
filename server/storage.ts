import { 
  users, type User, type InsertUser,
  bookings, type Booking, type InsertBooking,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Booking operations
  createBooking(booking: InsertBooking & { reference: string }): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingByReference(reference: string): Promise<Booking | undefined>;
  updateBookingPayment(id: number, stripePaymentId: string): Promise<Booking>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private messages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentBookingId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.messages = new Map();
    this.currentUserId = 1;
    this.currentBookingId = 1;
    this.currentMessageId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Booking operations
  async createBooking(insertBooking: InsertBooking & { reference: string }): Promise<Booking> {
    const id = this.currentBookingId++;
    const now = new Date();
    const booking: Booking = { 
      ...insertBooking,
      id,
      createdAt: now
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingByReference(reference: string): Promise<Booking | undefined> {
    return Array.from(this.bookings.values()).find(
      (booking) => booking.reference === reference
    );
  }

  async updateBookingPayment(id: number, stripePaymentId: string): Promise<Booking> {
    const booking = await this.getBooking(id);
    if (!booking) {
      throw new Error(`Booking with id ${id} not found`);
    }
    
    const updatedBooking = { ...booking, stripePaymentId };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Contact operations
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const now = new Date();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: now
    };
    this.messages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
