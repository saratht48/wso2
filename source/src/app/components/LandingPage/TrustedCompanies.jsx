import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { app } from 'Settings';
const safarilogo = `${app.context}/site/public/images/landing/safari_logo.png`;
const vadacomlogo = `${app.context}/site/public/images/landing/vadacom_logo.png`;
const mtnlogo = `${app.context}/site/public/images/landing/mtn_logo.png`;
const ncbalogo = `${app.context}/site/public/images/landing/ncba_logo.png`;
const companies = [
  {
    name: 'Safaricom',
    image: safarilogo,
  },
  {
    name: 'vodacom',
    image: vadacomlogo,
  },
  {
    name: 'MTN',
    image: mtnlogo,

  },
  {
    name: 'NCBA',
    image: ncbalogo,
  },
];

export default function TrustedCompanies() {
  return (
    <Box
      sx={{
        background: 'var(--loop-section-bg)',
        py: '28px',
        width: '100vw',
        // display: 'flex',
        // justifyContent: 'center',
        borderTop: '1px solid var(--loop-border)',
        borderBottom: '1px solid var(--loop-border)',
        overflow: 'hidden',
        '@keyframes marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }}
    >
      <Typography
        sx={{
          color: '#6b7280',
          fontSize: '10px',
          letterSpacing: '3px',
          mb: '22px',
          textTransform: 'uppercase',
          fontWeight: 400,
          textAlign: 'center',
          width: '100%',
        }}
      >
        Trusted By Leading Fintech Companies
      </Typography>

      <Box sx={{ overflow: 'hidden', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            animation: 'marquee 22s linear infinite',
          }}
        >
          {[...companies, ...companies].map((company, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                px: '40px',
                whiteSpace: 'nowrap',
                color: '#6b7280',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                opacity: 0.75,
              }}
            >
              {company.image && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    component='img'
                    src={company.image}
                    alt={company.name}
                    sx={{ width: '150px', height: '40px', objectFit: 'contain' }}
                  />
                </Box>
              )}
              {/* {company.name} */}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}