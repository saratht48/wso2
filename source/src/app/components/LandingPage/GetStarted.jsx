/* eslint-disable require-jsdoc */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

// ── Brand tokens ─────────────────────────────────────
const ORANGE = '#ff5500';
const BG = 'var(--loop-section-bg)';
const MUTED = 'var(--loop-text-muted)';
const WHITE = '#ffffff';

// ── Styled root ───────────────────────────────────────
const Root = styled('div')(({ theme }) => ({
  background: BG,
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 25px',

  [theme.breakpoints.up('sm')]: { padding: '64px 25px' },
  [theme.breakpoints.up('md')]: { padding: '272px 72px' },
  [theme.breakpoints.up('lg')]: { padding: '272px 72px' },

  // ── eyebrow ──
  '& .gs-eyebrow': {
    color: ORANGE,
    fontSize: '14px',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '24px',
    display: 'block',
    [theme.breakpoints.up('md')]: { fontSize: '14px', marginBottom: '24px' },
  },

  // ── title block ──
  '& .gs-title': {
    color: 'var(--loop-text-primary)',
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 1.15,
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '24px',
    [theme.breakpoints.up('sm')]: { fontSize: '32px' },
    [theme.breakpoints.up('md')]: { fontSize: '56px', marginBottom: '32px' },
    [theme.breakpoints.up('lg')]: { fontSize: '76px' },
  },

  '& .gs-title-line1': {
    display: 'block',
    marginBottom: '4px',
  },

  '& .gs-title-line2': {
    display: 'block',
    color: ORANGE,
  },

  '& .gs-title-white': {
    color: 'var(--loop-text-primary)',
  },

  // ── subtitle ──
  '& .gs-subtitle': {
    color: MUTED,
    fontSize: '16px',
    lineHeight: 1.75,
    fontFamily: 'Poppins, sans-serif',
    maxWidth: '512px',
    margin: '0 auto 40px',
    [theme.breakpoints.up('sm')]: { fontSize: '16px', maxWidth: '450px' },
    [theme.breakpoints.up('md')]: { fontSize: '18px', maxWidth: '512px', marginBottom: '48px' },
  },

  // ── CTA button ──
  '& .gs-btn': {
    background: ORANGE,
    color: WHITE,
    borderRadius: '14px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '16px',
    padding: '14px 32px',
    textTransform: 'none',
    boxShadow: 'none',
    letterSpacing: '0.3px',
    '&:hover': {
      background: '#e04a00',
      boxShadow: '0 0 32px rgba(255,85,0,0.35)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
      padding: '16px 40px',
    },
  },
}));

// ── Main component ────────────────────────────────────
export default function GetStarted() {
  return (
    <Root>
      {/* Eyebrow */}
      <span className="gs-eyebrow">// GET_STARTED</span>

      {/* Title */}
      <div className="gs-title">
        <span className="gs-title-line1">Ready to</span>
        <span className="gs-title-line2">
          start_building()<span className="gs-title-white">?</span>
        </span>
      </div>

      {/* Subtitle */}
      <div className="gs-subtitle">
        Get your API keys in 60 seconds. Free sandbox environment. No credit card required.
      </div>

      {/* CTA */}
      <Button variant="contained" className="gs-btn">
        Get Started Free →
      </Button>
    </Root>
  );
}
