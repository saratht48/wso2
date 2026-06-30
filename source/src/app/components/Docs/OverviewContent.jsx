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

import React from 'react';
import PropTypes from 'prop-types';
import { app } from 'Settings';
import { styled } from '@mui/material/styles';
import {
    BagIcon, TransferIcon, StarIcon, TicketIcon, KycIcon, WalletIcon,
    BookIcon, CompassIcon, CodeIcon, ArrowUpRightIcon, ArrowRightIcon,
} from './Icons';
import { ORANGE, GREEN } from './tokens';
import { Box } from '@mui/material';

const PREFIX = 'DocsContent';

const classes = {
    section: `${PREFIX}-section`,
    eyebrow: `${PREFIX}-eyebrow`,
    h1: `${PREFIX}-h1`,
    h2: `${PREFIX}-h2`,
    lead: `${PREFIX}-lead`,
    para: `${PREFIX}-para`,
    cardGrid: `${PREFIX}-cardGrid`,
    card: `${PREFIX}-card`,
    cardIcon: `${PREFIX}-cardIcon`,
    cardArrow: `${PREFIX}-cardArrow`,
    cardTitle: `${PREFIX}-cardTitle`,
    cardDesc: `${PREFIX}-cardDesc`,
    diagram: `${PREFIX}-diagram`,
    diagramBox: `${PREFIX}-diagramBox`,
    diagramBoxActive: `${PREFIX}-diagramBoxActive`,
    diagramTitle: `${PREFIX}-diagramTitle`,
    diagramSub: `${PREFIX}-diagramSub`,
    diagramArrow: `${PREFIX}-diagramArrow`,
    tableWrap: `${PREFIX}-tableWrap`,
    table: `${PREFIX}-table`,
    badgeGreen: `${PREFIX}-badgeGreen`,
    badgeGray: `${PREFIX}-badgeGray`,
    code: `${PREFIX}-code`,
    pill: `${PREFIX}-pill`,
    steps: `${PREFIX}-steps`,
    step: `${PREFIX}-step`,
    stepNum: `${PREFIX}-stepNum`,
    stepBody: `${PREFIX}-stepBody`,
    stepTitle: `${PREFIX}-stepTitle`,
    stepText: `${PREFIX}-stepText`,
    codeBlock: `${PREFIX}-codeBlock`,
    nextGrid: `${PREFIX}-nextGrid`,
    nextCard: `${PREFIX}-nextCard`,
    nextIcon: `${PREFIX}-nextIcon`,
    nextTitle: `${PREFIX}-nextTitle`,
    nextDesc: `${PREFIX}-nextDesc`,
    inlineCode: `${PREFIX}-inlineCode`,
};

const Root = styled('div')(({ theme }) => ({
    minWidth: 0,
    color: '#E8EDF2',
    [`& .${classes.section}`]: {
        scrollMarginTop: 24,
        marginBottom: 56,
    },
    [`& .${classes.eyebrow}`]: {
        display: 'inline-block',
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: ORANGE,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 1,
        backgroundColor: '#FF5F0014',
        border: 'none',
        borderTop: '0.61px solid #FF5F0033',
        borderRadius: 4,
        padding: '5px 10px',
        margin: '0 0 14px',
    },
    [`& .${classes.h1}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-text-primary)',
        fontSize: 38,
        fontWeight: 700,
        lineHeight: '42px',
        margin: '0 0 18px',
        [theme.breakpoints.down('sm')]: { fontSize: 26, lineHeight: '34px' },
    },
    [`& .${classes.h2}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-text-primary)',
        fontSize: 24,
        fontWeight: 700,
        lineHeight: '32px',
        margin: '0 0 16px',
        [theme.breakpoints.down('sm')]: { fontSize: 20, lineHeight: '28px' },
    },
    [`& .${classes.lead}`]: {
        color: 'var(--loop-text-muted)',
        fontSize: 18,
        lineHeight: '27px',
        margin: '0 0 8px',
        maxWidth: 920,
        [theme.breakpoints.down('sm')]: { fontSize: 16 },
    },
    [`& .${classes.para}`]: {
        color: 'var(--loop-text-muted)',
        fontSize: 16,
        lineHeight: '25px',
        margin: '0 0 28px',
        maxWidth: 920,
    },
    [`& .${classes.inlineCode}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: ORANGE,
        fontSize: 13.5,
    },
    [`& .${classes.cardGrid}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
    },
    [`& .${classes.card}`]: {
        position: 'relative',
        backgroundColor: 'var(--loop-surface)',
        border: '1px solid var(--loop-border)',
        borderRadius: 12,
        padding: 20,
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,95,0,0.4)' },
    },
    [`& .${classes.cardIcon}`]: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(255,95,0,0.1)',
        border: '1px solid rgba(255,95,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    [`& .${classes.cardArrow}`]: {
        position: 'absolute',
        bottom: 20,
        right: 80,
    },
    [`& .${classes.cardTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-text-primary)',
        fontSize: 16,
        fontWeight: 600,
        margin: '0 0 8px',
    },
    [`& .${classes.cardDesc}`]: {
        color: '#6B7280',
        fontSize: 13.5,
        lineHeight: '21px',
        margin: 0,
        maxWidth:'330px',
    },
    [`& .${classes.diagram}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        backgroundColor: 'var(--loop-surface)',
        border: '1px solid var(--loop-border)',
        borderRadius: 12,
        padding: 28,
        [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
    },
    [`& .${classes.diagramBox}`]: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'var(--loop-surface-2)',
        border: '1px solid var(--loop-border)',
        borderRadius: 10,
        padding: '16px 12px',
        [theme.breakpoints.down('sm')]: { width: '100%', flex: 'none' },
    },
    [`& .${classes.diagramBoxActive}`]: {
        backgroundColor: 'rgba(255,95,0,0.08)',
        border: '1px solid rgba(255,95,0,0.4)',
    },
    [`& .${classes.diagramTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: '#F2652459',
        fontSize: 14,
        fontWeight: 600,
        margin: '0 0 4px',
    },
    [`& .${classes.diagramSub}`]: {
        color: '#6B7280',
        fontSize: 12,
        margin: 0,
    },
    [`& .${classes.diagramArrow}`]: {
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: { transform: 'rotate(90deg)' },
    },
    [`& .${classes.tableWrap}`]: {
        overflowX: 'auto',
        border: '1px solid var(--loop-border)',
        borderRadius: 12,
    },
    [`& .${classes.table}`]: {
        width: '100%',
        minWidth: 520,
        borderCollapse: 'collapse',
        '& th': {
            textAlign: 'left',
            color: 'var(--loop-text-muted)',
            fontSize: 12.5,
            fontWeight: 500,
            padding: '12px 16px',
            backgroundColor: 'var(--loop-surface-2)',
            borderBottom: '1px solid var(--loop-border)',
        },
        '& td': {
            padding: '14px 16px',
            fontSize: 13.5,
            color: 'var(--loop-text-primary)',
            borderBottom: '1px solid var(--loop-border)',
        },
        '& tr:last-of-type td': { borderBottom: 'none' },
    },
    [`& .${classes.pill}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 12.5,
        color: ORANGE,
        backgroundColor: 'rgba(255,95,0,0.08)',
        borderRadius: 6,
        padding: '3px 8px',
    },
    [`& .${classes.badgeGreen}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        color: '#22C55E',
        fontSize: 13,
        fontWeight: 600,
    },
    [`& .${classes.badgeGray}`]: {
        color: '#6B7280',
        fontSize: 13,
    },
    [`& .${classes.steps}`]: {
        display: 'flex',
        flexDirection: 'column',
    },
    [`& .${classes.step}`]: {
        display: 'flex',
        gap: 18,
        paddingBottom: 28,
        position: 'relative',
    },
    [`& .${classes.stepNum}`]: {
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(255,95,0,0.1)',
        border: '1px solid rgba(255,95,0,0.3)',
        color: ORANGE,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 13,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    [`& .${classes.stepBody}`]: { flex: 1, minWidth: 0, paddingTop: 4 },
    [`& .${classes.stepTitle}`]: {
        color: 'var(--loop-text-primary)',
        fontSize: 15,
        fontWeight: 600,
        margin: '0 0 6px',
    },
     [`& .${classes.stepdesc}`]: {
        color: '#E8EDF273',
        fontSize: 14,
        margin: '0 0 6px',
    },
    [`& .${classes.stepText}`]: {
        color: '#6B7280',
        fontSize: 13.5,
        lineHeight: '22px',
        margin: '0 0 14px',
        maxWidth: 670,
    },
    [`& .${classes.codeBlock}`]: {
        backgroundColor: 'var(--loop-code-bg)',
        border: '1px solid var(--loop-border)',
        borderRadius: 10,
        padding: '14px 16px',
        margin: 0,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 12.5,
        lineHeight: '22px',
        color: 'var(--loop-code-text)',
        whiteSpace: 'pre',
        overflowX: 'auto',
    },
    [`& .${classes.nextGrid}`]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
    },
    [`& .${classes.nextCard}`]: {
        backgroundColor: 'var(--loop-surface)',
        border: '1px solid var(--loop-border)',
        borderRadius: 12,
        padding: 20,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,95,0,0.4)' },
    },
    [`& .${classes.nextIcon}`]: {
        width: 36,
        height: 36,
        borderRadius: 9,
        backgroundColor: 'rgba(255,95,0,0.1)',
        border: '1px solid rgba(255,95,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    [`& .${classes.nextTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-text-primary)',
        fontSize: 15,
        fontWeight: 600,
        margin: '0 0 6px',
    },
    [`& .${classes.nextDesc}`]: {
        color: '#6B7280',
        fontSize: 13,
        lineHeight: '20px',
        margin: 0,
    },
}));

const ecommerceIcon=`${app.context}/site/public/images/overview/ecommerce.png`;
const paymentIcon=`${app.context}/site/public/images/overview/payments.png`; 
const creditIcon=`${app.context}/site/public/images/overview/credit.png`;
const vouchersIcon=`${app.context}/site/public/images/overview/Vouchers.png`;
const kycIcon=`${app.context}/site/public/images/overview/kyc.png`; 
const serviceIcon=`${app.context}/site/public/images/overview/service.png`;

const apiIcon=`${app.context}/site/public/images/overview/apirefernce.png`;

const sdkIcon=`${app.context}/site/public/images/overview/sdk.png`;

const getStartedIcon=`${app.context}/site/public/images/overview/credit.png`;

const request_to_light=`${app.context}/site/public/images/overview/request_to_access_light.png`;

const request_to_dark=`${app.context}/site/public/images/overview/request_to_access_dark.png`;
/* eslint-disable max-len -- data table copy */
const PRODUCTS = [
    {
        id: 'sp-ecommerce',
        // eslint-disable-next-line no-undef
        icon: ecommerceIcon,
        title: 'E-Commerce',
        desc: 'Accept payments online — cards, LOOP, M-Pesa, BNPL. Full acquiring stack with 3D Secure.',
    },
    {
        id: 'sp-payments',
        icon: paymentIcon,
        title: 'Payments',
        desc: 'Initiate and track bank-to-bank, mobile money and wallet transfers programmatically.',
    },
    {
        id: 'sp-credit',
        icon: creditIcon,
        title: 'Credit',
        desc: 'Embed loan origination, overdraft, and BNPL flows directly in your product experience.',
    },
    {
        id: 'sp-vouchers',
        icon: vouchersIcon,
        title: 'Vouchers',
        desc: 'Issue, redeem and manage branded digital vouchers with real-time validation.',
    },
    {
        id: 'sp-ekyc',
        icon: kycIcon,
        title: 'E-KYC',
        desc: 'Identity verification, document checks, and liveness detection — regulatory-grade.',
    },
    {
        id: 'sp-wallet',
        icon: serviceIcon,
        title: 'Wallet-as-a-Service',
        desc: 'Spin up multi-currency wallets, manage balances, and automate sweeps for your users.',
    },
];
const TOKEN_CODE = [
    'POST /v1/auth/token   Content-Type: application/json',
    '{',
    '  "client_id":  "lp_live_xxxxxxxxxxxx",',
    '  "assertion":  "<signed_jwt>",',
    '  "grant_type": "client_credentials"',
    '}',
];

const BEARER_CODE = [
    'Authorization: Bearer <access_token>',
    'X-Loop-Version: 2024-01',
];

const GO_LIVE = [
  {
    title: 'Complete sandbox testing',
    description:
      'Verify your integration works correctly in the sandbox environment. Ensure all API calls return expected responses, error handling is in place, and your target transaction flows work end-to-end.',
  },
  {
    title: 'Request production access',
    description:
      'Create a business account on the LOOP Merchant Portal and submit your business details along with the required supporting documents to request production access.',
  },
  {
    title: 'Complete compliance & KYC review',
    description:
      'The LOOP team will review your submitted documentation. Ensure all information is accurate and complete to avoid delays during the approval process.',
  },
  {
    title: 'Switch to production endpoint',
    description:
      'Once approved, update your integration to use the production base URL. Replace sandbox credentials with production credentials and perform a low-value transaction to verify connectivity.',
  },
];

const NEXT = [
    {
        id: 'n1', icon: getStartedIcon, title: 'Get Started', desc: 'Environment setup, key generation, and your first API call.',
    },
    {
        id: 'n2', icon: apiIcon, title: 'API Reference', desc: 'Full endpoint docs with request/response schemas.',
    },
    {
        id: 'n3', icon: sdkIcon, title: 'SDKs & Libraries', desc: 'Node.js, Python, and PHP SDKs with code samples.',
    },
];
/* eslint-enable max-len */

/**
 * Renders a monospace code block from an array of lines.
 * @param {object} props component props
 * @returns {JSX.Element} the code block
 */
function CodeBlock({ lines }) {
    return <pre className={classes.codeBlock}>{lines.join('\n')}</pre>;
}
CodeBlock.propTypes = { lines: PropTypes.arrayOf(PropTypes.string).isRequired };

/**
 * The center documentation content for the LOOP API Overview page.
 * @returns {JSX.Element} the content
 */
function OverviewContent() {
    return (
        <Root>
            {/* Introduction */}
            <section id='introduction' className={classes.section}>
                <p className={classes.eyebrow}>{'// INTRODUCTION'}</p>
                <h1 className={classes.h1}>LOOP API Overview</h1>
                <p className={classes.lead}>
                    Welcome to the LOOP Developer Portal. The LOOP API is a unified financial
                    infrastructure layer that gives your application access to payments, credit,
                    identity verification, and embedded financial services — through a single
                    integration.
                </p>
            </section>

            {/* Supported products */}
            <section id='supported-products' className={classes.section}>
                <p className={classes.eyebrow}>{'// SUPPORTED PRODUCTS'}</p>
                <h2 className={classes.h2}>What You Can Build</h2>
                <p className={classes.para}>
                    The LOOP API exposes six core product verticals. Each runs on the same
                    authentication model and shares a common request/response structure.
                </p>
                <div className={classes.cardGrid}>
                    {PRODUCTS.map((p) => {
                        const Icon = p.icon;
                        return (
                            <div key={p.id} id={p.id} className={classes.card}>
                                {/* <span className={classes.cardArrow}>
                                    <ArrowUpRightIcon color='#6B7280' size={16} />
                                </span> */}
                                <Box sx={{border:'1px solid #ff5500', width:'32px',height:'32px', borderRadius:'8px', display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'16px'}}>
                                   <img src={p.icon}
    alt={p.title}
    style={{
        width: '16px',
        height: '16px',
        objectFit: 'contain',
    }}
/>
</Box>
                                <h3 className={classes.cardTitle}>{p.title}</h3>
                                <p className={classes.cardDesc}>{p.desc}</p>
                                <span className={classes.cardArrow}>
                                    <ArrowUpRightIcon color='#6B7280' size={16} />
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Architecture */}
            <section id='architecture' className={classes.section}>
                <p className={classes.eyebrow}>{'// ARCHITECTURE'}</p>
                <h2 className={classes.h2}>How It Works</h2>
                <p className={classes.para}>
                    The LOOP Gateway sits between your application and the underlying financial
                    networks — mobile money operators, card acquirers, and credit bureaus. You send a
                    single API request; LOOP handles routing, compliance, fee calculation, and
                    settlement.
                </p>
                <div className={classes.diagram}>
                    <div className={classes.diagramBox}>
                        <p className={classes.diagramTitle}>Your Server</p>
                        <p className={classes.diagramSub}>Integration layer</p>
                    </div>
                    <span className={classes.diagramArrow}>
                        <ArrowRightIcon color={ORANGE} size={22} />
                    </span>
                    <div className={`${classes.diagramBox} ${classes.diagramBoxActive}`}>
                        <p className={classes.diagramTitle}>LOOP Gateway</p>
                        <p className={classes.diagramSub}>This API</p>
                    </div>
                    <span className={classes.diagramArrow}>
                        <ArrowRightIcon color={ORANGE} size={22} />
                    </span>
                    <div className={classes.diagramBox}>
                        <p className={classes.diagramTitle}>Financial Networks</p>
                        <p className={classes.diagramSub}>M-Pesa, Visa, MasterCard</p>
                    </div>
                </div>
            </section>

            {/* Environments */}
            <section id='environments' className={classes.section}>
                <p className={classes.eyebrow}>{'// BASE URLs'}</p>
                <h2 className={classes.h2}>Environments</h2>
                <p className={classes.para}>
                    LOOP provides two isolated environments. Use Sandbox for all development and
                    testing — it mirrors production behaviour without moving real funds.
                </p>
                
             <div className={classes.tableWrap}>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>Environment</th>
                                <th>Base URL</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td > <span  style={{padding:'8px 28px',borderRadius:'4px',border:'1px solid #60A5FA', color:'#60A5FA'}}>Sandbox</span></td>
                                <td><span className={classes.pill}>api-sandbox.loopapis.co.ke</span></td>
                                <td><span className={classes.badgeGreen}>Active</span></td>
                            </tr>
                            <tr>
                                <td> <span  style={{padding:'8px 20px',borderRadius:'4px',border:'1px solid #22C55E40', color:'#22C55E40'}}> Production</span> </td>
                                <td><span className={classes.pill}>api.loopapis.co.ke</span></td>
                                <td><span className={classes.badgeGray}>By request</span></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            </section>

            {/* Authentication */}
            <section id='authentication' className={classes.section}>
                <p className={classes.eyebrow}>{'// AUTHENTICATION'}</p>
                <h2 id='auth-model' className={classes.h2}>Authentication Model</h2>
                <p className={classes.para}>
                    All LOOP API requests are authenticated using RSA-signed JWTs. Every call must
                    carry a valid bearer token in the
                    {' '}
                    <code className={classes.inlineCode}>Authorization</code>
                    {' '}
                    header.
                </p>
                <div className={classes.steps}>
                    <div className={classes.step}>
                        <span className={classes.stepNum}>01</span>
                        <div className={classes.stepBody}>
                            <p className={classes.stepTitle}>Generate your RSA key pair</p>
                            <p className={classes.stepText}>
                                Create a 2048-bit RSA key pair. Upload the public key to the LOOP
                                Developer Console. Store the private key securely — never expose it
                                client-side.
                            </p>
                        </div>
                    </div>
                    <div className={classes.step} id='auth-token'>
                        <span className={classes.stepNum}>02</span>
                        <div className={classes.stepBody}>
                            <p className={classes.stepTitle}>Request an access token</p>
                            <p className={classes.stepText}>
                                POST your signed assertion to the token endpoint. Tokens are
                                short-lived (15 minutes) and scoped to your registered application.
                            </p>
                            {/* <CodeBlock lines={TOKEN_CODE} /> */}
                           
                         <Box
    component="img"
    src={request_to_dark}
    alt="Request to"
    sx={{
        width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
        },
        width:'100%',
        height: 'auto',
        display: 'block',
    }}
/>
                        </div>
                    </div>
                    <div className={classes.step} id='auth-bearer'>
                        <span className={classes.stepNum}>03</span>
                        <div className={classes.stepBody}>
                            <p className={classes.stepTitle}>Attach the bearer token</p>
                            <p className={classes.stepText}>
                                Include the access token in every subsequent API call. Rotate before
                                expiry — the response includes an
                                {' '}
                                <code className={classes.inlineCode}>expires_in</code>
                                {' '}
                                field.
                            </p>
                            <CodeBlock lines={BEARER_CODE} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Go live */}
            <section id='go-live' className={classes.section}>
                <p className={classes.eyebrow}>{'// GO LIVE'}</p>
                <h2 className={classes.h2}>Go Live</h2>
                <p className={classes.para}>
                    Follow these steps to transition from Sandbox to live production. Complete each
                    step in order before proceeding to the next.
                </p>
                <div className={classes.steps}>
                    {GO_LIVE.map((label, i) => (
                        <div key={label} className={classes.step}>
                            <span className={classes.stepNum}>{`0${i + 1}`}</span>
                            <div className={classes.stepBody}>
                                <p className={classes.stepTitle}>{label.title}</p>
                                 <p className={classes.stepdesc}>{label.description}</p>
                            </div>
                             {/* <div className={classes.stepdesc}>
                                <p>{label.description}</p>
                            </div> */}
                        </div>
                    ))}
                </div>
            </section>

            {/* Next steps */}
            <section id='next-steps' className={classes.section}>
                <p className={classes.eyebrow}>{'// NEXT STEPS'}</p>
                <h2 className={classes.h2}>Where to Go Next</h2>
                <div className={classes.nextGrid}>
                    {NEXT.map((n) => {
                        const Icon = n.icon;
                        return (
                            <div key={n.id} className={classes.nextCard}>
                                {/* <span className={classes.nextIcon}>
                                    <Icon color={ORANGE} size={18} />
                                </span> */}
                                <Box>
                                    <img src={n.icon} alt='n.title' style={{width:"20px", height:"20px"}}/>
                                </Box>
                                <h3 className={classes.nextTitle}>{n.title}</h3>
                                <p className={classes.nextDesc}>{n.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </Root>
    );
}

export default OverviewContent;
