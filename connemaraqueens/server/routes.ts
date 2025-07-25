import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import Stripe from "stripe";
import { nanoid } from "nanoid";

// Initialize Stripe with secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Calculate deposit amount
      const nucsDeposit = (bookingData.nucsCount || 0) * 50;
      const queensDeposit = (bookingData.queensCount || 0) * 20;
      const totalDeposit = nucsDeposit + queensDeposit;
      
      // Generate unique booking reference
      const reference = `BEE-${nanoid(8).toUpperCase()}`;
      
      const newBooking = await storage.createBooking({
        ...bookingData,
        depositAmount: totalDeposit.toString(),
        reference
      });
      
      res.status(201).json(newBooking);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid booking data", details: error.errors });
      } else {
        console.error("Booking error:", error);
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(contactData);
      res.status(201).json({ success: true, messageId: newMessage.id });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid contact data", details: error.errors });
      } else {
        console.error("Contact error:", error);
        res.status(500).json({ error: "Failed to save contact message" });
      }
    }
  });

  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, bookingId } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      // Create a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "eur",
        metadata: { bookingId }
      });

      // Update booking with payment information
      if (bookingId) {
        await storage.updateBookingPayment(bookingId, paymentIntent.id);
      }

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Payment error:", error);
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
