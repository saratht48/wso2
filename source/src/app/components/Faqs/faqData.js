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

const FAQ_CATEGORIES = [
    {
        id: 'general',
        label: 'General',
        icon: 'question',
        questions: [
            {
                q: 'What is LOOPDFS Developer Portal?',
                a: 'LOOPDFS Developer Portal is a unified API platform that gives developers access to '
                    + 'financial infrastructure services — including Payments, E-Commerce, Miniapps, '
                    + 'Vouchers, E-KYC, Credit-as-a-Service, and Wallets-as-a-Service — through a single, '
                    + 'consistent API interface. You can authenticate once and interact with all our '
                    + 'product APIs using the same credentials and SDK.',
            },
            {
                q: 'How does pricing work?',
                a: 'Pricing is usage-based with no upfront fees — you pay only for what you use, and '
                    + 'volume discounts apply automatically as you scale. Sandbox usage is always free.',
            },
            {
                q: 'Is there a sandbox environment for testing?',
                a: 'Yes. Every account includes a fully featured sandbox with test credentials and '
                    + 'realistic mock data, so you can build and test integrations end-to-end before '
                    + 'going live.',
            },
            {
                q: 'What are the API rate limits?',
                a: 'Default limits are 100 requests/second in sandbox and 500 requests/second in '
                    + 'production, per environment. Higher limits are available on request for '
                    + 'enterprise plans.',
            },
            {
                q: 'How do I get technical support?',
                a: 'Reach our developer support team via the in-portal chat, email, or the Contact '
                    + 'support link — our team responds within 2 business hours on business days.',
            },
            {
                q: 'What is your API uptime SLA?',
                a: 'We guarantee 99.9% uptime for all production APIs, backed by a financially-backed '
                    + 'SLA and a public status page with real-time incident reporting.',
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
                a: 'A Payment Intent represents a single payment lifecycle — it tracks the amount, '
                    + 'currency, and status from creation through to capture, so you can handle '
                    + 'authentication, retries, and confirmation reliably.',
            },
            {
                q: 'Which payment methods are supported?',
                a: 'Cards, mobile money, bank transfers, and digital wallets are supported out of the '
                    + 'box, with new methods added regularly across supported regions.',
            },
            {
                q: 'How do refunds work?',
                a: 'Issue full or partial refunds against any captured payment with a single API call; '
                    + 'funds return to the original payment method and appear in your reconciliation '
                    + 'reports.',
            },
            {
                q: 'Is the Payments API PCI compliant?',
                a: 'Yes. The Payments API is PCI DSS Level 1 compliant, and our hosted fields and SDKs '
                    + 'keep sensitive card data off your servers.',
            },
            {
                q: 'How are webhooks delivered for payment events?',
                a: 'We deliver signed webhook events for every state change with automatic retries and a '
                    + 'replay endpoint, so your systems stay in sync even after downtime.',
            },
            {
                q: 'Can I route payments across multiple providers?',
                a: 'Yes. Smart routing automatically selects the optimal provider per transaction to '
                    + 'maximise success rates and minimise cost.',
            },
        ],
    },
    {
        id: 'ecommerce',
        label: 'E-Commerce',
        icon: 'bag',
        questions: [
            {
                q: 'What does the E-Commerce API offer?',
                a: 'It provides hosted checkout, catalog and inventory management, order tracking, and '
                    + 'subscriptions through a single integration.',
            },
            {
                q: 'Can I customise the checkout experience?',
                a: 'Yes — use the hosted checkout for the fastest path, or compose your own flow with '
                    + 'our embeddable components and APIs.',
            },
            {
                q: 'Does it support subscriptions and recurring billing?',
                a: 'Recurring billing with flexible plans, trials, proration, and dunning is built in.',
            },
            {
                q: 'How is inventory kept in sync across channels?',
                a: 'Inventory updates propagate in real time across your website, marketplaces, and '
                    + 'in-person channels from a single source of truth.',
            },
            {
                q: 'Can I sell in multiple currencies?',
                a: 'Yes, with automatic currency conversion at live rates and localized pricing.',
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
                a: 'Miniapps are lightweight applications that run inside the LOOP ecosystem, letting you '
                    + 'reach users without a separate install.',
            },
            {
                q: 'How do I build a Miniapp?',
                a: 'Install the @loop/miniapp-sdk, initialize with your app credentials, and use '
                    + 'built-in features like user identity and payments.',
            },
            {
                q: 'Can Miniapps accept payments?',
                a: 'Yes — request payments directly through the SDK using the same credentials as the '
                    + 'rest of the platform.',
            },
            {
                q: 'How are Miniapps deployed?',
                a: 'Push updates instantly without app-store reviews; changes go live as soon as you '
                    + 'deploy.',
            },
            {
                q: 'Is there a review process?',
                a: 'Miniapps follow lightweight platform guidelines; most updates deploy instantly with '
                    + 'no manual review.',
            },
        ],
    },
    {
        id: 'vouchers',
        label: 'Vouchers',
        icon: 'tag',
        questions: [
            {
                q: 'What is the Vouchers API?',
                a: 'The Vouchers API lets you issue, redeem, and manage digital vouchers, gift cards, '
                    + 'and promo codes programmatically.',
            },
            {
                q: 'Can vouchers have expiry and usage rules?',
                a: 'Yes — set expiry dates, usage limits, minimum spend, and product restrictions per '
                    + 'voucher or campaign.',
            },
            {
                q: 'How are vouchers redeemed?',
                a: 'Validate and redeem vouchers in real time via the API at checkout, with atomic '
                    + 'guarantees against double-spend.',
            },
            {
                q: 'Can I run bulk voucher campaigns?',
                a: 'Generate and distribute vouchers in bulk, then track redemption and performance '
                    + 'from the dashboard.',
            },
        ],
    },
    {
        id: 'ekyc',
        label: 'E-KYC',
        icon: 'shield',
        questions: [
            {
                q: 'What is E-KYC?',
                a: 'E-KYC provides online identity verification — document checks, biometric matching, '
                    + 'and liveness — to onboard users compliantly.',
            },
            {
                q: 'Which documents are supported?',
                a: 'Government IDs, passports, and driver licenses across supported regions, with '
                    + 'automatic data extraction.',
            },
            {
                q: 'How long does verification take?',
                a: 'Most verifications complete in seconds; edge cases are escalated for manual review '
                    + 'with status webhooks.',
            },
            {
                q: 'Is E-KYC data handled securely?',
                a: 'All verification data is encrypted in transit and at rest and handled in line with '
                    + 'regional data-protection regulations.',
            },
        ],
    },
    {
        id: 'credit',
        label: 'Credit-as-a-Service',
        icon: 'dollar',
        questions: [
            {
                q: 'What is Credit-as-a-Service?',
                a: 'Credit-as-a-Service lets you originate, underwrite, and service loans '
                    + 'programmatically, embedding credit products into your app.',
            },
            {
                q: 'How is creditworthiness assessed?',
                a: 'Real-time scoring combines platform signals and bureau data to produce affordability '
                    + 'and risk assessments.',
            },
            {
                q: 'Can I offer flexible repayment plans?',
                a: 'Yes — configure schedules, interest, and fees, and generate statements and '
                    + 'repayment plans via the API.',
            },
            {
                q: 'Is lending compliant with regulations?',
                a: 'The service is built to support regional lending regulations, with audit trails and '
                    + 'disclosures included.',
            },
        ],
    },
    {
        id: 'wallets',
        label: 'Wallets-as-a-Service',
        icon: 'wallet',
        questions: [
            {
                q: 'What are Wallets-as-a-Service?',
                a: 'Issue and manage multi-currency digital wallets for your users, with funding, '
                    + 'transfers, and balances via API.',
            },
            {
                q: 'Can users top up and transfer funds?',
                a: 'Yes — instant wallet funding and peer-to-peer transfers are supported with full '
                    + 'transaction history.',
            },
            {
                q: 'Do you support card issuing?',
                a: 'Spin up virtual and physical cards linked to wallets on demand, with spend '
                    + 'controls.',
            },
            {
                q: 'Is currency conversion supported?',
                a: 'Convert between currencies at live rates directly within the wallet.',
            },
        ],
    },
];

export default FAQ_CATEGORIES;
