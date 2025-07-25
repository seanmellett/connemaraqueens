import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

// Extended schema with validation
const formSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      setIsSubmitted(true);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We will get back to you soon!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Message Failed",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 bg-[var(--color-neutral)]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary text-center mb-16">
          Contact Us
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-display font-bold text-primary mb-6">Get in Touch</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="text-accent text-xl mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p>Camus Oughter, Co. Galway, Ireland</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-accent text-xl mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>+353 87 326 8019</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-accent text-xl mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p>info@connemaraqueens.ie</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-accent hover:text-primary text-2xl transition-colors duration-300">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-accent hover:text-primary text-2xl transition-colors duration-300">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-accent hover:text-primary text-2xl transition-colors duration-300">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1518005068251-37900150dfca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Connemara landscape" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-display font-bold text-primary mb-6">Send a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-bold">Your Name *</FormLabel>
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-bold">Subject *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-bold">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={6} 
                          {...field} 
                          placeholder="Your message..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
