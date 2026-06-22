/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box,  Button, Tabs, Tab } from '@mui/material';
import {app} from 'Settings';


const ecommerceImage = `${app.context}/site/public/images/landing/payment_tab.png`;
const paymentImage = `${app.context}/site/public/images/landing/payment_tab.png`;

// ── Brand tokens ─────────────────────────────────────
const ORANGE = '#ff5500';
const BG = '#0A0A0A';
const PANEL = '#141A21';
const BORDER = '#1e2030';
const MUTED = '#8b8fa8';
const DIM = '#4a4f6a';
const WHITE = '#ffffff';

// ── Tab data ─────────────────────────────────────────
const tabData = [
    {
        num: '01',
        label: 'PAYMENTS',
        sectionLabel: '01 → PAYMENTS',
        heading: 'Payments',
        desc: 'Accept and send money, enable card processing, and manage bulk disbursements with our real-time payment rails. Connect to 150+ financial institutions instantly.',
        btnText: 'Explore Payments',
        image: paymentImage,
    },
    {
        num: '02',
        label: 'E-COMMERCE',
        sectionLabel: '02 → E-COMMERCE',
        heading: 'E-Commerce',
        desc: 'Power online storefronts with seamless checkout flows, fraud detection, and multi-currency support. Integrate with leading platforms in minutes.',
        btnText: 'Explore E-Commerce',
        image: ecommerceImage,
    },
];

// ── Styled root ───────────────────────────────────────
const Root = styled('div')(({ theme }) => ({
    background: BG,
    padding: '80px 112px',
    width: '100%',
    boxSizing: 'border-box',

    [theme.breakpoints.up('sm')]: { padding: '60px 90px' },
    [theme.breakpoints.up('md')]: { padding: '80px 112px' },

    // ── header ──
    '& .op-header': {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: { textAlign: 'center', marginBottom: theme.spacing(3.5) },
    },

    '& .op-eyebrow': {
        display: 'inline-flex',
        padding: theme.spacing(0.5, 1.75),
        marginBottom: theme.spacing(2.5),
    },

    '& .op-eyebrow-text': {
        color: ORANGE,
        fontSize: '12px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: 'JetBrains Mono',
    },

    '& .op-main-title': {
        color: WHITE,
        fontSize: '38px',
        fontWeight: 700,
        lineHeight: '50px',
        marginBottom: theme.spacing(1.25),
        fontFamily: 'JetBrains Mono',
        [theme.breakpoints.up('sm')]: { fontSize: '28px' },
        [theme.breakpoints.up('md')]: { fontSize: '34px' },
    },

    '& .op-orange': { color: ORANGE },

    '& .op-subtext': {
        color: MUTED,
        fontSize: '13px',
        lineHeight: 1.6,
        [theme.breakpoints.up('md')]: { fontSize: '14px' },
    },

    // ── tabs ──
    '& .op-tabs': {
        borderBottom: `1px solid ${BORDER}`,
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: { marginBottom: theme.spacing(3.5) },

        '& .MuiTabs-scroller': { overflowX: 'auto !important' },

        '& .MuiTab-root': {
            fontFamily: 'JetBrains Mono',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1.2px',
            color: DIM,
            minHeight: 'unset',
            padding: theme.spacing(1.125, 0),
            marginRight: theme.spacing(2.5),
            textTransform: 'uppercase',
            [theme.breakpoints.up('md')]: { fontSize: '11px', marginRight: theme.spacing(3) },
        },

        '& .Mui-selected': { color: `${WHITE} !important` },
        '& .MuiTabs-indicator': { background: ORANGE, height: 2 },
    },

    // ── content grid ──
    '& .op-grid': {
        display: 'flex !important',
        flexDirection: 'column',
        gap: theme.spacing(3),
        alignItems: 'start',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            gap: theme.spacing(5),
            alignItems: 'center',
        },
    },

    '& .op-left': {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            minWidth: '480px',
        },
    },

    '& .op-section-label': {
        color: ORANGE,
        fontSize: '11px',
        fontWeight:400,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(1.5),
        fontFamily: 'JetBrains Mono',
    },

    '& .op-heading': {
        color: WHITE,
        fontSize: '46px',
        fontWeight: 700,
        marginBottom: theme.spacing(1.5),
        fontFamily: 'JetBrains Mono',
        lineHeight: 1.15,
        [theme.breakpoints.up('sm')]: { fontSize: '30px' },
        [theme.breakpoints.up('md')]: { fontSize: '36px' },
    },

    '& .op-desc': {
        color: '#9CA3AF',
        fontSize: '16px',
        fontFamily: 'Poppins',
        lineHeight: 1.7,
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: { fontSize: '14px' },
    },

    '& .op-btn-row': {
        display: 'flex',
        gap: theme.spacing(1.25),
        flexWrap: 'wrap',
    },

    '& .op-btn-primary': {
        background: '#444444',
        color: WHITE,
        borderRadius: '12px',
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: '16px',
        padding: '12px 20px',
        textTransform: 'none',
        boxShadow: 'none',
        [theme.breakpoints.up('md')]: { fontSize: '12px', padding: theme.spacing(1.375, 2.25) },
    },

    '& .op-btn-secondary': {
        background: WHITE,
        color: '#444444',
        borderRadius: '12px',
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: '16px',
        padding: theme.spacing(1.375, 2),
        textTransform: 'none',
        [theme.breakpoints.up('md')]: { fontSize: '12px', padding: theme.spacing(1.375, 2.25) },
    },

    '& .op-dot-row': {
        display: 'flex',
        gap: theme.spacing(0.625),
        marginTop: theme.spacing(3),
    },

    '& .op-dot': {
        height: '3px',
        width: '8px',
        background: '#2e3145',
        transition: 'width 0.25s ease, background 0.25s ease',
    },

    '& .op-dot-active': {
        width: '20px',
        background: ORANGE,
    },

    // ── diagram panel (right) ──
    '& .op-panel': {
        background: PANEL,
        border: '0.3px solid #ff550079',
        borderRadius: '16px',
        padding: theme.spacing(2),
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        [theme.breakpoints.up('md')]: { padding: theme.spacing(2.5) },
    },

    '& .op-panel-badge-green': {
        position: 'absolute',
        top: 12,
        right: 12,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        border: '1px solid #22c55e',
        borderRadius: 4,
        background: '#0d1a0d',
        padding: '3px 8px',
    },

    '& .op-panel-badge-green-dot': {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#22c55e',
        flexShrink: 0,
    },

    '& .op-panel-badge-green-text': {
        color: '#22c55e',
        fontSize: '10px',
        fontFamily: 'JetBrains Mono',
    },

    '& .op-panel-image-wrap': {
        width: '100%',
        borderRadius: 6,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
    },

    '& .op-panel-image': {
        width: '500px !important',
        height: '290px !important',
        display: 'block',
        objectFit: 'cover',
    },

}));

// eslint-disable-next-line require-jsdoc
function TabLabel({ num, label, isActive }) {
    return (
        <Box component='span' sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: isActive ? ORANGE : DIM }}>{num}</span>
            <span style={{ fontSize: '14px', fontFamily: 'Poppins' }}>{label}</span>
        </Box>
    );
}
// eslint-disable-next-line require-jsdoc
function ImagePanel({ tab }) {
    return (
        <div className='op-panel'>
            {/* Green badge */}
            {/* <div className='op-panel-badge-green'>
                <div className='op-panel-badge-green-dot' />
                <span className='op-panel-badge-green-text'>{tab.badge}</span>
            </div> */}

            {/* Product image */}
            <div className='op-panel-image-wrap' style={{ marginTop: 36 }}>
                <img
                    // eslint-disable-next-line react/prop-types
                    src={tab.image}
                    alt={tab.heading}
                    className='op-panel-image'
                    width='500px'
                    height='290px'
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                />
                {/* Fallback placeholder */}
                <div
                    style={{
                        display: 'none',
                        width: '100%',
                        minHeight: 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#12141f',
                        color: DIM,
                        fontFamily: 'JetBrains Mono',
                        fontSize: 12,
                        borderRadius: 4,
                    }}
                >
                    [ {tab.heading} Image ]
                </div>
            </div>

        </div>
    );
}

// ── Main component ────────────────────────────────────
// eslint-disable-next-line require-jsdoc
export default function OurProducts() {
    const [active, setActive] = useState(0);
    const tab = tabData[active];

    return (
        <Root>
            {/* ── HEADER ── */}
            <div className="op-header">
                <div className="op-eyebrow">
                    <span className="op-eyebrow-text">// Our Products</span>
                </div>

                <div className='op-main-title'>
                    Trusted Financial APIs for
                    <br />
                    <span className='op-orange'>Modern Products</span>
                </div>

                <div className='op-subtext'>
                    Build fintech apps with our suite of financial APIs.
                </div>
            </div>

            {/* ── TABS ── */}
            <Tabs
                value={active}
                onChange={(_, v) => setActive(v)}
                className='op-tabs'
            >
                {tabData.map((t, i) => (
                    <Tab
                        key={i}
                        label={<TabLabel num={t.num} label={t.label} isActive={active === i} />}
                    />
                ))}
            </Tabs>

            {/* ── CONTENT GRID ── */}
            <div className='op-grid'>

                {/* Left — text */}
                <div className='op-left'>
                    <div className='op-section-label'>{tab.sectionLabel}</div>
                    <div className='op-heading'>{tab.heading}</div>
                    <div className='op-desc'>{tab.desc}</div>

                    <div className='op-btn-row'>
                        <Button variant='contained' className='op-btn-primary'>
                            {tab.btnText} →
                        </Button>
                        <Button variant='outlined' className='op-btn-secondary'>
                            View Docs
                        </Button>
                    </div>

                    {/* Dot indicators */}
                    <div className='op-dot-row'>
                        {[0, 1].map((i) => (
                            <div
                                key={i}
                                className={`op-dot${i === active ? ' op-dot-active' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right — image panel */}
                <ImagePanel tab={tab} />
            </div>
        </Root>
    );
}