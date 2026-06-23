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
// import { app } from 'Settings';
import { ArrowIcon, CheckIcon } from './Icons';
import {
    ORANGE, ORANGE_LIGHT, DARK_1,
} from './tokens';


// ── Icon image paths (same pattern as paymentImage) ──
// const HeroImg = `${app.context}/source/src/app/components/Products/images/payment_light_icon.png`;

const HeroImg= '../images/payment_light_icon.png';
const PREFIX = 'PaymentsHero';

const classes = {
    container: `${PREFIX}-container`,
    heroGrid: `${PREFIX}-heroGrid`,
    badge: `${PREFIX}-badge`,
    heroTitle: `${PREFIX}-heroTitle`,
    heroAccent: `${PREFIX}-heroAccent`,
    heroDesc: `${PREFIX}-heroDesc`,
    actions: `${PREFIX}-actions`,
    btnPrimary: `${PREFIX}-btnPrimary`,
    btnLight: `${PREFIX}-btnLight`,
    heroCard: `${PREFIX}-heroCard`,
    heroCardInner: `${PREFIX}-heroCardInner`,
    heroIcon: `${PREFIX}-heroIcon`,
    heroCardTitle: `${PREFIX}-heroCardTitle`,
    heroCardSub: `${PREFIX}-heroCardSub`,
    verified: `${PREFIX}-verified`,
    verifiedDot: `${PREFIX}-verifiedDot`,
};

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--loop-header-bg)',
    position: 'relative',
    overflow: 'hidden',
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
    [`& .${classes.heroGrid}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: 40,
        },
    },
    [`& .${classes.badge}`]: {
        display: 'inline-block',
        padding: '8px 18px',
        borderRadius: 999,
        backgroundColor: '#FFFFFF',
        border: `1px solid ${ORANGE}`,
        color: ORANGE,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 1,
        marginBottom: 28,
    },
    [`& .${classes.heroTitle}`]: {
        color: 'var(--loop-text-strong)',
        fontWeight: 700,
        fontSize: 60,
        lineHeight: '75px',
        letterSpacing: 0,
        margin: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: 44,
            lineHeight: '54px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 34,
            lineHeight: '42px',
        },
    },
    [`& .${classes.heroAccent}`]: {
        color: ORANGE,
    },
    [`& .${classes.heroDesc}`]: {
        color: 'var(--loop-text-subtitle)',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '29.25px',
        maxWidth: 520,
        margin: '24px 0 40px',
    },
    [`& .${classes.actions}`]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
    },
    [`& .${classes.btnPrimary}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: 'none',
        cursor: 'pointer',
        backgroundColor: ORANGE,
        color: '#FFFFFF',
        fontFamily: 'inherit',
        fontWeight: 700,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 14,
        padding: '16px 32px',
        transition: 'opacity 0.2s ease',
        '&:hover': { opacity: 0.9 },
    },
    [`& .${classes.btnLight}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        color: DARK_1,
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 14,
        padding: '16px 32px',
        transition: 'background 0.2s ease',
        '&:hover': { backgroundColor: '#F3F3F3' },
    },
    [`& .${classes.heroCard}`]: {
        borderRadius: 24,
        padding: 28,
        background: 'linear-gradient(135deg, rgba(255,95,0,0.10), rgba(255,95,0,0.03))',
        border: '1px solid rgba(255,95,0,0.2)',
        position: 'relative',
    },
    [`& .${classes.heroCardInner}`]: {
        backgroundColor: '#F2F5F7',
        borderRadius: 16,
        padding: 40,
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
    },
    [`& .${classes.heroIcon}`]: {
        width: 80,
        height: 80,
        borderRadius: 16,
        background: `linear-gradient(180deg, ${ORANGE}, ${ORANGE_LIGHT})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    },
    [`& .${classes.heroCardTitle}`]: {
        color: DARK_1,
        fontWeight: 700,
        fontSize: 24,
        margin: 0,
    },
    [`& .${classes.heroCardSub}`]: {
        color: '#6A7282',
        fontWeight: 400,
        fontSize: 16,
        margin: '8px 0 0',
    },
    [`& .${classes.verified}`]: {
        position: 'absolute',
        left: -24,
        bottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: '14px 18px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        [theme.breakpoints.down('sm')]: {
            left: 8,
            bottom: 8,
        },
    },
    [`& .${classes.verifiedDot}`]: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: '#DCFCE7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
}));

/**
 * Hero section of the payments landing page.
 * @returns {JSX.Element} the hero section
 */
function Hero() {
    return (
        <Root>
            <div className={`${classes.container} ${classes.heroGrid}`}>
                <div>
                    <span className={classes.badge}>PAYMENTS API</span>
                    {/* inferred badge label */}
                    <h1 className={classes.heroTitle}>
                        Payment Solutions Built for
                        {' '}
                        <span className={classes.heroAccent}>Scale</span>
                        {/* "Scale" inferred — confirm the orange word */}
                    </h1>
                    <p className={classes.heroDesc}>
                        Accept mobile money, cards, bank transfers, and wallets. Route
                        intelligently, reduce fraud, and reconcile automatically with our
                        comprehensive payment API.
                    </p>
                    <div className={classes.actions}>
                        <button type='button' className={classes.btnPrimary}>
                            Try it out
                            <ArrowIcon color='#FFFFFF' />
                        </button>
                        <button type='button' className={classes.btnLight}>
                            View Documentation
                            <ArrowIcon color={DARK_1} />
                        </button>
                    </div>
                </div>

                <div className={classes.heroCard}>
                    <img src={HeroImg} alt="Hero" width="100px" height="100px" />
                    {/* <div className={classes.heroCardInner}>
                        <div className={classes.heroIcon}>
                            <svg width='36' height='36' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                                <rect x='2' y='5' width='20' height='14' rx='2' stroke='#FFFFFF' strokeWidth='2' />
                                <path d='M2 10h20' stroke='#FFFFFF' strokeWidth='2' />
                            </svg>
                        </div>
                        <h3 className={classes.heroCardTitle}>Payment Processing</h3>
                        <p className={classes.heroCardSub}>Secure transactions worldwide</p>
                    </div>
                    <div className={classes.verified}>
                        <span className={classes.verifiedDot}>
                            <CheckIcon color='#00A63E' />
                        </span>
                        <span>
                            <strong style={{ display: 'block', color: DARK_1, fontSize: 15 }}>Verified</strong>
                            <span style={{ color: '#6A7282', fontSize: 13 }}>Secure transactions</span>
                        </span>
                    </div> */}
                </div>
            </div>
        </Root>
    );
}

export default Hero;
