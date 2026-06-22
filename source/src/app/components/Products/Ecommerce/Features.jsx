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
import { styled } from '@mui/material/styles';
import { ORANGE } from './tokens';

const PREFIX = 'EcommerceFeatures';

const classes = {
    container: `${PREFIX}-container`,
    sectionTitle: `${PREFIX}-sectionTitle`,
    sectionSub: `${PREFIX}-sectionSub`,
    cardGrid: `${PREFIX}-cardGrid`,
    card: `${PREFIX}-card`,
    cardIcon: `${PREFIX}-cardIcon`,
    cardTitle: `${PREFIX}-cardTitle`,
    cardDesc: `${PREFIX}-cardDesc`,
};

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--loop-bg-deep)',
    padding: '96px 40px',
    [theme.breakpoints.down('md')]: {
        padding: '64px 24px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '48px 20px',
    },
    [`& .${classes.container}`]: {
        maxWidth: 1280,
        margin: '0 auto',
        width: '100%',
    },
    [`& .${classes.sectionTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-text-primary)',
        fontWeight: 700,
        fontSize: 40,
        lineHeight: '60px',
        textAlign: 'center',
        margin: '0 0 16px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 28,
            lineHeight: '40px',
        },
    },
    [`& .${classes.sectionSub}`]: {
        color: '#4A5565',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: '38px',
        textAlign: 'center',
        maxWidth: 801,
        margin: '0 auto 64px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
            lineHeight: '28px',
            margin: '0 auto 48px',
        },
    },
    [`& .${classes.cardGrid}`]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    [`& .${classes.card}`]: {
        backgroundColor: 'var(--loop-card-soft)',
        border: '1px solid var(--loop-border)',
        borderRadius: 16,
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        minHeight: 264,
        justifyContent: 'center',
        boxSizing: 'border-box',
    },
    [`& .${classes.cardIcon}`]: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: 'rgba(255,95,0,0.08)',
        border: '0.612px solid rgba(255,95,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    [`& .${classes.cardTitle}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-text-primary)',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: '24.75px',
        margin: '0 0 14px',
    },
    [`& .${classes.cardDesc}`]: {
        color: '#4A5565',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '26px',
        margin: 0,
    },
}));

/* Feature card icons (orange stroke, 28px) matching the Figma glyphs. */
/* eslint-disable max-len -- inline SVG path data */
const featureIcons = {
    inventory: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
                d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'
                stroke={ORANGE}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path d='M3.27 6.96 12 12l8.73-5.04M12 22V12' stroke={ORANGE} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    ),
    cart: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='9' cy='21' r='1.6' stroke={ORANGE} strokeWidth='2' />
            <circle cx='19' cy='21' r='1.6' stroke={ORANGE} strokeWidth='2' />
            <path
                d='M1 1h4l2.68 13.39A2 2 0 0 0 9.64 16h9.72a2 2 0 0 0 1.96-1.61L23 6H6'
                stroke={ORANGE}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
    analytics: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M3 3v18h18' stroke={ORANGE} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M7 14l3-3 3 3 5-6' stroke={ORANGE} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    ),
    channel: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='18' cy='5' r='2.5' stroke={ORANGE} strokeWidth='2' />
            <circle cx='6' cy='12' r='2.5' stroke={ORANGE} strokeWidth='2' />
            <circle cx='18' cy='19' r='2.5' stroke={ORANGE} strokeWidth='2' />
            <path d='M8.2 10.8 15.8 6.2M8.2 13.2l7.6 4.6' stroke={ORANGE} strokeWidth='2' strokeLinecap='round' />
        </svg>
    ),
    secure: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
                d='M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z'
                stroke={ORANGE}
                strokeWidth='2'
                strokeLinejoin='round'
            />
            <path d='m9 12 2 2 4-4' stroke={ORANGE} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    ),
    customers: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' stroke={ORANGE} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <circle cx='9' cy='7' r='4' stroke={ORANGE} strokeWidth='2' />
            <path d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11' stroke={ORANGE} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    ),
};
/* eslint-enable max-len */

const FEATURES = [
    {
        id: 'inventory',
        title: 'Inventory Management',
        desc: 'Track products, variants, and stock levels in real-time across multiple warehouses.',
    },
    {
        id: 'cart',
        title: 'Smart Shopping Cart',
        desc: 'Optimized checkout experience with abandoned cart recovery and upsell features.',
    },
    {
        id: 'analytics',
        title: 'Analytics & Insights',
        desc: 'Comprehensive dashboards with sales metrics, customer behavior, and growth trends.',
    },
    {
        id: 'channel',
        title: 'Multi-Channel Selling',
        desc: 'Sync inventory and orders across your website, marketplaces, and social media.',
    },
    {
        id: 'secure',
        title: 'Secure Payments',
        desc: 'PCI-compliant payment processing with fraud detection and chargeback protection.',
    },
    {
        id: 'customers',
        title: 'Customer Management',
        desc: 'Build customer profiles, loyalty programs, and personalized marketing strategies.',
    },
];

/**
 * Features section of the e-commerce landing page.
 * @returns {JSX.Element} the features section
 */
function Features() {
    return (
        <Root>
            <div className={classes.container}>
                <h2 className={classes.sectionTitle}>Everything You Need to Succeed</h2>
                <p className={classes.sectionSub}>
                    From inventory management to customer analytics, our platform provides all the
                    tools to run and grow your online store
                </p>
                <div className={classes.cardGrid}>
                    {FEATURES.map((feature) => (
                        <div key={feature.id} className={classes.card}>
                            <div className={classes.cardIcon}>{featureIcons[feature.id]}</div>
                            <div>
                                <h3 className={classes.cardTitle}>{feature.title}</h3>
                                <p className={classes.cardDesc}>{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Root>
    );
}

export default Features;
