// Netlify serverless function for handling contact form submissions
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, subject, message } = data;
    // Basic validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    // Log the message (visible in Netlify function logs)
    console.log('🍯 NEW CONTACT MESSAGE RECEIVED:');
    console.log(`From: ${name} (${email})`);
    console.log(`Phone: ${phone || 'Not provided'}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // Create email content for manual follow-up
    const emailContent = {
      from: name,
      email: email,
      phone: phone || 'Not provided',
      subject: subject,
      message: message,
      timestamp: new Date().toISOString(),
      reference: `MSG-${Date.now().toString().slice(-6)}`
    };
    // For now, we'll just log it. In a real implementation, you could:
    // 1. Send via email service (when you get one working)
    // 2. Store in a database
    // 3. Send to a webhook service
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Contact message received successfully',
        reference: emailContent.reference
      })
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to process contact form submission' 
      })
    };
  }
};
