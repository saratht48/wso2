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

const PREFIX = 'PaymentsFeatures';

const classes = {
    container: `${PREFIX}-container`,
    sectionTitle: `${PREFIX}-sectionTitle`,
    sectionSub: `${PREFIX}-sectionSub`,
    cardGrid: `${PREFIX}-cardGrid`,
    card: `${PREFIX}-card`,
    dots: `${PREFIX}-dots`,
    dot: `${PREFIX}-dot`,
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
        color: 'var(--loop-text-primary)',
        fontWeight: 700,
        fontSize: 40,
        lineHeight: '60px',
        textAlign: 'center',
        margin: '0 0 12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 26,
            lineHeight: '38px',
        },
    },
    [`& .${classes.sectionSub}`]: {
        color: '#4A5565',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '30px',
        textAlign: 'center',
        maxWidth: 640,
        margin: '0 auto 56px',
    },
    [`& .${classes.cardGrid}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
        },
    },
    [`& .${classes.card}`]: {
        backgroundColor: 'var(--loop-card-soft)',
        border: '1px solid var(--loop-border)',
        borderRadius: 16,
        padding: 40,
    },
    [`& .${classes.dots}`]: {
        display: 'flex',
        gap: 8,
        marginBottom: 40,
    },
    [`& .${classes.dot}`]: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: '#E5E7EB',
    },
    [`& .${classes.cardIcon}`]: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: 'rgba(255,95,0,0.08)',
        border: '1px solid rgba(255,95,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    [`& .${classes.cardTitle}`]: {
        color: 'var(--loop-text-primary)',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: '24.75px',
        margin: '0 0 12px',
    },
    [`& .${classes.cardDesc}`]: {
        color: '#6B7280',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '26.8px',
        margin: 0,
    },
}));

/**
 * Credit-card glyph (orange stroke) for the payment-methods card.
 * @returns {JSX.Element} the icon
 */
function CardGlyph() {
    return (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <rect x='2' y='5' width='20' height='14' rx='2' stroke={ORANGE} strokeWidth='2' />
            <path d='M2 10h20' stroke={ORANGE} strokeWidth='2' />
        </svg>
    );
}

const featureIcons = {
    methods: <CardGlyph />,
    routing: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='6' cy='6' r='2.5' stroke={ORANGE} strokeWidth='2' />
            <circle cx='6' cy='18' r='2.5' stroke={ORANGE} strokeWidth='2' />
            <circle cx='18' cy='12' r='2.5' stroke={ORANGE} strokeWidth='2' />
            <path
                d='M8 6h4a4 4 0 0 1 4 4M8 18h4a4 4 0 0 0 4-4'
                stroke={ORANGE}
                strokeWidth='2'
                strokeLinecap='round'
            />
        </svg>
    ),
    fraud: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
                d='M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z'
                stroke={ORANGE}
                strokeWidth='2'
                strokeLinejoin='round'
            />
            <path
                d='m9 12 2 2 4-4'
                stroke={ORANGE}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
    reconcile: (
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
                d='M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5'
                stroke={ORANGE}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    ),
};

// Titles tagged "inferred" should be confirmed against Figma.
const FEATURES = [
    {
        id: 'methods',
        title: 'Multiple Payment Methods',
        desc: 'Accept credit cards, mobile money, bank transfers, and digital wallets in a single integration.',
    },
    {
        id: 'routing',
        title: 'Smart Routing', // inferred
        desc: 'Automatically route every transaction through the optimal provider for higher success rates.',
    },
    {
        id: 'fraud',
        title: 'Fraud Protection', // inferred
        desc: 'Detect and block fraudulent transactions in real time with built-in risk scoring.',
    },
    {
        id: 'reconcile',
        title: 'Auto Reconciliation', // inferred
        desc: 'Reconcile payments automatically and get a clear view of every settlement.',
    },
];

/**
 * Features section of the payments landing page.
 * @returns {JSX.Element} the features section
 */
function Features() {
    return (
        <Root>
            <div className={classes.container}>
                <h2 className={classes.sectionTitle}>Everything You Need to Accept Payments</h2>
                <p className={classes.sectionSub}>
                    Powerful, developer-friendly features designed for modern payment processing.
                    {/* sub-heading inferred */}
                </p>
                <div className={classes.cardGrid}>
                    {FEATURES.map((feature) => (
                        <div key={feature.id} className={classes.card}>
                            <div className={classes.dots}>
                                <span className={classes.dot} />
                                <span className={classes.dot} />
                                <span className={classes.dot} />
                            </div>
                            <div className={classes.cardIcon}>{featureIcons[feature.id]}</div>
                            <h3 className={classes.cardTitle}>{feature.title}</h3>
                            <p className={classes.cardDesc}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Root>
    );
}

export default Features;
