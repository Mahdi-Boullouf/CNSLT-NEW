// app/api/create-payment/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received request body:', body); // Debug log

    const {
      amount,
      customer_email,
      customer_name,
      client_reference_id,
      webhook_url,
      back_url
    } = body;

    // Prepare the request payload
    const payloadData = {
      amount: amount, // Amount in DZD (integer)
      currency: 'DZD',
      client_reference_id: client_reference_id,
      customer: {
        name: customer_name,
        email: customer_email,
      },
      back_url: back_url,
      webhook_url: webhook_url,
      mode: 'CIB', // Payment mode (CIB, EDAHABIA, or CCP)
      metadata: {
        order_id: client_reference_id
      }
    };

    console.log('Sending payload to Chargily:', payloadData); // Debug log

    const response = await fetch('https://pay.chargily.net/test/api/v2/payments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer test_sk_4Vqv4X1Bgyl4nk1lIivI5zOsTVdxa0Hb2LXyJqxT`
      },
      body: JSON.stringify(payloadData)
    });

    const responseData = await response.json();
    console.log('Chargily API response:', responseData); // Debug log

    if (!response.ok) {
      throw new Error(`Chargily API error: ${JSON.stringify(responseData)}`);
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Detailed payment creation error:', error); // Debug log
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    );
  }
}