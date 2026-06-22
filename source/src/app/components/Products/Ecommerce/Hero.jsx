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
import { app } from 'Settings';
import { ORANGE, DARK_1 } from './tokens';

const PREFIX = 'EcommerceHero';

const HeroImage = `${app.context}/site/public/images/ecommerce/hero-platform.jpg`;

const classes = {
    container: `${PREFIX}-container`,
    grid: `${PREFIX}-grid`,
    glowOne: `${PREFIX}-glowOne`,
    glowTwo: `${PREFIX}-glowTwo`,
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
    cardImg: `${PREFIX}-cardImg`,
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
    [`& .${classes.glowOne}`]: {
        position: 'absolute',
        top: 80,
        right: 80,
        width: 288,
        height: 288,
        borderRadius: '50%',
        filter: 'blur(64px)',
        background: 'linear-gradient(135deg, rgba(255,95,0,0.10), rgba(255,95,0,0.05))',
        pointerEvents: 'none',
        zIndex: 0,
    },
    [`& .${classes.glowTwo}`]: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        width: 384,
        height: 384,
        borderRadius: '50%',
        filter: 'blur(64px)',
        backgroundColor: 'rgba(255,95,0,0.1)',
        pointerEvents: 'none',
        zIndex: 0,
    },
    [`& .${classes.badge}`]: {
        display: 'inline-block',
        padding: '8px 16px',
        borderRadius: 999,
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(255,95,0,0.7)',
        color: ORANGE,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '20px',
        marginBottom: 34,
    },
    [`& .${classes.title}`]: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        color: 'var(--loop-text-strong)',
        fontWeight: 700,
        fontSize: 60,
        lineHeight: '75px',
        letterSpacing: 0,
        margin: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: 46,
            lineHeight: '58px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 34,
            lineHeight: '44px',
        },
    },
    [`& .${classes.accent}`]: {
        color: ORANGE,
        fontWeight: 800,
    },
    [`& .${classes.desc}`]: {
        color: 'var(--loop-hero-desc)',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: '32.5px',
        maxWidth: 569,
        margin: '34px 0 48px',
        [theme.breakpoints.down('sm')]: {
            fontSize: 17,
            lineHeight: '28px',
            margin: '24px 0 36px',
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
        fontWeight: 700,
        fontSize: 16,
        lineHeight: '24px',
        borderRadius: 14,
        padding: '18px 32px',
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
        borderRadius: 14,
        padding: '16px 34px',
        border: '2px solid #E5E7EB',
        transition: 'background 0.2s ease',
        '&:hover': { backgroundColor: '#F3F3F3' },
    },
    [`& .${classes.cardWrap}`]: {
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            maxWidth: 584,
            width: '100%',
            margin: '0 auto',
        },
    },
    [`& .${classes.cardGlow}`]: {
        position: 'absolute',
        inset: '-24px -40px',
        borderRadius: 24,
        transform: 'rotate(6deg)',
        background: 'linear-gradient(140deg, rgba(255,95,0,0.2) 0%, rgba(0,0,0,0) 100%)',
        pointerEvents: 'none',
    },
    [`& .${classes.card}`]: {
        position: 'relative',
        borderRadius: 24,
        border: '1px solid #F3F4F6',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 1,
    },
    [`& .${classes.cardImg}`]: {
        display: 'block',
        width: '100%',
        height: 450,
        objectFit: 'cover',
        borderRadius: 24,
        [theme.breakpoints.down('sm')]: {
            height: 280,
        },
    },
}));

/**
 * Hero section of the e-commerce landing page.
 * @returns {JSX.Element} the hero section
 */
function Hero() {
    return (
        <Root>
            <span className={classes.glowOne} aria-hidden='true' />
            <span className={classes.glowTwo} aria-hidden='true' />
            <div className={classes.container}>
                <div className={classes.grid}>
                    <div>
                        <span className={classes.badge}>E-commerce Platform</span>
                        <h1 className={classes.title}>
                            Build Your
                            <br />
                            E-Commerce
                            {' '}
                            <span className={classes.accent}>Empire</span>
                        </h1>
                        <p className={classes.desc}>
                            Everything you need to start, scale, and succeed in online retail.
                            Powerful tools, seamless integrations, and unlimited growth potential.
                        </p>
                        <div className={classes.actions}>
                            <button type='button' className={classes.btnPrimary}>Try It Out</button>
                            <button type='button' className={classes.btnLight}>View Documentation</button>
                        </div>
                    </div>

                    <div className={classes.cardWrap}>
                        <span className={classes.cardGlow} aria-hidden='true' />
                        <div className={classes.card}>
                            <img className={classes.cardImg} src={HeroImage} alt='E-commerce platform preview' />
                        </div>
                    </div>
                </div>
            </div>
        </Root>
    );
}

export default Hero;
