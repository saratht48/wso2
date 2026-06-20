import React from 'react';
import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { app } from 'Settings';

const HeroImage = `${app.context}/site/public/images/landing/LandingHeroSection.png`;

/**
 * HeroSection component.
 * Renders the landing page hero with heading, description and image.
 * @returns {JSX.Element}
 */
export default function HeroSection() {
    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: '750px',
                bgcolor: '#141A21',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
            <Grid
                container
                sx={{
                    width: '100%',
                    // maxWidth: '1440px',
                    // px: { md: 8 },
                    paddingLeft: '112px',
                    paddingRight: '112px',
                }}
                alignItems='center'
            >
                {/* LEFT SECTION */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ marginTop: '21px', marginBottom: '32px' }}>
                        <Typography
                            component="span"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                 px: 1.5,
                                 py: 0.75,
                                bgcolor: '#141c28',
                                fontSize: '12px',
                                //   fontFamily: 'JetBrains Mono',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                color: '#ff5500',
                                border: '1px solid #ff5500',
                                borderRadius: '20px',
                                '&::before': {
                                    content: '">"',
                                    fontSize: '12px',
                                    color: '#ff5500',
                                },
                            }}
                        >
                            DEVELOPER_FIRST_API
                        </Typography>
                    </Box>


                    <Typography
                        sx={{
                            fontSize: '60px',
                            fontWeight: 700,
                            lineHeight: '75px',
                            mb: 3,
                        }}
                    >
                        Build Financial
                        <br />
                        Infrastructure.
                        <br />
                        <Box component='span' sx={{ color: '#FF5F00' }}>
                            Ship Faster.
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            color: '#9CA3AF',
                            fontSize: '16px',
                            maxWidth: '584px',
                            height: '48px',
                            mb: 4,
                        }}
                    >
                        Enterprise-grade fintech APIs built by engineers,
                        for engineers. Deploy payment, credit, and banking
                        infrastructure in minutes, not months.
                    </Typography>

                    <Stack direction='row' spacing={2}>
                        <Button
                            variant='contained'
                            sx={{
                                bgcolor: '#FF5F00',
                                px: 4,
                                py: 1.5,
                                borderRadius: '10px',
                                '&:hover': {
                                    bgcolor: '#ff5500',
                                },
                            }}
                        >
                            Start Building Free →
                        </Button>

                        <Button
                            variant='contained'
                            sx={{
                                bgcolor: '#fff',
                                color: '#000',
                                px: 4,
                                py: 1.5,
                                borderRadius: '10px',
                                '&:hover': {
                                    bgcolor: '#f3f3f3',
                                },
                            }}
                        >
                            Explore API Docs →
                        </Button>
                    </Stack>
                </Grid>

                {/* RIGHT SECTION */}
                <Grid item xs={12} md={6}>
                    <Box
                        component='img'
                        src={HeroImage}
                        alt='Hero'
                        sx={{
                            width: '100%',
                            maxWidth: '585px',
                            height: 'auto',
                            display: 'block',
                            mx: 'auto',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
