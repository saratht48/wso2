/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { styled } from '@mui/material/styles';
import { app } from 'Settings';

// ── Icon image paths (same pattern as paymentImage) ──
const iconDeveloper = `${app.context}/site/public/images/landing/developer_first.png`;
const iconLightning = `${app.context}/site/public/images/landing/fightingfast.png`;
const iconSecurity  = `${app.context}/site/public/images/landing/bank.png`;

const ORANGE = '#ff5500';
const BG = 'var(--loop-page-bg)';
const MUTED = 'var(--loop-text-muted)';

// ── Feature data ─────────────────────────────────────
const features = [
  {
    icon: iconDeveloper,
    iconFallback: '↔',
    tag: 'DEVELOPER_FIRST',
    desc: 'RESTful APIs, webhooks, SDKs in every language. Built the way you want to build.',
  },
  {
    icon: iconLightning,
    iconFallback: '⚡',
    tag: 'LIGHTNING_FAST',
    desc: 'Global edge infrastructure delivers sub-100ms response times worldwide.',
  },
  {
    icon: iconSecurity,
    iconFallback: '🛡',
    tag: 'BANK_GRADE_SECURITY',
    desc: 'SOC 2 Type II, PCI DSS compliant. Your data is encrypted at rest and in transit.',
  },
];

// ── Styled root ───────────────────────────────────────
const Root = styled('div')(({ theme }) => ({
  background: BG,
  width: '100%',
  boxSizing: 'border-box',
  padding: '64px 25px',

  [theme.breakpoints.up('sm')]: { padding: '64px 35px' },
  [theme.breakpoints.up('md')]: { padding: '80px 64px' },

  // ── grid — 1 col mobile, 3 col desktop ──
  '& .ts-grid': {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '40px',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0px',          // dividers act as separators on desktop
    },
  },

  // ── single feature item ──
  '& .ts-item': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 32px',
    position: 'relative',
    [theme.breakpoints.up('md')]: { padding: '0 48px' },
    [theme.breakpoints.up('lg')]: { padding: '0 64px' },
  },

  // ── icon box ──
  '& .ts-icon-box': {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: BG,
    border: '1px solid rgba(255, 85, 0, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    overflow: 'hidden',
    flexShrink: 0,

    [theme.breakpoints.up('md')]: {
      width: '56px',
      height: '56px',
      borderRadius: '16px',
    },
  },

  '& .ts-icon-img': {
    width: '28px',
    height: '28px',
    objectFit: 'contain',
    [theme.breakpoints.up('md')]: { width: '28px', height: '28px' },
  },

  '& .ts-icon-fallback': {
    color: ORANGE,
    fontSize: '22px',
    lineHeight: 1,
    [theme.breakpoints.up('md')]: { fontSize: '26px' },
  },

  // ── tag label ──
  '& .ts-tag': {
    color: ORANGE,
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: 'JetBrains Mono,',
    marginBottom: '16px',
    [theme.breakpoints.up('md')]: { fontSize: '14px' },
  },

  // ── description ──
  '& .ts-desc': {
    color: MUTED,
    fontSize: '14px',
    lineHeight: 1.75,
    fontFamily: 'Poppins',
    maxWidth: '340px',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: { fontSize: '14px', maxWidth: '320px' },
  },
}));

// ── Single feature item ───────────────────────────────
function TechItem({ feature }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="ts-item">
      {/* Icon */}
      <div className="ts-icon-box">
        {!imgError ? (
          <img
            src={feature.icon}
            alt={feature.tag}
            className="ts-icon-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="ts-icon-fallback">{feature.iconFallback}</span>
        )}
      </div>

      {/* Tag */}
      <div className="ts-tag">{feature.tag}</div>

      {/* Description */}
      <div className="ts-desc">{feature.desc}</div>
    </div>
  );
}

// ── Main component ────────────────────────────────────
export default function TechSection() {
  return (
    <Root>
      <div className="ts-grid">
        {features.map((f, i) => (
          <TechItem key={i} feature={f} />
        ))}
      </div>
    </Root>
  );
}