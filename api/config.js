/* === API & PAYMENT CONFIGURATION ===
   Update these values when integrating backend/PayFast
*/

const API_CONFIG = {
    // Backend API Base URL (update when you have a server)
    BASE_URL: 'https://api.mdlsolutions.co.za',
    
    // PayFast Configuration (Get from PayFast Merchant Dashboard)
    PAYFAST: {
        MERCHANT_ID: '10000100', // Replace with your PayFast Merchant ID
        MERCHANT_KEY: '46f0cd694581a', // Replace with your PayFast Merchant Key
        RETURN_URL: 'https://mdlsolutions.co.za/payment/success',
        CANCEL_URL: 'https://mdlsolutions.co.za/payment/cancel',
        NOTIFY_URL: 'https://api.mdlsolutions.co.za/payfast/notify',
        SANDBOX: true // Set to false for live payments
    },
    
    // Yoco Configuration (Alternative Payment Gateway)
    YOCO: {
        PUBLIC_KEY: 'pk_test_1234567890abcdef', // Replace with your Yoco Public Key
        SECRET_KEY: 'sk_test_1234567890abcdef' // Never expose in frontend - use backend
    },
    
    // Business Information
    BUSINESS: {
        NAME: 'MDL SOLUTIONS (PTY) LTD',
        REG_NUMBER: '2021/161417/07',
        VAT_NUMBER: '4010315333',
        EMAIL: 'mdlsolutions@yahoo.com',
        PHONE: '072 141 2859',
        WHATSAPP: '+27 63 211 9290',
        ADDRESS: 'No. 18 Octave Street, Tasbet Park Ext 2, eMalahleni, Mpumalanga, 1040'
    },
    
    // Shipping Configuration
    SHIPPING: {
        FLAT_RATE: 99,
        FREE_SHIPPING_THRESHOLD: 1000,
        COURIERS: ['The Courier Guy', 'Pudo Lockers']
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}