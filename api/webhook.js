// pages/api/webhook.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    
    // Verify webhook signature if provided by Chargily
    // Handle different payment statuses
    switch (payload.status) {
      case 'paid':
        // Handle successful payment
        // Update your database, send confirmation emails, etc.
        break;
      case 'failed':
        // Handle failed payment
        break;
      case 'pending':
        // Handle pending payment
        break;
      default:
        console.log('Unhandled payment status:', payload.status);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ message: 'Webhook handler failed' });
  }
}