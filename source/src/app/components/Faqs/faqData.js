/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// FAQ content for the Help Center. "General" question 1 + the General question
// list are taken verbatim from Figma node 4156-*; remaining answers are authored
// placeholders that should be confirmed against the final copy.

// import { app } from 'Settings';
// const serviceIcon=`${app.context}/site/public/images/overview/service.png`;

const FAQ_CATEGORIES = [
    {
        id: 'general',
        label: 'General',
        icon: 'question',
        questions: [
            {
                q: 'What is LOOP Matrix  Developer Portal?',
                a: 'LOOPDFS Developer Portal is a unified API platform that gives developers access to financial infrastructure services — including Payments, E-Commerce, Miniapps, Vouchers, E-KYC, Credit-as-a-Service, and Wallets-as-a-Service — through a single, consistent API interface. You can authenticate once and interact with all our product APIs using the same credentials and SDK.',
            },
            {
                q: 'How does pricing work?',
                a: 'LOOPDFS uses a consumption-based pricing model — you only pay for what you use. There are no monthly minimums or platform fees to get started. The sandbox environment is completely free. For production, pricing is based on transaction volume and the specific API products you use. Volume discounts apply automatically as your usage grows. Contact our sales team for custom enterprise pricing and dedicated SLAs.',
            },
            {
                q: 'Is there a sandbox environment for testing?',
                a: 'Yes — the sandbox is a full-fidelity mirror of production. Every endpoint, webhook, and error scenario behaves identically to the live environment, but no real money moves. You get instant sandbox credentials when you register — no approval required. The sandbox includes pre-loaded test credentials, simulated M-Pesa responses, mock card processing, and configurable failure scenarios so you can test edge cases before going live.',
            },
            {
                q: 'What are the API rate limits?',
                a: 'Sandbox: 1,000 requests per minute per API key. Production limits depend on your plan — Standard (500 req/min), Professional (2,000 req/min), Enterprise (custom, up to 10,000+ req/min). Rate limit headers are included in every response (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset). If you exceed the limit, the API returns HTTP 429 with a Retry-After header.',
            },
            {
                q: 'How do I get technical support?',
                a: 'Support is available via: (1) Documentation — most questions are answered in our guides and API reference. (2) Community Forum — questions answered by our team and other developers. (3) Support Tickets — open a ticket in the portal; standard response is 1 business day. (4) Dedicated Support — Enterprise customers get a named integration engineer with a 4-hour SLA. Live chat is available during business hours (EAT).',
            },
            {
                q: 'What is your API uptime SLA?',
                a: 'We guarantee 99.9% uptime for all production API endpoints — less than 9 hours of downtime per year. Our infrastructure runs across multiple availability zones with automatic failover. Real-time status, incident reports, and scheduled maintenance windows are published on our status page. Enterprise customers can upgrade to a 99.95% SLA with dedicated infrastructure.',
            },
        ],
    },
    {
        id: 'payments',
        label: 'Payments',
        icon: 'card',
        questions: [
            {
                q: 'What is a Payment Intent and why do I need one?',
                a: 'A Payment Intent is the core object representing a single payment session. Rather than directly charging a customer, you create a Payment Intent which tracks the full lifecycle of the payment — from initialisation through capture or failure. This is necessary because modern payment methods like M-Pesa STK Push and 3D Secure cards require asynchronous user actions that happen outside your API call. The Payment Intent stores amount, currency, customer details, and status, and ensures idempotency so network retries never create duplicate charges.',
            },
            {
                q: 'Which payment channels are supported?',
                a: 'LOOPDFS supports: M-Pesa STK Push (Kenya, Tanzania), Visa and Mastercard (3D Secure v2), LOOP Wallet, PesaLink bank transfers, BNPL via Loop Flex, and M-Pesa Paybill/Buy Goods. All methods are available through the same unified Payment Intent API — no separate integrations required. The hosted checkout automatically shows only methods available in the customer s region.',
            },
            {
                q: 'How do refunds work?',
                a: 'Refunds are processed via POST /api/v1/payment_intents/{id}/refunds with the amount and reason. Full or partial refunds are supported. Card refunds settle within 5–7 business days depending on the issuing bank; M-Pesa refunds settle within 24 hours. Refund status is tracked via the refund object, and a REFUND_COMPLETED webhook fires on settlement. The original payment must be in CAPTURED status before a refund can be initiated',
            },
            {
                q: 'How should I use idempotency keys?',
                a: 'Yes — always. Include a unique intent_uuid in every Payment Intent creation request. If the same intent_uuid is submitted more than once (e.g. due to a network timeout causing a retry), the API returns the original response without creating a duplicate payment. Generate a new UUID per checkout session. Never reuse an intent_uuid from a previous session, even if it failed. This is the single most effective way to prevent duplicate charges in your integration.',
            },
            {
                q: 'Do you support 3D Secure authentication?',
                a: 'Yes. All card payments on LOOP Matrix are processed with 3D Secure v2 (3DS2) by default. 3DS2 uses risk-based authentication — low-risk transactions are approved frictionlessly without a customer challenge, while higher-risk transactions trigger an OTP or biometric prompt. The hosted checkout handles the entire 3DS2 flow automatically. For embedded checkout integrations, the Payments SDK manages the authentication redirect and returns control to your app on completion.',
            },
        ],
    },
    {
        id: 'ecommerce',
        label: 'E-Commerce',
        icon: 'bag',
        // icon: serviceIcon,
        questions: [
            {
                q: 'How do I manage a product catalog via API?',
                a: 'Use the Products API to create, update, and organise your catalog: POST /api/v1/products to create a product with name, description, price, currency, images, and inventory count. Products can be grouped into collections and tagged for search. Each product gets a unique product_id you reference when creating orders. The catalog syncs automatically to the hosted checkout, so customers always see current prices and availability without any additional steps on your end.',
            },
            {
                q: 'Can I embed a hosted checkout in my site?',
                a: 'Yes. The Embedded Checkout SDK lets you render the LOOP Matrix checkout as a modal or inline widget on your own domain — no redirect required. Include the SDK script, call LoopCheckout.open({ intentId }) and the checkout renders inside your page. The customer completes payment without leaving your site. The SDK fires onSuccess, onFailure, and onClose callbacks so you can update your UI immediately. PCI DSS scope remains minimal since card data is handled inside the SDK iframe.',
            },
            {
                q: 'How does order fulfillment work?',
                a: 'Once a PAYMENT_CAPTURED webhook is received, your system should trigger fulfillment. LOOP Matrix provides an Orders API that lets you create an order linked to a payment_intent_id, update its fulfillment status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED), and attach tracking information. Customers can receive automated status notifications via SMS or email if you enable the Notifications add-on. For digital goods, you can trigger instant fulfillment inside the PAYMENT_CAPTURED webhook handler. Physical fulfillment integrations with logistics providers (Sendy, G4S) are available via the Fulfillment Partners SDK.',
            },
            {
                q: 'Does the platform handle tax calculation?',
                a: 'LOOP Matrix includes a Tax Engine that automatically calculates VAT (16% in Kenya) and other applicable taxes at checkout based on the product type, merchant location, and customer location. Tax amounts are itemised on the receipt and included in the payment_intent response under the tax object. For custom tax rules (e.g. exempt products, multi-jurisdiction businesses), you can override tax rates per product via the Products API or disable automatic tax calculation and pass tax amounts directly in the order payload.',
            },
        ],
    },
    {
        id: 'miniapps',
        label: 'Miniapps',
        icon: 'grid',
        questions: [
            {
                q: 'What are Miniapps?',
                a: 'A Miniapp is a lightweight web application that runs natively inside the LOOP or LOOP Biz consumer apps. Users discover and launch Miniapps without leaving LOOP, and payments are pre-authorised via the customers LOOP wallet — no re-entry of payment details. Miniapps are built with standard web technologies (HTML, CSS, JavaScript/React) and access LOOP platform services — payments, identity, loyalty — via the Miniapp SDK. They load instantly and feel like a native feature of the LOOP app.',
            },
            {
                q: 'How do I build and publish a Miniapp?',
                a: 'Build using the Miniapp SDK, test in the Miniapp Sandbox (a local emulator that mimics the LOOP container environment), then submit via the Developer Portal for review. The review process takes 2–5 business days and checks security, UX quality, and compliance with LOOP Miniapp policies. Once approved, your Miniapp appears in the LOOP app marketplace under your chosen category. Updates go through an expedited review and are typically live within 24 hours.',
            },
            {
                q: 'Can Miniapps support deep links?',
                a: 'Yes. Miniapps support deep linking via the loop://miniapp/{your-app-id}/{path} URI scheme. Deep links can open a specific screen inside your Miniapp directly from an SMS, push notification, or external web page. You register your deep link routes in the Developer Portal. The LOOP app resolves the URI, launches your Miniapp, and passes the path and any query parameters to your app via the SDK onDeepLink callback, allowing you to navigate to the correct screen on load.',
            },
        ],
    },
    {
        id: 'vouchers',
        label: 'Vouchers',
        icon: 'tag',
        questions: [
            {
                q: 'How do I create and issue vouchers in bulk?',
                a: 'POST /api/v1/vouchers/bulk with a campaign name, voucher value or discount percentage, expiry date, and quantity. The API returns a batch of unique codes synchronously for small quantities (up to 1,000) or via a webhook for larger batches. Codes can be exported as CSV, JSON, or QR code images. Distribute them through your own channels — LOOP Matrix does not mandate a delivery method. Track issuance status per code via the Vouchers dashboard or analytics endpoints.',
            },
            {
                q: 'What voucher types are supported?',
                a: 'LOOP Matrix supports: fixed-value vouchers (e.g. KES 500 off), percentage-discount vouchers (e.g. 20% off), free-shipping vouchers, gift cards (reloadable balance stored on the code), and cashback vouchers (credit applied after purchase). Vouchers can be scoped to specific products, collections, minimum cart values, customer segments, or first-time buyers. Multi-code campaigns (buy-one-get-one, bundle deals) are configured via campaign rules in the API or portal.',
            },
            {
                q: 'How does voucher redemption validation work?',
                a: 'When a customer applies a voucher code at checkout, LOOP Matrix validates it in real time: checks the code exists, is not expired, has not been redeemed (for single-use codes), and meets all campaign conditions (minimum spend, eligible products, customer eligibility). Single-use codes are marked as redeemed immediately on successful payment with a distributed lock to prevent concurrent double-redemptions. The checkout displays a clear error message if validation fails, with the specific reason.',
            },
            {
                q: 'Can I track voucher redemption and ROI?',
                a: 'Yes. The Vouchers Analytics API and dashboard provide: total issued vs. redeemed counts, redemption rate over time, revenue attributed to each campaign, average discount per order, and breakdown by customer segment. Each redemption event fires a VOUCHER_REDEEMED webhook with the order details, allowing you to pipe data into your own analytics stack. Export reports as CSV for offline analysis. Campaign-level ROI (revenue uplift vs. discount cost) is calculated automatically in the dashboard.',
            },
        ],
    },
    {
        id: 'ekyc',
        label: 'E-KYC',
        icon: 'shield',
        questions: [
            {
                q: 'What does the E-KYC verification flow look like?',
                a: 'The E-KYC flow has three steps: (1) Document capture — the customer photographs their ID document using the camera prompt in your app or the LOOP Matrix hosted verification page. (2) Data extraction — OCR reads all fields and security features are validated. (3) Biometric match — a selfie is captured and compared against the document photo using facial recognition. The entire flow takes under 60 seconds. Results are returned via API response and a KYC_COMPLETED webhook is fired with the verification outcome.',
            },
            {
                q: 'Which document types and countries are supported?',
                a: 'Document support: Kenyan National ID (front and back), Passport (ICAO-compliant, all nationalities), Kenyan Alien ID, Kenyan Driver Licence. Country support for passport verification spans 190+ countries via ICAO document standards. For Kenyan National IDs, verification is cross-referenced with the IPRS (Integrated Population Registration System) in real time. Additional document types and countries are added regularly — check the E-KYC documentation for the current full list.',
            },
            {
                q: 'How does liveness detection work?',
                a: 'Liveness detection uses a passive biometric challenge — the user blinks, turns their head, or smiles while our AI model verifies it is a live person and not a photo, video replay, or 3D mask. The challenge is randomised per session to prevent replay attacks. A liveness confidence score (0–100) is returned in the API response alongside the facial match score. You can configure minimum thresholds for both scores in your KYC policy settings in the Developer Portal.',
            },
            {
                q: 'How long is identity data stored?',
                a: 'By default, biometric and document images are processed in memory and not persisted after the verification completes. Only the extracted data (name, ID number, date of birth, verification status, scores) is stored as part of the KYC record and retained for 7 years per Kenyan AML regulatory requirements. If your compliance policy requires retaining original images, the Document Vault add-on stores them encrypted at rest in Kenyan data centres, with customer-level access controls and a full audit trail.',
            },
            {
                q: 'Can I reuse a verification across products?',
                a: 'Yes. Once a customer has completed E-KYC verification, the resulting KYC record (identified by kyc_record_id) can be referenced across all LOOP Matrix products — you do not need to re-verify the same customer for each product. The KYC record includes the verification level (Basic, Standard, Enhanced) which determines which product tiers the customer is eligible for. Records remain valid for 12 months by default (configurable), after which a re-verification may be required depending on your compliance policy.',
            },
        ],
    },
    {
        id: 'credit',
        label: 'Credit-as-a-Service',
        icon: 'dollar',
        questions: [
            {
                q: 'How does the credit scoring model work?',
                a: ' The E-KYC flow has three steps: (1) Document capture — the customer photographs their ID document using the camera prompt in your app or the LOOP Matrix hosted verification page. (2) Data extraction — OCR reads all fields and security features are validated. (3) Biometric match — a selfie is captured and compared against the document photo using facial recognition. The entire flow takes under 60 seconds. Results are returned via API response and a KYC_COMPLETED webhook is fired with the verification outcome.',
            },
            {
                q: 'How do I originate a loan via the API?',
                a: 'POST /api/v1/credit/applications with the customers kyc_record_id, requested amount, and term. The API runs the credit decision and, if approved, returns a loan_offer with the approved amount, interest rate, repayment schedule, and offer expiry. The customer accepts the offer via POST /api/v1/credit/applications/{id}/accept. On acceptance, funds are disbursed to the customers M-Pesa or LOOP Wallet within seconds. The entire flow from application to disbursement can be embedded in your app using the Credit SDK.',
            },
            {
                q: 'How are loan repayments collected?',
                a: 'Repayments are collected via: M-Pesa standing orders (the customer pre-authorises automatic deductions on the due date), M-Pesa STK Push on the due date (customer confirms payment), or direct debit from the LOOP Wallet balance. LOOP Matrix handles reminder SMS/push notifications, retry logic on failed collections, and grace period management per the policy you configure. Repayment events fire LOAN_REPAYMENT_RECEIVED webhooks so you can update your records in real time.',
            },
            {
                q: 'Do you report to credit bureaus?',
                a: 'LOOP Matrix submits loan performance data to CRB Africa and TransUnion Kenya on your behalf on a monthly basis, as required by Kenyan credit regulations. Positive repayment history is reported to help build borrowers credit profiles. For delinquent accounts (90+ days overdue), adverse listings are submitted with the mandatory 7-day advance notice to the borrower via SMS. You can view all bureau submissions and their status in the Credit dashboard. Bureau reporting is included at no additional cost for all Credit-as-a-Service users..',
            },
        ],
    },
    {
        id: 'wallets',
        label: 'Wallets-as-a-Service',
        icon: 'wallet',
        questions: [
            {
                q: 'How do I create a wallet for a user?',
                a: 'POST /api/v1/wallets with the customers phone number and KYC level. For a Basic wallet (phone verification only), the wallet is created instantly. For Standard or Enhanced wallets, include the kyc_record_id from a completed E-KYC verification. The response includes the wallet_id and initial balance (zero). You can fund the wallet immediately via the top-up API (M-Pesa, card, bank transfer) or allow the customer to fund it themselves through your apps funding flow powered by the Wallet SDK.',
            },
            {
                q: 'How does multi-currency work?',
                a: 'Each wallet can hold balances in multiple currencies simultaneously — KES, UGX, TZS, USD, EUR, and GBP by default. Each currency is tracked as a separate sub-balance within the wallet. When a customer makes a payment in a currency they hold, the debit hits that sub-balance directly. Cross-currency payments (e.g. paying in USD from a KES balance) are converted at the LOOP Matrix mid-market rate at the time of the transaction, with the rate and converted amount shown to the customer before they confirm.',
            },
            {
                q: 'What transaction limits apply to wallets?',
                a: 'Limits are set by KYC tier and CBK regulations: Basic wallet — KES 100,000 maximum balance, KES 300,000 monthly transaction volume. Standard wallet — KES 300,000 maximum balance, KES 1,000,000 monthly volume. Enhanced wallet — no fixed limit, subject to enhanced due diligence and CBK approval. Per-transaction limits follow the payment rail used (M-Pesa: KES 150,000 per transaction). Merchants can configure stricter limits per wallet tier in their Wallets-as-a-Service settings.',
            },
            {
                q: 'Can wallets earn interest?',
                a: 'Yes, on Enterprise plans. LOOP Matrix offers a Float Interest Programme where customer wallet balances contribute to a pooled float that earns interest from short-duration treasury instruments. Interest is accrued daily and credited to customer wallets monthly at a rate disclosed in your apps terms. The rate is set by LOOP Matrix based on prevailing CBK rates and is updated quarterly. Interest income is reported to customers for tax purposes via the annual statement generated by the Wallets API.',
            },
            {
                q: 'Can users generate statements?',
                a: 'Yes. The Wallet Statements API (GET /api/v1/wallets/{id}/statements) returns a paginated transaction history with filters for date range, transaction type, currency, and amount. Statements can be downloaded as PDF or CSV via the API and are formatted to meet Kenyan bank statement standards, making them accepted as proof of financial activity for loan applications and visa processing. You can also enable automated monthly statement emails to customers directly from the Developer Portal.',
            },
        ],
    },
];

export default FAQ_CATEGORIES;
