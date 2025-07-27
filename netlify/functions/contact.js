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
        reference: `MSG-${Date.now().toString().slice(-6)}`
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
