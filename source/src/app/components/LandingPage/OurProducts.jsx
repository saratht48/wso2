/* eslint-disable require-jsdoc */


/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Tabs, Tab } from '@mui/material';
import { app } from 'Settings';

const paymentImageDark = `${app.context}/site/public/images/landing/payment_tab.png`;
const paymentImageLight = `${app.context}/site/public/images/landing/payment_tab_dark.png`;

const ecommerceImageDark = `${app.context}/site/public/images/landing/payment_tab_dark.png`;
const ecommerceImageLight = `${app.context}/site/public/images/landing/payment_tab.png`;

const ORANGE = '#ff5500';
const BG     = 'var(--loop-section-bg)';
const PANEL  = 'var(--loop-card-soft)';
const BORDER = 'var(--loop-border)';
const MUTED  = 'var(--loop-text-muted)';
const DIM    = 'var(--loop-text-muted)';
const WHITE  = '#ffffff';

const tabData = [
    {
        num: '01',
        label: 'PAYMENTS',
        sectionLabel: '01 → PAYMENTS',
        heading: 'Payments',
        desc: 'Accept and send money, enable card processing, and manage bulk disbursements with our real-time payment rails. Connect to 150+ financial institutions instantly.',
        btnText: 'Explore Payments',
        darkImage: paymentImageDark,
        lightImage: paymentImageLight,
    },
    {
        num: '02',
        label: 'E-COMMERCE',
        sectionLabel: '02 → E-COMMERCE',
        heading: 'E-Commerce',
        desc: 'Power online storefronts with seamless checkout flows, fraud detection, and multi-currency support. Integrate with leading platforms in minutes.',
        btnText: 'Explore E-Commerce',
        darkImage: ecommerceImageDark,
        lightImage: ecommerceImageLight,
    },
];

const Root = styled('div')(({ theme }) => ({
    background: BG,
    padding: '64px 25px',          // mobile: 64px top/bottom, 25px left/right
    width: '100%',
    boxSizing: 'border-box',

    [theme.breakpoints.up('sm')]: { padding: '64px 25px' },
    [theme.breakpoints.up('md')]: { padding: '80px 112px' },  // desktop unchanged

    // ── header ──
    '& .op-header': {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: { marginBottom: theme.spacing(3.5) },
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
        fontFamily: 'Poppins, sans-serif',
    },

    '& .op-main-title': {
        color: 'var(--loop-text-primary)',
        fontWeight: 700,
        lineHeight: 1.3,
        marginBottom: theme.spacing(1.25),
        fontFamily: 'Poppins, sans-serif',
        fontSize: '26px',                          // mobile
        [theme.breakpoints.up('md')]: { fontSize: '38px', lineHeight: '50px' },  // desktop unchanged
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
            fontFamily: 'Poppins, sans-serif',
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

        '& .Mui-selected': { color: 'var(--loop-text-primary) !important' },
        '& .MuiTabs-indicator': { background: ORANGE, height: 2 },
    },

    // ── content grid ──
    '& .op-grid': {
        display: 'flex !important',
        flexDirection: 'column',          // stacked on mobile
        gap: theme.spacing(3),
        alignItems: 'stretch',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',         // side by side on desktop
            gap: theme.spacing(5),
            alignItems: 'center',
        },
    },

    '& .op-left': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',                    // full width mobile
        [theme.breakpoints.up('md')]: {
            minWidth: '480px',            // desktop: restore fixed min-width
            width: 'auto',
        },
    },

    '& .op-section-label': {
        color: ORANGE,
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(1.5),
        fontFamily: 'Poppins, sans-serif',
    },

    '& .op-heading': {
        color: 'var(--loop-text-primary)',
        fontWeight: 700,
        marginBottom: theme.spacing(1.5),
        fontFamily: 'Poppins, sans-serif',
        lineHeight: 1.15,
        fontSize: '32px',                          // mobile — readable, not too large
        [theme.breakpoints.up('sm')]: { fontSize: '30px' },
        [theme.breakpoints.up('md')]: { fontSize: '36px' },   // desktop unchanged
    },

    '& .op-desc': {
        color: 'var(--loop-text-muted)',
        fontFamily: 'Poppins',
        lineHeight: 1.7,
        marginBottom: theme.spacing(3),
        fontSize: '14px',                          // mobile
        [theme.breakpoints.up('md')]: { fontSize: '14px' },   // desktop unchanged
    },

    // ── buttons ──
    '& .op-btn-row': {
        display: 'flex',
        flexDirection: 'column',          // stacked full-width on mobile
        gap: '12px',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',         // side by side on desktop
            gap: theme.spacing(1.25),
            flexWrap: 'wrap',
        },
    },

    '& .op-btn-primary': {
        background: ORANGE,
        color: WHITE,
        borderRadius: '12px',
        fontFamily: 'Poppins',
        fontWeight: 700,
        textTransform: 'none',
        boxShadow: 'none',
        width: '100%',                    // full width mobile
        fontSize: '16px',                 // mobile font
        padding: '14px 20px',             // mobile padding
        [theme.breakpoints.up('md')]: {
            width: 'auto',                // auto width desktop
            fontSize: '12px',
            padding: theme.spacing(1.375, 2.25),
        },
    },

    '& .op-btn-secondary': {
        background: 'var(--loop-surface)',
        color: 'var(--loop-text-primary)',
        border: '1px solid var(--loop-border)',
        borderRadius: '12px',
        fontFamily: 'Poppins',
        fontWeight: 700,
        textTransform: 'none',
        width: '100%',             
        fontSize: '16px',                 // mobile font
        padding: '14px 16px',             // mobile padding
        [theme.breakpoints.up('md')]: {
            width: 'auto',                // auto width desktop
            fontSize: '12px',
            padding: theme.spacing(1.375, 2.25),
        },
    },

    // ── dot indicators ──
    '& .op-dot-row': {
        display: 'flex',
        gap: theme.spacing(0.625),
        marginTop: theme.spacing(3),
    },

    '& .op-dot': {
        height: '3px',
        width: '8px',
        background: 'var(--loop-border-strong)',
        transition: 'width 0.25s ease, background 0.25s ease',
    },

    '& .op-dot-active': {
        width: '20px',
        background: ORANGE,
    },

    '& .op-panel': {
    background: PANEL,
    border: '0.3px solid #ff550079',
    borderRadius: '16px',
    padding: theme.spacing(2),
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2.5),
    },
},

    // '& .op-panel-image-wrap': {
    //     width: '100%',
    //     borderRadius: 6,
    //     overflow: 'hidden',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: '20px',
    // },
    '& .op-panel-image-wrap': {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    position: 'relative',
},

    '& .op-panel-image': {
        display: 'block',
        objectFit: 'cover',
        width: '100%',    
        height: 'auto',
        [theme.breakpoints.up('md')]: {
            width: '500px !important',   
            height: '290px !important',
        },
    },
    // eslint-disable-next-line no-dupe-keys
    '& .op-panel-image-wrap': {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    position: 'relative',
},

'& .op-panel-image': {
    display: 'block',
    objectFit: 'contain',
    width: '100%',
    height: 'auto',

    [theme.breakpoints.up('md')]: {
        width: '500px',
        height: '290px',
    },
},
}));

function TabLabel({ num, label, isActive }) {
    return (
        <Box component='span' sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: isActive ? ORANGE : DIM }}>{num}</span>
            <span style={{ fontSize: '14px', fontFamily: 'Poppins' }}>{label}</span>
        </Box>
    );
}

// function ImagePanel({ tab }) {
//     return (
//         <div className='op-panel'>
//             <div className='op-panel-image-wrap' style={{ marginTop: 20 }}>
//                 <img
//                     src={tab.image}
//                     alt={tab.heading}
//                     className='op-panel-image'
//                     onError={(e) => {
//                         e.currentTarget.style.display = 'none';
//                         e.currentTarget.nextSibling.style.display = 'flex';
//                     }}
//                 />
//                 {/* Fallback */}
//                 <div style={{
//                     display: 'none', width: '100%', minHeight: 200,
//                     alignItems: 'center', justifyContent: 'center',
//                     background: '#12141f', color: DIM,
//                     fontFamily: 'Poppins, sans-serif', fontSize: 12, borderRadius: 4,
//                 }}>
//                     [ {tab.heading} Image ]
//                 </div>
//             </div>
//         </div>
//     );
// }
function ImagePanel({ tab }) {
    const isLightTheme =
        document.documentElement.getAttribute('data-loop-theme') === 'light';

    return (
        <div className='op-panel'>
            <div className='op-panel-image-wrap'>
                <img
                    src={isLightTheme ? tab.lightImage : tab.darkImage}
                    alt={tab.heading}
                    className='op-panel-image'
                />
            </div>
        </div>
    );
}

export default function OurProducts() {
    const [active, setActive] = useState(0);
    const tab = tabData[active];

    return (
        <Root>
            {/* Header */}
            <div className='op-header'>
                <div className='op-eyebrow'>
                    <span className='op-eyebrow-text'>// Our Products</span>
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

            {/* Tabs */}
            <Tabs value={active} onChange={(_, v) => setActive(v)} className='op-tabs'>
                {tabData.map((t, i) => (
                    <Tab key={i} label={<TabLabel num={t.num} label={t.label} isActive={active === i} />} />
                ))}
            </Tabs>

            {/* Content */}
            <div className='op-grid'>
                {/* Left */}
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

                    <div className='op-dot-row'>
                        {[0, 1].map((i) => (
                            <div key={i} className={`op-dot${i === active ? ' op-dot-active' : ''}`} />
                        ))}
                    </div>
                </div>

                {/* Right */}
                <ImagePanel tab={tab} />
            </div>
        </Root>
    );
}