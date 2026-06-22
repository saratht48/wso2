
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Box, Button } from '@mui/material';
import { app } from 'Settings';

const HeroImage = `${app.context}/site/public/images/landing/LandingHeroSection.png`;

const ORANGE = '#ff5500';
const MUTED = 'var(--loop-text-muted)';

// eslint-disable-next-line require-jsdoc
export default function HeroSection() {
    return (
        <Box sx={{
            bgcolor: 'var(--loop-page-bg)',
            width: '100%',
            boxSizing: 'border-box',
            textAlign: 'left',
            minHeight: {
                xs: '100vh',
                sm: '90vh',
                md: '750px',
            },
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            px: { xs: 3, sm: 4, md: 8, lg: 14 },
            py: { xs: 8, sm: 10, md: 6 },
            
        }}>
            <Box sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' },
                gap: { xs: 6, md: 6 },
                alignItems: 'center',
            }}>

                {/* ── LEFT — text ── */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    {/* Badge pill */}
                    <Box sx={{ mb: { xs: 3, md: 4 } }}>
                        <Box component='span'
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                px: 1.5, py: 0.75,
                                bgcolor: 'rgba(255,85,0,0.08)',
                                fontSize: '14px',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                color: ORANGE,
                                border: `1px solid ${ORANGE}`,
                                borderRadius: '20px',
                                fontFamily: 'JetBrains Mono',
                                '&::before': { content: '"• >"', fontSize: '14px', color: ORANGE },
                            }}>
                            DEVELOPER_FIRST_API
                        </Box>
                    </Box>

                    {/* Heading */}
                    <Box sx={{
                        fontSize: {
                            xs: '32px',
                            sm: '32px',
                            md: '60px',
                            lg: '60px',
                        },
                        textAlign: {
                            xs: 'left',
                            md: 'left',
                        },
                        fontWeight: 700,
                        lineHeight: 1.1,
                        fontFamily: 'JetBrains Mono',
                        mb: { xs: 2.5, md: 3 },
                    }}>
                        <Box component="span" sx={{ color: 'var(--loop-text-primary)', display: 'block' }}>
                            Build Financial
                        </Box>
                        <Box component="span" sx={{ color: 'var(--loop-text-primary)', display: 'block' }}>
                            Infrastructure.
                        </Box>
                        <Box component="span" sx={{ color: ORANGE, display: 'block' }}>
                            Ship Faster.
                        </Box>
                    </Box>

                    {/* Description */}
                    <Box sx={{
                        color: MUTED,
                        fontSize: { xs: '14px', md: '16px' },
                        lineHeight: 1.75,
                        fontFamily: 'Poppins, sans-serif',
                        maxWidth: '440px',
                        mb: { xs: 4, md: 5 },
                    }}>
                        Enterprise-grade fintech APIs built by engineers, for engineers.
                        Deploy payment, credit, and banking infrastructure in minutes, not months.
                    </Box>

                    {/* Buttons */}
                    {/* Buttons */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: '16px',
                        width: { xs: '100%', md: 'auto' },
                    }}
                    >
                        <Button variant="contained"
                            sx={{
                                bgcolor: ORANGE, color: '#fff',
                                borderRadius: '10px',
                                fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                                fontSize: { xs: '16px', md: '14px' },
                                px: { xs: 3, md: 3.5 }, py: 1.5,
                                width: { xs: '100%', md: 'auto' },
                                textTransform: 'none', boxShadow: 'none',
                                '&:hover': { bgcolor: '#e04a00', boxShadow: 'none' },
                            }}>
                            Start Building Free →
                        </Button>
                        <Button variant="contained" sx={{
                            bgcolor: 'var(--loop-surface)', color: 'var(--loop-text-primary)',
                            border: '1px solid var(--loop-border)',
                            borderRadius: '10px',
                            fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                            fontSize: { xs: '16px', md: '14px' },
                            px: { xs: 3, md: 3.5 }, py: 1.5,
                            width: { xs: '100%', md: 'auto' },
                            textTransform: 'none', boxShadow: 'none',
                            '&:hover': { bgcolor: '#f3f3f3', boxShadow: 'none' },
                        }}>
                            Explore API Docs →
                        </Button>
                    </Box>
                </Box>

                {/* ── RIGHT — image ── */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'left', md: 'flex-end' },
                }}>
                    <Box
                        component="img"
                        src={HeroImage}
                        alt="Hero"
                        sx={{
                            width: '100%',
                            maxWidth: { xs: '340px', md: '100%' },
                            height: 'auto',
                            display: 'block',
                        }}
                    />
                </Box>

            </Box>
        </Box>
    );
}