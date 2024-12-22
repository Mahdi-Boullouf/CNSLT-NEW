// routes/payments.js

const express = require('express');
const router = express.Router();

router.post('/create-chargily', async (req, res) => {
  try {
    const {
      amount,
      customer_email,
      customer_name,
      client_reference_id,
      webhook_url,
      back_url
    } = req.body;

    const response = await fetch('https://pay.chargily.net/test/api/v2/payments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CHARGILY_SECRET_KEY}`
      },
      body: JSON.stringify({
        amount,
        currency: 'DZD',
        client_reference_id,
        customer: {
          name: customer_name,
          email: customer_email,
        },
        back_url,
        webhook_url,
        mode: 'CIB', // or 'EDAHABIA' or 'CCP'
        metadata: {
          order_id: client_reference_id
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create payment');
    }

    res.json(data);
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ 
      message: 'Failed to create payment',
      error: error.message 
    });
  }
});

module.exports = router;