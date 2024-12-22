// app/api/create-payment/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      amount,
      customer_email,
      customer_name,
      client_reference_id,
      webhook_url,
      back_url
    } = body;

    const response = await fetch('https://pay.chargily.net/test/api/v2/payments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer test_sk_4Vqv4X1Bgyl4nk1lIivI5zOsTVdxa0Hb2LXyJqxT`
      },
      body: JSON.stringify({
        amount,
        currency: 'DZD',
        customer_email,
        customer_name,
        client_reference_id,
        webhook_url,
        back_url
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Payment creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}