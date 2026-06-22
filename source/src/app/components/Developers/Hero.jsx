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
import CodeWindow from './CodeWindow';
import { ORANGE, DARK_1 } from './tokens';

const PREFIX = 'DevHero';

const classes = {
    container: `${PREFIX}-container`,
    grid: `${PREFIX}-grid`,
    glow: `${PREFIX}-glow`,
    badge: `${PREFIX}-badge`,
    title: `${PREFIX}-title`,
    accent: `${PREFIX}-accent`,
    desc: `${PREFIX}-desc`,
    actions: `${PREFIX}-actions`,
    btnPrimary: `${PREFIX}-btnPrimary`,
    btnLight: `${PREFIX}-btnLight`,
    cardWrap: `${PREFIX}-cardWrap`,
    cardGlow: `${PREFIX}-cardGlow`,
    card: `${PREFIX}-card`,
};

const HERO_CODE = [
    '// Accept a payment',
    'const payment = await loop.charge({',
    '  amount: 4999,',
    "  currency: 'USD',",
    '  source: token',
    '});',
    '',
    'console.log(payment.status);',
    '// → "succeeded"',
];

const Root = styled('section')(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: DARK_1,
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
        position: 'relative',
        zIndex: 1,
    },
    [`& .${classes.grid}`]: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: 48,
        },
    },
    [`& .${classes.glow}`]: {
        position: 'absolute',
        top: -40,
        right: 120,
        width: 360,
        height: 360,
        borderRadius: '50%',
        filter: 'blur(80px)',
        background: 'radial-gradient(circle, rgba(255,95,0,0.18), rgba(255,95,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0,
    },
    [`& .${classes.badge}`]: {
        display: 'inline-block',
        padding: '7px 16px',
        borderRadius: 999,
        backgroundColor: 'rgba(255,95,0,0.1)',
        border: '1px solid rgba(255,95,0,0.3)',
        color: ORANGE,
        fontSize: 13,
        fontWeight: 600,
        lineHeight: '18px',
        marginBottom: 28,
    },
    [`& .${classes.title}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: 56,
        lineHeight: '66px',
        letterSpacing: 0,
        margin: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: 44,
            lineHeight: '54px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 32,
            lineHeight: '42px',
        },
    },
    [`& .${classes.accent}`]: {
        color: ORANGE,
    },
    [`& .${classes.desc}`]: {
        color: '#94A3B8',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: '29px',
        maxWidth: 480,
        margin: '24px 0 40px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
            lineHeight: '26px',
            margin: '20px 0 32px',
        },
    },
    [`& .${classes.actions}`]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
    },
    [`& .${classes.btnPrimary}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: ORANGE,
        color: '#FFFFFF',
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 12,
        padding: '16px 28px',
        transition: 'opacity 0.2s ease',
        '&:hover': { opacity: 0.9 },
    },
    [`& .${classes.btnLight}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: '#FFFFFF',
        color: DARK_1,
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 12,
        padding: '16px 28px',
        border: 'none',
        transition: 'background 0.2s ease',
        '&:hover': { backgroundColor: '#F3F3F3' },
    },
    [`& .${classes.cardWrap}`]: {
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            maxWidth: 560,
            width: '100%',
            margin: '0 auto',
        },
    },
    [`& .${classes.cardGlow}`]: {
        position: 'absolute',
        inset: '8px -16px -24px 16px',
        borderRadius: 28,
        background: 'linear-gradient(160deg, rgba(255,95,0,0.18) 0%, rgba(0,0,0,0.4) 100%)',
        filter: 'blur(8px)',
        pointerEvents: 'none',
    },
    [`& .${classes.card}`]: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 16,
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.45)',
    },
}));

/**
 * Hero section of the developer-resources landing page.
 * @returns {JSX.Element} the hero section
 */
function Hero() {
    return (
        <Root>
            <span className={classes.glow} aria-hidden='true' />
            <div className={classes.container}>
                <div className={classes.grid}>
                    <div>
                        <span className={classes.badge}>Developer Resources</span>
                        <h1 className={classes.title}>
                            Build the Future
                            <br />
                            of
                            {' '}
                            <span className={classes.accent}>Payments</span>
                        </h1>
                        <p className={classes.desc}>
                            Powerful, lightning-fast APIs for secure merchant payments — everything
                            needed to integrate seamlessly into your apps.
                        </p>
                        <div className={classes.actions}>
                            <button type='button' className={classes.btnPrimary}>Get API Keys</button>
                            <button type='button' className={classes.btnLight}>View Documentation</button>
                        </div>
                    </div>

                    <div className={classes.cardWrap}>
                        <span className={classes.cardGlow} aria-hidden='true' />
                        <div className={classes.card}>
                            <CodeWindow fileName='payment.js' lines={HERO_CODE} />
                        </div>
                    </div>
                </div>
            </div>
        </Root>
    );
}

export default Hero;
