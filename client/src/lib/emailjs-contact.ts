// EmailJS integration for direct Gmail delivery
import emailjs from '@emailjs/browser';
interface ContactFormData {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Initialize EmailJS (these will be environment variables)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      console.log('EmailJS configuration missing, skipping');
      return false;
    }
    // Email template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
      to_email: 'info@connemaraqueens.ie',
      reference: `CQ-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString()
    };
    // Send email via EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );
    console.log('✅ Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
};
// Fallback mailto function
export const createMailtoLink = (formData: ContactFormData): string => {
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
