/* eslint-disable */
/*
 * Authorization docs content (LOOP OAuth2 design).
 * Self-contained; rendered inside DocsLayout by DocsAuthorization.
 * Uses LOOP CSS vars (with dark fallbacks) so it adapts to light/dark.
 */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const ORANGE = '#FF5F00';
const TEXT = 'var(--loop-text, #E5E7EB)';
const MUTED = 'var(--loop-muted, #9CA3AF)';
const SURFACE = 'var(--loop-surface, #11161f)';
const BORDER = 'var(--loop-border, #232a36)';
const CODEBG = 'var(--loop-code-bg, #0b0e14)';

const copy = (v) => {
    try { navigator.clipboard.writeText(v); } catch (e) { /* ignore */ }
};

const ENDPOINTS = [
    { env: 'SANDBOX', color: '#4ADE80', url: 'https://sandbox.loop.co.ke/gateway/auth/v1/oauth2/token' },
    { env: 'PRODUCTION', color: '#FB923C', url: 'https://api.loop.co.ke/gateway/auth/v1/oauth2/token' },
];

const OVERVIEW_POINTS = [
    'OAuth 2.0 client credentials grant',
    'Token expiry: 3600 seconds (1 hour)',
    'Sandbox credentials are pre-filled in the Postman Collection',
];

const HOW = [
    'Obtain a Security Credential from the LOOP Merchant Portal (production) — or use sandbox values pre-filled in the Postman Collection.',
    'Create an application in the Developer Portal and retrieve your Consumer Key and Consumer Secret from the Sandbox Keys tab.',
    'Call the Authorization API to receive a Bearer Token.',
    'Every payment API call carries Authorization: Bearer <token> in the header and securityCredential + merchantId in the body.',
];

const SECURITY_STEPS = [
    'Log in to the LOOP Merchant Portal.',
    'Navigate to Security Credentials in the left sidebar.',
    'Click Generate New Credential, enter a name, and verify via OTP.',
    'Copy the credential immediately — it is shown once only and cannot be retrieved again.',
];

const REQ_TABS = {
    cURL: [
        "curl -X POST 'https://sandbox.loop.co.ke/gateway/auth/v1/oauth2/token' \\",
        "  -H 'Authorization: Basic <Base64(consumer_key:consumer_secret)>' \\",
        "  -H 'Content-Type: application/x-www-form-urlencoded' \\",
        '  -d \'grant_type=client_credentials\'',
    ],
    'Node.js': [
        "const res = await fetch('https://sandbox.loop.co.ke/gateway/auth/v1/oauth2/token', {",
        "  method: 'POST',",
        '  headers: {',
        "    Authorization: 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64'),",
        "    'Content-Type': 'application/x-www-form-urlencoded',",
        '  },',
        "  body: 'grant_type=client_credentials',",
        '});',
        'const { access_token } = await res.json();',
    ],
    Python: [
        'import requests, base64',
        "auth = base64.b64encode(f'{key}:{secret}'.encode()).decode()",
        'res = requests.post(',
        "    'https://sandbox.loop.co.ke/gateway/auth/v1/oauth2/token',",
        "    headers={'Authorization': f'Basic {auth}',",
        "             'Content-Type': 'application/x-www-form-urlencoded'},",
        "    data={'grant_type': 'client_credentials'})",
        "print(res.json()['access_token'])",
    ],
};

const PARAMS = [
    { name: 'Authorization', loc: 'Header', type: 'string', req: 'Yes', desc: 'Basic <Base64(consumer_key:consumer_secret)>' },
    { name: 'Content-Type', loc: 'Header', type: 'string', req: 'Yes', desc: 'application/x-www-form-urlencoded' },
    { name: 'grant_type', loc: 'Body', type: 'string', req: 'Yes', desc: 'Must be client_credentials' },
];

const RESPONSE = [
    '{',
    '  "access_token": "8cc9bfb4-783b-4b78-ae0e-cc1c2c2127a5",',
    '  "token_type": "Bearer",',
    '  "expires_in": 3600',
    '}',
];

const ERRORS = [
    { code: '400', cause: 'Missing or invalid grant_type', fix: 'Set to client_credentials' },
    { code: '401', cause: 'Invalid Consumer Key or Secret', fix: 'Re-check Base64 encoding' },
];

const SDKS = [
    { tag: 'AND', name: 'Android SDK', desc: 'Native Android integration library' },
    { tag: 'JAVA', name: 'Java SDK', desc: 'Java / Spring Boot integration library' },
    { tag: 'JS', name: 'JavaScript SDK', desc: 'Node.js and browser compatible' },
    { tag: 'JMX', name: 'JMeter SDK', desc: 'Load testing configuration' },
];

const FAQS = [
    { q: "My Bearer Token isn't working.", a: 'Tokens expire after 3600 seconds (1 hour). Request a fresh token from the Authorization API and ensure you send it as "Authorization: Bearer <token>".' },
    { q: "I'm getting a 401 on the Authorization API.", a: 'A 401 means the Consumer Key/Secret pair is wrong or the Base64 encoding is incorrect. Re-copy the key & secret from your application and Base64-encode "key:secret" exactly.' },
    { q: 'Where do I find my Consumer Key and Secret?', a: 'In the Developer Portal, open your application and go to the Production Keys or Sandbox Keys tab.' },
    { q: 'Where do I get my Security Credential?', a: 'For production, generate it in the LOOP Merchant Portal under Security Credentials (verify via OTP). For sandbox, it is pre-filled in the Postman Collection.' },
    { q: 'Can I reuse a token across multiple requests?', a: 'Yes. A token is valid for all calls until it expires (1 hour). Cache it and reuse it instead of requesting a new one per call.' },
];

const Root = styled('div')(() => ({
    color: TEXT,
    fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
    width: '100%',
    '& .sec': { marginBottom: 44 },
    '& .marker': {
        color: ORANGE, fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        fontWeight: 600, letterSpacing: 1, display: 'inline-block', marginBottom: 10,
    },
    '& .h1': { fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, lineHeight: '100%', margin: '0 0 14px', color: '#E8EDF2' },
    '& .h2': { fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, lineHeight: '100%', margin: '0 0 14px', color: '#E8EDF2' },
    '& .h3': { fontSize: 14, fontWeight: 600, margin: '18px 0 10px', color: TEXT },
    '& .lead': { fontFamily: "'Poppins', sans-serif", color: '#9CA3AF', fontWeight: 400, fontSize: 16, lineHeight: '27.8px', margin: 0, maxWidth: 680 },
    '& .para': { color: MUTED, fontSize: 15, lineHeight: '24px', margin: '0 0 12px', maxWidth: 680 },
    '& .mono': { color: ORANGE, fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5 },
    '& .points': { listStyle: 'none', padding: 0, margin: 0 },
    '& .points li': { color: MUTED, fontSize: 15, lineHeight: '26px', paddingLeft: 16, position: 'relative' },
    '& .points li::before': { content: '"•"', color: ORANGE, position: 'absolute', left: 0 },

    /* endpoint row */
    '& .epRow': {
        display: 'flex', alignItems: 'center', gap: 8, background: '#113516',
        border: '1px solid #FFFFFF1A', borderRadius: 10, padding: '12px 14px', marginBottom: 12,
    },
    '& .epBadge': { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, minWidth: 84, flexShrink: 0 },
    '& .epMethod': { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, lineHeight: '16px', color: '#28C840', background: '#28C8401F', border: '0.61px solid #28C84040', padding: '4px 8px', borderRadius: 6 },
    '& .epUrl': { flex: 1, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#A78BFA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    '& .epCopy': { cursor: 'pointer', color: '#6B7280', fontSize: 13, background: '#FFFFFF12', border: '1px solid #FFFFFF24', borderRadius: 6, padding: '4px 12px' },
    '& .epBtns': { display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap' },
    '& .epBtn': { cursor: 'pointer', background: 'none', border: `1px solid ${ORANGE}`, color: ORANGE, borderRadius: 10, padding: '13px 22px', fontSize: 15, fontFamily: 'inherit' },
    '& .epBtnGhost': { cursor: 'pointer', background: 'none', border: '1px solid #FFFFFF33', color: TEXT, borderRadius: 10, padding: '13px 22px', fontSize: 15, fontFamily: 'inherit' },
    '& .epBtnPostman': { cursor: 'pointer', background: '#0A0A0A', border: '1px solid #FFFFFF4D', color: TEXT, borderRadius: 10, padding: '13px 22px', fontSize: 15, fontFamily: 'inherit' },

    /* numbered steps */
    '& .step': { display: 'flex', gap: 14, marginBottom: 16, maxWidth: 680 },
    '& .stepNum': { flex: '0 0 26px', width: 26, height: 26, borderRadius: '50%', background: ORANGE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" },
    '& .stepText': { color: MUTED, fontSize: 15, lineHeight: '24px', paddingTop: 2 },

    /* green note */
    '& .note': { background: '#052E16', border: '1px solid #14532D', borderRadius: 10, padding: '14px 16px', margin: '12px 0', maxWidth: 680 },
    '& .noteLabel': { fontFamily: "'Poppins', sans-serif", color: '#86EFAC', fontWeight: 700, fontSize: 13, lineHeight: '20.8px' },
    '& .noteText': { fontFamily: "'Poppins', sans-serif", color: '#86EFAC', fontWeight: 400, fontSize: 14, lineHeight: '20.8px', margin: '4px 0 0' },

    /* code window */
    '& .code': { background: CODEBG, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', margin: '12px 0' },
    '& .codeBar': { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER}`, padding: '8px 12px' },
    '& .codeTabs': { display: 'flex', gap: 14 },
    '& .codeTab': { cursor: 'pointer', color: MUTED, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", background: 'none', border: 'none', padding: 0 },
    '& .codeTabActive': { color: ORANGE },
    '& .codeCopy': { cursor: 'pointer', color: MUTED, fontSize: 13, background: 'none', border: 'none' },
    '& .codeBody': { margin: 0, padding: 16, color: '#a9b7c6', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: '21px', overflowX: 'auto', whiteSpace: 'pre' },

    /* table */
    '& .tableWrap': { border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', margin: '12px 0' },
    '& table': { width: '100%', borderCollapse: 'collapse', fontSize: 13.5 },
    '& th': { textAlign: 'left', color: MUTED, fontWeight: 600, padding: '10px 14px', background: SURFACE, borderBottom: `1px solid ${BORDER}` },
    '& td': { color: TEXT, padding: '10px 14px', borderBottom: `1px solid ${BORDER}` },
    '& tr:last-child td': { borderBottom: 'none' },
    '& .tkey': { color: ORANGE, fontFamily: "'JetBrains Mono', monospace" },
    '& .yes': { color: '#3ddc84', fontWeight: 600 },

    /* SDK cards */
    '& .sdk': { display: 'flex', alignItems: 'center', gap: 14, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '12px 14px', marginBottom: 12 },
    '& .sdkTag': { flex: '0 0 44px', width: 44, height: 44, borderRadius: 8, background: 'rgba(255,95,0,0.12)', color: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700 },
    '& .sdkName': { color: TEXT, fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" },
    '& .sdkDesc': { color: MUTED, fontSize: 13, margin: '2px 0 0' },
    '& .sdkBtn': { marginLeft: 'auto', cursor: 'pointer', background: ORANGE, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontFamily: 'inherit' },

    /* FAQ */
    '& .faq': { background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10, marginBottom: 10 },
    '& .faqQ': { width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', color: TEXT, fontSize: 14, fontWeight: 500, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' },
    '& .faqA': { color: MUTED, fontSize: 14, lineHeight: '22px', padding: '0 16px 14px' },
    '& .faqSign': { color: ORANGE, fontSize: 18, marginLeft: 12 },
}));

function CodeTabs({ tabsObj }) {
    const names = Object.keys(tabsObj);
    const [sel, setSel] = useState(names[0]);
    return (
        <div className='code'>
            <div className='codeBar'>
                <div className='codeTabs'>
                    {names.map((n) => (
                        <button
                            key={n}
                            type='button'
                            className={`codeTab ${n === sel ? 'codeTabActive' : ''}`}
                            onClick={() => setSel(n)}
                        >
                            {n}
                        </button>
                    ))}
                </div>
                <button type='button' className='codeCopy' onClick={() => copy(tabsObj[sel].join('\n'))}>Copy</button>
            </div>
            <pre className='codeBody'>{tabsObj[sel].join('\n')}</pre>
        </div>
    );
}

function PlainCode({ lines }) {
    return (
        <div className='code'>
            <div className='codeBar'>
                <span className='codeTab codeTabActive'>JSON</span>
                <button type='button' className='codeCopy' onClick={() => copy(lines.join('\n'))}>Copy</button>
            </div>
            <pre className='codeBody'>{lines.join('\n')}</pre>
        </div>
    );
}

function Faq({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className='faq'>
            <button type='button' className='faqQ' onClick={() => setOpen(!open)}>
                <span>{q}</span>
                <span className='faqSign'>{open ? '−' : '+'}</span>
            </button>
            {open && <div className='faqA'>{a}</div>}
        </div>
    );
}

export const AUTH_TOC = [
    { id: 'endpoint', label: 'Endpoint', active: true },
    { id: 'overview', label: 'Overview' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'security-credentials', label: 'Security Credentials' },
    {
        id: 'oauth2-bearer-token',
        label: 'OAuth2 Bearer Token',
        subs: [
            { id: 'request', label: 'Request' },
            { id: 'response', label: 'Response' },
        ],
    },
    { id: 'sdk', label: 'SDK' },
    { id: 'faqs', label: 'FAQs' },
];

// Static slot A — rendered BEFORE the dynamic Endpoints block.
export function AuthIntro() {
    return (
        <Root>
            <section id='authorization-intro' className='sec'>
                <span className='marker'>{'// INTRODUCTION'}</span>
                <h1 className='h1'>Authorization</h1>
                <p className='lead'>
                    LOOP payment APIs require two credentials on every request: a Security Credential
                    from the Merchant Portal and an OAuth2 Bearer Token from your Developer Portal application.
                </p>
            </section>
        </Root>
    );
}

// Static slot B — rendered BETWEEN the dynamic Endpoints and SDKs blocks.
export function AuthMiddle() {
    return (
        <Root>
            <section id='overview' className='sec'>
                <span className='marker'>{'// OVERVIEW'}</span>
                <h2 className='h2'>Overview</h2>
                <p className='para'>
                    The Authorization API issues the OAuth2 Bearer Token required to authenticate all
                    LOOP API calls. Every payment endpoint requires a valid token.
                </p>
                <ul className='points'>
                    {OVERVIEW_POINTS.map((p) => (<li key={p}>{p}</li>))}
                </ul>
            </section>

            <section id='how-it-works' className='sec'>
                <span className='marker'>{'// HOW IT WORKS'}</span>
                <h2 className='h2'>How it Works</h2>
                {HOW.map((s, i) => (
                    <div className='step' key={s}>
                        <span className='stepNum'>{i + 1}</span>
                        <span className='stepText'>{s}</span>
                    </div>
                ))}
            </section>

            <section id='security-credentials' className='sec'>
                <span className='marker'>{'// CREDENTIALS'}</span>
                <h2 className='h2'>Security Credential</h2>
                <p className='para'>
                    A unique token that binds your merchant identity to your API access. Passed in the
                    body of every payment API request alongside your merchantId.
                </p>
                <div className='note'>
                    <div className='noteLabel'>Sandbox</div>
                    <p className='noteText'>
                        Security Credential and Merchant ID are pre-filled in the Postman Collection.
                        No action needed to start testing.
                    </p>
                </div>
                <h3 className='h3'>Production Setup</h3>
                {SECURITY_STEPS.map((s, i) => (
                    <div className='step' key={s}>
                        <span className='stepNum'>{i + 1}</span>
                        <span className='stepText'>{s}</span>
                    </div>
                ))}
            </section>

            <section id='oauth2-bearer-token' className='sec'>
                <span className='marker'>{'// TOKEN'}</span>
                <h2 className='h2'>OAuth2 Bearer Token</h2>

                <h3 id='request' className='h3'>Request</h3>
                <CodeTabs tabsObj={REQ_TABS} />

                <h3 className='h3'>Request Parameters</h3>
                <div className='tableWrap'>
                    <table>
                        <thead>
                            <tr><th>Name</th><th>Location</th><th>Type</th><th>Required</th><th>Description</th></tr>
                        </thead>
                        <tbody>
                            {PARAMS.map((p) => (
                                <tr key={p.name}>
                                    <td className='tkey'>{p.name}</td>
                                    <td>{p.loc}</td>
                                    <td>{p.type}</td>
                                    <td className='yes'>{p.req}</td>
                                    <td>{p.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 id='response' className='h3'>Response — 200 OK</h3>
                <PlainCode lines={RESPONSE} />

                <h3 className='h3'>Error Responses</h3>
                <div className='tableWrap'>
                    <table>
                        <thead>
                            <tr><th>Code</th><th>Cause</th><th>Fix</th></tr>
                        </thead>
                        <tbody>
                            {ERRORS.map((e) => (
                                <tr key={e.code}>
                                    <td className='tkey'>{e.code}</td>
                                    <td>{e.cause}</td>
                                    <td>{e.fix}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </Root>
    );
}

// Static slot C — rendered AFTER the dynamic SDKs block.
export function AuthEnd() {
    return (
        <Root>
            <section id='faqs' className='sec'>
                <span className='marker'>{'// FAQS'}</span>
                <h2 className='h2'>FAQs</h2>
                {FAQS.map((f) => (<Faq key={f.q} q={f.q} a={f.a} />))}
            </section>
        </Root>
    );
}

// Legacy composed view (slots only, no dynamic blocks) — kept for back-compat.
function AuthorizationContent() {
    return (
        <>
            <AuthIntro />
            <AuthMiddle />
            <AuthEnd />
        </>
    );
}

export default AuthorizationContent;
