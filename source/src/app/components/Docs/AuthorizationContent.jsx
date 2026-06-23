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
import { styled } from '@mui/material/styles';
import {
    BookIcon, CodeIcon, ArrowUpRightIcon, WarningIcon,
} from './Icons';
import { ORANGE } from './tokens';

const PREFIX = 'DocsAuth';

const classes = {
    section: `${PREFIX}-section`,
    marker: `${PREFIX}-marker`,
    h1: `${PREFIX}-h1`,
    h2: `${PREFIX}-h2`,
    lead: `${PREFIX}-lead`,
    para: `${PREFIX}-para`,
    inlineCode: `${PREFIX}-inlineCode`,
    tableWrap: `${PREFIX}-tableWrap`,
    table: `${PREFIX}-table`,
    cellKey: `${PREFIX}-cellKey`,
    cellMono: `${PREFIX}-cellMono`,
    codeWindow: `${PREFIX}-codeWindow`,
    codeBar: `${PREFIX}-codeBar`,
    barLeft: `${PREFIX}-barLeft`,
    dots: `${PREFIX}-dots`,
    dot: `${PREFIX}-dot`,
    codeTitle: `${PREFIX}-codeTitle`,
    tabs: `${PREFIX}-tabs`,
    tab: `${PREFIX}-tab`,
    tabActive: `${PREFIX}-tabActive`,
    copy: `${PREFIX}-copy`,
    codeBody: `${PREFIX}-codeBody`,
    warn: `${PREFIX}-warn`,
    warnHead: `${PREFIX}-warnHead`,
    warnLabel: `${PREFIX}-warnLabel`,
    warnText: `${PREFIX}-warnText`,
    nextGrid: `${PREFIX}-nextGrid`,
    nextCard: `${PREFIX}-nextCard`,
    nextIcon: `${PREFIX}-nextIcon`,
    nextArrow: `${PREFIX}-nextArrow`,
    nextTitle: `${PREFIX}-nextTitle`,
    nextDesc: `${PREFIX}-nextDesc`,
};

const MONO = "'JetBrains Mono', 'Courier New', monospace";

const Root = styled('div')(({ theme }) => ({
    minWidth: 0,
    color: '#D1D5DC',
    [`& .${classes.section}`]: {
        scrollMarginTop: 24,
        marginBottom: 56,
    },
    [`& .${classes.marker}`]: {
        display: 'inline-block',
        fontFamily: MONO,
        color: ORANGE,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 1,
        backgroundColor: '#FF5F0014',
        borderTop: '0.61px solid #FF5F0033',
        borderRadius: 4,
        padding: '5px 10px',
        margin: '0 0 16px',
    },
    [`& .${classes.h1}`]: {
        fontFamily: MONO,
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: 700,
        lineHeight: '42px',
        margin: '0 0 18px',
        [theme.breakpoints.down('sm')]: { fontSize: 26, lineHeight: '34px' },
    },
    [`& .${classes.h2}`]: {
        fontFamily: MONO,
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 700,
        lineHeight: '36px',
        margin: '0 0 16px',
        [theme.breakpoints.down('sm')]: { fontSize: 22, lineHeight: '30px' },
    },
    [`& .${classes.lead}`]: {
        color: '#9CA3AF',
        fontSize: 14.5,
        lineHeight: '25px',
        margin: 0,
        maxWidth: 720,
    },
    [`& .${classes.para}`]: {
        color: '#9CA3AF',
        fontSize: 15,
        lineHeight: '25px',
        margin: '0 0 20px',
        maxWidth: 720,
    },
    [`& .${classes.inlineCode}`]: {
        fontFamily: MONO,
        color: ORANGE,
        fontSize: 13.5,
    },
    [`& .${classes.tableWrap}`]: {
        overflowX: 'auto',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
    },
    [`& .${classes.table}`]: {
        width: '100%',
        minWidth: 520,
        borderCollapse: 'collapse',
        '& th': {
            textAlign: 'left',
            color: '#9CA3AF',
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            padding: '12px 16px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
        '& td': {
            padding: '14px 16px',
            fontSize: 14,
            fontWeight: 400,
            color: '#9CA3AF',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            verticalAlign: 'top',
        },
        '& tr:last-of-type td': { borderBottom: 'none' },
    },
    [`& .${classes.cellKey}`]: {
        fontFamily: MONO,
        fontWeight: 400,
        fontSize: 14,
        color: `${ORANGE} !important`,
    },
    [`& .${classes.cellMono}`]: {
        fontFamily: MONO,
        fontSize: 14,
        color: '#9CA3AF !important',
    },
    [`& .${classes.codeWindow}`]: {
        backgroundColor: '#0B0F14',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        overflow: 'hidden',
        margin: 0,
    },
    [`& .${classes.codeBar}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    [`& .${classes.barLeft}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },
    [`& .${classes.dots}`]: {
        display: 'flex',
        gap: 7,
    },
    [`& .${classes.dot}`]: {
        width: 11,
        height: 11,
        borderRadius: '50%',
    },
    [`& .${classes.codeTitle}`]: {
        fontFamily: MONO,
        fontSize: 12.5,
        color: '#6B7280',
    },
    [`& .${classes.tabs}`]: {
        display: 'flex',
        gap: 6,
    },
    [`& .${classes.tab}`]: {
        fontFamily: MONO,
        fontSize: 12.5,
        color: '#6B7280',
        padding: '4px 12px',
        borderRadius: 6,
    },
    [`& .${classes.tabActive}`]: {
        color: ORANGE,
        backgroundColor: 'rgba(255,95,0,0.1)',
    },
    [`& .${classes.copy}`]: {
        fontFamily: MONO,
        fontSize: 12,
        color: '#6B7280',
        cursor: 'pointer',
        '&:hover': { color: '#FFFFFF' },
    },
    [`& .${classes.codeBody}`]: {
        margin: 0,
        padding: '16px 18px',
        fontFamily: MONO,
        fontSize: 14,
        lineHeight: '23px',
        color: '#E0E0E0',
        whiteSpace: 'pre',
        overflowX: 'auto',
    },
    [`& .${classes.warn}`]: {
        backgroundColor: '#E5C07B14',
        border: '0.6px solid #E5C07B40',
        borderRadius: 12,
        padding: '16px 20px',
        margin: 0,
        maxWidth: 720,
    },
    [`& .${classes.warnHead}`]: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    [`& .${classes.warnLabel}`]: {
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 1,
        letterSpacing: 0,
        textTransform: 'uppercase',
        color: '#9CA3AF',
    },
    [`& .${classes.warnText}`]: {
        color: '#9CA3AF',
        fontSize: 14,
        lineHeight: '22px',
        margin: 0,
    },
    [`& .${classes.nextGrid}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
    },
    [`& .${classes.nextCard}`]: {
        position: 'relative',
        backgroundColor: '#11161D',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 20,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(255,95,0,0.4)' },
    },
    [`& .${classes.nextIcon}`]: {
        width: 38,
        height: 38,
        borderRadius: 9,
        backgroundColor: 'rgba(255,95,0,0.1)',
        border: '1px solid rgba(255,95,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    [`& .${classes.nextArrow}`]: {
        position: 'absolute',
        bottom: 18,
        left: 20,
    },
    [`& .${classes.nextTitle}`]: {
        fontFamily: MONO,
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 600,
        margin: '0 0 8px',
    },
    [`& .${classes.nextDesc}`]: {
        color: '#6B7280',
        fontSize: 13,
        lineHeight: '20px',
        margin: '0 0 22px',
    },
}));

const HEADERS = [
    { name: 'Authorization', value: 'Bearer <JWT>', desc: 'Authenticates the request' },
    { name: 'X-Timestamp', value: 'Unix ms', desc: 'Prevents replay attacks' },
    { name: 'X-Signature', value: 'RSA Signature', desc: 'Verifies request integrity' },
];

const ERRORS = [
    { code: '401', msg: 'Invalid token', res: 'Check key_id and signing algorithm' },
    {
        code: '401b', label: '401', msg: 'Token expired', res: 'Ensure system clock is synced',
    },
    { code: '403', msg: 'Forbidden', res: 'Verify API key scopes in the portal' },
    { code: '400', msg: 'Missing Header', res: 'Include Bearer token in every request' },
];

const KEYGEN_CODE = [
    '# Generate private key',
    'openssl genrsa -out private_key.pem 2048',
    '',
    '# Extract public key',
    'openssl rsa -in private_key.pem -pubout -out public_key.pem',
];

const SIGN_CODE = [
    'import json, time, jwt',
    'from cryptography.hazmat.primitives import serialization',
    '',
    "with open('private_key.pem', 'rb') as f:",
    '    private_key = serialization.load_pem_private_key(f.read(), password=None)',
    '',
    'payload = {',
    "    'iss': 'your_client_id',",
    "    'iat': int(time.time()),",
    "    'exp': int(time.time()) + 300,",
    "    'jti': 'unique_request_id'",
    '}',
    '',
    "token = jwt.encode(payload, private_key, algorithm='RS256')",
    'headers = {',
    "    'Authorization': f'Bearer {token}',",
    "    'X-Timestamp': str(int(time.time() * 1000)),",
    '}',
];

const NEXT = [
    {
        id: 'ref', icon: BookIcon, title: 'API Reference', desc: 'Explore available endpoints and request/response schemas.',
    },
    {
        id: 'sdk', icon: CodeIcon, title: 'SDKs & Libraries', desc: 'Download official Python, Node.js and PHP SDKs.',
    },
];

/**
 * A terminal / editor code window with an optional title or language tabs.
 * @param {object} props component props
 * @returns {JSX.Element} the code window
 */
function CodeBlock({ title, tabs, lines }) {
    return (
        <div className={classes.codeWindow}>
            <div className={classes.codeBar}>
                {tabs ? (
                    <div className={classes.tabs}>
                        {tabs.map((t, i) => (
                            <span key={t} className={`${classes.tab} ${i === 0 ? classes.tabActive : ''}`}>{t}</span>
                        ))}
                    </div>
                ) : (
                    <div className={classes.barLeft}>
                        <span className={classes.dots}>
                            <span className={classes.dot} style={{ backgroundColor: '#FF5F57' }} />
                            <span className={classes.dot} style={{ backgroundColor: '#FEBC2E' }} />
                            <span className={classes.dot} style={{ backgroundColor: '#28C840' }} />
                        </span>
                        <span className={classes.codeTitle}>{title}</span>
                    </div>
                )}
                <span className={classes.copy}>Copy</span>
            </div>
            <pre className={classes.codeBody}>{lines.join('\n')}</pre>
        </div>
    );
}

CodeBlock.propTypes = {
    title: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.string),
    lines: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CodeBlock.defaultProps = {
    title: '',
    tabs: null,
};

/**
 * The center documentation content for the Authorization page.
 * @returns {JSX.Element} the content
 */
function AuthorizationContent() {
    return (
        <Root>
            <section id='authorization-intro' className={classes.section}>
                <span className={classes.marker}>{'// OVERVIEW'}</span>
                <h1 className={classes.h1}>Authorization</h1>
                <p className={classes.lead}>
                    All LOOP API requests must be authenticated and cryptographically signed using
                    RSA-signed JWTs. Every call must carry a valid bearer token.
                </p>
            </section>

            <section id='how-it-works' className={classes.section}>
                <span className={classes.marker}>{'// HOW IT WORKS'}</span>
                <h2 className={classes.h2}>How It Works</h2>
                <p className={classes.para}>
                    LOOP uses asymmetric RSA-2048 signing for all production traffic. You generate a
                    standard key pair on your infrastructure, upload the public key to the LOOP
                    Developer Portal, and keep the private key secured in your environment. Each
                    request payload is then signed, and the resulting JWT is attached as a Bearer
                    token in the header.
                </p>
            </section>

            <section id='required-headers' className={classes.section}>
                <span className={classes.marker}>{'// REQUIRED HEADERS'}</span>
                <h2 className={classes.h2}>Required Headers</h2>
                <div className={classes.tableWrap}>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>Header</th>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HEADERS.map((h) => (
                                <tr key={h.name}>
                                    <td className={classes.cellKey}>{h.name}</td>
                                    <td className={classes.cellMono}>{h.value}</td>
                                    <td>{h.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section id='step-1' className={classes.section}>
                <span className={classes.marker}>{'// STEP 1'}</span>
                <h2 className={classes.h2}>Step 1 — Generate an RSA Key Pair</h2>
                <p className={classes.para}>
                    Use OpenSSL to generate a 2048-bit RSA key pair. This will create a private key
                    for your server and a public key for our portal.
                </p>
                <CodeBlock title='bash — key generation' lines={KEYGEN_CODE} />
            </section>

            <section id='step-2' className={classes.section}>
                <span className={classes.marker}>{'// STEP 2'}</span>
                <h2 className={classes.h2}>Step 2 — Upload Your Public Key</h2>
                <p className={classes.para}>
                    Upload the contents of
                    {' '}
                    <code className={classes.inlineCode}>public_key.pem</code>
                    {' '}
                    to the LOOP Developer Portal under Settings &gt; API Keys. Copy the
                    {' '}
                    <code className={classes.inlineCode}>key_id</code>
                    {' '}
                    returned — you&apos;ll need it when constructing the JWT.
                </p>
                <div className={classes.warn}>
                    <div className={classes.warnHead}>
                        <WarningIcon color='#E5C07B' size={14} />
                        <span className={classes.warnLabel}>IMPORTANT</span>
                    </div>
                    <p className={classes.warnText}>
                        Keep your private key secure. Never share it or commit it to source control.
                        Use a secret manager in production.
                    </p>
                </div>
            </section>

            <section id='step-3' className={classes.section}>
                <span className={classes.marker}>{'// STEP 3'}</span>
                <h2 className={classes.h2}>Step 3 — Sign &amp; Build the Bearer Token</h2>
                <p className={classes.para}>
                    Build the JWT payload and sign it using your private key and the RS256 algorithm.
                </p>
                <CodeBlock tabs={['Python', 'Node.js', 'cURL']} lines={SIGN_CODE} />
            </section>

            <section id='common-errors' className={classes.section}>
                <span className={classes.marker}>{'// COMMON ERRORS'}</span>
                <h2 className={classes.h2}>Common Authorization Errors</h2>
                <div className={classes.tableWrap}>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>Error Code</th>
                                <th>Message</th>
                                <th>Resolution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ERRORS.map((e) => (
                                <tr key={e.code}>
                                    <td className={classes.cellKey}>{e.label || e.code}</td>
                                    <td>{e.msg}</td>
                                    <td>{e.res}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section id='next-steps' className={classes.section}>
                <span className={classes.marker}>{'// NEXT STEPS'}</span>
                <h2 className={classes.h2}>Where to Go Next</h2>
                <div className={classes.nextGrid}>
                    {NEXT.map((n) => {
                        const Icon = n.icon;
                        return (
                            <div key={n.id} className={classes.nextCard}>
                                <span className={classes.nextIcon}>
                                    <Icon color={ORANGE} size={18} />
                                </span>
                                <h3 className={classes.nextTitle}>{n.title}</h3>
                                <p className={classes.nextDesc}>{n.desc}</p>
                                <span className={classes.nextArrow}>
                                    <ArrowUpRightIcon color='#6B7280' size={16} />
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>
        </Root>
    );
}

export default AuthorizationContent;
