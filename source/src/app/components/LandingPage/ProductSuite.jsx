/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { styled } from '@mui/material/styles';
import { app } from 'Settings';

// ── Brand tokens ─────────────────────────────────────
const ORANGE = '#ff5500';
const BG = 'var(--loop-section-bg)';
const CARD_BG = 'var(--loop-surface)';
const BORDER = 'var(--loop-border)';
const MUTED = 'var(--loop-text-muted)';
const DUSTYGRAY = 'var(--loop-text-muted)';
const WHITE = 'var(--loop-text-primary)';

// ── Icon image paths (same pattern as paymentImage) ──
const iconTerminal = `${app.context}/site/public/images/landing/onboarding_icon.png`;
const iconPartner = `${app.context}/site/public/images/landing/Patner.png`;
const iconOnboarding = `${app.context}/site/public/images/landing/develop_onboarding.png`;
const iconAnalytics = `${app.context}/site/public/images/landing/analytics.png`;
const iconBilling = `${app.context}/site/public/images/landing/billing.png`;
const iconSupport = `${app.context}/site/public/images/landing/support.png`;

// ── Card data ─────────────────────────────────────────
const cards = [
    {
        icon: iconTerminal,
        iconFallback: '>_',
        tag: 'ONBOARDING',
        title: 'Developer Registration & Onboarding',
        desc: 'Go from zero to first API call in under 5 minutes. Self-serve signup, instant sandbox credentials, and guided quickstarts.',
    },
    {
        icon: iconPartner,
        iconFallback: '◎',
        tag: 'PARTNER',
        title: 'Partner Onboarding & Credential Management',
        desc: 'Enterprise-grade onboarding for corporate partners. Role-based access, credential rotation, and audit trails built in.',
    },
    {
        icon: iconOnboarding,
        iconFallback: '⊞',
        tag: 'ONBOARDING',
        title: 'Developer Registration & Onboarding',
        desc: 'Go from zero to first API call in under 5 minutes. Self-serve signup, instant sandbox credentials, and guided quickstarts.',
    },
    {
        icon: iconAnalytics,
        iconFallback: '↗',
        tag: 'ANALYTICS',
        title: 'Monitoring, Analytics & Reporting',
        desc: "Real-time dashboards for API usage, latency, error rates, and throughput. Know what's happening before your users do.",
    },
    {
        icon: iconBilling,
        iconFallback: '▭',
        tag: 'BILLING',
        title: 'Billing, Pricing & Settlement Visibility',
        desc: 'Transparent consumption-based pricing with real-time cost tracking, invoices, and settlement reports.',
    },
    {
        icon: iconSupport,
        iconFallback: '☐',
        tag: 'SUPPORT',
        title: 'Support, Community & Knowledge Base',
        desc: 'Stack Overflow-style community forums, a searchable knowledge base, dedicated partner SLAs, and live chat support.',
    },
];

// ── Styled root ───────────────────────────────────────
const Root = styled('div')(({ theme }) => ({
    background: BG,
    width: '100%',
    boxSizing: 'border-box',
    padding: '48px 16px',

    [theme.breakpoints.up('sm')]: { padding: '60px 32px' },
    [theme.breakpoints.up('md')]: { padding: '92px 112px' },
    [theme.breakpoints.up('lg')]: { padding: '92px 112px' },

    // ── header ──
    '& .ps-header': {
        textAlign: 'center',
        marginBottom: '48px',
        [theme.breakpoints.up('md')]: { marginBottom: '56px' },
    },

    '& .ps-eyebrow': {
        color: ORANGE,
        fontSize: '12px',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        fontFamily: 'JetBrains Mono',
        marginBottom: '16px',
        display: 'block',
    },

    '& .ps-title': {
        color: WHITE,
        fontSize: '40px',
        fontWeight: 700,
        lineHeight: 1.2,
        fontFamily: 'JetBrains Mono',
        marginBottom: '12px',
        [theme.breakpoints.up('sm')]: { fontSize: '34px' },
        [theme.breakpoints.up('md')]: { fontSize: '40px' },
    },

    '& .ps-subtitle': {
        color: MUTED,
        fontSize: '18px',
        lineHeight: 1.7,
        maxWidth: '479px',
        margin: '0 auto',
        [theme.breakpoints.up('md')]: { fontSize: '18px', maxWidth: '400px' },
    },

    // ── grid ──
    '& .ps-grid': {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '16px',

        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
        },
    },

    // ── card ──
    '& .ps-card': {
        background: CARD_BG,
        border: `1px solid ${BORDER}`,
        borderRadius: '16px',
        padding: '25px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'border-color 0.2s ease',
        '&:hover': {
            borderColor: '#ff5500',
        },
        [theme.breakpoints.up('md')]: { padding: '24px' },
    },

    // three dots at top of card
    '& .ps-card-dots': {
        display: 'flex',
        gap: '5px',
        marginBottom: '4px',
    },

    '& .ps-card-dot': {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'var(--loop-border-strong)',
    },

    // icon box
    '& .ps-icon-box': {
        width: '40px',
        height: '40px',
        borderRadius: '14px',
        background: 'rgba(255,85,0,0.08)',
        border: `1px solid #ff55007d`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
    },

    '& .ps-icon-img': {
        width: '22px',
        height: '22px',
        objectFit: 'contain',
    },

    '& .ps-icon-fallback': {
        color: ORANGE,
        fontSize: '16px',
        fontFamily: 'JetBrains Mono',
        lineHeight: 1,
    },

    // tag pill
    '& .ps-tag': {
        display: 'inline-block',
        background: '#FF5F0014',
        borderRadius: '4px',
        padding: '2px 8px',
        color: ORANGE,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        fontFamily: 'JetBrains Mono',
        alignSelf: 'flex-start',
        top:'60px',
    },

    '& .ps-card-title': {
        color: WHITE,
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: 1.35,
        fontFamily: 'Poppins',
        [theme.breakpoints.up('md')]: { fontSize: '18px' },
    },

    '& .ps-card-desc': {
        color: DUSTYGRAY,
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.65,
        fontFamily: 'Poppins, sans-serif',
        [theme.breakpoints.up('md')]: { fontSize: '14px' },
    },
}));

// ── Single card ───────────────────────────────────────
// eslint-disable-next-line require-jsdoc
function ProductCard({ card }) {
    const [imgError, setImgError] = React.useState(false);

    return (
        <div className="ps-card">
            {/* Three dots */}
            <div className="ps-card-dots">
                <div className="ps-card-dot" />
                <div className="ps-card-dot" />
                <div className="ps-card-dot" />
            </div>

            {/* Icon */}
            <div className="ps-icon-box">
                {!imgError ? (
                    <img
                        src={card.icon}
                        alt={card.tag}
                        className="ps-icon-img"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span className="ps-icon-fallback">{card.iconFallback}</span>
                )}
            </div>

            {/* Tag */}
            <span className="ps-tag">{card.tag}</span>

            {/* Title */}
            <div className="ps-card-title">{card.title}</div>

            {/* Desc */}
            <div className='ps-card-desc'>{card.desc}</div>
        </div>
    );
}

// ── Main component ────────────────────────────────────
// eslint-disable-next-line require-jsdoc
export default function ProductSuite() {
    return (
        <Root>
            {/* Header */}
            <div className="ps-header">
                <span className="ps-eyebrow">// Product_Suite</span>
                <div className="ps-title">API Product Suite</div>
                <div className="ps-subtitle">
                    Everything you need to build, deploy, and scale financial applications
                </div>
            </div>

            {/* Cards grid */}
            <div className="ps-grid">
                {cards.map((card, i) => (
                    <ProductCard key={i} card={card} />
                ))}
            </div>
        </Root>
    );
}
