import { useState } from "react";
import { Counter } from "@/components/ui/counter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertBookingSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Extended schema with additional validation
const formSchema = insertBookingSchema.extend({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  preferredMonth: z.string().min(1, "Please select a preferred month"),
  nucsCount: z.number().min(0),
  queensCount: z.number().min(0),
  notes: z.string().optional(),
}).refine(data => (data.nucsCount > 0 || data.queensCount > 0), {
  message: "You must select at least one nuc or queen",
  path: ["nucsCount"]
});

// Make sure to call loadStripe outside of a component's render to avoid recreating the Stripe object on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

function CheckoutForm({ bookingId }: { bookingId: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking?success=true&reference=${bookingId}`,
        },
      });
      
      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isSubmitting} 
        className="w-full"
      >
        {isSubmitting ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}

// Payment integration component
function PaymentSection({ totalAmount, bookingId }: { totalAmount: number, bookingId: number }) {
  const [clientSecret, setClientSecret] = useState("");
  
  useState(() => {
    async function createPaymentIntent() {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", {
          amount: totalAmount,
          bookingId
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    }
    
    if (totalAmount > 0 && bookingId) {
      createPaymentIntent();
    }
  });
  
  if (!clientSecret) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm bookingId={bookingId} />
    </Elements>
  );
}

export default function Booking() {
  const [nucsCount, setNucsCount] = useState(0);
  const [queensCount, setQueensCount] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredMonth: "",
      nucsCount: 0,
      queensCount: 0,
      notes: ""
    }
  });
  
  // Handle quantity changes
  const updateNucsCount = (value: number) => {
    setNucsCount(value);
    form.setValue("nucsCount", value);
    updateTotal(value, queensCount);
  };
  
  const updateQueensCount = (value: number) => {
    setQueensCount(value);
    form.setValue("queensCount", value);
    updateTotal(nucsCount, value);
  };
  
  const updateTotal = (nucs: number, queens: number) => {
    const nucsDeposit = nucs * 50;
    const queensDeposit = queens * 20;
    setTotalDeposit(nucsDeposit + queensDeposit);
  };
  
  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (totalDeposit === 0) {
      toast({
        title: "Order validation failed",
        description: "Please select at least one nuc or queen",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const response = await apiRequest("POST", "/api/bookings", {
        ...data,
        depositAmount: totalDeposit
      });
      
      const result = await response.json();
      
      setBookingId(result.id);
      setBookingReference(result.reference);
      setShowPayment(true);
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "There was a problem submitting your booking. Please try again.",
        variant: "destructive"
      });
      console.error(error);
    }
  };
  
  // Handle successful payment and show confirmation
  const handlePaymentSuccess = () => {
    setIsBooked(true);
    setShowPayment(false);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-16">
          Book Now for 2026
        </h2>
        
        <div className="max-w-3xl mx-auto bg-[var(--color-neutral)] p-8 rounded-lg shadow-lg">
          <p className="mb-8 text-lg text-center">
            Reserve your Native Irish Honeybee queens and nucleus colonies for the 2026 season. 
            A deposit secures your order, with the balance due upon collection.
          </p>
          
          {!isBooked ? (
            <>
              {!showPayment ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-bold">Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-bold">Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-bold">Phone Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredMonth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-bold">Preferred Month *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a month" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="May">May 2026</SelectItem>
                                <SelectItem value="June">June 2026</SelectItem>
                                <SelectItem value="July">July 2026</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg">
                      <h3 className="font-bold text-xl mb-4 text-primary">Your Order</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Counter
                          id="nucs"
                          label="Number of Nucs"
                          value={nucsCount}
                          onChange={updateNucsCount}
                          priceText="x €50 deposit each"
                        />
                        
                        <Counter
                          id="queens"
                          label="Number of Queens"
                          value={queensCount}
                          onChange={updateQueensCount}
                          priceText="x €20 deposit each"
                        />
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Deposit:</span>
                        <span className="text-accent">€{totalDeposit}</span>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-bold">Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4} 
                              {...field} 
                              placeholder="Any special requests or information we should know"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-center">
                      <Button 
                        type="submit" 
                        className="bg-accent hover:bg-[var(--color-accent-light)] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg hover:shadow-xl"
                        disabled={totalDeposit === 0}
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary mb-4">Complete Your Payment</h3>
                  <p className="mb-4">Please provide your payment details to secure your booking.</p>
                  
                  <div className="bg-white p-4 rounded-lg mb-6">
                    <p className="font-semibold">Booking Reference: <span className="text-accent">{bookingReference}</span></p>
                    <p className="font-semibold mt-2">Total to pay: <span className="text-accent">€{totalDeposit}</span></p>
                  </div>
                  
                  {bookingId && (
                    <PaymentSection 
                      totalAmount={totalDeposit} 
                      bookingId={bookingId} 
                    />
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl text-accent mb-4">
                <CheckCircle className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Booking Confirmed!</h3>
              <p className="mb-4">Thank you for your order. We've sent a confirmation email with all the details.</p>
              <p className="font-bold">Your booking reference: <span className="text-accent">{bookingReference}</span></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
