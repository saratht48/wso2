import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
// import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material';
// import Carousel from './Carousel';
// import ApisWithTag from './ApisWithTag';
// import ParallaxScroll from './ParallaxScroll';
// import Contact from './Contact';
import HeroSection from './HeroSection';
import TrustedCompanies from './TrustedCompanies';
import OurProducts from './ourproducts';
import ProductSuite from './ProductSuite';
import ShipFast from './ShipFast';
import TechSection from './TechItem';
import GetStarted from './GetStarted';
import QuickStart from './QuickStart';

// import { Container } from '@mui/material';

const PREFIX = 'Landing';

const classes = {
    root: `${PREFIX}-root`,
    fullWidthBack: `${PREFIX}-fullWidthBack`,
    superRoot: `${PREFIX}-superRoot`,
};

const Root = styled('div')(() => ({
    [`& .${classes.root}`]: {
        flexGrow: 1,
        margin: '0 100px',
        alignItem: 'center',
    },

    [`& .${classes.fullWidthBack}`]: {},

    [`&.${classes.superRoot}`]: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

/**
 * Renders landing view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders landing view.
 */
function Landing() {
    // Ensure the LOOP fonts are loaded on the home landing (these components use
    // 'Poppins, sans-serif' + 'Poppins'; without this they fall back to system fonts).
    useEffect(() => {
        const id = 'loop-landing-fonts';
        if (!document.getElementById(id)) {
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2'
                + '?family=JetBrains+Mono:wght@400;500;600;700;800'
                + '&family=Poppins:wght@300;400;500;600;700'
                + '&display=swap';
            document.head.appendChild(link);
        }
    }, []);

    // const theme = useTheme();
    return (
        <Root className={classes.superRoot}>

            <HeroSection />
            <TrustedCompanies />
            <OurProducts />
            <ProductSuite/>
            <QuickStart/>
            <ShipFast />
            <TechSection/>
            <GetStarted />
            {/* <div className={classes.root}>
                <Grid container spacing={3}>
                    {carouselActive && (
                        <Grid item xs={12}>
                            <Carousel />
                        </Grid>
                    )}
                    {listByTagActive && listByTagContent.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant='h2' gutterBottom>
                                {listByTagContent[0].title}
                            </Typography>
                            {listByTagContent[0].description && (
                                <Typography variant='body1' gutterBottom>
                                    {listByTagContent[0].description}
                                </Typography>
                            )}
                            <ApisWithTag tag={listByTagContent[0].tag} maxCount={listByTagContent[0].maxCount} />
                        </Grid>
                    )}
                </Grid>
            </div> */}
            {/* {parallaxActive && (
                <div className={classes.fullWidthBack}>
                    <ParallaxScroll index={0} />
                </div>
            )}
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {listByTagActive && listByTagContent.length > 1 && (
                        <Grid item xs={12}>
                            <Typography variant='h2' gutterBottom>
                                {listByTagContent[1].title}
                            </Typography>
                            {listByTagContent[1].description && (
                                <Typography variant='body1' gutterBottom>
                                    {listByTagContent[1].description}
                                </Typography>
                            )}
                            <ApisWithTag tag={listByTagContent[1].tag} maxCount={listByTagContent[1].maxCount} />
                        </Grid>
                    )}
                </Grid>
            </div>
            {parallaxActive && (
                <div className={classes.fullWidthBack}>
                    <ParallaxScroll index={1} />
                </div>
            )}
            {contactActive && (
                <div className={classes.root}>
                    <Typography variant='h2' gutterBottom>Contact Us</Typography>
                    <Contact />
                </div>
            )} */}

        </Root>
    );
}

Landing.propTypes = {
    // classes: PropTypes.shape({}).isRequired,
    // theme: PropTypes.shape({}).isRequired,
};

export default (Landing);
