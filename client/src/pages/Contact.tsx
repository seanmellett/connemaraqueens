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
import { sendFormspreeEmail, sendNetlifyForm } from "@/lib/formspree-contact";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
// Extended schema with validation
const formSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});
// Simple mailto function without EmailJS
const createMailtoLink = (formData: any): string => {
  const subject = `[Connemara Queens] ${formData.subject}`;
  const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Message:
${formData.message}
---
Sent from Connemara Queens contact form
${new Date().toLocaleString()}
  `.trim();
  return `mailto:info@connemaraqueens.ie?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
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
  
  // Handle form submission without EmailJS
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Try Netlify function first
      let response;
      try {
        response = await fetch("/.netlify/functions/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          const result = await response.json();
          setIsSubmitted(true);
          toast({
            title: "Message Received",
            description: `Your message has been logged successfully. We'll respond within 24 hours! Reference: ${result.reference || 'N/A'}`,
          });
          form.reset();
          return;
        }
      } catch (netlifyError) {
        console.log('Netlify function not available, trying alternatives');
      }
      // Try Formspree backup
      const formspreeSent = await sendFormspreeEmail(data);
      
      if (formspreeSent) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent Successfully",
          description: "Your message has been sent. We'll respond within 24 hours!",
        });
        form.reset();
        return;
      }
      // Try Netlify Forms
      const netlifyFormSent = await sendNetlifyForm(data);
      
      if (netlifyFormSent) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent Successfully", 
          description: "Your message has been submitted. We'll respond within 24 hours!",
        });
        form.reset();
        return;
      }
      // Try development API
      try {
        await apiRequest("POST", "/api/contact", data);
        setIsSubmitted(true);
        toast({
          title: "Message Received",
          description: "Thank you for your message. We will get back to you soon!",
        });
        form.reset();
        return;
      } catch (apiError) {
        console.log('Development API failed, using mailto fallback');
      }
      // All methods failed, use mailto fallback
      const mailtoLink = createMailtoLink(data);
      
      const shouldSendEmail = confirm(
        "We'll open your email client to send the message. Continue?"
      );
      
      if (shouldSendEmail) {
        window.open(mailtoLink, '_blank');
        toast({
          title: "Email Client Opened",
          description: "Please send the email from your email client to complete your message.",
        });
        form.reset();
        setIsSubmitted(true);
      } else {
        toast({
          title: "Message Not Sent",
          description: "You can contact us directly at info@connemaraqueens.ie or +353 87 326 8019",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive"
      });
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
