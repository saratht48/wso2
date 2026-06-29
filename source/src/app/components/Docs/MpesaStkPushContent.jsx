/* eslint-disable */
/*
 * Request to Pay → "M-PESA STK Push" docs content (API name: "M-PESA STK Push").
 *
 * Data-only: the shared layout/styles live in RequestToPayKit (buildDoc). Every
 * value here is taken verbatim from the Figma node (Developer Portal 5297-10615).
 */
import { buildDoc } from './RequestToPayKit';

export const MPESA_STK_DATA = {
    marker: '// REQUEST TO PAY',
    title: 'M-Pesa STK Push',
    subtitle: "Triggers a payment prompt directly on the customer's handset via the Safaricom STK (Sim Toolkit) mechanism. The customer receives an on-screen prompt to authorise the payment using their M-Pesa PIN.",
    description: "This endpoint integrates with the M-Pesa payment gateway to initiate an STK Push to the customer's registered mobile number. The transaction is asynchronous — your callBackUrl receives the payment notification on completion.",
    keyCharacteristics: [
        'Customer authorises payment using their M-Pesa PIN on the STK prompt',
        '`payMblNo` must be in international format — e.g. `254XXXXXXXXX`',
        '`refNo` must be unique per request — reusing a reference returns a duplicate error',
        '`callBackUrl` receives the asynchronous payment notification from M-Pesa',
        'Implement exponential backoff and retry with the same refNo on gateway failures — do not generate a new reference if the original transaction may have been partially processed',
    ],
    params: [
        { name: 'mobileNo', type: 'String', req: 'Yes', desc: 'Mobile number of the payer in international format (e.g. `254XXXXXXXXX`).' },
        { name: 'merchantId', type: 'String', req: 'Yes', desc: 'Unique identifier for the merchant on the LOOP platform.' },
        { name: 'securityCredential', type: 'String', req: 'Yes', desc: 'RSA-encrypted security credential generated from the Merchant Portal.' },
        { name: 'tillNo', type: 'String', req: 'Yes', desc: "The merchant's till number to which the payment is directed." },
        { name: 'amount', type: 'String', req: 'Yes', desc: 'Amount to be charged to the customer in the specified currency.' },
        { name: 'callBackUrl', type: 'String', req: 'Yes', desc: 'Endpoint URL where the payment notification will be delivered on completion.' },
    ],
    reqTabs: {
        cURL: [
            "curl -X POST 'https://sandbox.loop.co.ke/gateway/pay/v1/mpesa/stk-push' \\",
            "  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \\",
            "  -H 'Content-Type: application/json' \\",
            "  -d '{",
            '    "mobileNo": "254712345678",',
            '    "merchantId": "MERCHANT_001",',
            '    "securityCredential": "Base64EncodedCredential...",',
            '    "tillNo": "123456",',
            '    "amount": "100",',
            '    "callBackUrl": "https://yourdomain.com/callback"',
            "  }'",
        ],
        'Node.js': [
            "const res = await fetch('https://sandbox.loop.co.ke/gateway/pay/v1/mpesa/stk-push', {",
            "  method: 'POST',",
            '  headers: {',
            "    Authorization: 'Bearer YOUR_JWT_TOKEN',",
            "    'Content-Type': 'application/json',",
            '  },',
            '  body: JSON.stringify({',
            "    mobileNo: '254712345678',",
            "    merchantId: 'MERCHANT_001',",
            "    securityCredential: 'Base64EncodedCredential...',",
            "    tillNo: '123456',",
            "    amount: '100',",
            "    callBackUrl: 'https://yourdomain.com/callback',",
            '  }),',
            '});',
            'const data = await res.json();',
        ],
        Python: [
            'import requests',
            'res = requests.post(',
            "    'https://sandbox.loop.co.ke/gateway/pay/v1/mpesa/stk-push',",
            "    headers={'Authorization': 'Bearer YOUR_JWT_TOKEN',",
            "             'Content-Type': 'application/json'},",
            '    json={',
            "        'mobileNo': '254712345678',",
            "        'merchantId': 'MERCHANT_001',",
            "        'securityCredential': 'Base64EncodedCredential...',",
            "        'tillNo': '123456',",
            "        'amount': '100',",
            "        'callBackUrl': 'https://yourdomain.com/callback',",
            '    })',
            'print(res.json())',
        ],
    },
    responseFields: [
        { name: 'orderNo', type: 'String', desc: 'Unique reference number for the transaction order.' },
        { name: 'rspMessage', type: 'String', desc: 'Human-readable response status message (e.g. SUCCESS).' },
        { name: 'orderDate', type: 'String', desc: 'Date the order was placed. Format: YYYYMMDD.' },
        { name: 'orderToken', type: 'String', desc: 'Unique token combining order date and order number for verification.' },
        { name: 'rspCode', type: 'String', desc: 'Response code indicating the result (e.g. `00000000` for success).' },
        { name: 'totalAmount', type: 'String', desc: 'Total transaction amount in the smallest currency unit.' },
        { name: 'signature', type: 'String', desc: 'Base64-encoded HMAC signature for payload integrity verification.' },
        { name: 'loopRefNo', type: 'String', desc: "LOOP's internal unique reference number for the transaction." },
        { name: 'appId', type: 'String', desc: 'Application identifier of the merchant that initiated the request.' },
        { name: 'serverTime', type: 'String', desc: 'Server timestamp at time of response. Format: YYYYMMDDHHmmss.' },
        { name: 'responseId', type: 'String', desc: 'Unique UUID identifying this specific response instance.' },
    ],
    responseJson: [
        '{',
        '  "orderNo": "ORD20260601001",',
        '  "rspMessage": "SUCCESS",',
        '  "orderDate": "20260601",',
        '  "orderToken": "20260601ORD20260601001",',
        '  "rspCode": "00000000",',
        '  "totalAmount": "10000",',
        '  "signature": "Base64EncodedHMACSignatureHere==",',
        '  "loopRefNo": "LOOP-2026060100001",',
        '  "appId": "APP_001",',
        '  "serverTime": "20260601120000",',
        '  "responseId": "550e8400-e29b-41d4-a716-446655440000"',
        '}',
    ],
    errors: [
        { code: '400', desc: 'Missing or invalid request parameters.' },
        { code: '401', desc: 'Invalid or expired Bearer Token. Re-authenticate via the Authorization API.' },
        { code: '404', desc: 'Duplicate transaction reference — `refNo` already exists. Generate a new unique reference.' },
        { code: '503', desc: 'External service failure (e.g. M-Pesa gateway unreachable). Merchant validation failed. Retry with exponential backoff using the same `refNo`.' },
    ],
    note503: 'For 503 errors, implement exponential backoff and retry with the same refNo. Do not generate a new reference on a gateway failure — the original transaction may have been partially processed.',
    faqs: [
        {
            q: "The customer didn't receive the STK prompt.",
            a: 'Confirm mobileNo is in international format (254XXXXXXXXX) and is registered for M-Pesa. The prompt times out after about 60 seconds — ensure the handset has network coverage, then retry with the same refNo.',
        },
        {
            q: "I'm getting a 404 duplicate reference error.",
            a: 'refNo must be unique for every request. A 404 means that reference already exists — generate a new unique refNo (never reuse a previous one) and resubmit.',
        },
        {
            q: 'When should I retry after a 503 error?',
            a: 'A 503 is a transient gateway failure. Retry with the same refNo using exponential backoff. Do not generate a new reference, because the original transaction may have been partially processed.',
        },
        {
            q: 'How do I get notified when the payment completes?',
            a: 'The transaction is asynchronous. Once the customer authorises (or declines) the payment, M-Pesa posts the final notification to your callBackUrl, which must be publicly reachable.',
        },
    ],
};

const doc = buildDoc(MPESA_STK_DATA);

export const MPESA_STK_TOC = doc.toc;
export const MpesaStkIntro = doc.intro;
export const MpesaStkMiddle = doc.middle;
export const MpesaStkEnd = doc.end;

export default MpesaStkMiddle;
