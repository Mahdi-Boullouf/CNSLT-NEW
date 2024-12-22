// utils/chargily.js

const CHARGILY_CONFIG = {
    TEST_MODE: {
      SECRET_KEY: 'test_sk_4Vqv4X1Bgyl4nk1lIivI5zOsTVdxa0Hb2LXyJqxT',
      PUBLIC_KEY: 'test_pk_KIH88DfxnqWm9EbYTspJxfLaknXJ0llCfn9zy4AW',
      BASE_URL: 'https://pay.chargily.net/test/api/v2'
    },
    LIVE_MODE: {
      BASE_URL: 'https://pay.chargily.net/api/v2'
    }
  };
  
  // Helper function to create headers
  const createHeaders = (secretKey) => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${secretKey}`
  });
  
  // Create payment checkout session
  export const createCheckoutSession = async ({
    amount,
    currency = 'DZD',
    customer_email,
    customer_name,
    client_reference_id,
    webhook_url,
    back_url,
    mode = 'test'
  }) => {
    try {
      const config = mode === 'test' ? CHARGILY_CONFIG.TEST_MODE : CHARGILY_CONFIG.LIVE_MODE;
      
      const response = await fetch(`${config.BASE_URL}/payments`, {
        method: 'POST',
        headers: createHeaders(config.SECRET_KEY),
        body: JSON.stringify({
          amount,
          currency,
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
  
      return await response.json();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  };
  
  // Verify payment status
  export const verifyPayment = async (paymentId, mode = 'test') => {
    try {
      const config = mode === 'test' ? CHARGILY_CONFIG.TEST_MODE : CHARGILY_CONFIG.LIVE_MODE;
      
      const response = await fetch(`${config.BASE_URL}/payments/${paymentId}`, {
        method: 'GET',
        headers: createHeaders(config.SECRET_KEY)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };