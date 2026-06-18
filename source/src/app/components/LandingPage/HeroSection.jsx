import React from 'react';
import {
    Box,
    Button,
    Chip,
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
                height: '100vh',
                width: '100%',
                bgcolor: '#07111D',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                px: { xs: 3, md: 10 },
                overflow: 'hidden',
            }}
        >
            <Grid
                container
                alignItems='center'
                justifyContent='space-between'
                spacing={4}
            >
                {/* LEFT SECTION */}
                <Grid item xs={12} md={6}>
                    <Chip
                        label='DEVELOPER-FIRST API'
                        sx={{
                            mb: 3,
                            bgcolor: '#141c28',
                            color: '#ff6b00',
                            border: '1px solid #ff6b00',
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: {
                                xs: '2.5rem',
                                md: '4.5rem',
                            },
                            fontWeight: 700,
                            lineHeight: 1.1,
                            mb: 3,
                        }}
                    >
                        Build Financial
                        <br />
                        Infrastructure.
                        <br />
                        <Box component='span' sx={{ color: '#ff6b00' }}>
                            Ship Faster.
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            color: '#94A3B8',
                            fontSize: '1.1rem',
                            maxWidth: '520px',
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
                                bgcolor: '#ff6b00',
                                px: 4,
                                py: 1.5,
                                borderRadius: '10px',
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
                            maxWidth: '700px',
                            display: 'block',
                            mx: 'auto',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
