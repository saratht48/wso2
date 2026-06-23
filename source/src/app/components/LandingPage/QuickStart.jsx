/* eslint-disable require-jsdoc */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { app } from 'Settings';

// ── Image paths — one image per step ─────────────────
const image01 = `${app.context}/site/public/images/landing/quick-start-img1.png`;
const image02 = `${app.context}/site/public/images/landing/quick-start-img1.png`;
const image03 = `${app.context}/site/public/images/landing/quick-start-img1.png`;

// ── Brand tokens ──────────────────────────────────────
const ORANGE = '#ff5500';
const BG = 'var(--loop-section-bg)';
const PANEL  = '#141A21';
const BORDER = 'var(--loop-border)';
const MUTED  = 'var(--loop-text-muted)';
const WHITE  = '#ffffff';
const DIM    = 'var(--loop-text-muted)';

// ── Step data ─────────────────────────────────────────
const steps = [
    {
        num: '01',
        title: 'Register & Get Credentials',
        desc: 'Create your account and receive instant API keys for sandbox testing in under 60 seconds.',
        image: image01,
        filename: 'quickstart.js',
    },
    {
        num: '02',
        title: 'Explore in Sandbox',
        desc: 'Test every endpoint safely with mock data and instant responses. Debug with confidence before going live.',
        image: image02,
        filename: 'sandbox.js',
    },
    {
        num: '03',
        title: 'Go Live',
        desc: 'Swap your sandbox key for a live key, pass compliance checks, and start processing real transactions.',
        image: image03,
        filename: 'production.js',
    },
];

// ── Styled root ───────────────────────────────────────
const Root = styled('div')(({ theme }) => ({
    background: BG,
    width: '100%',
    boxSizing: 'border-box',
    padding: '64px 24px',
    [theme.breakpoints.up('sm')]: { padding: '64px 24px' },
    [theme.breakpoints.up('md')]: { padding: '42px 112px' },

    // ── header ──
    '& .qs-header': {
        textAlign: 'center',
        marginBottom: '48px',
        [theme.breakpoints.up('md')]: { marginBottom: '56px' },
    },

    '& .qs-eyebrow': {
        color: ORANGE,
        fontSize: '12px',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        fontFamily: 'JetBrains Mono',
        display: 'block',
        marginBottom: '16px',
    },

    '& .qs-title': {
        color: 'var(--loop-text-primary)',
        fontSize: '22px',
        fontWeight: 700,
        lineHeight: 1.2,
        fontFamily: 'JetBrains Mono',
        marginBottom: '12px',
        [theme.breakpoints.up('md')]: { fontSize: '40px' },
    },

    '& .qs-subtitle': {
        color: MUTED,
        fontSize: '16px',
        lineHeight: 1.7,
        fontFamily: 'Poppins, sans-serif',
        [theme.breakpoints.up('md')]: { fontSize: '18px' },
    },

    // ── main layout ──
    '& .qs-body': {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            gap: '64px',
            alignItems: 'flex-start',
        },
    },

    // ── left steps list ──
    '& .qs-steps': {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        [theme.breakpoints.up('md')]: { width: '530px' },
    },

    '& .qs-step': {
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        cursor: 'pointer',
        position: 'relative',
        paddingBottom: '32px',
        '&:last-child': { paddingBottom: 0 },
    },

    // vertical connector line
    '& .qs-step-line': {
        position: 'absolute',
        left: '18px',
        top: '40px',
        bottom: 0,
        width: '2px',
        background: BORDER,
        zIndex: 0,
    },

    // number circle
    '& .qs-step-num': {
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        border: `2px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'JetBrains Mono',
        fontSize: '11px',
        fontWeight: 700,
        color: DIM,
        background: BG,
        transition: 'all 0.2s ease',
        zIndex: 1,
        position: 'relative',
    },

    '& .qs-step-num-active': {
        background: ORANGE,
        borderColor: ORANGE,
        color: WHITE,
    },

    '& .qs-step-content': {
        paddingTop: '6px',
        flex: 1,
    },

    '& .qs-step-title': {
        fontSize: '16px',
        fontWeight: 700,
        fontFamily: 'JetBrains Mono',
        color: DIM,
        marginBottom: '6px',
        transition: 'color 0.2s ease',
        [theme.breakpoints.up('md')]: { fontSize: '18px' },
    },

    '& .qs-step-title-active': { color: 'var(--loop-text-primary)' },

    '& .qs-step-desc': {
        fontSize: '13.5px',
        fontFamily: 'Poppins, sans-serif',
        color: MUTED,
        lineHeight: 1.65,
        marginBottom:'16px',
        [theme.breakpoints.up('md')]: { fontSize: '14px' , marginBottom:'56px'},
    },

    // ── right image panel ──
    '& .qs-panel': {
        flex: 1,
        background: PANEL,
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
    },

    '& .qs-panel-bar': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
    },

    '& .qs-panel-dots': {
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
    },

    '& .qs-panel-filename': {
        color: DIM,
        fontSize: '11px',
        fontFamily: 'JetBrains Mono',
    },

    '& .qs-panel-img': {
        width: '100%',
        display: 'block',
        objectFit: 'cover',
        borderRadius: '0 0 12px 12px',
    },
}));

// ── Right panel with image ────────────────────────────
function StepPanel({ step }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className='qs-panel'>
            {/* Top bar */}
            <div className='qs-panel-bar'>
                <div className='qs-panel-dots'>
                    <Box sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: '#ef4444' }} />
                    <Box sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                    <Box sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: '#22c55e' }} />
                </div>
                <span className='qs-panel-filename'>{step.filename}</span>
                <Box sx={{ width: 60 }} />
            </div>

            {/* Step image */}
            {!imgError ? (
                <Box
                    component='img'
                    src={step.image}
                    alt={step.title}
                    className='qs-panel-img'
                    onError={() => setImgError(true)}
                />
            ) : (
                /* Fallback if image missing */
                <Box sx={{
                    minHeight: { xs: '200px', md: '312px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: DIM,
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    p: 3,
                }}>
                    [ {step.title} ]
                </Box>
            )}
        </div>
    );
}

// ── Main component ────────────────────────────────────
// eslint-disable-next-line require-jsdoc
export default function QuickStart() {
    const [active, setActive] = useState(0);
    const step = steps[active];

    return (
        <Root>
            {/* Header */}
            <div className='qs-header'>
                <span className='qs-eyebrow'>// QUICK_START</span>
                <div className='qs-title'>Get Started in 3 Steps</div>
                <div className='qs-subtitle'>From signup to production in minutes</div>
            </div>

            {/* Body */}
            <div className='qs-body'>

                {/* Left — steps */}
                <div className='qs-steps'>
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className='qs-step'
                            onClick={() => setActive(i)}
                            role='button'
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
                        >
                            {/* Connector line — not on last step */}
                            {i < steps.length - 1 && <div className='qs-step-line' />}

                            {/* Number badge */}
                            <div className={`qs-step-num${i === active ? ' qs-step-num-active' : ''}`}>
                                {s.num}
                            </div>

                            {/* Text content */}
                            <div className='qs-step-content'>
                                <div className={`qs-step-title${i === active ? ' qs-step-title-active' : ''}`}>
                                    {s.title}
                                </div>
                                {/* Desc only shown for active step */}
                                {i === active && (
                                    <div className='qs-step-desc'>{s.desc}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right — image panel (changes with active step) */}
                <StepPanel step={step} />
            </div>
        </Root>
    );
}
