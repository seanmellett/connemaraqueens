// Formspree integration for reliable email delivery
interface ContactFormData {
name: string;
email: string;
phone?: string | null;
subject: string;
message: string;
}

export const sendFormspreeEmail = async (formData: ContactFormData): Promise<boolean> => {
try {
const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

if (!formspreeEndpoint) {
console.log('Formspree endpoint not configured');
return false;
}

const response = await fetch(formspreeEndpoint, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json'
},
body: JSON.stringify({
name: formData.name,
email: formData.email,
phone: formData.phone || 'Not provided',
subject: formData.subject,
message: formData.message,
_subject: `[Connemara Queens] ${formData.subject}`,
_replyto: formData.email,
})
});

if (response.ok) {
console.log('✅ Formspree email sent successfully');
return true;
} else {
console.error('❌ Formspree failed:', response.status);
return false;
}

} catch (error) {
console.error('❌ Formspree error:', error);
return false;
}
};

// Netlify Forms integration
export const sendNetlifyForm = async (formData: ContactFormData): Promise<boolean> => {
try {
const formDataObj = new FormData();
formDataObj.append('form-name', 'contact');
formDataObj.append('name', formData.name);
formDataObj.append('email', formData.email);
formDataObj.append('phone', formData.phone || '');
formDataObj.append('subject', formData.subject);
formDataObj.append('message', formData.message);

const response = await fetch('/', {
method: 'POST',
headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
body: new URLSearchParams(formDataObj as any).toString()
});

if (response.ok) {
console.log('✅ Netlify form submitted successfully');
return true;
} else {
console.error('❌ Netlify form failed:', response.status);
return false;
}

} catch (error) {
console.error('❌ Netlify form error:', error);
return false;
}
};
