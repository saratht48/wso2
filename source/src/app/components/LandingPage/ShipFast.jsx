/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { styled } from '@mui/material/styles';
import { app } from 'Settings';

// ── Icon image paths (same pattern as paymentImage) ──
const iconApiDocs    = `${app.context}/site/public/images/landing/Api_docs.png`;
const iconSandbox    = `${app.context}/site/public/images/landing/sandbox.png`;
const iconCommunity  = `${app.context}/site/public/images/landing/community.png`;

const ORANGE = '#ff5500';
const BG = '#080808';
const CARD_BG = '#0F0F0F';
const BORDER = '#1e2532';
const MUTED = '#9CA3AF';
const DUSTYGRAY = '#6B7280';
const WHITE = '#ffffff';

// ── Card data ─────────────────────────────────────────
const cards = [
  {
    icon: iconApiDocs,
    iconFallback: '▭',
    tag: 'API_DOCS',
    title: 'Comprehensive API Documentation',
    desc: 'Interactive guides, auto-generated references, and code examples in every language. Built for developers who ship fast.',
    linkText: 'Explore Docs',
    href: '#',
  },
  {
    icon: iconSandbox,
    iconFallback: '</>',
    tag: 'SANDBOX_EXPLORER',
    title: 'Interactive Sandbox & Explorer',
    desc: 'Test every endpoint in a safe environment with mock data and instant responses. Debug with confidence before you deploy.',
    linkText: 'Try Sandbox',
    href: '#',
  },
  {
    icon: iconCommunity,
    iconFallback: '👥',
    tag: 'COMMUNITY_HUB',
    title: 'Developer Community & Support',
    desc: 'Join thousands of developers building the future of financial infrastructure. Ask questions, share solutions, get answers fast.',
    linkText: 'Join Community',
    href: '#',
  },
];

// ── Styled root ───────────────────────────────────────
const Root = styled('div')(({ theme }) => ({
  background: BG,
  width: '100%',
  boxSizing: 'border-box',
  padding: '48px 16px',

  [theme.breakpoints.up('sm')]: { padding: '60px 32px' },
  [theme.breakpoints.up('md')]: { padding: '80px 64px' },
  [theme.breakpoints.up('lg')]: { padding: '80px 112px' },

  // ── header ──
  '& .sf-header': {
    textAlign: 'center',
    marginBottom: '48px',
    [theme.breakpoints.up('md')]: { marginBottom: '56px' },
  },

  '& .sf-title': {
    color: WHITE,
    fontSize: '26px',
    fontWeight: 700,
    lineHeight: 1.25,
    fontFamily: 'JetBrains Mono',
    marginBottom: '14px',
    [theme.breakpoints.up('sm')]: { fontSize: '32px' },
    [theme.breakpoints.up('md')]: { fontSize: '40px' },
  },

  '& .sf-orange': { color: ORANGE },

  '& .sf-subtitle': {
    color: MUTED,
    fontSize: '18px',
    fontFamily:'Poppins',
    lineHeight: 1.7,
    [theme.breakpoints.up('md')]: { fontSize: '13px' },
  },

  // ── grid ──
  '& .sf-grid': {
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
  '& .sf-card': {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: '12px',
    padding: '24px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    transition: 'border-color 0.2s ease',
    '&:hover': { borderColor: '#2e3a4a' },
    [theme.breakpoints.up('md')]: { padding: '28px' },
  },

  // icon box — orange tinted square like in design
  '& .sf-icon-box': {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    background: 'rgba(255, 85, 0, 0.15)',
    border: '1px solid rgba(255, 85, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    marginBottom: '4px',
  },

  '& .sf-icon-img': {
    width: '22px',
    height: '22px',
    objectFit: 'contain',
  },

  '& .sf-icon-fallback': {
    color: ORANGE,
    fontSize: '15px',
    fontFamily: 'JetBrains Mono',
    lineHeight: 1,
    fontWeight: 700,
  },

  // tag — monospace label like API_DOCS
  '& .sf-tag': {
    color: ORANGE,
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    fontFamily: 'JetBrains Mono',
    [theme.breakpoints.up('md')]: { fontSize: '11px' },
  },

  '& .sf-card-title': {
    color: WHITE,
    fontSize: '15px',
    fontWeight: 700,
    fontFamily:'Poppins',
    lineHeight: 1.35,
    fontFamily: 'JetBrains Mono',
    [theme.breakpoints.up('md')]: { fontSize: '17px' },
  },

  '& .sf-card-desc': {
    color: MUTED,
    fontSize: '12px',
    lineHeight: 1.7,
    fontFamily: 'Poppins, sans-serif',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: { fontSize: '14px' },
  },

  // link at bottom — monospace orange with arrow
  '& .sf-card-link': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: ORANGE,
    fontSize: '13px',
    fontFamily: 'JetBrains Mono',
    fontWeight: 500,
    textDecoration: 'none',
    marginTop: '4px',
    transition: 'opacity 0.2s ease',
    '&:hover': { opacity: 0.75 },
  },
}));

// ── Single card ───────────────────────────────────────
function ShipCard({ card }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="sf-card">
      {/* Icon */}
      <div className="sf-icon-box">
        {!imgError ? (
          <img
            src={card.icon}
            alt={card.tag}
            className="sf-icon-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="sf-icon-fallback">{card.iconFallback}</span>
        )}
      </div>

      {/* Tag */}
      <span className="sf-tag">{card.tag}</span>

      {/* Title */}
      <div className="sf-card-title">{card.title}</div>

      {/* Description */}
      <div className="sf-card-desc">{card.desc}</div>

      {/* Link */}
      <a href={card.href} className="sf-card-link">
        {card.linkText} →
      </a>
    </div>
  );
}

// ── Main component ────────────────────────────────────
export default function ShipFast() {
  return (
    <Root>
      {/* Header */}
      <div className="sf-header">
        <div className="sf-title">
          Everything You Need to <span className="sf-orange">Ship Fast</span>
        </div>
        <div className="sf-subtitle">
          Production-ready infrastructure with zero compromises
        </div>
      </div>

      {/* Cards */}
      <div className="sf-grid">
        {cards.map((card, i) => (
          <ShipCard key={i} card={card} />
        ))}
      </div>
    </Root>
  );
}